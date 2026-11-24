import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { defineConfig, loadEnv } from 'vite';

const publicFiles = [
  '/manifest.webmanifest',
  '/icons/docspace.svg',
  '/icons/apple-touch-icon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable.png',
];

function offlineApp() {
  return {
    name: 'docspace-offline',
    apply: 'build',
    generateBundle(_, bundle) {
      const template = readFileSync(new URL('./src/service-worker.js', import.meta.url), 'utf8');
      const files = Object.keys(bundle).sort().map(file => '/' + file);
      const hash = createHash('sha256').update(template);
      hash.update(readFileSync(new URL('./index.html', import.meta.url)));
      for (const path of files) {
        const item = bundle[path.slice(1)];
        hash.update(path).update(item.type === 'chunk' ? item.code : item.source);
      }
      for (const path of publicFiles) {
        hash.update(readFileSync(new URL('./public' + path, import.meta.url)));
      }
      this.emitFile({
        type: 'asset',
        fileName: 'sw.js',
        source: template
          .replace('__BUILD_ID__', JSON.stringify(hash.digest('hex').slice(0, 16)))
          .replace('__APP_FILES__', JSON.stringify([...new Set(['/index.html', ...files, ...publicFiles])])),
      });
    },
  };
}

function browserPolicy(mode) {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();
  if (key && !/^sb_publishable_[A-Za-z0-9_-]+$/.test(key)) {
    throw new Error('VITE_SUPABASE_PUBLISHABLE_KEY must contain a Supabase publishable key.');
  }
  let accountOrigin = '';
  if (env.VITE_SUPABASE_URL && key) {
    const url = new URL(env.VITE_SUPABASE_URL);
    if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
      throw new Error('VITE_SUPABASE_URL must be an HTTPS project origin.');
    }
    accountOrigin = ' ' + url.origin;
  }

  return {
    name: 'docspace-browser-policy',
    apply: 'build',
    transformIndexHtml: {
      order: 'pre',
      handler() {
        return [{
          tag: 'meta',
          attrs: {
            'http-equiv': 'Content-Security-Policy',
            content: [
              "default-src 'none'",
              "script-src 'self'",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "img-src 'self' blob: data:",
              "media-src 'self' blob:",
              "worker-src 'self' blob:",
              "manifest-src 'self'",
              "connect-src 'self'" + accountOrigin,
              "base-uri 'none'",
              "form-action 'none'",
              "object-src 'none'",
            ].join('; '),
          },
          injectTo: 'head-prepend',
        }];
      },
    },
  };
}

export default defineConfig(({ command, mode }) => ({
  plugins: command === 'build' ? [browserPolicy(mode), offlineApp()] : [],
  worker: { format: 'es' },
  build: {
    target: 'es2022',
    rolldownOptions: {
      onwarn(warning, warn) {
        // This app runs entirely in the browser, without React server boundaries.
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('use client')) return;
        warn(warning);
      },
    },
  },
}));

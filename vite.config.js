import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

const publicFiles = [
  '/manifest.webmanifest',
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

export default defineConfig({
  plugins: [offlineApp()],
  worker: { format: 'es' },
  build: { target: 'es2022' },
});

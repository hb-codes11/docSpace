import './style.css';
import { createPagePicker } from './page-picker.js';
import { MAX_BYTES } from './limits.js';
import { tools } from './tools-data.js';
import { renderToolLanding } from './components/landing.js';
import { initAdSense, renderAdSlot, pushAds } from './components/ads.js';
import { privacyPolicyContent, termsOfServiceContent, aboutContent } from './components/legal.js';
import { getInitialRoute, syncUrlAndMetadata } from './router.js';

import mergeIcon from 'lucide-static/icons/layers-2.svg?raw';
import uploadIcon from 'lucide-static/icons/upload-cloud.svg?raw';
import shieldIcon from 'lucide-static/icons/shield-check.svg?raw';
import zapIcon from 'lucide-static/icons/zap.svg?raw';
import lockIcon from 'lucide-static/icons/lock.svg?raw';

const env = import.meta.env;
const hasAccount = Boolean(env.VITE_SUPABASE_URL && env.VITE_SUPABASE_PUBLISHABLE_KEY);

// Initialize AdSense script if configured
initAdSense();

const initialTool = getInitialRoute();
let mode = initialTool;
let files = [];
let job;
let timer;
let objectUrl;
let account;
let session;
let userSelectedTool = false;
let draggedFile;

const app = document.querySelector('#app');
app.innerHTML = `
<header class="top">
  <div class="shell top-inner">
    <a class="brand" href="/" aria-label="docSpace Home">
      <span class="brand-icon">${mergeIcon}</span>
      <span>docSpace</span>
    </a>
    <nav class="top-nav" aria-label="Main Navigation">
      <a class="nav-link" href="#tools-section">Tools</a>
      <a href="#privacy" class="nav-link" id="nav-privacy">Privacy</a>
      <a href="#about" class="nav-link" id="nav-about">About</a>
    </nav>
    <div class="top-actions">
      <span class="private" title="Files processed 100% locally in browser">${shieldIcon} On-device processing</span>
      ${hasAccount ? '<button id="account" class="outline">Sign in</button>' : ''}
    </div>
  </div>
</header>

<section class="shell hero" id="tools-section">
  <div class="hero-pill">${zapIcon} Private Client-Side Document Studio</div>
  <h1>Fast, Private PDF & Word Tools <span class="hero-gradient">On Your Device</span></h1>
  <p>No file uploads. No server queues. Merge, split, organize, compress, and convert documents with on-device processing.</p>
  <div class="hero-badges">
    <span class="hero-badge-item">${shieldIcon} 100% In-Browser Memory</span>
    <span class="hero-badge-item">${lockIcon} Zero Server Uploads</span>
    <span class="hero-badge-item">${zapIcon} Instant Local Processing</span>
  </div>
</section>

<main class="shell studio">
  <aside class="rail">
    <nav aria-label="PDF tools" class="tools">
      ${Object.entries(tools).map(([key, tool]) =>
        `<button class="tool" data-mode="${key}" aria-pressed="${String(key === mode)}">
          <span class="tool-icon">${tool.icon}</span>
          <span><strong>${tool.title}</strong><small>${tool.summary}</small></span>
        </button>`
      ).join('')}
    </nav>
    <p class="rail-note">${shieldIcon} Files stay on your device</p>
  </aside>

  <section class="workbench" aria-labelledby="tool-title">
    <div class="tool-head">
      <h2 id="tool-title">${tools[mode].title}</h2>
      <p id="tool-hint">${tools[mode].hint}</p>
    </div>

    <div class="drop" id="drop" role="region" aria-label="File upload area">
      <span class="upload-icon">${uploadIcon}</span>
      <strong id="drop-title">Drop PDF files here</strong>
      <span class="limit">Up to 100 MB and 500 pages per job</span>
      <button class="primary" id="browse" type="button">Choose PDFs</button>
      <input type="file" id="picker" accept=".pdf,application/pdf" hidden>
    </div>

    <ol id="queue" aria-label="Selected files" hidden></ol>

    <div id="split-options" hidden>
      <label for="pages">Pages to keep</label>
      <input id="pages" type="text" placeholder="All pages" aria-describedby="range-help">
      <small id="range-help">Enter page numbers or ranges, like 1-3, 5.</small>
      <label class="check" id="zip-option">
        <input id="separate" type="checkbox"> Save each selected page separately in a ZIP
      </label>
    </div>

    <div id="image-options" hidden>
      <label for="image-format">Image format</label>
      <select id="image-format">
        <option value="image/png">PNG</option>
        <option value="image/jpeg">JPG</option>
      </select>
    </div>

    <p id="page-feedback" aria-live="polite"></p>
    <ol id="page-grid" aria-label="PDF pages" hidden></ol>

    <div class="result">
      <p id="status" role="status" aria-live="polite"></p>
      <button class="outline" id="reload-tool" hidden>Reload docSpace</button>
      <button class="primary" id="process" hidden></button>
      <button class="outline" id="cancel" hidden>Cancel</button>
      <a class="primary" id="download" hidden>Download</a>
    </div>
  </section>
</main>

<div class="shell" id="ad-slot-container">
  ${renderAdSlot({ position: 'top' })}
</div>

<div class="shell" id="landing-content">
  ${renderToolLanding(tools[mode])}
</div>

<footer class="footer">
  <div class="shell">
    <div class="footer-grid">
      <div class="footer-col">
        <a class="brand" href="/" style="margin-bottom: 12px; display:inline-flex;">
          <span class="brand-icon">${mergeIcon}</span>
          <span>docSpace</span>
        </a>
        <p>A fast, 100% private, client-side web application for local PDF and Word workflows. Your confidential files never leave your device.</p>
        <span class="private" style="display:inline-flex;">${shieldIcon} 100% Client-Side Privacy Guaranteed</span>
      </div>
      <div class="footer-col">
        <h4>PDF Workflows</h4>
        <ul class="footer-links">
          <li><a href="/merge-pdf" class="footer-link" data-switch-tool="merge">Merge PDFs</a></li>
          <li><a href="/split-pdf" class="footer-link" data-switch-tool="split">Split PDF</a></li>
          <li><a href="/organize-pdf" class="footer-link" data-switch-tool="organize">Organize PDF</a></li>
          <li><a href="/compress-pdf" class="footer-link" data-switch-tool="compress">Compress Scan PDF</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Conversions</h4>
        <ul class="footer-links">
          <li><a href="/pdf-to-word" class="footer-link" data-switch-tool="word">PDF to Word DOCX</a></li>
          <li><a href="/word-to-pdf" class="footer-link" data-switch-tool="docx">Word DOCX to PDF</a></li>
          <li><a href="/images-to-pdf" class="footer-link" data-switch-tool="images">Images to PDF</a></li>
          <li><a href="/pdf-to-images" class="footer-link" data-switch-tool="export">PDF to Images (ZIP)</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company & Legal</h4>
        <ul class="footer-links">
          <li><a href="#privacy" class="footer-link" id="link-privacy">Privacy Policy</a></li>
          <li><a href="#terms" class="footer-link" id="link-terms">Terms of Service</a></li>
          <li><a href="#about" class="footer-link" id="link-about">About Architecture</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${new Date().getFullYear()} docSpace. All rights reserved.</span>
      <span>Engineered with WebAssembly & PostgreSQL RLS</span>
    </div>
  </div>
</footer>

<dialog id="sign-in">
  <form id="sign-in-form">
    <h2>Sign in to docSpace</h2>
    <p>Sync your last-used tool across devices with passwordless magic link.</p>
    <label for="email">Email address</label>
    <input type="email" id="email" required autocomplete="email" placeholder="name@example.com">
    <p id="account-status" role="status"></p>
    <div class="dialog-actions">
      <button type="button" class="outline" id="close-dialog">Close</button>
      <button class="primary" id="send-link">Send sign-in link</button>
    </div>
  </form>
</dialog>

<dialog id="legal-dialog">
  <div id="legal-body"></div>
  <div class="dialog-actions">
    <button type="button" class="primary" id="close-legal">Close</button>
  </div>
</dialog>
`;

const $ = id => document.getElementById(id);
const picker = $('picker');
const status = $('status');
const download = $('download');
const queue = $('queue');
const legalDialog = $('legal-dialog');
const legalBody = $('legal-body');

const pagePicker = createPagePicker({
  grid: $('page-grid'),
  feedback: $('page-feedback'),
  range: $('pages'),
  onEdit(isInitialLoad) {
    if (!job && !isInitialLoad) clearResult();
    updateProcessButton();
  },
});

function openLegalModal(content) {
  legalBody.innerHTML = content;
  legalDialog.showModal();
}

$('close-legal').onclick = () => legalDialog.close();
$('nav-privacy')?.addEventListener('click', e => { e.preventDefault(); openLegalModal(privacyPolicyContent); });
$('nav-about')?.addEventListener('click', e => { e.preventDefault(); openLegalModal(aboutContent); });
$('link-privacy')?.addEventListener('click', e => { e.preventDefault(); openLegalModal(privacyPolicyContent); });
$('link-terms')?.addEventListener('click', e => { e.preventDefault(); openLegalModal(termsOfServiceContent); });
$('link-about')?.addEventListener('click', e => { e.preventDefault(); openLegalModal(aboutContent); });

function resetPagePicker() {
  const preview = ['split', 'organize', 'export'].includes(mode);
  pagePicker.load(preview ? files[0] : undefined, mode === 'organize');
}

function updateProcessButton() {
  $('process').disabled = (mode === 'merge' && files.length < 2)
    || (mode === 'organize' && pagePicker.getEdits().length === 0);
}

function clearResult() {
  if (objectUrl) URL.revokeObjectURL(objectUrl);
  objectUrl = undefined;
  download.removeAttribute('href');
  download.hidden = true;
  $('reload-tool').hidden = true;
  status.textContent = '';
  status.classList.remove('error');
}

function report(message, error = false) {
  status.textContent = message;
  status.classList.toggle('error', error);
}

function chooseTool(value, navigate = true) {
  if (!Object.hasOwn(tools, value) || value === mode || job) return;
  if (tools[mode].kind !== tools[value].kind) files = [];
  mode = value;
  if (!tools[mode].multiple) files = files.slice(0, 1);
  $('pages').value = '';
  $('separate').checked = false;
  resetPagePicker();
  clearResult();
  syncUrlAndMetadata(mode, navigate);
  render();
  updateLandingContent();
  pushAds();
}

function updateLandingContent() {
  const container = $('landing-content');
  if (!container) return;
  container.innerHTML = renderToolLanding(tools[mode]);
  // Bind switch tool links in related tools section
  container.querySelectorAll('[data-switch-tool]').forEach(btn => {
    btn.onclick = event => {
      event.preventDefault();
      userSelectedTool = true;
      chooseTool(btn.dataset.switchTool);
      window.scrollTo({ top: $('tools-section').offsetTop - 80, behavior: 'smooth' });
    };
  });
}

// Bind footer switch tool links
document.querySelectorAll('.footer [data-switch-tool]').forEach(btn => {
  btn.onclick = event => {
    event.preventDefault();
    userSelectedTool = true;
    chooseTool(btn.dataset.switchTool);
    window.scrollTo({ top: $('tools-section').offsetTop - 80, behavior: 'smooth' });
  };
});

// Handle browser popstate navigation
window.addEventListener('popstate', () => {
  const nextMode = getInitialRoute();
  if (nextMode && nextMode !== mode && !job) {
    chooseTool(nextMode, false);
  }
});

function render(focusIndex, action) {
  const tool = tools[mode];
  $('tool-title').textContent = tool.title;
  $('tool-hint').textContent = tool.hint;
  picker.multiple = Boolean(tool.multiple);
  picker.accept = tool.accept ?? '.pdf,application/pdf';
  const kind = tool.kind ?? (tool.multiple ? 'PDFs' : 'PDF');
  $('browse').textContent = 'Choose ' + kind;
  $('drop-title').textContent = 'Drop ' + kind + ' here';
  $('browse').disabled = Boolean(job);
  $('process').textContent = mode === 'word' ? 'Export editable text' : tool.title;
  $('process').hidden = !files.length || Boolean(job);
  updateProcessButton();
  $('cancel').hidden = !job;
  $('split-options').hidden = !['split', 'export'].includes(mode) || !files.length;
  $('zip-option').hidden = mode !== 'split';
  $('image-options').hidden = mode !== 'export' || !files.length;
  $('pages').disabled = $('separate').disabled = $('image-format').disabled = Boolean(job);
  pagePicker.setDisabled(Boolean(job));

  for (const button of document.querySelectorAll('[data-mode]')) {
    button.setAttribute('aria-pressed', String(button.dataset.mode === mode));
    button.disabled = Boolean(job);
  }

  queue.hidden = !files.length;
  queue.replaceChildren();

  files.forEach((file, index) => {
    const row = document.createElement('li');
    const name = document.createElement('span');
    name.className = 'filename';
    name.textContent = file.name;
    row.append(name);
    const actions = document.createElement('div');
    actions.className = 'actions';

    if (tool.multiple && files.length > 1 && !job) {
      row.draggable = true;
      row.ondragstart = event => {
        draggedFile = index;
        event.dataTransfer.setData('text/plain', file.name);
      };
      row.ondragend = () => { draggedFile = undefined; };
      row.ondragover = event => { if (draggedFile !== undefined) event.preventDefault(); };
      row.ondrop = event => {
        if (draggedFile === undefined) return;
        event.preventDefault();
        const [moved] = files.splice(draggedFile, 1);
        files.splice(index, 0, moved);
        draggedFile = undefined;
        clearResult();
        render(index);
      };
    }

    const buttons = tool.multiple ? [['↑', 'Move up', -1], ['↓', 'Move down', 1]] : [];
    buttons.push(['×', 'Remove', 0]);
    for (const [symbol, label, move] of buttons) {
      const button = document.createElement('button');
      button.className = 'icon-button';
      button.textContent = symbol;
      button.dataset.action = label;
      button.setAttribute('aria-label', `${label} ${file.name}`);
      button.disabled = Boolean(job) || index + move < 0 || index + move >= files.length;
      button.onclick = () => {
        if (move) {
          [files[index], files[index + move]] = [files[index + move], files[index]];
        } else {
          files.splice(index, 1);
          if (!tool.multiple) resetPagePicker();
        }
        clearResult();
        render(Math.min(index + move, files.length - 1), label);
      };
      actions.append(button);
    }
    row.append(actions);
    queue.append(row);
  });

  if (focusIndex !== undefined) {
    const row = queue.children[focusIndex];
    const target = [...(row?.querySelectorAll('button:enabled') ?? [])].find(button => button.dataset.action === action);
    (target ?? row?.querySelector('button:enabled') ?? $('browse')).focus();
  }
}

function addFiles(incoming) {
  if (job || !incoming.length) return;
  clearResult();
  const tool = tools[mode];
  if (!tool.multiple && incoming.length !== 1) {
    report('Choose one ' + (tool.kind ?? 'PDF') + ' for this tool.', true);
    return;
  }
  const next = tool.multiple ? [...files, ...incoming] : incoming;
  if (next.length > 50 || next.reduce((total, file) => total + file.size, 0) > MAX_BYTES) {
    report('Choose up to 50 files totaling 100 MB or less.', true);
    return;
  }
  files = next;
  resetPagePicker();
  render();
}

function stop() {
  job?.cancel();
  job = undefined;
  clearTimeout(timer);
  render();
}

function finish(data) {
  stop();
  if (data.error) {
    report(data.error, true);
    $('reload-tool').hidden = !data.reload;
    (data.reload ? $('reload-tool') : $('process')).focus();
    return;
  }
  objectUrl = URL.createObjectURL(data.blob);
  download.href = objectUrl;
  download.download = data.filename;
  download.textContent = 'Download ' + data.filename;
  download.hidden = false;
  report('Your download is ready.');
  download.focus();

  // If user is logged in, asynchronously record tool usage in Supabase with RLS
  if (session && account) {
    recordToolUsage(session.user.id, mode).catch(() => {});
  }
}

$('reload-tool').onclick = () => location.reload();
$('browse').onclick = () => picker.click();
picker.onchange = () => {
  addFiles([...picker.files]);
  picker.value = '';
};

const drop = $('drop');
drop.ondragover = event => { event.preventDefault(); drop.classList.add('dragging'); };
drop.ondragleave = () => drop.classList.remove('dragging');
drop.ondrop = event => {
  event.preventDefault();
  drop.classList.remove('dragging');
  addFiles([...event.dataTransfer.files]);
};

window.addEventListener('dragover', event => {
  if (event.dataTransfer.types.includes('Files')) event.preventDefault();
});
window.addEventListener('drop', event => {
  if (event.dataTransfer.types.includes('Files')) event.preventDefault();
});

$('cancel').onclick = () => { stop(); report('Processing canceled.'); $('process').focus(); };
$('pages').oninput = () => { clearResult(); pagePicker.updateRange(); };
$('image-format').onchange = clearResult;
$('separate').onchange = clearResult;

function startWorker(data) {
  const worker = new Worker(new URL('./processor.js', import.meta.url), { type: 'module' });
  const current = job;
  const cancel = current.cancel;
  current.cancel = () => { cancel(); worker.terminate(); };
  worker.onmessage = ({ data }) => { if (job === current) finish(data); };
  worker.onerror = () => { if (job === current) finish({ error: 'Processing failed. Try a smaller file.' }); };
  worker.postMessage(data);
}

async function runJob(current, data, signal) {
  const { mode, files, selection, imageFormat } = data;
  if (!['word', 'export', 'compress', 'docx'].includes(mode)) {
    startWorker(data);
    return;
  }
  const bytes = await files[0].arrayBuffer();
  signal.throwIfAborted();
  if (mode === 'docx') {
    const { readDocx } = await import('./docx-text.js');
    const lines = await readDocx(bytes, signal);
    if (job === current) startWorker({ ...data, lines });
    return;
  }

  let result;
  if (mode === 'word') {
    const { toWord } = await import('./word.js');
    result = { blob: await toWord(bytes, signal), filename: 'converted.docx' };
  } else {
    const { pdfToImages, compressScan } = await import('./pdf-images.js');
    result = mode === 'export'
      ? { blob: await pdfToImages(bytes, signal, selection, imageFormat), filename: 'page-images.zip' }
      : { blob: await compressScan(bytes, signal, files[0].size), filename: 'compressed-scan.pdf' };
  }
  if (job === current) finish(result);
}

$('process').onclick = () => {
  clearResult();
  const controller = new AbortController();
  const current = { cancel: () => controller.abort() };
  job = current;
  const data = {
    files, mode,
    selection: $('pages').value.trim(),
    separate: $('separate').checked,
    pageEdits: pagePicker.getEdits(),
    imageFormat: $('image-format').value,
  };
  runJob(current, data, controller.signal).catch(error => {
    if (job !== current) return;
    if (/failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed|unable to preload css/i.test(error.message)) {
      finish({ error: 'This tool could not load. Reload docSpace, then select your file again.', reload: true });
      return;
    }
    const message = ['InvalidPDFException', 'PasswordException'].includes(error.name)
      ? 'This PDF is damaged or encrypted. Try an unlocked copy.'
      : error.message;
    finish({ error: message || 'Processing failed.' });
  });
  timer = setTimeout(() => finish({ error: 'Processing timed out. Try a smaller set of pages or files.' }), 120000);
  render();
  report('Processing your files…');
  $('cancel').focus();
};

let preferenceWrite = Promise.resolve();
document.querySelector('.tools').onclick = event => {
  const button = event.target.closest('[data-mode]');
  if (!button) return;
  userSelectedTool = true;
  chooseTool(button.dataset.mode);
  if (session) {
    const record = { user_id: session.user.id, last_tool: mode };
    preferenceWrite = preferenceWrite.then(async () => {
      const { error } = await account.from('tool_preferences').upsert(record);
      if (error && session?.user.id === record.user_id) report('Could not sync your tool preference.', true);
    }).catch(() => report('Could not sync your tool preference.', true));
  }
};

async function recordToolUsage(userId, toolName) {
  if (!account || !userId) return;
  try {
    await account.rpc('increment_tool_usage', { tool_name: toolName });
  } catch {
    // Non-blocking telemetry
  }
}

async function initAccount() {
  const { createClient } = await import('@supabase/supabase-js');
  account = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY, { auth: { flowType: 'pkce' } });
  const button = $('account');
  const dialog = $('sign-in');
  const feedback = $('account-status');
  $('close-dialog').onclick = () => dialog.close();
  button.onclick = async () => {
    if (!session) { dialog.showModal(); return; }
    button.disabled = true;
    try {
      const { error } = await account.auth.signOut();
      if (error) report('Could not sign out. Try again.', true);
    } finally {
      button.disabled = false;
    }
  };
  $('sign-in-form').onsubmit = async event => {
    event.preventDefault();
    $('send-link').disabled = true;
    feedback.textContent = 'Sending your link…';
    try {
      const { error } = await account.auth.signInWithOtp({
        email: $('email').value.trim(),
        options: { emailRedirectTo: location.origin + '/' },
      });
      feedback.textContent = error ? 'Could not send the link. Check your address and try again.' : 'Open the sign-in link in this browser.';
    } catch {
      feedback.textContent = 'Could not send the link. Check your connection and try again.';
    } finally {
      $('send-link').disabled = false;
    }
  };
  account.auth.onAuthStateChange((_event, next) => {
    const changed = session?.user.id !== next?.user.id;
    session = next;
    button.textContent = next ? 'Sign out' : 'Sign in';
    if (!next || !changed) return;
    const userId = next.user.id;
    setTimeout(async () => {
      const { data } = await account.from('tool_preferences').select('last_tool').eq('user_id', userId).maybeSingle();
      if (session?.user.id === userId && !userSelectedTool && !files.length && data) chooseTool(data.last_tool, false);
    });
  });
}

// Initial render
render();
updateLandingContent();
syncUrlAndMetadata(mode);

if (hasAccount) initAccount().catch(() => {
  $('account').disabled = true;
  $('account').textContent = 'Sign-in unavailable';
});

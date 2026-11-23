import './style.css';
import { createPagePicker } from './page-picker.js';
import { MAX_BYTES } from './limits.js';
import { tools } from './tools-data.js';
import { renderToolLanding } from './components/landing.js';
import { privacyPolicyContent, termsOfServiceContent, aboutContent } from './components/legal.js';
import { getInitialRoute, syncUrlAndMetadata } from './router.js';
import { bindDelivery, formatFileSize } from './delivery.js';
import { outputFilename } from './filenames.js';
import { bindTheme, bindInstall } from './app-settings.js';
import { icons, iconMarkup } from './icons.js';
import { mountInteractions } from './components/interactions.jsx';
import { checkClientRateLimit } from './rate-limiter.js';

import mergeIcon from 'lucide-static/icons/layers-2.svg?raw';
import uploadIcon from 'lucide-static/icons/upload-cloud.svg?raw';
import shieldIcon from 'lucide-static/icons/shield-check.svg?raw';
import cameraIcon from 'lucide-static/icons/camera.svg?raw';

const env = import.meta.env;
const hasAccount = Boolean(env.VITE_SUPABASE_URL && env.VITE_SUPABASE_PUBLISHABLE_KEY);


const initialTool = getInitialRoute();
let mode = initialTool;
let files = [];
let job;
let timer;
let objectUrl;
let result;
const scanPreviews = new Map();
const scanEdits = new Map();
let account;
let session;
let userSelectedTool = false;
let draggedFile;
let interactions;
let clearSnapshot;
let clearEpoch = 0;

const toolGroups = [
  { title: 'Pages', ids: ['merge', 'split', 'organize', 'numbers', 'watermark'] },
  { title: 'Convert', ids: ['images', 'export', 'docx', 'word', 'compress'] },
  { title: 'Capture & protect', ids: ['scan', 'sign', 'sanitize', 'redact'] },
];

const app = document.querySelector('#app');
app.innerHTML = `
<header class="top">
  <div class="shell top-inner">
    <a class="brand" href="/" aria-label="docSpace Home">
      <span class="brand-icon">${iconMarkup(mergeIcon)}</span>
      <span class="brand-name">docSpace</span>
    </a>
    <nav class="top-nav" aria-label="Main Navigation">
      <a class="nav-link" href="#tools-section">Tools</a>
      <a href="#privacy" class="nav-link" id="nav-privacy">Privacy</a>
      <a href="#about" class="nav-link" id="nav-about">About</a>
    </nav>
    <div class="top-actions">
      <select id="theme" aria-label="Color theme" hidden>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <div id="theme-controls"></div>
      <button id="install" class="outline" type="button" aria-label="Install app" title="Install app">${iconMarkup(icons.smartphone)}<span class="install-label">Install app</span></button>
      ${hasAccount ? '<button id="account" class="outline">Sign in</button>' : ''}
    </div>
  </div>
</header>

<section class="shell hero" id="tools-section">
  <div class="hero-brand">
    <h1 class="sr-only">docSpace — PDF and document tools</h1>
    <div id="hero-wordmark" aria-hidden="true"></div>
  </div>
  <div class="hero-intro">
    <p>Merge, scan, sign, and convert.<br> Your everyday paperwork, handled here.</p>
    <span class="privacy-note">${iconMarkup(shieldIcon)} Files stay on your device</span>
  </div>
</section>

<main class="shell studio">
  <aside class="rail">
    <div class="rail-heading">Your tools <span>${Object.keys(tools).length}</span></div>
    <nav aria-label="PDF tools" class="tools">
      ${toolGroups.map(group => `
        <div class="tool-group">
          <h2 class="tool-group-title">${group.title}</h2>
          ${group.ids.map(key => {
            const tool = tools[key];
            return `<button class="tool" data-mode="${key}" aria-pressed="${String(key === mode)}" aria-label="${tool.title}">
              <span class="tool-icon">${iconMarkup(tool.icon)}</span>
              <span class="tool-label">${tool.title}</span>
            </button>`;
          }).join('')}
        </div>
      `).join('')}
    </nav>
    <p class="rail-note">${iconMarkup(shieldIcon)}<span>Private by design.<br>Processed on this device.</span></p>
  </aside>

  <section class="workbench" aria-labelledby="tool-title">
    <div class="tool-head">
      <h2 id="tool-title">${tools[mode].title}</h2>
      <p id="tool-hint">${tools[mode].hint}</p>
    </div>

    <div class="drop" id="drop" role="region" aria-label="File upload area">
      <span class="upload-icon" aria-hidden="true">${uploadIcon}</span>
      <strong id="drop-title">Drop PDF files here</strong>
      <span class="limit">Up to 100 MB and 500 pages per job</span>
      <div class="file-actions">
        <button class="primary" id="take-photo" type="button" hidden>${iconMarkup(cameraIcon)} Take photo</button>
        <button class="primary" id="browse" type="button">Choose PDFs</button>
      </div>
      <input type="file" id="camera-picker" accept="image/*" capture="environment" hidden>
      <input type="file" id="picker" accept=".pdf,application/pdf" hidden>
    </div>

    <div id="queue-toolbar" class="queue-toolbar" hidden>
      <span id="queue-summary"></span>
      <div id="clear-files-control"></div>
    </div>
    <ol id="queue" aria-label="Selected files" hidden></ol>
    <label id="scan-options" class="check" hidden><input id="grayscale" type="checkbox"> Grayscale</label>

    <div id="split-options" hidden>
      <label for="pages">Pages to keep</label>
      <input id="pages" type="text" placeholder="All pages" aria-describedby="range-help">
      <small id="range-help">Enter page numbers or ranges, like 1-3, 5.</small>
      <label class="check" id="zip-option">
        <input id="separate" type="checkbox"> Save each selected page separately in a ZIP
      </label>
    </div>

    <div id="image-options" hidden>
      <span id="image-format-label">Image format</span>
      <div id="image-format-control"></div>
      <select id="image-format" aria-label="Image format" hidden>
        <option value="image/png">PNG</option>
        <option value="image/jpeg">JPG</option>
      </select>
    </div>

    <div id="stamp-options" hidden>
      <label id="watermark-label" for="watermark-text">Watermark text</label>
      <input id="watermark-text" type="text" maxlength="80" placeholder="For example, DRAFT">
      <label id="number-label" for="number-start">Start numbering at</label>
      <input id="number-start" type="number" min="1" max="99999" value="1">
    </div>

    <div id="sign-options" hidden>
      <label for="signature-pad">Draw signature</label>
      <div class="signature-container">
        <canvas id="signature-pad" width="460" height="150"></canvas>
        <div class="signature-tools">
          <button type="button" class="outline" id="clear-signature">${iconMarkup(icons.reset)} Clear pad</button>
        </div>
      </div>
      <div class="sign-meta-fields">
        <div>
          <label for="sign-page">Page number</label>
          <input id="sign-page" type="number" min="1" max="500" value="1">
        </div>
        <div>
          <label for="sign-position">Position</label>
          <select id="sign-position">
            <option value="bottom-right">Bottom right</option>
            <option value="bottom-center">Bottom center</option>
            <option value="center">Center</option>
          </select>
        </div>
      </div>
    </div>
    <p id="page-feedback" aria-live="polite"></p>
    <ol id="page-grid" aria-label="PDF pages" hidden></ol>

    <div class="result">
      <p id="status" role="status" aria-live="polite"></p>
      <button class="outline" id="reload-tool" hidden>${iconMarkup(icons.reset)} Reload docSpace</button>
      <button class="primary" id="process" hidden></button>
      <button class="outline" id="cancel" hidden>${iconMarkup(icons.remove)} Cancel</button>
      <section id="save-options" aria-labelledby="delivery-title" hidden>
        <div class="delivery-heading">
          <span class="delivery-file-icon" id="delivery-file-icon" aria-hidden="true">${iconMarkup(icons.file)}</span>
          <div>
            <h3 id="delivery-title">Save your document</h3>
            <p class="delivery-meta"><span id="delivery-type"></span><span id="delivery-size"></span></p>
          </div>
          <span class="delivery-ready" aria-hidden="true">${iconMarkup(icons.check)}</span>
        </div>
        <label for="output-name">Save as</label>
        <div class="delivery-name">
          <input id="output-name" type="text" maxlength="120" spellcheck="false" autocapitalize="none" autocomplete="off" aria-describedby="output-extension">
          <span id="output-extension"></span>
        </div>
        <div class="delivery-actions">
          <button class="primary" id="save-file" type="button" title="Choose a filename and folder" hidden>${iconMarkup(icons.save)} Save file</button>
          <a class="primary" id="download">${iconMarkup(icons.download)} Download</a>
          <button class="outline" id="share-file" type="button">${iconMarkup(icons.share)} Share file</button>
        </div>
        <p id="delivery-status" role="status" aria-live="polite"></p>
      </section>
      <div id="continue-options" hidden>
        <label for="next-tool">Continue with this PDF</label>
        <select id="next-tool">${Object.values(tools).filter(tool => !tool.kind && tool.id !== 'merge').map(tool => `<option value="${tool.id}">${tool.title}</option>`).join('')}</select>
        <button id="continue-tool" class="outline">Open tool ${iconMarkup(icons.arrowRight)}</button>
      </div>
    </div>
  </section>
</main>

<div class="shell" id="landing-content">
  ${renderToolLanding(tools[mode])}
</div>

<footer class="footer">
  <div class="shell">
    <div class="footer-grid">
      <div class="footer-col">
        <a class="brand" href="/">
          <span class="brand-icon">${iconMarkup(mergeIcon)}</span>
          <span class="brand-name">docSpace</span>
        </a>
        <p>A personal project for everyday PDF and Word work.</p>
        <span class="private">${iconMarkup(shieldIcon)} Files processed on your device</span>
      </div>
      <div class="footer-col">
        <h4>PDF Workflows</h4>
        <ul class="footer-links">
          <li><a href="/merge-pdf" class="footer-link" data-switch-tool="merge">Merge PDFs</a></li>
          <li><a href="/split-pdf" class="footer-link" data-switch-tool="split">Split PDF</a></li>
          <li><a href="/sign-pdf" class="footer-link" data-switch-tool="sign">Sign PDF</a></li>
          <li><a href="/sanitize-pdf" class="footer-link" data-switch-tool="sanitize">Sanitize PDF</a></li>
          <li><a href="/redact-pdf" class="footer-link" data-switch-tool="redact">Redact PDF</a></li>
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
          <li><a href="#about" class="footer-link" id="link-about">About</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${new Date().getFullYear()} docSpace. All rights reserved.</span>
      <span>Built for private document workflows</span>
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

<dialog id="scan-editor" aria-labelledby="scan-editor-title">
  <h2 id="scan-editor-title">Crop and straighten</h2>
  <p>Drag the four corners to the edges of the document. You can also focus a corner and use the arrow keys.</p>
  <div class="scan-stage" hidden>
    <img class="scan-source" alt="Original scan photo" draggable="false">
    <span class="scan-outline" aria-hidden="true"></span>
    <button class="scan-corner" aria-label="Top left corner" type="button"></button>
    <button class="scan-corner" aria-label="Top right corner" type="button"></button>
    <button class="scan-corner" aria-label="Bottom right corner" type="button"></button>
    <button class="scan-corner" aria-label="Bottom left corner" type="button"></button>
  </div>
  <div class="scan-result-preview" aria-label="Straightened page preview" hidden></div>
  <p id="scan-editor-status" role="status"></p>
  <div class="scan-editor-controls">
    <button id="scan-preview-toggle" class="outline" type="button">${iconMarkup(icons.preview)} Preview</button>
    <button id="scan-rotate" class="outline" type="button">${iconMarkup(icons.rotate)} Rotate 90°</button>
    <button id="scan-reset" class="outline" type="button">${iconMarkup(icons.reset)} Reset</button>
  </div>
  <div class="dialog-actions">
    <form method="dialog"><button class="outline" autofocus>Cancel</button></form>
    <button id="scan-edit-save" class="primary" type="button">${iconMarkup(icons.check)} Apply edits</button>
  </div>
</dialog>

<dialog id="install-dialog" aria-labelledby="install-title" aria-describedby="install-description">
  <div class="install-heading">
    <img src="/icons/icon-192.png" alt="" width="56" height="56">
    <div>
      <h2 id="install-title">Install docSpace</h2>
      <p id="install-description">Your document tools, one tap away.</p>
    </div>
  </div>
  <p class="install-summary">Add docSpace to your home screen or desktop. Your files are processed on your device, and cached tools work offline.</p>
  <p id="install-status" role="status" aria-live="polite"></p>
  <div id="install-instructions">
    <ol data-install-platform="android" hidden>
      <li>Open this page in Chrome on your Android phone.</li>
      <li>Tap the browser menu and choose <strong>Install app</strong> or <strong>Add to Home screen</strong>.</li>
      <li>Confirm to add docSpace to your home screen.</li>
    </ol>
    <ol data-install-platform="ios" hidden>
      <li>Open this page in Safari.</li>
      <li>Tap <strong>Share</strong>, then <strong>Add to Home Screen</strong>.</li>
      <li>Keep <strong>Open as Web App</strong> enabled if shown, then tap <strong>Add</strong>.</li>
    </ol>
    <div data-install-platform="desktop" hidden>
      <p>In Chrome or Edge, open the browser menu and choose <strong>Install docSpace</strong> or <strong>Install page as app</strong>.</p>
      <p>In Safari on Mac, choose <strong>File</strong>, then <strong>Add to Dock</strong>.</p>
    </div>
  </div>
  <div class="dialog-actions">
    <form method="dialog"><button class="outline">Done</button></form>
    <button class="primary" id="install-native" type="button" hidden>${iconMarkup(icons.smartphone)} Install now</button>
  </div>
</dialog>

<dialog id="share-dialog" aria-labelledby="share-title" aria-describedby="share-help">
  <div class="share-heading">${iconMarkup(icons.share)}<h2 id="share-title">Share your file</h2></div>
  <p id="share-filename"></p>
  <p id="share-help"></p>
  <div class="share-steps">
    <p>${iconMarkup(icons.download)}<span>Save a copy to your device.</span></p>
    <p>${iconMarkup(icons.share)}<span>Open your sharing app and attach the downloaded file.</span></p>
  </div>
  <div class="dialog-actions">
    <form method="dialog"><button class="outline">Back</button></form>
    <a class="primary" id="share-download">${iconMarkup(icons.download)} Download file</a>
  </div>
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
const outputName = $('output-name');
const queue = $('queue');
const legalDialog = $('legal-dialog');
const legalBody = $('legal-body');
const delivery = bindDelivery({
  getResult: () => result,
  getFile: namedResult,
  download,
  nameInput: outputName,
  browse: $('browse'),
});

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

function resetPagePicker(restoredEdits) {
  const preview = ['split', 'organize', 'export'].includes(mode);
  pagePicker.load(preview ? files[0] : undefined, mode === 'organize', restoredEdits);
}

function updateProcessButton() {
  $('process').disabled = (mode === 'merge' && files.length < 2)
    || (mode === 'organize' && pagePicker.getEdits().length === 0);
}

function clearResult() {
  if (objectUrl) URL.revokeObjectURL(objectUrl);
  objectUrl = undefined;
  result = undefined;
  delivery.reset();
  document.querySelector('.result').classList.remove('is-ready');
  $('save-options').hidden = true;
  $('continue-options').hidden = true;
  download.removeAttribute('href');
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
  clearSnapshot = undefined;
  clearEpoch++;
  mode = value;
  if (!tools[mode].multiple) files = files.slice(0, 1);
  $('pages').value = '';
  $('separate').checked = false;
  resetPagePicker();
  clearResult();
  syncUrlAndMetadata(mode, navigate);
  render();
  updateLandingContent();
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
  $('browse').innerHTML = iconMarkup(icons.plus) + '<span>Choose ' + kind + '</span>';
  $('drop-title').textContent = mode === 'scan' ? 'Add a photo for each page' : 'Drop ' + kind + ' here';
  $('browse').disabled = Boolean(job);
  $('browse').className = mode === 'scan' ? 'outline' : 'primary';
  $('take-photo').hidden = mode !== 'scan';
  $('take-photo').disabled = Boolean(job);
  $('scan-options').hidden = mode !== 'scan' || !files.length;
  $('grayscale').disabled = Boolean(job);
  $('process').innerHTML = iconMarkup(tool.icon) + '<span>' + (tool.actionText ?? tool.title) + '</span>';
  $('process').hidden = !files.length || Boolean(job);
  updateProcessButton();
  $('cancel').hidden = !job;
  drop.classList.toggle('has-files', files.length > 0);
  drop.setAttribute('aria-busy', String(Boolean(job)));
  const limits = ['export', 'compress', 'redact'].includes(mode)
    ? 'Up to 100 MB · 50 pages per export'
    : tool.kind ? 'Up to 50 images · 100 MB total' : 'Up to 100 MB · 500 pages per job';
  drop.querySelector('.limit').textContent = mode === 'docx' ? 'One DOCX file · up to 100 MB' : limits;
  $('split-options').hidden = !['split', 'export', 'watermark', 'numbers', 'redact'].includes(mode) || !files.length;
  $('zip-option').hidden = mode !== 'split';
  $('image-options').hidden = mode !== 'export' || !files.length;
  $('pages').disabled = $('separate').disabled = $('image-format').disabled = Boolean(job);
  $('stamp-options').hidden = !['watermark', 'numbers', 'redact'].includes(mode) || !files.length;
  $('watermark-label').hidden = $('watermark-text').hidden = !['watermark', 'redact'].includes(mode);
  if (mode === 'redact') {
    $('watermark-label').textContent = 'Redaction label (optional)';
    $('watermark-text').placeholder = 'e.g. [CONFIDENTIAL] or [REDACTED]';
  } else if (mode === 'watermark') {
    $('watermark-label').textContent = 'Watermark text';
    $('watermark-text').placeholder = 'For example, DRAFT';
  }
  $('number-label').hidden = $('number-start').hidden = mode !== 'numbers';
  $('watermark-text').disabled = $('number-start').disabled = Boolean(job);
  $('sign-options').hidden = mode !== 'sign' || !files.length;
  $('sign-page').disabled = $('sign-position').disabled = $('clear-signature').disabled = Boolean(job);
  pagePicker.setDisabled(Boolean(job));

  for (const button of document.querySelectorAll('[data-mode]')) {
    button.setAttribute('aria-pressed', String(button.dataset.mode === mode));
    button.disabled = Boolean(job);
  }
  const navigation = document.querySelector('.tools');
  if (navigation.scrollWidth > navigation.clientWidth) {
    const active = navigation.querySelector('[aria-pressed="true"]');
    const bounds = navigation.getBoundingClientRect();
    const selected = active.getBoundingClientRect();
    if (selected.left < bounds.left || selected.right > bounds.right) {
      navigation.scrollLeft += selected.left - bounds.left;
    }
  }

  $('queue-toolbar').hidden = !files.length && !clearSnapshot;
  $('queue-summary').textContent = clearSnapshot ? 'Files cleared' : files.length + (files.length === 1 ? ' file selected' : ' files selected');
  interactions?.update({ busy: Boolean(job), canClear: files.length > 0 || Boolean(clearSnapshot), resetKey: clearEpoch });
  queue.hidden = !files.length;
  queue.replaceChildren();
  for (const [file, url] of scanPreviews) {
    if (mode === 'scan' && files.includes(file)) continue;
    URL.revokeObjectURL(url);
    scanPreviews.delete(file);
    scanEdits.delete(file);
  }

  files.forEach((file, index) => {
    const row = document.createElement('li');
    const name = document.createElement('span');
    name.className = 'filename';
    name.textContent = file.name;
    if (mode === 'scan') {
      if (!scanPreviews.has(file)) scanPreviews.set(file, URL.createObjectURL(file));
      const preview = document.createElement('img');
      preview.className = 'scan-thumbnail';
      preview.alt = '';
      preview.loading = 'lazy';
      preview.src = scanPreviews.get(file);
      row.append(preview);
    }
    const details = document.createElement('div');
    details.className = 'file-details';
    const meta = document.createElement('span');
    meta.className = 'file-meta';
    const size = formatFileSize(file.size);
    meta.textContent = (mode === 'scan' ? 'Page ' + (index + 1) + ' · ' : '') + size;
    details.append(name, meta);
    if (mode !== 'scan') {
      const fileIcon = document.createElement('span');
      fileIcon.className = 'queue-file-icon';
      fileIcon.innerHTML = iconMarkup(tool.kind === 'images' ? icons.image : icons.file);
      row.append(fileIcon);
    }
    row.append(details);
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

    if (mode === 'scan') {
      const edit = document.createElement('button');
      edit.type = 'button';
      edit.className = 'outline scan-edit-button';
      edit.innerHTML = iconMarkup(icons.edit) + '<span>Edit</span>';
      edit.title = 'Crop and straighten page ' + (index + 1);
      edit.setAttribute('aria-label', 'Edit page ' + (index + 1));
      edit.disabled = Boolean(job);
      edit.onclick = async () => {
        try {
          const { editScanPage } = await import('./scan-editor.js');
          const dialog = $('scan-editor');
          if (mode !== 'scan' || job || !files.includes(file) || dialog.open) return;
          await editScanPage(dialog, scanPreviews.get(file), scanEdits.get(file), $('grayscale').checked, edited => {
            scanEdits.set(file, edited);
            clearResult();
            edit.innerHTML = iconMarkup(edited.corners || edited.rotation ? icons.check : icons.edit) + '<span>' + (edited.corners || edited.rotation ? 'Edited' : 'Edit') + '</span>';
          });
        } catch {
          report('The scan editor could not load. Reload docSpace and try again.', true);
        }
      };
      const saved = scanEdits.get(file);
      if (saved?.corners || saved?.rotation) edit.innerHTML = iconMarkup(icons.check) + '<span>Edited</span>';
      actions.append(edit);
    }

    const buttons = tool.multiple ? [[icons.arrowUp, 'Move up', -1], [icons.arrowDown, 'Move down', 1]] : [];
    buttons.push([icons.remove, 'Remove', 0]);
    for (const [symbol, label, move] of buttons) {
      const button = document.createElement('button');
      button.className = 'icon-button';
      button.innerHTML = iconMarkup(symbol);
      button.type = 'button';
      button.title = label;
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
  clearSnapshot = undefined;
  clearEpoch++;
  files = next;
  resetPagePicker();
  render();
}

function clearFiles() {
  if (job || !files.length) return;
  clearSnapshot = { files: [...files], edits: new Map(scanEdits), pages: pagePicker.getEdits() };
  files = [];
  resetPagePicker();
  clearResult();
  render();
}

function undoClear() {
  if (job || !clearSnapshot || files.length) return;
  files = clearSnapshot.files;
  const restoredPages = clearSnapshot.pages;
  for (const [file, edit] of clearSnapshot.edits) scanEdits.set(file, edit);
  clearSnapshot = undefined;
  resetPagePicker(restoredPages);
  clearResult();
  render();
}

function expireClear() {
  clearSnapshot = undefined;
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
  result = data;
  objectUrl = URL.createObjectURL(data.blob);
  download.href = objectUrl;
  const dot = data.filename.lastIndexOf('.');
  outputName.value = data.filename.slice(0, dot);
  $('output-extension').textContent = data.filename.slice(dot);
  syncOutputName();
  $('save-options').hidden = false;
  $('continue-options').hidden = data.blob.type !== 'application/pdf';
  const extension = data.filename.slice(dot);
  const kind = { '.pdf': ['Save your PDF', 'PDF document'], '.docx': ['Save your document', 'Word document'], '.zip': ['Save your archive', 'ZIP archive'] }[extension];
  $('delivery-title').textContent = kind[0];
  $('delivery-type').textContent = kind[1];
  $('delivery-size').textContent = formatFileSize(data.blob.size);
  $('delivery-file-icon').innerHTML = iconMarkup(extension === '.zip' ? icons.archive : icons.file);
  document.querySelector('.result').classList.add('is-ready');
  report('Your download is ready.');
  outputName.focus();
  outputName.select();

  // If user is logged in, asynchronously record tool usage in Supabase with RLS
  if (session && account) {
    recordToolUsage(session.user.id, mode).catch(() => {});
  }
}

function syncOutputName() {
  if (!result) return;
  const name = outputFilename(outputName.value, result.filename);
  download.download = name;
  download.innerHTML = iconMarkup(icons.download) + '<span>Download</span>';
  download.setAttribute('aria-label', 'Download ' + name);
  delivery.refresh();
}

function namedResult() {
  return new File([result.blob], download.download, { type: result.blob.type });
}
outputName.oninput = syncOutputName;
outputName.onblur = () => {
  if (!result) return;
  const extension = result.filename.slice(result.filename.lastIndexOf('.'));
  outputName.value = outputFilename(outputName.value, result.filename).slice(0, -extension.length);
};
outputName.onkeydown = event => {
  if (event.key === 'Enter' && result) {
    event.preventDefault();
    download.click();
  }
};
// Signature canvas drawing setup
const signatureCanvas = $('signature-pad');
let sigCtx;
let isDrawingSig = false;
let hasSignatureStroke = false;

if (signatureCanvas) {
  sigCtx = signatureCanvas.getContext('2d');
  sigCtx.lineWidth = 2.5;
  sigCtx.lineCap = 'round';
  sigCtx.lineJoin = 'round';
  sigCtx.strokeStyle = '#181528';

  const getPos = event => {
    const rect = signatureCanvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (signatureCanvas.width / rect.width),
      y: (event.clientY - rect.top) * (signatureCanvas.height / rect.height)
    };
  };

  signatureCanvas.addEventListener('pointerdown', event => {
    if (job || !event.isPrimary || event.button !== 0) return;
    event.preventDefault();
    signatureCanvas.setPointerCapture(event.pointerId);
    isDrawingSig = true;
    const pos = getPos(event);
    sigCtx.beginPath();
    sigCtx.moveTo(pos.x, pos.y);
    clearResult();
  });

  signatureCanvas.addEventListener('pointermove', event => {
    if (!isDrawingSig || !signatureCanvas.hasPointerCapture(event.pointerId)) return;
    const pos = getPos(event);
    sigCtx.lineTo(pos.x, pos.y);
    sigCtx.stroke();
    hasSignatureStroke = true;
  });

  const endDraw = () => {
    isDrawingSig = false;
    sigCtx.closePath();
  };
  signatureCanvas.addEventListener('pointerup', endDraw);
  signatureCanvas.addEventListener('pointercancel', endDraw);
  signatureCanvas.addEventListener('lostpointercapture', endDraw);

  $('clear-signature').onclick = () => {
    sigCtx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
    hasSignatureStroke = false;
    clearResult();
  };
}

$('watermark-text').oninput = $('number-start').oninput = $('sign-page').oninput = $('sign-position').onchange = clearResult;
$('continue-tool').onclick = () => {
  if (result?.blob.type !== 'application/pdf' || job) return;
  const file = namedResult();
  chooseTool($('next-tool').value);
  files = [];
  addFiles([file]);
  $('tool-title').scrollIntoView({ block: 'center' });
};
$('reload-tool').onclick = () => location.reload();
$('browse').onclick = () => picker.click();
$('take-photo').onclick = () => $('camera-picker').click();
$('camera-picker').onchange = event => {
  if (mode === 'scan') addFiles([...event.target.files]);
  event.target.value = '';
};
$('grayscale').onchange = clearResult;
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
  if (mode === 'scan') {
    const { prepareScanPages } = await import('./scan.js');
    const pages = await prepareScanPages(files, files.map(file => scanEdits.get(file)), data.grayscale, signal, page => {
      if (job === current) report(`Preparing page ${page} of ${files.length}…`);
    });
    if (job === current) startWorker({ ...data, files: pages });
    return;
  }
  if (!['word', 'export', 'compress', 'docx', 'redact'].includes(mode)) {
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
  if (mode === 'redact') {
    const { redactPdf } = await import('./redact.js');
    result = { blob: await redactPdf(bytes, signal, selection, data.stampOptions.text), filename: 'redacted.pdf' };
  } else if (mode === 'word') {
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
  try {
    checkClientRateLimit();
  } catch (rateErr) {
    report(rateErr.message, true);
    return;
  }

  if (mode === 'sign' && !hasSignatureStroke) {
    report('Please draw your signature in the pad before proceeding.', true);
    return;
  }

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
    grayscale: $('grayscale').checked,
    stampOptions: { text: $('watermark-text').value, start: $('number-start').value },
    signatureDataUrl: mode === 'sign' ? signatureCanvas?.toDataURL('image/png') : null,
    signOptions: { page: $('sign-page').value, position: $('sign-position').value },
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

bindTheme($('theme'), () => {});
interactions = mountInteractions({
  themeSelect: $('theme'),
  imageSelect: $('image-format'),
  clearFiles,
  undoClear,
  expireClear,
});
interactions.update({ busy: Boolean(job), canClear: files.length > 0, resetKey: clearEpoch });
$('install-dialog').addEventListener('close', () => {
  const target = $('install').hidden ? document.querySelector('.brand') : $('install');
  target.focus();
});
bindInstall($('install'), $('install-dialog'));

if (hasAccount) initAccount().catch(() => {
  $('account').disabled = true;
  $('account').textContent = 'Sign-in unavailable';
});

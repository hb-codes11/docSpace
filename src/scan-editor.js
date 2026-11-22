import { icons, iconMarkup } from './icons.js';
import { fullPage, validCrop } from './scan-geometry.js';
import { readScanImage, renderScan } from './scan.js';

export async function editScanPage(dialog, url, initial, grayscale, onSave) {
  const stage = dialog.querySelector('.scan-stage');
  const source = dialog.querySelector('.scan-source');
  const outline = dialog.querySelector('.scan-outline');
  const handles = [...dialog.querySelectorAll('.scan-corner')];
  const preview = dialog.querySelector('.scan-result-preview');
  const toggle = dialog.querySelector('#scan-preview-toggle');
  const note = dialog.querySelector('#scan-editor-status');
  const save = dialog.querySelector('#scan-edit-save');
  const rotate = dialog.querySelector('#scan-rotate');
  const reset = dialog.querySelector('#scan-reset');
  const controller = new AbortController();
  const { signal } = controller;
  let corners = (initial?.corners ?? fullPage).map(point => [...point]);
  let rotation = initial?.rotation ?? 0;
  let image;
  let showingPreview = false;

  function draw() {
    outline.style.clipPath = 'polygon(' + corners.map(([x, y]) => `${100 * x}% ${100 * y}%`).join(', ') + ')';
    handles.forEach((handle, i) => {
      handle.style.left = 100 * corners[i][0] + '%';
      handle.style.top = 100 * corners[i][1] + '%';
    });
    save.disabled = !image || !validCrop(corners);
    toggle.disabled = save.disabled;
    note.textContent = !image ? 'Opening photo…' : save.disabled ? 'Move the corners so the edges do not cross.' : '';
  }

  function setCorner(index, x, y) {
    corners[index] = [Math.min(1, Math.max(0, x)), Math.min(1, Math.max(0, y))];
    draw();
  }

  handles.forEach((handle, index) => {
    function track(event) {
      const bounds = stage.getBoundingClientRect();
      setCorner(index, (event.clientX - bounds.left) / bounds.width, (event.clientY - bounds.top) / bounds.height);
    }
    handle.onpointerdown = event => {
      if (!event.isPrimary || event.button !== 0) return;
      handle.setPointerCapture(event.pointerId);
    };
    handle.onpointermove = event => {
      if (handle.hasPointerCapture(event.pointerId)) track(event);
    };
    handle.onkeydown = event => {
      const directions = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
      if (!Object.hasOwn(directions, event.key)) return;
      event.preventDefault();
      const [dx, dy] = directions[event.key];
      const step = event.shiftKey ? .05 : .01;
      setCorner(index, corners[index][0] + dx * step, corners[index][1] + dy * step);
    };
  });

  function edits() {
    return { corners: corners.every(([x, y], i) => x === fullPage[i][0] && y === fullPage[i][1]) ? undefined : corners, rotation };
  }

  function showCrop() {
    showingPreview = false;
    stage.hidden = !image;
    preview.hidden = true;
    toggle.innerHTML = iconMarkup(icons.preview) + '<span>Preview</span>';
    draw();
  }

  toggle.onclick = async () => {
    if (showingPreview) { showCrop(); return; }
    showingPreview = true;
    toggle.disabled = rotate.disabled = reset.disabled = save.disabled = true;
    note.textContent = 'Preparing preview…';
    try {
      const canvas = await renderScan(image, edits(), grayscale, signal, 480);
      if (signal.aborted) return;
      stage.hidden = true;
      preview.replaceChildren(canvas);
      preview.hidden = false;
      toggle.innerHTML = iconMarkup(icons.edit) + '<span>Edit corners</span>';
      note.textContent = '';
    } catch (error) {
      if (!signal.aborted) {
        showCrop();
        note.textContent = error.message;
      }
    } finally {
      if (!signal.aborted) toggle.disabled = rotate.disabled = reset.disabled = save.disabled = false;
    }
  };
  rotate.onclick = () => {
    rotation = (rotation + 90) % 360;
    showCrop();
    toggle.click();
  };
  reset.onclick = () => {
    corners = fullPage.map(point => [...point]);
    rotation = 0;
    showCrop();
  };
  save.onclick = () => {
    if (!validCrop(corners) || !image) return;
    onSave(edits());
    dialog.close();
  };
  dialog.addEventListener('close', () => {
    controller.abort();
    source.removeAttribute('src');
    preview.replaceChildren();
  }, { once: true });
  showCrop();
  reset.disabled = rotate.disabled = true;
  dialog.showModal();
  try {
    image = await readScanImage(url);
    if (signal.aborted) return;
    source.src = image.src;
    stage.style.setProperty('--scan-ratio', image.naturalWidth / image.naturalHeight);
    rotate.disabled = reset.disabled = false;
    showCrop();
  } catch {
    if (!signal.aborted) note.textContent = 'Could not open the photo. Retake it or choose another image.';
  }
}

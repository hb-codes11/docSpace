import { icons, iconMarkup } from './icons.js';
import './components/delivery.css';

export function formatFileSize(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  if (bytes >= 1024) return Math.ceil(bytes / 1024) + ' KB';
  return bytes + ' B';
}

export async function saveFile(file) {
  const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
  const descriptions = { '.pdf': 'PDF document', '.docx': 'Word document', '.zip': 'ZIP archive' };
  const handle = await window.showSaveFilePicker({
    suggestedName: file.name,
    types: [{ description: descriptions[extension] || 'Document', accept: { [file.type]: [extension] } }],
  });
  let stream;
  try {
    stream = await handle.createWritable();
    await stream.write(file);
    await stream.close();
    return handle.name || file.name;
  } catch (error) {
    if (stream) await stream.abort().catch(() => {});
    throw error;
  }
}

function canShareFile(file) {
  try {
    return typeof navigator.share === 'function' && navigator.canShare?.({ files: [file] }) === true;
  } catch {
    return false;
  }
}

export function bindDelivery({ getResult, getFile, download, nameInput, browse }) {
  const save = document.getElementById('save-file');
  const share = document.getElementById('share-file');
  const feedback = document.getElementById('delivery-status');
  const dialog = document.getElementById('share-dialog');
  const fallbackDownload = document.getElementById('share-download');
  let operation;

  function report(message, error = false) {
    feedback.textContent = message;
    feedback.classList.toggle('error', error);
  }

  function updateControls() {
    const busy = Boolean(operation);
    const nativeSave = typeof window.showSaveFilePicker === 'function';
    save.hidden = !nativeSave;
    save.disabled = share.disabled = nameInput.disabled = busy;
    download.setAttribute('aria-disabled', String(busy));
    download.className = nativeSave ? 'outline delivery-download' : 'primary delivery-download';
    save.innerHTML = iconMarkup(icons.save) + '<span>' + (operation?.kind === 'save' ? 'Saving…' : 'Save file') + '</span>';
    share.innerHTML = iconMarkup(icons.share) + '<span>' + (operation?.kind === 'share' ? 'Sharing…' : 'Share file') + '</span>';
    document.getElementById('save-options').setAttribute('aria-busy', String(busy));
  }

  function isCurrent(action) {
    return operation === action && getResult() === action.result;
  }

  function showShareFallback(file, message) {
    document.getElementById('share-filename').textContent = file.name;
    document.getElementById('share-help').textContent = message || 'Download this file, then attach it in Mail, Messages, or another app.';
    fallbackDownload.href = download.href;
    fallbackDownload.download = file.name;
    if (!dialog.open) dialog.showModal();
  }

  download.onclick = event => {
    if (operation || !getResult()) event.preventDefault();
    else report('Download started. Check your browser downloads.');
  };
  fallbackDownload.onclick = () => report('Download started. Attach the downloaded file in your sharing app.');
  dialog.addEventListener('close', () => {
    (getResult() ? share : browse).focus();
  });

  save.onclick = async () => {
    const result = getResult();
    if (!result || operation) return;
    const file = getFile();
    if (typeof window.showSaveFilePicker !== 'function') {
      download.click();
      return;
    }
    const action = { result, kind: 'save' };
    operation = action;
    updateControls();
    report('Choose where to save your file.');
    try {
      const name = await saveFile(file);
      if (isCurrent(action)) {
        const extension = file.name.slice(file.name.lastIndexOf('.'));
        if (name.toLowerCase().endsWith(extension.toLowerCase())) {
          nameInput.value = name.slice(0, -extension.length);
          nameInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        report('Saved as ' + name + '.');
      }
    } catch (error) {
      if (isCurrent(action)) {
        report(error.name === 'AbortError' ? 'Save canceled. Your file is still ready.' : 'Could not save to that folder. Try Download.', error.name !== 'AbortError');
      }
    } finally {
      if (operation === action) {
        operation = undefined;
        updateControls();
      }
    }
  };

  share.onclick = async () => {
    const result = getResult();
    if (!result || operation) return;
    const file = getFile();
    if (!canShareFile(file)) {
      showShareFallback(file);
      return;
    }
    const action = { result, kind: 'share' };
    operation = action;
    updateControls();
    report('Choose an app in the share sheet.');
    try {
      await navigator.share({ files: [file] });
      if (isCurrent(action)) report('Sharing finished.');
    } catch (error) {
      if (isCurrent(action)) {
        if (error.name === 'AbortError') report('Sharing canceled. Your file is still ready.');
        else showShareFallback(file, 'Sharing could not open. Download the file and attach it in another app.');
      }
    } finally {
      if (operation === action) {
        operation = undefined;
        updateControls();
      }
    }
  };

  return {
    refresh: updateControls,
    reset() {
      operation = undefined;
      report('');
      if (dialog.open) dialog.close();
      fallbackDownload.removeAttribute('href');
      updateControls();
    },
  };
}

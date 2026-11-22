import { icons, iconMarkup } from './icons.js';
import { pageSelection } from './ranges.js';

export function createPagePicker({ grid, feedback, range, onEdit }) {
  let controller;
  let pages = [];
  let urls = [];
  let organizing = false;
  let disabled = false;
  let dragged;

  function reset() {
    controller?.abort();
    controller = undefined;
    urls.forEach(url => URL.revokeObjectURL(url));
    urls = [];
    pages = [];
    dragged = undefined;
    grid.replaceChildren();
    grid.hidden = true;
    feedback.textContent = '';
  }

  function render(focus) {
    const selected = new Set();
    try {
      if (range.value.trim()) {
        for (const index of pageSelection(range.value, pages.length)) selected.add(index);
      }
    } catch {
      // The range field remains editable while an incomplete range is typed.
    }
    const rows = pages.map((page, position) => {
      const card = document.createElement('li');
      card.dataset.page = page.index;
      const image = document.createElement('img');
      image.alt = '';
      image.style.rotate = page.turn + 'deg';
      if (page.url) image.src = page.url;
      const label = 'Page ' + (page.index + 1);

      if (!organizing) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'page-select';
        button.disabled = disabled;
        button.setAttribute('aria-pressed', String(selected.has(page.index)));
        button.append(image, label);
        button.onclick = () => {
          if (selected.has(page.index)) selected.delete(page.index);
          else selected.add(page.index);
          range.value = [...selected].map(index => index + 1).join(', ');
          onEdit();
          render([page.index, 'select']);
        };
        button.dataset.action = 'select';
        card.append(button);
        return card;
      }

      const caption = document.createElement('span');
      caption.textContent = label;
      card.append(image, caption);
      card.draggable = !disabled;
      card.ondragstart = event => {
        dragged = page;
        event.dataTransfer.setData('text/plain', label);
      };
      card.ondragend = () => { dragged = undefined; };
      card.ondragover = event => { if (dragged) event.preventDefault(); };
      card.ondrop = event => {
        if (!dragged || disabled) return;
        event.preventDefault();
        event.stopPropagation();
        move(dragged, position);
        dragged = undefined;
        onEdit();
        render();
      };
      const actions = document.createElement('div');
      actions.className = 'page-actions';
      const buttons = [
        [icons.arrowUp, 'Move earlier', () => move(page, position - 1), position === 0],
        [icons.arrowDown, 'Move later', () => move(page, position + 1), position === pages.length - 1],
        [icons.rotate, 'Rotate clockwise', () => { page.turn = (page.turn + 90) % 360; }, false],
        [icons.remove, 'Remove', () => { pages.splice(position, 1); }, pages.length === 1],
      ];
      for (const [symbol, action, run, unavailable] of buttons) {
        const button = document.createElement('button');
        button.className = 'icon-button';
        button.innerHTML = iconMarkup(symbol);
        button.type = 'button';
        button.title = action;
        button.dataset.action = action;
        button.setAttribute('aria-label', action + ' ' + label.toLowerCase());
        button.disabled = disabled || unavailable;
        button.onclick = () => {
          run();
          onEdit();
          render([pages.includes(page) ? page.index : pages[Math.min(position, pages.length - 1)].index, action]);
        };
        actions.append(button);
      }
      card.append(actions);
      return card;
    });
    grid.replaceChildren(...rows);
    grid.hidden = !rows.length;
    if (focus) {
      const row = rows.find(card => Number(card.dataset.page) === focus[0]);
      const buttons = [...(row?.querySelectorAll('button:enabled') ?? [])];
      (buttons.find(button => button.dataset.action === focus[1]) ?? buttons[0])?.focus();
    }
  }

  function move(page, position) {
    pages.splice(pages.indexOf(page), 1);
    pages.splice(position, 0, page);
  }

  async function load(file, editMode) {
    reset();
    organizing = editMode;
    if (!file) return;
    controller = new AbortController();
    const { signal } = controller;
    feedback.textContent = 'Loading pages…';
    try {
      const [{ withPdf, pageImage }, bytes] = await Promise.all([import('./view-pdf.js'), file.arrayBuffer()]);
      await withPdf(bytes, signal, async pdf => {
        pages = Array.from({ length: pdf.numPages }, (_, index) => ({ index, turn: 0 }));
        render();
        onEdit(true);
        feedback.textContent = organizing ? 'Drag pages to reorder them, or use the arrow buttons.' : 'Select pages or enter a range. An empty range exports all pages.';
        const visiblePages = [...pages];
        for (const page of visiblePages) {
          try {
            const blob = await pageImage(pdf, page.index, 140, signal);
            if (signal.aborted) return;
            page.url = URL.createObjectURL(blob);
            urls.push(page.url);
            const image = grid.querySelector(`[data-page="${page.index}"] img`);
            if (image) image.src = page.url;
          } catch {
            if (signal.aborted) return;
          }
        }
      });
    } catch {
      if (!signal.aborted) feedback.textContent = 'Could not preview this PDF. Try an unlocked, valid copy.';
    }
  }

  return {
    load,
    reset,
    updateRange: () => render(),
    setDisabled(value) {
      if (disabled === value) return;
      disabled = value;
      render();
    },
    getEdits: () => pages.map(({ index, turn }) => ({ index, turn })),
  };
}

import { combine, openPdf, pageSelection } from './pdf.js';
import { MAX_BYTES, MAX_PAGES } from './limits.js';


self.onmessage = async ({ data: { files, mode, selection, separate, pageEdits, lines, stampOptions } }) => {
  try {
    if (files.reduce((size, file) => size + file.size, 0) > MAX_BYTES) {
      throw new Error('Choose files totaling 100 MB or less.');
    }
    if (mode === 'images' || mode === 'docx') {
      const { imagesToPdf, textToPdf } = await import('./convert.js');
      const bytes = mode === 'images' ? await imagesToPdf(files) : await textToPdf(lines);
      self.postMessage({ blob: new Blob([bytes], { type: 'application/pdf' }), filename: mode === 'images' ? 'images.pdf' : 'document.pdf' });
      return;
    }
    const groups = [];
    let pageCount = 0;
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const pdf = await openPdf(bytes);
      pageCount += pdf.getPageCount();
      if (pageCount > MAX_PAGES) throw new Error('Choose files totaling 500 pages or less.');
      groups.push({ pdf });
    }

    if (mode === 'watermark' || mode === 'numbers') {
      const { stampPdf } = await import('./stamp.js');
      const bytes = await stampPdf(groups[0].pdf, mode, stampOptions, selection);
      self.postMessage({ blob: new Blob([bytes], { type: 'application/pdf' }), filename: mode === 'watermark' ? 'watermarked.pdf' : 'numbered.pdf' });
      return;
    }

    if (mode === 'split') {
      const pages = pageSelection(selection || `1-${pageCount}`, pageCount);
      if (separate) {
        const { zipPages } = await import('./zip.js');
        const blob = await zipPages(groups[0].pdf, pages);
        self.postMessage({ blob, filename: 'split-pages.zip' });
        return;
      }
      groups[0].pages = pages;
    }

    if (mode === 'organize') {
      if (!pageEdits.length) throw new Error('Keep at least one page.');
      groups[0].pages = pageEdits.map(page => page.index);
      groups[0].rotations = Object.fromEntries(pageEdits.map(page => [page.index, page.turn]));
    }
    const bytes = await combine(groups);
    const blob = new Blob([bytes], { type: 'application/pdf' });
    self.postMessage({ blob, filename: ({ merge: 'merged.pdf', split: 'extracted.pdf', organize: 'organized.pdf' })[mode] });
  } catch (error) {
    self.postMessage({ error: error instanceof Error ? error.message : 'Processing failed.' });
  }
};

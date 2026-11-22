import { PDFDocument } from 'pdf-lib';
import { pageSelection } from './ranges.js';
import { withPdf, pageImage } from './view-pdf.js';
import { sanitizePdf } from './protect.js';
import { MAX_BYTES } from './limits.js';

export function redactPdf(bytes, signal, range, label = '') {
  return withPdf(bytes, signal, async pdf => {
    if (pdf.numPages > 50) throw new Error('Blackout supports documents with up to 50 pages. Split a larger PDF first.');
    const selected = new Set(pageSelection(range || `1-${pdf.numPages}`, pdf.numPages));
    const output = await PDFDocument.create();
    let encodedSize = 0;

    for (let index = 0; index < pdf.numPages; index++) {
      signal.throwIfAborted();
      const source = await pdf.getPage(index + 1);
      const { width, height } = source.getViewport({ scale: 1 });
      const imageBlob = await pageImage(pdf, index, 2000, signal, 'image/png', 1, canvas => {
        if (!selected.has(index)) return;
        const ctx = canvas.getContext('2d');
        const scaleX = canvas.width / width;
        const scaleY = canvas.height / height;
        const margin = Math.min(36, width * 0.1, height * 0.1);
        const bandHeight = Math.min(36, height - margin * 2);
        ctx.fillStyle = '#14141f';
        ctx.fillRect(margin * scaleX, margin * scaleY, (width - margin * 2) * scaleX, bandHeight * scaleY);
        if (label.trim()) {
          ctx.fillStyle = '#ffffff';
          ctx.font = `${Math.min(11, bandHeight / 2) * scaleY}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(label.trim(), canvas.width / 2, (margin + bandHeight / 2) * scaleY, (width - margin * 3) * scaleX);
        }
      });
      signal.throwIfAborted();
      encodedSize += imageBlob.size;
      if (encodedSize > MAX_BYTES) throw new Error('The blackout result exceeds 100 MB. Try a smaller document.');
      // Embed only the painted pixels. Original text and image streams never enter the output.
      const image = await output.embedPng(await imageBlob.arrayBuffer());
      output.addPage([width, height]).drawImage(image, { x: 0, y: 0, width, height });
    }

    const result = await sanitizePdf(output);
    signal.throwIfAborted();
    if (result.byteLength > MAX_BYTES) throw new Error('The blackout result exceeds 100 MB. Try a smaller document.');
    return new Blob([result], { type: 'application/pdf' });
  });
}

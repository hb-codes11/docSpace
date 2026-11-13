import JSZip from 'jszip';
import { pageSelection } from './ranges.js';
import { withPdf, pageImage } from './view-pdf.js';

export function pdfToImages(bytes, signal, range, type) {
  return withPdf(bytes, signal, async pdf => {
    const pages = pageSelection(range || `1-${pdf.numPages}`, pdf.numPages);
    if (pages.length > 50) throw new Error('Export up to 50 page images at a time. Enter a smaller range.');
    const zip = new JSZip();
    let size = 0;
    for (const index of pages) {
      const blob = await pageImage(pdf, index, 1600, signal, type);
      size += blob.size;
      if (size > 100 * 1024 * 1024) throw new Error('The images exceed 100 MB. Try fewer pages or choose JPG.');
      const extension = type === 'image/png' ? 'png' : 'jpg';
      zip.file(`page-${String(index + 1).padStart(3, '0')}.${extension}`, await blob.arrayBuffer());
    }
    return zip.generateAsync({ type: 'blob' });
  });
}

export function compressScan(bytes, signal, sourceSize) {
  return withPdf(bytes, signal, async pdf => {
    const { PDFDocument } = await import('pdf-lib');
    const output = await PDFDocument.create();
    if (pdf.numPages > 50) throw new Error('Compress a scan with up to 50 pages.');
    let encodedSize = 0;
    for (let index = 0; index < pdf.numPages; index++) {
      const sourcePage = await pdf.getPage(index + 1);
      const { width, height } = sourcePage.getViewport({ scale: 1 });
      const blob = await pageImage(pdf, index, 1200, signal, 'image/jpeg', .63);
      encodedSize += blob.size;
      if (encodedSize >= sourceSize) throw new Error('This setting would make the PDF larger. Keep the original.');
      const image = await output.embedJpg(await blob.arrayBuffer());
      output.addPage([width, height]).drawImage(image, { x: 0, y: 0, width, height });
    }
    const compressed = await output.save();
    if (compressed.byteLength >= sourceSize) throw new Error('This setting would make the PDF larger. Keep the original.');
    return new Blob([compressed], { type: 'application/pdf' });
  });
}

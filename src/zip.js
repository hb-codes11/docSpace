import JSZip from 'jszip';
import { combine } from './pdf.js';

export async function zipPages(pdf, pages) {
  const zip = new JSZip();
  for (const page of pages) {
    zip.file(`page-${String(page + 1).padStart(3, '0')}.pdf`, await combine([{ pdf, pages: [page] }]));
  }
  return zip.generateAsync({ type: 'blob' });
}

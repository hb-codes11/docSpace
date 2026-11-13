import { PDFDocument, degrees } from 'pdf-lib';
import { MAX_PAGES } from './limits.js';



export { pageSelection } from './ranges.js';

export async function openPdf(bytes) {
  const header = new TextDecoder().decode(new Uint8Array(bytes, 0, Math.min(bytes.byteLength, 1024)));
  if (!header.includes('%PDF-')) throw new Error('Choose a valid PDF file.');
  let pdf;
  let count;
  try {
    pdf = await PDFDocument.load(bytes, { updateMetadata: false, throwOnInvalidObject: true });
    count = pdf.getPageCount();
  } catch {
    throw new Error('This PDF is damaged, encrypted, or unsupported. Try an unlocked copy.');
  }
  if (!count || count > MAX_PAGES) {
    throw new Error(`Each PDF must contain between 1 and ${MAX_PAGES} pages.`);
  }
  return pdf;
}

export async function combine(groups) {
  const output = await PDFDocument.create();
  for (const { pdf, pages, rotations } of groups) {
    const indices = pages ?? pdf.getPageIndices();
    const copied = await output.copyPages(pdf, indices);
    for (const [index, page] of copied.entries()) {
      const turn = rotations?.[indices[index]] ?? 0;
      if (turn) page.setRotation(degrees((page.getRotation().angle + turn) % 360));
      output.addPage(page);
    }
  }
  return output.save();
}

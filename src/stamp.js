import { StandardFonts, rgb } from 'pdf-lib';
import { pageSelection } from './ranges.js';

export async function stampPdf(pdf, mode, options, range) {
  const indices = pageSelection(range || `1-${pdf.getPageCount()}`, pdf.getPageCount());
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const text = options.text?.trim();
  const start = Number(options.start);
  if (mode === 'watermark' && (!text || text.length > 80)) {
    throw new Error('Enter a watermark between 1 and 80 characters.');
  }
  if (mode === 'numbers' && (!Number.isInteger(start) || start < 1 || start > 99999)) {
    throw new Error('Choose a starting number from 1 to 99999.');
  }
  if (mode === 'watermark') {
    try { font.encodeText(text); } catch {
      throw new Error('Watermarks currently support Western European characters.');
    }
  }
  for (const [offset, index] of indices.entries()) {
    const page = pdf.getPage(index);
    const box = page.getCropBox();
    if (page.getRotation().angle % 360 !== 0) {
      throw new Error('This PDF has rotated pages. Use an unrotated copy for stamping.');
    }
    const value = mode === 'watermark' ? text : String(start + offset);
    const baseSize = mode === 'watermark' ? 42 : 12;
    const size = Math.min(baseSize, box.width * .8 / font.widthOfTextAtSize(value, 1), box.height * .08);
    const width = font.widthOfTextAtSize(value, size);
    page.drawText(value, {
      x: box.x + (box.width - width) / 2,
      y: box.y + (mode === 'watermark' ? (box.height - size) / 2 : Math.min(24, box.height * .08)),
      size, font, color: rgb(.23, .19, .32),
      opacity: mode === 'watermark' ? .25 : 1,
    });
  }
  return pdf.save();
}

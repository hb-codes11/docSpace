import { rgb } from 'pdf-lib';
import { pageSelection } from './ranges.js';

export async function sanitizePdf(pdf) {
  // Clear standard document information dictionary
  pdf.setTitle('');
  pdf.setAuthor('');
  pdf.setSubject('');
  pdf.setKeywords([]);
  pdf.setProducer('docSpace (Privacy-First Client Engine)');
  pdf.setCreator('docSpace (100% On-Device)');
  pdf.setCreationDate(new Date(0));
  pdf.setModificationDate(new Date(0));

  return pdf.save();
}

export async function signPdf(pdf, signatureDataUrl, pageIndex = 0, position = 'bottom-right') {
  const count = pdf.getPageCount();
  const targetIndex = Math.max(0, Math.min(count - 1, Number(pageIndex) || 0));
  const page = pdf.getPage(targetIndex);
  const box = page.getCropBox();

  if (!signatureDataUrl || !signatureDataUrl.startsWith('data:image/png;base64,')) {
    throw new Error('Provide a valid handwritten signature drawing.');
  }

  const base64Data = signatureDataUrl.replace(/^data:image\/png;base64,/, '');
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const image = await pdf.embedPng(bytes);
  const targetWidth = Math.min(180, box.width * 0.35);
  const targetHeight = targetWidth * (image.height / image.width || 0.4);

  let x = box.x + 36;
  let y = box.y + 36;

  if (position === 'bottom-right') {
    x = box.x + box.width - targetWidth - 36;
    y = box.y + 36;
  } else if (position === 'bottom-center') {
    x = box.x + (box.width - targetWidth) / 2;
    y = box.y + 36;
  } else if (position === 'center') {
    x = box.x + (box.width - targetWidth) / 2;
    y = box.y + (box.height - targetHeight) / 2;
  }

  page.drawImage(image, {
    x,
    y,
    width: targetWidth,
    height: targetHeight,
  });

  return pdf.save();
}

export async function redactPdf(pdf, range, textLabel = '') {
  const indices = pageSelection(range || `1-${pdf.getPageCount()}`, pdf.getPageCount());
  
  for (const index of indices) {
    const page = pdf.getPage(index);
    const box = page.getCropBox();

    // Visual blackout banner across header and footer zone or sensitive band
    page.drawRectangle({
      x: box.x + 36,
      y: box.y + box.height - 72,
      width: box.width - 72,
      height: 36,
      color: rgb(0.08, 0.08, 0.12),
    });

    if (textLabel) {
      // Optional overlay text
      const font = await pdf.embedStandardFont('Helvetica-Bold');
      const fontSize = 11;
      const textWidth = font.widthOfTextAtSize(textLabel, fontSize);
      page.drawText(textLabel, {
        x: box.x + (box.width - textWidth) / 2,
        y: box.y + box.height - 54,
        size: fontSize,
        font,
        color: rgb(0.95, 0.95, 0.98),
      });
    }
  }

  // Also sanitize metadata on redacted documents
  return sanitizePdf(pdf);
}

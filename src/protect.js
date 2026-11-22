import { PDFName } from 'pdf-lib';

export async function sanitizePdf(pdf) {
  // Remove both standard and custom document information, plus document XMP.
  const info = pdf.context.trailerInfo.Info;
  if (info) pdf.context.delete(info);
  pdf.context.trailerInfo.Info = undefined;
  const metadata = pdf.catalog.get(PDFName.of('Metadata'));
  if (metadata) pdf.context.delete(metadata);
  pdf.catalog.delete(PDFName.of('Metadata'));

  return pdf.save();
}

export async function signPdf(pdf, signatureDataUrl, pageIndex = 0, position = 'bottom-right') {
  const count = pdf.getPageCount();
  const targetIndex = Number(pageIndex);
  if (!Number.isInteger(targetIndex) || targetIndex < 0 || targetIndex >= count) {
    throw new Error(`Choose a page from 1 to ${count}.`);
  }
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
  const margin = Math.min(36, box.width * 0.1, box.height * 0.1);
  const scale = Math.min(180 / image.width, (box.width - margin * 2) / image.width, (box.height - margin * 2) / image.height);
  const targetWidth = image.width * scale;
  const targetHeight = image.height * scale;

  let x = box.x + margin;
  let y = box.y + margin;

  if (position === 'bottom-right') {
    x = box.x + box.width - targetWidth - margin;
    y = box.y + margin;
  } else if (position === 'bottom-center') {
    x = box.x + (box.width - targetWidth) / 2;
    y = box.y + margin;
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

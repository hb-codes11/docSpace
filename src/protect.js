import { PDFName, degrees } from 'pdf-lib';

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
  const angle = ((page.getRotation().angle % 360) + 360) % 360;
  const turned = angle === 90 || angle === 270;
  const width = turned ? box.height : box.width;
  const height = turned ? box.width : box.height;

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
  const margin = Math.min(36, width * 0.1, height * 0.1);
  const scale = Math.min(180 / image.width, (width - margin * 2) / image.width, (height - margin * 2) / image.height);
  const targetWidth = image.width * scale;
  const targetHeight = image.height * scale;

  let x = margin;
  let y = margin;

  if (position === 'bottom-right') {
    x = width - targetWidth - margin;
  } else if (position === 'bottom-center') {
    x = (width - targetWidth) / 2;
  } else if (position === 'center') {
    x = (width - targetWidth) / 2;
    y = (height - targetHeight) / 2;
  }

  // Map the displayed page coordinates back into the PDF's unrotated crop box.
  const origins = {
    0: [x, y],
    90: [box.width - y, x],
    180: [box.width - x, box.height - y],
    270: [y, box.height - x],
  };
  const [originX, originY] = origins[angle];
  page.drawImage(image, {
    x: box.x + originX,
    y: box.y + originY,
    width: targetWidth,
    height: targetHeight,
    rotate: degrees(angle),
  });

  return pdf.save();
}

import { PDFDocument, StandardFonts } from 'pdf-lib';

export async function imagesToPdf(files) {
  const pdf = await PDFDocument.create();
  for (const file of files) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    let image;
    try {
      image = bytes[0] === 0xff && bytes[1] === 0xd8
        ? await pdf.embedJpg(bytes)
        : await pdf.embedPng(bytes);
    } catch {
      throw new Error('Choose valid JPG or PNG images.');
    }
    const scale = Math.min(1, 1200 / Math.max(image.width, image.height));
    const { width, height } = image.scale(scale);
    pdf.addPage([width, height]).drawImage(image, { x: 0, y: 0, width, height });
  }
  return pdf.save();
}

export async function textToPdf(lines) {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  let page;
  let y = 0;
  for (const line of lines) {
    if (line.trim()) {
      try {
        font.encodeText(line);
      } catch {
        throw new Error('This text-only PDF export supports Western European characters. Use Word or LibreOffice for other scripts.');
      }
    }
    let start = 0;
    do {
      let end = start;
      while (end < line.length && font.widthOfTextAtSize(line.slice(start, end + 1), 11) <= 503) end++;
      if (end < line.length) {
        const space = line.lastIndexOf(' ', end);
        if (space > start) end = space + 1;
      }
      if (y < 46) {
        if (pdf.getPageCount() >= 500) throw new Error('The exported PDF would exceed 500 pages.');
        page = pdf.addPage([595, 842]);
        y = 796;
      }
      page.drawText(line.slice(start, end).trimEnd(), { x: 46, y, size: 11, font });
      y -= 15;
      start = end;
    } while (start < line.length);
    y -= 4;
  }
  return pdf.save();
}

import { withPdf } from './view-pdf.js';
import { Document, Packer, Paragraph } from 'docx';

export function toWord(buffer, signal) {
  return withPdf(buffer, signal, async pdf => {
    const pageCount = pdf.numPages;
    const paragraphs = [];
    let hasText = false;
    for (let number = 1; number <= pageCount; number++) {
      signal.throwIfAborted();
      const page = await pdf.getPage(number);
      const { items } = await page.getTextContent();
      const text = items.map(item => ('str' in item ? item.str + (item.hasEOL ? '\n' : '') : '')).join('');
      if (text.trim()) hasText = true;
      const lines = text.trimEnd().split('\n');
      lines.forEach((line, index) => {
        paragraphs.push(new Paragraph({ text: line, pageBreakBefore: number > 1 && index === 0 }));
      });
      page.cleanup();
    }
    if (!hasText) throw new Error('This PDF has no selectable text. Try a text-based PDF or run OCR first.');
    return await Packer.toBlob(new Document({ sections: [{ children: paragraphs }] }));
  });
}

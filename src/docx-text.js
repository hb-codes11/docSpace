import JSZip from 'jszip';

const WORD = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
const MAX_XML = 4 * 1024 * 1024;

export async function readDocx(bytes, signal) {
  const archive = await JSZip.loadAsync(bytes).catch(() => {
    throw new Error('Choose a valid DOCX file. Older .doc files are unsupported.');
  });
  signal.throwIfAborted();
  const entry = archive.file('word/document.xml');
  if (!entry) throw new Error('This file does not contain a Word document.');
  const xml = await new Promise((resolve, reject) => {
    const decoder = new TextDecoder();
    const chunks = [];
    let size = 0;
    const stream = entry.internalStream('uint8array');
    stream.on('data', chunk => {
      size += chunk.byteLength;
      if (signal.aborted || size > MAX_XML) {
        stream.pause();
        reject(new Error('This Word document is too large to convert.'));
        return;
      }
      chunks.push(decoder.decode(chunk, { stream: true }));
    }).on('error', reject).on('end', () => {
      chunks.push(decoder.decode());
      resolve(chunks.join(''));
    });
    stream.resume();
  });
  signal.throwIfAborted();
  const document = new DOMParser().parseFromString(xml, 'application/xml');
  if (document.doctype || document.querySelector('parsererror')) throw new Error('The Word document is damaged.');
  const paragraphs = [...document.getElementsByTagNameNS(WORD, 'p')];
  const lines = paragraphs.flatMap(paragraph => {
    const runs = [...paragraph.getElementsByTagNameNS(WORD, '*')].filter(node => {
      let parent = node.parentElement;
      while (parent && !(parent.namespaceURI === WORD && parent.localName === 'p')) {
        parent = parent.parentElement;
      }
      return parent === paragraph;
    });
    return runs.map(node => {
      if (node.localName === 't') return node.textContent;
      if (node.localName === 'tab') return '    ';
      if (node.localName === 'br' || node.localName === 'cr') return '\n';
      return '';
    }).join('').replace(/\r\n?/g, '\n').replace(/\t/g, '    ').split('\n');
  });
  if (!lines.some(line => line.trim())) throw new Error('This document has no text to export.');
  return lines;
}

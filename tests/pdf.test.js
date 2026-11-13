import test from 'node:test';
import assert from 'node:assert/strict';
import { PDFDocument } from 'pdf-lib';
import { combine, openPdf, pageSelection } from '../src/pdf.js';
import { zipPages } from '../src/zip.js';
import JSZip from 'jszip';

test('page ranges preserve order, deduplicate and reject invalid input', () => {
  assert.deepEqual(pageSelection('3, 1-3, 5', 5), [2, 0, 1, 4]);
  for (const range of ['0', '3-1', '6', '1,', '2.5', '-1']) {
    assert.throws(() => pageSelection(range, 5));
  }
});

test('combines documents in order and extracts selected pages', async () => {
  const one = await PDFDocument.create();
  one.addPage([200, 100]);
  one.addPage([210, 100]);
  const two = await PDFDocument.create();
  two.addPage([300, 100]);
  const merged = await openPdf((await combine([{ pdf: two }, { pdf: one }])).buffer);
  assert.deepEqual(merged.getPages().map(page => page.getWidth()), [300, 200, 210]);
  const extracted = await openPdf((await combine([{ pdf: merged, pages: [2, 0] }])).buffer);
  assert.deepEqual(extracted.getPages().map(page => page.getWidth()), [210, 300]);
});

test('ZIP contains one valid PDF per selected page', async () => {
  const pdf = await PDFDocument.create();
  pdf.addPage([200, 100]);
  pdf.addPage([300, 100]);
  const zip = await JSZip.loadAsync(await (await zipPages(pdf, [1])).arrayBuffer());
  assert.deepEqual(Object.keys(zip.files), ['page-002.pdf']);
  const page = await openPdf(await zip.file('page-002.pdf').async('arraybuffer'));
  assert.equal(page.getPage(0).getWidth(), 300);
});

test('rejects renamed and corrupt files', async () => {
  await assert.rejects(openPdf(new TextEncoder().encode('Hello').buffer), /valid PDF/);
  await assert.rejects(openPdf(new TextEncoder().encode('%PDF-1.7\ninvalid').buffer), /damaged/);
});

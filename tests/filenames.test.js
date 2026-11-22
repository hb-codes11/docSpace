import test from 'node:test';
import assert from 'node:assert/strict';
import { outputFilename } from '../src/filenames.js';

test('keeps one correct extension on named PDF, Word and ZIP downloads', () => {
  for (const fallback of ['merged.pdf', 'converted.docx', 'page-images.zip']) {
    const extension = fallback.slice(fallback.lastIndexOf('.'));
    assert.equal(outputFilename('My notes' + extension + extension, fallback), 'My notes' + extension);
    assert.equal(outputFilename('   ', fallback), fallback);
  }
});

test('sanitizes paths and reserved filenames while keeping Unicode names', () => {
  assert.equal(outputFilename('../report:2026?', 'merged.pdf'), '-report-2026-.pdf');
  assert.equal(outputFilename('CON', 'merged.pdf'), '_CON.pdf');
  assert.equal(outputFilename('नोट्स', 'merged.pdf'), 'नोट्स.pdf');
  assert.equal(outputFilename('a'.repeat(150), 'merged.pdf'), 'a'.repeat(100) + '.pdf');
});

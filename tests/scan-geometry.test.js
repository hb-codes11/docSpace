import test from 'node:test';
import assert from 'node:assert/strict';
import { cropSize, fullPage, pageProjection, validCrop } from '../src/scan-geometry.js';

test('a trapezoid maps all four output corners to the selected photograph corners', () => {
  const points = [[.22, .08], [.82, .17], [.95, .92], [.04, .88]];
  assert.equal(validCrop(points), true);
  assert.equal(validCrop([points[0], points[2], points[1], points[3]]), false);
  const { a, b, c, d, e, f, g, h } = pageProjection(points);
  fullPage.forEach(([u, v], index) => {
    const z = g * u + h * v + 1;
    assert.ok(Math.abs((a * u + b * v + c) / z - points[index][0]) < 1e-9);
    assert.ok(Math.abs((d * u + e * v + f) / z - points[index][1]) < 1e-9);
  });
  assert.deepEqual(cropSize(fullPage, 1200, 1600), [1200, 1600]);
});

export const fullPage = [[0, 0], [1, 0], [1, 1], [0, 1]];

export function validCrop(points) {
  return points.every(([x, y], i) => {
    const [bx, by] = points[(i + 1) % 4];
    const [cx, cy] = points[(i + 2) % 4];
    return x >= 0 && x <= 1 && y >= 0 && y <= 1 &&
      (bx - x) * (cy - by) - (by - y) * (cx - bx) > .002;
  });
}

// Map a point on the flattened page back to the photographed quadrilateral.
export function pageProjection([[x0, y0], [x1, y1], [x2, y2], [x3, y3]]) {
  const dx1 = x1 - x2;
  const dx2 = x3 - x2;
  const dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2;
  const dy2 = y3 - y2;
  const dy3 = y0 - y1 + y2 - y3;
  const determinant = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / determinant;
  const h = (dx1 * dy3 - dx3 * dy1) / determinant;
  return {
    a: x1 - x0 + g * x1, b: x3 - x0 + h * x3, c: x0,
    d: y1 - y0 + g * y1, e: y3 - y0 + h * y3, f: y0,
    g, h,
  };
}

export function cropSize(points, width, height) {
  const length = (a, b) => Math.hypot(
    (points[a][0] - points[b][0]) * width,
    (points[a][1] - points[b][1]) * height
  );
  return [Math.round(Math.max(length(0, 1), length(3, 2))), Math.round(Math.max(length(0, 3), length(1, 2)))];
}

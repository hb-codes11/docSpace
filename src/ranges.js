export function pageSelection(value, total) {
  const parts = value.trim().split(',');
  const result = new Set();
  for (const part of parts) {
    const match = part.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!match) throw new Error('Enter page numbers or ranges, for example 1-3, 5.');
    const start = Number(match[1]);
    const end = Number(match[2] ?? start);
    if (start < 1 || end < start || end > total) {
      throw new Error(`Use ascending ranges within pages 1–${total}.`);
    }
    for (let page = start; page <= end; page++) result.add(page - 1);
  }
  return [...result];
}

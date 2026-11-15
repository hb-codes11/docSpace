export function outputFilename(input, fallback) {
  const dot = fallback.lastIndexOf('.');
  const extension = fallback.slice(dot);
  let name = input.trim().replace(/[<>:"/\\|?*\u0000-\u001f\u007f]/g, '-');
  while (name.toLowerCase().endsWith(extension)) {
    name = name.slice(0, -extension.length).trimEnd();
  }
  name = [...name].slice(0, 100).join('').replace(/^[. ]+|[. ]+$/g, '');
  if (!name) return fallback;
  if (/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(name)) name = '_' + name;
  return name + extension;
}

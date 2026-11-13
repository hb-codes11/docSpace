import { tools, defaultToolId, getToolBySlugOrId } from './tools-data.js';

export function getInitialRoute() {
  const hash = location.hash.replace(/^#\/?/, '');
  const path = location.pathname.replace(/^\/|\/$/g, '');
  return getToolBySlugOrId(hash)?.id ?? getToolBySlugOrId(path)?.id ?? defaultToolId;
}

export function syncUrlAndMetadata(toolId, navigate = false) {
  const tool = tools[toolId];
  document.title = tool.seoTitle || tool.title + ' — docSpace';
  document.querySelector('meta[name="description"]').content = tool.seoDescription || tool.hint;
  if (navigate) {
    const target = new URL('/', location.origin);
    target.hash = toolId === defaultToolId ? '' : '/' + tool.slug;
    if (target.href !== location.href) history.pushState(null, '', target);
  }
}

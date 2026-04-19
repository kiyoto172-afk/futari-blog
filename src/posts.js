import { CATEGORIES, TAGS } from './data';

export { CATEGORIES, TAGS };

const modules = import.meta.glob('../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const [, yaml, body] = match;
  const data = {};
  const lines = yaml.split('\n');
  let currentList = null;
  for (const line of lines) {
    if (/^\s*-\s+/.test(line) && currentList) {
      currentList.push(line.replace(/^\s*-\s+/, '').trim());
      continue;
    }
    const kv = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)$/);
    if (!kv) continue;
    const [, key, rawVal] = kv;
    const val = rawVal.trim();
    if (val === '') {
      currentList = [];
      data[key] = currentList;
    } else {
      currentList = null;
      if (val === 'true') data[key] = true;
      else if (val === 'false') data[key] = false;
      else data[key] = val.replace(/^["'](.*)["']$/, '$1');
    }
  }
  return { data, body: body.trim() };
}

function formatJpDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${y}年${m}月${d}日`;
}

function fileSlug(path) {
  return path.split('/').pop().replace(/\.md$/, '');
}

const posts = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    return {
      id: fileSlug(path),
      title: data.title || '',
      excerpt: data.excerpt || '',
      category: data.category || '',
      date: data.date ? formatJpDate(data.date) : '',
      dateIso: data.date || '',
      image: data.image || '',
      featured: data.featured === true,
      tags: Array.isArray(data.tags) ? data.tags : [],
      body,
    };
  })
  .sort((a, b) => (a.dateIso < b.dateIso ? 1 : -1));

export const INITIAL_POSTS = posts;

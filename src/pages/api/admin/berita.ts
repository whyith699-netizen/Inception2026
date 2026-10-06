import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { isAuthenticated } from '../../../lib/adminAuth';

export const prerender = false;

const BERITA_DIR = path.resolve('src/content/berita');

export const GET: APIRoute = async ({ request, url }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const files = await fs.readdir(BERITA_DIR);
    const jsonFiles = files.filter((f) => f.endsWith('.json'));
    const articles = await Promise.all(
      jsonFiles.map(async (f) => {
        const raw = await fs.readFile(path.join(BERITA_DIR, f), 'utf-8');
        return JSON.parse(raw);
      })
    );

    articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return new Response(JSON.stringify({ total: articles.length, data: articles }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, date, category, excerpt, body: paragraphs, image, author } = body;

    if (!title || !category) {
      return new Response(JSON.stringify({ error: 'Judul dan Kategori wajib diisi' }), { status: 400 });
    }

    const rawSlug = body.id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
    const slug = rawSlug || `berita-${Date.now()}`;
    const filePath = path.join(BERITA_DIR, `${slug}.json`);

    const articleData = {
      id: slug,
      title: title.trim(),
      date: date || new Date().toISOString().slice(0, 10),
      category: category || 'Berita',
      excerpt: excerpt || (Array.isArray(paragraphs) ? paragraphs[0] : ''),
      body: Array.isArray(paragraphs) ? paragraphs : [paragraphs].filter(Boolean),
      image: image || '',
      author: author || 'Admin Humas SMAN 1 Klaten',
    };

    await fs.writeFile(filePath, JSON.stringify(articleData, null, 2), 'utf-8');

    return new Response(JSON.stringify({ success: true, data: articleData }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, url }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const id = url.searchParams.get('id');
  if (!id) {
    return new Response(JSON.stringify({ error: 'Parameter id diperlukan' }), { status: 400 });
  }

  const sanitizedId = id.replace(/[^a-zA-Z0-9_-]/g, '');
  const filePath = path.join(BERITA_DIR, `${sanitizedId}.json`);

  try {
    await fs.unlink(filePath);
    return new Response(JSON.stringify({ success: true, message: `Artikel ${sanitizedId} berhasil dihapus` }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Artikel tidak ditemukan atau gagal dihapus' }), { status: 404 });
  }
};

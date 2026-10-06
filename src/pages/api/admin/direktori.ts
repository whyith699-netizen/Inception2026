import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { isAuthenticated } from '../../../lib/adminAuth';

export const prerender = false;

const STAFF_PATH = path.resolve('src/content/direktori/staff.json');

export const GET: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const raw = await fs.readFile(STAFF_PATH, 'utf-8');
    const categories = JSON.parse(raw);
    return new Response(JSON.stringify({ data: categories }), {
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
    const { category, name, role, detail, photo } = body;

    if (!category || !name || !role) {
      return new Response(JSON.stringify({ error: 'Kategori, Nama, dan Peran wajib diisi' }), { status: 400 });
    }

    const raw = await fs.readFile(STAFF_PATH, 'utf-8');
    const categories = JSON.parse(raw);

    let catObj = categories.find((c: any) => c.category === category);
    if (!catObj) {
      catObj = { category, people: [] };
      categories.push(catObj);
    }

    const newPerson = {
      name: name.trim(),
      role: role.trim(),
      detail: detail?.trim() || 'Civitas Akademika SMA Negeri 1 Klaten',
      photo: photo?.trim() || '/images/school/logo.png',
    };

    catObj.people.push(newPerson);

    await fs.writeFile(STAFF_PATH, JSON.stringify(categories, null, 2), 'utf-8');

    return new Response(JSON.stringify({ success: true, person: newPerson }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

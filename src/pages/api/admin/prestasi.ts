import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { isAuthenticated } from '../../../lib/adminAuth';

export const prerender = false;

const ACH_PATH = path.resolve('src/content/events/achievements.json');

export const GET: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const raw = await fs.readFile(ACH_PATH, 'utf-8');
    const data = JSON.parse(raw);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ data: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await request.json();
    let currentList: any[] = [];
    try {
      const raw = await fs.readFile(ACH_PATH, 'utf-8');
      currentList = JSON.parse(raw);
    } catch {
      currentList = [];
    }

    const newAch = {
      id: body.id || `ach-${Date.now()}`,
      year: body.year || '2026',
      title: body.title,
      category: body.category || 'osn',
      categoryLabel: body.categoryLabel || 'OSN & Sains',
      level: body.level || 'Nasional',
      medal: body.medal || 'Medali Emas',
      desc: body.desc,
      delegation: body.delegation || 'Siswa Berprestasi SMAN 1 Klaten',
    };

    currentList.unshift(newAch);
    await fs.writeFile(ACH_PATH, JSON.stringify(currentList, null, 2), 'utf-8');

    return new Response(JSON.stringify({ success: true, data: newAch }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

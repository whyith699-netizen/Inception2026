import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

export const GET: APIRoute = async () => {
  const articles = await getCollection('berita');
  const sorted = articles
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((item) => ({
      id: item.id,
      slug: item.id.replace(/\.json$/, ''),
      title: item.data.title,
      date: item.data.date,
      category: item.data.category,
      author: item.data.author,
      excerpt: item.data.excerpt,
      summary: item.data.excerpt,
      body: item.data.body,
      image: item.data.image,
      url: `/berita/${item.id.replace(/\.json$/, '')}`,
    }));

  return new Response(
    JSON.stringify({
      status: 'success',
      meta: {
        total: sorted.length,
        generated_by: 'Astro 7 Rust Compiler Static API Engine',
      },
      data: sorted,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=1800',
      },
    }
  );
};

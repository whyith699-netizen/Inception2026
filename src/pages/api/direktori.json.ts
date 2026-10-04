import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

export const GET: APIRoute = async () => {
  const rawData = await getCollection('direktori');
  const categories = rawData.flatMap((item) => item.data);

  const flatPeople = categories.flatMap((cat) =>
    cat.people.map((person) => ({
      ...person,
      category: cat.category,
    }))
  );

  return new Response(
    JSON.stringify({
      status: 'success',
      meta: {
        school: 'SMA Negeri 1 Klaten (Padmawijaya)',
        npsn: '20309676',
        total_categories: categories.length,
        total_staff: flatPeople.length,
        updated_at: new Date().toISOString(),
      },
      data: {
        categories,
        flatPeople,
      },
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    }
  );
};

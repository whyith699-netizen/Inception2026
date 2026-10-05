import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const programsCollection = defineCollection({
  loader: glob({ pattern: '!(extracurriculars).json', base: './src/content/programs' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string(),
    targetGrade: z.string(),
    description: z.string(),
    curriculumPoints: z.array(z.string()),
    order: z.number()
  })
});

const eventsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    time: z.string(),
    location: z.string(),
    badge: z.string(),
    description: z.string(),
    ctaText: z.string(),
    ctaLink: z.string()
  })
});

const faqCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/faq' }),
  schema: z.object({
    id: z.string(),
    category: z.string(),
    keywords: z.array(z.string()),
    question: z.string(),
    answer: z.string()
  })
});

const ekstraCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/ekstrakurikuler' }),
  schema: z.object({
    items: z.array(z.object({
      id: z.string(),
      name: z.string(),
      category: z.string(),
      desc: z.string(),
      logo: z.string()
    }))
  })
});

const alumniCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/alumni' }),
  schema: z.object({
    items: z.array(z.object({
      id: z.number(),
      name: z.string(),
      designation: z.string(),
      image: z.string()
    }))
  })
});

const direktoriCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/direktori' }),
  schema: z.array(z.object({
    category: z.string(),
    people: z.array(z.object({
      name: z.string(),
      role: z.string(),
      detail: z.string().optional(),
      photo: z.string().optional(),
      email: z.string().optional()
    }))
  }))
});

const beritaCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/berita' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Berita', 'Pengumuman', 'Prestasi', 'Kegiatan', 'Informasi']),
    excerpt: z.string(),
    body: z.array(z.string()),
    image: z.string(),
    author: z.string().optional()
  })
});

export const collections = {
  programs: programsCollection,
  events: eventsCollection,
  faq: faqCollection,
  ekstrakurikuler: ekstraCollection,
  alumni: alumniCollection,
  direktori: direktoriCollection,
  berita: beritaCollection
};

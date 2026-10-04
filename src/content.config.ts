import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const programsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/programs' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string(),
    targetGrade: z.string(),
    accentColor: z.enum(['coral', 'green', 'blue', 'yellow']),
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

export const collections = {
  programs: programsCollection,
  events: eventsCollection,
  faq: faqCollection,
  ekstrakurikuler: ekstraCollection,
  alumni: alumniCollection
};

import { db } from './index';
import { events } from './schema';
import { desc, asc, gte } from 'drizzle-orm';

/**
 * // LEARN: This is a "Data Access Function". 
 * In Next.js 16 (React 19), it's best to isolate DB logic from UI code.
 * We fetch events from the database using Drizzle's 'query' API.
 */
export async function getFeaturedEvents(limit = 6) {
  try {
    // LEARN: 'db.query' provides a more relational way to fetch data.
    // 'with' automatically handles the join with the organizer (user).
    const results = await db.query.events.findMany({
      where: gte(events.date, new Date()), // Only upcoming events
      orderBy: [asc(events.date)],
      limit: limit,
      with: {
        organizer: true,
      },
    });

    return results;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}

/**
 * // LEARN: Fetching a single record by its unique slug.
 * This is used for the dynamic [slug] route.
 */
export async function getEventBySlug(slug: string) {
  try {
    const result = await db.query.events.findFirst({
      where: (events, { eq }) => eq(events.slug, slug),
      with: {
        organizer: true,
      },
    });

    return result || null;
  } catch (error) {
    console.error('Failed to fetch event by slug:', error);
    return null;
  }
}


/**
 * // LEARN: Inferred TypeScript types from our schema.
 * This ensures the UI is always in sync with our DB structure.
 */
export type EventWithOrganizer = Awaited<ReturnType<typeof getFeaturedEvents>>[number];

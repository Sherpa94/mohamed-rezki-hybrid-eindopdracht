import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

/**
 * // LEARN: The 'users' table is the core of your identity system.
 * We use UUIDs for IDs as they are more secure and scalable than simple integers.
 * 'better-auth' (from your course) often needs specific columns here.
 */
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * // LEARN: The 'events' table stores the event data.
 * We use 'varchar' with a limit for the slug to ensure it's URL-friendly.
 * Price is stored as an 'integer' (cents) to avoid floating-point math errors.
 */
export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  location: text('location').notNull(),
  date: timestamp('date').notNull(),
  price: integer('price').default(0).notNull(), // stored in cents (e.g., 1000 = $10.00)
  organizerId: uuid('organizer_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  events: many(events),
}));

export const eventsRelations = relations(events, ({ one }) => ({
  organizer: one(users, {
    fields: [events.organizerId],
    references: [users.id],
  }),
}));

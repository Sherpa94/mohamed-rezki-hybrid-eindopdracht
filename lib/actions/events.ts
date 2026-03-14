'use server';

import { db } from '@/lib/db';
import { events } from '@/lib/db/schema';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * // LEARN: Zod validation schema.
 * This is our single source of truth for the event creation form.
 * Co-locating it with the Server Action keeps our logic together.
 */
const CreateEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(3, 'Location is required'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  price: z.coerce.number().min(0, 'Price must be 0 or greater'),
});

export type FormState = {
  errors?: {
    title?: string[];
    description?: string[];
    location?: string[];
    date?: string[];
    price?: string[];
  };
  message?: string | null;
};

/**
 * // SERVER ACTION — handles the form submission securely
 * // LEARN: In Next.js 16 (React 19), Server Actions are the standard way
 * to mutate data. 'useActionState' (next step) will handle the state.
 */
export async function createEvent(prevState: FormState, formData: FormData) {
  // 1. Validate form fields using Zod
  const validatedFields = CreateEventSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    location: formData.get('location'),
    date: formData.get('date'),
    price: formData.get('price'),
  });

  // 2. If validation fails, return errors early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Event.',
    };
  }

  const { title, description, location, date, price } = validatedFields.data;

  // 3. Prepare data for insertion
  // LEARN: We'll create a simple slug from the title for SEO.
  const slug = title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

  // 4. Temporarily hardcoding an organizer ID until we add Auth (Layer 4)
  // LEARN: This is a "temporary hack" to unblock development.
  // We are using the valid ID provided from Supabase.
  const mockOrganizerId = '69f1147b-a88b-471d-b233-28eb2602c2e9';


  try {
    // 5. Insert into the database using Drizzle
    await db.insert(events).values({
      title,
      description,
      location,
      slug,
      date: new Date(date),
      price: Math.round(price * 100), // Convert to cents for the database
      organizerId: mockOrganizerId as string, // Cast for now, will fix with real ID
    });

  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Event.',
    };
  }

  // 6. Revalidate the home page to show the new event
  revalidatePath('/');
  
  // 7. Redirect to the home page (or the new event page)
  redirect('/');
}

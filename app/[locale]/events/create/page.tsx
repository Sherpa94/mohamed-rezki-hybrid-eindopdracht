/**
 * // CLIENT COMPONENT — uses useActionState / useState
 * // LEARN: In Next.js 16 (React 19), we use 'useActionState' to handle form state.
 */
'use client';

import { useActionState } from 'react';
import { createEvent, FormState } from '@/lib/actions/events';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar, MapPin, DollarSign, Type, AlignLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateEventPage() {
  const initialState: FormState = { message: null, errors: {} };
  
  // LEARN: 'useActionState' handles the pending status and result of the Server Action.
  const [state, formAction, isPending] = useActionState(createEvent, initialState);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Card className="border-border shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create New Event</CardTitle>
          <CardDescription>
            Fill in the details below to publish your event.
          </CardDescription>
        </CardHeader>
        
        <form action={formAction}>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <Type className="h-4 w-4 text-muted-foreground" />
                Event Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Tech Conference 2026"
                required
                className={state.errors?.title ? 'border-destructive' : ''}
              />
              {state.errors?.title && (
                <p className="text-sm text-destructive">{state.errors.title[0]}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                <AlignLeft className="h-4 w-4 text-muted-foreground" />
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Tell attendees what your event is about..."
                rows={4}
                required
                className={state.errors?.description ? 'border-destructive' : ''}
              />
              {state.errors?.description && (
                <p className="text-sm text-destructive">{state.errors.description[0]}</p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="datetime-local"
                  required
                  className={state.errors?.date ? 'border-destructive' : ''}
                />
                {state.errors?.date && (
                  <p className="text-sm text-destructive">{state.errors.date[0]}</p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  Price (USD)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  required
                  className={state.errors?.price ? 'border-destructive' : ''}
                />
                {state.errors?.price && (
                  <p className="text-sm text-destructive">{state.errors.price[0]}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Location
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g., Virtual or Physical Address"
                required
                className={state.errors?.location ? 'border-destructive' : ''}
              />
              {state.errors?.location && (
                <p className="text-sm text-destructive">{state.errors.location[0]}</p>
              )}
            </div>

            {state.message && (
              <p className="text-sm font-medium text-destructive text-center">
                {state.message}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex items-center justify-between border-t border-border pt-6">
            <Button variant="outline" asChild>
              <Link href="/">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Event'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

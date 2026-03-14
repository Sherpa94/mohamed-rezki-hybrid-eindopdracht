/**
 * // SERVER COMPONENT — fetches all data directly
 * // LEARN: In Next.js 16, this component is async and runs on the server.
 */
import { getAllEvents } from "@/lib/db/queries";
import { EventCard } from "@/components/event-card";
import { getTranslations } from "next-intl/server";
import { Calendar } from "lucide-react";

export async function generateMetadata() {
  return {
    title: "Browse Events | AxamEvent",
    description: "Discover all upcoming events and experiences on AxamEvent.",
  };
}

export default async function BrowseEventsPage() {
  // LEARN: Fetching all upcoming events from the database.
  const events = await getAllEvents();
  
  // LEARN: Localization for the Browse page.
  const t = await getTranslations("Browse");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          {t("description")}
        </p>
      </div>

      {events.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-3xl bg-muted/10">
          <Calendar className="h-16 w-16 text-muted-foreground/20 mb-4" aria-hidden="true" />
          <h2 className="text-2xl font-semibold text-foreground">{t("No events found")}</h2>
          <p className="mt-2 text-muted-foreground">
            {t("Empty Description")}
          </p>
        </div>
      )}
    </div>
  );
}

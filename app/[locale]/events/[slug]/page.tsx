/**
 * // SERVER COMPONENT — fetches data directly, no interactivity
 * // LEARN: In Next.js 16, dynamic route parameters are accessed via a Promise.
 */
import { getEventBySlug } from "@/lib/db/queries";
import { notFound } from "next/navigation";
import { formatEventDate, formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Share2, Shield, Ticket, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";

interface EventPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

/**
 * // LEARN: generateMetadata is a standard Next.js function for dynamic SEO.
 * It runs on the server before the page is rendered.
 */
export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) return { title: "Event Not Found" };

  return {
    title: event.title,
    description: event.description.substring(0, 160),
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  // LEARN: Fetching translations for the "Details" namespace.
  const t = await getTranslations("Details");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
        {/* Main Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="px-3 py-1 text-sm">
              Event
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="font-medium">{formatEventDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="font-medium">{event.location}</span>
              </div>
            </div>
          </div>

          {/* Placeholder for Event Image */}
          <div className="aspect-video w-full overflow-hidden rounded-3xl bg-muted/30 border border-border flex items-center justify-center">
             <Calendar className="h-20 w-20 text-muted-foreground/20" />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">{t("About this event")}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {event.description}
            </p>
          </div>

          {/* Organizer Info */}
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-muted/20 p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
              <User className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{t("Organized by")}</div>
              <div className="font-bold text-foreground">{event.organizer.name}</div>
            </div>
          </div>
        </div>

        {/* Sidebar / Ticket Card */}
        <div className="lg:sticky lg:top-24 h-fit">
          <Card className="border-border shadow-xl">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{t("Price")}</div>
                <div className="text-4xl font-bold text-foreground">
                  {formatPrice(event.price)}
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <Button size="lg" className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20">
                  <Ticket className="mr-2 h-5 w-5" />
                  {t("Get Tickets")}
                </Button>
                <Button variant="outline" size="lg" className="w-full h-14 text-lg">
                  <Share2 className="mr-2 h-5 w-5" />
                  {t("Share Event")}
                </Button>
              </div>

              <div className="pt-6 border-t border-border space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary shrink-0" />
                  <div className="text-sm">
                    <p className="font-bold text-foreground">{t("Secure Checkout")}</p>
                    <p className="text-muted-foreground">{t("Checkout Description")}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

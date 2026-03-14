/**
 * // SHARED COMPONENT — pure presentational, no data fetching
 */
import { Link } from "@/i18n/routing";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { formatEventDate, formatPrice } from "@/lib/format";
import { type EventWithOrganizer } from "@/lib/db/queries";

interface EventCardProps {
    event: EventWithOrganizer;
}

export function EventCard({ event }: EventCardProps) {
    // LEARN: We use the real DB property 'price' which is in cents.
    // Some mock fields like 'capacity' or 'ticketsSold' aren't in our schema yet,
    // so we'll remove them or add them to the schema later if needed.
    
    return (
        <Link href={`/events/${event.slug}`} className="group block">
            <Card className="overflow-hidden border border-border bg-card transition-all duration-200 hover:shadow-lg hover:border-primary/20">
                <div className="relative aspect-video bg-muted overflow-hidden">
                    {/* // LEARN: In a real app, we'd use Next.js <Image> component with configured domains. */}
                    <div className="flex h-full w-full items-center justify-center bg-primary/5">
                        <Calendar className="h-12 w-12 text-primary/30" aria-hidden="true" />
                    </div>
                    <div className="absolute right-3 top-3 flex gap-2">
                        {/*category field later*/}
                        <Badge variant="secondary" className="bg-background/90 text-foreground backdrop-blur-sm">
                            Event
                        </Badge>
                        {/*soldout boolian later*/}
                        {/*{isSoldOut && (*/}
                        {/*    <Badge variant="destructive">Sold Out</Badge>*/}
                        {/*)}*/}
                    </div>
                </div>
                <CardContent className="flex flex-col gap-3 p-5">
                    <div className="flex flex-col gap-1">
                        <h3 className="font-semibold text-lg text-card-foreground leading-snug line-clamp-2 text-balance group-hover:text-primary transition-colors">
                            {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {event.description}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                            <span>{formatEventDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                            <span className="truncate">{event.location}</span>
                        </div>
                        {/*cout the lefty tickets for later*/}
              {/*          <div className="flex items-center gap-2">*/}
              {/*              <Users className="h-4 w-4 flex-shrink-0" aria-hidden="true" />*/}
              {/*              <span>*/}
              {/*  {isSoldOut*/}
              {/*      ? "Sold out"*/}
              {/*      : `${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} left`}*/}
              {/*</span>*/}
              {/*          </div>*/}
                    </div>
                    <div className="flex items-center justify-between border-t border-border pt-3">
                        <span className="text-lg font-bold text-foreground">
                          {formatPrice(event.price)}
                        </span>
                        <span className="text-sm font-medium text-primary group-hover:underline">
                          View Details
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
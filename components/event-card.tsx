import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";
import { formatEventDate, formatPrice } from "@/lib/format";

// Define the Event type here instead of importing from the DB schema
export interface Event {
    id: string;
    slug: string;
    title: string;
    description: string;
    date: string;
    location: string;
    imageUrl?: string;
    category: string;
    capacity: number;
    ticketsSold: number;
    priceInCents: number;
}

interface EventCardProps {
    event: Event;
}

export function EventCard({ event }: EventCardProps) {
    const spotsLeft = event.capacity - event.ticketsSold;
    const isSoldOut = spotsLeft <= 0;

    return (
        <Link href={`/events/${event.slug}`} className="group block">
            <Card className="overflow-hidden border border-border bg-card transition-all duration-200 hover:shadow-lg hover:border-primary/20">
                <div className="relative aspect-[16/9] bg-muted overflow-hidden">
                    {event.imageUrl ? (
                        // mock data uses external images from Unsplash, switching to <Image> right now will cause a runtime error
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-primary/5">
                            <Calendar className="h-12 w-12 text-primary/30" aria-hidden="true" />
                        </div>
                    )}
                    <div className="absolute right-3 top-3 flex gap-2">
                        <Badge variant="secondary" className="bg-background/90 text-foreground backdrop-blur-sm">
                            {event.category}
                        </Badge>
                        {isSoldOut && (
                            <Badge variant="destructive">Sold Out</Badge>
                        )}
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
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                            <span>
                {isSoldOut
                    ? "Sold out"
                    : `${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} left`}
              </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-border pt-3">
                        <span className="text-lg font-bold text-foreground">
                          {formatPrice(event.priceInCents)}
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
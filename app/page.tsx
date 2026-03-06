import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EventCard } from "@/components/event-card";
import { mockFeaturedEvents } from "@/lib/mock-data";
import {
  ArrowRight,
  Calendar,
  Shield,
  Zap,
  Users,
  BarChart3,
  QrCode,
} from "lucide-react";

export default function HomePage() {

  const featuredEvents = mockFeaturedEvents;

  return (
      <div className="flex flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary)_0%,transparent_50%)] opacity-[0.04]" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 lg:py-36">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
                <Zap className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Trusted by 10,000+ event organizers
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Events that move people,{" "}
                <span className="text-primary">tickets that just work</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                AxamEvent is the modern event platform for organizers and
                attendees. Create, discover, and manage events with secure
                ticketing powered by Stripe.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" asChild className="h-12 px-8 text-base">
                  <Link href="/events">
                    Browse Events
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="h-12 px-8 text-base"
                >
                  <Link href="/sign-up?role=organizer">Start Organizing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="py-20 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  Upcoming Events
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Discover what{"'"}s happening near you
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/events">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            {featuredEvents.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                  ))}
                </div>
            ) : (
                <Card className="border border-dashed border-border bg-muted/20">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <Calendar
                        className="h-12 w-12 text-muted-foreground/50 mb-4"
                        aria-hidden="true"
                    />
                    <h3 className="text-lg font-semibold text-foreground">
                      No events yet
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                      Be the first to create an event on AxamEvent.
                    </p>
                    <Button className="mt-6" asChild>
                      <Link href="/events/create">Create Your First Event</Link>
                    </Button>
                  </CardContent>
                </Card>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground text-balance">
              Ready to create your next event?
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Join thousands of organizers who trust AxamEvent for their events.
              Get started for free.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="h-12 px-8">
                <Link href="/sign-up?role=organizer">
                  Start for Free
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-border bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-foreground text-balance">
                Everything you need to run events
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                From small meetups to large conferences, AxamEvent provides all
                the tools you need.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Calendar,
                  title: "Event Management",
                  description:
                      "Create and manage events with ease. Set dates, venues, pricing, and capacity all in one place.",
                },
                {
                  icon: Shield,
                  title: "Secure Payments",
                  description:
                      "Powered by Stripe Checkout for PCI-compliant, secure ticket purchases with instant confirmation.",
                },
                {
                  icon: QrCode,
                  title: "QR Ticket System",
                  description:
                      "Each ticket gets a unique QR code for fast, contactless check-in at the door.",
                },
                {
                  icon: Users,
                  title: "Attendee Management",
                  description:
                      "Track RSVPs, manage guest lists, and communicate with attendees through the dashboard.",
                },
                {
                  icon: BarChart3,
                  title: "Real-time Analytics",
                  description:
                      "Monitor ticket sales, revenue, and check-in rates with live dashboard metrics.",
                },
                {
                  icon: Zap,
                  title: "Workflow Automation",
                  description:
                      "Connect with n8n and OpenAI for automated emails, AI-generated descriptions, and smart workflows.",
                },
              ].map((feature) => (
                  <Card
                      key={feature.title}
                      className="border border-border bg-card"
                  >
                    <CardContent className="flex flex-col gap-3 p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <feature.icon
                            className="h-5 w-5 text-primary"
                            aria-hidden="true"
                        />
                      </div>
                      <h3 className="font-semibold text-card-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
  );
}
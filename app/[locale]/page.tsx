import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {EventCard} from "@/components/event-card";
import {mockFeaturedEvents} from "@/lib/mock-data";
import {getTranslations} from 'next-intl/server';
import {
  ArrowRight,
  Calendar,
  Shield,
  Zap,
  Users,
  BarChart3,
  QrCode,
  Mail,
  CheckCircle2,
  Star,
} from "lucide-react";

const categories = [
    "Conferences", "Workshops", "Concerts", "Networking", "Tech",
    "Food & Drink", "Health", "Art", "Sports", "Charity", "Comedy"
];

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Tech Conference Organizer",
        content: "AxamEvent transformed how we handle ticketing. The QR check-in is incredibly fast!",
        avatar: "SJ",
        rating: 5
    },
    {
        name: "Michael Chen",
        role: "Workshop Facilitator",
        content: "The Stripe integration is seamless. I got my payouts faster than any other platform.",
        avatar: "MC",
        rating: 5
    },
    {
        name: "Emma Davis",
        role: "Music Festival Lead",
        content: "The dashboard gives me real-time insights that help us manage the crowd better.",
        avatar: "ED",
        rating: 5
    }
];
// SERVER COMPONENT — uses async getTranslations
export default async function HomePage() {
    const featuredEvents = mockFeaturedEvents;

    // LEARN: 'getTranslations' is used in Server Components to fetch
    // localized strings. 'Home' is the key in our JSON files.
    const t = await getTranslations('Home');

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-background py-11 lg:py-14">
                <div className="absolute inset-0 -z-10">
                    <div
                        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary)_0%,transparent_50%)] opacity-[0.05] animate-pulse"/>
                    <div
                        className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]"/>
                    <div
                        className="absolute top-[20%] -right-[10%] h-[30%] w-[30%] rounded-full bg-primary/5 blur-[100px]"/>
                </div>

                <div className="relative mx-auto max-w-7xl px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <div
                            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                            <Zap className="h-3.5 w-3.5" aria-hidden="true"/>
                            {t('slogan')}
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
                            {t('title')},{" "}
                            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {t('attraction')}
                            </span>
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            {t('description')}
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <Button size="lg" asChild className="h-12 px-8 text-base shadow-lg shadow-primary/20">
                                <Link href="/events">
                                    {t("Browse Events")}
                                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                asChild
                                className="h-12 px-8 text-base backdrop-blur-sm"
                            >
                                <Link href="/sign-up?role=organizer">{t("Start Organizing")}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Marquee */}
            <section className="py-12 border-y border-border bg-muted/20 overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background to-transparent z-10" />
                <div
                    className="flex gap-12 animate-marquee whitespace-nowrap"
                    style={{ '--duration': '21s', '--gap': '3rem' } as React.CSSProperties}
                >
                    {[...categories, ...categories, ...categories].map((cat, i) => (
                        <span key={i} className="text-xl font-bold text-muted-foreground/40 hover:text-primary transition-colors cursor-default">
              {cat.toUpperCase()}
            </span>
                    ))}
                </div>
            </section>

            {/* Featured Events */}
            <section className="py-11">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground">
                                {t("Upcoming Events")}
                            </h2>
                            <p className="mt-2 text-muted-foreground">
                                {t("Hand-picked experiences happening soon")}
                            </p>
                        </div>
                        <Button variant="outline" asChild className="group">
                            <Link href="/events">
                                {t("View All")}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </Link>
                        </Button>
                    </div>
                    {featuredEvents.length > 0 ? (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {featuredEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <Card className="border border-dashed border-border bg-background/50 backdrop-blur-sm">
                            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                                <Calendar className="h-16 w-16 text-muted-foreground/20 mb-6" aria-hidden="true" />
                                <h3 className="text-xl font-semibold text-foreground">No events found</h3>
                                <p className="mt-2 text-muted-foreground max-w-sm">
                                    Be the trendsetter. Create the first event in your area.
                                </p>
                                <Button className="mt-8" asChild>
                                    <Link href="/events/create">Create Your First Event</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-11 bg-muted/30">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground">
                            {t("Powerful tools for every organizer")}
                        </h2>
                        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
                            {t("Everything you need to sell tickets, manage attendees, and grow your audience")}
                        </p>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: Shield,
                                title: "Secured payment",
                                description: "Enterprise-grade payment security for every transaction.",
                            },
                            {
                                icon: QrCode,
                                title: "Instant QR Entry",
                                description: "Scan and go. Fast contactless check-in for all attendees.",
                            },
                            {
                                icon: BarChart3,
                                title: "Live Analytics",
                                description: "Track your sales and revenue in real-time from your dashboard.",
                            },
                        ].map((feature) => (
                            <div key={feature.title} className="group relative p-8 rounded-2xl border border-border bg-card transition-all hover:shadow-xl hover:-translate-y-1">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-11 border-b border-border">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground">What organizers are saying</h2>
                        <p className="mt-4 text-muted-foreground">Join thousands of happy organizers worldwide.</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {testimonials.map((t, i) => (
                            <Card key={i} className="bg-background border-border shadow-sm">
                                <CardContent className="p-8">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                        ))}
                                    </div>
                                    <p className="text-foreground leading-relaxed mb-6 italic">&quot;{t.content}&quot;</p>
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                                            {t.avatar}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{t.name}</div>
                                            <div className="text-xs text-muted-foreground">{t.role}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-22 relative overflow-hidden">
                <div className="absolute inset-0 bg-muted/33 -z-10" />
                <div className="mx-auto max-w-7xl px-4">
                    <div className="relative overflow-hidden rounded-3xl bg-foreground px-8 py-16 shadow-2xl sm:px-16 md:py-20">
                        <div className="relative z-10 mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-background sm:text-4xl">
                                Stay in the loop
                            </h2>
                            <p className="mt-4 text-lg text-background/70">
                                Get notified about the best events happening near you and exclusive organizer tips.
                            </p>
                            <form className="mt-10 flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 max-w-md mx-auto">
                                <div className="flex-auto min-w-0">
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="w-full rounded-xl border-0 bg-background/10 px-4 py-3 text-background shadow-sm ring-1 ring-inset ring-background/20 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <Button type="button" className="bg-background text-foreground hover:bg-background/90 px-8 py-3 rounded-xl font-semibold">
                                    Subscribe
                                </Button>
                            </form>
                            <div className="mt-6 flex items-center justify-center gap-x-3 text-sm text-background/50">
                                <CheckCircle2 className="h-4 w-4" />
                                <span>No spam, just great events.</span>
                            </div>
                        </div>
                        <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
                            <circle cx="512" cy="512" r="512" fill="url(#gradient)" fillOpacity="0.15" />
                            <defs>
                                <radialGradient id="gradient">
                                    <stop stopColor="white" />
                                    <stop offset="1" stopColor="white" />
                                </radialGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24">
                <div className="mx-auto max-w-3xl px-4 text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-foreground">
                        Ready to host your own?
                    </h2>
                    <p className="mt-6 text-xl text-muted-foreground">
                        Join 10,000+ organizers making memories with AxamEvent.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button size="lg" className="rounded-full px-10">Get Started Now</Button>
                        <Link href="/about" className="text-sm font-semibold leading-6 text-foreground">
                            Learn more <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
    // or guest
    const user = { role: "organizer" };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <MobileNav user={user} />
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-sans font-bold text-xl text-foreground"
                        >
                            <Ticket className="h-6 w-6 text-primary" aria-hidden="true" />
                            <span className="hidden sm:inline-block">AxamEvent</span>
                        </Link>
                    </div>
                    <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
                        <Link
                            href="/events"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Browse Events
                        </Link>
                        {user?.role === "organizer" && (
                            <Link
                                href="/events/create"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"       
                            >
                                Create Event
                            </Link>
                        )}
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                            <Link href="/sign-in">Sign In</Link>
                        </Button>
                        <Button size="sm" asChild>
                            <Link href="/sign-up">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
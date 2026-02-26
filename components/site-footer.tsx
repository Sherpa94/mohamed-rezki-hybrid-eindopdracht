import Link from "next/link";
import { Ticket } from "lucide-react";

export function SiteFooter() {
    return (
        <footer className="border-t border-border bg-muted/40" role="contentinfo">
            <div className="mx-auto max-w-7xl px-4 py-12">
                <div className="grid gap-8 md:grid-cols-4">
                    <div className="flex flex-col gap-3">
                        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-foreground">
                            <Ticket className="h-5 w-5 text-primary" aria-hidden="true" />
                            AxamEvent
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Discover and host unforgettable events. The modern platform for
                            organizers and attendees.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold text-foreground">Platform</h3>
                        <nav className="flex flex-col gap-2" aria-label="Platform links">
                            <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Browse Events
                            </Link>
                            <Link href="/events/create" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Create Event
                            </Link>
                            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Dashboard
                            </Link>
                        </nav>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold text-foreground">Resources</h3>
                        <nav className="flex flex-col gap-2" aria-label="Resource links">
                            <span className="text-sm text-muted-foreground">Help Center</span>
                            <span className="text-sm text-muted-foreground">API Docs</span>
                            <span className="text-sm text-muted-foreground">n8n Integrations</span>
                        </nav>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold text-foreground">Legal</h3>
                        <nav className="flex flex-col gap-2" aria-label="Legal links">
                            <span className="text-sm text-muted-foreground">Privacy Policy</span>
                            <span className="text-sm text-muted-foreground">Terms of Service</span>
                            <span className="text-sm text-muted-foreground">Cookie Policy</span>
                        </nav>
                    </div>
                </div>
                <div className="mt-10 border-t border-border pt-6">
                    <p className="text-center text-sm text-muted-foreground">
                        {new Date().getFullYear()} AxamEvent. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

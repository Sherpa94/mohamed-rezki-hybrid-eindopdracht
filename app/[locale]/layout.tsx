import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";
import React from "react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
    title: {
        default: "AxamEvent - Discover and Host Unforgettable Events",
        template: "%s | AxamEvent",
    },
    description:
        "The modern event platform for organizers and attendees. Discover, create, and manage events with secure ticketing powered by Stripe.",
    keywords: ["events", "tickets", "conferences", "meetups", "organizer", "Workshops", "Concerts", "Networking", "Tech",
        "Food & Drink", "Health", "Art", "Sports", "Charity", "Comedy"],
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f9f5f0" },
        { media: "(prefers-color-scheme: dark)", color: "#1a1816" },
    ],
    maximumScale: 5,
};

// SERVER COMPONENT — fetches translations on the server
export default async function RootLayout({
                                       children,
                                       params
                                   }: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
}) {
    const { locale } = await params;

    // LEARN: Ensure that the incoming 'locale' is valid
    if (!routing.locales.includes(locale as any)) {
      notFound();
    }

    // LEARN: Providing all messages to the client side is the easiest way
    // to get started. Later, we can optimize this to only provide
    // what's needed.
    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
        <div className="flex min-h-svh flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
        <Toaster richColors position="top-right" />
        <Analytics />
        </NextIntlClientProvider>
        </body>
        </html>
    );
}

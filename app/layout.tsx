import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";
import React from "react";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
    title: {
        default: "AxamEvent - Discover and Host Unforgettable Events",
        template: "%s | AxamEvent",
    },
    description:
        "The modern event platform for organizers and attendees. Discover, create, and manage events with secure ticketing powered by Stripe.",
    keywords: ["events", "tickets", "conferences", "meetups", "organizer"],
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f9f5f0" },
        { media: "(prefers-color-scheme: dark)", color: "#1a1816" },
    ],
    maximumScale: 5,
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <div className="flex min-h-svh flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
        <Toaster richColors position="top-right" />
        <Analytics />
        </body>
        </html>
    );
}

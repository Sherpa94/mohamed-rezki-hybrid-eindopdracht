import { Event } from "@/components/event-card";

export const mockFeaturedEvents: Event[] = [
    {
        id: "1",
        slug: "nextjs-global-summit-2026",
        title: "Next.js Global Summit 2026",
        description: "The ultimate conference for Next.js developers and enthusiasts.",
        date: "2026-04-15T09:00:00Z",
        location: "San Francisco, CA",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
        category: "Conference",
        capacity: 500,
        ticketsSold: 450,
        priceInCents: 19900, // $199.00
    },
    {
        id: "2",
        slug: "european-tech-meetup",
        title: "European Tech Meetup",
        description: "Connecting startups, investors, and developers across Europe.",
        date: "2026-05-20T18:00:00Z",
        location: "Berlin, Germany",
        imageUrl: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&q=80",
        category: "Networking",
        capacity: 150,
        ticketsSold: 150, // Sold out!
        priceInCents: 0, // Free
    },
    {
        id: "3",
        slug: "react-advanced-workshop",
        title: "React Advanced Workshop",
        description: "Deep dive into Server Components, Server Actions, and more.",
        date: "2026-06-10T10:00:00Z",
        location: "Online",
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        category: "Workshop",
        capacity: 1000,
        ticketsSold: 230,
        priceInCents: 4900, // $49.00
    },
];
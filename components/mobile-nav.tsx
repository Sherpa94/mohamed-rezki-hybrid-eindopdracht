'use client'

import * as React from 'react'
import Link from 'next/link'
import { Ticket, Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

// This interface defines the props for our MobileNav.
// pass the user role to conditionally show links
interface MobileNavProps {
  user?: {
    role: string
  }
}

export function MobileNav({ user }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader className="px-7">
          <SheetTitle>
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <Ticket className="h-6 w-6 text-primary" />
              <span className="font-bold">AxamEvent</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <Link
              href="/events"
              className="text-foreground/70 transition-colors hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              Browse Events
            </Link>
            {user?.role === 'organizer' && (
              <Link
                href="/events/create"
                className="text-foreground/70 transition-colors hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                Create Event
              </Link>
            )}
            <hr className="my-4 border-muted" />
            <Link
              href="/sign-in"
              className="text-foreground/70 transition-colors hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="text-foreground/70 transition-colors hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

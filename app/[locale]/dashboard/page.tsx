/**
 * // SERVER COMPONENT — fetches data directly
 * // LEARN: The dashboard is the management hub for organizers.
 */
import { getEventsByOrganizer } from "@/lib/db/queries";
import { getTranslations } from "next-intl/server";
import { formatEventDate, formatPrice } from "@/lib/format";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, BarChart3, Ticket, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  // LEARN: Using your real Supabase User ID for now.
  // We'll replace this with auth.getSession() later.
  const userId = "fdd4bb58-02a7-4d92-a334-00433edf9f0d";
  
  const events = await getEventsByOrganizer(userId);
  const t = await getTranslations("Dashboard");

  // Basic stats calculation
  const totalEvents = events.length;
  const upcomingEvents = events.filter(e => new Date(e.date) > new Date()).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
        <Button asChild>
          <Link href="/events/create">
            <Plus className="mr-2 h-4 w-4" />
            {t("Create New")}
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("Total Events")}</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("Upcoming")}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("Analytics")}</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">Coming soon</div>
          </CardContent>
        </Card>
      </div>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("My Events")}</CardTitle>
        </CardHeader>
        <CardContent>
          {events.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("Table.Title")}</TableHead>
                  <TableHead>{t("Table.Date")}</TableHead>
                  <TableHead>{t("Table.Status")}</TableHead>
                  <TableHead>{t("Table.Price")}</TableHead>
                  <TableHead className="text-right">{t("Table.Actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => {
                  const isUpcoming = new Date(event.date) > new Date();
                  return (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">
                        <Link href={`/events/${event.slug}`} className="hover:underline">
                          {event.title}
                        </Link>
                      </TableCell>
                      <TableCell>{formatEventDate(event.date)}</TableCell>
                      <TableCell>
                        <Badge variant={isUpcoming ? "default" : "secondary"}>
                          {isUpcoming ? t("Upcoming") : t("Past")}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatPrice(event.price)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">You haven't created any events yet.</p>
              <Button variant="link" asChild>
                <Link href="/events/create">Create your first event</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

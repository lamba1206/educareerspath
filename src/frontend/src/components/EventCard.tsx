import type { Event } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { motion } from "motion/react";
import type * as React from "react";

interface EventCardProps {
  event: Event;
  index?: number;
  onRegister?: (event: Event) => void;
  className?: string;
}

function formatDateTime(timestamp: bigint): string {
  return new Date(Number(timestamp)).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDuration(starts: bigint, ends: bigint): string {
  const minutes = Math.round(Number(ends - starts) / 60_000_000_000);
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

/**
 * Event preview card. Shows date, location, duration, and registration
 * capacity with a primary register CTA.
 */
export function EventCard({
  event,
  index = 0,
  onRegister,
  className,
}: EventCardProps) {
  const seatsLeft = Number(event.capacity) - Number(event.registeredCount);
  const full = seatsLeft <= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <Card
        className={`flex h-full flex-col transition-smooth hover:shadow-elevated ${className ?? ""}`}
      >
        <CardHeader>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
            <CalendarDays className="size-4" aria-hidden />
            {formatDateTime(event.startsAt)}
          </div>
          <CardTitle className="font-display text-lg">{event.title}</CardTitle>
          <CardDescription className="line-clamp-2 text-sm">
            {event.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-primary" aria-hidden />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-primary" aria-hidden />
            <span>{formatDuration(event.startsAt, event.endsAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="size-4 text-primary" aria-hidden />
            <span>
              {Number(event.registeredCount)} / {Number(event.capacity)}{" "}
              registered
            </span>
          </div>
        </CardContent>
        <CardFooter className="items-center justify-between border-t pt-4">
          <Badge
            variant={full ? "destructive" : "outline"}
            className="font-normal"
          >
            {full ? "Sold out" : `${seatsLeft} seats left`}
          </Badge>
          <Button
            size="sm"
            disabled={full}
            onClick={onRegister ? () => onRegister(event) : undefined}
            data-ocid={`event.register_button.${index ?? 0 + 1}`}
          >
            Register
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

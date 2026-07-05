import type { Event } from "@/backend";
import { EventCard } from "@/components/EventCard";
import { PageHeader } from "@/components/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useEvents } from "@/hooks/useQueries";
import { motion } from "motion/react";
import { toast } from "sonner";

const FALLBACK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Webinar: Decoding your aptitude report",
    description:
      "A live walkthrough of how to read your aptitude score breakdowns and turn them into career decisions.",
    location: "Online · Zoom",
    startsAt: 1_770_000_000_000_000_000n,
    endsAt: 1_770_000_000_000_000_000n + 90n * 60n * 1_000_000_000n,
    capacity: 200n,
    registeredCount: 142n,
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: "2",
    title: "India Admissions Masterclass: CUET 2025",
    description:
      "Everything you need to know about CUET — syllabus, pattern, and how to shortlist colleges.",
    location: "Online · YouTube Live",
    startsAt: 1_771_000_000_000_000_000n,
    endsAt: 1_771_000_000_000_000_000n + 120n * 60n * 1_000_000_000n,
    capacity: 500n,
    registeredCount: 318n,
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: "3",
    title: "Studying in Germany: a parent's guide",
    description:
      "Tuition-free public universities, blocked accounts, and visa basics — explained for parents.",
    location: "Online · Zoom",
    startsAt: 1_772_000_000_000_000_000n,
    endsAt: 1_772_000_000_000_000_000n + 90n * 60n * 1_000_000_000n,
    capacity: 150n,
    registeredCount: 87n,
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: "4",
    title: "Career counselling for Class 10 students",
    description:
      "A free in-person session for Class 10 students and parents on stream selection after board exams.",
    location: "Delhi · Connaught Place",
    startsAt: 1_773_000_000_000_000_000n,
    endsAt: 1_773_000_000_000_000_000n + 120n * 60n * 1_000_000_000n,
    capacity: 80n,
    registeredCount: 80n,
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: "5",
    title: "SOP writing workshop",
    description:
      "Bring your draft. Leave with a polished Statement of Purpose for abroad applications.",
    location: "Online · Zoom",
    startsAt: 1_774_000_000_000_000_000n,
    endsAt: 1_774_000_000_000_000_000n + 150n * 60n * 1_000_000_000n,
    capacity: 100n,
    registeredCount: 54n,
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: "6",
    title: "Scholarship hackathon: find funding in 90 minutes",
    description:
      "A guided session where you'll identify 5 scholarships you're eligible for and start 2 applications.",
    location: "Online · Zoom",
    startsAt: 1_775_000_000_000_000_000n,
    endsAt: 1_775_000_000_000_000_000n + 90n * 60n * 1_000_000_000n,
    capacity: 250n,
    registeredCount: 121n,
    published: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
];

export function EventsPage() {
  const { data, isLoading } = useEvents(true);
  const events = data && data.length > 0 ? data : FALLBACK_EVENTS;

  const handleRegister = (event: Event) => {
    toast.success(
      `Registered for "${event.title}". We'll email you the joining link.`,
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Events"
        title="Live sessions across the ecosystem"
        description="Webinars and workshops that connect every layer of EduCareersPath — assessments, careers, colleges, exams, and scholarships. Most are free, all are recorded."
      />

      <section className="py-8">
        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {["a", "b", "c", "d", "e", "f"].map((k) => (
              <Skeleton
                key={`skeleton-${k}`}
                className="h-64 w-full rounded-xl"
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {events.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                index={i}
                onRegister={handleRegister}
              />
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}

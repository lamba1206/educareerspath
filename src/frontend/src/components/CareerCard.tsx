import type { CareerEntry } from "@/backend";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Briefcase, IndianRupee } from "lucide-react";
import { motion } from "motion/react";
import type * as React from "react";

interface CareerCardProps {
  career: CareerEntry;
  index?: number;
  onSelect?: (career: CareerEntry) => void;
  className?: string;
}

function formatSalary(min: bigint, max: bigint, currency: string): string {
  const fmt = (n: bigint) => {
    const num = Number(n);
    if (num >= 100000)
      return `${(num / 100000).toFixed(num % 100000 === 0 ? 0 : 1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };
  return `${currency} ${fmt(min)} – ${fmt(max)}`;
}

/**
 * Career Library entry card. Shows category, salary band, and top skills.
 * Clicking the card (or the chevron) opens the career detail view at
 * /careers/$slug. When `onSelect` is provided, the card delegates to it
 * instead of navigating.
 */
export function CareerCard({
  career,
  index = 0,
  onSelect,
  className,
}: CareerCardProps) {
  const inner = (
    <Card
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect ? () => onSelect(career) : undefined}
      onKeyDown={(e) => {
        if (onSelect && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onSelect(career);
        }
      }}
      data-ocid={`career.item.${index + 1}`}
      className={`group h-full transition-smooth hover:-translate-y-0.5 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className ?? ""}`}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="font-normal">
            <Briefcase className="size-3" aria-hidden /> {career.category}
          </Badge>
          <ArrowUpRight
            className="size-4 text-muted-foreground transition-smooth group-hover:text-primary"
            aria-hidden
          />
        </div>
        <CardTitle className="font-display text-lg">{career.name}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {career.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-1.5">
          {career.skills.slice(0, 4).map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="font-normal text-muted-foreground"
            >
              {skill}
            </Badge>
          ))}
          {career.skills.length > 4 ? (
            <Badge
              variant="outline"
              className="font-normal text-muted-foreground"
            >
              +{career.skills.length - 4}
            </Badge>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <IndianRupee className="size-4 text-primary" aria-hidden />
          {formatSalary(
            career.salaryRange.min,
            career.salaryRange.max,
            career.salaryRange.currency || "INR",
          )}
          <span className="text-xs font-normal text-muted-foreground">
            / year
          </span>
        </div>
      </CardFooter>
    </Card>
  );

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
      {onSelect ? (
        inner
      ) : (
        <Link
          to="/careers/$slug"
          params={{ slug: career.slug }}
          className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[var(--radius)]"
          data-ocid={`career.link.${index + 1}`}
        >
          {inner}
        </Link>
      )}
    </motion.div>
  );
}

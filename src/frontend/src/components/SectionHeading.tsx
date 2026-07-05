import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type * as React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
}

/**
 * Section-level heading used inside page bodies to label grouped content.
 * Visually lighter than PageHeader — no hero treatment.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  children,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "flex flex-col gap-2",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-sm text-muted-foreground md:text-base",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </motion.div>
  );
}

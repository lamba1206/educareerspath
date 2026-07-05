import { CTAButton } from "@/components/CTAButton";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "motion/react";
import type * as React from "react";

interface PlaceholderPageProps {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: { icon: React.ReactNode; title: string; body: string }[];
  cta?: { label: string; to: string };
}

/**
 * Lightweight placeholder used by pages that are not yet implemented in this
 * foundation wave. Renders a real, designed page (not a blank stub) so the
 * router has no dead routes and the app never shows a blank screen.
 */
export function PlaceholderPage({
  eyebrow,
  title,
  description,
  highlights,
  cta,
}: PlaceholderPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        align="center"
      >
        {cta ? (
          <CTAButton asChild tone="primary" size="lg">
            <a
              href={cta.to}
              data-ocid={`placeholder.cta.${cta.to.replace("/", "")}`}
            >
              {cta.label}
            </a>
          </CTAButton>
        ) : null}
      </PageHeader>

      {highlights ? (
        <section className="py-8">
          <SectionHeading
            eyebrow="What you'll get"
            title="Built for Indian students"
            description="Every part of EduCareersPath is designed around the decisions students face after Class 10 and Class 12."
            align="center"
            className="mb-8"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {h.icon}
                    </div>
                    <CardTitle className="font-display text-base">
                      {h.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {h.body}
                    </CardDescription>
                  </CardHeader>
                  <CardContent />
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

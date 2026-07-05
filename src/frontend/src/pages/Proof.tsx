import { PageHeader } from "@/components/PageHeader";
import { PhotoGallery } from "@/components/PhotoGallery";
import { SectionHeading } from "@/components/SectionHeading";
import { StatusBadge } from "@/components/StatusBadge";
import { School } from "lucide-react";
import { motion } from "motion/react";

const OUTCOMES = [
  { value: "10,000+", label: "Students guided" },
  { value: "500+", label: "Partner institutions" },
  { value: "120+", label: "Workshops delivered" },
  { value: "98%", label: "Family satisfaction" },
];

export function ProofPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-subtle">
        <div
          className="absolute inset-0 -z-10 bg-gradient-primary opacity-[0.04]"
          aria-hidden
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageHeader
            eyebrow="Proof of Implementation"
            title="Where career guidance meets the classroom"
            description="A snapshot of the workshops, demos, and sessions EduCareersPath runs with schools, students, and partners across India."
            align="center"
          >
            <StatusBadge tone="default">
              <School className="size-3" aria-hidden /> Live across 500+
              institutions
            </StatusBadge>
          </PageHeader>
        </div>
      </section>

      {/* Outcomes strip */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {OUTCOMES.map((o, i) => (
            <motion.div
              key={o.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
              data-ocid={`proof.outcome.${i + 1}`}
            >
              <p className="font-display text-3xl font-bold text-primary sm:text-4xl">
                {o.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{o.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="In the field"
          title="Workshops, demos, and sessions"
          description="A visual tour of EduCareersPath programmes running in schools and partner venues."
          align="center"
          className="mb-10"
        />
        <PhotoGallery />
      </section>

      {/* Note */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            These visuals represent representative EduCareersPath programmes.
            For partner-specific case studies and outcome reports, please
            contact our team.
          </p>
        </div>
      </section>
    </div>
  );
}

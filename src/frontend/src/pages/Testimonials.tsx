import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Building2,
  GraduationCap,
  HeartHandshake,
  type LucideIcon,
  Quote,
  School,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

interface TestimonialGroup {
  id: string;
  icon: LucideIcon;
  heading: string;
  description: string;
  testimonials: Testimonial[];
}

const GROUPS: TestimonialGroup[] = [
  {
    id: "parents",
    icon: HeartHandshake,
    heading: "Parents",
    description:
      "Families who used EduCareersPath to bring clarity to a high-stakes decision.",
    testimonials: [
      {
        name: "Anita Sharma",
        role: "Parent · Class 12, Delhi",
        quote:
          "We were torn between engineering and commerce. The assessment report showed our daughter's strongest fit was design — and she's thriving now. Worth every rupee.",
      },
      {
        name: "Rajesh Menon",
        role: "Parent · Class 10, Kochi",
        quote:
          "The dashboard made it easy to sit with my son and review his report together. No jargon, no pressure — just clear next steps.",
      },
      {
        name: "Priya Iyer",
        role: "Parent · Class 12, Chennai",
        quote:
          "The admissions team handled the SOP and shortlisting end to end. We felt supported, not sold to.",
      },
    ],
  },
  {
    id: "students",
    icon: GraduationCap,
    heading: "Students",
    description:
      "Students who found direction after their assessments and reports.",
    testimonials: [
      {
        name: "Aarav Patel",
        role: "Class 12 · Ahmedabad",
        quote:
          "I always thought I'd do engineering because my marks were good. The interest assessment showed I'd actually enjoy product management — and the roadmap told me how to get there.",
      },
      {
        name: "Sneha Reddy",
        role: "Class 10 · Hyderabad",
        quote:
          "Being able to pause the aptitude test and finish it the next day was a relief. The report ranked careers I'd never even heard of.",
      },
      {
        name: "Kabir Khan",
        role: "Class 12 · Lucknow",
        quote:
          "The Career Library entries with salary bands and required skills made choosing a stream feel less like a gamble.",
      },
    ],
  },
  {
    id: "schools",
    icon: School,
    heading: "Schools",
    description:
      "Principals and counsellors running whole-school guidance programmes.",
    testimonials: [
      {
        name: "Dr. Meera Krishnan",
        role: "Principal · CBSE School, Bengaluru",
        quote:
          "EduCareersPath ran a guidance week for our Class 10 cohort. The reports gave our counsellors a real starting point instead of starting every conversation from scratch.",
      },
      {
        name: "Sanjay Verma",
        role: "Career Counsellor · Pune",
        quote:
          "The auto-generated reports save me hours. I can spend session time on interpretation and planning instead of scoring.",
      },
    ],
  },
  {
    id: "partners",
    icon: Building2,
    heading: "Partners",
    description: "Institutions and organisations collaborating on programmes.",
    testimonials: [
      {
        name: "Foundation for Future Skills",
        role: "NGO Partner",
        quote:
          "EduCareersPath's assessments let us target our skilling programmes to students whose profiles actually fit — better outcomes for everyone.",
      },
      {
        name: "TechMinds Robotics",
        role: "Training Partner",
        quote:
          "The career roadmaps feed students straight into our robotics tracks with the right prerequisites already in place.",
      },
    ],
  },
];

function initials(name: string): string {
  return name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TestimonialsPage() {
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
            eyebrow="Testimonials"
            title="Stories from the EduCareersPath community"
            description="Parents, students, schools, and partners share how career clarity changed the conversation at decision time."
            align="center"
          />
        </div>
      </section>

      {/* Groups */}
      {GROUPS.map((group, gi) => {
        const Icon = group.icon;
        const alt = gi % 2 === 1;
        return (
          <section
            key={group.id}
            className={alt ? "bg-muted/30" : "bg-background"}
          >
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <SectionHeading
                eyebrow={`From ${group.heading.toLowerCase()}`}
                title={group.heading}
                description={group.description}
                className="mb-10"
              >
                <div className="mt-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
              </SectionHeading>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {group.testimonials.map((t, i) => (
                  <motion.figure
                    key={t.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="glass-card hover-lift flex h-full flex-col gap-4 p-6"
                    data-ocid={`testimonials.${group.id}.item.${i + 1}`}
                  >
                    <Quote className="size-7 text-accent" aria-hidden />
                    <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
                      "{t.quote}"
                    </blockquote>
                    <figcaption className="flex items-center gap-3 border-t border-border pt-4">
                      <Avatar className="size-10">
                        <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                          {initials(t.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground">
                          {t.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {t.role}
                        </span>
                      </div>
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Closing */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <Users className="mx-auto size-8 text-primary" aria-hidden />
          <p className="mt-4 text-sm text-muted-foreground">
            Testimonials are representative of feedback collected from
            EduCareersPath programmes. Names are illustrative; quotes reflect
            common themes from our community.
          </p>
        </div>
      </section>
    </div>
  );
}

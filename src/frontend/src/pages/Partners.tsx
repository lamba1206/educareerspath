import { CTAButton } from "@/components/CTAButton";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  Cpu,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Landmark,
  type LucideIcon,
  Network,
  Palette,
  Plane,
  School,
  Sparkles,
  Trophy,
  Users,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";

/* === Existing partner showcase sections (preserved) === */
interface PartnerSection {
  id: string;
  icon: LucideIcon;
  heading: string;
  description: string;
  partners: string[];
}

const SECTIONS: PartnerSection[] = [
  {
    id: "schools",
    icon: School,
    heading: "Schools",
    description:
      "CBSE, ICSE, IB, and state-board schools running whole-school guidance programmes with EduCareersPath.",
    partners: [
      "Delhi Public School",
      "Kendriya Vidyalaya",
      "Bombay Scottish",
      "PSBB Learning Academy",
      "Greenwood High",
      "Heritage School",
    ],
  },
  {
    id: "ngos",
    icon: HeartHandshake,
    heading: "NGOs",
    description:
      "Non-profits bringing career guidance to underserved communities through joint programmes.",
    partners: [
      "Foundation for Future Skills",
      "Rural Education Trust",
      "Teach for Tomorrow",
      "Pragati Youth Mission",
    ],
  },
  {
    id: "csr",
    icon: Network,
    heading: "CSR",
    description:
      "Corporate social responsibility partners funding assessments and workshops at scale.",
    partners: [
      "TechCorp Foundation",
      "InfraGrowth CSR",
      "FinEdge Trust",
      "GreenEnergy Initiative",
    ],
  },
  {
    id: "training",
    icon: GraduationCap,
    heading: "Training Partners",
    description:
      "Skilling and upskilling organisations whose programmes align with our career roadmaps.",
    partners: [
      "TechMinds Robotics",
      "CodeCraft Academy",
      "DesignStudio Lab",
      "DataWise Bootcamp",
    ],
  },
  {
    id: "technology",
    icon: Cpu,
    heading: "Technology Partners",
    description:
      "Platforms and tooling providers powering assessments, reports, and the Career Library.",
    partners: [
      "AssessKit",
      "ReportForge",
      "EduCloud Platform",
      "Insight Analytics",
    ],
  },
];

/* === 11 partner types (spec expansion) === */
interface PartnerType {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  cta: "Become a Partner" | "Learn More";
  featured?: boolean;
}

const PARTNER_TYPES: PartnerType[] = [
  {
    id: "school-partner",
    icon: School,
    title: "School Partner",
    description:
      "Partner with schools to deliver whole-school career guidance programmes, psychometric assessments and dedicated career labs.",
    cta: "Become a Partner",
    featured: true,
  },
  {
    id: "college-partner",
    icon: GraduationCap,
    title: "College Partner",
    description:
      "Partner with colleges for placement support, career services, industry training and campus recruitment readiness.",
    cta: "Become a Partner",
  },
  {
    id: "corporate-partner",
    icon: Building2,
    title: "Corporate Partner",
    description:
      "Partner for hiring assessments, leadership evaluation and structured employee development and L&D programmes.",
    cta: "Become a Partner",
  },
  {
    id: "government-partner",
    icon: Landmark,
    title: "Government Partner",
    description:
      "Partner for skill development missions, Digital India initiatives and CSR-funded career guidance at scale.",
    cta: "Become a Partner",
  },
  {
    id: "ngo-partner",
    icon: HeartHandshake,
    title: "NGO Partner",
    description:
      "Partner for community development and education outreach, bringing career guidance to underserved regions.",
    cta: "Become a Partner",
  },
  {
    id: "counsellor-partner",
    icon: Users,
    title: "Career Counsellor Partner",
    description:
      "Join as a certified career counsellor and deliver assessments, roadmap sessions and mentoring to students.",
    cta: "Become a Partner",
  },
  {
    id: "white-label-partner",
    icon: Palette,
    title: "White Label Partner",
    description:
      "White-label the entire EduCareersPath platform under your own brand for schools, colleges and enterprises.",
    cta: "Learn More",
  },
  {
    id: "blue-label-partner",
    icon: Sparkles,
    title: "Blue Label Partner",
    description:
      "Co-brand the platform with EduCareersPath — share identity, share reach, share the impact across your network.",
    cta: "Learn More",
  },
  {
    id: "technology-partner",
    icon: Cpu,
    title: "Technology Partner",
    description:
      "Integrate your technology — assessment engines, LMS, analytics or content — into the EduCareersPath ecosystem.",
    cta: "Learn More",
  },
  {
    id: "study-abroad-partner",
    icon: Plane,
    title: "Study Abroad Partner",
    description:
      "Partner for international education services — university selection, applications, visas and accommodation.",
    cta: "Become a Partner",
  },
  {
    id: "international-partner",
    icon: Globe2,
    title: "International Partner",
    description:
      "Partner for global career guidance and bring EduCareersPath programmes to students across new countries.",
    cta: "Become a Partner",
  },
];

/* === Partnership benefits === */
interface Benefit {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const BENEFITS: Benefit[] = [
  {
    id: "reach",
    icon: Users,
    title: "Reach 5M+ students",
    description:
      "Tap into a fast-growing network of students, parents and educators across India and emerging markets.",
  },
  {
    id: "co-branding",
    icon: Trophy,
    title: "Co-branded credibility",
    description:
      "Align with a trusted career guidance brand and strengthen your institution's positioning.",
  },
  {
    id: "shared-tech",
    icon: Cpu,
    title: "Shared technology stack",
    description:
      "Access assessments, the Career Library, AI planner and reporting dashboards without building from scratch.",
  },
  {
    id: "revenue",
    icon: Sparkles,
    title: "New revenue streams",
    description:
      "Earn through referrals, co-branded programmes, white-label deployments and certified counsellor networks.",
  },
  {
    id: "impact",
    icon: HeartHandshake,
    title: "Measurable social impact",
    description:
      "Track students guided, careers mapped and communities reached through transparent partnership reporting.",
  },
  {
    id: "support",
    icon: Wrench,
    title: "Dedicated partner support",
    description:
      "Onboarding, training, marketing assets and a named partner manager to help your programme succeed.",
  },
];

export function PartnersPage() {
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
            eyebrow="Partners"
            title="An ecosystem of trusted partners"
            description="Schools, colleges, corporates, governments, NGOs, counsellors and technology platforms working with EduCareersPath to make career guidance accessible — across India and beyond."
            align="center"
          />
        </div>
      </section>

      {/* 11 partner types — glassmorphism grid */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Partner programmes"
            title="11 ways to partner with EduCareersPath"
            description="Choose the partnership model that fits your organisation — from schools and corporates to white-label deployments and global career guidance."
            align="center"
            className="mb-12"
          />
          <div className="ecosystem-grid">
            {PARTNER_TYPES.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.4,
                    delay: (i % 4) * 0.08,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className={`ecosystem-card glass-card hover-lift ${
                    p.featured ? "ecosystem-card-featured" : ""
                  }`}
                  data-ocid={`partners.partner_type.item.${i + 1}`}
                >
                  <div className="ecosystem-card-icon">
                    <Icon className="size-6" aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                  <div className="mt-auto pt-2">
                    <CTAButton
                      asChild
                      tone={p.cta === "Learn More" ? "outline" : "primary"}
                      size="sm"
                      data-ocid={`partners.partner_type.${p.id}.cta_button`}
                    >
                      <Link to="/contact">{p.cta}</Link>
                    </CTAButton>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership benefits */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why partner with us"
            title="Benefits of joining the ecosystem"
            description="Every partnership is built for shared reach, shared technology and measurable impact."
            align="center"
            className="mb-12"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.4,
                    delay: (i % 3) * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="glass-card hover-lift-sm flex flex-col gap-3 p-6"
                  data-ocid={`partners.benefit.item.${i + 1}`}
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {b.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {b.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Existing partner showcase sections (preserved) */}
      {SECTIONS.map((section, si) => {
        const Icon = section.icon;
        const alt = si % 2 === 1;
        return (
          <section
            key={section.id}
            className={alt ? "bg-muted/30" : "bg-background"}
          >
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <SectionHeading
                eyebrow={section.heading}
                title={section.heading}
                description={section.description}
                className="mb-10"
              >
                <div className="mt-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
              </SectionHeading>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.partners.map((name, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.35, delay: (i % 3) * 0.08 }}
                    className="glass-card hover-lift-sm flex items-center gap-4 p-5"
                    data-ocid={`partners.${section.id}.item.${i + 1}`}
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-sm">
                      <Building2 className="size-6" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-display text-sm font-semibold text-foreground">
                        {name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {section.heading} partner
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Become a partner CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="glass-card relative flex flex-col items-center gap-5 overflow-hidden px-6 py-12 text-center md:px-12"
          >
            <div
              className="absolute inset-0 -z-10 bg-gradient-hero opacity-60"
              aria-hidden
            />
            <div className="flex size-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Wrench className="size-6" aria-hidden />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Want to partner with EduCareersPath?
            </h2>
            <p className="max-w-xl text-muted-foreground">
              We work with schools, colleges, corporates, governments, NGOs,
              counsellors, white-label and blue-label brands, technology
              platforms, study-abroad providers and international partners. Tell
              us about your organisation and we'll be in touch.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <CTAButton
                asChild
                tone="primary"
                size="lg"
                data-ocid="partners.become_partner.primary_button"
              >
                <Link to="/contact">Become a partner</Link>
              </CTAButton>
              <CTAButton
                asChild
                tone="outline"
                size="lg"
                data-ocid="partners.become_partner.secondary_button"
              >
                <Link to="/our-ecosystem">Explore the ecosystem</Link>
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

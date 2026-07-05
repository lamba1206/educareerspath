import { CTAButton } from "@/components/CTAButton";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { StatusBadge } from "@/components/StatusBadge";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Code2,
  Compass,
  Cpu,
  GraduationCap,
  HeartHandshake,
  Laptop,
  type LucideIcon,
  Microscope,
  Users,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";

interface Solution {
  icon: LucideIcon;
  title: string;
  description: string;
  audience: string;
}

const SOLUTIONS: Solution[] = [
  {
    icon: Compass,
    title: "Career Lab",
    description:
      "A structured guidance programme that pairs psychometric assessments with one-on-one mentoring, helping every student map a stream, college, and career path with confidence.",
    audience: "Grades 9–12",
  },
  {
    icon: Microscope,
    title: "Psychometric Lab",
    description:
      "Aptitude, personality, and interest assessments delivered at school scale, with auto-generated reports and cohort analytics for counsellors and principals.",
    audience: "Grades 8–12",
  },
  {
    icon: Bot,
    title: "AI Lab",
    description:
      "Hands-on modules in prompt engineering, generative AI, and applied machine learning — students build real projects while learning to reason about AI ethics.",
    audience: "Grades 9–12",
  },
  {
    icon: Code2,
    title: "Coding Lab",
    description:
      "A progressive Python and web curriculum with project-based assessments, code reviews, and a portfolio students carry into college applications.",
    audience: "Grades 6–12",
  },
  {
    icon: Cpu,
    title: "Robotics Lab",
    description:
      "From sensors to autonomous movement — a lab-in-a-box kit plus curriculum that takes students from first circuits to competitive robotics challenges.",
    audience: "Grades 6–12",
  },
  {
    icon: Laptop,
    title: "Computer Lab",
    description:
      "A modern computer lab setup with digital literacy, productivity tools, and internet-safety modules aligned to NCSE and CBSE digital-skills outcomes.",
    audience: "Grades 3–10",
  },
  {
    icon: GraduationCap,
    title: "Teacher Training",
    description:
      "Certified professional development for school staff — assessment literacy, AI-in-the-classroom pedagogy, and data-driven guidance counselling.",
    audience: "Faculty",
  },
  {
    icon: HeartHandshake,
    title: "Parent Counselling",
    description:
      "Group sessions and one-on-one consultations that help parents understand stream choice, admission pathways, and how to support — not steer — their child.",
    audience: "Parents",
  },
  {
    icon: Users,
    title: "Student Workshops",
    description:
      "Half-day and full-day workshops on study skills, future-readiness, public speaking, and entrepreneurship — delivered on campus by our mentor network.",
    audience: "Grades 6–12",
  },
];

const OUTCOMES = [
  { value: "500+", label: "Partner schools" },
  { value: "10,000+", label: "Students guided" },
  { value: "9", label: "Lab programmes" },
  { value: "98%", label: "School satisfaction" },
];

const PROCESS = [
  {
    step: "01",
    title: "Needs assessment",
    body: "We map your school's grades, infrastructure, and guidance goals to the right mix of labs and workshops.",
  },
  {
    step: "02",
    title: "Curriculum alignment",
    body: "Modules are scoped to your board (CBSE, ICSE, IB, state) and timetabled into the academic calendar.",
  },
  {
    step: "03",
    title: "Setup & training",
    body: "We ship kits, configure software, and train your faculty — typically ready in two to four weeks.",
  },
  {
    step: "04",
    title: "Ongoing mentorship",
    body: "Quarterly reviews, cohort analytics, and access to our mentor network keep the programme sharp all year.",
  },
];

export function SchoolSolutionsPage() {
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
            eyebrow="For schools & institutions"
            title="Whole-school guidance, labs, and workshops"
            description="Nine programmes that turn career counselling from an annual talk into a year-round capability — from psychometric assessments to AI, coding, and robotics labs."
            align="center"
          >
            <CTAButton
              asChild
              tone="primary"
              size="lg"
              data-ocid="school_solutions.contact_button"
            >
              <Link to="/contact">Talk to our school team</Link>
            </CTAButton>
            <CTAButton
              asChild
              tone="outline"
              size="lg"
              data-ocid="school_solutions.ecosystem_button"
            >
              <Link to="/our-ecosystem">Explore the ecosystem</Link>
            </CTAButton>
          </PageHeader>
        </div>
      </section>

      {/* Outcomes strip */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {OUTCOMES.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="font-display text-3xl font-bold text-primary sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Solutions grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Nine programmes"
          title="Pick one lab or roll out the full suite"
          description="Each programme is delivered as a curriculum, a kit (where relevant), and faculty training — so your school can start with a single lab and expand year over year."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
              className="glass-card hover-lift group flex h-full flex-col gap-4 p-6"
              data-ocid={`school_solutions.solution_card.${i + 1}`}
            >
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.icon className="size-6" aria-hidden />
                </span>
                <StatusBadge tone="muted">{s.audience}</StatusBadge>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
              <Link
                to="/contact"
                data-ocid={`school_solutions.enquire_link.${i + 1}`}
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-smooth hover:gap-2.5"
              >
                Enquire about {s.title}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How we roll out"
            title="From first call to year-round programme in four steps"
            align="center"
            className="mb-10"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card hover-lift-sm flex h-full flex-col gap-2 p-6"
              >
                <span className="font-display text-3xl font-bold text-primary/30">
                  {p.step}
                </span>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="glass-strong flex flex-col items-center gap-6 rounded-2xl px-6 py-12 text-center md:px-12">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground">
            <Wrench className="size-7" aria-hidden />
          </span>
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Let's design your school's guidance programme
            </h2>
            <p className="mt-3 text-muted-foreground">
              Book a 30-minute consultation and we'll map the right labs,
              workshops, and training to your grades, board, and budget.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <CTAButton
              asChild
              tone="primary"
              size="lg"
              data-ocid="school_solutions.book_consultation_button"
            >
              <Link to="/contact">Book a consultation</Link>
            </CTAButton>
            <CTAButton
              asChild
              tone="outline"
              size="lg"
              data-ocid="school_solutions.view_testimonials_button"
            >
              <Link to="/testimonials">See school testimonials</Link>
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}

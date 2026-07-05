import { DashboardOverview } from "@/components/DashboardOverview";
import {
  Bell,
  BookOpen,
  CalendarClock,
  GraduationCap,
  LineChart,
  Mail,
  Sparkles,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";

const NAV = [
  { icon: <LineChart className="size-4" />, label: "Progress", active: true },
  { icon: <Sparkles className="size-4" />, label: "Recommendations" },
  { icon: <CalendarClock className="size-4" />, label: "Counselling" },
  { icon: <Trophy className="size-4" />, label: "Skills" },
  { icon: <BookOpen className="size-4" />, label: "Resources" },
  { icon: <Bell className="size-4" />, label: "Notifications" },
];

const STATS = [
  { label: "Assessments", value: "3 / 3", delta: "+1 this week" },
  { label: "Counselling sessions", value: "4", delta: "+2 booked" },
  { label: "Career matches", value: "12", delta: "Updated" },
  { label: "Scholarships tracked", value: "7", delta: "+3 new" },
];

const FEATURES = [
  {
    icon: <LineChart className="size-5" />,
    title: "Track assessment progress",
    body: "Follow your child's aptitude, personality and interest assessments in real time, with clear completion milestones.",
  },
  {
    icon: <Sparkles className="size-5" />,
    title: "View career recommendations",
    body: "See the AI-matched career paths tailored to your child's unique profile, strengths and interests.",
  },
  {
    icon: <CalendarClock className="size-5" />,
    title: "Access counselling reports",
    body: "Read session notes and summaries from certified counsellors after every appointment.",
  },
  {
    icon: <Trophy className="size-5" />,
    title: "Monitor skill development",
    body: "Track growth across future-skills labs — coding, robotics, AI, entrepreneurship and financial literacy.",
  },
  {
    icon: <BookOpen className="size-5" />,
    title: "Parent guidance resources",
    body: "Curated articles, guides and webinars to help you support your child's career journey confidently.",
  },
  {
    icon: <GraduationCap className="size-5" />,
    title: "College suggestions",
    body: "Personalised college and course recommendations aligned with your child's career direction.",
  },
  {
    icon: <Wallet className="size-5" />,
    title: "Scholarship opportunities",
    body: "Track eligible scholarships with deadlines, eligibility and application status in one place.",
  },
  {
    icon: <Bell className="size-5" />,
    title: "Smart notifications",
    body: "Stay informed about upcoming sessions, deadlines, new recommendations and milestones.",
  },
];

export function ParentDashboardPage() {
  return (
    <DashboardOverview
      eyebrow="For parents"
      title="Parent Dashboard"
      description="Stay involved in your child's career journey — track progress, view recommendations and access guidance, all in one place."
      navItems={NAV}
      stats={STATS}
      features={FEATURES}
      portalUrl="/parent-dashboard/"
      ocidPrefix="parent_dashboard"
    />
  );
}

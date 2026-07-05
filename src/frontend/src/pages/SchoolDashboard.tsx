import { DashboardOverview } from "@/components/DashboardOverview";
import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  FileText,
  GraduationCap,
  LineChart,
  Mail,
  Map as MapIcon,
  Users,
} from "lucide-react";

const NAV = [
  {
    icon: <LineChart className="size-4" />,
    label: "Student progress",
    active: true,
  },
  { icon: <BarChart3 className="size-4" />, label: "Analytics" },
  { icon: <FileText className="size-4" />, label: "Reports" },
  { icon: <CalendarDays className="size-4" />, label: "Career day" },
  { icon: <Users className="size-4" />, label: "Parents" },
];

const STATS = [
  { label: "Active students", value: "248", delta: "+12 this term" },
  { label: "Assessments done", value: "186", delta: "+24 this month" },
  { label: "Counselling reports", value: "94", delta: "+8 new" },
  { label: "Batch performance", value: "82%", delta: "+4 pts" },
];

const FEATURES = [
  {
    icon: <LineChart className="size-5" />,
    title: "Student progress tracking",
    body: "Monitor every student's assessment completion, career roadmap and milestone progress at a glance.",
  },
  {
    icon: <BarChart3 className="size-5" />,
    title: "Assessment analytics",
    body: "Whole-school and batch-level insights across aptitude, personality and interest assessments.",
  },
  {
    icon: <FileText className="size-5" />,
    title: "Career counselling reports",
    body: "Centralised access to counsellor session notes and recommendations for every student.",
  },
  {
    icon: <ClipboardList className="size-5" />,
    title: "Batch performance insights",
    body: "Compare batches and sections to identify trends, gaps and high-performing groups.",
  },
  {
    icon: <CalendarDays className="size-5" />,
    title: "Career day planning",
    body: "Schedule and manage career days, guest sessions and university visits with built-in RSVPs.",
  },
  {
    icon: <GraduationCap className="size-5" />,
    title: "Workshop scheduling",
    body: "Plan future-skills workshops — coding, robotics, AI, entrepreneurship and financial literacy.",
  },
  {
    icon: <Mail className="size-5" />,
    title: "Parent communication",
    body: "Send updates, share progress reports and coordinate sessions with parents in one channel.",
  },
  {
    icon: <MapIcon className="size-5" />,
    title: "Student career roadmaps",
    body: "Visualise each student's personalised roadmap from assessment to college and career.",
  },
];

export function SchoolDashboardPage() {
  return (
    <DashboardOverview
      eyebrow="For schools"
      title="School Dashboard"
      description="Run a whole-school career guidance programme — track students, analyse assessments and coordinate counselling, all from one dashboard."
      navItems={NAV}
      stats={STATS}
      features={FEATURES}
      portalUrl="/school-dashboard/"
      ocidPrefix="school_dashboard"
    />
  );
}

import { DashboardOverview } from "@/components/DashboardOverview";
import {
  BookOpen,
  CalendarClock,
  ClipboardList,
  FileText,
  Mail,
  MessageSquare,
  Sparkles,
  Users,
} from "lucide-react";

const NAV = [
  { icon: <Users className="size-4" />, label: "Students", active: true },
  { icon: <ClipboardList className="size-4" />, label: "Assessments" },
  { icon: <Sparkles className="size-4" />, label: "Recommendations" },
  { icon: <CalendarClock className="size-4" />, label: "Scheduler" },
  { icon: <FileText className="size-4" />, label: "Reports" },
];

const STATS = [
  { label: "Active cases", value: "32", delta: "+4 this week" },
  { label: "Sessions booked", value: "18", delta: "+3 upcoming" },
  { label: "Reports generated", value: "47", delta: "+6 new" },
  { label: "Avg. rating", value: "4.8", delta: "+0.1" },
];

const FEATURES = [
  {
    icon: <Users className="size-5" />,
    title: "Student case management",
    body: "Organise students into caseloads with profile, history and status at your fingertips.",
  },
  {
    icon: <ClipboardList className="size-5" />,
    title: "Assessment results review",
    body: "Dive into aptitude, personality and interest results with rich visual breakdowns.",
  },
  {
    icon: <Sparkles className="size-5" />,
    title: "Career recommendation tools",
    body: "Refine and personalise AI-generated career matches for each student.",
  },
  {
    icon: <CalendarClock className="size-5" />,
    title: "Counselling session scheduler",
    body: "Manage availability, book sessions and send invites with automated reminders.",
  },
  {
    icon: <FileText className="size-5" />,
    title: "Progress notes",
    body: "Capture structured session notes, goals and action items for every student.",
  },
  {
    icon: <ClipboardList className="size-5" />,
    title: "Report generation",
    body: "Produce polished, branded counselling reports for students, parents and schools.",
  },
  {
    icon: <Mail className="size-5" />,
    title: "Student communication",
    body: "Message students and parents securely within the portal, with full history.",
  },
  {
    icon: <BookOpen className="size-5" />,
    title: "Resource library",
    body: "Access curated career guides, college lists and scholarship databases to share.",
  },
];

export function CounsellorDashboardPage() {
  return (
    <DashboardOverview
      eyebrow="For counsellors"
      title="Counsellor Dashboard"
      description="Manage your caseload, review assessments and guide every student with confidence — purpose-built tools for career counsellors."
      navItems={NAV}
      stats={STATS}
      features={FEATURES}
      portalUrl="/counsellor-dashboard/"
      ocidPrefix="counsellor_dashboard"
    />
  );
}

import { DashboardOverview } from "@/components/DashboardOverview";
import {
  BarChart3,
  Bell,
  CreditCard,
  FileText,
  LayoutGrid,
  Settings,
  Ticket,
  Users,
} from "lucide-react";

const NAV = [
  { icon: <Users className="size-4" />, label: "Users", active: true },
  { icon: <LayoutGrid className="size-4" />, label: "Assessments" },
  { icon: <FileText className="size-4" />, label: "Reports" },
  { icon: <CreditCard className="size-4" />, label: "Payments" },
  { icon: <Ticket className="size-4" />, label: "Coupons" },
  { icon: <Settings className="size-4" />, label: "Content" },
];

const STATS = [
  { label: "Total users", value: "12,480", delta: "+318 this month" },
  { label: "Active passports", value: "4,210", delta: "+96 new" },
  { label: "Revenue (MTD)", value: "₹8.4L", delta: "+12% MoM" },
  { label: "Open tickets", value: "23", delta: "-5 resolved" },
];

const FEATURES = [
  {
    icon: <Users className="size-5" />,
    title: "User management",
    body: "Manage students, parents, counsellors, partners and admins with role-based access.",
  },
  {
    icon: <LayoutGrid className="size-5" />,
    title: "Assessment oversight",
    body: "Monitor assessment completion, quality and outcomes across the entire platform.",
  },
  {
    icon: <FileText className="size-5" />,
    title: "Report analytics",
    body: "Aggregate report generation stats, trends and counsellor performance insights.",
  },
  {
    icon: <CreditCard className="size-5" />,
    title: "Payment tracking",
    body: "Track invoices, refunds, payouts and revenue with full transaction history.",
  },
  {
    icon: <Ticket className="size-5" />,
    title: "Coupon management",
    body: "Create, schedule and track discount codes and promotional campaigns.",
  },
  {
    icon: <Settings className="size-5" />,
    title: "Content management",
    body: "Manage careers, blogs, events, resources and the career library from one CMS.",
  },
  {
    icon: <BarChart3 className="size-5" />,
    title: "System analytics",
    body: "Platform-wide dashboards for usage, growth, retention and revenue health.",
  },
  {
    icon: <Bell className="size-5" />,
    title: "Notification system",
    body: "Send targeted in-app, email and push notifications to any user segment.",
  },
];

export function AdminDashboardPage() {
  return (
    <DashboardOverview
      eyebrow="Administration"
      title="Admin Dashboard"
      description="Run the platform with confidence — manage users, content, payments and analytics from a single command centre."
      navItems={NAV}
      stats={STATS}
      features={FEATURES}
      portalUrl="/admin-dashboard/"
      ocidPrefix="admin_dashboard"
    />
  );
}

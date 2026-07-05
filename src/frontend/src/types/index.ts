// Re-export backend types for convenience across the app.
export type {
  AdminUserQuery,
  AdminUserView,
  Amount,
  AnsweredQuestion,
  AssessmentDefinition,
  AssessmentProgress,
  AssessmentReport,
  AssessmentType,
  BlogPost,
  BlogPostInput,
  CareerEntry,
  CareerEntryInput,
  CareerRecommendation,
  CareerSearchQuery,
  CounsellorProfile,
  CounsellorProfileInput,
  Coupon,
  CouponInput,
  CouponType,
  CouponValidation,
  Currency,
  Event,
  EventInput,
  Invoice,
  Payment,
  PaymentStatus,
  RecordPaymentInput,
  Result,
  SalaryRange,
  SaveProgressInput,
  ScoreBreakdown,
  Timestamp,
  UserId,
  UserProfile,
  UserProfileInput,
  UserRole,
} from "@/backend";

// Domain-specific view models derived from backend types.

export interface NavItem {
  label: string;
  to: string;
  description?: string;
}

export interface AssessmentMeta {
  type: import("@/backend").AssessmentType;
  title: string;
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  accent: "blue" | "orange" | "teal";
  icon: "brain" | "users" | "compass";
}

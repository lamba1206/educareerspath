import { createActor } from "@/backend";
import type {
  AdminUserQuery,
  AdminUserView,
  Amount,
  AssessmentDefinition,
  AssessmentProgress,
  AssessmentReport,
  AssessmentType,
  BlogPost,
  CareerEntry,
  CareerSearchQuery,
  CounsellorProfile,
  Coupon,
  CouponValidation,
  Event,
  Invoice,
  ProofImage,
  SaveProgressInput,
  UserProfile,
  UserProfileInput,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Helper: returns the actor or `null` while it is still being fetched.
 * Hooks use this to gate `enabled` so React Query doesn't fire too early.
 */
function useBackendActor() {
  const { actor, isFetching } = useActor(createActor);
  return { actor, isFetching };
}

/* ----------------------------------------------------------------------------
 * User profile
 * ------------------------------------------------------------------------- */

export function useUserProfile() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<UserProfile | null>({
    queryKey: ["user", "profile"],
    queryFn: async () => (actor ? actor.getMyProfile() : null),
    enabled: !!actor && !isFetching,
  });
}

export function useUpsertProfile() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: UserProfileInput) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.upsertMyProfile(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
}

/* ----------------------------------------------------------------------------
 * Assessments
 * ------------------------------------------------------------------------- */

export function useAssessmentDefinitions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AssessmentDefinition[]>({
    queryKey: ["assessments", "definitions"],
    queryFn: async () => (actor ? actor.listAssessmentDefinitions() : []),
    enabled: !!actor && !isFetching,
  });
}

export function useAssessmentProgress(type: AssessmentType) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AssessmentProgress | null>({
    queryKey: ["assessments", "progress", type],
    queryFn: async () => (actor ? actor.getMyProgress(type) : null),
    enabled: !!actor && !isFetching,
  });
}

export function useSaveProgress() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: SaveProgressInput) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.saveMyProgress(input);
    },
    onSuccess: (_data, input) => {
      qc.invalidateQueries({
        queryKey: ["assessments", "progress", input.assessmentType],
      });
    },
  });
}

export function useSubmitAssessment() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (type: AssessmentType) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.submitMyAssessment(type);
    },
    onSuccess: (_data, type) => {
      qc.invalidateQueries({ queryKey: ["assessments", "progress", type] });
      qc.invalidateQueries({ queryKey: ["reports", type] });
      qc.invalidateQueries({ queryKey: ["reports", "list"] });
    },
  });
}

export function useGenerateReport() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (type: AssessmentType) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.generateMyReport(type);
    },
    onSuccess: (_data, type) => {
      qc.invalidateQueries({ queryKey: ["reports", type] });
      qc.invalidateQueries({ queryKey: ["reports", "list"] });
    },
  });
}

/* ----------------------------------------------------------------------------
 * Reports
 * ------------------------------------------------------------------------- */

export function useReport(type: AssessmentType) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AssessmentReport | null>({
    queryKey: ["reports", type],
    queryFn: async () => (actor ? actor.getMyReport(type) : null),
    enabled: !!actor && !isFetching,
  });
}

export function useReports() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AssessmentReport[]>({
    queryKey: ["reports", "list"],
    queryFn: async () => (actor ? actor.listMyReports() : []),
    enabled: !!actor && !isFetching,
  });
}

/* ----------------------------------------------------------------------------
 * Coupons
 * ------------------------------------------------------------------------- */

export function useValidateCoupon(code: string | null, amount: Amount) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<CouponValidation>({
    queryKey: ["coupons", "validate", code, amount.toString()],
    queryFn: async () => {
      if (!actor || !code) throw new Error("Missing coupon");
      return actor.validateCoupon(code, amount);
    },
    enabled: !!actor && !isFetching && !!code && code.length > 0,
  });
}

export function useCoupons() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Coupon[]>({
    queryKey: ["coupons", "list"],
    queryFn: async () => (actor ? actor.listCoupons() : []),
    enabled: !!actor && !isFetching,
  });
}

export function useCreateCoupon() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: import("@/backend").CouponInput) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.createCoupon(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["coupons", "list"] }),
  });
}

export function useDeleteCoupon() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (code: string) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.deleteCoupon(code);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["coupons", "list"] }),
  });
}

/* ----------------------------------------------------------------------------
 * Payments & invoices
 * ------------------------------------------------------------------------- */

export function useRecordPayment() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: import("@/backend").RecordPaymentInput) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.recordMyPayment(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["payments", "list"] });
      qc.invalidateQueries({ queryKey: ["invoices", "list"] });
      qc.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
}

export function usePayments() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Invoice[]>({
    queryKey: ["payments", "list"],
    queryFn: async () => (actor ? actor.listAllInvoices() : []),
    enabled: !!actor && !isFetching,
  });
}

export function useInvoices() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Invoice[]>({
    queryKey: ["invoices", "list"],
    queryFn: async () => (actor ? actor.listMyInvoices() : []),
    enabled: !!actor && !isFetching,
  });
}

export function useAllInvoices() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Invoice[]>({
    queryKey: ["invoices", "all"],
    queryFn: async () => (actor ? actor.listAllInvoices() : []),
    enabled: !!actor && !isFetching,
  });
}

/* ----------------------------------------------------------------------------
 * Careers
 * ------------------------------------------------------------------------- */

export function useCareers(offset = 0n, limit = 50n) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<CareerEntry[]>({
    queryKey: ["careers", "list", offset.toString(), limit.toString()],
    queryFn: async () => (actor ? actor.listCareers(offset, limit) : []),
    enabled: !!actor && !isFetching,
  });
}

export function useCareer(id: string | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<CareerEntry | null>({
    queryKey: ["careers", "detail", id],
    queryFn: async () => (actor && id ? actor.getCareer(id) : null),
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCareerBySlug(slug: string | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<CareerEntry | null>({
    queryKey: ["careers", "slug", slug],
    queryFn: async () => (actor && slug ? actor.getCareerBySlug(slug) : null),
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useSearchCareers(query: CareerSearchQuery) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<CareerEntry[]>({
    queryKey: [
      "careers",
      "search",
      query.searchTerm ?? "",
      query.category ?? "",
      query.publishedOnly,
      query.offset.toString(),
      query.limit.toString(),
    ],
    queryFn: async () => (actor ? actor.searchCareers(query) : []),
    enabled: !!actor && !isFetching,
  });
}

/* ----------------------------------------------------------------------------
 * Blog posts
 * ------------------------------------------------------------------------- */

export function useBlogPosts(publishedOnly = true) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blog", "list", publishedOnly],
    queryFn: async () => (actor ? actor.listBlogPosts(publishedOnly) : []),
    enabled: !!actor && !isFetching,
  });
}

export function useBlogPost(id: string | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<BlogPost | null>({
    queryKey: ["blog", "detail", id],
    queryFn: async () => (actor && id ? actor.getBlogPost(id) : null),
    enabled: !!actor && !isFetching && !!id,
  });
}

/* ----------------------------------------------------------------------------
 * Events
 * ------------------------------------------------------------------------- */

export function useEvents(publishedOnly = true) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Event[]>({
    queryKey: ["events", "list", publishedOnly],
    queryFn: async () => (actor ? actor.listEvents(publishedOnly) : []),
    enabled: !!actor && !isFetching,
  });
}

/* ----------------------------------------------------------------------------
 * Proof images (workshop photo gallery)
 * ------------------------------------------------------------------------- */

export function useProofImages() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ProofImage[]>({
    queryKey: ["proof", "images"],
    queryFn: async () => (actor ? actor.listProofImages() : []),
    enabled: !!actor && !isFetching,
  });
}

export function useProofImagesByCategory(category: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ProofImage[]>({
    queryKey: ["proof", "images", category],
    queryFn: async () =>
      actor ? actor.listProofImagesByCategory(category) : [],
    enabled: !!actor && !isFetching && !!category,
  });
}

/* ----------------------------------------------------------------------------
 * Counsellors
 * ------------------------------------------------------------------------- */

export function useCounsellors(publishedOnly = true) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<CounsellorProfile[]>({
    queryKey: ["counsellors", "list", publishedOnly],
    queryFn: async () => (actor ? actor.listCounsellors(publishedOnly) : []),
    enabled: !!actor && !isFetching,
  });
}

/* ----------------------------------------------------------------------------
 * Admin
 * ------------------------------------------------------------------------- */

export function useAdminUsers(query: AdminUserQuery) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AdminUserView[]>({
    queryKey: ["admin", "users", query],
    queryFn: async () => (actor ? actor.adminListUsers(query) : []),
    enabled: !!actor && !isFetching,
  });
}

export function useAdminSuspendUser() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (userId: import("@/backend").UserId) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.adminSuspendUser(userId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "users"] }),
  });
}

export function useAdminUnsuspendUser() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (userId: import("@/backend").UserId) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.adminUnsuspendUser(userId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "users"] }),
  });
}

export function useMarkPassportPurchased() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (userId: import("@/backend").UserId) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.markPassportPurchased(userId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
      qc.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
}

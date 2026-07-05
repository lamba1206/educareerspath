import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AdminUserQuery {
    roleFilter?: UserRole;
    offset: bigint;
    suspendedFilter?: boolean;
    limit: bigint;
    searchTerm?: string;
    passportFilter?: boolean;
}
export interface ScoreBreakdown {
    maxScore: bigint;
    dimensionLabel: string;
    score: bigint;
}
export type Timestamp = bigint;
export interface BlogPostInput {
    title: string;
    body: string;
    published: boolean;
    slug: string;
    tags: Array<string>;
    author: string;
    excerpt: string;
}
export type Currency = string;
export interface AnsweredQuestion {
    questionId: bigint;
    selectedOption: bigint;
}
export interface CareerEntry {
    id: string;
    relatedCareers: Array<string>;
    growth: string;
    subjects: Array<string>;
    published: boolean;
    name: string;
    educationPath: Array<string>;
    createdAt: Timestamp;
    slug: string;
    description: string;
    eligibility: Array<string>;
    businessOpportunities: Array<string>;
    updatedAt: Timestamp;
    introduction: string;
    category: string;
    topColleges: Array<string>;
    salaryRange: SalaryRange;
    entranceExams: Array<string>;
    skills: Array<string>;
    videos: Array<string>;
    futureScope: string;
    scholarships: Array<string>;
    aiImpact: string;
}
export interface AssessmentProgress {
    startedAt: Timestamp;
    submitted: boolean;
    userId: UserId;
    answers: Array<AnsweredQuestion>;
    assessmentType: AssessmentType;
    submittedAt?: Timestamp;
    lastSavedAt: Timestamp;
}
export interface CareerSearchQuery {
    publishedOnly: boolean;
    offset: bigint;
    limit: bigint;
    searchTerm?: string;
    category?: string;
}
export interface CouponValidation {
    valid: boolean;
    discountAmount: Amount;
    reason?: string;
}
export interface CareerEntryInput {
    relatedCareers: Array<string>;
    growth: string;
    subjects: Array<string>;
    published: boolean;
    name: string;
    educationPath: Array<string>;
    slug: string;
    description: string;
    eligibility: Array<string>;
    businessOpportunities: Array<string>;
    introduction: string;
    category: string;
    topColleges: Array<string>;
    salaryRange: SalaryRange;
    entranceExams: Array<string>;
    skills: Array<string>;
    videos: Array<string>;
    futureScope: string;
    scholarships: Array<string>;
    aiImpact: string;
}
export interface SalaryRange {
    max: bigint;
    min: bigint;
    currency: Currency;
}
export interface BlogPost {
    id: string;
    title: string;
    body: string;
    published: boolean;
    createdAt: Timestamp;
    slug: string;
    tags: Array<string>;
    publishedAt?: Timestamp;
    author: string;
    updatedAt: Timestamp;
    excerpt: string;
}
export interface RecordPaymentInput {
    couponCode?: string;
    currency: Currency;
    stripeSessionId?: string;
    amount: Amount;
}
export interface Coupon {
    active: boolean;
    couponType: CouponType;
    expiresAt?: Timestamp;
    value: bigint;
    code: string;
    createdAt: Timestamp;
    description?: string;
    redemptions: bigint;
    maxRedemptions?: bigint;
}
export interface Event {
    id: string;
    title: string;
    registeredCount: bigint;
    startsAt: Timestamp;
    published: boolean;
    createdAt: Timestamp;
    description: string;
    updatedAt: Timestamp;
    capacity: bigint;
    location: string;
    endsAt: Timestamp;
}
export interface ProofImage {
    id: bigint;
    sortOrder: bigint;
    photoUrl: string;
    caption: string;
    category: string;
    altText: string;
}
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface Payment {
    status: PaymentStatus;
    completedAt?: Timestamp;
    couponCode?: string;
    finalAmount: Amount;
    userId: UserId;
    discountAmount: Amount;
    createdAt: Timestamp;
    invoiceNumber: string;
    currency: Currency;
    stripeSessionId?: string;
    amount: Amount;
}
export interface Invoice {
    status: PaymentStatus;
    finalAmount: Amount;
    userId: UserId;
    discountAmount: Amount;
    invoiceNumber: string;
    currency: Currency;
    issuedAt: Timestamp;
    coupon?: Coupon;
    amount: Amount;
}
export interface SaveProgressInput {
    answers: Array<AnsweredQuestion>;
    assessmentType: AssessmentType;
}
export interface CounsellorProfileInput {
    bio: string;
    title: string;
    published: boolean;
    name: string;
    photoUrl?: string;
    specializations: Array<string>;
}
export type Amount = bigint;
export type UserId = Principal;
export interface AdminUserView {
    profile: UserProfile;
}
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export interface EventInput {
    title: string;
    startsAt: Timestamp;
    published: boolean;
    description: string;
    capacity: bigint;
    location: string;
    endsAt: Timestamp;
}
export interface AssessmentDefinition {
    title: string;
    assessmentType: AssessmentType;
    description: string;
    totalQuestions: bigint;
    durationMinutes: bigint;
}
export interface CouponInput {
    active: boolean;
    couponType: CouponType;
    expiresAt?: Timestamp;
    value: bigint;
    code: string;
    description?: string;
    maxRedemptions?: bigint;
}
export interface CounsellorProfile {
    id: string;
    bio: string;
    title: string;
    published: boolean;
    name: string;
    createdAt: Timestamp;
    photoUrl?: string;
    updatedAt: Timestamp;
    specializations: Array<string>;
}
export interface CareerRecommendation {
    title: string;
    matchPercentage: bigint;
    rationale: string;
    careerId: string;
}
export interface UserProfileInput {
    displayName: string;
    email: string;
}
export interface UserProfile {
    id: UserId;
    emailVerified: boolean;
    displayName: string;
    createdAt: Timestamp;
    passportPurchasedAt?: Timestamp;
    role: UserRole;
    email: string;
    updatedAt: Timestamp;
    suspended: boolean;
    passportPurchased: boolean;
}
export interface AssessmentReport {
    id: UserId;
    maxScore: bigint;
    userId: UserId;
    recommendations: Array<CareerRecommendation>;
    generatedAt: Timestamp;
    breakdown: Array<ScoreBreakdown>;
    assessmentType: AssessmentType;
    totalScore: bigint;
    summary: string;
}
export enum AssessmentType {
    aptitude = "aptitude",
    personality = "personality",
    interest = "interest"
}
export enum CouponType {
    flat = "flat",
    percent = "percent"
}
export enum PaymentStatus {
    pending = "pending",
    completed = "completed",
    refunded = "refunded",
    failed = "failed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    adminListUsers(searchQuery: AdminUserQuery): Promise<Array<AdminUserView>>;
    adminSearchUsers(searchQuery: AdminUserQuery): Promise<Array<AdminUserView>>;
    adminSuspendUser(userId: Principal): Promise<UserProfile>;
    adminUnsuspendUser(userId: Principal): Promise<UserProfile>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBlogPost(input: BlogPostInput): Promise<BlogPost>;
    createCareer(input: CareerEntryInput): Promise<CareerEntry>;
    createCounsellor(input: CounsellorProfileInput): Promise<CounsellorProfile>;
    createCoupon(input: CouponInput): Promise<Coupon>;
    createEvent(input: EventInput): Promise<Event>;
    deleteBlogPost(id: string): Promise<void>;
    deleteCareer(id: string): Promise<void>;
    deleteCounsellor(id: string): Promise<void>;
    deleteCoupon(code: string): Promise<void>;
    deleteEvent(id: string): Promise<void>;
    generateMyReport(assessmentType: AssessmentType): Promise<AssessmentReport>;
    getBlogPost(id: string): Promise<BlogPost | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCareer(id: string): Promise<CareerEntry | null>;
    getCareerBySlug(slug: string): Promise<CareerEntry | null>;
    getCounsellor(id: string): Promise<CounsellorProfile | null>;
    getEvent(id: string): Promise<Event | null>;
    getMyInvoice(invoiceNumber: string): Promise<Invoice | null>;
    getMyProfile(): Promise<UserProfile | null>;
    getMyProgress(assessmentType: AssessmentType): Promise<AssessmentProgress | null>;
    getMyReport(assessmentType: AssessmentType): Promise<AssessmentReport | null>;
    getProfile(userId: Principal): Promise<UserProfile | null>;
    getReportForUser(userId: Principal, assessmentType: AssessmentType): Promise<AssessmentReport | null>;
    isCallerAdmin(): Promise<boolean>;
    listAllInvoices(): Promise<Array<Invoice>>;
    listAssessmentDefinitions(): Promise<Array<AssessmentDefinition>>;
    listBlogPosts(publishedOnly: boolean): Promise<Array<BlogPost>>;
    listCareers(offset: bigint, limit: bigint): Promise<Array<CareerEntry>>;
    listCounsellors(publishedOnly: boolean): Promise<Array<CounsellorProfile>>;
    listCoupons(): Promise<Array<Coupon>>;
    listEvents(publishedOnly: boolean): Promise<Array<Event>>;
    listMyInvoices(): Promise<Array<Invoice>>;
    listMyReports(): Promise<Array<AssessmentReport>>;
    listProofImages(): Promise<Array<ProofImage>>;
    listProofImagesByCategory(category: string): Promise<Array<ProofImage>>;
    markEmailVerified(userId: Principal): Promise<UserProfile>;
    markPassportPurchased(userId: Principal): Promise<UserProfile>;
    markPaymentCompleted(invoiceNumber: string): Promise<Payment>;
    recordMyPayment(input: RecordPaymentInput): Promise<Payment>;
    saveMyProgress(input: SaveProgressInput): Promise<AssessmentProgress>;
    searchCareers(searchQuery: CareerSearchQuery): Promise<Array<CareerEntry>>;
    submitMyAssessment(assessmentType: AssessmentType): Promise<AssessmentProgress>;
    updateBlogPost(id: string, input: BlogPostInput): Promise<BlogPost>;
    updateCareer(id: string, input: CareerEntryInput): Promise<CareerEntry>;
    updateCounsellor(id: string, input: CounsellorProfileInput): Promise<CounsellorProfile>;
    updateCoupon(code: string, input: CouponInput): Promise<Coupon>;
    updateEvent(id: string, input: EventInput): Promise<Event>;
    upsertMyProfile(input: UserProfileInput): Promise<UserProfile>;
    validateCoupon(code: string, amount: Amount): Promise<CouponValidation>;
}

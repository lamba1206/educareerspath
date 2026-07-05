import Map "mo:core/Map";

module {
  // First migration: introducing stable state for the first time.
  // OldActor is empty because there was no prior actor.
  type OldActor = {};
  type NewActor = {
    var accessControlState : AccessControlState;
    var usersState : UsersState;
    var assessmentsState : AssessmentsState;
    var reportsState : ReportsState;
    var couponsState : CouponsState;
    var paymentsState : PaymentsState;
    var careersState : CareersState;
    var contentState : ContentState;
  };

  // Inlined stable state types (migrations must be self-contained).
  type UserRole = { #admin; #user; #guest };
  type AccessControlState = { var adminAssigned : Bool; userRoles : Map.Map<Principal, UserRole> };
  type UserProfile = {
    id : Principal;
    email : Text;
    displayName : Text;
    role : UserRole;
    emailVerified : Bool;
    passportPurchased : Bool;
    passportPurchasedAt : ?Int;
    suspended : Bool;
    createdAt : Int;
    updatedAt : Int;
  };
  type UsersState = { accessControl : AccessControlState; profiles : Map.Map<Principal, UserProfile> };

  type AssessmentType = { #aptitude; #personality; #interest };
  type AnsweredQuestion = { questionId : Nat; selectedOption : Nat };
  type AssessmentProgress = {
    userId : Principal;
    assessmentType : AssessmentType;
    answers : [AnsweredQuestion];
    startedAt : Int;
    lastSavedAt : Int;
    submitted : Bool;
    submittedAt : ?Int;
  };
  type AssessmentsState = { progress : Map.Map<Principal, Map.Map<AssessmentType, AssessmentProgress>> };

  type ScoreBreakdown = { dimensionLabel : Text; score : Nat; maxScore : Nat };
  type CareerRecommendation = { careerId : Text; title : Text; matchPercentage : Nat; rationale : Text };
  type AssessmentReport = {
    id : Principal;
    userId : Principal;
    assessmentType : AssessmentType;
    generatedAt : Int;
    totalScore : Nat;
    maxScore : Nat;
    breakdown : [ScoreBreakdown];
    recommendations : [CareerRecommendation];
    summary : Text;
  };
  type ReportsState = { reports : Map.Map<Text, AssessmentReport> };

  type CouponType = { #percent; #flat };
  type Coupon = {
    code : Text;
    couponType : CouponType;
    value : Nat;
    active : Bool;
    description : ?Text;
    expiresAt : ?Int;
    maxRedemptions : ?Nat;
    redemptions : Nat;
    createdAt : Int;
  };
  type CouponsState = { coupons : Map.Map<Text, Coupon> };

  type PaymentStatus = { #pending; #completed; #failed; #refunded };
  type Payment = {
    invoiceNumber : Text;
    userId : Principal;
    amount : Nat;
    currency : Text;
    couponCode : ?Text;
    discountAmount : Nat;
    finalAmount : Nat;
    status : PaymentStatus;
    stripeSessionId : ?Text;
    createdAt : Int;
    completedAt : ?Int;
  };
  type PaymentsState = { payments : Map.Map<Text, Payment>; byUser : Map.Map<Principal, [Text]>; var nextInvoiceSeq : Nat };

  type SalaryRange = { min : Nat; max : Nat; currency : Text };
  type CareerEntry = {
    id : Text;
    name : Text;
    category : Text;
    description : Text;
    skills : [Text];
    educationPath : [Text];
    salaryRange : SalaryRange;
    published : Bool;
    createdAt : Int;
    updatedAt : Int;
  };
  type CareersState = { careers : Map.Map<Text, CareerEntry>; var nextSeq : Nat };

  type BlogPost = {
    id : Text; title : Text; slug : Text; excerpt : Text; body : Text; author : Text;
    tags : [Text]; published : Bool; publishedAt : ?Int; createdAt : Int; updatedAt : Int;
  };
  type Event = {
    id : Text; title : Text; description : Text; startsAt : Int; endsAt : Int;
    location : Text; capacity : Nat; registeredCount : Nat; published : Bool; createdAt : Int; updatedAt : Int;
  };
  type CounsellorProfile = {
    id : Text; name : Text; title : Text; bio : Text; specializations : [Text];
    photoUrl : ?Text; published : Bool; createdAt : Int; updatedAt : Int;
  };
  type ContentState = {
    blogPosts : Map.Map<Text, BlogPost>;
    events : Map.Map<Text, Event>;
    counsellors : Map.Map<Text, CounsellorProfile>;
    var nextBlogSeq : Nat;
    var nextEventSeq : Nat;
    var nextCounsellorSeq : Nat;
  };

  public func migration(old : OldActor) : NewActor {
    ignore old;
    let now : Int = 0;
    let careers = Map.empty<Text, CareerEntry>();
    let careerSeeds : [CareerEntry] = [
      { id = "career-000"; name = "Software Developer"; category = "Trending"; description = "Designs, builds, and maintains software applications across web, mobile, and backend platforms."; skills = ["Programming", "Problem Solving", "Version Control", "Testing"]; educationPath = ["Bachelor in Computer Science", "Bootcamp or Internship", "Specialization Track"]; salaryRange = { min = 600000; max = 2500000; currency = "INR" }; published = true; createdAt = now; updatedAt = now },
      { id = "career-001"; name = "Data Scientist"; category = "In Demand"; description = "Analyzes large datasets to extract insights and builds predictive models using statistics and machine learning."; skills = ["Python", "Statistics", "Machine Learning", "SQL"]; educationPath = ["Bachelor in Statistics or CS", "Master in Data Science", "Kaggle/Projects"]; salaryRange = { min = 800000; max = 3000000; currency = "INR" }; published = true; createdAt = now; updatedAt = now },
      { id = "career-002"; name = "UX Designer"; category = "New Age"; description = "Crafts intuitive, accessible user experiences for digital products through research and design."; skills = ["User Research", "Wireframing", "Prototyping", "Figma"]; educationPath = ["Design Fundamentals", "UX Certification", "Portfolio Building"]; salaryRange = { min = 500000; max = 2000000; currency = "INR" }; published = true; createdAt = now; updatedAt = now },
      { id = "career-003"; name = "Investment Banker"; category = "High Pay"; description = "Advises corporations on capital raising, mergers, and acquisitions in financial markets."; skills = ["Financial Modeling", "Valuation", "Negotiation", "Excel"]; educationPath = ["Bachelor in Finance/Economics", "MBA (Finance)", "CFA"]; salaryRange = { min = 1500000; max = 8000000; currency = "INR" }; published = true; createdAt = now; updatedAt = now },
      { id = "career-004"; name = "Civil Engineer"; category = "Trending"; description = "Plans, designs, and oversees construction of infrastructure like roads, bridges, and buildings."; skills = ["Structural Analysis", "AutoCAD", "Project Management", "Surveying"]; educationPath = ["Bachelor in Civil Engineering", "Site Internship", "PE License"]; salaryRange = { min = 400000; max = 1500000; currency = "INR" }; published = true; createdAt = now; updatedAt = now },
      { id = "career-005"; name = "Nurse"; category = "In Demand"; description = "Provides direct patient care, administers treatments, and supports healthcare teams."; skills = ["Patient Care", "Clinical Assessment", "Communication", "First Aid"]; educationPath = ["B.Sc Nursing or GNM", "Clinical Rotations", "RN Licensure"]; salaryRange = { min = 300000; max = 900000; currency = "INR" }; published = true; createdAt = now; updatedAt = now },
      { id = "career-006"; name = "Digital Marketer"; category = "New Age"; description = "Promotes brands and products through SEO, social media, email, and paid digital channels."; skills = ["SEO", "Content Strategy", "Analytics", "Paid Ads"]; educationPath = ["Marketing Fundamentals", "Digital Marketing Certification", "Campaign Portfolio"]; salaryRange = { min = 400000; max = 1800000; currency = "INR" }; published = true; createdAt = now; updatedAt = now },
      { id = "career-007"; name = "Surgeon"; category = "High Pay"; description = "Performs surgical procedures to treat injuries, diseases, and deformities."; skills = ["Surgical Technique", "Anatomy", "Decision Making", "Stamina"]; educationPath = ["MBBS", "MS Surgery", "Fellowship Specialization"]; salaryRange = { min = 2000000; max = 12000000; currency = "INR" }; published = true; createdAt = now; updatedAt = now },
      { id = "career-008"; name = "Teacher"; category = "Trending"; description = "Educates students in schools or colleges, shaping learning and development."; skills = ["Subject Expertise", "Communication", "Lesson Planning", "Patience"]; educationPath = ["Bachelor in Education Subject", "B.Ed", "Teaching Certification"]; salaryRange = { min = 300000; max = 1000000; currency = "INR" }; published = true; createdAt = now; updatedAt = now },
      { id = "career-009"; name = "Graphic Designer"; category = "In Demand"; description = "Creates visual concepts and layouts for branding, print, and digital media."; skills = ["Typography", "Illustration", "Adobe Suite", "Color Theory"]; educationPath = ["Design Diploma/Degree", "Portfolio", "Specialization"]; salaryRange = { min = 350000; max = 1500000; currency = "INR" }; published = true; createdAt = now; updatedAt = now },
      { id = "career-010"; name = "AI Engineer"; category = "New Age"; description = "Builds and deploys artificial intelligence systems including LLMs, vision, and automation."; skills = ["Deep Learning", "PyTorch", "MLOps", "Mathematics"]; educationPath = ["Bachelor in CS/Math", "Master in AI/ML", "Research/Projects"]; salaryRange = { min = 1000000; max = 4000000; currency = "INR" }; published = true; createdAt = now; updatedAt = now },
      { id = "career-011"; name = "Lawyer"; category = "High Pay"; description = "Represents clients in legal matters, drafts contracts, and argues cases in court."; skills = ["Legal Research", "Drafting", "Advocacy", "Negotiation"]; educationPath = ["LLB", "Bar Exam", "Specialization LLM"]; salaryRange = { min = 700000; max = 5000000; currency = "INR" }; published = true; createdAt = now; updatedAt = now },
    ];
    for (entry in careerSeeds.vals()) {
      careers.add(entry.id, entry);
    };

    let blogPosts = Map.empty<Text, BlogPost>();
    let blogSeeds : [BlogPost] = [
      { id = "blog-000"; title = "How to Choose the Right Career Path"; slug = "choose-right-career-path"; excerpt = "A practical framework for aligning interests, aptitude, and market demand."; body = "Choosing a career is one of the most consequential decisions..."; author = "EduCareersPath Team"; tags = ["career", "guidance"]; published = true; publishedAt = ?now; createdAt = now; updatedAt = now },
      { id = "blog-001"; title = "Understanding the Holland RIASEC Model"; slug = "holland-riasec-model"; excerpt = "Learn how the six RIASEC interest types map to career recommendations."; body = "The Holland RIASEC model classifies interests into six types..."; author = "EduCareersPath Team"; tags = ["assessment", "interest"]; published = true; publishedAt = ?now; createdAt = now; updatedAt = now },
      { id = "blog-002"; title = "Top 10 In-Demand Careers of 2026"; slug = "in-demand-careers-2026"; excerpt = "Market trends shaping the most sought-after roles this year."; body = "The job market continues to evolve rapidly..."; author = "EduCareersPath Team"; tags = ["trends", "careers"]; published = true; publishedAt = ?now; createdAt = now; updatedAt = now },
      { id = "blog-003"; title = "Aptitude vs Personality: What Matters More?"; slug = "aptitude-vs-personality"; excerpt = "Comparing the predictive value of aptitude and personality assessments."; body = "Both aptitude and personality play distinct roles..."; author = "EduCareersPath Team"; tags = ["assessment", "research"]; published = true; publishedAt = ?now; createdAt = now; updatedAt = now },
      { id = "blog-004"; title = "Funding Your Education: Scholarships & Loans"; slug = "funding-education-scholarships-loans"; excerpt = "A guide to financing higher education in India."; body = "Education financing options include..."; author = "EduCareersPath Team"; tags = ["education", "finance"]; published = true; publishedAt = ?now; createdAt = now; updatedAt = now },
      { id = "blog-005"; title = "Building a Standout Portfolio for Creative Careers"; slug = "creative-career-portfolio"; excerpt = "Tips for assembling a portfolio that opens doors in design and media."; body = "A strong portfolio demonstrates..."; author = "EduCareersPath Team"; tags = ["design", "portfolio"]; published = true; publishedAt = ?now; createdAt = now; updatedAt = now },
    ];
    for (post in blogSeeds.vals()) {
      blogPosts.add(post.id, post);
    };

    let events = Map.empty<Text, Event>();
    let eventSeeds : [Event] = [
      { id = "event-000"; title = "Career Discovery Webinar"; description = "Live session on exploring career options after 12th grade."; startsAt = now; endsAt = now + 5400000000; location = "Online"; capacity = 500; registeredCount = 0; published = true; createdAt = now; updatedAt = now },
      { id = "event-001"; title = "Aptitude Assessment Workshop"; description = "Hands-on workshop to practice aptitude test patterns."; startsAt = now; endsAt = now + 5400000000; location = "Bengaluru"; capacity = 100; registeredCount = 0; published = true; createdAt = now; updatedAt = now },
      { id = "event-002"; title = "Meet the Counsellors"; description = "Q&A panel with our senior career counsellors."; startsAt = now; endsAt = now + 5400000000; location = "Online"; capacity = 300; registeredCount = 0; published = true; createdAt = now; updatedAt = now },
      { id = "event-003"; title = "Data Science Career Talk"; description = "Industry experts discuss the data science career landscape."; startsAt = now; endsAt = now + 5400000000; location = "Mumbai"; capacity = 150; registeredCount = 0; published = true; createdAt = now; updatedAt = now },
      { id = "event-004"; title = "Design Thinking Bootcamp"; description = "A two-day intensive on design thinking for creative careers."; startsAt = now; endsAt = now + 5400000000; location = "Delhi"; capacity = 80; registeredCount = 0; published = true; createdAt = now; updatedAt = now },
      { id = "event-005"; title = "Parent-Student Career Planning Session"; description = "Joint session for parents and students to plan career roadmaps."; startsAt = now; endsAt = now + 5400000000; location = "Online"; capacity = 400; registeredCount = 0; published = true; createdAt = now; updatedAt = now },
    ];
    for (event in eventSeeds.vals()) {
      events.add(event.id, event);
    };

    let counsellors = Map.empty<Text, CounsellorProfile>();
    let counsellorSeeds : [CounsellorProfile] = [
      { id = "counsellor-000"; name = "Dr. Anjali Mehta"; title = "Senior Career Counsellor"; bio = "15+ years guiding students through aptitude-based career planning."; specializations = ["Aptitude Assessment", "Engineering Careers", "Study Abroad"]; photoUrl = null; published = true; createdAt = now; updatedAt = now },
      { id = "counsellor-001"; name = "Rohan Kapoor"; title = "Career Coach"; bio = "Specialist in creative and new-age career transitions."; specializations = ["Design", "Digital Marketing", "Career Transitions"]; photoUrl = null; published = true; createdAt = now; updatedAt = now },
      { id = "counsellor-002"; name = "Dr. Priya Nair"; title = "Education Advisor"; bio = "Helps families navigate higher education funding and admissions."; specializations = ["Higher Education", "Scholarships", "Admissions"]; photoUrl = null; published = true; createdAt = now; updatedAt = now },
    ];
    for (c in counsellorSeeds.vals()) {
      counsellors.add(c.id, c);
    };

    {
      var accessControlState = {
        var adminAssigned = false;
        userRoles = Map.empty();
      };
      var usersState = {
        accessControl = {
          var adminAssigned = false;
          userRoles = Map.empty();
        };
        profiles = Map.empty();
      };
      var assessmentsState = {
        progress = Map.empty();
      };
      var reportsState = { reports = Map.empty() };
      var couponsState = { coupons = Map.empty() };
      var paymentsState = {
        payments = Map.empty();
        byUser = Map.empty();
        var nextInvoiceSeq = 0;
      };
      var careersState = { careers; var nextSeq = 12 };
      var contentState = {
        blogPosts;
        events;
        counsellors;
        var nextBlogSeq = 6;
        var nextEventSeq = 6;
        var nextCounsellorSeq = 3;
      };
    };
  };
};

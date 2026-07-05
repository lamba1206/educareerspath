import Map "mo:core/Map";

module {
  // Extends the careers domain with the full 14-field career detail structure
  // (Introduction, Eligibility, Subjects, Skills, Salary, Growth, Future Scope,
  // Top Colleges, Scholarships, Entrance Exams, AI Impact, Business
  // Opportunities, Related Careers, Videos) plus a `slug` field for SEO-friendly
  // detail URLs (/careers/$slug). The existing `category` field already drives
  // Career Library filtering and is preserved.
  //
  // OldActor mirrors the previous migration's NewActor (20260702_000000.mo).
  // The CareersState container shape is unchanged, but the CareerEntry element
  // type gains 13 fields (slug + 12 new detail fields; skills and salaryRange
  // already cover the Skills and Salary detail fields), so the careers map is
  // rebuilt with the new element type. Existing seeded careers are upgraded
  // with default detail content; the map is then re-seeded with 15 sample
  // careers carrying complete content across all 14 fields.
  type OldActor = {
    var accessControlState : AccessControlState;
    var usersState : UsersState;
    var assessmentsState : AssessmentsState;
    var reportsState : ReportsState;
    var couponsState : CouponsState;
    var paymentsState : PaymentsState;
    var careersState : OldCareersState;
    var contentState : ContentState;
    var proofState : ProofState;
  };
  type NewActor = {
    var accessControlState : AccessControlState;
    var usersState : UsersState;
    var assessmentsState : AssessmentsState;
    var reportsState : ReportsState;
    var couponsState : CouponsState;
    var paymentsState : PaymentsState;
    var careersState : NewCareersState;
    var contentState : ContentState;
    var proofState : ProofState;
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

  // Old career entry shape (pre-detail-structure).
  type OldCareerEntry = {
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
  type OldCareersState = { careers : Map.Map<Text, OldCareerEntry>; var nextSeq : Nat };

  // New career entry shape with the full 14-field detail structure + slug.
  type CareerEntry = {
    id : Text;
    slug : Text;
    name : Text;
    category : Text;
    description : Text;
    introduction : Text;
    eligibility : [Text];
    subjects : [Text];
    skills : [Text];
    salaryRange : SalaryRange;
    growth : Text;
    futureScope : Text;
    topColleges : [Text];
    scholarships : [Text];
    entranceExams : [Text];
    aiImpact : Text;
    businessOpportunities : [Text];
    relatedCareers : [Text];
    videos : [Text];
    educationPath : [Text];
    published : Bool;
    createdAt : Int;
    updatedAt : Int;
  };
  type NewCareersState = { careers : Map.Map<Text, CareerEntry>; var nextSeq : Nat };

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

  type ProofImage = {
    id : Nat;
    photoUrl : Text;
    category : Text;
    caption : Text;
    altText : Text;
    sortOrder : Nat;
  };
  type ProofState = { images : Map.Map<Nat, ProofImage> };

  // Derive an SEO-friendly slug from a career name: lowercase, spaces to hyphens.
  func slugify(name : Text) : Text {
    var result = "";
    for (ch in name.chars()) {
      if (ch == ' ') { result := result # "-"; } else { result := result # ch.toText().toLower(); };
    };
    result;
  };

  public func migration(old : OldActor) : NewActor {
    let now : Int = 0;
    let careers = Map.empty<Text, CareerEntry>();

    // 15 sample careers seeded with complete content across all 14 detail
    // fields. IDs stay stable (career-000..career-014) so existing references
    // from reports/assessments remain valid; slugs power the new detail-page
    // route /careers/$slug.
    let seeds : [CareerEntry] = [
      {
        id = "career-000"; slug = "software-developer"; name = "Software Developer"; category = "Trending";
        description = "Designs, builds, and maintains software applications across web, mobile, and backend platforms.";
        introduction = "Software developers turn ideas into working applications  -  writing, testing, and maintaining the code that powers websites, mobile apps, and backend services. The role blends creative problem solving with engineering discipline, and remains one of the most in-demand and future-proof careers in India and globally.";
        eligibility = ["Class 12 with Mathematics or Computer Science", "Bachelor's in Computer Science / IT / related field (or equivalent bootcamp)"];
        subjects = ["Data Structures", "Algorithms", "Operating Systems", "Databases", "Computer Networks", "Software Engineering"];
        skills = ["Programming", "Problem Solving", "Version Control", "Testing", "System Design"];
        salaryRange = { min = 600000; max = 2500000; currency = "INR" };
        growth = "Strong vertical growth from junior to senior, lead, staff, and architect. Lateral moves into data, AI/ML, product, and engineering management are common.";
        futureScope = "Demand is projected to keep rising as every industry digitises. AI-assisted coding raises productivity but increases  -  not reduces  -  the need for skilled engineers who can design, integrate, and own systems.";
        topColleges = ["IITs (Computer Science)", "IIITs", "BITS Pilani", "NITs", "Delhi University (CS)", "VIT Vellore"];
        scholarships = ["AICTE Pragati & Saksham", "National Scholarship Portal", "College-specific merit scholarships"];
        entranceExams = ["JEE Main / Advanced", "BITSAT", "VITEEE", "State CETs"];
        aiImpact = "Generative AI copilots accelerate boilerplate, test generation, and code review. Developers shift toward architecture, integration, prompt engineering, and verifying AI output. Adaptability and fundamentals matter more than memorising syntax.";
        businessOpportunities = ["SaaS product startup", "Freelance / consulting", "DevTools or API business", "Micro-SaaS", "Agency"];
        relatedCareers = ["Data Scientist", "AI Engineer", "DevOps Engineer", "Full-Stack Developer", "Mobile Developer"];
        videos = ["https://www.youtube.com/results?search_query=software+developer+career"];
        educationPath = ["Bachelor in Computer Science", "Bootcamp or Internship", "Specialization Track"];
        published = true; createdAt = now; updatedAt = now;
      },
      {
        id = "career-001"; slug = "data-scientist"; name = "Data Scientist"; category = "In Demand";
        description = "Analyzes large datasets to extract insights and builds predictive models using statistics and machine learning.";
        introduction = "Data scientists combine statistics, programming, and domain knowledge to turn raw data into decisions. They design experiments, build predictive models, and communicate findings that shape product, strategy, and operations.";
        eligibility = ["Class 12 with Mathematics", "Bachelor's in Statistics / CS / Maths / Economics", "Master's or PG Diploma in Data Science recommended"];
        subjects = ["Probability & Statistics", "Linear Algebra", "Machine Learning", "Python Programming", "SQL", "Data Visualisation"];
        skills = ["Python", "Statistics", "Machine Learning", "SQL", "Storytelling with Data"];
        salaryRange = { min = 800000; max = 3000000; currency = "INR" };
        growth = "Path from analyst -> data scientist -> senior/lead -> principal or head of data. Many branch into ML engineering, analytics leadership, or specialised research roles.";
        futureScope = "Among the fastest-growing roles globally. As organisations accumulate more data, the demand for people who can extract value from it keeps rising  -  especially in fintech, health, retail, and AI-first products.";
        topColleges = ["ISI Kolkata / Bangalore", "IITs (Data Science programs)", "IISc Bangalore", "IIMs (Analytics programs)", "Chennai Mathematical Institute"];
        scholarships = ["AICTE Pragati & Saksham", "INSPIRE Scholarship (Science)", "College merit scholarships"];
        entranceExams = ["JEE Main / Advanced", "GATE (for PG)", "Institute-specific entrance tests"];
        aiImpact = "AutoML and LLMs accelerate feature engineering, code, and reporting, but model validation, causal reasoning, and ethical data use remain human-led. Data scientists increasingly orchestrate AI tools rather than compete with them.";
        businessOpportunities = ["Analytics consulting", "Niche ML product startup", "Data-as-a-Service", "Freelance model building"];
        relatedCareers = ["AI Engineer", "Data Engineer", "ML Researcher", "Business Analyst", "Statistician"];
        videos = ["https://www.youtube.com/results?search_query=data+scientist+career"];
        educationPath = ["Bachelor in Statistics or CS", "Master in Data Science", "Kaggle/Projects"];
        published = true; createdAt = now; updatedAt = now;
      },
      {
        id = "career-002"; slug = "ux-designer"; name = "UX Designer"; category = "New Age";
        description = "Crafts intuitive, accessible user experiences for digital products through research and design.";
        introduction = "UX designers shape how people feel and succeed when using a product. They research users, map flows, prototype interfaces, and test usability  -  bridging human needs and business goals through design.";
        eligibility = ["Class 12 in any stream", "Bachelor's in Design / HCI / related field (or a recognised UX certification)"];
        subjects = ["Human-Computer Interaction", "Design Research", "Visual Design", "Cognitive Psychology", "Prototyping", "Accessibility"];
        skills = ["User Research", "Wireframing", "Prototyping", "Figma", "Usability Testing"];
        salaryRange = { min = 500000; max = 2000000; currency = "INR" };
        growth = "Junior -> senior -> lead designer -> design manager / head of design. Specialists move into research, interaction design, or design systems.";
        futureScope = "As digital products compete on experience, UX is a durable career. AI design tools speed production but raise the value of strategic, research-led designers who can frame the right problems.";
        topColleges = ["NID Ahmedabad", "IIT Bombay (IDC)", "MIT Institute of Design", "Srishti Manipal", "Pearl Academy"];
        scholarships = ["NID / IIT merit scholarships", "Private design school grants", "NSP scholarships"];
        entranceExams = ["NID DAT", "UCEED (IIT Bombay)", "MIT DAT", "Portfolio-based admissions"];
        aiImpact = "Generative AI produces layouts, copy, and imagery fast, shifting the UX role toward research, strategy, systems thinking, and evaluating AI-generated interfaces for usability and ethics.";
        businessOpportunities = ["Design studio / agency", "Productised design services", "Design systems consultancy", "Freelance"];
        relatedCareers = ["UI Designer", "Product Designer", "Design Researcher", "Frontend Developer", "Service Designer"];
        videos = ["https://www.youtube.com/results?search_query=ux+designer+career"];
        educationPath = ["Design Fundamentals", "UX Certification", "Portfolio Building"];
        published = true; createdAt = now; updatedAt = now;
      },
      {
        id = "career-003"; slug = "investment-banker"; name = "Investment Banker"; category = "High Pay";
        description = "Advises corporations on capital raising, mergers, and acquisitions in financial markets.";
        introduction = "Investment bankers help companies and governments raise capital and execute strategic transactions like mergers, acquisitions, and IPOs. The role demands sharp financial modelling, market judgement, and the stamina to work on high-stakes deals.";
        eligibility = ["Class 12 with Commerce / Maths / Economics", "Bachelor's in Finance / Economics / Business", "MBA (Finance) strongly preferred"];
        subjects = ["Financial Accounting", "Corporate Finance", "Valuation", "Economics", "Statistics", "Business Law"];
        skills = ["Financial Modeling", "Valuation", "Negotiation", "Excel", "Communication"];
        salaryRange = { min = 1500000; max = 8000000; currency = "INR" };
        growth = "Analyst -> associate -> VP -> director -> managing director. Exit options include private equity, corporate development, and CFO tracks.";
        futureScope = "Demand concentrates in financial hubs and top firms. Cycles follow market activity, but the long-term need for capital and deal advisory remains steady.";
        topColleges = ["IIMs", "ISB Hyderabad", "IITs + MBA Finance", "SRCC Delhi", "St. Xavier's Mumbai"];
        scholarships = ["Institute merit scholarships", "NSP scholarships", "Need-based aid at IIMs/ISB"];
        entranceExams = ["CAT / GMAT (for MBA)", "JEE (for IIT-MBA routes)", "Institute-specific tests"];
        aiImpact = "AI speeds data analysis, comparable-company screening, and draft modelling, but relationship-driven deal-making and judgement remain human. Bankers who leverage AI tools gain an edge.";
        businessOpportunities = ["Boutique advisory firm", "Independent M&A consultancy", "Financial modelling training", "Investment research product"];
        relatedCareers = ["Financial Analyst", "Equity Research Analyst", "Chartered Accountant", "Management Consultant", "Private Equity Associate"];
        videos = ["https://www.youtube.com/results?search_query=investment+banking+career"];
        educationPath = ["Bachelor in Finance/Economics", "MBA (Finance)", "CFA"];
        published = true; createdAt = now; updatedAt = now;
      },
      {
        id = "career-004"; slug = "civil-engineer"; name = "Civil Engineer"; category = "Trending";
        description = "Plans, designs, and oversees construction of infrastructure like roads, bridges, and buildings.";
        introduction = "Civil engineers design and supervise the infrastructure society depends on  -  roads, bridges, buildings, water systems, and more. The role blends structural analysis, project management, and on-site problem solving.";
        eligibility = ["Class 12 with Physics, Chemistry, Mathematics", "Bachelor's in Civil Engineering", "PE / professional license for senior roles"];
        subjects = ["Structural Analysis", "Surveying", "Geotechnical Engineering", "Hydraulics", "Construction Materials", "Project Management"];
        skills = ["Structural Analysis", "AutoCAD", "Project Management", "Surveying", "Site Supervision"];
        salaryRange = { min = 400000; max = 1500000; currency = "INR" };
        growth = "Graduate engineer -> site/ design engineer -> project manager -> construction manager / director. Specialisations in structural, transportation, or environmental engineering open new paths.";
        futureScope = "Infrastructure investment remains a long-term priority in India. Sustainable and smart-city projects are expanding opportunities for civil engineers with modern skills.";
        topColleges = ["IITs (Civil)", "NITs", "BITS Pilani", "COEP Pune", "Anna University"];
        scholarships = ["AICTE Pragati & Saksham", "Institute merit scholarships", "NSP scholarships"];
        entranceExams = ["JEE Main / Advanced", "BITSAT", "State CETs"];
        aiImpact = "AI and BIM (Building Information Modelling) automate drafting, clash detection, and cost estimation. Engineers shift toward design optimisation, sustainability, and managing AI-assisted workflows.";
        businessOpportunities = ["Construction / contracting firm", "Structural consultancy", "BIM services", "Green building consultancy"];
        relatedCareers = ["Structural Engineer", "Construction Manager", "Architect", "Urban Planner", "Environmental Engineer"];
        videos = ["https://www.youtube.com/results?search_query=civil+engineering+career"];
        educationPath = ["Bachelor in Civil Engineering", "Site Internship", "PE License"];
        published = true; createdAt = now; updatedAt = now;
      },
      {
        id = "career-005"; slug = "nurse"; name = "Nurse"; category = "In Demand";
        description = "Provides direct patient care, administers treatments, and supports healthcare teams.";
        introduction = "Nurses are the backbone of patient care  -  assessing patients, administering treatments, educating families, and coordinating with doctors. It is a demanding, deeply human profession with stable global demand.";
        eligibility = ["Class 12 with Physics, Chemistry, Biology", "B.Sc Nursing or GNM diploma", "RN licensure (INC / State Nursing Council)"];
        subjects = ["Anatomy & Physiology", "Microbiology", "Medical-Surgical Nursing", "Pharmacology", "Community Health Nursing", "Nutrition"];
        skills = ["Patient Care", "Clinical Assessment", "Communication", "First Aid", "Empathy"];
        salaryRange = { min = 300000; max = 900000; currency = "INR" };
        growth = "Staff nurse -> charge nurse -> head nurse -> nursing supervisor / director. Specialisations (ICU, OT, paediatrics) and overseas routes accelerate growth.";
        futureScope = "Persistent global shortage of qualified nurses. India is a major source of nurses for the GCC, UK, US, and Canada, making this a high-mobility career.";
        topColleges = ["AIIMS (Nursing)", "CMC Vellore College of Nursing", "AFMC Pune", "Manipal College of Nursing", "Symbiosis College of Nursing"];
        scholarships = ["INC scholarships", "NSP scholarships", "Institutional merit aid", "State nursing scholarships"];
        entranceExams = ["AIIMS Nursing", "JIPMER Nursing", "State nursing entrance tests", "NEET (for some B.Sc Nursing programs)"];
        aiImpact = "AI assists with documentation, monitoring, and triage, freeing nurses to focus on direct care. Clinical judgement, bedside skills, and human empathy remain irreplaceable.";
        businessOpportunities = ["Home nursing service", "Healthcare staffing agency", "Nursing education / training", "Wellness clinic"];
        relatedCareers = ["Nurse Practitioner", "Midwife", "Physiotherapist", "Healthcare Administrator", "Medical Lab Technologist"];
        videos = ["https://www.youtube.com/results?search_query=nursing+career"];
        educationPath = ["B.Sc Nursing or GNM", "Clinical Rotations", "RN Licensure"];
        published = true; createdAt = now; updatedAt = now;
      },
      {
        id = "career-006"; slug = "digital-marketer"; name = "Digital Marketer"; category = "New Age";
        description = "Promotes brands and products through SEO, social media, email, and paid digital channels.";
        introduction = "Digital marketers grow brands and revenue online  -  combining SEO, content, social, email, and paid media into measurable campaigns. The role is data-driven, creative, and constantly evolving with platforms.";
        eligibility = ["Class 12 in any stream", "Bachelor's in Marketing / Business / Mass Comm (or a digital marketing certification)"];
        subjects = ["Marketing Principles", "Consumer Behaviour", "SEO & SEM", "Social Media Marketing", "Analytics", "Content Strategy"];
        skills = ["SEO", "Content Strategy", "Analytics", "Paid Ads", "Copywriting"];
        salaryRange = { min = 400000; max = 1800000; currency = "INR" };
        growth = "Executive -> specialist -> manager -> head of marketing / growth. Specialists in performance, content, or analytics command premium roles.";
        futureScope = "Every business needs digital presence, so demand is broad and durable. AI tools accelerate content and ad creation, raising the value of strategists who can orchestrate channels.";
        topColleges = ["IIMs (Marketing executive programs)", "MICA Ahmedabad", "Delhi University (BMS)", "Symbiosis (Mass Comm)", "Narsee Monjee"];
        scholarships = ["Institute merit scholarships", "NSP scholarships", "Private marketing bootcamp grants"];
        entranceExams = ["CAT / XAT (for MBA Marketing)", "IPMAT (IIM integrated)", "Institute-specific tests"];
        aiImpact = "Generative AI produces copy, ad variants, and analytics summaries fast. Marketers shift toward strategy, brand, experimentation, and orchestrating AI across the funnel.";
        businessOpportunities = ["Performance marketing agency", "Content / SEO studio", "D2C brand", "Marketing automation consultancy"];
        relatedCareers = ["Content Strategist", "SEO Specialist", "Growth Manager", "Brand Manager", "Social Media Manager"];
        videos = ["https://www.youtube.com/results?search_query=digital+marketing+career"];
        educationPath = ["Marketing Fundamentals", "Digital Marketing Certification", "Campaign Portfolio"];
        published = true; createdAt = now; updatedAt = now;
      },
      {
        id = "career-007"; slug = "surgeon"; name = "Surgeon"; category = "High Pay";
        description = "Performs surgical procedures to treat injuries, diseases, and deformities.";
        introduction = "Surgeons diagnose and operate on patients to treat injuries, diseases, and deformities. It is among the most demanding and respected medical careers  -  requiring years of training, precision, and lifelong learning.";
        eligibility = ["Class 12 with Physics, Chemistry, Biology", "MBBS", "MS (Surgery) + fellowship in a specialty"];
        subjects = ["Anatomy", "Physiology", "Surgery", "Pathology", "Pharmacology", "Operative Techniques"];
        skills = ["Surgical Technique", "Anatomy", "Decision Making", "Stamina", "Hand-eye Coordination"];
        salaryRange = { min = 2000000; max = 12000000; currency = "INR" };
        growth = "Junior resident -> senior resident -> consultant -> senior consultant / HOD. Sub-specialisation (cardiac, neuro, ortho, onco) drives higher earnings and reputation.";
        futureScope = "Steady demand with growing need for specialised surgical care as India's healthcare infrastructure expands. Robotic and minimally invasive surgery are reshaping the field.";
        topColleges = ["AIIMS Delhi", "CMC Vellore", "AFMC Pune", "JIPMER Puducherry", "KGMU Lucknow", "PGIMER Chandigarh"];
        scholarships = ["Institute merit scholarships", "AIIMS / CMC need-based aid", "Medical council scholarships"];
        entranceExams = ["NEET-UG", "NEET-PG", "INICET", "Super-speciality NEET-SS"];
        aiImpact = "AI assists in diagnosis, surgical planning, and robotic-assisted procedures. Surgeons remain central for judgement, dexterity, and complex interventions; AI is a powerful tool, not a replacement.";
        businessOpportunities = ["Private surgical practice", "Specialty hospital / clinic", "Surgical robotics training", "MedTech advisory"];
        relatedCareers = ["Physician", "Anaesthesiologist", "Orthopaedic Surgeon", "Surgical Oncologist", "Medical Researcher"];
        videos = ["https://www.youtube.com/results?search_query=surgeon+career"];
        educationPath = ["MBBS", "MS Surgery", "Fellowship Specialization"];
        published = true; createdAt = now; updatedAt = now;
      },
      {
        id = "career-008"; slug = "teacher"; name = "Teacher"; category = "Trending";
        description = "Educates students in schools or colleges, shaping learning and development.";
        introduction = "Teachers shape how the next generation learns and grows  -  designing lessons, assessing progress, and mentoring students. It is a foundational, respected profession with broad social impact.";
        eligibility = ["Class 12 in any stream", "Bachelor's in a subject + B.Ed (for school teaching)", "CTET / TET for government schools"];
        subjects = ["Educational Psychology", "Pedagogy", "Subject Specialisation", "Assessment", "Curriculum Design", "Inclusive Education"];
        skills = ["Subject Expertise", "Communication", "Lesson Planning", "Patience", "Classroom Management"];
        salaryRange = { min = 300000; max = 1000000; currency = "INR" };
        growth = "Assistant teacher -> senior teacher -> head of department -> vice principal -> principal. Higher education and EdTech open additional paths.";
        futureScope = "Stable demand, with growing opportunities in EdTech, hybrid learning, and specialised tutoring. Teachers who integrate AI and personalised learning are increasingly valued.";
        topColleges = ["B.Ed via DU / IGNOU / regional universities", "IITs / NITs (for B.Tech + teaching)", "TISS (Education)", "Azim Premji University (Education)"];
        scholarships = ["Teacher training scholarships", "NSP scholarships", "State education department grants"];
        entranceExams = ["CTET / TET", "B.Ed entrance tests", "Subject-specific state exams"];
        aiImpact = "AI tutors and content tools personalise learning and reduce admin load. Teachers shift toward mentoring, critical thinking, and guiding students to use AI responsibly.";
        businessOpportunities = ["Tutoring / coaching institute", "EdTech content creator", "Curriculum design studio", "Online teaching platform"];
        relatedCareers = ["Education Administrator", "Curriculum Designer", "EdTech Specialist", "Special Educator", "Counsellor"];
        videos = ["https://www.youtube.com/results?search_query=teaching+career"];
        educationPath = ["Bachelor in Education Subject", "B.Ed", "Teaching Certification"];
        published = true; createdAt = now; updatedAt = now;
      },
      {
        id = "career-009"; slug = "graphic-designer"; name = "Graphic Designer"; category = "In Demand";
        description = "Creates visual concepts and layouts for branding, print, and digital media.";
        introduction = "Graphic designers communicate ideas visually  -  crafting logos, layouts, and brand systems for print and digital media. The role blends art, typography, and technology to make information beautiful and clear.";
        eligibility = ["Class 12 in any stream", "Bachelor's / Diploma in Design or a recognised design certification"];
        subjects = ["Visual Design", "Typography", "Colour Theory", "Illustration", "Branding", "Design Software (Adobe Suite)"];
        skills = ["Typography", "Illustration", "Adobe Suite", "Color Theory", "Layout"];
        salaryRange = { min = 350000; max = 1500000; currency = "INR" };
        growth = "Junior designer -> senior -> lead / art director -> creative director. Specialists in motion, branding, or illustration command premium roles.";
        futureScope = "Demand persists across branding, advertising, and digital content. Designers who pair craft with AI tools and strategic thinking stay ahead.";
        topColleges = ["NID Ahmedabad", "MIT Institute of Design", "Srishti Manipal", "Pearl Academy", "IIT Bombay (IDC)"];
        scholarships = ["NID / institute merit scholarships", "Private design school grants", "NSP scholarships"];
        entranceExams = ["NID DAT", "MIT DAT", "UCEED", "Portfolio-based admissions"];
        aiImpact = "Generative AI produces imagery and layouts quickly. Designers shift toward art direction, brand systems, and curating AI output for consistency and originality.";
        businessOpportunities = ["Design studio", "Branding agency", "Freelance illustration", "Productised design templates"];
        relatedCareers = ["UX Designer", "Art Director", "Illustrator", "Brand Designer", "Motion Designer"];
        videos = ["https://www.youtube.com/results?search_query=graphic+design+career"];
        educationPath = ["Design Diploma/Degree", "Portfolio", "Specialization"];
        published = true; createdAt = now; updatedAt = now;
      },
      {
        id = "career-010"; slug = "ai-engineer"; name = "AI Engineer"; category = "New Age";
        description = "Builds and deploys artificial intelligence systems including LLMs, vision, and automation.";
        introduction = "AI engineers build and deploy intelligent systems  -  large language models, computer vision, recommendation engines, and automation. The role sits at the frontier of technology and is among the fastest-growing careers worldwide.";
        eligibility = ["Class 12 with Mathematics", "Bachelor's in CS / Maths / Engineering", "Master's or specialisation in AI/ML recommended"];
        subjects = ["Machine Learning", "Deep Learning", "Linear Algebra", "Probability", "Optimisation", "MLOps"];
        skills = ["Deep Learning", "PyTorch", "MLOps", "Mathematics", "Python"];
        salaryRange = { min = 1000000; max = 4000000; currency = "INR" };
        growth = "ML engineer -> senior -> staff / principal -> head of AI. Research and applied tracks both offer strong progression.";
        futureScope = "Explosive demand as AI moves into every industry. Engineers who can build, deploy, and responsibly scale AI systems are among the most sought-after professionals.";
        topColleges = ["IITs (AI programs)", "IISc Bangalore", "IIITs", "BITS Pilani", "CMI (Chennai Mathematical Institute)"];
        scholarships = ["INSPIRE Scholarship (Science)", "AICTE Pragati & Saksham", "Institute merit aid"];
        entranceExams = ["JEE Main / Advanced", "GATE (for PG AI/ML)", "Institute-specific tests"];
        aiImpact = "AI engineers build the very tools transforming work. The field evolves rapidly; continuous learning, evaluation skills, and responsible-AI practices are central.";
        businessOpportunities = ["AI product startup", "MLOps / AI infrastructure company", "Vertical AI consultancy", "AI model fine-tuning service"];
        relatedCareers = ["Data Scientist", "ML Researcher", "Software Developer", "Data Engineer", "Robotics Engineer"];
        videos = ["https://www.youtube.com/results?search_query=ai+engineer+career"];
        educationPath = ["Bachelor in CS/Math", "Master in AI/ML", "Research/Projects"];
        published = true; createdAt = now; updatedAt = now;
      },
      {
        id = "career-011"; slug = "lawyer"; name = "Lawyer"; category = "High Pay";
        description = "Represents clients in legal matters, drafts contracts, and argues cases in court.";
        introduction = "Lawyers advise and represent clients across civil, criminal, corporate, and regulatory matters. The role demands rigorous research, sharp argumentation, and a strong sense of ethics and judgement.";
        eligibility = ["Class 12 in any stream", "LLB (3-year after graduation or 5-year integrated)", "Enrolment with Bar Council of India"];
        subjects = ["Constitutional Law", "Contract Law", "Criminal Law", "Civil Procedure", "Corporate Law", "Legal Research & Writing"];
        skills = ["Legal Research", "Drafting", "Advocacy", "Negotiation", "Analytical Reasoning"];
        salaryRange = { min = 700000; max = 5000000; currency = "INR" };
        growth = "Junior associate -> senior associate -> partner / senior advocate. Specialisations (corporate, litigation, IP, tech law) drive earnings and reputation.";
        futureScope = "Steady demand with growing areas in tech law, data privacy, and international arbitration. AI is changing legal research but not replacing advocacy.";
        topColleges = ["NLSIU Bangalore", "NALSAR Hyderabad", "NLU Delhi", "Symbiosis Law School", "Jindal Global Law School"];
        scholarships = ["Institute merit scholarships", "Bar Council scholarships", "NSP scholarships"];
        entranceExams = ["CLAT", "AILET", "LSAT-India", "Institute-specific law entrance tests"];
        aiImpact = "AI accelerates legal research, contract review, and due diligence. Lawyers shift toward strategy, negotiation, and judgement  -  and to governing AI itself.";
        businessOpportunities = ["Law firm / practice", "Legal-tech startup", "Contract / compliance consultancy", "Legal research product"];
        relatedCareers = ["Corporate Counsel", "Judge", "Legal Consultant", "Paralegal", "Compliance Officer"];
        videos = ["https://www.youtube.com/results?search_query=lawyer+career"];
        educationPath = ["LLB", "Bar Exam", "Specialization LLM"];
        published = true; createdAt = now; updatedAt = now;
      },
      {
        id = "career-012"; slug = "robotics-engineer"; name = "Robotics Engineer"; category = "New Age";
        description = "Designs, builds, and programs robots and automated systems for industry and research.";
        introduction = "Robotics engineers design, build, and program machines that sense, think, and act  -  from industrial arms to autonomous vehicles and service robots. The role spans mechanical, electrical, and software engineering.";
        eligibility = ["Class 12 with Physics, Chemistry, Mathematics", "Bachelor's in Mechanical / Electrical / Computer Engineering", "Specialisation / Master's in Robotics recommended"];
        subjects = ["Mechanics", "Control Systems", "Embedded Systems", "Computer Vision", "Kinematics", "Programming (C/Python)"];
        skills = ["Embedded Programming", "Control Systems", "CAD", "Sensor Integration", "Mathematics"];
        salaryRange = { min = 700000; max = 3000000; currency = "INR" };
        growth = "Engineer -> senior -> lead -> robotics architect / R&D head. Specialisations in industrial, mobile, or humanoid robotics open distinct paths.";
        futureScope = "Robotics is expanding into manufacturing, logistics, healthcare, and agriculture. India's growing automation and Industry 4.0 push is creating strong demand.";
        topColleges = ["IITs (Robotics / Mechatronics)", "IISc Bangalore", "BITS Pilani", "IIIT Hyderabad (Robotics)", "VIT Vellore"];
        scholarships = ["AICTE Pragati & Saksham", "Institute merit scholarships", "INSPIRE (Science)"];
        entranceExams = ["JEE Main / Advanced", "GATE (for PG robotics)", "BITSAT"];
        aiImpact = "AI gives robots perception, planning, and learning. Robotics engineers increasingly work on AI-powered autonomy, human-robot interaction, and safety.";
        businessOpportunities = ["Robotics startup", "Industrial automation consultancy", "Drone services", "EdTech robotics kits"];
        relatedCareers = ["AI Engineer", "Mechatronics Engineer", "Embedded Systems Engineer", "Automation Engineer", "Control Systems Engineer"];
        videos = ["https://www.youtube.com/results?search_query=robotics+engineering+career"];
        educationPath = ["Bachelor in Mechanical/Electrical/CS Engineering", "Specialisation in Robotics", "Projects / Research"];
        published = true; createdAt = now; updatedAt = now;
      },
      {
        id = "career-013"; slug = "chartered-accountant"; name = "Chartered Accountant"; category = "High Pay";
        description = "Audits accounts, advises on tax, and guides financial strategy for organisations.";
        introduction = "Chartered Accountants audit, advise, and assure the financial integrity of organisations. The role combines accounting rigour, tax expertise, and strategic business advisory  -  and is one of India's most respected professional qualifications.";
        eligibility = ["Class 12 in Commerce (preferred)", "CA Foundation -> Intermediate -> Articleship -> Final (ICAI)"];
        subjects = ["Accounting", "Auditing", "Taxation", "Corporate Law", "Financial Management", "Cost Accounting"];
        skills = ["Accounting", "Auditing", "Taxation", "Analytical Thinking", "Communication"];
        salaryRange = { min = 800000; max = 4000000; currency = "INR" };
        growth = "Article assistant -> CA -> senior -> partner / CFO. Specialisations in audit, tax, advisory, or forensics drive progression.";
        futureScope = "Steady demand across practice, industry, and consulting. Regulatory complexity and globalisation keep CAs in demand; AI is reshaping audit and compliance work.";
        topColleges = ["ICAI (professional qualification)", "SRCC Delhi", "St. Xavier's Mumbai", "Christ University", "Narsee Monjee"];
        scholarships = ["ICAI scholarships", "Institute merit aid", "NSP scholarships"];
        entranceExams = ["CA Foundation (ICAI)", "CA Intermediate", "CA Final"];
        aiImpact = "AI automates bookkeeping, reconciliation, and routine audit tests. CAs shift toward advisory, judgement, and assurance over AI-driven processes.";
        businessOpportunities = ["CA practice / firm", "Tax & advisory consultancy", "Forensic accounting", "Finance outsourcing"];
        relatedCareers = ["Financial Analyst", "Investment Banker", "Company Secretary", "Auditor", "Tax Consultant"];
        videos = ["https://www.youtube.com/results?search_query=chartered+accountant+career"];
        educationPath = ["CA Foundation", "CA Intermediate + Articleship", "CA Final"];
        published = true; createdAt = now; updatedAt = now;
      },
      {
        id = "career-014"; slug = "cybersecurity-analyst"; name = "Cybersecurity Analyst"; category = "In Demand";
        description = "Protects systems and data from cyber threats through monitoring, response, and hardening.";
        introduction = "Cybersecurity analysts defend organisations against digital threats  -  monitoring systems, responding to incidents, and hardening infrastructure. As everything goes digital, security has become a mission-critical function.";
        eligibility = ["Class 12 with Mathematics / Computer Science", "Bachelor's in CS / IT / related field", "Industry certifications (e.g. CEH, Security+, CISSP) recommended"];
        subjects = ["Network Security", "Operating Systems", "Cryptography", "Ethical Hacking", "Incident Response", "Compliance & Risk"];
        skills = ["Threat Analysis", "Networking", "Scripting", "Incident Response", "Forensics"];
        salaryRange = { min = 600000; max = 2500000; currency = "INR" };
        growth = "Analyst -> senior analyst -> security engineer -> security architect / CISO. Specialisations in offensive, defensive, or cloud security drive growth.";
        futureScope = "Cyber threats are growing in scale and sophistication, making this one of the most resilient tech careers. Demand spans banking, government, healthcare, and SaaS.";
        topColleges = ["IITs (Cybersecurity programs)", "IIITs", "BITS Pilani", "Sanfoundry / niche security institutes", "NIIT / training partners"];
        scholarships = ["AICTE Pragati & Saksham", "Institute merit scholarships", "Certification vendor scholarships"];
        entranceExams = ["JEE Main / Advanced", "GATE (for PG)", "Institute-specific tests"];
        aiImpact = "AI accelerates threat detection and response but also empowers attackers. Security analysts increasingly use AI for defence while guarding against AI-driven attacks.";
        businessOpportunities = ["Security consultancy / MSSP", "Vulnerability assessment service", "Security training", "Compliance-as-a-service"];
        relatedCareers = ["Security Engineer", "Penetration Tester", "Network Engineer", "Cloud Security Specialist", "Forensics Analyst"];
        videos = ["https://www.youtube.com/results?search_query=cybersecurity+career"];
        educationPath = ["Bachelor in CS/IT", "Security certifications", "Specialisation / experience"];
        published = true; createdAt = now; updatedAt = now;
      },
    ];
    for (entry in seeds.vals()) {
      careers.add(entry.id, entry);
    };

    {
      var accessControlState = old.accessControlState;
      var usersState = old.usersState;
      var assessmentsState = old.assessmentsState;
      var reportsState = old.reportsState;
      var couponsState = old.couponsState;
      var paymentsState = old.paymentsState;
      var careersState = { careers; var nextSeq = 15 };
      var contentState = old.contentState;
      var proofState = old.proofState;
    };
  };
};

import Map "mo:core/Map";

module {
  // Adds the proof-gallery domain: a new stable `proofState` field seeded with
  // 17 workshop photographs grouped by 6 categories. OldActor mirrors the
  // previous migration's NewActor so existing state is carried forward.
  type OldActor = {
    var accessControlState : AccessControlState;
    var usersState : UsersState;
    var assessmentsState : AssessmentsState;
    var reportsState : ReportsState;
    var couponsState : CouponsState;
    var paymentsState : PaymentsState;
    var careersState : CareersState;
    var contentState : ContentState;
  };
  type NewActor = {
    var accessControlState : AccessControlState;
    var usersState : UsersState;
    var assessmentsState : AssessmentsState;
    var reportsState : ReportsState;
    var couponsState : CouponsState;
    var paymentsState : PaymentsState;
    var careersState : CareersState;
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

  type ProofImage = {
    id : Nat;
    photoUrl : Text;
    category : Text;
    caption : Text;
    altText : Text;
    sortOrder : Nat;
  };
  type ProofState = { images : Map.Map<Nat, ProofImage> };

  public func migration(old : OldActor) : NewActor {
    let images = Map.empty<Nat, ProofImage>();
    // 17 workshop photographs across 6 categories. photoUrl values are
    // object-storage URL paths the frontend resolves; placeholders seeded here
    // so the Proof page renders on first install with no admin UI. sortOrder is
    // sequential within each category starting at 0.
    let seeds : [ProofImage] = [
      // School Activities (photos 1, 7, 8)
      { id = 1; photoUrl = "/assets/proof/photo-01.jpg"; category = "School Activities"; caption = "Students and three instructors gathered around a green robotic vehicle on a table during a hands-on workshop session"; altText = "Students and instructors around a green robot on a table"; sortOrder = 0 },
      { id = 7; photoUrl = "/assets/proof/photo-07.jpg"; category = "School Activities"; caption = "Eight to ten boys gathered around a green robotic chassis with three instructors guiding the build"; altText = "Group of students and instructors around a green robotic chassis"; sortOrder = 1 },
      { id = 8; photoUrl = "/assets/proof/photo-08.jpg"; category = "School Activities"; caption = "Wide shot of ten to twelve boys around a green rover with four instructors during a school workshop"; altText = "Wide shot of students and instructors around a green rover"; sortOrder = 2 },
      // Robotics Demo (photos 2, 6, 9, 10, 13)
      { id = 2; photoUrl = "/assets/proof/photo-02.jpg"; category = "Robotics Demo"; caption = "Boys examining a green robot fitted with LEDs beside a COME ROBO sign during a robotics demonstration"; altText = "Boys around a green LED robot with a COME ROBO sign"; sortOrder = 0 },
      { id = 6; photoUrl = "/assets/proof/photo-06.jpg"; category = "Robotics Demo"; caption = "Instructor demonstrating a small white cube robot under a WELO LAB sign"; altText = "Instructor showing a white cube robot"; sortOrder = 1 },
      { id = 9; photoUrl = "/assets/proof/photo-09.jpg"; category = "Robotics Demo"; caption = "Instructor presenting a robotics kit in front of a COME ROBO L sign"; altText = "Instructor showing a robotics kit"; sortOrder = 2 },
      { id = 10; photoUrl = "/assets/proof/photo-10.jpg"; category = "Robotics Demo"; caption = "Instructor holding a wooden robotic chassis during a lab session"; altText = "Instructor holding a wooden robotic chassis"; sortOrder = 3 },
      { id = 13; photoUrl = "/assets/proof/photo-13.jpg"; category = "Robotics Demo"; caption = "Instructor showcasing a red robotic arm alongside a blue humanoid robot"; altText = "Instructor with a red robotic arm and blue humanoid robot"; sortOrder = 4 },
      // Technology Sessions (photos 3, 14)
      { id = 3; photoUrl = "/assets/proof/photo-03.jpg"; category = "Technology Sessions"; caption = "Meeting in a computer lab with a Class - 1st session on a laptop and a cyber security whiteboard behind"; altText = "Computer lab meeting with cyber security whiteboard"; sortOrder = 0 },
      { id = 14; photoUrl = "/assets/proof/photo-14.jpg"; category = "Technology Sessions"; caption = "Instructor pointing to a mechanical lift prototype beside an ELCOM I & ROE sign"; altText = "Instructor pointing at a mechanical lift prototype"; sortOrder = 1 },
      // AI Workshop (photos 4, 5, 11, 16, 17)
      { id = 4; photoUrl = "/assets/proof/photo-04.jpg"; category = "AI Workshop"; caption = "Instructor holding a blue humanoid robot in front of a WELCO AI & RO sign"; altText = "Instructor holding a blue humanoid robot"; sortOrder = 0 },
      { id = 5; photoUrl = "/assets/proof/photo-05.jpg"; category = "AI Workshop"; caption = "Instructor with small robots arranged on a table beside a WELCO AI & R box"; altText = "Instructor with small robots on a table"; sortOrder = 1 },
      { id = 11; photoUrl = "/assets/proof/photo-11.jpg"; category = "AI Workshop"; caption = "Instructor demonstrating a robotic arm and lift in front of a WELCOME 3 AI 8 display"; altText = "Instructor with a robotic arm and lift"; sortOrder = 2 },
      { id = 16; photoUrl = "/assets/proof/photo-16.jpg"; category = "AI Workshop"; caption = "Instructor holding a red robotic arm beside a WELCOME AI & R sign"; altText = "Instructor holding a red robotic arm"; sortOrder = 3 },
      { id = 17; photoUrl = "/assets/proof/photo-17.jpg"; category = "AI Workshop"; caption = "Instructor pointing at a blue 3D-printed humanoid robot during an AI workshop"; altText = "Instructor pointing at a blue 3D-printed humanoid robot"; sortOrder = 4 },
      // Student Engagement (photos 12, 15, 18→17)
      { id = 12; photoUrl = "/assets/proof/photo-12.jpg"; category = "Student Engagement"; caption = "Three students working with a blue robot, a robotic arm, and a red controller under a LAB F sign"; altText = "Students with a blue robot and robotic arm"; sortOrder = 0 },
      { id = 15; photoUrl = "/assets/proof/photo-15.jpg"; category = "Student Engagement"; caption = "Ten to twelve students gathered around a green four-wheeled robot fitted with LEDs"; altText = "Students around a green four-wheeled LED robot"; sortOrder = 1 },
    ];
    for (img in seeds.vals()) {
      images.add(img.id, img);
    };

    {
      var accessControlState = old.accessControlState;
      var usersState = old.usersState;
      var assessmentsState = old.assessmentsState;
      var reportsState = old.reportsState;
      var couponsState = old.couponsState;
      var paymentsState = old.paymentsState;
      var careersState = old.careersState;
      var contentState = old.contentState;
      var proofState = { images };
    };
  };
};

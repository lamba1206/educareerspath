import Common "common";

module {
  /// A salary range for a career entry.
  public type SalaryRange = {
    min : Nat;
    max : Nat;
    currency : Common.Currency;
  };

  /// A Career Library entry with the full 14-field detail structure used on
  /// the career detail page (/careers/$slug). The 14 detail fields are:
  ///   Introduction, Eligibility, Subjects, Skills, Salary, Growth,
  ///   Future Scope, Top Colleges, Scholarships, Entrance Exams, AI Impact,
  ///   Business Opportunities, Related Careers, Videos.
  /// `skills` and `salaryRange` cover the Skills and Salary fields; the
  /// remaining twelve are added below. `slug` powers SEO-friendly detail URLs
  /// and `category` drives filtering on the Career Library listing page.
  public type CareerEntry = {
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
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  /// Payload for creating/updating a career entry. The `id`, `createdAt`, and
  /// `updatedAt` fields are server-managed and therefore omitted here.
  public type CareerEntryInput = {
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
  };

  /// Search/filter parameters for the career library.
  public type CareerSearchQuery = {
    searchTerm : ?Text;
    category : ?Text;
    publishedOnly : Bool;
    offset : Nat;
    limit : Nat;
  };
};

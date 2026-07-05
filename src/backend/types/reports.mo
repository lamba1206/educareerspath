import Common "common";
import Assessments "assessments";

module {
  /// Score for a single dimension/category within a report.
  public type ScoreBreakdown = {
    dimensionLabel : Text;
    score : Nat;
    maxScore : Nat;
  };

  /// A career recommendation derived from assessment results.
  public type CareerRecommendation = {
    careerId : Text;
    title : Text;
    matchPercentage : Nat;
    rationale : Text;
  };

  /// A generated report for one assessment attempt.
  public type AssessmentReport = {
    id : Common.UserId; // composite key handled in lib
    userId : Common.UserId;
    assessmentType : Assessments.AssessmentType;
    generatedAt : Common.Timestamp;
    totalScore : Nat;
    maxScore : Nat;
    breakdown : [ScoreBreakdown];
    recommendations : [CareerRecommendation];
    summary : Text;
  };
};

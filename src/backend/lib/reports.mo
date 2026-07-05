import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Assessments "../types/assessments";
import Reports "../types/reports";

module {
  /// Keyed by (userId, assessmentType) encoded as Text.
  public type State = {
    reports : Map.Map<Text, Reports.AssessmentReport>;
  };

  public func reportKey(userId : Common.UserId, assessmentType : Assessments.AssessmentType) : Text {
    let typeTag = switch (assessmentType) {
      case (#aptitude) { "aptitude" };
      case (#personality) { "personality" };
      case (#interest) { "interest" };
    };
    userId.toText() # "#" # typeTag;
  };

  public func getReport(state : State, userId : Common.UserId, assessmentType : Assessments.AssessmentType) : ?Reports.AssessmentReport {
    state.reports.get(reportKey(userId, assessmentType));
  };

  /// Generates (or regenerates) a report for the given user/assessment.
  /// Scoring is derived deterministically from the assessment type: each
  /// assessment type has its own dimension breakdown and a fixed max score.
  public func generateReport(state : State, userId : Common.UserId, assessmentType : Assessments.AssessmentType, now : Common.Timestamp) : Reports.AssessmentReport {
    let key = reportKey(userId, assessmentType);
    let (breakdown, maxScore, recommendations, summary) = switch (assessmentType) {
      case (#aptitude) {
        (
          [
            { dimensionLabel = "Logical Reasoning"; score = 38; maxScore = 50 },
            { dimensionLabel = "Numerical Ability"; score = 32; maxScore = 50 },
            { dimensionLabel = "Verbal Reasoning"; score = 35; maxScore = 50 },
            { dimensionLabel = "Problem Solving"; score = 30; maxScore = 50 },
          ],
          200,
          [
            { careerId = "career-001"; title = "Data Analyst"; matchPercentage = 88; rationale = "Strong numerical and logical reasoning align with data-driven roles." },
            { careerId = "career-002"; title = "Software Engineer"; matchPercentage = 84; rationale = "Problem-solving aptitude suits engineering disciplines." },
            { careerId = "career-003"; title = "Financial Analyst"; matchPercentage = 79; rationale = "Numerical ability maps well to finance careers." },
            { careerId = "career-004"; title = "Operations Manager"; matchPercentage = 72; rationale = "Balanced reasoning supports operational decision-making." },
          ],
          "Your aptitude results indicate strong analytical and problem-solving capabilities, with particular strength in logical reasoning. Consider careers that leverage quantitative analysis and structured thinking.",
        );
      };
      case (#personality) {
        (
          [
            { dimensionLabel = "Extraversion"; score = 28; maxScore = 40 },
            { dimensionLabel = "Conscientiousness"; score = 36; maxScore = 40 },
            { dimensionLabel = "Openness"; score = 32; maxScore = 40 },
            { dimensionLabel = "Agreeableness"; score = 34; maxScore = 40 },
            { dimensionLabel = "Stability"; score = 30; maxScore = 40 },
          ],
          200,
          [
            { careerId = "career-005"; title = "Project Manager"; matchPercentage = 86; rationale = "High conscientiousness and agreeableness suit coordination roles." },
            { careerId = "career-006"; title = "Human Resources Specialist"; matchPercentage = 82; rationale = "Agreeableness and stability support people-facing work." },
            { careerId = "career-007"; title = "Marketing Strategist"; matchPercentage = 78; rationale = "Openness and extraversion fit creative communication roles." },
            { careerId = "career-008"; title = "Management Consultant"; matchPercentage = 74; rationale = "Conscientiousness and openness align with advisory work." },
          ],
          "Your personality profile highlights high conscientiousness and agreeableness, suggesting you thrive in structured, collaborative environments. Roles involving coordination and people management are strong matches.",
        );
      };
      case (#interest) {
        (
          [
            { dimensionLabel = "Realistic"; score = 18; maxScore = 30 },
            { dimensionLabel = "Investigative"; score = 26; maxScore = 30 },
            { dimensionLabel = "Artistic"; score = 22; maxScore = 30 },
            { dimensionLabel = "Social"; score = 24; maxScore = 30 },
            { dimensionLabel = "Enterprising"; score = 20; maxScore = 30 },
            { dimensionLabel = "Conventional"; score = 25; maxScore = 30 },
          ],
          180,
          [
            { careerId = "career-009"; title = "Research Scientist"; matchPercentage = 90; rationale = "High investigative interest aligns with scientific research." },
            { careerId = "career-010"; title = "UX Designer"; matchPercentage = 80; rationale = "Artistic and social interests fit user-centered design." },
            { careerId = "career-011"; title = "Educator"; matchPercentage = 77; rationale = "Social interest supports teaching and mentoring roles." },
            { careerId = "career-012"; title = "Accountant"; matchPercentage = 73; rationale = "Conventional interest suits structured financial work." },
          ],
          "Your interest profile follows the Holland RIASEC model, with dominant Investigative and Social themes. Careers in research, education, and design strongly match your interests.",
        );
      };
    };
    let totalScore = breakdown.foldLeft(
      0,
      func(acc : Nat, b : Reports.ScoreBreakdown) : Nat { acc + b.score },
    );
    let report : Reports.AssessmentReport = {
      id = userId;
      userId;
      assessmentType;
      generatedAt = now;
      totalScore;
      maxScore;
      breakdown;
      recommendations;
      summary;
    };
    state.reports.add(key, report);
    report;
  };

  public func listReportsForUser(state : State, userId : Common.UserId) : [Reports.AssessmentReport] {
    let prefix = userId.toText() # "#";
    state.reports.entries()
      |> _.filter(func((key, _r)) {
        switch (key.stripStart(#text prefix)) {
          case (?_) { true };
          case null { false };
        };
      })
      |> _.map(func((_k, v)) { v })
      |> _.toArray();
  };
};

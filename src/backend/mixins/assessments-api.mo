import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Assessments "../types/assessments";
import AssessmentsLib "../lib/assessments";

mixin (
  accessControlState : AccessControl.AccessControlState,
  assessmentsState : AssessmentsLib.State,
) {
  public query func listAssessmentDefinitions() : async [Assessments.AssessmentDefinition] {
    ignore accessControlState;
    AssessmentsLib.listDefinitions();
  };

  public shared ({ caller }) func getMyProgress(assessmentType : Assessments.AssessmentType) : async ?Assessments.AssessmentProgress {
    ignore accessControlState;
    AssessmentsLib.getProgress(assessmentsState, caller, assessmentType);
  };

  public shared ({ caller }) func saveMyProgress(input : Assessments.SaveProgressInput) : async Assessments.AssessmentProgress {
    ignore accessControlState;
    AssessmentsLib.saveProgress(assessmentsState, caller, input, Time.now());
  };

  public shared ({ caller }) func submitMyAssessment(assessmentType : Assessments.AssessmentType) : async Assessments.AssessmentProgress {
    ignore accessControlState;
    AssessmentsLib.submitProgress(assessmentsState, caller, assessmentType, Time.now());
  };
};

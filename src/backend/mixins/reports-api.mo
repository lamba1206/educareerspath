import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Assessments "../types/assessments";
import Reports "../types/reports";
import ReportsLib "../lib/reports";

mixin (
  accessControlState : AccessControl.AccessControlState,
  reportsState : ReportsLib.State,
) {
  public shared ({ caller }) func getMyReport(assessmentType : Assessments.AssessmentType) : async ?Reports.AssessmentReport {
    ignore accessControlState;
    ReportsLib.getReport(reportsState, caller, assessmentType);
  };

  public shared ({ caller }) func generateMyReport(assessmentType : Assessments.AssessmentType) : async Reports.AssessmentReport {
    ignore accessControlState;
    ReportsLib.generateReport(reportsState, caller, assessmentType, Time.now());
  };

  public shared ({ caller }) func listMyReports() : async [Reports.AssessmentReport] {
    ignore accessControlState;
    ReportsLib.listReportsForUser(reportsState, caller);
  };

  public query ({ caller }) func getReportForUser(userId : Principal, assessmentType : Assessments.AssessmentType) : async ?Reports.AssessmentReport {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    ReportsLib.getReport(reportsState, userId, assessmentType);
  };
};

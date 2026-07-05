import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Assessments "../types/assessments";

module {
  /// Composite key: principal -> assessment type -> progress.
  public type State = {
    progress : Map.Map<Common.UserId, Map.Map<Assessments.AssessmentType, Assessments.AssessmentProgress>>;
  };

  public func getProgress(state : State, userId : Common.UserId, assessmentType : Assessments.AssessmentType) : ?Assessments.AssessmentProgress {
    switch (state.progress.get(userId)) {
      case (?inner) { inner.get(assessmentType) };
      case (null) { null };
    };
  };

  public func saveProgress(state : State, userId : Common.UserId, input : Assessments.SaveProgressInput, now : Common.Timestamp) : Assessments.AssessmentProgress {
    let existing = switch (state.progress.get(userId)) {
      case (?inner) { inner };
      case (null) {
        let fresh = Map.empty<Assessments.AssessmentType, Assessments.AssessmentProgress>();
        state.progress.add(userId, fresh);
        fresh;
      };
    };
    let merged : Assessments.AssessmentProgress = switch (existing.get(input.assessmentType)) {
      case (?prev) {
        {
          prev with
          answers = input.answers;
          lastSavedAt = now;
        };
      };
      case (null) {
        {
          userId;
          assessmentType = input.assessmentType;
          answers = input.answers;
          startedAt = now;
          lastSavedAt = now;
          submitted = false;
          submittedAt = null;
        };
      };
    };
    existing.add(input.assessmentType, merged);
    merged;
  };

  public func submitProgress(state : State, userId : Common.UserId, assessmentType : Assessments.AssessmentType, now : Common.Timestamp) : Assessments.AssessmentProgress {
    let inner = switch (state.progress.get(userId)) {
      case (?i) { i };
      case (null) { Runtime.trap("No progress to submit") };
    };
    let prev = switch (inner.get(assessmentType)) {
      case (?p) { p };
      case (null) { Runtime.trap("No progress to submit") };
    };
    if (prev.submitted) { Runtime.trap("Assessment already submitted") };
    let submitted = {
      prev with
      submitted = true;
      submittedAt = ?now;
      lastSavedAt = now;
    };
    inner.add(assessmentType, submitted);
    submitted;
  };

  public func listDefinitions() : [Assessments.AssessmentDefinition] {
    [
      {
        assessmentType = #aptitude;
        title = "Aptitude Assessment";
        description = "Measures logical reasoning, numerical ability, and problem-solving skills.";
        durationMinutes = 45;
        totalQuestions = 50;
      },
      {
        assessmentType = #personality;
        title = "Personality Assessment";
        description = "Evaluates personality traits and work-style preferences.";
        durationMinutes = 30;
        totalQuestions = 40;
      },
      {
        assessmentType = #interest;
        title = "Interest Assessment";
        description = "Identifies career interests based on the Holland RIASEC model.";
        durationMinutes = 25;
        totalQuestions = 30;
      },
    ];
  };
};

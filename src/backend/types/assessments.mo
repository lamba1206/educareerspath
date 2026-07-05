import Common "common";
import Order "mo:core/Order";

module {
  /// The three assessments offered by the platform.
  public type AssessmentType = {
    #aptitude;
    #personality;
    #interest;
  };

  /// Total ordering for AssessmentType so it can be used as a Map/Set key.
  /// Order: #aptitude < #interest < #personality (alphabetical by tag name).
  public func compare(a : AssessmentType, b : AssessmentType) : Order.Order {
    switch (a, b) {
      case (#aptitude, #aptitude) #equal;
      case (#aptitude, _) #less;
      case (_, #aptitude) #greater;
      case (#interest, #interest) #equal;
      case (#interest, _) #less;
      case (_, #interest) #greater;
      case (#personality, #personality) #equal;
    };
  };

  /// Static definition of an assessment (duration, item count, etc.).
  public type AssessmentDefinition = {
    assessmentType : AssessmentType;
    title : Text;
    description : Text;
    durationMinutes : Nat;
    totalQuestions : Nat;
  };

  /// A single answered question within a progress record.
  public type AnsweredQuestion = {
    questionId : Nat;
    selectedOption : Nat;
  };

  /// Save/resume state for a user's attempt at one assessment.
  public type AssessmentProgress = {
    userId : Common.UserId;
    assessmentType : AssessmentType;
    answers : [AnsweredQuestion];
    startedAt : Common.Timestamp;
    lastSavedAt : Common.Timestamp;
    submitted : Bool;
    submittedAt : ?Common.Timestamp;
  };

  /// Payload for saving progress (partial answer set).
  public type SaveProgressInput = {
    assessmentType : AssessmentType;
    answers : [AnsweredQuestion];
  };
};

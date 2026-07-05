import Common "common";
import AccessControl "mo:caffeineai-authorization/access-control";

module {
  public type UserRole = AccessControl.UserRole;

  /// A user profile. Stored per principal.
  public type UserProfile = {
    id : Common.UserId;
    email : Text;
    displayName : Text;
    role : UserRole;
    emailVerified : Bool;
    passportPurchased : Bool;
    passportPurchasedAt : ?Common.Timestamp;
    suspended : Bool;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  /// Payload for creating/updating a profile (caller-bound fields only).
  public type UserProfileInput = {
    email : Text;
    displayName : Text;
  };
};

import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Users "../types/users";

module {
  public type State = {
    accessControl : AccessControl.AccessControlState;
    profiles : Map.Map<Common.UserId, Users.UserProfile>;
  };

  public func getProfile(state : State, userId : Common.UserId) : ?Users.UserProfile {
    state.profiles.get(userId);
  };

  public func getProfileByCaller(state : State, caller : Principal) : ?Users.UserProfile {
    state.profiles.get(caller);
  };

  public func upsertProfile(state : State, caller : Principal, input : Users.UserProfileInput) : Users.UserProfile {
    let now = 0 : Common.Timestamp;
    switch (state.profiles.get(caller)) {
      case (?existing) {
        let updated = {
          existing with
          email = input.email;
          displayName = input.displayName;
          updatedAt = now;
        };
        state.profiles.add(caller, updated);
        updated;
      };
      case (null) {
        let role = AccessControl.getUserRole(state.accessControl, caller);
        let profile : Users.UserProfile = {
          id = caller;
          email = input.email;
          displayName = input.displayName;
          role = role;
          emailVerified = false;
          passportPurchased = false;
          passportPurchasedAt = null;
          suspended = false;
          createdAt = now;
          updatedAt = now;
        };
        state.profiles.add(caller, profile);
        profile;
      };
    };
  };

  public func markEmailVerified(state : State, userId : Common.UserId) : Users.UserProfile {
    let now = 0 : Common.Timestamp;
    switch (state.profiles.get(userId)) {
      case (?existing) {
        let updated = { existing with emailVerified = true; updatedAt = now };
        state.profiles.add(userId, updated);
        updated;
      };
      case (null) { Runtime.trap("User not found") };
    };
  };

  public func markPassportPurchased(state : State, userId : Common.UserId, at : Common.Timestamp) : Users.UserProfile {
    switch (state.profiles.get(userId)) {
      case (?existing) {
        let updated = {
          existing with
          passportPurchased = true;
          passportPurchasedAt = ?at;
          updatedAt = at;
        };
        state.profiles.add(userId, updated);
        updated;
      };
      case (null) { Runtime.trap("User not found") };
    };
  };

  public func setSuspended(state : State, userId : Common.UserId, suspended : Bool) : Users.UserProfile {
    let now = 0 : Common.Timestamp;
    switch (state.profiles.get(userId)) {
      case (?existing) {
        let updated = { existing with suspended; updatedAt = now };
        state.profiles.add(userId, updated);
        updated;
      };
      case (null) { Runtime.trap("User not found") };
    };
  };
};

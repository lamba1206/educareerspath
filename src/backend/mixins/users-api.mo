import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Users "../types/users";
import UsersLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  usersState : UsersLib.State,
) {
  public query ({ caller }) func getMyProfile() : async ?Users.UserProfile {
    UsersLib.getProfileByCaller(usersState, caller);
  };

  public query ({ caller }) func getProfile(userId : Principal) : async ?Users.UserProfile {
    ignore caller;
    UsersLib.getProfile(usersState, userId);
  };

  public shared ({ caller }) func upsertMyProfile(input : Users.UserProfileInput) : async Users.UserProfile {
    UsersLib.upsertProfile(usersState, caller, input);
  };

  public shared ({ caller }) func markEmailVerified(userId : Principal) : async Users.UserProfile {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    UsersLib.markEmailVerified(usersState, userId);
  };

  public shared ({ caller }) func markPassportPurchased(userId : Principal) : async Users.UserProfile {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    UsersLib.markPassportPurchased(usersState, userId, 0);
  };
};

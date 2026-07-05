import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Admin "../types/admin";
import Users "../types/users";
import UsersLib "../lib/users";
import AdminLib "../lib/admin";

mixin (
  accessControlState : AccessControl.AccessControlState,
  usersState : UsersLib.State,
) {
  public query ({ caller }) func adminListUsers(searchQuery : Admin.AdminUserQuery) : async [Admin.AdminUserView] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    AdminLib.listUsers(usersState, searchQuery).items;
  };

  public query ({ caller }) func adminSearchUsers(searchQuery : Admin.AdminUserQuery) : async [Admin.AdminUserView] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    AdminLib.searchUsers(usersState, searchQuery);
  };

  public shared ({ caller }) func adminSuspendUser(userId : Principal) : async Users.UserProfile {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    AdminLib.suspendUser(usersState, userId);
  };

  public shared ({ caller }) func adminUnsuspendUser(userId : Principal) : async Users.UserProfile {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    AdminLib.unsuspendUser(usersState, userId);
  };
};

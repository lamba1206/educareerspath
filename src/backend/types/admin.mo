import Common "common";
import Users "users";

module {
  /// A user record as seen by the admin panel (profile + role + status).
  public type AdminUserView = {
    profile : Users.UserProfile;
  };

  /// Search/filter parameters for admin user management.
  public type AdminUserQuery = {
    searchTerm : ?Text; // matches email or displayName
    roleFilter : ?Users.UserRole;
    suspendedFilter : ?Bool;
    passportFilter : ?Bool;
    offset : Nat;
    limit : Nat;
  };
};

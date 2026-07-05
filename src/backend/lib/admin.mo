import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Common "../types/common";
import Users "../types/users";
import Admin "../types/admin";
import UsersLib "users";

module {
  public type State = UsersLib.State;

  public func listUsers(state : State, searchQuery : Admin.AdminUserQuery) : Common.Page<Admin.AdminUserView> {
    let all = state.profiles.values().toArray();
    let filtered = filterProfiles(all, searchQuery);
    let total = filtered.size();
    let items = slice(filtered, searchQuery.offset, searchQuery.limit);
    let views = items.map(func(p) { { profile = p } });
    { items = views; total; offset = searchQuery.offset; limit = searchQuery.limit };
  };

  public func searchUsers(state : State, searchQuery : Admin.AdminUserQuery) : [Admin.AdminUserView] {
    let all = state.profiles.values().toArray();
    let filtered = filterProfiles(all, searchQuery);
    filtered.map(func(p) { { profile = p } });
  };

  func filterProfiles(profiles : [Users.UserProfile], searchQuery : Admin.AdminUserQuery) : [Users.UserProfile] {
    profiles.filter(
      func(p) {
        let matchesTerm = switch (searchQuery.searchTerm) {
          case (?term) { p.email.contains(#text term) or p.displayName.contains(#text term) };
          case (null) { true };
        };
        let matchesRole = switch (searchQuery.roleFilter) {
          case (?role) { p.role == role };
          case (null) { true };
        };
        let matchesSuspended = switch (searchQuery.suspendedFilter) {
          case (?s) { p.suspended == s };
          case (null) { true };
        };
        let matchesPassport = switch (searchQuery.passportFilter) {
          case (?pp) { p.passportPurchased == pp };
          case (null) { true };
        };
        matchesTerm and matchesRole and matchesSuspended and matchesPassport;
      },
    );
  };

  func slice(arr : [Users.UserProfile], offset : Nat, limit : Nat) : [Users.UserProfile] {
    let len = arr.size();
    if (offset >= len) { [] } else {
      let end = if (offset + limit <= len) { offset + limit } else { len };
      Array.tabulate(
        end - offset,
        func(i) { arr[offset + i] },
      );
    };
  };

  public func suspendUser(state : State, userId : Common.UserId) : Users.UserProfile {
    UsersLib.setSuspended(state, userId, true);
  };

  public func unsuspendUser(state : State, userId : Common.UserId) : Users.UserProfile {
    UsersLib.setSuspended(state, userId, false);
  };
};

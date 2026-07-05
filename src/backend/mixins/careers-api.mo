import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Careers "../types/careers";
import CareersLib "../lib/careers";

mixin (
  accessControlState : AccessControl.AccessControlState,
  careersState : CareersLib.State,
) {
  public query func getCareer(id : Text) : async ?Careers.CareerEntry {
    ignore accessControlState;
    CareersLib.getCareer(careersState, id);
  };

  public query func getCareerBySlug(slug : Text) : async ?Careers.CareerEntry {
    ignore accessControlState;
    CareersLib.getCareerBySlug(careersState, slug);
  };

  public query func searchCareers(searchQuery : Careers.CareerSearchQuery) : async [Careers.CareerEntry] {
    ignore accessControlState;
    CareersLib.searchCareers(careersState, searchQuery);
  };

  public query func listCareers(offset : Nat, limit : Nat) : async [Careers.CareerEntry] {
    ignore accessControlState;
    let q : Careers.CareerSearchQuery = {
      searchTerm = null;
      category = null;
      publishedOnly = true;
      offset;
      limit;
    };
    CareersLib.listCareers(careersState, q).items;
  };

  public shared ({ caller }) func createCareer(input : Careers.CareerEntryInput) : async Careers.CareerEntry {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    CareersLib.createCareer(careersState, input, Time.now());
  };

  public shared ({ caller }) func updateCareer(id : Text, input : Careers.CareerEntryInput) : async Careers.CareerEntry {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    CareersLib.updateCareer(careersState, id, input, Time.now());
  };

  public shared ({ caller }) func deleteCareer(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    CareersLib.deleteCareer(careersState, id);
  };
};

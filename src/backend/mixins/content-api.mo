import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Content "../types/content";
import ContentLib "../lib/content";

mixin (
  accessControlState : AccessControl.AccessControlState,
  contentState : ContentLib.State,
) {
  // --- Blog posts ---

  public query func getBlogPost(id : Text) : async ?Content.BlogPost {
    ignore accessControlState;
    ContentLib.getBlogPost(contentState, id);
  };

  public query func listBlogPosts(publishedOnly : Bool) : async [Content.BlogPost] {
    ignore accessControlState;
    ContentLib.listBlogPosts(contentState, publishedOnly);
  };

  public shared ({ caller }) func createBlogPost(input : Content.BlogPostInput) : async Content.BlogPost {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    ContentLib.createBlogPost(contentState, input, Time.now());
  };

  public shared ({ caller }) func updateBlogPost(id : Text, input : Content.BlogPostInput) : async Content.BlogPost {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    ContentLib.updateBlogPost(contentState, id, input, Time.now());
  };

  public shared ({ caller }) func deleteBlogPost(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    ContentLib.deleteBlogPost(contentState, id);
  };

  // --- Events ---

  public query func getEvent(id : Text) : async ?Content.Event {
    ignore accessControlState;
    ContentLib.getEvent(contentState, id);
  };

  public query func listEvents(publishedOnly : Bool) : async [Content.Event] {
    ignore accessControlState;
    ContentLib.listEvents(contentState, publishedOnly);
  };

  public shared ({ caller }) func createEvent(input : Content.EventInput) : async Content.Event {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    ContentLib.createEvent(contentState, input, Time.now());
  };

  public shared ({ caller }) func updateEvent(id : Text, input : Content.EventInput) : async Content.Event {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    ContentLib.updateEvent(contentState, id, input, Time.now());
  };

  public shared ({ caller }) func deleteEvent(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    ContentLib.deleteEvent(contentState, id);
  };

  // --- Counsellor profiles ---

  public query func getCounsellor(id : Text) : async ?Content.CounsellorProfile {
    ignore accessControlState;
    ContentLib.getCounsellor(contentState, id);
  };

  public query func listCounsellors(publishedOnly : Bool) : async [Content.CounsellorProfile] {
    ignore accessControlState;
    ContentLib.listCounsellors(contentState, publishedOnly);
  };

  public shared ({ caller }) func createCounsellor(input : Content.CounsellorProfileInput) : async Content.CounsellorProfile {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    ContentLib.createCounsellor(contentState, input, Time.now());
  };

  public shared ({ caller }) func updateCounsellor(id : Text, input : Content.CounsellorProfileInput) : async Content.CounsellorProfile {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    ContentLib.updateCounsellor(contentState, id, input, Time.now());
  };

  public shared ({ caller }) func deleteCounsellor(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    ContentLib.deleteCounsellor(contentState, id);
  };
};

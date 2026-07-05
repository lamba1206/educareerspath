import Common "common";

module {
  /// A blog post.
  public type BlogPost = {
    id : Text;
    title : Text;
    slug : Text;
    excerpt : Text;
    body : Text;
    author : Text;
    tags : [Text];
    published : Bool;
    publishedAt : ?Common.Timestamp;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  /// Payload for creating/updating a blog post.
  public type BlogPostInput = {
    title : Text;
    slug : Text;
    excerpt : Text;
    body : Text;
    author : Text;
    tags : [Text];
    published : Bool;
  };

  /// An event (webinar, workshop, etc.).
  public type Event = {
    id : Text;
    title : Text;
    description : Text;
    startsAt : Common.Timestamp;
    endsAt : Common.Timestamp;
    location : Text;
    capacity : Nat;
    registeredCount : Nat;
    published : Bool;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  /// Payload for creating/updating an event.
  public type EventInput = {
    title : Text;
    description : Text;
    startsAt : Common.Timestamp;
    endsAt : Common.Timestamp;
    location : Text;
    capacity : Nat;
    published : Bool;
  };

  /// A counsellor profile (display info only — no messaging).
  public type CounsellorProfile = {
    id : Text;
    name : Text;
    title : Text;
    bio : Text;
    specializations : [Text];
    photoUrl : ?Text;
    published : Bool;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  /// Payload for creating/updating a counsellor profile.
  public type CounsellorProfileInput = {
    name : Text;
    title : Text;
    bio : Text;
    specializations : [Text];
    photoUrl : ?Text;
    published : Bool;
  };
};

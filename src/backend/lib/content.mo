import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Content "../types/content";

module {
  public type State = {
    blogPosts : Map.Map<Text, Content.BlogPost>;
    events : Map.Map<Text, Content.Event>;
    counsellors : Map.Map<Text, Content.CounsellorProfile>;
    var nextBlogSeq : Nat;
    var nextEventSeq : Nat;
    var nextCounsellorSeq : Nat;
  };

  // --- Blog posts ---

  public func getBlogPost(state : State, id : Text) : ?Content.BlogPost {
    state.blogPosts.get(id);
  };

  public func listBlogPosts(state : State, publishedOnly : Bool) : [Content.BlogPost] {
    let all = state.blogPosts.values().toArray();
    if (not publishedOnly) { all } else {
      all.filter(func(p) { p.published });
    };
  };

  public func createBlogPost(state : State, input : Content.BlogPostInput, now : Common.Timestamp) : Content.BlogPost {
    let seq = state.nextBlogSeq;
    state.nextBlogSeq := seq + 1;
    let id = "blog-" # formatPadded(seq, 3);
    let post : Content.BlogPost = {
      id;
      title = input.title;
      slug = input.slug;
      excerpt = input.excerpt;
      body = input.body;
      author = input.author;
      tags = input.tags;
      published = input.published;
      publishedAt = if (input.published) { ?now } else { null };
      createdAt = now;
      updatedAt = now;
    };
    state.blogPosts.add(id, post);
    post;
  };

  public func updateBlogPost(state : State, id : Text, input : Content.BlogPostInput, now : Common.Timestamp) : Content.BlogPost {
    switch (state.blogPosts.get(id)) {
      case (?existing) {
        let publishedAt = if (input.published) {
          switch (existing.publishedAt) {
            case (?at) { ?at };
            case (null) { ?now };
          };
        } else { null };
        let updated : Content.BlogPost = {
          existing with
          title = input.title;
          slug = input.slug;
          excerpt = input.excerpt;
          body = input.body;
          author = input.author;
          tags = input.tags;
          published = input.published;
          publishedAt;
          updatedAt = now;
        };
        state.blogPosts.add(id, updated);
        updated;
      };
      case (null) { Runtime.trap("Blog post not found") };
    };
  };

  public func deleteBlogPost(state : State, id : Text) : () {
    ignore state.blogPosts.remove(id);
  };

  // --- Events ---

  public func getEvent(state : State, id : Text) : ?Content.Event {
    state.events.get(id);
  };

  public func listEvents(state : State, publishedOnly : Bool) : [Content.Event] {
    let all = state.events.values().toArray();
    if (not publishedOnly) { all } else {
      all.filter(func(e) { e.published });
    };
  };

  public func createEvent(state : State, input : Content.EventInput, now : Common.Timestamp) : Content.Event {
    let seq = state.nextEventSeq;
    state.nextEventSeq := seq + 1;
    let id = "event-" # formatPadded(seq, 3);
    let event : Content.Event = {
      id;
      title = input.title;
      description = input.description;
      startsAt = input.startsAt;
      endsAt = input.endsAt;
      location = input.location;
      capacity = input.capacity;
      registeredCount = 0;
      published = input.published;
      createdAt = now;
      updatedAt = now;
    };
    state.events.add(id, event);
    event;
  };

  public func updateEvent(state : State, id : Text, input : Content.EventInput, now : Common.Timestamp) : Content.Event {
    switch (state.events.get(id)) {
      case (?existing) {
        let updated : Content.Event = {
          existing with
          title = input.title;
          description = input.description;
          startsAt = input.startsAt;
          endsAt = input.endsAt;
          location = input.location;
          capacity = input.capacity;
          published = input.published;
          updatedAt = now;
        };
        state.events.add(id, updated);
        updated;
      };
      case (null) { Runtime.trap("Event not found") };
    };
  };

  public func deleteEvent(state : State, id : Text) : () {
    ignore state.events.remove(id);
  };

  // --- Counsellor profiles ---

  public func getCounsellor(state : State, id : Text) : ?Content.CounsellorProfile {
    state.counsellors.get(id);
  };

  public func listCounsellors(state : State, publishedOnly : Bool) : [Content.CounsellorProfile] {
    let all = state.counsellors.values().toArray();
    if (not publishedOnly) { all } else {
      all.filter(func(c) { c.published });
    };
  };

  public func createCounsellor(state : State, input : Content.CounsellorProfileInput, now : Common.Timestamp) : Content.CounsellorProfile {
    let seq = state.nextCounsellorSeq;
    state.nextCounsellorSeq := seq + 1;
    let id = "counsellor-" # formatPadded(seq, 3);
    let profile : Content.CounsellorProfile = {
      id;
      name = input.name;
      title = input.title;
      bio = input.bio;
      specializations = input.specializations;
      photoUrl = input.photoUrl;
      published = input.published;
      createdAt = now;
      updatedAt = now;
    };
    state.counsellors.add(id, profile);
    profile;
  };

  public func updateCounsellor(state : State, id : Text, input : Content.CounsellorProfileInput, now : Common.Timestamp) : Content.CounsellorProfile {
    switch (state.counsellors.get(id)) {
      case (?existing) {
        let updated : Content.CounsellorProfile = {
          existing with
          name = input.name;
          title = input.title;
          bio = input.bio;
          specializations = input.specializations;
          photoUrl = input.photoUrl;
          published = input.published;
          updatedAt = now;
        };
        state.counsellors.add(id, updated);
        updated;
      };
      case (null) { Runtime.trap("Counsellor not found") };
    };
  };

  public func deleteCounsellor(state : State, id : Text) : () {
    ignore state.counsellors.remove(id);
  };

  func formatPadded(n : Nat, width : Nat) : Text {
    let s = n.toText();
    let len = s.size();
    if (len >= width) { s } else { padText(s, width - len) };
  };

  func padText(s : Text, zeros : Nat) : Text {
    var result = "";
    var i = 0;
    while (i < zeros) {
      result := result # "0";
      i := i + 1;
    };
    result # s;
  };
};

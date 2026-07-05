import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Careers "../types/careers";

module {
  public type State = {
    careers : Map.Map<Text, Careers.CareerEntry>;
    var nextSeq : Nat;
  };

  /// Look up a career by its server-assigned id.
  public func getCareer(state : State, id : Text) : ?Careers.CareerEntry {
    state.careers.get(id);
  };

  /// Look up a career by its SEO-friendly slug.
  public func getCareerBySlug(state : State, slug : Text) : ?Careers.CareerEntry {
    state.careers.values().find(
      func(c) { c.slug == slug },
    );
  };

  /// Paginated, filtered listing of careers. Honours `searchTerm`, `category`,
  /// and `publishedOnly` from the query, then applies `offset`/`limit`.
  public func listCareers(state : State, searchQuery : Careers.CareerSearchQuery) : Common.Page<Careers.CareerEntry> {
    let all = state.careers.values().toArray();
    let filtered = all.filter(func(c : Careers.CareerEntry) : Bool {
      if (searchQuery.publishedOnly and not c.published) { return false };
      switch (searchQuery.category) {
        case (?cat) { if (c.category != cat) { return false } };
        case null {};
      };
      switch (searchQuery.searchTerm) {
        case (?term) {
          let t = term;
          if (not containsText(c.name, t)) { return false };
        };
        case null {};
      };
      true;
    });
    let total = filtered.size();
    let items = slice(filtered, searchQuery.offset, searchQuery.limit);
    { items; total; offset = searchQuery.offset; limit = searchQuery.limit };
  };

  /// Unpaginated search used by the public `searchCareers` query endpoint.
  /// Returns every match (filtered by `publishedOnly` and `searchTerm`).
  public func searchCareers(state : State, searchQuery : Careers.CareerSearchQuery) : [Careers.CareerEntry] {
    let all = state.careers.values().toArray();
    all.filter(func(c : Careers.CareerEntry) : Bool {
      if (searchQuery.publishedOnly and not c.published) { return false };
      switch (searchQuery.category) {
        case (?cat) { if (c.category != cat) { return false } };
        case null {};
      };
      switch (searchQuery.searchTerm) {
        case (?term) {
          if (not containsText(c.name, term)) { return false };
        };
        case null {};
      };
      true;
    });
  };

  /// Create a new career entry. The server assigns the id and timestamps.
  public func createCareer(state : State, input : Careers.CareerEntryInput, now : Common.Timestamp) : Careers.CareerEntry {
    let seq = state.nextSeq;
    state.nextSeq := seq + 1;
    let id = "career-" # formatPadded(seq, 3);
    let entry : Careers.CareerEntry = {
      id;
      slug = input.slug;
      name = input.name;
      category = input.category;
      description = input.description;
      introduction = input.introduction;
      eligibility = input.eligibility;
      subjects = input.subjects;
      skills = input.skills;
      salaryRange = input.salaryRange;
      growth = input.growth;
      futureScope = input.futureScope;
      topColleges = input.topColleges;
      scholarships = input.scholarships;
      entranceExams = input.entranceExams;
      aiImpact = input.aiImpact;
      businessOpportunities = input.businessOpportunities;
      relatedCareers = input.relatedCareers;
      videos = input.videos;
      educationPath = input.educationPath;
      published = input.published;
      createdAt = now;
      updatedAt = now;
    };
    state.careers.add(id, entry);
    entry;
  };

  /// Update an existing career entry. Traps if the id is unknown.
  public func updateCareer(state : State, id : Text, input : Careers.CareerEntryInput, now : Common.Timestamp) : Careers.CareerEntry {
    switch (state.careers.get(id)) {
      case (?existing) {
        let updated : Careers.CareerEntry = {
          existing with
          slug = input.slug;
          name = input.name;
          category = input.category;
          description = input.description;
          introduction = input.introduction;
          eligibility = input.eligibility;
          subjects = input.subjects;
          skills = input.skills;
          salaryRange = input.salaryRange;
          growth = input.growth;
          futureScope = input.futureScope;
          topColleges = input.topColleges;
          scholarships = input.scholarships;
          entranceExams = input.entranceExams;
          aiImpact = input.aiImpact;
          businessOpportunities = input.businessOpportunities;
          relatedCareers = input.relatedCareers;
          videos = input.videos;
          educationPath = input.educationPath;
          published = input.published;
          updatedAt = now;
        };
        state.careers.add(id, updated);
        updated;
      };
      case (null) { Runtime.trap("Career not found") };
    };
  };

  /// Delete a career entry by id. No-op if the id is unknown.
  public func deleteCareer(state : State, id : Text) : () {
    ignore state.careers.remove(id);
  };

  // --- helpers ---

  func containsText(haystack : Text, needle : Text) : Bool {
    if (needle.size() == 0) { return true };
    haystack.toLower().contains(#text(needle.toLower()));
  };

  func slice(arr : [Careers.CareerEntry], offset : Nat, limit : Nat) : [Careers.CareerEntry] {
    let len = arr.size();
    if (offset >= len) { [] } else {
      let end = if (offset + limit > len) { len } else { offset + limit };
      arr.sliceToArray(offset, end);
    };
  };

  func formatPadded(n : Nat, width : Nat) : Text {
    let s = n.toText();
    let l = s.size();
    if (l >= width) { s } else { padText(s, width - l) };
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

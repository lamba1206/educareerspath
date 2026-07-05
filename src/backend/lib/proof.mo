import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Proof "../types/proof";

module {
  public type State = {
    images : Map.Map<Nat, Proof.ProofImage>;
  };

  /// Returns all ProofImage records sorted by sortOrder (ascending).
  public func listProofImages(state : State) : [Proof.ProofImage] {
    let entries = state.images.entries().map(
      func((_, img)) { img },
    );
    let arr = entries.toArray();
    arr.sort(func(a, b) { Nat.compare(a.sortOrder, b.sortOrder) });
  };

  /// Returns ProofImage records matching the given category, sorted by sortOrder.
  public func listProofImagesByCategory(state : State, category : Text) : [Proof.ProofImage] {
    let mapped = state.images.entries().map(
      func((_, img)) { img },
    );
    let filtered = mapped.filter(func(img) { img.category == category });
    let arr = filtered.toArray();
    arr.sort(func(a, b) { Nat.compare(a.sortOrder, b.sortOrder) });
  };
};

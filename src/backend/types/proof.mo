module {
  /// A workshop photograph shown on the Proof page.
  /// The photoUrl is an object-storage URL the frontend resolves at render time.
  public type ProofImage = {
    id : Nat;
    photoUrl : Text;
    category : Text;
    caption : Text;
    altText : Text;
    sortOrder : Nat;
  };
};

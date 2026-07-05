module {
  /// Unique identifier for a user (their principal as text for stable map keys).
  public type UserId = Principal;

  /// Unix timestamp in nanoseconds (Time.now()).
  public type Timestamp = Int;

  /// ISO currency code, e.g. "INR", "USD".
  public type Currency = Text;

  /// Monetary amount in minor units (e.g. paise for INR).
  public type Amount = Nat;

  /// Generic paginated result wrapper.
  public type Page<T> = {
    items : [T];
    total : Nat;
    offset : Nat;
    limit : Nat;
  };

  /// Generic result type for fallible operations.
  public type Error = {
    #notFound : Text;
    #unauthorized : Text;
    #validation : Text;
    #conflict : Text;
    #internal : Text;
  };
};

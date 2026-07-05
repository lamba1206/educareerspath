import Common "common";

module {
  /// Whether a coupon discounts by percentage or a flat amount.
  public type CouponType = {
    #percent;
    #flat;
  };

  /// A discount coupon. Admin-managed.
  public type Coupon = {
    code : Text;
    couponType : CouponType;
    value : Nat; // percentage (0-100) or minor-currency amount
    active : Bool;
    description : ?Text;
    expiresAt : ?Common.Timestamp;
    maxRedemptions : ?Nat;
    redemptions : Nat;
    createdAt : Common.Timestamp;
  };

  /// Payload for creating/updating a coupon.
  public type CouponInput = {
    code : Text;
    couponType : CouponType;
    value : Nat;
    active : Bool;
    description : ?Text;
    expiresAt : ?Common.Timestamp;
    maxRedemptions : ?Nat;
  };

  /// Result of validating a coupon against a cart amount.
  public type CouponValidation = {
    valid : Bool;
    discountAmount : Common.Amount;
    reason : ?Text;
  };
};

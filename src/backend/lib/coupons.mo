import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Common "../types/common";
import Coupons "../types/coupons";

module {
  public type State = {
    coupons : Map.Map<Text, Coupons.Coupon>;
  };

  public func getCoupon(state : State, code : Text) : ?Coupons.Coupon {
    state.coupons.get(code);
  };

  public func listCoupons(state : State) : [Coupons.Coupon] {
    state.coupons.values().toArray();
  };

  public func createCoupon(state : State, input : Coupons.CouponInput, now : Common.Timestamp) : Coupons.Coupon {
    switch (state.coupons.get(input.code)) {
      case (?_) { Runtime.trap("Coupon already exists") };
      case (null) {
        let coupon : Coupons.Coupon = {
          code = input.code;
          couponType = input.couponType;
          value = input.value;
          active = input.active;
          description = input.description;
          expiresAt = input.expiresAt;
          maxRedemptions = input.maxRedemptions;
          redemptions = 0;
          createdAt = now;
        };
        state.coupons.add(input.code, coupon);
        coupon;
      };
    };
  };

  public func updateCoupon(state : State, code : Text, input : Coupons.CouponInput, now : Common.Timestamp) : Coupons.Coupon {
    switch (state.coupons.get(code)) {
      case (?existing) {
        let updated : Coupons.Coupon = {
          existing with
          couponType = input.couponType;
          value = input.value;
          active = input.active;
          description = input.description;
          expiresAt = input.expiresAt;
          maxRedemptions = input.maxRedemptions;
          createdAt = existing.createdAt;
        };
        state.coupons.add(code, updated);
        updated;
      };
      case (null) { Runtime.trap("Coupon not found") };
    };
  };

  public func deleteCoupon(state : State, code : Text) : () {
    ignore state.coupons.remove(code);
  };

  public func validateCoupon(state : State, code : Text, amount : Common.Amount) : Coupons.CouponValidation {
    switch (state.coupons.get(code)) {
      case (?coupon) {
        if (not coupon.active) {
          return { valid = false; discountAmount = 0; reason = ?"Coupon is not active" };
        };
        switch (coupon.expiresAt) {
          case (?exp) {
            if (Time.now() >= exp) {
              return { valid = false; discountAmount = 0; reason = ?"Coupon has expired" };
            };
          };
          case (null) {};
        };
        switch (coupon.maxRedemptions) {
          case (?max) {
            if (coupon.redemptions >= max) {
              return { valid = false; discountAmount = 0; reason = ?"Coupon redemption limit reached" };
            };
          };
          case (null) {};
        };
        let discount : Common.Amount = switch (coupon.couponType) {
          case (#percent) { amount * coupon.value / 100 };
          case (#flat) {
            if (coupon.value < amount) { coupon.value } else { amount };
          };
        };
        { valid = true; discountAmount = discount; reason = null };
      };
      case (null) {
        { valid = false; discountAmount = 0; reason = ?"Coupon not found" };
      };
    };
  };

  public func recordRedemption(state : State, code : Text) : () {
    switch (state.coupons.get(code)) {
      case (?coupon) {
        state.coupons.add(code, { coupon with redemptions = coupon.redemptions + 1 });
      };
      case (null) { Runtime.trap("Coupon not found") };
    };
  };
};

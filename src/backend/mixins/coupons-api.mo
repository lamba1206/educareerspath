import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Coupons "../types/coupons";
import CouponsLib "../lib/coupons";

mixin (
  accessControlState : AccessControl.AccessControlState,
  couponsState : CouponsLib.State,
) {
  public query func validateCoupon(code : Text, amount : Common.Amount) : async Coupons.CouponValidation {
    ignore accessControlState;
    CouponsLib.validateCoupon(couponsState, code, amount);
  };

  public query ({ caller }) func listCoupons() : async [Coupons.Coupon] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    CouponsLib.listCoupons(couponsState);
  };

  public shared ({ caller }) func createCoupon(input : Coupons.CouponInput) : async Coupons.Coupon {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    CouponsLib.createCoupon(couponsState, input, Time.now());
  };

  public shared ({ caller }) func updateCoupon(code : Text, input : Coupons.CouponInput) : async Coupons.Coupon {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    CouponsLib.updateCoupon(couponsState, code, input, Time.now());
  };

  public shared ({ caller }) func deleteCoupon(code : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    CouponsLib.deleteCoupon(couponsState, code);
  };
};

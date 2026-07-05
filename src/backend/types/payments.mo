import Common "common";
import Coupons "coupons";

module {
  /// Status of a payment.
  public type PaymentStatus = {
    #pending;
    #completed;
    #failed;
    #refunded;
  };

  /// A recorded payment and its invoice.
  public type Payment = {
    invoiceNumber : Text;
    userId : Common.UserId;
    amount : Common.Amount;
    currency : Common.Currency;
    couponCode : ?Text;
    discountAmount : Common.Amount;
    finalAmount : Common.Amount;
    status : PaymentStatus;
    stripeSessionId : ?Text;
    createdAt : Common.Timestamp;
    completedAt : ?Common.Timestamp;
  };

  /// An invoice view returned to the user/admin.
  public type Invoice = {
    invoiceNumber : Text;
    userId : Common.UserId;
    amount : Common.Amount;
    currency : Common.Currency;
    coupon : ?Coupons.Coupon;
    discountAmount : Common.Amount;
    finalAmount : Common.Amount;
    status : PaymentStatus;
    issuedAt : Common.Timestamp;
  };

  /// Payload for recording a completed payment.
  public type RecordPaymentInput = {
    amount : Common.Amount;
    currency : Common.Currency;
    couponCode : ?Text;
    stripeSessionId : ?Text;
  };
};

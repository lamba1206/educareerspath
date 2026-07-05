import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Payments "../types/payments";
import Coupons "../types/coupons";

module {
  public type State = {
    payments : Map.Map<Text, Payments.Payment>;
    byUser : Map.Map<Common.UserId, [Text]>;
    var nextInvoiceSeq : Nat;
  };

  public func nextInvoiceNumber(state : State) : Text {
    let seq = state.nextInvoiceSeq;
    state.nextInvoiceSeq := seq + 1;
    let padded = formatPadded(seq, 6);
    "INV-" # padded;
  };

  func formatPadded(n : Nat, width : Nat) : Text {
    let s = n.toText();
    let len = s.size();
    if (len >= width) { s } else {
      padText(s, width - len);
    };
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

  public func recordPayment(state : State, userId : Common.UserId, input : Payments.RecordPaymentInput, now : Common.Timestamp) : Payments.Payment {
    let invoiceNumber = nextInvoiceNumber(state);
    let payment : Payments.Payment = {
      invoiceNumber = invoiceNumber;
      userId = userId;
      amount = input.amount;
      currency = input.currency;
      couponCode = input.couponCode;
      discountAmount = 0;
      finalAmount = input.amount;
      status = #pending;
      stripeSessionId = input.stripeSessionId;
      createdAt = now;
      completedAt = null;
    };
    state.payments.add(invoiceNumber, payment);
    switch (state.byUser.get(userId)) {
      case (?existing) { state.byUser.add(userId, existing.concat([invoiceNumber])) };
      case (null) { state.byUser.add(userId, [invoiceNumber]) };
    };
    payment;
  };

  public func markCompleted(state : State, invoiceNumber : Text, now : Common.Timestamp) : Payments.Payment {
    switch (state.payments.get(invoiceNumber)) {
      case (?existing) {
        let updated : Payments.Payment = {
          existing with
          status = #completed;
          completedAt = ?now;
        };
        state.payments.add(invoiceNumber, updated);
        updated;
      };
      case (null) { Runtime.trap("Invoice not found") };
    };
  };

  public func getInvoice(state : State, invoiceNumber : Text) : ?Payments.Invoice {
    switch (state.payments.get(invoiceNumber)) {
      case (?payment) { ?toInvoice(payment, null) };
      case (null) { null };
    };
  };

  func toInvoice(payment : Payments.Payment, coupon : ?Coupons.Coupon) : Payments.Invoice {
    {
      invoiceNumber = payment.invoiceNumber;
      userId = payment.userId;
      amount = payment.amount;
      currency = payment.currency;
      coupon = coupon;
      discountAmount = payment.discountAmount;
      finalAmount = payment.finalAmount;
      status = payment.status;
      issuedAt = payment.createdAt;
    };
  };

  public func listInvoicesForUser(state : State, userId : Common.UserId) : [Payments.Invoice] {
    switch (state.byUser.get(userId)) {
      case (?invoiceNumbers) {
        invoiceNumbers.filterMap(
          func(invoiceNumber) {
            switch (state.payments.get(invoiceNumber)) {
              case (?payment) { ?toInvoice(payment, null) };
              case (null) { null };
            };
          },
        );
      };
      case (null) { [] };
    };
  };

  public func listAllInvoices(state : State) : [Payments.Invoice] {
    Iter.toArray(
      state.payments.values().map(
        func(payment) { toInvoice(payment, null) },
      ),
    );
  };
};

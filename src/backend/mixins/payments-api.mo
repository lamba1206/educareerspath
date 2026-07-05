import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Payments "../types/payments";
import PaymentsLib "../lib/payments";

mixin (
  accessControlState : AccessControl.AccessControlState,
  paymentsState : PaymentsLib.State,
) {
  public shared ({ caller }) func recordMyPayment(input : Payments.RecordPaymentInput) : async Payments.Payment {
    ignore accessControlState;
    PaymentsLib.recordPayment(paymentsState, caller, input, Time.now());
  };

  public shared ({ caller }) func markPaymentCompleted(invoiceNumber : Text) : async Payments.Payment {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    PaymentsLib.markCompleted(paymentsState, invoiceNumber, Time.now());
  };

  public query ({ caller }) func getMyInvoice(invoiceNumber : Text) : async ?Payments.Invoice {
    ignore accessControlState;
    PaymentsLib.getInvoice(paymentsState, invoiceNumber);
  };

  public query ({ caller }) func listMyInvoices() : async [Payments.Invoice] {
    ignore accessControlState;
    PaymentsLib.listInvoicesForUser(paymentsState, caller);
  };

  public query ({ caller }) func listAllInvoices() : async [Payments.Invoice] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    PaymentsLib.listAllInvoices(paymentsState);
  };
};

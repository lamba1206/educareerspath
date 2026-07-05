import Map "mo:core/Map";
import MixinViews "mo:caffeineai-data-viewer/MixinViews";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";

import Common "types/common";
import Users "types/users";
import Assessments "types/assessments";
import Reports "types/reports";
import Coupons "types/coupons";
import Payments "types/payments";
import Careers "types/careers";
import Content "types/content";
import Proof "types/proof";

import UsersLib "lib/users";
import AssessmentsLib "lib/assessments";
import ReportsLib "lib/reports";
import CouponsLib "lib/coupons";
import PaymentsLib "lib/payments";
import CareersLib "lib/careers";
import ContentLib "lib/content";
import ProofLib "lib/proof";

import UsersApi "mixins/users-api";
import AssessmentsApi "mixins/assessments-api";
import ReportsApi "mixins/reports-api";
import CouponsApi "mixins/coupons-api";
import PaymentsApi "mixins/payments-api";
import CareersApi "mixins/careers-api";
import ContentApi "mixins/content-api";
import ProofApi "mixins/proof-api";
import AdminApi "mixins/admin-api";

actor {
  include MixinViews();

  // --- Stable state (initial values come from the migration chain) ---

  let accessControlState : AccessControl.AccessControlState;
  let usersState : UsersLib.State;
  let assessmentsState : AssessmentsLib.State;
  let reportsState : ReportsLib.State;
  let couponsState : CouponsLib.State;
  let paymentsState : PaymentsLib.State;
  let careersState : CareersLib.State;
  let contentState : ContentLib.State;
  let proofState : ProofLib.State;

  // --- Mixins ---

  include MixinAuthorization(accessControlState, null);
  include UsersApi(accessControlState, usersState);
  include AssessmentsApi(accessControlState, assessmentsState);
  include ReportsApi(accessControlState, reportsState);
  include CouponsApi(accessControlState, couponsState);
  include PaymentsApi(accessControlState, paymentsState);
  include CareersApi(accessControlState, careersState);
  include ContentApi(accessControlState, contentState);
  include ProofApi(proofState);
  include AdminApi(accessControlState, usersState);
};

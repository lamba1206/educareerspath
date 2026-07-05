import Proof "../types/proof";
import ProofLib "../lib/proof";

mixin (proofState : ProofLib.State) {
  public query func listProofImages() : async [Proof.ProofImage] {
    ProofLib.listProofImages(proofState);
  };

  public query func listProofImagesByCategory(category : Text) : async [Proof.ProofImage] {
    ProofLib.listProofImagesByCategory(proofState, category);
  };
};

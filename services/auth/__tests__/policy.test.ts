import { liftedByUserRetry } from "../policy";
import { AuthStep, ServiceAuthState } from "../types";

const failed = (reason: string): ServiceAuthState => ({
  step: AuthStep.Failed,
  runtimeId: "r",
  updatedAt: 0,
  consecutiveFailures: 1,
  nextRetryAt: 123,
  credentialFingerprint: "abc",
  failure: { reason: reason as never, step: AuthStep.CredentialSent, message: "" },
});

describe("liftedByUserRetry (⟳ / tirer pour rafraîchir)", () => {
  it("lève une simple attente", () => {
    expect(liftedByUserRetry(failed("network")).nextRetryAt).toBeUndefined();
  });
  it("ne renvoie jamais un jeton refusé (seule une reconnexion le remplace)", () => {
    expect(liftedByUserRetry(failed("credential_rejected")).credentialFingerprint).toBe("abc");
    expect(liftedByUserRetry(failed("credential_lost")).credentialFingerprint).toBe("abc");
  });
  it("respecte un blocage de l'adresse IP", () => {
    expect(liftedByUserRetry(failed("suspended")).nextRetryAt).toBe(123);
  });
});

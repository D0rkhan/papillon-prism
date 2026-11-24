import { isNewer } from "../version";

describe("isNewer", () => {
  it("compare les versions segment par segment", () => {
    expect(isNewer("8.6.3", "8.6.2")).toBe(true);
    expect(isNewer("8.6.10", "8.6.9")).toBe(true);
    expect(isNewer("prism-v9.0.0", "8.6.2")).toBe(true);
    expect(isNewer("8.6.2", "8.6.2")).toBe(false);
    expect(isNewer("8.5.9", "8.6.0")).toBe(false);
  });
});

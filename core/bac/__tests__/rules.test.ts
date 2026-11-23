import { describe, expect, it } from "@jest/globals";

import { buildBacComponents, DEFAULT_PROFILE, epflCriteria, isEpflEligibleProfile } from "../rules";
import { classifySubject } from "../subjects";

describe("classifySubject", () => {
  it.each([
    ["MATHEMATIQUES", "maths"],
    ["MATHS EXPERTES", "maths_expertes"],
    ["PHYSIQUE-CHIMIE", "physique_chimie"],
    ["SCIENCES VIE & TERRE", "svt"],
    ["S.V.T.", "svt"],
    ["SVT", "svt"],
    ["ENSEIGN.SCIENTIFIQUE", "ens_scientifique"],
    ["ED.PHYSIQUE & SPORT.", "eps"],
    ["HISTOIRE-GEOGRAPHIE", "histoire_geo"],
    ["HIST.GEO.GEOPOL.& SC.POL.", "hggsp"],
    ["ENS. MORAL & CIVIQUE", "emc"],
    ["ANGLAIS LV1", "anglais"],
    ["ESPAGNOL LV2", "espagnol"],
    ["FRANCAIS", "francais"],
    ["Français", "francais"],
    ["PHILOSOPHIE", "philosophie"],
    ["LLCER ANGLAIS", "llcer"],
  ])("%s → %s", (name, expected) => {
    expect(classifySubject(name)).toBe(expected);
  });
});

describe("bac components", () => {
  const components = buildBacComponents(DEFAULT_PROFILE);
  const sum = (filter: (c: (typeof components)[number]) => boolean) =>
    components.filter(filter).reduce((s, c) => s + c.coefficient, 0);

  it("totals 100 coefficients: 40 contrôle continu, 60 épreuves", () => {
    expect(sum(() => true)).toBe(100);
    expect(sum(c => c.block === "cc")).toBe(40);
    expect(sum(c => c.block === "exam")).toBe(60);
  });

  it("puts 21 contrôle continu points in Première, 19 in Terminale", () => {
    expect(sum(c => c.block === "cc" && c.year === "premiere")).toBe(21);
    expect(sum(c => c.block === "cc" && c.year === "terminale")).toBe(19);
  });

  it("counts the dropped spécialité (SVT) for 8 in Première", () => {
    const svt = components.find(c => c.id === "cc:premiere:svt");
    expect(svt?.coefficient).toBe(8);
  });

  it("uses English as LVA and Spanish as LVB", () => {
    expect(components.some(c => c.id === "cc:premiere:anglais")).toBe(true);
    expect(components.some(c => c.id === "cc:terminale:espagnol")).toBe(true);
  });

  it("adds options on top of the 100 coefficients", () => {
    const withOption = buildBacComponents({ ...DEFAULT_PROFILE, options: [{ subject: "maths_expertes", years: ["terminale"] }] });
    expect(withOption.reduce((s, c) => s + c.coefficient, 0)).toBe(102);
  });
});

describe("EPFL criteria", () => {
  it("requires ≥ 16 overall and ≥ 16 in both kept spécialités", () => {
    const c = epflCriteria(DEFAULT_PROFILE);
    expect(c.minOverall).toBe(16);
    expect(c.subjectMinimums.map(s => s.componentId)).toEqual(["exam:spe:maths", "exam:spe:physique_chimie"]);
    expect(isEpflEligibleProfile(DEFAULT_PROFILE)).toBe(true);
  });

  it("flags a profile without physique-chimie as not eligible", () => {
    expect(isEpflEligibleProfile({ ...DEFAULT_PROFILE, keptSpecialties: ["maths", "svt"] })).toBe(false);
  });
});

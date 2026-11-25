/**
 * Mathématiques, spécialité de Première (programme 2019): one generator per
 * skill, three levels. Numbers are chosen so the maths stays clean (integer
 * roots, exact cosines…): the difficulty is in the method, not the arithmetic.
 */
import { num, Skill, fr, poly, withChoices } from "./types";

const sub = (n: number) => String(n).replace(/\d/g, d => "₀₁₂₃₄₅₆₇₈₉"[Number(d)]);
const par = (v: number) => (v < 0 ? `(${fr(v)})` : fr(v));

export const MATHS_SKILLS: Skill[] = [
  {
    id: "m.suite.arith",
    title: "Terme d'une suite arithmétique",
    generate: (r, d) => {
      if (d === 3) {
        const rr = r.nonZero(-6, 9);
        const p = r.int(1, 5);
        const q = p + r.int(2, 6);
        const up = r.int(-10, 20);
        const uq = up + (q - p) * rr;
        const n = q + r.int(4, 15);
        const ans = up + (n - p) * rr;
        return {
          prompt: `(uₙ) est arithmétique, avec u${sub(p)} = ${fr(up)} et u${sub(q)} = ${fr(uq)}. Calcule u${sub(n)}.`,
          kind: "numeric", answer: ans, display: fr(ans),
          hint: "Trouve d'abord la raison : entre deux termes, on ajoute r à chaque rang.",
          solution: [`r = (u${sub(q)} − u${sub(p)}) / (${q} − ${p}) = ${fr(uq - up)} / ${q - p} = ${fr(rr)}`, `u${sub(n)} = u${sub(p)} + (${n} − ${p})·r = ${fr(up)} + ${n - p} × ${par(rr)} = ${fr(ans)}`],
        };
      }
      const u0 = r.int(-10, 20);
      const rr = d === 1 ? r.int(1, 9) : r.nonZero(-9, 9) * (r.next() < 0.5 ? 1 : 0.5);
      const n = r.int(5, 30);
      const ans = u0 + n * rr;
      return {
        prompt: `(uₙ) est arithmétique de premier terme u₀ = ${fr(u0)} et de raison r = ${fr(rr)}. Calcule u${sub(n)}.`,
        kind: "numeric", answer: ans, display: fr(ans),
        hint: "uₙ = u₀ + n·r",
        solution: ["uₙ = u₀ + n·r", `u${sub(n)} = ${fr(u0)} + ${n} × ${par(rr)} = ${fr(ans)}`],
      };
    },
  },
  {
    id: "m.suite.somme",
    title: "Somme de termes consécutifs",
    generate: (r, d) => {
      if (d === 1) {
        const n = r.pick([10, 20, 50, 100]);
        const ans = (n * (n + 1)) / 2;
        return {
          prompt: `Calcule 1 + 2 + 3 + … + ${n}.`,
          kind: "numeric", answer: ans, display: fr(ans),
          hint: "1 + 2 + … + n = n(n + 1)/2",
          solution: ["1 + 2 + … + n = n(n + 1)/2", `= ${n} × ${n + 1} / 2 = ${fr(ans)}`],
        };
      }
      if (d === 2) {
        const u0 = r.int(1, 10);
        const rr = r.int(2, 7);
        const n = r.int(8, 20);
        const un = u0 + n * rr;
        const ans = ((n + 1) * (u0 + un)) / 2;
        return {
          prompt: `(uₙ) est arithmétique, u₀ = ${u0}, r = ${rr}. Calcule S = u₀ + u₁ + … + u${sub(n)}.`,
          kind: "numeric", answer: ans, display: fr(ans),
          hint: "S = (nombre de termes) × (premier + dernier) / 2",
          solution: [`u${sub(n)} = ${u0} + ${n} × ${rr} = ${un}`, `Il y a ${n + 1} termes.`, `S = ${n + 1} × (${u0} + ${un}) / 2 = ${fr(ans)}`],
        };
      }
      const q = r.pick([2, 3]);
      const n = r.int(4, 8);
      const ans = (q ** (n + 1) - 1) / (q - 1);
      return {
        prompt: `Calcule 1 + ${q} + ${q}² + … + ${q}${n === 1 ? "" : `^${n}`}.`,
        kind: "numeric", answer: ans, display: fr(ans),
        hint: "1 + q + … + qⁿ = (1 − qⁿ⁺¹)/(1 − q) pour q ≠ 1",
        solution: ["1 + q + … + qⁿ = (qⁿ⁺¹ − 1)/(q − 1)", `= (${q}^${n + 1} − 1)/(${q} − 1) = (${q ** (n + 1)} − 1)/${q - 1} = ${fr(ans)}`],
      };
    },
  },
  {
    id: "m.suite.geo",
    title: "Terme d'une suite géométrique",
    generate: (r, d) => {
      const u0 = d === 1 ? r.int(1, 5) : r.nonZero(-6, 8);
      const q = d === 1 ? r.pick([2, 3]) : d === 2 ? r.pick([2, 3, -2, 0.5]) : r.pick([-2, 0.5, 1.5, -3]);
      const n = d === 1 ? r.int(3, 6) : r.int(4, 8);
      const ans = u0 * q ** n;
      return {
        prompt: `(uₙ) est géométrique de premier terme u₀ = ${fr(u0)} et de raison q = ${fr(q)}. Calcule u${sub(n)}.`,
        kind: "numeric", answer: ans, display: Number.isInteger(ans) ? fr(ans) : num(ans, 4), tolerance: { abs: 1e-6, rel: 0.005 },
        hint: "uₙ = u₀ × qⁿ",
        solution: ["uₙ = u₀ × qⁿ", `u${sub(n)} = ${par(u0)} × ${par(q)}^${n} = ${par(u0)} × ${fr(q ** n, 4)} = ${fr(ans, 4)}`],
      };
    },
  },
  {
    id: "m.deg2.delta",
    title: "Discriminant",
    generate: (r, d) => {
      const a = d === 1 ? r.pick([1, 2]) : r.nonZero(-4, 5);
      const b = r.int(-9, 9);
      const c = r.int(-9, 9);
      const ans = b * b - 4 * a * c;
      return {
        prompt: `Calcule le discriminant de f(x) = ${poly([{ c: a, p: 2 }, { c: b, p: 1 }, { c, p: 0 }])}.`,
        kind: "numeric", answer: ans, display: fr(ans),
        hint: "Δ = b² − 4ac",
        solution: [`a = ${a}, b = ${b}, c = ${c}`, `Δ = b² − 4ac = ${par(b)}² − 4 × ${par(a)} × ${par(c)} = ${b * b} − ${par(4 * a * c)} = ${ans}`],
      };
    },
  },
  {
    id: "m.deg2.racines",
    title: "Racines d'un trinôme",
    generate: (r, d) => {
      const a = d === 1 ? 1 : r.pick([1, -1, 2, -2]);
      const x1 = r.int(-7, 6);
      let x2 = r.int(-6, 8);
      if (x2 === x1) { x2 = x1 + r.int(1, 4); }
      const b = -a * (x1 + x2);
      const c = a * x1 * x2;
      if (d === 3) {
        // Level 3 asks for the number of roots of a shifted trinomial, sometimes without roots.
        const shift = r.pick([0, Math.abs(c) + r.int(5, 20) * Math.sign(a || 1)]);
        const c2 = c + shift;
        const delta2 = b * b - 4 * a * c2;
        const count = delta2 > 0 ? 2 : delta2 === 0 ? 1 : 0;
        const opts = withChoices(r, String(count), ["0", "1", "2"].filter(x => x !== String(count)));
        return {
          prompt: `Combien de solutions réelles a l'équation ${poly([{ c: a, p: 2 }, { c: b, p: 1 }, { c: c2, p: 0 }])} = 0 ?`,
          kind: "choice", ...opts, display: String(count),
          hint: "Le signe de Δ décide : > 0 deux solutions, = 0 une, < 0 aucune.",
          solution: [`Δ = ${par(b)}² − 4 × ${par(a)} × ${par(c2)} = ${delta2}`, delta2 > 0 ? "Δ > 0 : deux solutions." : delta2 === 0 ? "Δ = 0 : une solution double." : "Δ < 0 : aucune solution réelle."],
        };
      }
      const big = Math.max(x1, x2);
      const delta = b * b - 4 * a * c;
      return {
        prompt: `Résous ${poly([{ c: a, p: 2 }, { c: b, p: 1 }, { c, p: 0 }])} = 0 et donne la plus grande solution.`,
        kind: "numeric", answer: big, display: fr(big),
        hint: "Calcule Δ, puis x = (−b ± √Δ)/(2a).",
        solution: [`Δ = ${par(b)}² − 4 × ${par(a)} × ${par(c)} = ${delta}, √Δ = ${Math.sqrt(delta)}`, `x₁ = (${fr(-b)} − ${Math.sqrt(delta)}) / ${2 * a} = ${fr((-b - Math.sqrt(delta)) / (2 * a))}`, `x₂ = (${fr(-b)} + ${Math.sqrt(delta)}) / ${2 * a} = ${fr((-b + Math.sqrt(delta)) / (2 * a))}`, `La plus grande : ${fr(big)}`],
      };
    },
  },
  {
    id: "m.deg2.sommet",
    title: "Sommet de la parabole",
    generate: (r, d) => {
      const a = d === 1 ? r.pick([1, -1]) : r.pick([1, -1, 2, -2, 3]);
      const alpha = r.int(-5, 5);
      const b = -2 * a * alpha;
      const c = r.int(-9, 9);
      const beta = a * alpha * alpha + b * alpha + c;
      const askBeta = d === 3 || (d === 2 && r.next() < 0.5);
      return {
        prompt: `f(x) = ${poly([{ c: a, p: 2 }, { c: b, p: 1 }, { c, p: 0 }])}. ${askBeta ? "Donne l'extremum β de f (ordonnée du sommet)." : "Donne l'abscisse α du sommet de la parabole."}`,
        kind: "numeric", answer: askBeta ? beta : alpha, display: fr(askBeta ? beta : alpha),
        hint: "α = −b/(2a), β = f(α)",
        solution: [`α = −b/(2a) = ${fr(-b)}/${2 * a} = ${alpha}`, ...(askBeta ? [`β = f(${alpha}) = ${a}×${par(alpha)}² ${b >= 0 ? "+" : "−"} ${Math.abs(b)}×${par(alpha)} ${c >= 0 ? "+" : "−"} ${Math.abs(c)} = ${beta}`] : [])],
      };
    },
  },
  {
    id: "m.derive.point",
    title: "Nombre dérivé d'un polynôme",
    generate: (r, d) => {
      const a3 = d === 1 ? 0 : r.int(-3, 3);
      const a2 = r.int(-5, 5);
      const a1 = r.int(-9, 9);
      const a0 = r.int(-9, 9);
      const k = r.int(-3, 3);
      const ans = 3 * a3 * k * k + 2 * a2 * k + a1;
      return {
        prompt: `f(x) = ${poly([{ c: a3, p: 3 }, { c: a2, p: 2 }, { c: a1, p: 1 }, { c: a0, p: 0 }])}. Calcule f'(${k}).`,
        kind: "numeric", answer: ans, display: fr(ans),
        hint: "(xⁿ)' = n·xⁿ⁻¹, les constantes disparaissent.",
        solution: [`f'(x) = ${poly([{ c: 3 * a3, p: 2 }, { c: 2 * a2, p: 1 }, { c: a1, p: 0 }])}`, `f'(${k}) = ${ans}`],
      };
    },
  },
  {
    id: "m.derive.produit",
    title: "Dérivée d'un produit ou d'un quotient",
    generate: (r, d) => {
      const a = r.nonZero(-4, 4);
      const b = r.int(-5, 5);
      if (d === 3) {
        // f(x) = (ax + b)/(cx + e): f'(x) = (ae − bc)/(cx + e)²
        const c = r.nonZero(-3, 3);
        let e = r.int(-5, 5);
        let k = r.int(-3, 3);
        if (c * k + e === 0) { e += 1; }
        if (c * k + e === 0) { k += 1; }
        const den = c * k + e;
        const ans = (a * e - b * c) / (den * den);
        return {
          prompt: `f(x) = (${poly([{ c: a, p: 1 }, { c: b, p: 0 }])}) / (${poly([{ c, p: 1 }, { c: e, p: 0 }])}). Calcule f'(${k}) (valeur exacte ou arrondie à 0,01).`,
          kind: "numeric", answer: ans, display: fr(ans, 3), tolerance: { abs: 0.006 },
          hint: "(u/v)' = (u'v − uv')/v²",
          solution: [`u = ${poly([{ c: a, p: 1 }, { c: b, p: 0 }])}, u' = ${a} ; v = ${poly([{ c, p: 1 }, { c: e, p: 0 }])}, v' = ${c}`, `f'(x) = (${a}·v − ${par(c)}·u)/v² = ${fr(a * e - b * c)} / (${poly([{ c, p: 1 }, { c: e, p: 0 }])})²`, `f'(${k}) = ${fr(a * e - b * c)} / ${den * den} = ${fr(ans, 3)}`],
        };
      }
      // f(x) = (ax + b)(cx² + e): f' = a(cx² + e) + (ax + b)(2cx)
      const c = d === 1 ? 1 : r.nonZero(-3, 3);
      const e = r.int(-5, 5);
      const k = r.int(-2, 3);
      const ans = a * (c * k * k + e) + (a * k + b) * (2 * c * k);
      return {
        prompt: `f(x) = (${poly([{ c: a, p: 1 }, { c: b, p: 0 }])})(${poly([{ c, p: 2 }, { c: e, p: 0 }])}). Calcule f'(${k}).`,
        kind: "numeric", answer: ans, display: fr(ans),
        hint: "(uv)' = u'v + uv'",
        solution: [`u = ${poly([{ c: a, p: 1 }, { c: b, p: 0 }])}, u' = ${a} ; v = ${poly([{ c, p: 2 }, { c: e, p: 0 }])}, v' = ${poly([{ c: 2 * c, p: 1 }])}`, `f'(${k}) = u'(${k})·v(${k}) + u(${k})·v'(${k}) = ${a} × ${par(c * k * k + e)} + ${par(a * k + b)} × ${par(2 * c * k)} = ${ans}`],
      };
    },
  },
  {
    id: "m.derive.tangente",
    title: "Équation de la tangente",
    generate: (r, d) => {
      const a = d === 1 ? 1 : r.nonZero(-3, 3);
      const b = r.int(-6, 6);
      const c = r.int(-6, 6);
      const k = r.int(-3, 3);
      const fk = a * k * k + b * k + c;
      const slope = 2 * a * k + b;
      const intercept = fk - slope * k;
      const askSlope = d === 1;
      return {
        prompt: `f(x) = ${poly([{ c: a, p: 2 }, { c: b, p: 1 }, { c, p: 0 }])}. La tangente en ${k} a pour équation y = mx + p. Donne ${askSlope ? "m" : "p"}.`,
        kind: "numeric", answer: askSlope ? slope : intercept, display: fr(askSlope ? slope : intercept),
        hint: "y = f'(a)(x − a) + f(a)",
        solution: [`f(${k}) = ${fk}, f'(x) = ${poly([{ c: 2 * a, p: 1 }, { c: b, p: 0 }])}, f'(${k}) = ${slope}`, `y = ${slope}(x − ${par(k)}) + ${par(fk)} = ${poly([{ c: slope, p: 1 }, { c: intercept, p: 0 }])}`, askSlope ? `m = ${slope}` : `p = ${intercept}`],
      };
    },
  },
  {
    id: "m.exp.calcul",
    title: "Calculs avec l'exponentielle",
    generate: (r, d) => {
      if (d === 3) {
        const a = r.pick([2, 3, -2, 4]);
        const b = r.int(-6, 6);
        const target = r.int(-6, 8);
        const ans = (target - b) / a;
        return {
          prompt: `Résous e^(${poly([{ c: a, p: 1 }, { c: b, p: 0 }])}) = e^(${target}).`,
          kind: "numeric", answer: ans, display: fr(ans, 3), tolerance: { abs: 0.006 },
          hint: "La fonction exp est strictement croissante : eᵃ = eᵇ ⇔ a = b.",
          solution: [`e^A = e^B ⇔ A = B`, `${poly([{ c: a, p: 1 }, { c: b, p: 0 }])} = ${target} ⇔ x = (${target} − ${par(b)})/${par(a)} = ${fr(ans, 3)}`],
        };
      }
      const m = r.int(-5, 7);
      const n = r.int(-5, 7);
      const p = r.int(-4, 6);
      if (d === 2) {
        const k = r.pick([2, 3]);
        const ans = k * m + n;
        return {
          prompt: `(e^${m})^${k} × e^${n} = e^? Donne l'exposant.`,
          kind: "numeric", answer: ans, display: fr(ans),
          hint: "(eᵃ)ⁿ = e^(na) et eᵃ × eᵇ = e^(a+b)",
          solution: [`(e^${m})^${k} = e^${k * m}`, `e^${k * m} × e^${n} = e^${ans}`],
        };
      }
      const ans = m + n - p;
      return {
        prompt: `e^${m} × e^${n} / e^${p} = e^? Donne l'exposant.`,
        kind: "numeric", answer: ans, display: fr(ans),
        hint: "eᵃ × eᵇ = e^(a+b) et eᵃ / eᵇ = e^(a−b)",
        solution: [`= e^(${m} + ${par(n)} − ${par(p)}) = e^${ans}`],
      };
    },
  },
  {
    id: "m.trigo.valeurs",
    title: "Cosinus et sinus remarquables",
    generate: (r, d) => {
      // [label, cos, sin]
      const Q1: [string, string, string][] = [["0", "1", "0"], ["π/6", "√3/2", "1/2"], ["π/4", "√2/2", "√2/2"], ["π/3", "1/2", "√3/2"], ["π/2", "0", "1"]];
      const Q2: [string, string, string][] = [["2π/3", "−1/2", "√3/2"], ["3π/4", "−√2/2", "√2/2"], ["5π/6", "−√3/2", "1/2"], ["π", "−1", "0"]];
      const NEG: [string, string, string][] = [["−π/6", "√3/2", "−1/2"], ["−π/4", "√2/2", "−√2/2"], ["−π/3", "1/2", "−√3/2"], ["−π/2", "0", "−1"], ["7π/6", "−√3/2", "−1/2"]];
      const [label, cos, sin] = r.pick(d === 1 ? Q1 : d === 2 ? Q2 : NEG);
      const askSin = d === 1 ? r.next() < 0.3 : r.next() < 0.5;
      const right = askSin ? sin : cos;
      const pool = ["0", "1", "−1", "1/2", "−1/2", "√2/2", "−√2/2", "√3/2", "−√3/2"];
      const wrong = [askSin ? cos : sin, ...pool.filter(x => x !== right).sort(() => r.next() - 0.5)];
      const opts = withChoices(r, right, wrong);
      return {
        prompt: `Que vaut ${askSin ? "sin" : "cos"}(${label}) ?`,
        kind: "choice", ...opts, display: right,
        hint: "Place l'angle sur le cercle trigonométrique : cos = abscisse, sin = ordonnée.",
        solution: [`Sur le cercle trigonométrique, le point associé à ${label} a pour coordonnées (${cos} ; ${sin}).`, `${askSin ? "sin" : "cos"}(${label}) = ${right}`],
      };
    },
  },
  {
    id: "m.scalaire",
    title: "Produit scalaire",
    generate: (r, d) => {
      if (d === 1) {
        const [x1, y1, x2, y2] = [r.int(-6, 6), r.int(-6, 6), r.int(-6, 6), r.int(-6, 6)];
        const ans = x1 * x2 + y1 * y2;
        return {
          prompt: `u⃗(${x1} ; ${y1}) et v⃗(${x2} ; ${y2}). Calcule u⃗ · v⃗.`,
          kind: "numeric", answer: ans, display: fr(ans),
          hint: "u⃗ · v⃗ = xx' + yy'",
          solution: [`u⃗ · v⃗ = ${par(x1)}×${par(x2)} + ${par(y1)}×${par(y2)} = ${ans}`],
        };
      }
      if (d === 2) {
        const a = r.int(2, 8);
        const b = r.int(2, 8);
        const [deg, cos, cosLabel] = r.pick([[60, 0.5, "1/2"], [120, -0.5, "−1/2"], [90, 0, "0"], [180, -1, "−1"], [0, 1, "1"]] as [number, number, string][]);
        const ans = a * b * cos;
        return {
          prompt: `‖u⃗‖ = ${a}, ‖v⃗‖ = ${b} et l'angle (u⃗, v⃗) mesure ${deg}°. Calcule u⃗ · v⃗.`,
          kind: "numeric", answer: ans, display: fr(ans),
          hint: "u⃗ · v⃗ = ‖u⃗‖ × ‖v⃗‖ × cos(u⃗, v⃗)",
          solution: [`u⃗ · v⃗ = ${a} × ${b} × cos(${deg}°) = ${a * b} × ${cosLabel} = ${fr(ans)}`],
        };
      }
      const a = r.int(2, 7);
      const b = r.int(2, 7);
      const dot = r.int(-10, 12);
      const sum2 = a * a + 2 * dot + b * b;
      return {
        prompt: `‖u⃗‖ = ${a}, ‖v⃗‖ = ${b} et ‖u⃗ + v⃗‖² = ${sum2}. Calcule u⃗ · v⃗.`,
        kind: "numeric", answer: dot, display: fr(dot),
        hint: "‖u⃗ + v⃗‖² = ‖u⃗‖² + 2 u⃗·v⃗ + ‖v⃗‖²",
        solution: [`u⃗ · v⃗ = (‖u⃗ + v⃗‖² − ‖u⃗‖² − ‖v⃗‖²)/2 = (${sum2} − ${a * a} − ${b * b})/2 = ${dot}`],
      };
    },
  },
  {
    id: "m.geo.droite",
    title: "Équation cartésienne d'une droite",
    generate: (r, d) => {
      const a = r.nonZero(-5, 5);
      const b = r.nonZero(-5, 5);
      const xa = r.int(-6, 6);
      const ya = r.int(-6, 6);
      if (d === 3) {
        // Line through A directed by u(−b ; a): same equation ax + by + c = 0.
        const c = -(a * xa + b * ya);
        return {
          prompt: `La droite d passe par A(${xa} ; ${ya}) et a pour vecteur directeur u⃗(${-b} ; ${a}). Son équation s'écrit ${a}x ${b >= 0 ? "+" : "−"} ${Math.abs(b)}y + c = 0. Donne c.`,
          kind: "numeric", answer: c, display: fr(c),
          hint: "u⃗(−b ; a) dirige la droite ax + by + c = 0. Remplace x et y par les coordonnées de A.",
          solution: [`A ∈ d : ${a}×${par(xa)} + ${par(b)}×${par(ya)} + c = 0`, `c = ${c}`],
        };
      }
      const c = -(a * xa + b * ya);
      return {
        prompt: `La droite d passe par A(${xa} ; ${ya}) et admet n⃗(${a} ; ${b}) pour vecteur normal. Son équation s'écrit ${a}x ${b >= 0 ? "+" : "−"} ${Math.abs(b)}y + c = 0. Donne c.`,
        kind: "numeric", answer: c, display: fr(c),
        hint: "Un vecteur normal n⃗(a ; b) donne ax + by + c = 0 ; A est sur la droite.",
        solution: [`A ∈ d : ${a}×${par(xa)} + ${par(b)}×${par(ya)} + c = 0`, `c = ${c}`],
      };
    },
  },
  {
    id: "m.geo.cercle",
    title: "Cercle : centre et rayon",
    generate: (r, d) => {
      const alpha = r.int(-5, 5);
      const beta = r.int(-5, 5);
      const radius = r.int(1, 7);
      const g = alpha * alpha + beta * beta - radius * radius;
      const eq = `x² + y²${alpha ? ` ${alpha > 0 ? "−" : "+"} ${Math.abs(2 * alpha)}x` : ""}${beta ? ` ${beta > 0 ? "−" : "+"} ${Math.abs(2 * beta)}y` : ""}${g ? ` ${g > 0 ? "+" : "−"} ${Math.abs(g)}` : ""} = 0`;
      const askCenter = d === 1;
      return {
        prompt: `Le cercle C a pour équation ${eq}. ${askCenter ? "Donne l'abscisse de son centre." : "Donne son rayon."}`,
        kind: "numeric", answer: askCenter ? alpha : radius, display: fr(askCenter ? alpha : radius),
        hint: "Forme (x − α)² + (y − β)² = r² : complète les carrés.",
        solution: [`x² − 2αx : α = ${alpha} ; y² − 2βy : β = ${beta}`, `(x − ${par(alpha)})² + (y − ${par(beta)})² = ${alpha * alpha} + ${beta * beta} − ${par(g)} = ${radius * radius}`, askCenter ? `Centre Ω(${alpha} ; ${beta})` : `r = √${radius * radius} = ${radius}`],
      };
    },
  },
  {
    id: "m.proba.cond",
    title: "Probabilités conditionnelles",
    generate: (r, d) => {
      const pA = r.pick([0.2, 0.3, 0.4, 0.6, 0.7]);
      const pBA = r.pick([0.1, 0.2, 0.5, 0.8, 0.9]);
      const pBnA = r.pick([0.1, 0.3, 0.4, 0.6]);
      const pB = pA * pBA + (1 - pA) * pBnA;
      if (d === 1) {
        const ans = pA * pBA;
        return {
          prompt: `P(A) = ${fr(pA)} et P_A(B) = ${fr(pBA)}. Calcule P(A ∩ B).`,
          kind: "numeric", answer: ans, display: fr(ans, 4), tolerance: { abs: 0.0005 },
          hint: "P(A ∩ B) = P(A) × P_A(B)",
          solution: [`P(A ∩ B) = ${fr(pA)} × ${fr(pBA)} = ${fr(ans, 4)}`],
        };
      }
      if (d === 2) {
        return {
          prompt: `P(A) = ${fr(pA)}, P_A(B) = ${fr(pBA)} et P_Ā(B) = ${fr(pBnA)}. Calcule P(B).`,
          kind: "numeric", answer: pB, display: fr(pB, 4), tolerance: { abs: 0.0005 },
          hint: "Formule des probabilités totales : P(B) = P(A ∩ B) + P(Ā ∩ B).",
          solution: [`P(A ∩ B) = ${fr(pA)} × ${fr(pBA)} = ${fr(pA * pBA, 4)}`, `P(Ā ∩ B) = ${fr(1 - pA)} × ${fr(pBnA)} = ${fr((1 - pA) * pBnA, 4)}`, `P(B) = ${fr(pB, 4)}`],
        };
      }
      const ans = (pA * pBA) / pB;
      return {
        prompt: `P(A) = ${fr(pA)}, P_A(B) = ${fr(pBA)}, P_Ā(B) = ${fr(pBnA)}. Calcule P_B(A), arrondi à 0,01.`,
        kind: "numeric", answer: ans, display: fr(ans, 2), tolerance: { abs: 0.0051 },
        hint: "P_B(A) = P(A ∩ B) / P(B), avec P(B) par les probabilités totales.",
        solution: [`P(A ∩ B) = ${fr(pA * pBA, 4)}`, `P(B) = ${fr(pA * pBA, 4)} + ${fr((1 - pA) * pBnA, 4)} = ${fr(pB, 4)}`, `P_B(A) = ${fr(pA * pBA, 4)} / ${fr(pB, 4)} ≈ ${fr(ans, 2)}`],
      };
    },
  },
  {
    id: "m.va.esperance",
    title: "Espérance d'une variable aléatoire",
    generate: (r, d) => {
      const n = d === 1 ? 3 : 4;
      const values = Array.from({ length: n }, () => r.int(-5, 10));
      const tenths = Array.from({ length: n }, () => 1);
      for (let i = 0; i < 10 - n; i++) { tenths[r.int(0, n - 1)]++; }
      const probs = tenths.map(t => t / 10);
      const ans = values.reduce((s, v, i) => s + v * probs[i], 0);
      const hide = d === 3;
      const shown = probs.map((p, i) => (hide && i === n - 1 ? "?" : fr(p)));
      return {
        prompt: `Loi de X — valeurs : ${values.map(fr).join(" ; ")} — probabilités : ${shown.join(" ; ")}. Calcule E(X).`,
        kind: "numeric", answer: ans, display: fr(ans, 3), tolerance: { abs: 0.001 },
        hint: hide ? "Les probabilités font 1 au total ; puis E(X) = Σ xᵢ·P(X = xᵢ)." : "E(X) = Σ xᵢ·P(X = xᵢ)",
        solution: [...(hide ? [`Probabilité manquante : 1 − (${probs.slice(0, -1).map(p => fr(p)).join(" + ")}) = ${fr(probs[n - 1])}`] : []), `E(X) = ${values.map((v, i) => `${par(v)}×${fr(probs[i])}`).join(" + ")} = ${fr(ans, 3)}`],
      };
    },
  },
];

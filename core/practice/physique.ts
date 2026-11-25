/**
 * Physique-chimie, spécialité de Première (programme 2019). Answers are
 * accepted within 2 % (rounded data, rounded constants), as in a real copy.
 */
import { num, Skill, fr, sci, withChoices } from "./types";

const G = 9.81;
const H = 6.63e-34;
const C = 3.0e8;
const EV = 1.6e-19;
const NA = 6.02e23;
const TOL = { rel: 0.02 };

const round = (v: number, step: number) => Math.round(v / step) * step;

export const PHYSIQUE_SKILLS: Skill[] = [
  {
    id: "p.matiere.n",
    title: "Quantité de matière",
    generate: (r, d) => {
      const species = r.pick([
        { name: "eau H₂O", M: 18.0 },
        { name: "glucose C₆H₁₂O₆", M: 180 },
        { name: "chlorure de sodium NaCl", M: 58.5 },
        { name: "éthanol C₂H₆O", M: 46.0 },
        { name: "dioxyde de carbone CO₂", M: 44.0 },
      ]);
      if (d === 3) {
        const m = round(r.int(10, 200) / 10, 0.1);
        const n = m / species.M;
        const N = n * NA;
        return {
          prompt: `Combien de molécules contient un échantillon de ${fr(m)} g de ${species.name} (M = ${fr(species.M)} g/mol, N_A = 6,02 × 10²³ mol⁻¹) ?`,
          kind: "numeric", answer: N, display: num(N), tolerance: TOL,
          hint: "n = m/M, puis N = n × N_A. Écris par exemple 3,2e22 ou 3,2×10^22.",
          solution: [`n = m/M = ${fr(m)}/${fr(species.M)} = ${sci(n)} mol`, `N = n × N_A = ${sci(n)} × 6,02 × 10²³ = ${sci(N)}`],
        };
      }
      if (d === 2 && species.name.startsWith("éthanol")) {
        const V = r.int(10, 100);
        const rho = 0.789;
        const n = (rho * V) / species.M;
        return {
          prompt: `Quelle quantité de matière d'éthanol (M = 46,0 g/mol, masse volumique 0,789 g/mL) y a-t-il dans ${V} mL ?`,
          kind: "numeric", answer: n, display: num(n), unit: "mol", tolerance: TOL,
          hint: "m = ρ × V, puis n = m/M.",
          solution: [`m = ρ × V = 0,789 × ${V} = ${fr(rho * V, 2)} g`, `n = m/M = ${fr(rho * V, 2)}/46,0 = ${num(n)} mol`],
        };
      }
      const m = d === 1 ? r.int(5, 100) : round(r.int(5, 500) / 10, 0.1);
      const n = m / species.M;
      return {
        prompt: `Quelle quantité de matière y a-t-il dans ${fr(m)} g de ${species.name} (M = ${fr(species.M)} g/mol) ?`,
        kind: "numeric", answer: n, display: num(n), unit: "mol", tolerance: TOL,
        hint: "n = m / M",
        solution: [`n = m/M = ${fr(m)} / ${fr(species.M)} = ${num(n)} mol`],
      };
    },
  },
  {
    id: "p.solution.conc",
    title: "Concentration et dilution",
    generate: (r, d) => {
      if (d === 3) {
        const C1 = r.pick([0.1, 0.2, 0.5, 1.0]);
        const factor = r.pick([5, 10, 20, 25, 50]);
        const V2 = r.pick([50, 100, 200, 250, 500]);
        const C2 = C1 / factor;
        const V1 = V2 / factor;
        return {
          prompt: `On veut ${V2} mL de solution à ${fr(C2, 4)} mol/L à partir d'une solution mère à ${fr(C1)} mol/L. Quel volume de solution mère prélever ?`,
          kind: "numeric", answer: V1, display: num(V1), unit: "mL", tolerance: TOL,
          hint: "La quantité de soluté se conserve : C₁V₁ = C₂V₂.",
          solution: [`C₁V₁ = C₂V₂ ⇒ V₁ = C₂V₂/C₁`, `V₁ = ${fr(C2, 4)} × ${V2} / ${fr(C1)} = ${num(V1)} mL`],
        };
      }
      if (d === 2) {
        const m = r.int(1, 30);
        const V = r.pick([100, 200, 250, 500]);
        const cm = m / (V / 1000);
        return {
          prompt: `On dissout ${m} g de sucre dans de l'eau pour obtenir ${V} mL de solution. Concentration en masse ?`,
          kind: "numeric", answer: cm, display: num(cm), unit: "g/L", tolerance: TOL,
          hint: "Cm = m / V, avec V en litres.",
          solution: [`V = ${V} mL = ${fr(V / 1000)} L`, `Cm = ${m} / ${fr(V / 1000)} = ${num(cm)} g/L`],
        };
      }
      const n = round(r.int(1, 50) / 100, 0.01);
      const V = r.pick([100, 200, 250, 500, 1000]);
      const c = n / (V / 1000);
      return {
        prompt: `${num(n)} mol de soluté dans ${V} mL de solution. Concentration en quantité de matière ?`,
        kind: "numeric", answer: c, display: num(c), unit: "mol/L", tolerance: TOL,
        hint: "C = n / V, avec V en litres.",
        solution: [`V = ${fr(V / 1000)} L`, `C = ${num(n)} / ${fr(V / 1000)} = ${num(c)} mol/L`],
      };
    },
  },
  {
    id: "p.avancement",
    title: "Avancement et réactif limitant",
    generate: (r, d) => {
      const eq = r.pick([
        { text: "CH₄ + 2 O₂ → CO₂ + 2 H₂O", A: "CH₄", B: "O₂", a: 1, b: 2 },
        { text: "2 H₂ + O₂ → 2 H₂O", A: "H₂", B: "O₂", a: 2, b: 1 },
        { text: "N₂ + 3 H₂ → 2 NH₃", A: "N₂", B: "H₂", a: 1, b: 3 },
        { text: "4 Fe + 3 O₂ → 2 Fe₂O₃", A: "Fe", B: "O₂", a: 4, b: 3 },
      ]);
      const nA = round(r.int(2, 30) / 10, 0.1);
      const nB = round(r.int(2, 30) / 10, 0.1);
      const xA = nA / eq.a;
      const xB = nB / eq.b;
      const xmax = Math.min(xA, xB);
      const limiting = xA < xB ? eq.A : xB < xA ? eq.B : "aucun (proportions stœchiométriques)";
      if (d === 1) {
        const opts = withChoices(r, limiting, [eq.A, eq.B, "aucun (proportions stœchiométriques)"].filter(x => x !== limiting));
        return {
          prompt: `${eq.text}. On part de ${fr(nA)} mol de ${eq.A} et ${fr(nB)} mol de ${eq.B}. Quel est le réactif limitant ?`,
          kind: "choice", ...opts, display: limiting,
          hint: "Compare n(A)/a et n(B)/b : le plus petit rapport désigne le limitant.",
          solution: [`${eq.A} : ${fr(nA)}/${eq.a} = ${num(xA)} mol ; ${eq.B} : ${fr(nB)}/${eq.b} = ${num(xB)} mol`, `Limitant : ${limiting}`],
        };
      }
      return {
        prompt: `${eq.text}. On part de ${fr(nA)} mol de ${eq.A} et ${fr(nB)} mol de ${eq.B}. Calcule l'avancement maximal x_max.`,
        kind: "numeric", answer: xmax, display: num(xmax), unit: "mol", tolerance: TOL,
        hint: `Chaque réactif s'épuise quand n − (coef)·x = 0. x_max est la plus petite de ces valeurs.`,
        solution: [`${fr(nA)} − ${eq.a}x = 0 ⇒ x = ${num(xA)} mol`, `${fr(nB)} − ${eq.b}x = 0 ⇒ x = ${num(xB)} mol`, `x_max = ${num(xmax)} mol (limitant : ${limiting})`],
      };
    },
  },
  {
    id: "p.energie.cinetique",
    title: "Énergie cinétique",
    generate: (r, d) => {
      const m = d === 1 ? r.int(1, 80) : r.pick([60, 70, 900, 1200, 1500]);
      if (d === 3) {
        const v = r.int(5, 30);
        const Ec = 0.5 * m * v * v;
        return {
          prompt: `Un objet de ${m} kg a une énergie cinétique de ${num(Ec)} J. Quelle est sa vitesse ?`,
          kind: "numeric", answer: v, display: num(v), unit: "m/s", tolerance: TOL,
          hint: "Ec = ½mv² ⇒ v = √(2Ec/m)",
          solution: [`v = √(2Ec/m) = √(2 × ${num(Ec)} / ${m}) = ${v} m/s`],
        };
      }
      const kmh = d === 2;
      const v = kmh ? r.pick([36, 54, 72, 90, 108]) : r.int(2, 30);
      const vms = kmh ? v / 3.6 : v;
      const Ec = 0.5 * m * vms * vms;
      return {
        prompt: `Calcule l'énergie cinétique d'un objet de ${m} kg roulant à ${v} ${kmh ? "km/h" : "m/s"}.`,
        kind: "numeric", answer: Ec, display: num(Ec), unit: "J", tolerance: TOL,
        hint: kmh ? "Convertis d'abord en m/s (÷ 3,6), puis Ec = ½mv²." : "Ec = ½ m v²",
        solution: [...(kmh ? [`v = ${v}/3,6 = ${fr(vms, 2)} m/s`] : []), `Ec = ½ × ${m} × ${fr(vms, 2)}² = ${num(Ec)} J`],
      };
    },
  },
  {
    id: "p.energie.mecanique",
    title: "Énergie potentielle et mécanique",
    generate: (r, d) => {
      const m = r.pick([0.5, 1, 2, 5, 60]);
      const h = r.int(2, 40);
      if (d === 1) {
        const Ep = m * G * h;
        return {
          prompt: `Énergie potentielle de pesanteur d'un objet de ${fr(m)} kg à ${h} m du sol (origine au sol, g = 9,81 N/kg) ?`,
          kind: "numeric", answer: Ep, display: num(Ep), unit: "J", tolerance: TOL,
          hint: "Epp = m g z",
          solution: [`Epp = ${fr(m)} × 9,81 × ${h} = ${num(Ep)} J`],
        };
      }
      const v0 = d === 3 ? r.int(2, 10) : 0;
      const v = Math.sqrt(v0 * v0 + 2 * G * h);
      return {
        prompt: `Un objet ${v0 ? `lancé vers le bas à ${v0} m/s` : "lâché sans vitesse"} tombe de ${h} m. Sans frottements, quelle est sa vitesse au sol (g = 9,81 N/kg) ?`,
        kind: "numeric", answer: v, display: num(v), unit: "m/s", tolerance: TOL,
        hint: "Sans frottements, Em = Ec + Epp se conserve.",
        solution: [`Em(haut) = Em(sol) : ½mv₀² + mgh = ½mv²`, `v = √(v₀² + 2gh) = √(${v0 * v0} + 2 × 9,81 × ${h}) = ${num(v)} m/s`],
      };
    },
  },
  {
    id: "p.electricite",
    title: "Puissance et énergie électriques",
    generate: (r, d) => {
      if (d === 3) {
        const R = r.pick([10, 22, 47, 100]);
        const I = round(r.int(1, 20) / 10, 0.1);
        const P = R * I * I;
        return {
          prompt: `Un conducteur ohmique de ${R} Ω est parcouru par ${fr(I)} A. Puissance dissipée par effet Joule ?`,
          kind: "numeric", answer: P, display: num(P), unit: "W", tolerance: TOL,
          hint: "P = R × I²",
          solution: [`P = R I² = ${R} × ${fr(I)}² = ${num(P)} W`],
        };
      }
      if (d === 2) {
        const P = r.pick([60, 100, 1000, 1500, 2000]);
        const hours = r.pick([0.5, 1, 2, 3, 8]);
        const E = (P / 1000) * hours;
        return {
          prompt: `Un appareil de ${P} W fonctionne ${fr(hours)} h. Énergie consommée en kWh ?`,
          kind: "numeric", answer: E, display: num(E), unit: "kWh", tolerance: TOL,
          hint: "E = P × Δt, avec P en kW et Δt en h.",
          solution: [`E = ${fr(P / 1000)} kW × ${fr(hours)} h = ${num(E)} kWh`],
        };
      }
      const U = r.pick([3, 4.5, 6, 12, 230]);
      const I = round(r.int(1, 50) / 10, 0.1);
      const P = U * I;
      return {
        prompt: `Tension ${fr(U)} V, intensité ${fr(I)} A. Puissance électrique reçue ?`,
        kind: "numeric", answer: P, display: num(P), unit: "W", tolerance: TOL,
        hint: "P = U × I",
        solution: [`P = ${fr(U)} × ${fr(I)} = ${num(P)} W`],
      };
    },
  },
  {
    id: "p.ondes",
    title: "Ondes périodiques",
    generate: (r, d) => {
      if (d === 1) {
        const lambda = round(r.int(1, 40) / 10, 0.1);
        const T = round(r.int(1, 20) / 10, 0.1);
        const v = lambda / T;
        return {
          prompt: `Une onde a une longueur d'onde de ${num(lambda)} m et une période de ${fr(T)} s. Célérité ?`,
          kind: "numeric", answer: v, display: num(v), unit: "m/s", tolerance: TOL,
          hint: "v = λ / T",
          solution: [`v = ${num(lambda)} / ${fr(T)} = ${num(v)} m/s`],
        };
      }
      if (d === 2) {
        const f = r.pick([110, 220, 440, 880, 1000]);
        const lambda = 340 / f;
        return {
          prompt: `Un son de fréquence ${f} Hz se propage dans l'air à 340 m/s. Longueur d'onde ?`,
          kind: "numeric", answer: lambda, display: num(lambda), unit: "m", tolerance: TOL,
          hint: "λ = v / f",
          solution: [`λ = 340 / ${f} = ${num(lambda)} m`],
        };
      }
      const n = r.int(3, 8);
      const dist = round(r.int(20, 120) / 10, 0.1);
      const f = r.int(2, 10);
      const lambda = dist / (n - 1);
      const v = lambda * f;
      return {
        prompt: `Sur une cuve à ondes, ${n} crêtes consécutives s'étalent sur ${fr(dist)} cm ; f = ${f} Hz. Célérité en cm/s ?`,
        kind: "numeric", answer: v, display: num(v), unit: "cm/s", tolerance: TOL,
        hint: `${n} crêtes consécutives = ${n - 1} longueurs d'onde ; puis v = λ × f.`,
        solution: [`λ = ${fr(dist)} / ${n - 1} = ${num(lambda)} cm`, `v = λ f = ${num(lambda)} × ${f} = ${num(v)} cm/s`],
      };
    },
  },
  {
    id: "p.lentille",
    title: "Lentille mince convergente",
    generate: (r, d) => {
      const f = r.pick([5, 10, 15, 20]);
      const OA = -r.pick([2 * f, 3 * f, f + 5, 4 * f, f * 1.5]);
      const OAp = 1 / (1 / f + 1 / OA);
      if (d === 3) {
        const gamma = OAp / OA;
        return {
          prompt: `Lentille de distance focale ${f} cm, objet à OA = ${fr(OA)} cm. Calcule le grandissement γ.`,
          kind: "numeric", answer: gamma, display: num(gamma), tolerance: { rel: 0.02, abs: 0.01 },
          hint: "Conjugaison 1/OA' − 1/OA = 1/f', puis γ = OA'/OA.",
          solution: [`1/OA' = 1/${f} + 1/(${fr(OA)}) ⇒ OA' = ${num(OAp)} cm`, `γ = OA'/OA = ${num(OAp)}/(${fr(OA)}) = ${num(gamma)}`],
        };
      }
      return {
        prompt: `Lentille convergente de distance focale f' = ${f} cm ; objet à OA = ${fr(OA)} cm. Position de l'image OA' ?`,
        kind: "numeric", answer: OAp, display: num(OAp), unit: "cm", tolerance: TOL,
        hint: "1/OA' − 1/OA = 1/f' (attention au signe de OA).",
        solution: [`1/OA' = 1/f' + 1/OA = 1/${f} + 1/(${fr(OA)})`, `OA' = ${num(OAp)} cm`],
      };
    },
  },
  {
    id: "p.photon",
    title: "Énergie d'un photon",
    generate: (r, d) => {
      const lambdaNm = r.pick([400, 450, 500, 550, 600, 650, 700]);
      const E = (H * C) / (lambdaNm * 1e-9);
      if (d === 1) {
        return {
          prompt: `Énergie d'un photon de longueur d'onde ${lambdaNm} nm, en joules (h = 6,63 × 10⁻³⁴ J·s, c = 3,00 × 10⁸ m/s) ?`,
          kind: "numeric", answer: E, display: num(E), unit: "J", tolerance: TOL,
          hint: "E = h c / λ, avec λ en mètres. Écris par ex. 3,6e-19.",
          solution: [`λ = ${lambdaNm} × 10⁻⁹ m`, `E = 6,63 × 10⁻³⁴ × 3,00 × 10⁸ / (${lambdaNm} × 10⁻⁹) = ${sci(E)} J`],
        };
      }
      const eV = E / EV;
      return {
        prompt: `Énergie, en électronvolts, d'un photon de ${lambdaNm} nm (h = 6,63 × 10⁻³⁴ J·s, c = 3,00 × 10⁸ m/s, 1 eV = 1,60 × 10⁻¹⁹ J) ?`,
        kind: "numeric", answer: eV, display: num(eV), unit: "eV", tolerance: TOL,
        hint: "E = hc/λ en joules, puis divise par 1,60 × 10⁻¹⁹.",
        solution: [`E = hc/λ = ${sci(E)} J`, `E = ${sci(E)} / 1,60 × 10⁻¹⁹ = ${num(eV)} eV`],
      };
    },
  },
  {
    id: "p.interactions",
    title: "Interactions gravitationnelle et électrique",
    generate: (r, d) => {
      if (d === 1) {
        const m = r.pick([2, 50, 70, 1000]);
        const P = m * G;
        return {
          prompt: `Poids d'un objet de ${m} kg sur Terre (g = 9,81 N/kg) ?`,
          kind: "numeric", answer: P, display: num(P), unit: "N", tolerance: TOL,
          hint: "P = m × g",
          solution: [`P = ${m} × 9,81 = ${num(P)} N`],
        };
      }
      if (d === 2) {
        const q1 = r.int(1, 9) * 1e-6;
        const q2 = r.int(1, 9) * 1e-6;
        const dist = r.pick([0.1, 0.2, 0.5, 1]);
        const F = (9.0e9 * q1 * q2) / (dist * dist);
        return {
          prompt: `Deux charges de ${fr(q1 * 1e6)} μC et ${fr(q2 * 1e6)} μC sont à ${fr(dist)} m. Force électrique (k = 9,0 × 10⁹ N·m²·C⁻²) ?`,
          kind: "numeric", answer: F, display: num(F), unit: "N", tolerance: TOL,
          hint: "F = k |q₁q₂| / d², avec 1 μC = 10⁻⁶ C.",
          solution: [`F = 9,0 × 10⁹ × ${sci(q1)} × ${sci(q2)} / ${fr(dist)}² = ${num(F)} N`],
        };
      }
      const m1 = 5.97e24;
      const m2 = r.pick([1000, 7.35e22, 70]);
      const dist = m2 === 7.35e22 ? 3.84e8 : r.pick([6.77e6, 4.2e7]);
      const F = (6.67e-11 * m1 * m2) / (dist * dist);
      return {
        prompt: `Force gravitationnelle exercée par la Terre (5,97 × 10²⁴ kg) sur un corps de ${m2 >= 1e6 ? sci(m2) : fr(m2)} kg situé à ${sci(dist)} m de son centre (G = 6,67 × 10⁻¹¹) ?`,
        kind: "numeric", answer: F, display: num(F), unit: "N", tolerance: TOL,
        hint: "F = G m₁ m₂ / d²",
        solution: [`F = 6,67 × 10⁻¹¹ × 5,97 × 10²⁴ × ${sci(m2)} / (${sci(dist)})² = ${sci(F)} N`],
      };
    },
  },
];

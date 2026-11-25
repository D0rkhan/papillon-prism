/**
 * The Première programme as the revision space knows it: per subject, the
 * official chapters, the generated skills that train them and the flashcard
 * decks that go with them, plus keywords to recognise them in the cahier de
 * textes and in announced tests.
 */
import { DECKS } from "./decks";
import { MATHS_SKILLS } from "./maths";
import { PHYSIQUE_SKILLS } from "./physique";
import type { Skill } from "./types";

export interface ProgramChapter {
  /** Stable id: "maths:derivation". */
  id: string;
  subject: string;
  title: string;
  skills: string[];
  deck?: string;
  keywords: string[];
}

const ch = (subject: string, slug: string, title: string, skills: string[], deck: string | undefined, keywords: string[]): ProgramChapter => ({
  id: `${subject}:${slug}`, subject, title, skills, deck, keywords,
});

export const PROGRAM: ProgramChapter[] = [
  ch("maths", "suites", "Suites numériques", ["m.suite.arith", "m.suite.somme", "m.suite.geo"], "maths.suites", ["suite", "arithmétique", "géométrique", "récurrence"]),
  ch("maths", "second-degre", "Second degré", ["m.deg2.delta", "m.deg2.racines", "m.deg2.sommet"], "maths.second-degre", ["second degré", "trinôme", "discriminant", "parabole", "polynôme du second"]),
  ch("maths", "derivation", "Dérivation", ["m.derive.point", "m.derive.produit", "m.derive.tangente"], "maths.derivation", ["dériv", "tangente", "nombre dérivé", "variation"]),
  ch("maths", "exponentielle", "Fonction exponentielle", ["m.exp.calcul"], "maths.exponentielle", ["exponentielle", "exp("]),
  ch("maths", "trigonometrie", "Trigonométrie", ["m.trigo.valeurs"], "maths.trigonometrie", ["trigo", "cercle trigonom", "cosinus", "sinus", "radian"]),
  ch("maths", "produit-scalaire", "Produit scalaire", ["m.scalaire"], "maths.produit-scalaire", ["produit scalaire", "al-kashi", "al kashi", "orthogonal"]),
  ch("maths", "geometrie-reperee", "Géométrie repérée", ["m.geo.droite", "m.geo.cercle"], "maths.geometrie-reperee", ["géométrie repérée", "équation cartésienne", "vecteur normal", "équation de cercle", "cercle"]),
  ch("maths", "probabilites", "Probabilités conditionnelles", ["m.proba.cond"], "maths.probabilites", ["probabilit", "conditionnel", "arbre pondéré", "indépendan"]),
  ch("maths", "variables-aleatoires", "Variables aléatoires", ["m.va.esperance"], undefined, ["variable aléatoire", "espérance", "loi de probabilité"]),
  ch("physique_chimie", "matiere", "Quantité de matière", ["p.matiere.n"], "pc.matiere", ["quantité de matière", "mole", "masse molaire"]),
  ch("physique_chimie", "solutions", "Solutions et dilutions", ["p.solution.conc"], undefined, ["concentration", "dilution", "solution", "dosage", "étalonnage", "spectrophoto"]),
  ch("physique_chimie", "avancement", "Transformation chimique et avancement", ["p.avancement"], undefined, ["avancement", "réactif limitant", "tableau d'avancement", "oxydo", "titrage"]),
  ch("physique_chimie", "energie", "Énergie mécanique", ["p.energie.cinetique", "p.energie.mecanique"], "pc.energie", ["énergie cinétique", "énergie mécanique", "énergie potentielle", "travail d'une force"]),
  ch("physique_chimie", "electricite", "Énergie électrique", ["p.electricite"], undefined, ["puissance électrique", "effet joule", "circuit", "électrique"]),
  ch("physique_chimie", "ondes", "Ondes mécaniques", ["p.ondes"], "pc.ondes", ["onde", "longueur d'onde", "période", "son"]),
  ch("physique_chimie", "optique", "Lentilles et images", ["p.lentille"], undefined, ["lentille", "image", "conjugaison", "grandissement", "optique"]),
  ch("physique_chimie", "lumiere", "Lumière et photons", ["p.photon"], undefined, ["photon", "lumière", "couleur", "spectre"]),
  ch("physique_chimie", "interactions", "Interactions et mouvement", ["p.interactions"], "pc.interactions", ["interaction", "coulomb", "gravitation", "champ", "newton", "mouvement"]),
  ch("francais", "figures", "Figures de style", [], "fr.figures", ["figure de style", "commentaire", "analyse linéaire", "poésie"]),
  ch("francais", "mouvements", "Mouvements littéraires", [], "fr.mouvements", ["mouvement littéraire", "romantisme", "lumières", "humanisme", "réalisme"]),
  ch("histoire_geo", "revolutions", "L'Europe face aux révolutions", [], "hg.revolutions", ["révolution", "napoléon", "1789", "empire"]),
  ch("histoire_geo", "nations", "Nations et libéralisme (1815–1871)", [], "hg.nations", ["nation", "1848", "second empire", "unification"]),
  ch("histoire_geo", "troisieme-republique", "La IIIe République", [], "hg.troisieme-republique", ["troisième république", "iiie république", "laïcité", "dreyfus"]),
  ch("histoire_geo", "guerre", "La Première Guerre mondiale", [], "hg.guerre", ["première guerre", "grande guerre", "1914", "verdun"]),
  ch("anglais", "vocabulaire", "Vocabulaire essentiel", [], "en.vocab", ["vocabul", "vocab"]),
  ch("espagnol", "vocabulaire", "Vocabulario esencial", [], "es.vocab", ["vocabul", "vocab"]),
];

export const SKILLS: Record<string, Skill> = Object.fromEntries([...MATHS_SKILLS, ...PHYSIQUE_SKILLS].map(s => [s.id, s]));

export const programFor = (subject: string | undefined): ProgramChapter[] =>
  subject ? PROGRAM.filter(c => c.subject === subject) : [];

export const programChapter = (id: string | undefined) => PROGRAM.find(c => c.id === id);

export const deckCards = (deck: string | undefined) => (deck ? DECKS[deck] ?? [] : []);

const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Programme chapters a free text (lesson title, announced test) talks about. */
export function matchChapters(subject: string | undefined, text: string): ProgramChapter[] {
  const t = normalize(text);
  return programFor(subject).filter(c => c.keywords.some(k => t.includes(normalize(k))));
}

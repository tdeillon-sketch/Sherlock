const pptxgen = require("pptxgenjs");
const A = "/home/user/Sherlock/roadtrip-scandinavie/assets/";
const OUT = "/home/user/Sherlock/roadtrip-scandinavie/Roadtrip-Scandinavie-12-nuits.pptx";

const INK = "0F2E36", INK2 = "16414C", TEAL = "1D5B68", SEA = "417C8A";
const NATURE = "00958C", FALU = "A83E27", AMBER = "D8A03F";
const ICE = "EDF3F4", ICE2 = "E3ECEE", CARD = "F3F7F8", LINE = "D5E3E6";
const BODY = "26383D", MUTED = "5F757B", W = "FFFFFF", ICEW = "CFE0E4";
const SERIF = "Cambria", SANS = "Calibri";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";                    // 13.3 x 7.5
pres.author = "Roadtrip Scandinavie";
pres.title = "Roadtrip Scandinavie - 12 nuits";

const SW = 13.3, SH = 7.5;
const T = (s, t, o) => s.addText(t, Object.assign({ isTextBox: true, margin: 0 }, o));
const RR = (s, o) => s.addShape(pres.ShapeType.roundRect,
  Object.assign({ rectRadius: 0.09 }, o));

function kicker(s, txt, x, y, color, w) {
  T(s, txt, { x, y, w: w || 6.0, h: 0.26, fontFace: SANS, fontSize: 11, bold: true,
              color, charSpacing: 2.2 });
}

function numDot(s, n, x, y, d, fill, fs) {
  s.addText(String(n), { isTextBox: true, shape: pres.ShapeType.ellipse, x, y, w: d, h: d,
    fill: { color: fill }, align: "center", valign: "middle", margin: 0,
    fontFace: SERIF, fontSize: fs, bold: true, color: W });
}

function lightSlide(kick, title, sub) {
  const s = pres.addSlide();
  s.background = { color: W };
  kicker(s, kick, 0.62, 0.60, FALU, 7.0);
  T(s, title, { x: 0.62, y: 0.95, w: 11.4, h: 0.85, fontFace: SERIF, fontSize: 33,
                bold: true, color: INK });
  if (sub) T(s, sub, { x: 0.62, y: 1.86, w: 10.6, h: 0.52, fontFace: SANS,
                       fontSize: 15, color: MUTED, lineSpacingMultiple: 1.15 });
  return s;
}

/* ============================================================ 1. TITRE */
{
  const s = pres.addSlide();
  s.background = { color: INK };
  s.addImage({ path: A + "hero_title.jpg", x: 0, y: 0, w: SW, h: SH,
               sizing: { type: "cover", w: SW, h: SH } });
  kicker(s, "ROADTRIP SCANDINAVE · 13 JOURS, 12 NUITS · AOÛT", 0.85, 1.30, AMBER, 8.2);
  T(s, "Copenhague, Åsnen,\nVästervik, Stockholm", { x: 0.85, y: 1.80, w: 7.6, h: 2.40,
      fontFace: SERIF, fontSize: 46, bold: true, color: W, lineSpacingMultiple: 1.02 });
  T(s, "Deux villes en ouverture et en conclusion, un cœur lacustre avec la maison rouge au bord de l’eau, et un archipel baltique pour le point d’orgue.",
    { x: 0.85, y: 4.35, w: 6.9, h: 1.0, fontFace: SANS, fontSize: 15.5, color: ICEW,
      lineSpacingMultiple: 1.28 });
  const chips = [["4", "hébergements"], ["≈ 10 h", "de conduite"],
                 ["75 %", "de nature"], ["2 nuits", "minimum partout"]];
  chips.forEach((c, i) => {
    const x = 0.85 + i * 1.85;
    T(s, c[0], { x, y: 5.70, w: 1.72, h: 0.42, fontFace: SERIF, fontSize: 21,
                 bold: true, color: AMBER });
    T(s, c[1], { x, y: 6.12, w: 1.72, h: 0.32, fontFace: SANS, fontSize: 11.5,
                 color: ICEW });
  });
  s.addNotes("Recommandation ferme : 2 nuits Copenhague + 4 nuits Åsnen + 4 nuits Västervik + 2 nuits Stockholm.");
}

/* ============================================================= 2. CARTE */
{
  const s = pres.addSlide();
  s.background = { color: INK };
  s.addImage({ path: A + "carte_roadtrip.png", x: 6.28, y: 0.50, w: 6.45, h: 6.45 });
  kicker(s, "L’ITINÉRAIRE", 0.62, 0.72, AMBER, 5.0);
  T(s, "Une diagonale du Danemark\nà la Baltique", { x: 0.62, y: 1.06, w: 5.5, h: 1.30,
      fontFace: SERIF, fontSize: 28, bold: true, color: W, lineSpacingMultiple: 1.06 });
  const stages = [
    ["1", "Copenhague", "2 nuits · Danemark", "Ville d’ouverture"],
    ["2", "Lac Åsnen", "4 nuits · Småland", "Maison rouge au bord du lac"],
    ["3", "Västervik", "4 nuits · Archipel de Tjust", "Îles, rochers, kayak de mer"],
    ["4", "Stockholm", "2 nuits · Uppland", "Conclusion urbaine, sans excès"]];
  stages.forEach((st, i) => {
    const y = 2.72 + i * 0.96;
    numDot(s, st[0], 0.62, y, 0.44, FALU, 15);
    T(s, st[1], { x: 1.22, y: y - 0.05, w: 4.3, h: 0.32, fontFace: SERIF,
                  fontSize: 17, bold: true, color: W });
    T(s, st[2] + "  ·  " + st[3], { x: 1.22, y: y + 0.27, w: 4.6, h: 0.28,
                  fontFace: SANS, fontSize: 11.5, color: "9FBEC5" });
  });
  RR(s, { x: 0.62, y: 6.55, w: 5.30, h: 0.62, fill: { color: INK2 } });
  T(s, "≈ 10 h de conduite structurante", { x: 0.86, y: 6.65, w: 3.2, h: 0.42,
      fontFace: SANS, fontSize: 12.5, bold: true, color: AMBER, valign: "middle" });
  T(s, "13 à 15 h avec les excursions", { x: 3.52, y: 6.65, w: 2.18, h: 0.42,
      fontFace: SANS, fontSize: 11, color: ICEW, valign: "middle", align: "right" });
  s.addNotes("Copenhague–Åsnen : 218 km, 2 h 43. Åsnen–Västervik : 3 h 15 à 3 h 45. Västervik–Stockholm : 3 h 15.");
}

/* =============================================== 3. POURQUOI CETTE ROUTE */
{
  const s = lightSlide("LE PRINCIPE", "Pourquoi c’est probablement la meilleure combinaison",
    "Elle offre des paysages vraiment différents, au lieu de répéter deux fois le même décor.");
  const cards = [
    ["1", "Copenhague", "Très vivante, colorée et facile à découvrir."],
    ["2", "Le cœur lacustre", "La vraie maison rouge au bord d’un lac, celle que tu recherches."],
    ["3", "Un archipel baltique", "Bien plus spectaculaire et dépaysant qu’une étape de plus à l’intérieur du pays."],
    ["4", "Stockholm", "Une excellente conclusion, plutôt qu’une longue étape urbaine."]];
  cards.forEach((c, i) => {
    const x = 0.62 + i * 3.06;
    RR(s, { x, y: 2.72, w: 2.86, h: 3.55, fill: { color: CARD },
            line: { color: LINE, width: 0.75 } });
    numDot(s, c[0], x + 0.34, 3.06, 0.52, i === 1 || i === 2 ? NATURE : FALU, 17);
    T(s, c[1], { x: x + 0.34, y: 3.86, w: 2.2, h: 0.72, fontFace: SERIF, fontSize: 18,
                 bold: true, color: INK, lineSpacingMultiple: 1.05 });
    T(s, c[2], { x: x + 0.34, y: 4.66, w: 2.22, h: 1.42, fontFace: SANS, fontSize: 13,
                 color: BODY, lineSpacingMultiple: 1.24 });
  });
  T(s, "Västervik apporte la mer, les rochers, les îles et le sentiment de bout du monde.",
    { x: 0.62, y: 6.55, w: 11.5, h: 0.4, fontFace: SANS, fontSize: 13, italic: true,
      color: MUTED });
}

/* ================================================== 4. LE TRAJET EN CHIFFRES */
{
  const s = lightSlide("LA CONDUITE", "Le roadtrip en chiffres",
    "Trois trajets structurants seulement, tous sous les quatre heures.");
  const stops = ["Copenhague", "Lac Åsnen", "Västervik", "Stockholm"];
  const legs = ["2 h 45 · 218 km", "3 h 15 – 3 h 45", "3 h 15"];
  const x0 = 1.35, dx = 3.55, yl = 3.15;
  s.addShape(pres.ShapeType.line, { x: x0, y: yl, w: dx * 3, h: 0,
    line: { color: LINE, width: 2.5 } });
  stops.forEach((st, i) => {
    const x = x0 + i * dx;
    numDot(s, i + 1, x - 0.23, yl - 0.23, 0.46, i === 1 || i === 2 ? NATURE : FALU, 15);
    T(s, st, { x: x - 1.3, y: yl + 0.38, w: 2.6, h: 0.32, fontFace: SERIF, fontSize: 15,
               bold: true, color: INK, align: "center" });
  });
  legs.forEach((lg, i) => {
    const x = x0 + i * dx + dx / 2;
    T(s, lg, { x: x - 1.15, y: yl - 0.78, w: 2.3, h: 0.36, fontFace: SANS,
               fontSize: 12.5, bold: true, color: TEAL, align: "center" });
  });
  const stats = [["≈ 10 h", "de conduite structurante"],
                 ["13 – 15 h", "au total, excursions comprises"],
                 ["4", "hébergements sur 12 nuits"],
                 ["0", "étape de moins de 2 nuits"]];
  stats.forEach((st, i) => {
    const x = 0.62 + i * 3.06;
    RR(s, { x, y: 4.55, w: 2.86, h: 1.72, fill: { color: CARD },
            line: { color: LINE, width: 0.75 } });
    T(s, st[0], { x: x + 0.30, y: 4.80, w: 2.3, h: 0.66, fontFace: SERIF, fontSize: 30,
                  bold: true, color: FALU });
    T(s, st[1], { x: x + 0.30, y: 5.52, w: 2.3, h: 0.62, fontFace: SANS, fontSize: 12.5,
                  color: BODY, lineSpacingMultiple: 1.2 });
  });
  T(s, "À ces trajets s’ajoutent quelques excursions locales : en sélectionnant soigneusement les activités, on reste sous les 15 heures.",
    { x: 0.62, y: 6.60, w: 11.5, h: 0.4, fontFace: SANS, fontSize: 13, italic: true,
      color: MUTED });
}

/* ================================================= 5. REPARTITION VILLE/NATURE */
{
  const s = lightSlide("L’ÉQUILIBRE", "Répartition ville / nature",
    "Deux lectures du même séjour : les nuitées, puis le temps de visite réel.");
  // --- unite : 12 nuits, une ligne par etape
  RR(s, { x: 0.62, y: 2.55, w: 5.83, h: 3.72, fill: { color: CARD },
          line: { color: LINE, width: 0.75 } });
  T(s, "En nuitées", { x: 0.99, y: 2.82, w: 5.0, h: 0.34, fontFace: SERIF, fontSize: 17,
                        bold: true, color: INK });
  const rows = [["Copenhague", 2, FALU], ["Lac Åsnen", 4, NATURE],
                ["Västervik", 4, NATURE], ["Stockholm", 2, FALU]];
  rows.forEach((r, i) => {
    const y = 3.32 + i * 0.58;
    T(s, r[0], { x: 0.99, y: y + 0.04, w: 1.66, h: 0.30, fontFace: SANS, fontSize: 13,
                 bold: true, color: INK });
    for (let k = 0; k < r[1]; k++) {
      s.addShape(pres.ShapeType.roundRect, { x: 2.72 + k * 0.42, y, w: 0.34, h: 0.38,
        rectRadius: 0.05, fill: { color: r[2] } });
    }
    T(s, r[1] + " nuits", { x: 4.62, y: y + 0.04, w: 1.5, h: 0.30, fontFace: SANS,
                            fontSize: 12.5, color: MUTED });
  });
  T(s, "4 nuits sur 12 en grande ville, soit 33 %.", { x: 0.99, y: 5.66, w: 5.1, h: 0.30,
      fontFace: SANS, fontSize: 13.5, color: BODY });
  s.addShape(pres.ShapeType.roundRect, { x: 0.99, y: 6.02, w: 0.20, h: 0.20,
    rectRadius: 0.04, fill: { color: NATURE } });
  T(s, "Nature", { x: 1.27, y: 6.00, w: 0.9, h: 0.26, fontFace: SANS, fontSize: 11.5,
                   color: MUTED });
  s.addShape(pres.ShapeType.roundRect, { x: 2.22, y: 6.02, w: 0.20, h: 0.20,
    rectRadius: 0.04, fill: { color: FALU } });
  T(s, "Grande ville", { x: 2.50, y: 6.00, w: 1.5, h: 0.26, fontFace: SANS,
                         fontSize: 11.5, color: MUTED });
  // --- temps reel
  RR(s, { x: 6.85, y: 2.55, w: 5.83, h: 3.72, fill: { color: CARD },
          line: { color: LINE, width: 0.75 } });
  T(s, "En temps de visite réel", { x: 7.22, y: 2.82, w: 5.0, h: 0.34, fontFace: SERIF,
      fontSize: 17, bold: true, color: INK });
  T(s, "≈ 75 %", { x: 7.22, y: 3.20, w: 2.6, h: 0.86, fontFace: SERIF, fontSize: 46,
      bold: true, color: NATURE });
  T(s, "de nature\n25 % de ville", { x: 9.75, y: 3.34, w: 2.6, h: 0.72, fontFace: SANS,
      fontSize: 14, color: BODY, lineSpacingMultiple: 1.2 });
  const br = ["Arrivée à Copenhague + une vraie journée : environ 1,5 jour urbain",
              "Arrivée tardive à Stockholm + une vraie journée : environ 1,5 jour urbain",
              "Huit journées essentiellement nature"];
  T(s, br.map((b, i) => ({ text: b, options: { bullet: { indent: 14 }, breakLine: i < br.length - 1 } })),
    { x: 7.22, y: 4.28, w: 5.1, h: 1.55, fontFace: SANS, fontSize: 13, color: BODY,
      paraSpaceAfter: 8 });
  T(s, "Donc presque exactement ta cible.", { x: 7.22, y: 5.82, w: 5.1, h: 0.32,
      fontFace: SANS, fontSize: 13, bold: true, color: TEAL });
  T(s, "Les quatre nuits urbaines pèsent lourd sur le papier, mais l’arrivée et le départ en consomment une bonne partie.",
    { x: 0.62, y: 6.60, w: 11.5, h: 0.4, fontFace: SANS, fontSize: 13, italic: true,
      color: MUTED });
}

/* ==================================================== SEPARATEURS D’ETAPE */
function divider(img, num, name, nights, line, drive) {
  const s = pres.addSlide();
  s.background = { color: INK };
  s.addImage({ path: A + img, x: 0, y: 0, w: SW, h: SH,
               sizing: { type: "cover", w: SW, h: SH } });
  numDot(s, num, 0.85, 5.05, 0.56, FALU, 19);
  kicker(s, "ÉTAPE " + num + " · " + nights, 1.57, 5.21, AMBER, 6.5);
  T(s, name, { x: 0.85, y: 5.62, w: 8.4, h: 0.80, fontFace: SERIF, fontSize: 38,
               bold: true, color: W });
  T(s, line, { x: 0.85, y: 6.44, w: 8.0, h: 0.70, fontFace: SANS, fontSize: 14.5,
               color: ICEW, lineSpacingMultiple: 1.24 });
  if (drive) T(s, drive, { x: 9.60, y: 5.68, w: 2.95, h: 0.86, fontFace: SANS,
      fontSize: 13, color: AMBER, align: "right", lineSpacingMultiple: 1.2 });
  return s;
}

/* ================================================================ JOURS */
const DAYS = [
  { n: 1, img: "d1.jpg", side: "right", kick: "COPENHAGUE · NUITS 1–2",
    title: "Arrivée et première immersion",
    acts: [["GROSSE ACTIVITÉ", "Nyhavn et balade le long des quais"],
           ["PETITE ACTIVITÉ", "Palais d’Amalienborg et quartier de Frederiksstaden"],
           ["PETITE ACTIVITÉ", "Dîner ou promenade à Tivoli, selon l’heure d’arrivée"]] },
  { n: 2, img: "d2.jpg", side: "right", kick: "COPENHAGUE · NUITS 1–2",
    title: "Le meilleur de Copenhague",
    acts: [["GROSSE ACTIVITÉ", "Balade à vélo ou en bateau dans le port et les canaux"],
           ["PETITE ACTIVITÉ", "Rosenborg et ses jardins, sans nécessairement visiter tout le château"],
           ["PETITE ACTIVITÉ", "Torvehallerne ou quartier de Christianshavn"]],
    note: "Je ne mettrais pas davantage de châteaux : le bâtiment et les jardins suffisent largement." },
  { n: 3, img: "d3.jpg", side: "right", kick: "COPENHAGUE → LAC ÅSNEN",
    title: "Départ vers la Suède et installation douce",
    acts: [["GROSSE ACTIVITÉ", "Transfert depuis Copenhague : 218 km, 2 h 45 par le pont de l’Øresund"],
           ["PETITE ACTIVITÉ", "Courses dans une petite ville suédoise"],
           ["PETITE ACTIVITÉ", "Première baignade ou sortie en barque devant la maison"]],
    note: "Aucune visite ambitieuse ce jour-là : l’intérêt sera précisément de profiter du logement." },
  { n: 4, img: "d4.jpg", side: "left", kick: "LAC ÅSNEN · NUITS 3–6",
    title: "Parc national d’Åsnen",
    acts: [["GROSSE ACTIVITÉ", "Exploration du parc national, probablement autour de Sunnabron et Bjurkärr"],
           ["PETITE ACTIVITÉ", "Pique-nique au bord de l’eau"],
           ["PETITE ACTIVITÉ", "Courte baignade ou observation des oiseaux"]],
    note: "Anciennes forêts, rives sauvages et nombreuses îles : une partie du paysage se découvre bien mieux depuis l’eau." },
  { n: 5, img: "d5.jpg", side: "left", kick: "LAC ÅSNEN · NUITS 3–6",
    title: "Journée canoë",
    acts: [["GROSSE ACTIVITÉ", "Demi-journée de canoë ou de kayak, parcours familial et sans bivouac"],
           ["PETITE ACTIVITÉ", "Débarquement sur une île pour déjeuner"],
           ["PETITE ACTIVITÉ", "Retour tranquille à la maison, sauna éventuel ou baignade"]],
    note: "Des loueurs opèrent tout autour du lac ; certains organisent même des itinéraires de plusieurs jours." },
  { n: 6, img: "d6.jpg", side: "left", kick: "LAC ÅSNEN · NUITS 3–6",
    title: "Animaux et campagne du Småland",
    acts: [["GROSSE ACTIVITÉ", "Safari ou parc consacré aux élans, selon l’offre disponible à vos dates"],
           ["PETITE ACTIVITÉ", "Ferme, café rural ou boutique artisanale"],
           ["PETITE ACTIVITÉ", "Dernière fin d’après-midi au lac"]],
    note: "Verreries du « Royaume du cristal » : une seule démonstration, pas davantage — plusieurs sites deviendraient répétitifs pour les filles." },
  { n: 7, img: "d7.jpg", side: "right", kick: "LAC ÅSNEN → VÄSTERVIK",
    title: "Route panoramique et installation",
    acts: [["GROSSE ACTIVITÉ", "Route Åsnen – Västervik : 3 h 15 à 3 h 45"],
           ["PETITE ACTIVITÉ", "Déjeuner dans une petite ville en chemin"],
           ["PETITE ACTIVITÉ", "Promenade sur le rivage à proximité du logement"]] },
  { n: 8, img: "d8.jpg", side: "right", kick: "VÄSTERVIK · NUITS 7–10",
    title: "Journée dans l’archipel",
    acts: [["GROSSE ACTIVITÉ", "Bateau vers une île comme Hasselö ou Idö, selon les horaires d’août"],
           ["PETITE ACTIVITÉ", "Petite randonnée ou plage sur l’île"],
           ["PETITE ACTIVITÉ", "Café ou glace près du débarcadère"]],
    note: "Les horaires devront être adaptés à vos dates précises : la desserte varie selon la saison." },
  { n: 9, img: "d9.jpg", side: "right", kick: "VÄSTERVIK · NUITS 7–10",
    title: "Gränsö et baignade",
    acts: [["GROSSE ACTIVITÉ", "Réserve naturelle de Gränsö, sur une boucle raccourcie plutôt que les 12 km complets"],
           ["PETITE ACTIVITÉ", "Plage ou baignade"],
           ["PETITE ACTIVITÉ", "Passage rapide par le centre de Västervik"]],
    note: "Ainsi, la ville reste une petite ponctuation agréable et non le centre de la journée." },
  { n: 10, img: "d10.jpg", side: "right", kick: "VÄSTERVIK · NUITS 7–10",
    title: "La journée « wahou »",
    acts: [["PREMIER CHOIX", "Sortie guidée en kayak dans l’archipel : environ trois heures, à rythme familial"],
           ["SI LA MÉTÉO TOURNE", "Sortie en bateau au coucher du soleil, sauna flottant ou pêche avec guide"],
           ["AUTRES OPTIONS", "Pique-nique livré ou préparé sur un îlot, petite sortie en voilier traditionnel"]],
    note: "C’est la journée que je garderais souple en fonction de la météo." },
  { n: 11, img: "d11.jpg", side: "left", kick: "VÄSTERVIK → STOCKHOLM",
    title: "Arrivée et restitution de la voiture",
    acts: [["GROSSE ACTIVITÉ", "Route vers Stockholm : 3 h 15"],
           ["PETITE ACTIVITÉ", "Restitution de la voiture avant d’entrer réellement dans le centre"],
           ["PETITE ACTIVITÉ", "Piscine, sauna et soirée très calme à l’hôtel"]],
    note: "C’est exactement ici que ton idée d’un appart’hôtel avec piscine prend tout son sens." },
  { n: 12, img: "d12.jpg", side: "left", kick: "STOCKHOLM · NUITS 11–12",
    title: "Stockholm essentiel, sans surcharge",
    acts: [["GROSSE ACTIVITÉ", "Musée Vasa, excellent même pour des enfants qui ne veulent pas enchaîner les musées"],
           ["PETITE ACTIVITÉ", "Bateau public ou ferry vers Djurgården"],
           ["PETITE ACTIVITÉ", "Gamla Stan en fin d’après-midi"]],
    note: "Ni Drottningholm, ni excursion dans l’archipel : Västervik vous aura déjà offert le maritime, en plus naturel et moins touristique." },
  { n: 13, img: "d13.jpg", side: "left", kick: "STOCKHOLM · DÉPART",
    title: "Départ",
    acts: [["GROSSE ACTIVITÉ", "Transfert vers l’aéroport, selon l’horaire du vol"],
           ["PETITE ACTIVITÉ", "Promenade courte dans le quartier"],
           ["PETITE ACTIVITÉ", "Marché ou café avant de partir"]] }
];

function daySlide(d) {
  const s = pres.addSlide();
  s.background = { color: W };
  const imgX = d.side === "right" ? 7.30 : 0;
  const CX = d.side === "right" ? 0.62 : 6.68;
  s.addImage({ path: A + d.img, x: imgX, y: 0, w: 6.0, h: SH,
               sizing: { type: "cover", w: 6.0, h: SH } });
  numDot(s, d.n, CX, 0.60, 0.66, FALU, 22);
  kicker(s, d.kick, CX + 0.86, 0.80, MUTED, 5.1);
  T(s, "JOUR " + d.n, { x: CX + 0.86, y: 0.50, w: 5.1, h: 0.28, fontFace: SANS,
      fontSize: 11, bold: true, color: FALU, charSpacing: 2.2 });
  T(s, d.title, { x: CX, y: 1.52, w: 6.0, h: 1.05, fontFace: SERIF, fontSize: 29,
      bold: true, color: INK, lineSpacingMultiple: 1.04 });
  const geom = [[2.78, 1.34], [4.26, 1.14], [5.52, 1.14]];
  d.acts.forEach((a, i) => {
    const [y, h] = geom[i];
    const main = i === 0;
    RR(s, { x: CX, y, w: 6.0, h, fill: { color: main ? ICE : CARD },
            line: { color: main ? ICE2 : LINE, width: 0.75 } });
    s.addShape(pres.ShapeType.ellipse, { x: CX + 0.30, y: y + 0.32, w: 0.16, h: 0.16,
      fill: { color: main ? FALU : SEA } });
    T(s, a[0], { x: CX + 0.60, y: y + 0.26, w: 4.9, h: 0.26, fontFace: SANS,
        fontSize: 10, bold: true, color: main ? FALU : MUTED, charSpacing: 1.6 });
    T(s, a[1], { x: CX + 0.60, y: y + 0.58, w: 5.1, h: h - 0.76, fontFace: SANS,
        fontSize: main ? 15 : 13.5, color: main ? INK : BODY,
        lineSpacingMultiple: 1.22 });
  });
  if (d.note) T(s, d.note, { x: CX, y: 6.82, w: 6.0, h: 0.56, fontFace: SANS,
      fontSize: 12, italic: true, color: MUTED, lineSpacingMultiple: 1.18 });
  s.addNotes("Jour " + d.n + " — " + d.title + ". Trois activités maximum, retour au calme avant 18 h.");
}

/* ---------------------------------------------------- ETAPE 1 : COPENHAGUE */
divider("div_copenhague_o.jpg", 1, "Copenhague", "NUITS 1–2",
  "Très vivante, colorée et facile à découvrir. Deux nuits suffisent : l’arrivée en consomme déjà une bonne moitié.",
  "Aéroport d’arrivée\nVoiture prise le jour 3");
daySlide(DAYS[0]);
daySlide(DAYS[1]);
daySlide(DAYS[2]);

/* ------------------------------------------------- LOGISTIQUE : LA VOITURE */
{
  const s = lightSlide("POINT LOGISTIQUE", "La voiture : à verrouiller avant de réserver",
    "Je prendrais la voiture le matin du jour 3, idéalement dans une agence permettant une restitution en Suède.");
  const checks = [["1", "Le passage de frontière", "Vérifier explicitement que le contrat autorise à quitter le Danemark."],
                  ["2", "Le supplément d’abandon", "Connaître le montant exact pour une restitution à Stockholm."],
                  ["3", "Le péage de l’Øresund", "Savoir comment le pont est facturé et par qui."],
                  ["4", "L’assurance", "S’assurer qu’elle couvre bien les deux pays."]];
  checks.forEach((c, i) => {
    const x = 0.62 + i * 3.06;
    RR(s, { x, y: 2.86, w: 2.86, h: 2.90, fill: { color: CARD },
            line: { color: LINE, width: 0.75 } });
    numDot(s, c[0], x + 0.34, 3.18, 0.50, TEAL, 16);
    T(s, c[1], { x: x + 0.34, y: 3.92, w: 2.24, h: 0.68, fontFace: SERIF, fontSize: 16.5,
        bold: true, color: INK, lineSpacingMultiple: 1.06 });
    T(s, c[2], { x: x + 0.34, y: 4.68, w: 2.24, h: 1.0, fontFace: SANS, fontSize: 12.5,
        color: BODY, lineSpacingMultiple: 1.22 });
  });
  T(s, "La restitution se fait le jour 11, avant d’entrer réellement dans le centre de Stockholm.",
    { x: 0.62, y: 6.10, w: 11.5, h: 0.4, fontFace: SANS, fontSize: 13, italic: true,
      color: MUTED });
}

/* -------------------------------------------------------- ETAPE 2 : ASNEN */
divider("div_asnen_o.jpg", 2, "Lac Åsnen", "NUITS 3–6",
  "Un vaste paysage de lac et d’îles : kayak, canoë, randonnée, vélo, baignade et observation des oiseaux.",
  "2 h 45 depuis Copenhague\n218 km");
{
  const s = lightSlide("HÉBERGEMENT", "Åsnen : où poser les valises",
    "Je chercherais au sud ou à l’ouest du lac.");
  T(s, "Les secteurs à viser", { x: 0.62, y: 2.72, w: 5.4, h: 0.34, fontFace: SERIF,
      fontSize: 17, bold: true, color: INK });
  const spots = [["Getnö Gård", "Base nature bien équipée"],
                 ["Urshult", "Village au sud du lac"],
                 ["Torne", "Rive ouest, discrète"],
                 ["Tingsryd", "Commerces et services"],
                 ["Sunnabron", "Près d’une entrée du parc national"]];
  spots.forEach((sp, i) => {
    const y = 3.24 + i * 0.66;
    s.addShape(pres.ShapeType.ellipse, { x: 0.62, y: y + 0.10, w: 0.15, h: 0.15,
      fill: { color: NATURE } });
    T(s, sp[0], { x: 0.94, y, w: 2.0, h: 0.32, fontFace: SANS, fontSize: 14.5,
        bold: true, color: INK });
    T(s, sp[1], { x: 2.90, y: y + 0.03, w: 3.2, h: 0.30, fontFace: SANS, fontSize: 12.5,
        color: MUTED });
  });
  RR(s, { x: 6.85, y: 2.55, w: 5.83, h: 4.10, fill: { color: CARD },
          line: { color: LINE, width: 0.75 } });
  T(s, "Le cahier des charges", { x: 7.22, y: 2.86, w: 5.0, h: 0.34, fontFace: SERIF,
      fontSize: 17, bold: true, color: INK });
  const specs = ["Maison ou stuga indépendante pour quatre personnes",
                 "Accès direct, ou presque direct, au lac",
                 "Terrasse et cuisine",
                 "Bateau ou canoë disponible sur place",
                 "Note élevée",
                 "Sans voisinage trop dense"];
  T(s, specs.map((b, i) => ({ text: b, options: { bullet: { indent: 14 }, breakLine: i < specs.length - 1 } })),
    { x: 7.22, y: 3.38, w: 5.1, h: 2.9, fontFace: SANS, fontSize: 13.5, color: BODY,
      paraSpaceAfter: 10 });
  T(s, "Quatre nuits au même endroit : c’est le logement lui-même qui devient une partie du voyage.",
    { x: 0.62, y: 6.85, w: 11.5, h: 0.4, fontFace: SANS, fontSize: 13, italic: true,
      color: MUTED });
}
daySlide(DAYS[3]);
daySlide(DAYS[4]);
daySlide(DAYS[5]);

/* ---------------------------------------------------- ETAPE 3 : VASTERVIK */
divider("div_vastervik_o.jpg", 3, "Archipel de Västervik", "NUITS 7–10",
  "L’archipel de Tjust : des îles, des îlots rocheux, des forêts et des passages maritimes. Ici, le circuit passe du très beau au vraiment mémorable.",
  "3 h 15 à 3 h 45\ndepuis Åsnen");
{
  const s = lightSlide("HÉBERGEMENT", "Västervik : où dormir",
    "Plutôt une maison sur le continent avec accès à un embarcadère qu’une île, qui compliquerait tous les déplacements.");
  const opts = [["Gränsö", "Très proche de Västervik, mais déjà en pleine nature.", NATURE],
                ["Loftahammar", "Plus calme et plus maritime.", NATURE],
                ["Gamlebyviken", "Si l’on trouve une belle ferme ou une maison avec vue.", NATURE],
                ["Sur le continent", "Avec accès à un embarcadère, plutôt qu’une île isolée.", TEAL]];
  opts.forEach((o, i) => {
    const x = 0.62 + (i % 2) * 6.06, y = 2.80 + Math.floor(i / 2) * 1.92;
    RR(s, { x, y, w: 5.86, h: 1.62, fill: { color: CARD },
            line: { color: LINE, width: 0.75 } });
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.36, y: y + 0.40, w: 0.20, h: 0.20,
      fill: { color: o[2] } });
    T(s, o[0], { x: x + 0.72, y: y + 0.32, w: 4.7, h: 0.36, fontFace: SERIF,
        fontSize: 18, bold: true, color: INK });
    T(s, o[1], { x: x + 0.72, y: y + 0.80, w: 4.8, h: 0.62, fontFace: SANS,
        fontSize: 13, color: BODY, lineSpacingMultiple: 1.2 });
  });
  T(s, "Le kayak de mer est proposé depuis plusieurs points du secteur, notamment autour de Hasselö, Västervik et Örserumsviken.",
    { x: 0.62, y: 6.75, w: 11.5, h: 0.4, fontFace: SANS, fontSize: 13, italic: true,
      color: MUTED });
}
daySlide(DAYS[6]);
daySlide(DAYS[7]);
daySlide(DAYS[8]);
daySlide(DAYS[9]);

/* ---------------------------------------------------- ETAPE 4 : STOCKHOLM */
divider("div_stockholm_o.jpg", 4, "Stockholm", "NUITS 11–12",
  "Une excellente conclusion plutôt qu’une longue étape urbaine : une arrivée tardive, une vraie journée, puis le départ.",
  "3 h 15 depuis Västervik\nVoiture rendue à l’arrivée");
daySlide(DAYS[10]);
daySlide(DAYS[11]);
daySlide(DAYS[12]);

/* ------------------------------------------- HEBERGEMENT STOCKHOLM : ARBITRAGE */
{
  const s = lightSlide("LE POINT DÉLICAT", "Stockholm : l’arbitrage sur l’hébergement",
    "Appartement familial + vraie kitchenette + piscine + emplacement central, pour 200 à 300 € en août : la combinaison est rare.");
  const opts = [["1", "Hôtel avec piscine", "Suite familiale, piscine et spa — mais sans cuisine complète."],
                ["2", "Appart’hôtel", "Vraie cuisine et espace pour quatre — mais sans piscine."],
                ["3", "Plus périphérique", "Appartement et espace bien-être, au prix d’un peu de trajet."]];
  opts.forEach((o, i) => {
    const x = 0.62 + i * 4.10;
    RR(s, { x, y: 2.86, w: 3.90, h: 3.10, fill: { color: CARD },
            line: { color: LINE, width: 0.75 } });
    numDot(s, o[0], x + 0.38, 3.20, 0.52, FALU, 17);
    T(s, o[1], { x: x + 0.38, y: 4.00, w: 3.2, h: 0.72, fontFace: SERIF, fontSize: 19,
        bold: true, color: INK, lineSpacingMultiple: 1.05 });
    T(s, o[2], { x: x + 0.38, y: 4.82, w: 3.2, h: 1.0, fontFace: SANS, fontSize: 13,
        color: BODY, lineSpacingMultiple: 1.22 });
  });
  T(s, "Il faudra probablement renoncer à l’un des quatre critères. Le plus simple à céder est la cuisine complète : deux nuits seulement.",
    { x: 0.62, y: 6.30, w: 11.5, h: 0.4, fontFace: SANS, fontSize: 13, italic: true,
      color: MUTED });
}

/* --------------------------------------------------- COMPARAISON VATTERN */
{
  const s = lightSlide("L’ALTERNATIVE ÉCARTÉE", "Pourquoi pas une étape au lac Vättern",
    "Copenhague → Åsnen → Vättern / Omberg → Stockholm serait légèrement plus simple, mais nettement moins contrastée.");
  RR(s, { x: 0.62, y: 2.72, w: 5.86, h: 3.55, fill: { color: CARD },
          line: { color: LINE, width: 0.75 } });
  T(s, "La variante Vättern", { x: 1.02, y: 3.06, w: 5.0, h: 0.38, fontFace: SERIF,
      fontSize: 19, bold: true, color: MUTED });
  const cons = ["Deux étapes de lacs et de forêts successives",
                "Davantage de paysages intérieurs similaires",
                "Aucun véritable archipel avant Stockholm"];
  T(s, cons.map((b, i) => ({ text: b, options: { bullet: { indent: 14 }, breakLine: i < cons.length - 1 } })),
    { x: 1.02, y: 3.68, w: 5.0, h: 2.2, fontFace: SANS, fontSize: 14, color: BODY,
      paraSpaceAfter: 12 });
  RR(s, { x: 6.82, y: 2.72, w: 5.86, h: 3.55, fill: { color: INK } });
  T(s, "Ce que Västervik apporte", { x: 7.22, y: 3.06, w: 5.0, h: 0.38, fontFace: SERIF,
      fontSize: 19, bold: true, color: W });
  const pros = ["La mer, les rochers et les îles",
                "Le sentiment de bout du monde",
                "Une expérience maritime plus naturelle et moins touristique"];
  T(s, pros.map((b, i) => ({ text: b, options: { bullet: { indent: 14 }, breakLine: i < pros.length - 1 } })),
    { x: 7.22, y: 3.68, w: 5.0, h: 2.2, fontFace: SANS, fontSize: 14, color: ICEW,
      paraSpaceAfter: 12 });
  T(s, "C’est plus conforme au style B, « Scandinavie spectaculaire ».", { x: 7.22,
      y: 5.72, w: 5.0, h: 0.34, fontFace: SANS, fontSize: 13, bold: true, color: AMBER });
  T(s, "Västervik apporte la rupture de décor que deux étapes lacustres successives ne donneraient jamais.",
    { x: 0.62, y: 6.60, w: 11.5, h: 0.4, fontFace: SANS, fontSize: 13, italic: true,
      color: MUTED });
}

/* -------------------------------------------------------------- BUDGET */
{
  const s = lightSlide("ORDRE DE GRANDEUR", "Le budget, poste par poste",
    "Quatre personnes, 13 jours en août, départ de Genève : bons logements équipés d’une cuisine, repas préparés soi-même.");
  const POSTES = [
    ["Hébergement", 2800, "A83E27", "12 nuits, 4 logements avec cuisine"],
    ["Voiture", 1250, "2A78D6", "9 jours, abandon en Suède, carburant, Øresund"],
    ["Vols", 1150, "C98500", "Genève – Copenhague, Stockholm – Genève"],
    ["Courses et repas", 1000, "00958C", "On cuisine ; quelques cafés et glaces"],
    ["Activités", 950, "7B4FA0", "Kayak guidé, bateaux d’archipel, canoë, élans, Vasa"]];
  const total = POSTES.reduce((a, p) => a + p[1], 0);
  const eur = n => n.toLocaleString("fr-FR").replace(/\u202f|\u00a0/g, " ") + " €";

  s.addChart(pres.ChartType.pie,
    [{ name: "Budget", labels: POSTES.map(p => p[0]), values: POSTES.map(p => p[1]) }],
    { x: 0.55, y: 2.40, w: 5.90, h: 4.30,
      chartColors: POSTES.map(p => p[2]),
      dataBorder: { pt: 2, color: "FFFFFF" },
      showLegend: false, showTitle: false,
      showPercent: true, dataLabelPosition: "outEnd",
      dataLabelFormatCode: '0" "%',
      dataLabelColor: INK, dataLabelFontFace: SANS, dataLabelFontSize: 12,
      dataLabelFontBold: true });

  POSTES.forEach((p, i) => {
    const y = 2.62 + i * 0.60;
    s.addShape(pres.ShapeType.roundRect, { x: 6.62, y: y + 0.06, w: 0.22, h: 0.22,
      rectRadius: 0.04, fill: { color: p[2] } });
    T(s, p[0], { x: 7.00, y, w: 2.45, h: 0.30, fontFace: SANS, fontSize: 14,
                 bold: true, color: INK });
    T(s, p[3], { x: 7.00, y: y + 0.28, w: 3.5, h: 0.26, fontFace: SANS,
                 fontSize: 10.5, color: MUTED });
    T(s, eur(p[1]), { x: 10.55, y, w: 1.30, h: 0.30, fontFace: SANS, fontSize: 15,
                      bold: true, color: INK, align: "right" });
    T(s, Math.round(p[1] / total * 100) + " %", { x: 11.95, y: y + 0.02, w: 0.72,
                      h: 0.28, fontFace: SANS, fontSize: 12.5, color: MUTED,
                      align: "right" });
  });

  s.addShape(pres.ShapeType.line, { x: 6.62, y: 5.72, w: 6.05, h: 0,
    line: { color: LINE, width: 1 } });
  kicker(s, "TOTAL ESTIMÉ", 6.62, 5.92, MUTED, 3.0);
  T(s, "≈ " + eur(total), { x: 6.62, y: 6.20, w: 3.4, h: 0.66, fontFace: SERIF,
      fontSize: 34, bold: true, color: FALU });
  T(s, "≈ 1 790 € par personne", { x: 10.10, y: 6.24, w: 2.57, h: 0.30,
      fontFace: SANS, fontSize: 13, color: BODY, align: "right" });
  T(s, "≈ 550 € par jour pour quatre", { x: 9.80, y: 6.56, w: 2.87, h: 0.30,
      fontFace: SANS, fontSize: 13, color: MUTED, align: "right" });

  T(s, "Estimation, pas un devis. Les deux postes qui bougeront le plus : le supplément d’abandon de la voiture (150 à 450 € selon les loueurs) et les deux nuits à Stockholm.",
    { x: 0.62, y: 6.95, w: 5.90, h: 0.52, fontFace: SANS, fontSize: 11.5,
      italic: true, color: MUTED, lineSpacingMultiple: 1.18 });
  s.addNotes("Hypothèses : 4 personnes, 12 nuits, août, départ Genève, logements avec cuisine, repas maison. Vols multi-destinations. Voiture prise le jour 3 et rendue le jour 11.");
}

/* ------------------------------------------------------- RECOMMANDATION */
{
  const s = pres.addSlide();
  s.background = { color: INK };
  kicker(s, "MA RECOMMANDATION FERME", 0.85, 0.85, AMBER, 7.0);
  T(s, "2 + 4 + 4 + 2", { x: 0.85, y: 1.25, w: 7.0, h: 1.30, fontFace: SERIF,
      fontSize: 56, bold: true, color: W });
  T(s, "2 nuits Copenhague · 4 nuits Åsnen · 4 nuits Västervik · 2 nuits Stockholm",
    { x: 0.85, y: 2.58, w: 8.2, h: 0.42, fontFace: SANS, fontSize: 15, color: ICEW });
  T(s, "Équilibré, reposant, varié.", { x: 0.85, y: 3.14, w: 8.2, h: 0.42,
      fontFace: SANS, fontSize: 14, italic: true, color: AMBER });
  const ok = ["Quatre hébergements seulement", "Aucun séjour inférieur à deux nuits",
              "Trois activités maximum par jour", "Retour au calme avant 18 h",
              "Une maison au bord d’un lac", "Environ 75 % de nature",
              "Moins de 15 heures de conduite"];
  ok.forEach((k, i) => {
    const x = 0.85 + (i % 2) * 6.20, y = 3.95 + Math.floor(i / 2) * 0.66;
    s.addShape(pres.ShapeType.ellipse, { x, y: y + 0.07, w: 0.20, h: 0.20,
      fill: { color: NATURE } });
    T(s, k, { x: x + 0.40, y, w: 5.5, h: 0.34, fontFace: SANS, fontSize: 14,
        color: W });
  });
  s.addNotes("Compatible avec l’ensemble des contraintes fixées au départ.");
}

pres.writeFile({ fileName: OUT }).then(f => console.log("écrit :", f));

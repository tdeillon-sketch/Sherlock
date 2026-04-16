// ===== CELEBRITIES & QUIZ DATA =====
// Personnalites connues et quiz pour le module Enneagramme

// --- Interfaces ---

export interface Celebrity {
  name: string;
  type: number; // 1-9
  photo?: string; // URL placeholder
  bio: string; // Description comportementale en francais (3-4 phrases)
  funFact?: string;
}

export interface EasyQuestion {
  type: number;
  typeDesc: string;
  options: { name: string; correct: boolean }[];
  explanation: string;
}

export interface HardQuestion {
  celebrityName: string;
  bio: string;
  correctType: number;
  explanation: string;
}

// --- Type names mapping ---

export const TYPE_NAMES: Record<number, string> = {
  1: 'Perfectionniste',
  2: 'Genereux',
  3: 'Gagneur',
  4: 'Artiste',
  5: 'Observateur',
  6: 'Loyal',
  7: 'Aventurier',
  8: 'Chef',
  9: 'Mediateur',
};

// ===== CELEBRITIES =====

export const CELEBRITIES: Celebrity[] = [
  // --- Type 1 : Le Perfectionniste ---
  {
    name: 'Mahatma Gandhi',
    type: 1,
    photo: 'https://placeholder.com/gandhi.jpg',
    bio: "Gandhi incarnait l'ideal du Perfectionniste : une vision morale inflexible du bien et du mal, une discipline de vie extreme et un engagement total pour la justice. Il s'imposait des regles strictes — jeune, silence, simplicite — comme autant de preuves de coherence interieure. Sa colere n'etait jamais explosive mais canalisee dans une reforme du monde. Pour lui, chaque geste devait etre exemplaire.",
    funFact: "Gandhi marchait en moyenne 18 km par jour et a parcouru plus de 79 000 km a pied au cours de sa vie.",
  },
  {
    name: 'Marie Curie',
    type: 1,
    photo: 'https://placeholder.com/curie.jpg',
    bio: "Marie Curie etait animee par une rigueur scientifique sans faille et un sens du devoir profond. Elle travaillait sans relache, souvent au detriment de sa sante, poursuivant la verite avec une discipline monastique. Son exigence envers elle-meme depassait celle qu'elle avait envers les autres. Elle ne cherchait ni la gloire ni l'argent — seule la precision du resultat comptait.",
    funFact: "Elle est la seule personne a avoir recu des prix Nobel dans deux disciplines scientifiques differentes.",
  },
  {
    name: 'Michelle Obama',
    type: 1,
    photo: 'https://placeholder.com/michelle-obama.jpg',
    bio: "Michelle Obama est un modele de discipline, de valeurs morales fortes et d'amelioration constante. Elle a toujours fixe des standards eleves pour elle-meme et sa famille, tout en militant pour l'education et la sante. Son discours est structure, reflechi, jamais impulsif. Derriere son sourire chaleureux, on trouve une exigence interieure typique du type 1.",
  },
  {
    name: 'Hermione Granger',
    type: 1,
    photo: 'https://placeholder.com/hermione.jpg',
    bio: "Hermione est l'archetype de la Perfectionniste : premiere de classe, respectueuse des regles, indignee par l'injustice. Elle corrige ses amis, verifie trois fois ses devoirs et ne supporte pas la paresse intellectuelle. Sa frustration face au desordre du monde magique la pousse a creer la S.A.L.E., prouvant son besoin de reformer ce qui est mal.",
    funFact: "Personnage fictif de la saga Harry Potter, cree par J.K. Rowling.",
  },

  // --- Type 2 : Le Genereux ---
  {
    name: 'Mere Teresa',
    type: 2,
    photo: 'https://placeholder.com/mere-teresa.jpg',
    bio: "Mere Teresa a consacre sa vie entiere a aider les plus demunis, incarnant le Genereux dans sa forme la plus pure. Elle ressentait la souffrance des autres comme la sienne et ne pouvait pas rester inactive face au malheur. Son identite etait intimement liee a son role d'aidante. Elle trouvait sa raison d'etre dans le don de soi, parfois jusqu'a l'epuisement.",
    funFact: "Elle a fonde les Missionnaires de la Charite, presents dans plus de 130 pays.",
  },
  {
    name: 'Desmond Tutu',
    type: 2,
    photo: 'https://placeholder.com/desmond-tutu.jpg',
    bio: "Desmond Tutu rayonnait par sa chaleur humaine et son empathie naturelle. Dans sa lutte contre l'apartheid, c'est la compassion — et non la vengeance — qui guidait chacun de ses actes. Il cherchait a guerir les blessures des autres avant de penser aux siennes. Sa capacite a pardonner etait l'expression d'un coeur de type 2 profondement genereux.",
  },
  {
    name: 'Princesse Diana',
    type: 2,
    photo: 'https://placeholder.com/diana.jpg',
    bio: "Diana etait surnommee la Princesse du peuple pour sa capacite unique a toucher les coeurs. Elle brisait les protocoles royaux pour serrer des mains, consoler des malades et ecouter ceux que personne ne regardait. Son besoin d'etre aimee etait aussi profond que sa generosite. Quand l'amour ne lui etait pas rendu, elle souffrait en silence, typique du type 2 en stress.",
    funFact: "Elle a contribue a changer le regard du monde sur le VIH en serrant la main de patients atteints du sida sans gants.",
  },
  {
    name: 'Mister Rogers',
    type: 2,
    photo: 'https://placeholder.com/mister-rogers.jpg',
    bio: "Fred Rogers a passe des decennies a dire aux enfants qu'ils etaient speciaux exactement tels qu'ils etaient. Sa douceur, son ecoute et sa bienveillance incarnaient le Genereux dans toute sa purete. Il percevait les besoins emotionnels des enfants avant meme qu'ils ne les expriment. Son emission etait un acte d'amour quotidien et inlassable.",
  },

  // --- Type 3 : Le Gagneur ---
  {
    name: 'Cristiano Ronaldo',
    type: 3,
    photo: 'https://placeholder.com/ronaldo.jpg',
    bio: "Ronaldo est l'incarnation du Gagneur : une obsession pour la victoire, un entrainement acharne et une image publique soigneusement construite. Chaque match est une scene ou il doit briller. Il mesure sa valeur en buts, en trophees et en records. Derriere cette drive extraordinaire se cache la peur du type 3 : sans succes, qui suis-je ?",
    funFact: "Il s'entraine souvent deux heures de plus que ses coequipiers et surveille son alimentation avec une precision scientifique.",
  },
  {
    name: 'Beyonce',
    type: 3,
    photo: 'https://placeholder.com/beyonce.jpg',
    bio: "Beyonce est une performeuse dans l'ame : chaque concert est une demonstration de maitrise absolue, chaque album un evenement mondial. Elle incarne le Gagneur par sa capacite a se reinventer tout en restant au sommet. Sa discipline de travail est legendaire — rien n'est laisse au hasard. L'image qu'elle projette est toujours celle du succes impeccable.",
    funFact: "Pour son spectacle au Coachella, elle a repete pendant huit mois, huit heures par jour.",
  },
  {
    name: 'Taylor Swift',
    type: 3,
    photo: 'https://placeholder.com/taylor-swift.jpg',
    bio: "Taylor Swift illustre le Gagneur par sa strategie de carriere minutieusement orchestree et sa capacite a transformer chaque defi en victoire publique. Elle adapte son image a chaque ere musicale avec une precision remarquable. Sa relation avec ses fans est aussi un outil de succes soigneusement cultive. Elle sait exactement comment convertir l'authenticite en triomphe commercial.",
  },
  {
    name: 'Tony Stark (Iron Man)',
    type: 3,
    photo: 'https://placeholder.com/tony-stark.jpg',
    bio: "Tony Stark est le Gagneur par excellence : brillant, charismatique, et incapable de resister au besoin d'impressionner. Il construit des armures toujours plus spectaculaires, non seulement pour sauver le monde, mais aussi pour prouver sa valeur. Sa plus grande peur est l'insignifiance. Sous le vernis du genie, il y a un homme qui se demande s'il est digne d'amour sans ses exploits.",
    funFact: "Personnage fictif de l'univers Marvel, cree par Stan Lee, Larry Lieber, Don Heck et Jack Kirby.",
  },

  // --- Type 4 : L'Artiste ---
  {
    name: 'Frida Kahlo',
    type: 4,
    photo: 'https://placeholder.com/frida-kahlo.jpg',
    bio: "Frida Kahlo transformait sa douleur en art avec une intensite saisissante. Ses autoportraits revelent un monde interieur riche, tourmente et profondement personnel. Elle refusait de masquer sa souffrance et en faisait au contraire une oeuvre d'art. Cette quete d'authenticite absolue, meme dans la douleur, est la signature du type 4.",
    funFact: "Elle a peint 55 autoportraits, declarant : « Je me peins moi-meme parce que je suis la personne que je connais le mieux. »",
  },
  {
    name: 'Kurt Cobain',
    type: 4,
    photo: 'https://placeholder.com/kurt-cobain.jpg',
    bio: "Kurt Cobain vivait avec une sensibilite a fleur de peau qui irriguait toute sa musique. Il se sentait fondamentalement different des autres, incompris et en decalage. Sa creativite jaillissait de cette blessure interieure typique du type 4. Il rejetait le conformisme avec une rage melee de melancolie, cherchant desesperement une authenticite que le succes commercial menacait.",
  },
  {
    name: 'Billie Eilish',
    type: 4,
    photo: 'https://placeholder.com/billie-eilish.jpg',
    bio: "Billie Eilish incarne l'Artiste de sa generation : une esthetique sombre et personnelle, des paroles qui explorent les profondeurs de l'angoisse et de la melancolie. Elle refuse les codes de la pop classique et cultive sa difference comme une identite. Sa musique est un journal intime partage avec le monde, ou chaque emotion est ressentie avec une intensite presque douloureuse.",
    funFact: "Elle a compose son premier album dans la chambre qu'elle partageait avec son frere Finneas.",
  },
  {
    name: 'Johnny Depp',
    type: 4,
    photo: 'https://placeholder.com/johnny-depp.jpg',
    bio: "Johnny Depp a toujours choisi des roles etranges et marginaux, refletant son propre sentiment d'etre different. Il est attire par les personnages excentriques, incompris et poetiques. Sa vie personnelle tumultueuse revele l'intensite emotionnelle du type 4. Il cherche la beaute dans l'etrange et transforme sa singularite en art, parfois au prix d'un grand chaos interieur.",
  },

  // --- Type 5 : L'Observateur ---
  {
    name: 'Albert Einstein',
    type: 5,
    photo: 'https://placeholder.com/einstein.jpg',
    bio: "Einstein est le prototype de l'Observateur : un esprit qui observe le monde depuis un recul intellectuel vertigineux. Il passait des heures seul a reflechir, preferant ses experiences de pensee aux interactions sociales. Son detachement emotionnel lui permettait une clarte de vision extraordinaire. Il protegeait farouchement son espace mental, ressource vitale du type 5.",
    funFact: "Il a developpe sa theorie de la relativite restreinte en se demandant ce qu'on verrait si on chevauchait un rayon de lumiere.",
  },
  {
    name: 'Bill Gates',
    type: 5,
    photo: 'https://placeholder.com/bill-gates.jpg',
    bio: "Bill Gates incarne l'Observateur par sa capacite a absorber des quantites massives d'information et a les synthetiser en solutions. Il prefere la logique a l'emotion et l'analyse a l'intuition. Ses semaines de lecture intensive (Think Weeks) ou il s'isole pour devorer des livres sont typiques du type 5. Il accumule le savoir comme d'autres accumulent les richesses.",
    funFact: "Il lit environ 50 livres par an et prend des notes manuscrites detaillees pour chacun d'eux.",
  },
  {
    name: 'Stephen Hawking',
    type: 5,
    photo: 'https://placeholder.com/hawking.jpg',
    bio: "Stephen Hawking vivait essentiellement dans le monde des idees, ou l'univers entier tenait dans des equations. Malgre un corps immobilise, son esprit explorait les confins du cosmos avec une liberte totale. Il incarnait le detachement du type 5 : les limites physiques ne comptaient pas tant que l'esprit restait libre. Sa reserve emotionnelle cachait une curiosite sans bornes.",
    funFact: "Son livre « Une breve histoire du temps » est reste sur la liste des best-sellers du Sunday Times pendant 237 semaines consecutives.",
  },
  {
    name: 'Sherlock Holmes',
    type: 5,
    photo: 'https://placeholder.com/sherlock.jpg',
    bio: "Sherlock Holmes est l'Observateur par excellence : il collecte les indices, les classe, les analyse avec une froideur chirurgicale. Les emotions sont pour lui un bruit de fond qui perturbe la raison. Il se retire dans son « palais mental » pour traiter l'information, protegeant son energie interieure. Son besoin de comprendre depasse de loin son besoin de se connecter aux autres.",
    funFact: "Personnage fictif cree par Arthur Conan Doyle, il est l'un des personnages les plus adaptes de l'histoire de la fiction.",
  },

  // --- Type 6 : Le Loyal ---
  {
    name: 'Mark Zuckerberg',
    type: 6,
    photo: 'https://placeholder.com/zuckerberg.jpg',
    bio: "Zuckerberg illustre le Loyal par son besoin constant d'anticiper les menaces et de securiser sa position. Il a construit Facebook autour de la connexion et de la communaute — des valeurs centrales du type 6. Sa prudence strategique, parfois percue comme de la paranoia, est typique de ce type qui scanne en permanence l'horizon a la recherche de dangers. Il reste fidele a un cercle restreint de confiance.",
  },
  {
    name: 'Woody Allen',
    type: 6,
    photo: 'https://placeholder.com/woody-allen.jpg',
    bio: "Woody Allen a fait de l'anxiete un art. Ses films explorent l'inquietude existentielle, le doute permanent et la recherche de securite dans un monde incertain. Son humour est un mecanisme de defense typique du type 6 : rire de ses peurs pour les apprivoiser. Il questionne tout — l'amour, la mort, le sens de la vie — sans jamais trouver de reponse rassurante.",
    funFact: "Il joue de la clarinette tous les lundis soir dans un club de jazz a New York depuis des decennies.",
  },
  {
    name: 'Jennifer Aniston',
    type: 6,
    photo: 'https://placeholder.com/jennifer-aniston.jpg',
    bio: "Jennifer Aniston incarne la loyaute du type 6 par sa fidelite a ses amis proches et sa constance dans sa carriere. Elle est percue comme accessible et fiable, loin des excentricites hollywoodiennes. Son anxiete face au changement et son besoin de stabilite transparaissent dans ses choix de roles et de vie. Elle cultive la securite emotionnelle comme une priorite absolue.",
  },
  {
    name: 'Bilbo Sacquet',
    type: 6,
    photo: 'https://placeholder.com/bilbo.jpg',
    bio: "Bilbo est un Loyal classique : il adore la securite de son trou de hobbit et redoute l'aventure. Chaque decision est precedee de doutes, d'hesitations et de scenarios catastrophes. Mais c'est justement sa loyaute — envers ses compagnons, envers sa parole — qui le pousse a surmonter ses peurs. Le courage du type 6 nait de la peur assumee, jamais de l'inconscience.",
    funFact: "Personnage fictif cree par J.R.R. Tolkien dans « Le Hobbit » et « Le Seigneur des Anneaux ».",
  },

  // --- Type 7 : L'Aventurier ---
  {
    name: 'Robin Williams',
    type: 7,
    photo: 'https://placeholder.com/robin-williams.jpg',
    bio: "Robin Williams etait un tourbillon d'energie, de rire et d'improvisation. Son esprit bondissait d'une idee a l'autre avec une vitesse vertigineuse, typique de l'Aventurier qui fuit l'ennui et la douleur. Derriere cette joie debordante se cachait une souffrance profonde qu'il masquait par l'humour. Le type 7 utilise le mouvement perpetuel pour ne jamais faire face au vide.",
    funFact: "Il pouvait improviser pendant des heures sans interruption, epuisant realisateurs et equipes de tournage.",
  },
  {
    name: 'Jim Carrey',
    type: 7,
    photo: 'https://placeholder.com/jim-carrey.jpg',
    bio: "Jim Carrey est l'Aventurier dans toute sa splendeur : expressif, exuberant, incapable de rester en place. Ses grimaces et son energie physique debordante sont la manifestation d'un esprit qui refuse les limites. Comme beaucoup de type 7, il utilise l'humour pour transformer la douleur en spectacle. Sa quete spirituelle recente revele un Aventurier qui cherche enfin a ralentir.",
  },
  {
    name: 'Richard Branson',
    type: 7,
    photo: 'https://placeholder.com/richard-branson.jpg',
    bio: "Richard Branson collectionne les aventures comme d'autres collectionnent les timbres : traversees en ballon, entreprises dans tous les domaines, voyages dans l'espace. Son optimisme indestructible et son refus de la routine sont la signature du type 7. Il transforme chaque echec en nouvelle opportunite et vit comme si la vie etait un buffet ou tout merite d'etre goute.",
    funFact: "Il a tente de faire le tour du monde en ballon a trois reprises et a fonde plus de 400 entreprises.",
  },
  {
    name: 'Peter Pan',
    type: 7,
    photo: 'https://placeholder.com/peter-pan.jpg',
    bio: "Peter Pan est l'Aventurier dans sa forme la plus pure : il refuse de grandir, refuse les responsabilites et vit dans un monde ou le jeu est eternel. Chaque jour est une nouvelle aventure au Pays Imaginaire. Sa peur secrete est celle de tous les type 7 : que la vie devienne serieuse, limitee, douloureuse. Il prefere voler plutot que de toucher terre.",
    funFact: "Personnage fictif cree par J.M. Barrie en 1902.",
  },

  // --- Type 8 : Le Chef ---
  {
    name: 'Winston Churchill',
    type: 8,
    photo: 'https://placeholder.com/churchill.jpg',
    bio: "Churchill etait un Chef dans l'ame : une presence imposante, une volonte indomptable et un refus absolu de la soumission. Face a l'adversite, il redoublait de force plutot que de plier. Sa franchise brutale et son autorite naturelle mobilisaient les foules. Le type 8 ne craint pas le conflit — il le recherche pour prouver sa force et proteger ceux qu'il aime.",
    funFact: "Pendant la Seconde Guerre mondiale, il dormait rarement plus de quatre heures par nuit, compensant par des siestes l'apres-midi.",
  },
  {
    name: 'Serena Williams',
    type: 8,
    photo: 'https://placeholder.com/serena-williams.jpg',
    bio: "Serena Williams incarne le Chef par sa puissance brute, sa combativite feroce et son refus de se laisser diminuer. Sur le court, elle domine avec une intensite qui intimide ses adversaires. Elle a lutte contre les prejuges avec la meme energie qu'elle met dans ses coups droits. Le type 8 transforme la colere en carburant — et Serena est un moteur inepuisable.",
  },
  {
    name: 'Martin Luther King Jr.',
    type: 8,
    photo: 'https://placeholder.com/mlk.jpg',
    bio: "Martin Luther King etait un Chef au sens le plus noble : il protegeait les opprimes avec une force tranquille mais inegale. Sa voix portait l'autorite naturelle du type 8 — pas celle de l'intimidation, mais celle de la conviction absolue. Il refusait l'injustice avec une determination que rien ne pouvait briser. Son courage n'etait pas l'absence de peur mais le choix de la confronter.",
    funFact: "Son celebre discours a Washington a ete en grande partie improvise a partir du passage « I have a dream ».",
  },
  {
    name: 'Katniss Everdeen',
    type: 8,
    photo: 'https://placeholder.com/katniss.jpg',
    bio: "Katniss est un Chef instinctif : elle protege les siens avec une feroce determination, refuse de se soumettre au pouvoir injuste et prend les commandes quand les autres hesitent. Sa force n'est pas celle de la domination mais celle de la protection. Comme tout type 8, elle cache une vulnerabilite profonde sous une armure de courage et d'independance.",
    funFact: "Personnage fictif cree par Suzanne Collins dans la trilogie « Hunger Games ».",
  },

  // --- Type 9 : Le Mediateur ---
  {
    name: 'Keanu Reeves',
    type: 9,
    photo: 'https://placeholder.com/keanu-reeves.jpg',
    bio: "Keanu Reeves est le Mediateur par excellence : discret, bienveillant, il traverse Hollywood sans ego apparent. Il evite les conflits, partage ses cachets avec les equipes techniques et reste d'une humilite desarmante. Sa tranquillite n'est pas de l'indifference mais une paix interieure cultivee. Le type 9 cherche l'harmonie — et Keanu semble l'avoir trouvee.",
    funFact: "Il a renonce a plusieurs millions de dollars de son salaire pour que les equipes d'effets speciaux de Matrix soient mieux payees.",
  },
  {
    name: 'Morgan Freeman',
    type: 9,
    photo: 'https://placeholder.com/morgan-freeman.jpg',
    bio: "Morgan Freeman degage une serenite qui apaise tout son entourage — a l'ecran comme dans la vie. Sa voix grave et posee incarne la sagesse tranquille du Mediateur. Il evite les polemiques, les drames publics et les conflits mediatiques. Son talent consiste a etre present sans jamais forcer, a occuper l'espace sans le prendre — la marque du type 9.",
  },
  {
    name: 'Bob Marley',
    type: 9,
    photo: 'https://placeholder.com/bob-marley.jpg',
    bio: "Bob Marley chantait la paix, l'unite et l'harmonie avec une sincerite qui vibrait dans chaque note. Il cherchait a rassembler les gens, a effacer les frontieres et les conflits. Sa musique etait un pont entre les mondes, typique du Mediateur qui refuse la division. Meme face a la violence, il repondait par l'amour — la strategie instinctive du type 9.",
    funFact: "Deux jours apres avoir ete blesse par balle, il a donne un concert pour la paix en Jamaique.",
  },
  {
    name: 'Yoda',
    type: 9,
    photo: 'https://placeholder.com/yoda.jpg',
    bio: "Yoda est un Mediateur cosmique : il enseigne la patience, le lacher-prise et l'equilibre de la Force. Il evite le conflit direct autant que possible et prefere la sagesse a la puissance brute. Sa serenite face au chaos galactique est typique du type 9, qui trouve la paix interieure meme quand le monde exterieur s'effondre. Il guide sans imposer, conseille sans forcer.",
    funFact: "Personnage fictif de l'univers Star Wars, cree par George Lucas.",
  },
];

// ===== EASY QUIZ =====
// Une question par type, trois options, une seule bonne reponse

export const EASY_QUIZ: EasyQuestion[] = [
  {
    type: 1,
    typeDesc: 'Le Perfectionniste — rigoureux, juste, exigeant',
    options: [
      { name: 'Mahatma Gandhi', correct: true },
      { name: 'Robin Williams', correct: false },
      { name: 'Bob Marley', correct: false },
    ],
    explanation:
      "Gandhi etait anime par un sens moral inflexible et une discipline de vie extreme. Il voulait reformer le monde selon des principes de justice — la signature du Perfectionniste.",
  },
  {
    type: 2,
    typeDesc: 'Le Genereux — empathique, aidant, chaleureux',
    options: [
      { name: 'Albert Einstein', correct: false },
      { name: 'Mere Teresa', correct: true },
      { name: 'Cristiano Ronaldo', correct: false },
    ],
    explanation:
      "Mere Teresa a consacre sa vie entiere a aider les plus demunis. Son identite etait intimement liee a son role d'aidante — la definition meme du Genereux.",
  },
  {
    type: 3,
    typeDesc: 'Le Gagneur — ambitieux, performant, oriente succes',
    options: [
      { name: 'Cristiano Ronaldo', correct: true },
      { name: 'Keanu Reeves', correct: false },
      { name: 'Kurt Cobain', correct: false },
    ],
    explanation:
      "Ronaldo mesure sa valeur en buts, trophees et records. Son obsession pour la victoire et son image soigneusement construite sont la signature du Gagneur.",
  },
  {
    type: 4,
    typeDesc: "L'Artiste — sensible, unique, expressif",
    options: [
      { name: 'Bill Gates', correct: false },
      { name: 'Winston Churchill', correct: false },
      { name: 'Frida Kahlo', correct: true },
    ],
    explanation:
      "Frida Kahlo transformait sa souffrance en art avec une intensite saisissante. Sa quete d'authenticite absolue, meme dans la douleur, est la signature de l'Artiste.",
  },
  {
    type: 5,
    typeDesc: "L'Observateur — analytique, detache, curieux",
    options: [
      { name: 'Albert Einstein', correct: true },
      { name: 'Princesse Diana', correct: false },
      { name: 'Jim Carrey', correct: false },
    ],
    explanation:
      "Einstein passait des heures seul a reflechir, preferant les experiences de pensee aux interactions sociales. Son detachement emotionnel et sa clarte intellectuelle sont typiques de l'Observateur.",
  },
  {
    type: 6,
    typeDesc: 'Le Loyal — prudent, fidele, anxieux',
    options: [
      { name: 'Serena Williams', correct: false },
      { name: 'Bilbo Sacquet', correct: true },
      { name: 'Peter Pan', correct: false },
    ],
    explanation:
      "Bilbo adore la securite de son trou de hobbit et redoute l'aventure. Chaque decision est precedee de doutes et d'hesitations, mais sa loyaute envers ses compagnons le pousse a surmonter ses peurs — c'est le courage typique du Loyal.",
  },
  {
    type: 7,
    typeDesc: "L'Aventurier — joyeux, spontane, avide de nouveaute",
    options: [
      { name: 'Robin Williams', correct: true },
      { name: 'Morgan Freeman', correct: false },
      { name: 'Michelle Obama', correct: false },
    ],
    explanation:
      "Robin Williams etait un tourbillon d'energie et d'improvisation. Son esprit bondissait d'une idee a l'autre, fuyant l'ennui et la douleur — le mecanisme central de l'Aventurier.",
  },
  {
    type: 8,
    typeDesc: 'Le Chef — puissant, protecteur, direct',
    options: [
      { name: 'Woody Allen', correct: false },
      { name: 'Winston Churchill', correct: true },
      { name: 'Frida Kahlo', correct: false },
    ],
    explanation:
      "Churchill incarnait une volonte indomptable et un refus absolu de la soumission. Face a l'adversite, il redoublait de force — la reponse instinctive du Chef.",
  },
  {
    type: 9,
    typeDesc: 'Le Mediateur — paisible, harmonieux, conciliant',
    options: [
      { name: 'Beyonce', correct: false },
      { name: 'Mark Zuckerberg', correct: false },
      { name: 'Bob Marley', correct: true },
    ],
    explanation:
      "Bob Marley chantait la paix, l'unite et l'harmonie. Il cherchait a rassembler les gens et a effacer les conflits — la mission naturelle du Mediateur.",
  },
];

// ===== HARD QUIZ =====
// Deviner le type a partir d'une description comportementale

export const HARD_QUIZ: HardQuestion[] = [
  {
    celebrityName: 'Marie Curie',
    bio: "Elle travaillait sans relache avec une rigueur scientifique sans faille, poursuivant la verite avec une discipline monastique. Son exigence envers elle-meme depassait celle qu'elle avait envers les autres. Seule la precision du resultat comptait.",
    correctType: 1,
    explanation:
      "Marie Curie etait une Perfectionniste (type 1) : rigueur absolue, sens du devoir profond et discipline inflexible au service de la verite scientifique.",
  },
  {
    celebrityName: 'Princesse Diana',
    bio: "Elle brisait les protocoles pour serrer des mains, consoler des malades et ecouter ceux que personne ne regardait. Son besoin d'etre aimee etait aussi profond que sa generosite. Quand l'amour ne lui etait pas rendu, elle souffrait en silence.",
    correctType: 2,
    explanation:
      "Diana etait une Genereuse (type 2) : sa capacite a toucher les coeurs et son besoin d'etre aimee en retour sont les marques du type 2.",
  },
  {
    celebrityName: 'Beyonce',
    bio: "Chaque concert est une demonstration de maitrise absolue, chaque album un evenement mondial. Sa discipline de travail est legendaire et rien n'est laisse au hasard. L'image qu'elle projette est toujours celle du succes impeccable.",
    correctType: 3,
    explanation:
      "Beyonce est une Gagneuse (type 3) : sa drive pour le succes, sa discipline acharnee et son image publique soigneusement construite en font l'archetype du type 3.",
  },
  {
    celebrityName: 'Kurt Cobain',
    bio: "Il vivait avec une sensibilite a fleur de peau et se sentait fondamentalement different des autres, incompris et en decalage. Sa creativite jaillissait d'une blessure interieure profonde. Il rejetait le conformisme avec une rage melee de melancolie.",
    correctType: 4,
    explanation:
      "Kurt Cobain etait un Artiste (type 4) : son sentiment d'etre different, sa sensibilite extreme et sa creativite nee de la souffrance sont la signature du type 4.",
  },
  {
    celebrityName: 'Bill Gates',
    bio: "Il absorbe des quantites massives d'information pour les synthetiser en solutions, preferant la logique a l'emotion. Ses semaines de lecture intensive ou il s'isole pour devorer des livres sont legendaires. Il accumule le savoir comme d'autres accumulent les richesses.",
    correctType: 5,
    explanation:
      "Bill Gates est un Observateur (type 5) : sa soif de connaissance, son detachement analytique et ses periodes d'isolement pour penser sont typiques du type 5.",
  },
  {
    celebrityName: 'Woody Allen',
    bio: "Il a fait de l'anxiete un art. Ses oeuvres explorent l'inquietude existentielle, le doute permanent et la recherche de securite dans un monde incertain. Son humour est un mecanisme de defense : rire de ses peurs pour les apprivoiser.",
    correctType: 6,
    explanation:
      "Woody Allen est un Loyal (type 6) : son anxiete perpetuelle, son questionnement existentiel et son utilisation de l'humour comme defense sont la marque du type 6.",
  },
  {
    celebrityName: 'Richard Branson',
    bio: "Il collectionne les aventures : traversees en ballon, entreprises dans tous les domaines, voyages dans l'espace. Son optimisme indestructible et son refus de la routine transforment chaque echec en nouvelle opportunite.",
    correctType: 7,
    explanation:
      "Richard Branson est un Aventurier (type 7) : son optimisme sans limites, sa soif de nouveaute et son refus de la routine sont la signature du type 7.",
  },
  {
    celebrityName: 'Serena Williams',
    bio: "Elle domine avec une puissance brute et une combativite feroce. Elle refuse de se laisser diminuer et lutte contre les prejuges avec la meme energie qu'elle met dans ses coups droits. Sa colere est un carburant inepuisable.",
    correctType: 8,
    explanation:
      "Serena Williams est un Chef (type 8) : sa puissance, sa combativite et sa capacite a transformer la colere en force sont typiques du type 8.",
  },
  {
    celebrityName: 'Keanu Reeves',
    bio: "Il traverse Hollywood sans ego apparent, evitant les conflits et restant d'une humilite desarmante. Il partage ses cachets avec les equipes techniques et cultive une paix interieure remarquable.",
    correctType: 9,
    explanation:
      "Keanu Reeves est un Mediateur (type 9) : sa discretion, son humilite, son evitement des conflits et sa recherche d'harmonie sont la signature du type 9.",
  },
  {
    celebrityName: 'Hermione Granger',
    bio: "Premiere de classe, respectueuse des regles, indignee par l'injustice. Elle corrige ses amis, verifie trois fois ses devoirs et ne supporte pas la paresse intellectuelle. Elle cree meme une association pour defendre les droits des elfes de maison.",
    correctType: 1,
    explanation:
      "Hermione est une Perfectionniste (type 1) : son exigence academique, son sens de la justice et son besoin de reformer le monde sont la signature du type 1.",
  },
  {
    celebrityName: 'Tony Stark (Iron Man)',
    bio: "Brillant et charismatique, il construit des armures toujours plus spectaculaires pour impressionner et prouver sa valeur. Sa plus grande peur est l'insignifiance. Sous le vernis du genie, il se demande s'il est digne d'amour sans ses exploits.",
    correctType: 3,
    explanation:
      "Tony Stark est un Gagneur (type 3) : son besoin d'impressionner, sa peur de l'insignifiance et la confusion entre ce qu'il fait et ce qu'il est sont typiques du type 3.",
  },
  {
    celebrityName: 'Sherlock Holmes',
    bio: "Il collecte les indices et les analyse avec une froideur chirurgicale. Les emotions sont un bruit de fond qui perturbe la raison. Il se retire dans son « palais mental » pour traiter l'information, protegeant son energie interieure a tout prix.",
    correctType: 5,
    explanation:
      "Sherlock Holmes est un Observateur (type 5) : son detachement emotionnel, son besoin d'analyser et sa protection feroce de son espace mental sont la marque du type 5.",
  },
  {
    celebrityName: 'Katniss Everdeen',
    bio: "Elle protege les siens avec une feroce determination et refuse de se soumettre au pouvoir injuste. Elle prend les commandes quand les autres hesitent. Sous son armure de courage et d'independance, elle cache une vulnerabilite profonde.",
    correctType: 8,
    explanation:
      "Katniss est un Chef (type 8) : sa force protectrice, son refus de la soumission et sa vulnerabilite cachee sont la signature du type 8.",
  },
  {
    celebrityName: 'Yoda',
    bio: "Il enseigne la patience, le lacher-prise et l'equilibre. Il evite le conflit direct et prefere la sagesse a la puissance brute. Sa serenite face au chaos est remarquable. Il guide sans imposer, conseille sans forcer.",
    correctType: 9,
    explanation:
      "Yoda est un Mediateur (type 9) : sa serenite, sa sagesse non-directive et son evitement du conflit sont typiques du type 9.",
  },
  {
    celebrityName: 'Billie Eilish',
    bio: "Elle cultive une esthetique sombre et personnelle, explorant les profondeurs de l'angoisse et de la melancolie. Elle refuse les codes de la pop classique et fait de sa difference une identite. Sa musique est un journal intime ou chaque emotion est ressentie avec une intensite presque douloureuse.",
    correctType: 4,
    explanation:
      "Billie Eilish est une Artiste (type 4) : sa quete d'authenticite, son exploration de la melancolie et sa culture de la difference sont la signature du type 4.",
  },
];

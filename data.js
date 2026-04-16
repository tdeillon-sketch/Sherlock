/* ═══════════════════════════════════════════
   SHERLOCK — Données de contenu
   Enneagramme · Quiz · Chapitres
═══════════════════════════════════════════ */

/* ── 9 profils Enneagramme ── */
const PROFILES = [
    {
        id: 1,
        name: "Le Perfectionniste",
        tagline: "J'ai besoin que ce soit bien fait",
        color: "#c0713a",
        desc: "L'enfant de type 1 est intègre, responsable et a un sens aigu du bien et du mal. Il se fixe des standards élevés et peut être très critique envers lui-même lorsqu'il échoue à les atteindre.",
        keys: [
            { title: "Valoriser l'effort, pas seulement le résultat", text: "Dites-lui souvent : « Je suis fier de comment tu as essayé. » L'erreur est une étape, pas un échec." },
            { title: "Lui donner de l'espace pour se détendre", text: "Proposez des activités sans objectif, juste pour le plaisir. Il a besoin d'apprendre que le repos est autorisé." },
            { title: "Éviter les critiques en public", text: "Toujours corriger en privé et avec bienveillance. Sa honte face à l'imperfection est déjà très présente intérieurement." }
        ]
    },
    {
        id: 2,
        name: "L'Altruiste",
        tagline: "J'ai besoin d'être aimé et utile",
        color: "#e87070",
        desc: "L'enfant de type 2 est chaleureux, empathique et aime rendre service. Il cherche à se faire aimer en donnant beaucoup, parfois au détriment de ses propres besoins.",
        keys: [
            { title: "Lui apprendre qu'il peut exprimer ses besoins", text: "Demandez-lui régulièrement : « Et toi, de quoi tu as envie ? » Aidez-le à s'autoriser à recevoir." },
            { title: "Reconnaître sa générosité sans en abuser", text: "Remerciez-le sincèrement et veillez à ce que les autres n'exploitent pas sa serviabilité." },
            { title: "Lui montrer qu'il est aimé inconditionnellement", text: "Multipliez les signes d'affection non liés à ce qu'il fait. « Je t'aime parce que tu es toi. »" }
        ]
    },
    {
        id: 3,
        name: "Le Battant",
        tagline: "J'ai besoin de réussir et d'être admiré",
        color: "#e8a030",
        desc: "L'enfant de type 3 est ambitieux, efficace et adaptable. Il aime réussir et être reconnu pour ses accomplissements. Il peut avoir du mal à simplement « être » sans « faire ».",
        keys: [
            { title: "Valoriser ce qu'il est, pas seulement ce qu'il fait", text: "Faites la distinction : « Je suis fier de toi » (être) vs « Je suis fier de tes résultats » (faire)." },
            { title: "Créer des espaces sans compétition", text: "Proposez des activités familiales où il n'y a ni gagnant ni perdant." },
            { title: "Repérer et nommer ses émotions", text: "Il tend à les mettre de côté au profit de l'action. Aidez-le à s'arrêter et à reconnaître ce qu'il ressent." }
        ]
    },
    {
        id: 4,
        name: "Le Romantique",
        tagline: "J'ai besoin d'être unique et compris",
        color: "#8b5cc0",
        desc: "L'enfant de type 4 est profond, créatif et intensément émotionnel. Il se sent souvent différent des autres et aspire à être vraiment compris dans toute sa singularité.",
        keys: [
            { title: "Accueillir ses émotions sans les minimiser", text: "Ne dites pas « c'est pas grave ». Dites « je comprends que tu ressentes ça très fort »." },
            { title: "Nourrir sa créativité", text: "Art, musique, écriture, théâtre… lui offrir un espace d'expression profonde est essentiel." },
            { title: "L'aider à sortir de la comparaison", text: "Il a souvent l'impression de manquer quelque chose. Aidez-le à voir la richesse de ce qu'il est." }
        ]
    },
    {
        id: 5,
        name: "L'Observateur",
        tagline: "J'ai besoin de comprendre et de préserver mon énergie",
        color: "#5090c0",
        desc: "L'enfant de type 5 est curieux, indépendant et observateur. Il préfère comprendre avant d'agir et a besoin de temps seul pour recharger ses batteries.",
        keys: [
            { title: "Respecter son besoin de solitude", text: "Ce n'est pas un rejet. La solitude est son espace vital pour se ressourcer." },
            { title: "Prévenir à l'avance les changements", text: "Les imprévus sont difficiles pour lui. Expliquez-lui ce qui va se passer et pourquoi." },
            { title: "Valoriser sa curiosité intellectuelle", text: "Encouragez ses centres d'intérêt, même pointus. Sa passion pour un sujet est une richesse." }
        ]
    },
    {
        id: 6,
        name: "Le Loyaliste",
        tagline: "J'ai besoin de sécurité et de confiance",
        color: "#50a870",
        desc: "L'enfant de type 6 est loyal, prudent et attentif aux dangers. Il a besoin de se sentir en sécurité et cherche des repères fiables.",
        keys: [
            { title: "Être cohérent et prévisible", text: "Routines, parole tenue, règles claires : tout ce qui est stable le rassure profondément." },
            { title: "Valider ses inquiétudes sans les amplifier", text: "Dites : « Je comprends que tu aies peur, c'est normal. Et je suis là. »" },
            { title: "L'aider à développer sa confiance en lui", text: "Rappelez-lui ses réussites passées. « Tu te souviens ? Tu avais peur et tu y es arrivé. »" }
        ]
    },
    {
        id: 7,
        name: "L'Épicurien",
        tagline: "J'ai besoin de liberté et de possibilités",
        color: "#d4b030",
        desc: "L'enfant de type 7 est enthousiaste, créatif et aime explorer de nouvelles idées. Il évite la douleur et la monotonie, et peut avoir du mal à finir ce qu'il commence.",
        keys: [
            { title: "Transformer les contraintes en aventures", text: "« D'abord les devoirs, après on invente un jeu ensemble. » Le positif l'aide à accepter l'effort." },
            { title: "L'aider à finir ce qu'il commence", text: "Pas par punition, mais par découverte : « Imagine ce que tu vas ressentir quand tu auras fini ? »" },
            { title: "Nommer la douleur au lieu de la fuir", text: "Il tend à reframer le négatif. Aidez-le à rester présent à la tristesse et à la déception." }
        ]
    },
    {
        id: 8,
        name: "Le Protecteur",
        tagline: "J'ai besoin de contrôle et d'intensité",
        color: "#c04040",
        desc: "L'enfant de type 8 est fort, direct et indépendant. Il aime avoir le contrôle et peut réagir avec intensité face à l'injustice.",
        keys: [
            { title: "Ne jamais le confronter frontalement en public", text: "Il vit cela comme une attaque et répondra par l'escalade. Toujours seul à seul." },
            { title: "Lui donner des responsabilités réelles", text: "Il a besoin de se sentir capable et utile. Confiez-lui des tâches sérieuses." },
            { title: "L'aider à accéder à sa vulnérabilité", text: "Derrière la force se cache une grande sensibilité. Créez des moments de douceur." }
        ]
    },
    {
        id: 9,
        name: "Le Médiateur",
        tagline: "J'ai besoin de paix et d'harmonie",
        color: "#5aacba",
        desc: "L'enfant de type 9 est doux, accommodant et aime l'harmonie. Il peut avoir du mal à exprimer ses désirs et à prendre des décisions.",
        keys: [
            { title: "L'encourager à exprimer son opinion", text: "Posez-lui des questions directes et respectez ses réponses." },
            { title: "Éviter de surcharger ses journées", text: "Il a besoin de temps libre non structuré pour se retrouver." },
            { title: "L'aider à reconnaître sa colère", text: "Il refoule souvent ses désaccords. Apprenez-lui que la colère est une information utile, pas un danger." }
        ]
    }
];


/* ── Questions du quiz ── */
const QUIZ = [
    {
        category: "À la maison",
        question: "Après l'école, votre enfant rentre en général…",
        options: [
            { text: "Il range ses affaires et fait ses devoirs sans qu'on lui demande.", types: [1] },
            { text: "Il vient chercher un câlin et demande si on a besoin d'aide.", types: [2] },
            { text: "Il parle tout de suite de ce qu'il a réussi.", types: [3] },
            { text: "Il est dans sa bulle, un peu mélancolique ou rêveur.", types: [4] },
            { text: "Il va directement dans sa chambre pour être seul.", types: [5] },
            { text: "Il vérifie l'emploi du temps et pose des questions sur le programme.", types: [6] },
            { text: "Il propose aussitôt une nouvelle idée ou un projet amusant.", types: [7] },
            { text: "Il arrive avec énergie et raconte ce qui l'a énervé ou enthousiasmé.", types: [8] },
            { text: "Il s'installe tranquillement, sans bruit particulier.", types: [9] }
        ]
    },
    {
        category: "Face à l'erreur",
        question: "Quand votre enfant fait une erreur ou échoue, il…",
        options: [
            { text: "Se critique sévèrement et veut recommencer jusqu'à faire bien.", types: [1] },
            { text: "Cherche du réconfort et a besoin qu'on lui dise qu'on l'aime quand même.", types: [2] },
            { text: "Minimise vite l'échec et parle déjà de la prochaine réussite.", types: [3] },
            { text: "Vit la chose intensément, parfois longtemps.", types: [4] },
            { text: "Analyse ce qui s'est passé en détail, seul.", types: [5] },
            { text: "S'inquiète de ce que les autres vont penser.", types: [6] },
            { text: "Passe rapidement à autre chose pour éviter la déception.", types: [7] },
            { text: "Réagit fortement, puis en tire une leçon rapidement.", types: [8] },
            { text: "Encaisse sans trop le montrer, mais ça reste en lui.", types: [9] }
        ]
    },
    {
        category: "En groupe",
        question: "Dans un groupe d'enfants, votre enfant…",
        options: [
            { text: "Veille à ce que les règles soient respectées.", types: [1] },
            { text: "S'occupe de tout le monde, s'assure que personne n'est exclu.", types: [2] },
            { text: "Prend facilement le devant et aime être remarqué.", types: [3] },
            { text: "Observe et attend d'être vraiment compris avant de s'ouvrir.", types: [4] },
            { text: "Préfère écouter plutôt que parler.", types: [5] },
            { text: "S'assure que tout le monde s'entend bien.", types: [6] },
            { text: "Anime et entraîne les autres dans ses idées.", types: [7] },
            { text: "S'affirme naturellement et défend les plus faibles.", types: [8] },
            { text: "Se fond dans le groupe, évite les confrontations.", types: [9] }
        ]
    },
    {
        category: "Face à l'injustice",
        question: "Quand quelque chose lui paraît injuste, votre enfant…",
        options: [
            { text: "Le dit clairement et tient sa position jusqu'à ce que ça soit corrigé.", types: [1] },
            { text: "Cherche à arranger les choses pour que tout le monde soit content.", types: [2] },
            { text: "Gère ça discrètement pour ne pas perdre la face.", types: [3] },
            { text: "Ressent la chose très fort et met du temps à s'en remettre.", types: [4] },
            { text: "Analyse la situation avant de réagir.", types: [5] },
            { text: "S'inquiète des conséquences avant d'agir.", types: [6] },
            { text: "Détourne l'attention avec humour ou une autre idée.", types: [7] },
            { text: "Réagit fort et immédiatement.", types: [8] },
            { text: "Évite le conflit et s'efface.", types: [9] }
        ]
    },
    {
        category: "Ce qui le rend fier",
        question: "Votre enfant est le plus fier de lui quand…",
        options: [
            { text: "Il a fait quelque chose parfaitement, sans fautes.", types: [1] },
            { text: "Il a aidé quelqu'un qui lui a dit merci avec gratitude.", types: [2] },
            { text: "Il a atteint un objectif ou gagné quelque chose.", types: [3] },
            { text: "Il a créé quelque chose d'unique ou été vraiment compris.", types: [4] },
            { text: "Il a maîtrisé un sujet difficile ou trouvé une réponse.", types: [5] },
            { text: "Il a tenu une promesse ou été loyal.", types: [6] },
            { text: "Il a vécu une nouvelle expérience ou fait rire tout le monde.", types: [7] },
            { text: "Il a protégé quelqu'un ou montré sa force.", types: [8] },
            { text: "Tout le monde était heureux et en paix autour de lui.", types: [9] }
        ]
    }
];


/* ── Structure du livre (chapitres) ── */
const CHAPTERS = [
    {
        part: "Partie 1 — Se connaître soi-même",
        chapters: [
            { num: 1, title: "Le père que je croyais être", desc: "L'écart entre l'image idéale du parent et la réalité quotidienne." },
            { num: 2, title: "L'Enneagramme comme miroir", desc: "Pourquoi connaître son profil change tout dans la relation parent-enfant." }
        ]
    },
    {
        part: "Partie 2 — Comprendre son enfant",
        chapters: [
            { num: 3, title: "Les 9 manières d'être enfant", desc: "Portrait des 9 types : peur fondamentale, désir profond, comportement caractéristique." },
            { num: 4, title: "À chaque âge, son langage", desc: "Comment le profil s'exprime de 0 à 3 ans, 4-7 ans, 8-12 ans, et à l'adolescence." },
            { num: 5, title: "Ce que l'enfant ne dit pas", desc: "Décoder les comportements difficiles comme des messages sur un besoin non satisfait." }
        ]
    },
    {
        part: "Partie 3 — La relation en pratique",
        chapters: [
            { num: 6, title: "3 clés d'accompagnement par profil", desc: "Des gestes concrets, adaptés à chaque type, pour mieux accompagner au quotidien." },
            { num: 7, title: "Quand les profils se heurtent", desc: "Les dynamiques entre profils parent-enfant et comment y remédier." },
            { num: 8, title: "Les moments de crise", desc: "Que faire quand ça déraille ? Protocoles bienveillants adaptés à chaque profil." }
        ]
    },
    {
        part: "Partie 4 — Grandir ensemble",
        chapters: [
            { num: 9, title: "Le parent imparfait et assumé", desc: "Accepter ses propres limites comme condition d'une parentalité plus authentique." },
            { num: 10, title: "Ce que mes enfants m'ont appris", desc: "Le voyage intérieur que représente la parentalité." }
        ]
    }
];


/* ── Suggestions de questions pour l'IA ── */
const QA_SUGGESTIONS = [
    "Mon enfant perfectioniste pleure quand il fait une erreur, comment réagir ?",
    "Comment créer du lien avec un enfant très indépendant ?",
    "Mon enfant est anxieux à l'idée d'aller à l'école, que faire ?",
    "Comment aider un enfant qui ne sait pas exprimer ce qu'il veut ?",
    "Quelle est la différence entre le type 1 et le type 6 ?"
];

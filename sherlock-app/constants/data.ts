// ===== ENNEAGRAM TYPE DATA =====
export const TYPES = [
    {
        num: 1,
        name: "Le Perfectionniste",
        color: "#7b8e6e",
        short: "Un sens aigu du bien et du mal, un besoin d'ordre et de justice.",
        fear: "Ne pas être assez bon, faire mal",
        need: "Ordre, justesse, intégrité",
        metaphor: "Le Perfectionniste est comme un fil a plomb — cet outil que les macons utilisent pour verifier qu'un mur est droit. L'enfant de type 1 evalue constamment : c'est juste ou faux, c'est bien ou mal. Cette capacite innee en fait un etre de justice, un gardien d'integrite. Mais elle peut aussi devenir lourde. Le type 1 se demande sans cesse : « Suis-je assez bon ? »",
        integration: {
            toward: 7,
            desc: "En securite, le Perfectionniste integre vers le type 7 : il deverrouille sa joie, sa spontaneite, son humour. La pression interne se relache. Il se permet de rire de ses erreurs et de jouer sans but."
        },
        disintegration: {
            toward: 4,
            desc: "Sous stress, le type 1 desintegre vers le type 4 : la critique interne devient devastatrice. L'enfant se retire, devient morose, melancolique. Il sent que tout est sa faute."
        },
        ages: {
            "5-8": "A cet age, le type 1 range ses jouets avec methode, a des cahiers impeccables (pas une rature !), et vous signale vos incoherences avec aplomb. « Ce n'est pas juste ! » est sa phrase phare — non par jalousie, mais par un vrai sens de la justice.",
            "8-12": "Le Perfectionniste devient plus rigide. Les resultats scolaires deviennent une affaire personnelle. La frustration est un affect majeur : les choses devraient etre mieux. Il developpe une relation au self-improvement intense et peut etre dur envers lui-meme et les autres.",
            "13-16": "L'idealisme rencontre la realite. L'adolescent peut devenir un militant fervent ou se replier sur sa culpabilite. Certains se jettent dans des causes (ecologie, justice sociale), d'autres internalisent tout jusqu'au burn-out."
        },
        keys: [
            { title: "Validez ses standards sans les reproduire", desc: "Ecoutez-le avec serieux quand il signale une injustice. Dites : « Tu as remarque quelque chose d'important. Merci. » Mais ne l'autorisez pas a transformer la famille en tribunal permanent. L'excellence est une orientation, pas une prison." },
            { title: "Offrez-lui des espaces d'imperfection", desc: "Creez des moments ou les erreurs sont invitees. Jouez a des jeux ou vous faites expres de perdre. Montrez que vous etes imparfait et que c'est o.k. Ces memoires d'imperfection partagee sont des graces pour un type 1." },
            { title: "Valorisez la tentative plus que la perfection", desc: "Quand il doute — « Mais et si j'echoue ? » — dites : « Je suis fier de toi pour avoir essaye, independamment du resultat. » Celebrez le courage plus que la victoire." }
        ],
        wings: "Type 9 (le reveur silencieux) et Type 2 (l'aidant donne)"
    },
    {
        num: 2,
        name: "Le Genereux",
        color: "#c0713a",
        short: "Une generosite naturelle, un besoin d'etre aime.",
        fear: "Ne pas être aimé, être inutile",
        need: "Être aimé et reconnu pour sa générosité",
        metaphor: "Un type 2, c'est comme une source. Elle jaillit naturellement, pour abreuver ceux autour d'elle. L'enfant de type 2 a cette qualite innee de sentir les autres, de vouloir les aider, de trouver sa place en etant utile. Mais cette generosite peut devenir une prison : la source a besoin d'etre remerciee. Quand le retour ne vient pas, la source s'asseche.",
        integration: {
            toward: 4,
            desc: "En securite, le Genereux integre vers le type 4 : il decouvre son monde affectif propre, ses passions veritables, son authenticite. Il ose etre vrai, pas pour plaire mais pour exister."
        },
        disintegration: {
            toward: 8,
            desc: "Sous stress, le type 2 desintegre vers le type 8 : le petit aidant se transforme en contremaitre. L'enfant devient agressif, manipulateur, exigeant."
        },
        ages: {
            "5-8": "C'est le petit aidant qui offre des dessins faits pour vous avec fierte. A l'ecole, c'est le « chouchou » qui aide volontiers et console les autres. Il remarque quand vous etes triste et insiste : « Maman, ca va ? »",
            "8-12": "La generosite se teinte de ressentiment. L'enfant a du mal a dire non. Il neglige ses propres besoins pour ceux des autres. Une colere sous-jacente peut apparaitre quand il ne se sent pas apprecie.",
            "13-16": "Explosion sociale et confusion interieure. Qui suis-je en dehors de ce qu'on attend de moi ? L'adolescent peut devenir un helper hyperactif ou se retirer, deprime, se sentant inutile."
        },
        keys: [
            { title: "Aimez-le sans condition sur son utilite", desc: "Dites regulierement : « Je t'aime parce que tu existes, pas parce que tu m'aides. » Pour le type 2, c'est une revelation. C'est une guerison." },
            { title: "Aidez-le a decouvrir ses propres desirs", desc: "Posez des questions : « Qu'est-ce que TOI tu aimerais faire ? » Creez des espaces ou il est invite a penser a lui-meme, sans compromis, sans souci des autres." },
            { title: "Enseignez-lui que dire non, c'est un acte d'amour", desc: "« Si tu dis oui alors que tu veux dire non, tu souffres. Un ami qui t'aime veut que tu dises ce que tu sens. » Normaliser le non est un cadeau pour la vie du type 2." }
        ],
        wings: "Type 1 (le consciencieux) et Type 3 (le performeur)"
    },
    {
        num: 3,
        name: "Le Gagneur",
        color: "#d4a03c",
        short: "Une energie tournee vers la reussite, un besoin de reconnaissance.",
        fear: "Ne pas avoir de valeur sans résultats",
        need: "Reconnaissance et admiration",
        metaphor: "Un type 3, c'est celui qui brille. Naturellement. Comme une etoile, il attire le regard. L'enfant de type 3 a cette capacite innee a performer, a reussir. Mais il y a un prix cache : le type 3 risque de confondre ce qu'il fait avec ce qu'il est. Il vit dans la peur secrete de ne pas etre assez si les resultats disparaissent.",
        integration: {
            toward: 6,
            desc: "En securite, le Gagneur integre vers le type 6 : il commence a faire confiance, devient plus loyal, plus dispose a travailler sans besoin de briller seul. Il decouvre qu'il peut etre vrai, pas juste efficace."
        },
        disintegration: {
            toward: 9,
            desc: "Sous stress, le type 3 desintegre vers le type 9 : l'enfant devient apathique, deconnecte, engourdi. Le brille disparait derriere une torpeur de resignation."
        },
        ages: {
            "5-8": "Le type 3 brille simplement. Il fait rire, gagne, reussit a l'ecole sans effort apparent. Il cherche a impressionner les adultes et veut etre reconnu pour ses accomplissements.",
            "8-12": "La competition s'intensifie. L'enfant commence a adapter son image au public. Il peut devenir tres oriente vers les resultats et avoir du mal a supporter l'echec.",
            "13-16": "L'adolescent est absorbe par son image. La pression d'excellence peut mener a l'epuisement. Le type 3 peut se perdre dans la performance et oublier qui il est vraiment."
        },
        keys: [
            { title: "Separez votre amour de ses resultats", desc: "Quand il ramene une mauvaise note, ne dites pas « Je suis decu. » Dites : « Je t'aime. Parlons de ce qui s'est passe. » Celebrez qu'il existe, pas ce qu'il fait." },
            { title: "Encouragez l'echec comme une donnee, pas une catastrophe", desc: "Racontez vos propres echecs, vos peurs, vos maladresses. Montrez que vous etes imparfait et que c'est correct. L'echec n'est pas une identite, c'est un evenement." },
            { title: "Creez des espaces de non-performance", desc: "Une soiree sans ecran ou vous parlez simplement. Une balade ou il n'y a rien a faire, rien a gagner, rien a prouver. Peu a peu, l'enfant apprend que vous aimez sa presence, non sa productivite." }
        ],
        wings: "Type 2 (l'aide) et Type 4 (le sensible)"
    },
    {
        num: 4,
        name: "L'Artiste",
        color: "#8b6ca7",
        short: "Une sensibilite profonde, un besoin d'etre compris.",
        fear: "Être banal, ne pas être compris",
        need: "Authenticité et singularité",
        metaphor: "L'enfant qui sent tout. Pas seulement les evenements — les non-dits, la tristesse de l'invisible. Le Type 4 nait avec la conviction sourde d'etre different : le mauvais mot dans la chanson. Et cette sensation le pousse vers sa plus grande force : l'authenticite. Mais d'abord, elle le rend seul.",
        integration: {
            toward: 1,
            desc: "En integration vers le type 1, la profondeur emotionnelle trouve une structure. L'enfant canalise ses emotions en action : il peint avec discipline, ecrit avec precision. L'authenticite ne signifie plus isolement ; elle devient contribution."
        },
        disintegration: {
            toward: 2,
            desc: "En desintegration vers le type 2, il devient etouffant, cherchant desesperement a etre aime, oubliant qui il etait vraiment. Il change de couleur comme un cameleon."
        },
        ages: {
            "5-8": "L'enfant pleure facilement, non de colere mais de sensation. Un camarade qui ne l'invite pas devient la preuve qu'il est fondamentalement « pas invitable ». Il cree des univers de papier pour y habiter quand le monde reel le blesse.",
            "8-12": "La sensation devient conviction. L'Artiste regarde les autres enfants avec une envie melee d'incomprehension. Il devient specialiste de l'absence et peut confondre solitude et profondeur. Les questions existentielles apparaissent.",
            "13-16": "Les vagues d'emotion s'amplifient. Un jour, il est creatif et passionne. Le lendemain, il plonge dans une melancolie dense. Sous le drame, il y a une quete de verite. L'Artiste refuse les mensonges polis du quotidien."
        },
        keys: [
            { title: "Tes emotions sont reelles, pas dramatiques", desc: "L'Artiste a besoin d'entendre que ce qu'il sent est valide. Il doit aussi apprendre qu'authenticite ne signifie pas isolement. On peut etre vrai ET relie. Sensible ET courageux." },
            { title: "Ta difference est ton chemin, pas ta prison", desc: "Aidez-le a transformer son sentiment d'etrangete en quete creatrice. Montrez-lui d'autres personnes qui ont ete differentes et qui ont eu un impact. Aidez-le a trouver sa tribu." },
            { title: "Reste present quand je m'enferme", desc: "L'Artiste se retire dans ses univers. C'est sain. Mais il a besoin de savoir qu'on ne l'oublie pas. Pas de l'y forcer a sortir, mais de l'inviter regulierement avec douceur." }
        ],
        wings: "Type 3 (l'ambitieux) et Type 5 (le penseur)"
    },
    {
        num: 5,
        name: "L'Observateur",
        color: "#5b8a9a",
        short: "Une curiosite insatiable, un besoin de comprendre.",
        fear: "Être incompétent, être envahi",
        need: "Comprendre et préserver son énergie",
        metaphor: "L'Observateur regarde le monde de loin, ecoute plus qu'il ne parle, construit des systemes mentaux labyrinthiques pour comprendre comment les choses fonctionnent. Il ne veut pas participer. Il veut voir. Il veut savoir. Et il veut qu'on le laisse tranquille pour le faire. Ce besoin d'espace est sa signature — et souvent son enigme pour ceux qui l'aiment.",
        integration: {
            toward: 8,
            desc: "En integration vers le type 8, il sort de sa tour. Tout son savoir, il le transforme en action. Il devient assertif, confiant, capable de faire connaitre son expertise au monde."
        },
        disintegration: {
            toward: 7,
            desc: "En desintegration vers le type 7, il s'eparpille en distractions : saute d'un interet a l'autre, devient hyperactif, fuit dans les ecrans et les stimulations."
        },
        ages: {
            "5-8": "Il regarde les autres jouer avec une curiosite detachee. Il pose des questions qui prennent les adultes au depourvu. Les invitations anniversaire sont des calvaires — trop d'enfants, trop de bruit. Les livres deviennent ses amis.",
            "8-12": "Il devient un expert dans un ou deux domaines qu'il a decide de comprendre a fond. Les autres enfants trouvent son expertise fascinante pendant cinq minutes puis s'ennuient. Il a besoin d'espace pour fonctionner.",
            "13-16": "L'independance intellectuelle. Il questionne tout. La peur de l'incompetence peut s'installer : la peur que tout son savoir ne suffit pas, qu'il n'est qu'un imposteur dans sa propre tour."
        },
        keys: [
            { title: "La solitude n'est pas un symptome a guerir", desc: "Respectez l'espace de votre Observateur. Ne le forcez pas a participer juste pour participer. Mais assurez-vous qu'il est seul de facon saine — qu'il apprend, qu'il explore, qu'il grandit." },
            { title: "Ta connaissance vaut quelque chose", desc: "Validez son expertise. Creez des espaces ou son savoir compte. Encouragez-le a partager d'une facon qui le satisfait — pas pour impressionner, mais pour communiquer veritablement." },
            { title: "Le coeur existe, meme derriere l'intellect", desc: "Il n'est pas froid. Il est prudent sur le plan emotionnel. Il a besoin de savoir qu'il est securitaire de descendre de la tour. Que l'amour peut etre vrai meme quand il est difficile a exprimer." }
        ],
        wings: "Type 4 (le sensible) et Type 6 (le prudent)"
    },
    {
        num: 6,
        name: "Le Loyal",
        color: "#6b7b8e",
        short: "Une vigilance permanente, un besoin de securite.",
        fear: "Être abandonné, trahi, sans repères",
        need: "Sécurité et confiance",
        metaphor: "Le Loyal scanne en permanence l'horizon. Quelque chose va-t-il mal ? Sommes-nous en securite ? Il pose des questions que les autres enfants ne posent pas. Il remarque les tensions que les adultes pensent cachees. C'est un enfant loyal, fidele, qui ferait tout pour proteger ceux qu'il aime. Et qui construit un comite interieur de voix qui discutent : « Mais et si... ? »",
        integration: {
            toward: 9,
            desc: "En integration vers le type 9, la vigilance se relache. Il apprend a faire confiance — aux autres et surtout a lui-meme. Il trouve une stabilite interieure, une tranquillite qui transforme sa prudence en sagesse."
        },
        disintegration: {
            toward: 3,
            desc: "En desintegration vers le type 3, il construit une facade irreprochable. Il devient performant, competitif, obsede par l'image. Il sacrifie son ame pour une securite qui ne vient jamais."
        },
        ages: {
            "5-8": "Il approche le monde avec prudence. Nouvelle baby-sitter ? Il a besoin de temps. Il pose des questions surprenantes : « Est-ce qu'on va mourir ? » Il existe deux formes : le Loyal « phobique » qui obeit, et le « contre-phobique » qui defie.",
            "8-12": "L'anxiete fait surface. Un bourdonnement constant de « et si... ? ». Il peut devenir perfectionniste pour se securiser. Dans les amities, il cherche des preuves de loyaute. Mais il montre aussi un vrai don pour le courage.",
            "13-16": "Il remet en question tout : les autorites, les parents, les systemes. Le groupe devient crucial. Il peut suivre le groupe juste pour etre accepte. Il a besoin de points d'ancrage et de la certitude de votre amour."
        },
        keys: [
            { title: "Ta peur est reelle. Je suis fiable.", desc: "Le Loyal a besoin de coherence. Si vous dites quelque chose, faites-le. Si vous promettez, tenez. Si vous faites une erreur, reconnaissez-la. Il construit sa confiance brique par brique, et chaque incoherence detruit ce qu'il a construit." },
            { title: "Ton doute ne veut pas dire que tu es faible", desc: "Au lieu de tenter de le guerir de son doute, apprenez-lui a y vivre. « Tu doutes. C'est qui tu es. Tu peux douter et agir de toute facon. » C'est un courage qu'il faut cultiver." },
            { title: "Tu as besoin d'appartenance, pas de perfection", desc: "Donnez-lui une tribu ou il peut etre authentique. Montrez-lui qu'il vous appartient, inconditionnellement. C'est la securite dont il a vraiment besoin." }
        ],
        wings: "Type 5 (le penseur) et Type 7 (l'optimiste)"
    },
    {
        num: 7,
        name: "L'Aventurier",
        color: "#d4853c",
        short: "Un enthousiasme debordant, un besoin de liberte.",
        fear: "Souffrir, être privé, s'ennuyer",
        need: "Liberté et possibilités",
        metaphor: "L'enfant qui semble emettre sa propre lumiere, qui illumine la piece par sa seule presence. Il a des idees en permanence, des projets qui se bousculent comme des oiseaux. L'ennui, c'est comme retenir son souffle : possible quelques secondes, mais contre nature. L'Aventurier vit pour l'instant, pour la possibilite. C'est magnifique. C'est aussi epuisant.",
        integration: {
            toward: 5,
            desc: "En integration vers le type 5, il decouvre la profondeur. Il commence a creuser au lieu de danser a la surface. Le temps d'attention s'allonge. C'est l'age d'or de l'Aventurier en sante."
        },
        disintegration: {
            toward: 1,
            desc: "En desintegration vers le type 1, l'enfant devient rigide, critique, perfectionniste. L'optimisme devient cynisme. Le mouvement devient paralysie."
        },
        ages: {
            "5-8": "Mille projets des le lundi matin. Piano le lundi, escalade le mardi, botanique le mercredi. Il peut commencer cinq projets et en terminer aucun. Mais il transforme le repas en fete et le trajet en aventure. L'anxiete ? Il l'esquive.",
            "8-12": "Le papillon social : toujours en mouvement, invite a chaque fete. La FOMO s'installe. La concentration a l'ecole est un defi — non par incapacite, mais par probleme de selection de ce qui merite son attention.",
            "13-16": "Il veut tout vivre, tout essayer. Les risques deviennent concrets. Mais c'est aussi l'enfant qui reve de changer le monde et qui inspire les autres par son optimisme."
        },
        keys: [
            { title: "De la structure, mais pas trop", desc: "L'Aventurier a besoin de limites pour etre libre. Des limites claires sur les ecrans, les activites, le sommeil. Mais laissez de la place pour la spontaneite. C'est l'equilibre qui compte." },
            { title: "Aidez-le a terminer les choses", desc: "Non en le forcant, mais en restant present. L'Aventurier a besoin de sentir que laisser briller longtemps, c'est magique — pas seulement l'etincelle du debut." },
            { title: "Nommez l'evitement", desc: "« Je remarque que quand c'est difficile, tu changes de sujet. C'est normal. Mais ensemble, on peut apprendre a rester un peu meme quand c'est moins brillant. » L'Aventurier a besoin d'apprendre la profondeur par la decouverte." }
        ],
        wings: "Type 6 (le prudent) et Type 8 (le leader)"
    },
    {
        num: 8,
        name: "Le Chef",
        color: "#9b4a4a",
        short: "Une force tranquille (ou pas si tranquille), un besoin de controle.",
        fear: "Être contrôlé, montrer sa faiblesse",
        need: "Contrôle, justice et intensité",
        metaphor: "L'enfant qui prend de la place. Pas toujours mechamment, mais avec une presence qui se fait sentir. Il sait ce qu'il veut. Il voit les dynamiques de pouvoir instinctivement. Le monde est fait de forts et de faibles, et le Chef refuse d'etre du mauvais cote — pas pour lui, mais pour sa tribu, les petits qu'il a pris sous son aile.",
        integration: {
            toward: 2,
            desc: "En integration vers le type 2, le plus dur devient accessible : la tendresse. Le Chef apprend a montrer sa vulnerabilite, a demander de l'aide. Le guerrier decouvre qu'aimer peut etre plus puissant que dominer."
        },
        disintegration: {
            toward: 5,
            desc: "En desintegration vers le type 5, c'est l'isolement total. L'enfant devient silencieux, soupconneux, froid. La confiance disparait. Il construit des mondes paranoiaques dans sa tete."
        },
        ages: {
            "5-8": "Des quatre ans, il refuse de se coucher sans explication. L'autorite, pour le Chef, ca se gagne. Il protege les autres enfants et a un sens de la justice instinctif. Les crises sont spectaculaires — mais c'est une inebranlable honnetete.",
            "8-12": "Le chef de meute. Leader naturel du groupe, il decide ou aller et a quoi jouer. Les confrontations avec l'autorite scolaire apparaissent. La vulnerabilite ? Il la cache comme un secret honteux.",
            "13-16": "Une force de nature. L'intensite monte. Pensee binaire : fort ou faible, loyal ou traitre. Il peut blesser par la force de sa presence, ou se lever contre l'injustice. Derriere tout cela : une peur terrifiante d'etre controle."
        },
        keys: [
            { title: "Soyez plus fort, mais juste", desc: "Le Chef teste l'autorite parce qu'il en a besoin. Soyez ferme, coherent, impartial, sans ironie ni dedain. Si vous montrez de la force tranquille avec integrite, le Chef s'apaisera." },
            { title: "Creez de l'espace pour la vulnerabilite", desc: "Non pas en l'exigeant, mais en la nommant. « J'ai remarque que c'est difficile de dire quand tu as peur. Mais admettre qu'on a besoin d'aide, c'est le contraire de la faiblesse. »" },
            { title: "Reconnaissez le bien qu'il fait", desc: "Le Chef protege les autres. Nommez-le : « Tu as defendu ce garcon que personne ne regardait. C'est beau. » Le Chef a besoin de savoir que sa force peut etre une beaute, pas seulement une menace." }
        ],
        wings: "Type 7 (l'energique) et Type 9 (le pacifique)"
    },
    {
        num: 9,
        name: "Le Mediateur",
        color: "#7a9a7b",
        short: "Une douceur apaisante, un besoin d'harmonie.",
        fear: "Le conflit, être insignifiant",
        need: "Paix, harmonie et connexion",
        metaphor: "L'enfant qui apaise. Il entre dans une piece et on sent une detente. Le ton baisse. Les voix se font plus douces. Le Mediateur n'a pas besoin de faire grand-chose. Il existe, et cela suffit. Il a une capacite d'absorption extraordinaire : il absorbe les joies, les tristesses, les conflits. Mais sous la surface lisse, les courants peuvent etre complexes.",
        integration: {
            toward: 3,
            desc: "En integration vers le type 3, l'enfant commence a avoir des objectifs. Un mouvement intentionnel. Il decouvre qu'il peut vouloir, poursuivre, reussir quelque chose. Il devient actif au lieu de reactif."
        },
        disintegration: {
            toward: 6,
            desc: "En desintegration vers le type 6, l'apaisement devient anxiete. L'enfant devient soupconneux et craintif, imaginant les pires scenarios, doutant de ce qui etait autrefois evident."
        },
        ages: {
            "5-8": "L'enfant « facile » qui dit toujours oui. Pas de crises, pas de conflits. Mais il y a une forme de resistance passive — le Mediateur ne dit pas non par politesse, mais parce qu'il a compris que c'est plus securisant. Il a un sens extraordinaire de l'empathie.",
            "8-12": "Le mediateur invisible. Il flotte, sympathique a tout groupe, mais sans vraiment appartenir a aucun. Il risque de se perdre dans les autres. La procrastination s'installe : s'engager ressemble a choisir une identite.",
            "13-16": "Le Mediateur commence a se demander « Et moi ? » et cette question est terrifiante. Il est vulnerable aux pressions des pairs. Mais c'est aussi l'age ou il peut trouver sa voix, s'il est accompagne avec douceur."
        },
        keys: [
            { title: "Posez des questions, pas des attentes", desc: "Ne demandez pas « Qu'est-ce que tu veux ? » avec l'attente d'une reponse immediate. Posez et attendez. Le Mediateur doit apprendre lentement qu'avoir une preference est normal et autorise." },
            { title: "Validez ses limites molles", desc: "Quand le Mediateur dit « je ne suis pas sur » ou « peut-etre », c'est une limite, pas une indecision. Respectez-la. Il doit apprendre que s'affirmer ne signifie pas blesser les autres." },
            { title: "Connectez-le a lui-meme, pas aux autres", desc: "Aidez-le a distinguer : ce qui vient de lui, ce qui vient de sa mere, ce qui vient de son groupe. « Ceci est ce que TU ressens. Ceci est ce que TU crois. Ceci est ce que TU veux. »" }
        ],
        wings: "Type 8 (le protecteur) et Type 1 (le consciencieux)"
    }
];

// ===== QUIZ QUESTIONS =====
// Hybrid quiz: behavioral 'choice' questions + 'slider' questions
// Format: type = 'choice' | 'slider', category, situation?, q, a? (for choice), sliderLeft/sliderRight/sliderScores? (for slider)
export interface QuizQuestion {
    type: 'choice' | 'slider';
    category: string;
    situation?: string;
    q: string;
    // For type 'choice':
    a?: { text: string; emoji?: string; scores: Record<number, number> }[];
    // For type 'slider':
    sliderLeft?: string;
    sliderRight?: string;
    sliderScores?: { low: Record<number, number>; high: Record<number, number> };
}

export const QUIZ: QuizQuestion[] = [
    // --- 12 BEHAVIORAL CHOICE QUESTIONS ---
    {
        type: 'choice',
        category: "Après l'école",
        situation: "Votre enfant rentre de l'école avec un dessin fait en classe.",
        q: "Que fait-il avec son dessin ?",
        a: [
            { text: "Il le regarde d'un œil critique et pointe ce qu'il aurait dû mieux faire", emoji: "🎯", scores: {1: 2} },
            { text: "Il vous l'offre avec fierté, guettant votre réaction de bonheur", emoji: "💝", scores: {2: 2} },
            { text: "Il l'agite en riant, déjà lancé sur trois autres projets", emoji: "🎨", scores: {7: 2} }
        ]
    },
    {
        type: 'choice',
        category: "Au parc",
        situation: "Un autre enfant prend le jouet de votre enfant.",
        q: "Comment réagit-il ?",
        a: [
            { text: "Il reprend le jouet avec autorité : « C'est le mien. »", emoji: "💪", scores: {8: 2} },
            { text: "Il propose de jouer ensemble plutôt que de se disputer", emoji: "🤝", scores: {9: 2} },
            { text: "Il cherche un adulte des yeux pour savoir quoi faire", emoji: "👀", scores: {6: 2} }
        ]
    },
    {
        type: 'choice',
        category: "Face au changement",
        situation: "Vous annoncez un changement de programme inattendu.",
        q: "Comment réagit votre enfant ?",
        a: [
            { text: "Il s'enthousiasme : « Chouette, une aventure ! »", emoji: "✨", scores: {7: 2} },
            { text: "Il se ferme, a besoin de temps seul pour digérer l'émotion", emoji: "🌊", scores: {4: 2} },
            { text: "Il pose beaucoup de questions pratiques et veut comprendre les détails", emoji: "🔍", scores: {5: 2} }
        ]
    },
    {
        type: 'choice',
        category: "En famille",
        situation: "Lors d'un repas de famille animé.",
        q: "Que fait votre enfant ?",
        a: [
            { text: "Il raconte ses exploits de la semaine avec animation", emoji: "⭐", scores: {3: 2} },
            { text: "Il remarque si quelqu'un ne respecte pas les règles de table", emoji: "⚖️", scores: {1: 2} },
            { text: "Il sourit, acquiesce, mange tranquillement", emoji: "☮️", scores: {9: 2} }
        ]
    },
    {
        type: 'choice',
        category: "L'exposé",
        situation: "Votre enfant doit présenter un exposé devant sa classe.",
        q: "Comment s'y prend-il ?",
        a: [
            { text: "Il le prépare méticuleusement et stresse à l'idée de faire une erreur", emoji: "📐", scores: {1: 1, 6: 1} },
            { text: "Il improvise avec brio le jour J, même s'il n'a pas beaucoup préparé", emoji: "🎭", scores: {7: 2} },
            { text: "Il fait des recherches approfondies, bien au-delà de ce qui est demandé", emoji: "📚", scores: {5: 2} }
        ]
    },
    {
        type: 'choice',
        category: "L'ami triste",
        situation: "Un ami de votre enfant est triste.",
        q: "Comment réagit votre enfant ?",
        a: [
            { text: "Il le prend dans ses bras ou propose immédiatement son aide", emoji: "💕", scores: {2: 2} },
            { text: "Il ressent profondément sa tristesse, au point d'en être envahi(e)", emoji: "🎭", scores: {4: 2} },
            { text: "Il lui dit : « T'inquiète pas, je vais régler ça. »", emoji: "🛡️", scores: {8: 2} }
        ]
    },
    {
        type: 'choice',
        category: "Le week-end",
        situation: "Si on lui laisse le choix un samedi matin.",
        q: "Que choisit-il de faire ?",
        a: [
            { text: "Ranger, trier, organiser quelque chose", emoji: "📦", scores: {1: 1, 5: 1} },
            { text: "Essayer quelque chose de nouveau : un sport, un endroit", emoji: "🚀", scores: {7: 2} },
            { text: "Se laisser porter, profiter du rythme des autres", emoji: "🌿", scores: {9: 2} }
        ]
    },
    {
        type: 'choice',
        category: "Face à l'erreur",
        situation: "Votre enfant casse un verre en mettant la table.",
        q: "Comment réagit-il ?",
        a: [
            { text: "Il s'en veut terriblement et se critique sévèrement", emoji: "😰", scores: {1: 2} },
            { text: "Il assume : « Oui, j'ai cassé le verre. Et alors ? »", emoji: "💪", scores: {8: 2} },
            { text: "Il en rit et passe vite à autre chose", emoji: "😄", scores: {7: 1, 3: 1} }
        ]
    },
    {
        type: 'choice',
        category: "En groupe",
        situation: "Dans la cour de récréation.",
        q: "Quel rôle prend votre enfant ?",
        a: [
            { text: "Il s'assure que personne n'est laissé de côté", emoji: "🫂", scores: {2: 2} },
            { text: "Il prend naturellement le leadership du jeu", emoji: "⚡", scores: {3: 1, 8: 1} },
            { text: "Il écoute attentivement mais garde une distance", emoji: "🔭", scores: {5: 2} }
        ]
    },
    {
        type: 'choice',
        category: "La fierté",
        situation: "Votre enfant est le plus fier de lui quand...",
        q: "Qu'est-ce qui le rend le plus fier ?",
        a: [
            { text: "Il a aidé quelqu'un qui l'a remercié avec gratitude", emoji: "🙏", scores: {2: 2} },
            { text: "Il a atteint un objectif ou gagné quelque chose", emoji: "🏆", scores: {3: 2} },
            { text: "Il a créé quelque chose d'unique ou été vraiment compris", emoji: "🎨", scores: {4: 2} }
        ]
    },
    {
        type: 'choice',
        category: "L'injustice",
        situation: "Quelque chose d'injuste se produit à l'école.",
        q: "Comment réagit votre enfant ?",
        a: [
            { text: "Il le dit clairement et tient sa position", emoji: "⚔️", scores: {1: 1, 8: 1} },
            { text: "Il s'inquiète des conséquences avant d'agir", emoji: "😟", scores: {6: 2} },
            { text: "Il détourne l'attention avec humour", emoji: "🃏", scores: {7: 1, 3: 1} }
        ]
    },
    {
        type: 'choice',
        category: "Portrait global",
        situation: "Ce qui décrit le mieux votre enfant au quotidien.",
        q: "Quel portrait correspond le mieux ?",
        a: [
            { text: "Une vigilance permanente, un besoin de sécurité", emoji: "🔒", scores: {6: 2} },
            { text: "Une sensibilité profonde, un besoin d'être compris(e)", emoji: "💜", scores: {4: 2} },
            { text: "Une énergie tournée vers la réussite", emoji: "🌟", scores: {3: 2} }
        ]
    },

    // --- 8 SLIDER QUESTIONS ---
    {
        type: 'slider',
        category: "Tempérament",
        q: "Comment décririez-vous le tempérament général de votre enfant ?",
        sliderLeft: "Plutôt réservé, en retrait",
        sliderRight: "Plutôt expressif, extraverti",
        sliderScores: { low: {5: 2, 4: 1, 9: 1}, high: {7: 2, 3: 1, 8: 1} }
    },
    {
        type: 'slider',
        category: "Face aux règles",
        q: "Face aux règles et à l'autorité, votre enfant...",
        sliderLeft: "Respecte les règles scrupuleusement",
        sliderRight: "Teste et défie les limites",
        sliderScores: { low: {1: 2, 6: 1}, high: {8: 2, 7: 1} }
    },
    {
        type: 'slider',
        category: "Besoins sociaux",
        q: "En matière de vie sociale...",
        sliderLeft: "Préfère la solitude ou un petit cercle",
        sliderRight: "A besoin d'être entouré(e) en permanence",
        sliderScores: { low: {5: 2, 4: 1}, high: {2: 2, 7: 1} }
    },
    {
        type: 'slider',
        category: "Face à l'échec",
        q: "Quand quelque chose ne se passe pas comme prévu...",
        sliderLeft: "S'auto-critique sévèrement",
        sliderRight: "Rebondit vite, passe à autre chose",
        sliderScores: { low: {1: 2, 4: 1}, high: {7: 2, 3: 1} }
    },
    {
        type: 'slider',
        category: "Expression émotionnelle",
        q: "En matière d'émotions, votre enfant...",
        sliderLeft: "Garde tout pour lui/elle",
        sliderRight: "Exprime tout avec intensité",
        sliderScores: { low: {5: 2, 9: 1}, high: {4: 2, 8: 1} }
    },
    {
        type: 'slider',
        category: "Rapport aux autres",
        q: "Dans sa relation aux autres enfants...",
        sliderLeft: "Cherche à aider et faire plaisir",
        sliderRight: "Cherche à diriger et décider",
        sliderScores: { low: {2: 2, 9: 1}, high: {8: 2, 3: 1} }
    },
    {
        type: 'slider',
        category: "Gestion du stress",
        q: "Quand votre enfant est stressé(e)...",
        sliderLeft: "Il/elle anticipe et s'inquiète beaucoup",
        sliderRight: "Il/elle cherche à contrôler la situation",
        sliderScores: { low: {6: 2, 1: 1}, high: {8: 2, 3: 1} }
    },
    {
        type: 'slider',
        category: "Motivation profonde",
        q: "Ce qui motive le plus votre enfant au fond...",
        sliderLeft: "Être aimé(e) et utile aux autres",
        sliderRight: "Être libre et vivre des expériences",
        sliderScores: { low: {2: 2, 6: 1}, high: {7: 2, 4: 1} }
    }
];

// ===== CHAPTERS =====
export const CHAPTERS = [
    {
        part: "Premiere partie — Le plus beau chantier du monde",
        chapters: [
            { num: 1, title: "Le seul animal qui ne sait pas elever ses petits", quote: "« L'homme est la mesure de toutes choses » — Protagoras", desc: "L'homme est le seul etre vivant qui n'est pas programme pour elever ses petits. Tout est a construire. Cette liberte est vertigineuse : pas de mode d'emploi, pas d'instinct qui dicte quoi faire. C'est le point de depart du livre — accepter qu'etre parent, c'est avancer sans carte.", keyPoints: ["L'homme est le seul être vivant qui n'a pas de programme inné pour élever ses petits", "La parentalité est un chantier permanent, sans mode d'emploi", "Le dîner du mardi soir comme rituel sacré de connexion familiale", "Le principe du PGHM : en cordée, on n'avance pas tant que quelqu'un n'est pas entendu", "Ce livre n'est pas une méthode mais un récit personnel d'un père imparfait"], reflections: ["Quel est votre plus grand défi quotidien en tant que parent ?", "Avez-vous un rituel familial qui crée de la connexion ?", "Qu'est-ce que vous aimeriez transmettre que vous n'avez pas reçu ?"] },
            { num: 2, title: "Le chameau, le lion et l'enfant", quote: "« Il faut encore porter du chaos en soi pour enfanter une etoile dansante » — Nietzsche", desc: "Inspire des trois metamorphoses de Nietzsche. Le chameau porte le poids de l'heritage, le lion se revolte contre les « tu dois », l'enfant cree librement. En tant que parent, on traverse ces phases : subir ce qu'on a recu, s'en liberer, puis choisir ce qu'on veut transmettre.", keyPoints: ["Les trois métamorphoses de Nietzsche : chameau (porter l'héritage), lion (se révolter), enfant (créer librement)", "En tant que parent, on traverse ces phases : subir ce qu'on a reçu, s'en libérer, choisir ce qu'on veut transmettre", "L'Ennéagramme comme carte de la personnalité, pas une boîte", "Chaque type voit le monde avec un filtre différent — les « lunettes »", "Importance de la connaissance de soi avant de vouloir éduquer"], reflections: ["À quelle métamorphose vous situez-vous aujourd'hui : chameau, lion ou enfant ?", "Quel héritage familial avez-vous choisi consciemment de transmettre ?", "Connaissez-vous votre propre type Ennéagramme ?", "En quoi vos « lunettes » diffèrent-elles de celles de votre enfant ?"] },
            { num: 3, title: "On ne choisit pas sa famille (mais on la construit)", quote: "« Dis-moi comment tu aimes, je te dirai quelle societe tu construis »", desc: "Chaque famille est une societe en miniature avec ses lois, ses rapports de force, ses valeurs implicites. Ce chapitre explore comment on construit consciemment le systeme familial plutot que de le subir.", keyPoints: ["Chaque famille est une société en miniature avec ses lois et valeurs implicites", "Le concept du « monstre dans la cave » : nos mécanismes de défense inconscients", "Trois monstres : le corbeau (critique interne), le chameau (surcharge), le renard (esquive)", "Nommer le monstre = commencer à le désactiver", "Quand on crie sur son enfant, c'est souvent le monstre qui parle"], reflections: ["Quel est votre « monstre » principal : le corbeau, le chameau ou le renard ?", "Dans quelles situations votre monstre prend-il le dessus ?", "Comment réagissez-vous quand vous êtes fatigué(e) et que votre enfant vous sollicite ?", "Pouvez-vous nommer une fois récente où votre réaction était disproportionnée ?"] }
        ]
    },
    {
        part: "Deuxieme partie — Ouvre les yeux",
        chapters: [
            { num: 4, title: "Neuf facons de voir le monde", quote: "« Connais-toi toi-meme » — Temple de Delphes", desc: "Introduction a l'Enneagramme : neuf facons de voir le monde, neuf lentilles differentes. Votre enfant et vous n'avez peut-etre pas la meme lentille. C'est la que resident les malentendus — pas de malveillance, juste deux mondes qui ne parlent pas la meme langue.", keyPoints: ["Chaque enfant a sa propre logique interne et son mécanisme de survie affectif", "L'Ennéagramme décrit 9 façons fondamentales de percevoir le monde", "L'enfant n'est pas une version miniature du parent", "Les malentendus viennent de deux mondes qui ne parlent pas la même langue", "Ne pas projeter son propre type sur ses enfants"], reflections: ["En quoi votre enfant perçoit-il le monde différemment de vous ?", "Avez-vous déjà projeté vos propres attentes sur votre enfant ?", "Quel malentendu récurrent existe entre vous et votre enfant ?"] },
            { num: 5, title: "Ce qui parle quand vous criez", quote: "« Ce que tu ne ramenes pas a la conscience te revient sous forme de destin » — Jung", desc: "Explorer ses zones d'ombre. Quand on crie sur ses enfants, c'est souvent notre propre blessure qui parle. Ce chapitre invite a identifier son « monstre » — cette part d'ombre qui nous habite et qui, une fois reconnue, peut devenir une force.", keyPoints: ["Quand on crie, c'est souvent notre propre blessure qui parle, pas l'éducation", "Le travail d'ombre (shadow work) de Jung appliqué à la parentalité", "Les valeurs fondamentales de chaque type guident les décisions parentales", "Les conflits de valeurs dans le couple sont normaux — les comprendre change tout", "L'importance de comprendre les valeurs de l'autre avant de les juger"], reflections: ["Quelle blessure personnelle se réactive quand vous criez ?", "Connaissez-vous les valeurs non-négociables de votre conjoint(e) ?", "Sur quel sujet vos valeurs parentales divergent-elles le plus ?", "Comment réagissez-vous quand votre enfant touche à vos valeurs profondes ?"] },
            { num: 6, title: "Ce qui ne se negocie pas", quote: "« Il n'y a pas de vent favorable pour celui qui ne sait pas ou il va » — Seneque", desc: "Definir ses valeurs non-negociables en tant que parent. Pas des regles arbitraires, mais une boussole interieure. C'est en explorant son monstre qu'on decouvre ses valeurs — l'energie est la meme, juste canalisee differemment.", keyPoints: ["Les 5 langages de l'amour de Gary Chapman appliqués à la parentalité", "Chaque enfant a un langage de l'amour dominant : paroles, temps, cadeaux, services, toucher", "Le parent donne souvent de l'amour dans SON langage, pas celui de l'enfant", "Le croisement Ennéagramme × langages de l'amour pour comprendre plus finement", "L'amour n'est pas un sentiment mais une décision et un acte intentionnel"], reflections: ["Quel est votre langage de l'amour dominant ?", "Quel est celui de votre enfant ?", "Donnez-vous de l'amour dans votre langage ou dans celui de votre enfant ?", "Comment pourriez-vous « traduire » votre amour dans le langage de votre enfant ?"] }
        ]
    },
    {
        part: "Troisieme partie — Ce qui tient quand tout tremble",
        chapters: [
            { num: 7, title: "Le verbe le plus difficile", quote: "« L'amour prend patience, l'amour rend service... » — 1 Corinthiens 13", desc: "Qu'est-ce que l'amour ? Non pas un sentiment, mais un verbe. Un choix. Une exigence. Ce chapitre definit l'amour parental comme un acte delibere, quotidien, difficile — pas comme une emotion spontanee.", keyPoints: ["L'amour n'est pas un sentiment spontané mais un verbe — un choix quotidien", "Le concept du « parent suffisamment bon » de Winnicott", "La parentalité n'est pas une performance mais une relation", "La différence entre aimer et bien aimer", "La robustesse familiale vient de la qualité des liens, pas de la force individuelle"], reflections: ["Cherchez-vous à être un parent parfait ou un parent « suffisamment bon » ?", "Quand l'amour parental devient-il le plus difficile pour vous ?", "Comment montrez-vous concrètement votre amour au quotidien ?"] },
            { num: 8, title: "Ce que la foret sait et la monoculture ignore", quote: "« Le chene qui n'a pas plie sous le vent se brise. Le roseau plie et ne se rompt jamais. » — La Fontaine", desc: "La robustesse inspiree du vivant, selon les travaux d'Olivier Hamant. Une foret diverse est plus robuste qu'une monoculture. De meme, une famille qui accepte ses differences et ses imperfections resiste mieux aux tempetes.", keyPoints: ["La diversité est une force, pas un problème — comme une forêt mixte vs une monoculture", "La robustesse familiale vient de la diversité des profils, pas de l'uniformité", "La différence de profils dans le couple est une complémentarité", "Le Wu Wei (sagesse taoïste) : l'art de ne pas forcer", "Les meilleurs moments de paternité = ceux où on n'a rien forcé"], reflections: ["Comment la diversité des profils enrichit-elle votre famille ?", "Quel trait de votre enfant vous agace le plus ? Pourrait-il être une force ?", "Quand avez-vous lâché prise et constaté un meilleur résultat ?", "Votre famille ressemble-t-elle plutôt à une forêt mixte ou à une monoculture ?"] },
            { num: 9, title: "Ce que Laurent m'a appris", quote: "« Pardonner, c'est liberer un prisonnier et decouvrir que ce prisonnier, c'etait soi. » — Lewis B. Smedes", desc: "Le pardon comme geste fondamental. Nous blesserons ceux que nous aimons — par maladresse, par fatigue. Ni l'amour ni la robustesse ne survivent sans ce troisieme geste, le plus difficile et le plus decisif.", keyPoints: ["Le pardon est l'acte central de la robustesse familiale", "La différence entre s'excuser (atténuer) et demander pardon (reconnaître)", "Le pardon envers soi-même est le plus difficile", "La culpabilité parentale est un monstre silencieux", "Le pardon est l'endroit où la connaissance de soi et l'amour de l'autre se rejoignent"], reflections: ["Quand avez-vous dernièrement demandé pardon à votre enfant ?", "Y a-t-il quelque chose que vous ne vous êtes pas encore pardonné en tant que parent ?", "Faites-vous la différence entre vous excuser et demander pardon ?", "Comment le pardon pourrait-il transformer une relation familiale tendue ?"] }
        ]
    },
    {
        part: "Quatrieme partie — Apprendre a regarder partir",
        chapters: [
            { num: 10, title: "La main qu'on lache", quote: "« L'enfant est l'avenir de l'homme. » — Gaston Bachelard", desc: "Le dernier chapitre parle du lacher-prise. Quand les enfants grandissent, le parent doit apprendre a lacher la main qu'il tient. Tous les outils du livre — les profils, les monstres, les valeurs, l'amour — sont forges dans l'enfance pour preparer ce moment.", keyPoints: ["L'adolescence est une métamorphose, pas une crise", "L'émergence du lion chez l'ado : le « je veux » contre le « tu dois »", "Comprendre le type de l'ado pour adapter sa réponse parentale", "Se rendre inutile : le paradoxe ultime de la parentalité", "Le travail est réussi quand on ne l'est plus — quand l'enfant peut voler"], reflections: ["Comment vivez-vous le besoin d'autonomie croissant de votre enfant ?", "Quelle est la chose la plus difficile à « lâcher » dans votre rôle de parent ?", "Que souhaitez-vous que votre enfant retienne de son enfance ?", "Êtes-vous prêt(e) à devenir « inutile » ?"] }
        ]
    },
    {
        part: "Annexe",
        chapters: [
            { num: "A", title: "L'Enneagramme au quotidien", quote: "", desc: "Un guide detaille des neuf profils de l'Enneagramme, adapte aux enfants par tranche d'age (5-8 ans, 8-12 ans, 13-16 ans). Avec un quiz, des portraits complets, les mecanismes d'integration et de desintegration, et trois cles d'accompagnement pour chaque type.", keyPoints: ["Les 9 types en détail avec portraits par tranche d'âge", "Quiz pratique pour identifier le profil de votre enfant", "Mécanismes d'intégration et de désintégration", "3 clés d'accompagnement concrètes pour chaque type", "Le concept des ailes : les nuances entre types voisins"], reflections: ["Avez-vous reconnu votre enfant dans l'un des 9 portraits ?", "Quel profil vous surprend le plus ?", "Quelles clés d'accompagnement allez-vous essayer cette semaine ?"] }
        ]
    }
];

// ===== Q&A DATABASE =====
export const QA_DB = [
    {
        q: "Comment identifier le profil Enneagramme de mon enfant ?",
        a: "Le livre propose un quiz de 9 situations du quotidien (dessin, parc, changement de programme, repas de famille...). Pour chaque situation, choisissez la reaction qui ressemble le plus a votre enfant. Les resultats vous donneront une premiere intuition. Mais rappelez-vous : ce quiz n'est qu'une porte d'entree. Un enfant est toujours plus complexe qu'une lettre. L'essentiel est de lire les portraits avec le coeur ouvert, en cherchant a reconnaitre, non a enfermer.",
        tags: ["enneagramme", "profil", "quiz", "type", "identifier"],
        source: "Annexe — L'Enneagramme au quotidien"
    },
    {
        q: "Qu'est-ce que l'integration et la desintegration dans l'Enneagramme ?",
        a: "L'Enneagramme n'est pas un systeme statique. Quand votre enfant grandit dans la securite affective, dans la joie, il integre : il acquiert les qualites saines d'un autre type. Par exemple, un type 1 accepte qui se sent vraiment integre developpe l'optimisme du type 7. Inversement, quand l'enfant est sous stress, fatigue, menace, il desintegre : il adopte les traits malsains d'un autre type. Ces moments de desintegration sont des signaux qui disent « Mon enfant souffre. Je dois le rassurer. »",
        tags: ["integration", "desintegration", "stress", "securite", "enneagramme", "croissance"],
        source: "Annexe — Integration et desintegration"
    },
    {
        q: "Qu'est-ce que les ailes dans l'Enneagramme ?",
        a: "Les ailes sont les deux types voisins de votre enfant sur le cercle de l'Enneagramme. Par exemple, un type 1 a pour ailes le type 9 et le type 2. Cela signifie que votre enfant peut parfois basculer vers les tendances de l'un ou l'autre voisin. Reconnaitre l'aile dominante de votre enfant, c'est ajouter une teinte a votre comprehension. Ce n'est pas une complication — c'est de la precision amoureuse.",
        tags: ["ailes", "wings", "enneagramme", "voisin", "type"],
        source: "Annexe — Les ailes"
    },
    {
        q: "Pourquoi est-ce que je crie sur mes enfants ?",
        a: "Le chapitre 5, « Ce qui parle quand vous criez », explore cette question essentielle. Quand vous criez, c'est souvent votre propre blessure qui parle, pas une reaction proportionnee a ce que l'enfant a fait. Jung disait : « Ce que tu ne ramenes pas a la conscience te revient sous forme de destin. » Identifier votre « monstre » — cette part d'ombre — est la premiere etape pour arreter de le projeter sur vos enfants.",
        tags: ["crier", "colere", "ombre", "monstre", "jung", "blessure", "emotion"],
        source: "Chapitre 5 — Ce qui parle quand vous criez"
    },
    {
        q: "Comment definir mes valeurs en tant que parent ?",
        a: "Le chapitre 6 parle de « ce qui ne se negocie pas ». L'idee est de definir une boussole interieure, pas des regles arbitraires. Et voici le paradoxe : c'est en explorant votre monstre (chapitre 5) que vous decouvrez vos valeurs. L'energie est la meme, juste canalisee differemment. Le corbeau qui murmure « tu n'es pas assez » est la meme energie qui vous pousse a apprendre, comprendre et transmettre.",
        tags: ["valeurs", "boussole", "principes", "non-negociable", "education"],
        source: "Chapitre 6 — Ce qui ne se negocie pas"
    },
    {
        q: "C'est quoi la robustesse parentale ?",
        a: "Inspire des travaux d'Olivier Hamant, le chapitre 8 compare la famille a une foret : une foret diverse est plus robuste qu'une monoculture. La robustesse, c'est la capacite a persister malgre l'imprevisible. Une famille qui accepte ses differences et ses imperfections resiste mieux aux tempetes qu'une famille qui vise la perfection. C'est le chene qui se brise sous le vent, tandis que le roseau plie et ne se rompt jamais.",
        tags: ["robustesse", "resilience", "foret", "hamant", "vivant", "imperfection", "diversite"],
        source: "Chapitre 8 — Ce que la foret sait et la monoculture ignore"
    },
    {
        q: "Comment aimer ses enfants ?",
        a: "Le chapitre 7 definit l'amour non comme un sentiment, mais comme un verbe. Un choix delibere, quotidien, difficile. Aimer, ce n'est pas une emotion spontanee — c'est le verbe le plus difficile. L'amour parental demande patience, service, humilite. Et surtout, il demande de ne pas confondre aimer avec controler.",
        tags: ["amour", "aimer", "verbe", "patience", "choix", "sentiment"],
        source: "Chapitre 7 — Le verbe le plus difficile"
    },
    {
        q: "Comment pardonner en tant que parent ?",
        a: "Le chapitre 9, inspire par ce que Laurent a appris a l'auteur, parle du pardon comme geste fondamental. Nous blesserons ceux que nous aimons — par maladresse, par fatigue, par notre monstre interieur. Ni l'amour ni la robustesse ne survivent sans le pardon. Comme le dit Lewis B. Smedes : « Pardonner, c'est liberer un prisonnier et decouvrir que ce prisonnier, c'etait soi. »",
        tags: ["pardon", "pardonner", "erreur", "blessure", "faute", "culpabilite"],
        source: "Chapitre 9 — Ce que Laurent m'a appris"
    },
    {
        q: "Comment lacher prise quand mes enfants grandissent ?",
        a: "Le chapitre 10, « La main qu'on lache », est le dernier du livre. Il parle de cette metamorphose qui arrive quand les enfants grandissent et que le parent doit apprendre a lacher la main qu'il tient. Tous les outils du livre — les profils, les monstres, les valeurs, l'amour, le pardon — sont forges dans l'enfance pour preparer ce moment. C'est peut-etre la tache la plus difficile : regarder partir celui qu'on a accompagne.",
        tags: ["lacher prise", "adolescence", "grandir", "partir", "autonomie", "separation"],
        source: "Chapitre 10 — La main qu'on lache"
    },
    {
        q: "Qu'est-ce que les trois metamorphoses de Nietzsche ?",
        a: "Le chapitre 2 s'inspire d'Ainsi parlait Zarathoustra. Le chameau porte le poids de l'heritage — tout ce que nos parents, la societe, la culture ont pose sur nos epaules. Le lion se revolte contre les « tu dois » et dit « je veux ». L'enfant cree librement, sans le poids du passe ni la colere du present. En tant que parent, on traverse ces phases : d'abord subir ce qu'on a recu, puis s'en liberer, puis choisir ce qu'on veut transmettre.",
        tags: ["nietzsche", "chameau", "lion", "enfant", "metamorphose", "heritage", "liberte"],
        source: "Chapitre 2 — Le chameau, le lion et l'enfant"
    },
    {
        q: "Pourquoi mon enfant de type 1 est-il si critique ?",
        a: "L'enfant de type 1 a un fil a plomb en lui qui evalue constamment : c'est juste ou faux, c'est bien ou mal. Il ne critique pas par mechancete, mais par un sens inne de la justice et de l'ordre. Il se critique lui-meme encore plus durement. La cle est de valider ses standards sans les reproduire, de lui offrir des espaces d'imperfection, et surtout de lui dire : « Tu n'es pas responsable de rendre le monde parfait. Tes erreurs font partie de qui tu es. Et je t'aime dans tes erreurs. »",
        tags: ["type 1", "perfectionniste", "critique", "justice", "ordre", "erreur"],
        source: "Annexe — Type 1, Le Perfectionniste"
    },
    {
        q: "Mon enfant aide tout le monde mais s'oublie. C'est normal ?",
        a: "Votre enfant est probablement de type 2, le Genereux. C'est un enfant qui trouve sa place en etant utile, en aimant les autres. Mais le secret du type 2, c'est que cette generosite peut devenir une prison — donner pour etre aime, puis souffrir quand l'amour ne semble pas a la hauteur du don. Aidez-le a decouvrir ses propres desirs et enseignez-lui que dire non, c'est un acte d'amour envers soi-meme.",
        tags: ["type 2", "genereux", "aide", "oubli de soi", "dire non", "generosite"],
        source: "Annexe — Type 2, Le Genereux"
    },
    {
        q: "Mon enfant est obsede par la reussite. Comment reagir ?",
        a: "Votre enfant est peut-etre de type 3, le Gagneur. Il a une capacite innee a performer et a reussir, mais risque de confondre ce qu'il fait avec ce qu'il est. La cle est de separer votre amour de ses resultats. Celebrez qu'il existe, pas ce qu'il fait. Creez des espaces de non-performance ou il n'y a rien a prouver. L'enfant doit apprendre que vous aimez sa presence, non sa productivite.",
        tags: ["type 3", "gagneur", "reussite", "performance", "echec", "image"],
        source: "Annexe — Type 3, Le Gagneur"
    },
    {
        q: "Mon enfant est tres sensible et se sent different. Comment l'aider ?",
        a: "Votre enfant est peut-etre de type 4, l'Artiste. Il nait avec la conviction d'etre different, le mauvais mot dans la chanson. Cette sensation le pousse vers l'authenticite, mais d'abord elle le rend seul. Dites-lui que ses emotions sont reelles, pas dramatiques. Que sa difference est son chemin, pas sa prison. Et surtout, restez present quand il s'enferme — il a besoin de savoir qu'on ne l'oublie pas, pas qu'on le force a sortir.",
        tags: ["type 4", "artiste", "sensible", "different", "emotion", "authenticite", "solitude"],
        source: "Annexe — Type 4, L'Artiste"
    },
    {
        q: "Mon enfant passe son temps seul a lire et observer. Dois-je m'inquieter ?",
        a: "Si votre enfant est de type 5 (l'Observateur), sa solitude n'est pas un symptome a guerir — c'est de la respiration. Il a besoin d'espace pour fonctionner, de temps pour recharger. Ne le forcez pas a participer juste pour participer. Mais assurez-vous qu'il est seul de facon saine. Validez son expertise, creez des espaces ou son savoir compte, et rappelez-lui que le coeur existe meme derriere l'intellect.",
        tags: ["type 5", "observateur", "solitude", "lecture", "introverti", "espace", "savoir"],
        source: "Annexe — Type 5, L'Observateur"
    },
    {
        q: "Mon enfant est tres anxieux et pose beaucoup de questions. Que faire ?",
        a: "Votre enfant est peut-etre de type 6, le Loyal. Il scanne en permanence l'horizon pour les dangers. Il a un comite interieur de voix qui discutent : « Et si... ? » Ce n'est pas de la nevrose, c'est de la vigilance — de l'amour qui a peur. La cle est la coherence : si vous dites quelque chose, faites-le. Apprenez-lui a vivre avec son doute plutot qu'a le combattre. Et montrez-lui qu'il vous appartient, inconditionnellement.",
        tags: ["type 6", "loyal", "anxiete", "peur", "securite", "confiance", "doute"],
        source: "Annexe — Type 6, Le Loyal"
    },
    {
        q: "Mon enfant commence plein de choses sans jamais finir. C'est un probleme ?",
        a: "C'est typique du type 7, l'Aventurier. Il a des idees en permanence, des projets qui se bousculent. Le moment excitant dure seulement jusqu'au moment ou il faut vraiment le faire. Ce n'est pas de la paresse — c'est que l'Aventurier fuit l'inconfort emotionnel par instinct. Mettez de la structure (mais pas trop), aidez-le a terminer les choses en restant present, et nommez l'evitement sans le reprocher.",
        tags: ["type 7", "aventurier", "finir", "projets", "enthousiasme", "ennui", "concentration"],
        source: "Annexe — Type 7, L'Aventurier"
    },
    {
        q: "Mon enfant veut tout controler et refuse l'autorite. Comment gerer ?",
        a: "Votre enfant est probablement de type 8, le Chef. L'autorite, pour lui, ca se gagne. Il voit les dynamiques de pouvoir instinctivement et refuse d'etre du mauvais cote. Soyez plus fort mais juste — ferme, coherent, impartial, sans ironie. Creez de l'espace pour la vulnerabilite en la nommant, sans l'exiger. Et reconnaissez le bien qu'il fait : il protege les autres, et cette force peut etre une beaute.",
        tags: ["type 8", "chef", "autorite", "controle", "pouvoir", "force", "leader"],
        source: "Annexe — Type 8, Le Chef"
    },
    {
        q: "Mon enfant dit toujours oui et n'a jamais d'opinion. C'est normal ?",
        a: "Votre enfant est peut-etre de type 9, le Mediateur. Il dit oui non par indecision, mais parce qu'il a compris que c'est plus securisant. Il a une resistance passive : si vous insistez trop, il se repliera dans un silence qui peut durer. Posez des questions sans attente de reponse immediate. Validez ses « peut-etre » comme des limites, pas des hesitations. Aidez-le a se connecter a lui-meme : « Ceci est ce que TU veux. »",
        tags: ["type 9", "mediateur", "harmonie", "opinion", "passif", "oui", "conflit"],
        source: "Annexe — Type 9, Le Mediateur"
    },
    {
        q: "L'homme sait-il naturellement elever ses enfants ?",
        a: "Non, et c'est le point de depart du livre. Le chapitre 1 explique que l'homme est le seul animal qui ne sait pas elever ses petits. Il n'est pas programme. Tout est a construire. Cette liberte est vertigineuse — pas de mode d'emploi, pas d'instinct qui dicte quoi faire. Mais c'est aussi ce qui rend la parentalite si riche : on peut choisir quel parent on veut etre.",
        tags: ["instinct", "nature", "animal", "construire", "liberte", "choix"],
        source: "Chapitre 1 — Le seul animal qui ne sait pas elever ses petits"
    },
    {
        q: "Comment construire sa famille de facon consciente ?",
        a: "Le chapitre 3 rappelle qu'on ne choisit pas sa famille, mais qu'on la construit. Chaque famille est une societe en miniature avec ses lois, ses rapports de force, ses valeurs implicites. Le livre invite a passer d'un systeme subi a un systeme choisi, en prenant conscience de la facon dont on distribue le pouvoir, dont on recompense et dont on punit au sein de la famille.",
        tags: ["famille", "construire", "systeme", "valeurs", "societe", "choix", "conscient"],
        source: "Chapitre 3 — On ne choisit pas sa famille (mais on la construit)"
    },
    {
        q: "Quel est le message central du livre ?",
        a: "Le livre porte un message central : on ne devient pas un meilleur parent en appliquant des methodes, mais en acceptant de se transformer soi-meme. Le titre « On a tous besoin de quelqu'un d'autre » est autant une declaration de vulnerabilite que de force. L'alignement — etre le meme partout ou l'on est — est ce qui donne au leadership parental sa puissance. De Nietzsche a l'Enneagramme, de Jung a l'Arbinger Institute, le livre tisse philosophie, psychologie et experience vecue.",
        tags: ["message", "central", "resume", "theme", "alignement", "transformation"],
        source: "A propos du livre"
    },
    {
        q: "Comment accompagner mon enfant selon son age ?",
        a: "L'annexe du livre detaille chaque type de l'Enneagramme selon trois tranches d'age : 5-8 ans (les fondations), 8-12 ans (le renforcement des traits) et 13-16 ans (la crise d'identite). Ces tranches correspondent a des tournants du developpement moral et affectif. L'enfant de 5 ans ne raisonne pas comme l'adolescent de 14 ans, meme s'ils sont du meme type. Sa conscience grandit, sa complexite s'etoffe. Utilisez le quiz et les profils pour mieux comprendre chaque etape.",
        tags: ["age", "accompagner", "tranche", "developpement", "croissance", "5 ans", "8 ans", "13 ans", "adolescent"],
        source: "Annexe — Comment lire les portraits"
    }
];

// ===== Q&A SUGGESTION TAGS =====
export const QA_SUGGESTIONS = [
    "L'Enneagramme, c'est quoi ?",
    "Pourquoi je crie ?",
    "Mon enfant est anxieux",
    "Lacher prise",
    "Les 3 metamorphoses",
    "Robustesse parentale",
    "Amour = verbe",
    "Pardon",
    "Mon enfant est sensible",
    "Il veut tout controler"
];

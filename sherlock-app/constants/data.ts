// ===== ENNEAGRAM TYPE DATA =====
export const TYPES = [
    {
        num: 1,
        name: "Le Perfectionniste",
        color: "#7b8e6e",
        short: "Un sens aigu du bien et du mal, un besoin d'ordre et de justice.",
        fear: "Ne pas être assez bon, faire mal",
        need: "Ordre, justesse, intégrité",
        metaphor: "Le Perfectionniste est comme un fil à plomb — cet outil que les maçons utilisent pour vérifier qu'un mur est droit. L'enfant de type 1 évalue constamment : c'est juste ou faux, c'est bien ou mal. Cette capacité innée en fait un être de justice, un gardien d'intégrité. Mais elle peut aussi devenir lourde. Le type 1 se demande sans cesse : « Suis-je assez bon ? »",
        integration: {
            toward: 7,
            desc: "En sécurité, le Perfectionniste intègre vers le type 7 : il déverrouille sa joie, sa spontanéité, son humour. La pression interne se relâche. Il se permet de rire de ses erreurs et de jouer sans but."
        },
        disintegration: {
            toward: 4,
            desc: "Sous stress, le type 1 désintègre vers le type 4 : la critique interne devient dévastatrice. L'enfant se retire, devient morose, mélancolique. Il sent que tout est sa faute."
        },
        ages: {
            "5-8": "À cet âge, le type 1 range ses jouets avec méthode, a des cahiers impeccables (pas une rature !), et vous signale vos incohérences avec aplomb. « Ce n'est pas juste ! » est sa phrase phare — non par jalousie, mais par un vrai sens de la justice.",
            "8-12": "Le Perfectionniste devient plus rigide. Les résultats scolaires deviennent une affaire personnelle. La frustration est un affect majeur : les choses devraient être mieux. Il développe une relation au self-improvement intense et peut être dur envers lui-même et les autres.",
            "13-16": "L'idéalisme rencontre la réalité. L'adolescent peut devenir un militant fervent ou se replier sur sa culpabilité. Certains se jettent dans des causes (écologie, justice sociale), d'autres internalisent tout jusqu'au burn-out."
        },
        keys: [
            { title: "Validez ses standards sans les reproduire", desc: "Écoutez-le avec sérieux quand il signale une injustice. Dites : « Tu as remarqué quelque chose d'important. Merci. » Mais ne l'autorisez pas à transformer la famille en tribunal permanent. L'excellence est une orientation, pas une prison." },
            { title: "Offrez-lui des espaces d'imperfection", desc: "Créez des moments où les erreurs sont invitées. Jouez à des jeux où vous faites exprès de perdre. Montrez que vous êtes imparfait et que c'est o.k. Ces mémoires d'imperfection partagée sont des grâces pour un type 1." },
            { title: "Valorisez la tentative plus que la perfection", desc: "Quand il doute — « Mais et si j'échoue ? » — dites : « Je suis fier de toi pour avoir essayé, indépendamment du résultat. » Célébrez le courage plus que la victoire." }
        ],
        belief: "Pour être quelqu'un de bien, je dois être parfait, juste, irréprochable. L'erreur est une faute morale.",
        compulsion: { name: "Colère (ressentiment)", desc: "Une colère froide, contenue, faite d'irritation chronique de voir que rien — ni lui, ni les autres, ni le monde — n'est à la hauteur de l'idéal." },
        virtue: { name: "Sérénité", desc: "La sagesse d'accepter ce qui est, de faire de son mieux avec ce qu'il contrôle, et de lâcher prise sur le reste avec une paix profonde." },
        identity: "Je suis celui qui fait bien les choses.",
        missionLibre: "Le 1 libéré ne cherche plus à corriger le monde, mais à incarner la sérénité. Il devient un leader éthique : son discernement, libéré du jugement, inspire par l'exemple plutôt que par la critique.",
        wings: "Type 9 (le reveur silencieux) et Type 2 (l'aidant donne)"
    },
    {
        num: 2,
        name: "L'Altruiste",
        color: "#c0713a",
        short: "Une générosité naturelle, un besoin d'être aimé.",
        fear: "Ne pas être aimé, être inutile",
        need: "Être aimé et reconnu pour sa générosité",
        metaphor: "Un type 2, c'est comme une source. Elle jaillit naturellement, pour abreuver ceux autour d'elle. L'enfant de type 2 a cette qualité innée de sentir les autres, de vouloir les aider, de trouver sa place en étant utile. Mais cette générosité peut devenir une prison : la source a besoin d'être remerciée. Quand le retour ne vient pas, la source s'assèche.",
        integration: {
            toward: 4,
            desc: "En sécurité, le Généreux intègre vers le type 4 : il découvre son monde affectif propre, ses passions véritables, son authenticité. Il ose être vrai, pas pour plaire mais pour exister."
        },
        disintegration: {
            toward: 8,
            desc: "Sous stress, le type 2 désintègre vers le type 8 : le petit aidant se transforme en contremaître. L'enfant devient agressif, manipulateur, exigeant."
        },
        ages: {
            "5-8": "C'est le petit aidant qui offre des dessins faits pour vous avec fierté. À l'école, c'est le « chouchou » qui aide volontiers et console les autres. Il remarque quand vous êtes triste et insiste : « Maman, ça va ? »",
            "8-12": "La générosité se teinte de ressentiment. L'enfant a du mal à dire non. Il néglige ses propres besoins pour ceux des autres. Une colère sous-jacente peut apparaître quand il ne se sent pas apprécié.",
            "13-16": "Explosion sociale et confusion intérieure. Qui suis-je en dehors de ce qu'on attend de moi ? L'adolescent peut devenir un helper hyperactif ou se retirer, déprimé, se sentant inutile."
        },
        keys: [
            { title: "Aimez-le sans condition sur son utilité", desc: "Dites régulièrement : « Je t'aime parce que tu existes, pas parce que tu m'aides. » Pour le type 2, c'est une révélation. C'est une guérison." },
            { title: "Aidez-le à découvrir ses propres désirs", desc: "Posez des questions : « Qu'est-ce que TOI tu aimerais faire ? » Créez des espaces où il est invité à penser à lui-même, sans compromis, sans souci des autres." },
            { title: "Enseignez-lui que dire non, c'est un acte d'amour", desc: "« Si tu dis oui alors que tu veux dire non, tu souffres. Un ami qui t'aime veut que tu dises ce que tu sens. » Normaliser le non est un cadeau pour la vie du type 2." }
        ],
        belief: "Pour être aimé, je dois donner et répondre aux besoins des autres. Mes propres besoins sont secondaires, voire égoïstes.",
        compulsion: { name: "Orgueil (de l'aide)", desc: "Un orgueil subtil drapé dans l'humilité : « vous avez besoin de moi », « je sais mieux que vous ce qui est bon pour vous ». Il refuse de voir ses propres besoins." },
        virtue: { name: "Humilité", desc: "Le courage de reconnaître ses propres besoins et limites. S'aimer soi-même pour pouvoir aimer librement, sans attente de retour." },
        identity: "Je suis celui (celle) qui aime.",
        missionLibre: "Le 2 libéré ne cherche plus à se rendre indispensable. Il devient un leader au service des autres : sa générosité devient inconditionnelle, et il sait nourrir le potentiel des autres sans rien attendre en retour.",
        wings: "Type 1 (le consciencieux) et Type 3 (le performeur)"
    },
    {
        num: 3,
        name: "Le Battant",
        color: "#d4a03c",
        short: "Une énergie tournée vers la réussite, un besoin de reconnaissance.",
        fear: "Ne pas avoir de valeur sans résultats",
        need: "Reconnaissance et admiration",
        metaphor: "Un type 3, c'est celui qui brille. Naturellement. Comme une étoile, il attire le regard. L'enfant de type 3 a cette capacité innée à performer, à réussir. Mais il y a un prix caché : le type 3 risque de confondre ce qu'il fait avec ce qu'il est. Il vit dans la peur secrète de ne pas être assez si les résultats disparaissent.",
        integration: {
            toward: 6,
            desc: "En sécurité, le Battant intègre vers le type 6 : il commence à faire confiance, devient plus loyal, plus disposé à travailler sans besoin de briller seul. Il découvre qu'il peut être vrai, pas juste efficace."
        },
        disintegration: {
            toward: 9,
            desc: "Sous stress, le type 3 désintègre vers le type 9 : l'enfant devient apathique, déconnecté, engourdi. Le brille disparaît derrière une torpeur de résignation."
        },
        ages: {
            "5-8": "Le type 3 brille simplement. Il fait rire, gagne, réussit à l'école sans effort apparent. Il cherche à impressionner les adultes et veut être reconnu pour ses accomplissements.",
            "8-12": "La compétition s'intensifie. L'enfant commence à adapter son image au public. Il peut devenir très orienté vers les résultats et avoir du mal à supporter l'échec.",
            "13-16": "L'adolescent est absorbé par son image. La pression d'excellence peut mener à l'épuisement. Le type 3 peut se perdre dans la performance et oublier qui il est vraiment."
        },
        keys: [
            { title: "Séparez votre amour de ses résultats", desc: "Quand il ramène une mauvaise note, ne dites pas « Je suis déçu. » Dites : « Je t'aime. Parlons de ce qui s'est passé. » Célébrez qu'il existe, pas ce qu'il fait." },
            { title: "Encouragez l'échec comme une donnée, pas une catastrophe", desc: "Racontez vos propres échecs, vos peurs, vos maladresses. Montrez que vous êtes imparfait et que c'est correct. L'échec n'est pas une identité, c'est un événement." },
            { title: "Créez des espaces de non-performance", desc: "Une soirée sans écran où vous parlez simplement. Une balade où il n'y a rien à faire, rien à gagner, rien à prouver. Peu à peu, l'enfant apprend que vous aimez sa présence, non sa productivité." }
        ],
        belief: "Ma valeur dépend de mes succès, de mes performances et de l'image admirable que les autres ont de moi.",
        compulsion: { name: "Mensonge (à soi-même)", desc: "Une tromperie subtile : il s'identifie à son image de réussite et finit par croire à son propre masque, perdant le contact avec ses vrais sentiments." },
        virtue: { name: "Véracité (Authenticité)", desc: "Le courage de ralentir, de décoller le masque et d'oser être vu pour qui il est, au-delà des succès et des échecs. Il découvre que sa valeur est inhérente." },
        identity: "Je suis mes succès.",
        missionLibre: "Le 3 libéré ne performe plus pour être aimé. Il devient un leader authentique et inspirant : son énergie sert une vision qui a du sens, et il motive les autres par le courage de sa vulnérabilité.",
        wings: "Type 2 (l'aide) et Type 4 (le sensible)"
    },
    {
        num: 4,
        name: "Le Romantique",
        color: "#8b6ca7",
        short: "Une sensibilité profonde, un besoin d'être compris.",
        fear: "Être banal, ne pas être compris",
        need: "Authenticité et singularité",
        metaphor: "L'enfant qui sent tout. Pas seulement les événements — les non-dits, la tristesse de l'invisible. Le Type 4 naît avec la conviction sourde d'être différent : le mauvais mot dans la chanson. Et cette sensation le pousse vers sa plus grande force : l'authenticité. Mais d'abord, elle le rend seul.",
        integration: {
            toward: 1,
            desc: "En intégration vers le type 1, la profondeur émotionnelle trouve une structure. L'enfant canalise ses émotions en action : il peint avec discipline, écrit avec précision. L'authenticité ne signifie plus isolement ; elle devient contribution."
        },
        disintegration: {
            toward: 2,
            desc: "En désintégration vers le type 2, il devient étouffant, cherchant désespérément à être aimé, oubliant qui il était vraiment. Il change de couleur comme un caméléon."
        },
        ages: {
            "5-8": "L'enfant pleure facilement, non de colère mais de sensation. Un camarade qui ne l'invite pas devient la preuve qu'il est fondamentalement « pas invitable ». Il crée des univers de papier pour y habiter quand le monde réel le blesse.",
            "8-12": "La sensation devient conviction. L'Artiste regarde les autres enfants avec une envie mêlée d'incompréhension. Il devient spécialiste de l'absence et peut confondre solitude et profondeur. Les questions existentielles apparaissent.",
            "13-16": "Les vagues d'émotion s'amplifient. Un jour, il est créatif et passionné. Le lendemain, il plonge dans une mélancolie dense. Sous le drame, il y a une quête de vérité. L'Artiste refuse les mensonges polis du quotidien."
        },
        keys: [
            { title: "Tes émotions sont réelles, pas dramatiques", desc: "L'Artiste a besoin d'entendre que ce qu'il sent est valide. Il doit aussi apprendre qu'authenticité ne signifie pas isolement. On peut être vrai ET relié. Sensible ET courageux." },
            { title: "Ta différence est ton chemin, pas ta prison", desc: "Aidez-le à transformer son sentiment d'étrangeté en quête créatrice. Montrez-lui d'autres personnes qui ont été différentes et qui ont eu un impact. Aidez-le à trouver sa tribu." },
            { title: "Reste présent quand je m'enferme", desc: "L'Artiste se retire dans ses univers. C'est sain. Mais il a besoin de savoir qu'on ne l'oublie pas. Pas de l'y forcer à sortir, mais de l'inviter régulièrement avec douceur." }
        ],
        belief: "Il me manque quelque chose d'essentiel pour être complet. Je suis fondamentalement différent et je dois trouver mon identité unique pour être aimé.",
        compulsion: { name: "Envie (du manque)", desc: "Non pas la jalousie, mais la conviction qu'il lui manque une qualité essentielle que les autres possèdent. Son attention reste tournée vers l'absent, l'inaccessible, l'idéalisé." },
        virtue: { name: "Équanimité", desc: "La capacité de ressentir toute la gamme des émotions humaines — joie comme tristesse — sans se laisser emporter. La découverte que rien d'essentiel ne lui manque." },
        identity: "Je suis mes sentiments.",
        missionLibre: "Le 4 libéré ne se complaît plus dans le sentiment de différence. Il devient un leader créatif et empathique : sa profondeur se met au service de la beauté et du sens, et il révèle l'humanité cachée dans l'imperfection.",
        wings: "Type 3 (l'ambitieux) et Type 5 (le penseur)"
    },
    {
        num: 5,
        name: "L'Observateur",
        color: "#5b8a9a",
        short: "Une curiosité insatiable, un besoin de comprendre.",
        fear: "Être incompétent, être envahi",
        need: "Comprendre et préserver son énergie",
        metaphor: "L'Observateur regarde le monde de loin, écoute plus qu'il ne parle, construit des systèmes mentaux labyrinthiques pour comprendre comment les choses fonctionnent. Il ne veut pas participer. Il veut voir. Il veut savoir. Et il veut qu'on le laisse tranquille pour le faire. Ce besoin d'espace est sa signature — et souvent son énigme pour ceux qui l'aiment. Au fond, il préserve son énergie pour se sentir compétent et ne jamais se retrouver dépassé.",
        integration: {
            toward: 8,
            desc: "En intégration vers le type 8, il sort de sa tour. Tout son savoir, il le transforme en action. Il devient assertif, confiant, capable de faire connaître son expertise au monde."
        },
        disintegration: {
            toward: 7,
            desc: "En désintégration vers le type 7, il s'éparpille en distractions : saute d'un intérêt à l'autre, devient hyperactif, fuit dans les écrans et les stimulations."
        },
        ages: {
            "5-8": "Il regarde les autres jouer avec une curiosité détachée. Il pose des questions qui prennent les adultes au dépourvu. Les invitations anniversaire sont des calvaires — trop d'enfants, trop de bruit. Les livres deviennent ses amis.",
            "8-12": "Il devient un expert dans un ou deux domaines qu'il a décidé de comprendre à fond. Les autres enfants trouvent son expertise fascinante pendant cinq minutes puis s'ennuient. Il a besoin d'espace pour fonctionner.",
            "13-16": "L'indépendance intellectuelle. Il questionne tout. La peur de l'incompétence peut s'installer : la peur que tout son savoir ne suffit pas, qu'il n'est qu'un imposteur dans sa propre tour."
        },
        keys: [
            { title: "La solitude n'est pas un symptôme à guérir", desc: "Respectez l'espace de votre Observateur. Ne le forcez pas à participer juste pour participer. Mais assurez-vous qu'il est seul de façon saine — qu'il apprend, qu'il explore, qu'il grandit." },
            { title: "Ta connaissance vaut quelque chose", desc: "Validez son expertise. Créez des espaces où son savoir compte. Encouragez-le à partager d'une façon qui le satisfait — pas pour impressionner, mais pour communiquer véritablement." },
            { title: "Le cœur existe, même derrière l'intellect", desc: "Il n'est pas froid. Il est prudent sur le plan émotionnel. Il a besoin de savoir qu'il est sécuritaire de descendre de la tour. Que l'amour peut être vrai même quand il est difficile à exprimer." }
        ],
        belief: "Le monde est envahissant et mes ressources sont limitées. Je dois comprendre avant d'agir et conserver mon énergie en minimisant mes engagements.",
        compulsion: { name: "Avarice (de soi)", desc: "Non pas une avarice matérielle, mais une rétention : il retient son temps, son énergie, ses émotions, son savoir, vivant dans une économie intérieure de la rareté." },
        virtue: { name: "Non-attachement (Sagesse engagée)", desc: "La capacité de s'engager pleinement dans le monde, de partager ses dons et de ressentir ses émotions, sans craindre d'être vidé. Plus il donne, plus il reçoit." },
        identity: "Je suis ce que je sais.",
        missionLibre: "Le 5 libéré quitte sa tour d'ivoire. Il devient un leader sage et visionnaire : sa clarté d'analyse, désormais partagée généreusement, apporte de la compréhension et de l'innovation face aux défis du monde.",
        wings: "Type 4 (le sensible) et Type 6 (le prudent)"
    },
    {
        num: 6,
        name: "Le Loyaliste",
        color: "#6b7b8e",
        short: "Une vigilance permanente, un besoin de sécurité.",
        fear: "Être abandonné, trahi, sans repères",
        need: "Sécurité et confiance",
        metaphor: "Le Loyal scanne en permanence l'horizon. Quelque chose va-t-il mal ? Sommes-nous en sécurité ? Il pose des questions que les autres enfants ne posent pas. Il remarque les tensions que les adultes pensent cachées. C'est un enfant loyal, fidèle, qui ferait tout pour protéger ceux qu'il aime. Et qui construit un comité intérieur de voix qui discutent : « Mais et si... ? »",
        integration: {
            toward: 9,
            desc: "En intégration vers le type 9, la vigilance se relâche. Il apprend à faire confiance — aux autres et surtout à lui-même. Il trouve une stabilité intérieure, une tranquillité qui transforme sa prudence en sagesse."
        },
        disintegration: {
            toward: 3,
            desc: "En désintégration vers le type 3, il construit une façade irréprochable. Il devient performant, compétitif, obsédé par l'image. Il sacrifie son âme pour une sécurité qui ne vient jamais."
        },
        ages: {
            "5-8": "Il approche le monde avec prudence. Nouvelle baby-sitter ? Il a besoin de temps. Il pose des questions surprenantes : « Est-ce qu'on va mourir ? » Il existe deux formes : le Loyal « phobique » qui obéit, et le « contre-phobique » qui défie.",
            "8-12": "L'anxiété fait surface. Un bourdonnement constant de « et si... ? ». Il peut devenir perfectionniste pour se sécuriser. Dans les amitiés, il cherche des preuves de loyauté. Mais il montre aussi un vrai don pour le courage.",
            "13-16": "Il remet en question tout : les autorités, les parents, les systèmes. Le groupe devient crucial. Il peut suivre le groupe juste pour être accepté. Il a besoin de points d'ancrage et de la certitude de votre amour."
        },
        keys: [
            { title: "Ta peur est réelle. Je suis fiable.", desc: "Le Loyal a besoin de cohérence. Si vous dites quelque chose, faites-le. Si vous promettez, tenez. Si vous faites une erreur, reconnaissez-la. Il construit sa confiance brique par brique, et chaque incohérence détruit ce qu'il a construit." },
            { title: "Ton doute ne veut pas dire que tu es faible", desc: "Au lieu de tenter de le guérir de son doute, apprenez-lui à y vivre. « Tu doutes. C'est qui tu es. Tu peux douter et agir de toute façon. » C'est un courage qu'il faut cultiver." },
            { title: "Tu as besoin d'appartenance, pas de perfection", desc: "Donnez-lui une tribu où il peut être authentique. Montrez-lui qu'il vous appartient, inconditionnellement. C'est la sécurité dont il a vraiment besoin." }
        ],
        belief: "Le monde est dangereux et imprévisible. Je ne peux pas faire confiance à ma propre guidance — je dois être vigilant et trouver une autorité extérieure fiable.",
        compulsion: { name: "Peur (anxiété chronique)", desc: "Une « peur de la peur » qui pousse à imaginer tous les scénarios catastrophes. Le doute ronge la certitude, la méfiance questionne chaque intention." },
        virtue: { name: "Courage (Foi)", desc: "Non pas l'absence de peur, mais la capacité d'agir malgré la peur. Trouver son autorité et sa sécurité non plus à l'extérieur, mais en soi-même." },
        identity: "Je suis celui qui doute (et qui est loyal).",
        missionLibre: "Le 6 libéré ne cherche plus la sécurité dehors. Il devient un leader courageux et engagé : sa lucidité devient prévoyance stratégique, sa loyauté un engagement indéfectible. Il pose les questions difficiles que personne n'ose poser.",
        wings: "Type 5 (le penseur) et Type 7 (l'optimiste)"
    },
    {
        num: 7,
        name: "L'Épicurien",
        color: "#d4853c",
        short: "Un enthousiasme débordant, un besoin de liberté.",
        fear: "Souffrir, être privé, s'ennuyer",
        need: "Liberté et possibilités",
        metaphor: "L'enfant qui semble émettre sa propre lumière, qui illumine la pièce par sa seule présence. Il a des idées en permanence, des projets qui se bousculent comme des oiseaux. L'ennui, c'est comme retenir son souffle : possible quelques secondes, mais contre nature. L'Aventurier vit pour l'instant, pour la possibilité. C'est magnifique. C'est aussi épuisant.",
        integration: {
            toward: 5,
            desc: "En intégration vers le type 5, il découvre la profondeur. Il commence à creuser au lieu de danser à la surface. Le temps d'attention s'allonge. C'est l'âge d'or de l'Aventurier en santé."
        },
        disintegration: {
            toward: 1,
            desc: "En désintégration vers le type 1, l'enfant devient rigide, critique, perfectionniste. L'optimisme devient cynisme. Le mouvement devient paralysie."
        },
        ages: {
            "5-8": "Mille projets dès le lundi matin. Piano le lundi, escalade le mardi, botanique le mercredi. Il peut commencer cinq projets et en terminer aucun. Mais il transforme le repas en fête et le trajet en aventure. L'anxiété ? Il l'esquive.",
            "8-12": "Le papillon social : toujours en mouvement, invité à chaque fête. La FOMO s'installe. La concentration à l'école est un défi — non par incapacité, mais par problème de sélection de ce qui mérite son attention.",
            "13-16": "Il veut tout vivre, tout essayer. Les risques deviennent concrets. Mais c'est aussi l'enfant qui rêve de changer le monde et qui inspire les autres par son optimisme."
        },
        keys: [
            { title: "De la structure, mais pas trop", desc: "L'Aventurier a besoin de limites pour être libre. Des limites claires sur les écrans, les activités, le sommeil. Mais laissez de la place pour la spontanéité. C'est l'équilibre qui compte." },
            { title: "Aidez-le à terminer les choses", desc: "Non en le forçant, mais en restant présent. L'Aventurier a besoin de sentir que laisser briller longtemps, c'est magique — pas seulement l'étincelle du début." },
            { title: "Nommez l'évitement", desc: "« Je remarque que quand c'est difficile, tu changes de sujet. C'est normal. Mais ensemble, on peut apprendre à rester un peu même quand c'est moins brillant. » L'Aventurier a besoin d'apprendre la profondeur par la découverte." }
        ],
        belief: "Le monde est plein d'opportunités, mais je dois éviter la douleur et la limitation. Je dois garder mes options ouvertes pour ne pas être piégé.",
        compulsion: { name: "Gourmandise (d'expériences)", desc: "Une soif insatiable d'expériences, d'idées, de plaisirs, de projets. Il consomme toujours plus de stimulations pour ne pas avoir à digérer le présent." },
        virtue: { name: "Sobriété (Joie pleine)", desc: "Non pas la privation, mais la capacité de trouver une satisfaction entière dans l'expérience présente, telle qu'elle est. La joie comme état d'être, pas comme stimulation." },
        identity: "Je suis quelqu'un d'heureux (et de libre).",
        missionLibre: "Le 7 libéré ne fuit plus l'ombre. Il devient un leader joyeux et visionnaire : son optimisme n'est plus une fuite mais une force résiliente, et il couple sa vision des possibilités à la discipline pour les réaliser.",
        wings: "Type 6 (le prudent) et Type 8 (le leader)"
    },
    {
        num: 8,
        name: "Le Chef",
        color: "#9b4a4a",
        short: "Une force tranquille (ou pas si tranquille), un besoin de contrôle.",
        fear: "Être contrôlé, montrer sa faiblesse",
        need: "Contrôle, justice et intensité",
        metaphor: "L'enfant qui prend de la place. Pas toujours méchamment, mais avec une présence qui se fait sentir. Il sait ce qu'il veut. Il voit les dynamiques de pouvoir instinctivement. Le monde est fait de forts et de faibles, et le Chef refuse d'être du mauvais côté — pas pour lui, mais pour sa tribu, les petits qu'il a pris sous son aile.",
        integration: {
            toward: 2,
            desc: "En intégration vers le type 2, le plus dur devient accessible : la tendresse. Le Chef apprend à montrer sa vulnérabilité, à demander de l'aide. Le guerrier découvre qu'aimer peut être plus puissant que dominer."
        },
        disintegration: {
            toward: 5,
            desc: "En désintégration vers le type 5, c'est l'isolement total. L'enfant devient silencieux, soupçonneux, froid. La confiance disparaît. Il construit des mondes paranoïaques dans sa tête."
        },
        ages: {
            "5-8": "Dès quatre ans, il refuse de se coucher sans explication. L'autorité, pour le Chef, ça se gagne. Il protège les autres enfants et a un sens de la justice instinctif. Les crises sont spectaculaires — mais c'est une inébranlable honnêteté.",
            "8-12": "Le chef de meute. Leader naturel du groupe, il décide où aller et à quoi jouer. Les confrontations avec l'autorité scolaire apparaissent. La vulnérabilité ? Il la cache comme un secret honteux.",
            "13-16": "Une force de nature. L'intensité monte. Pensée binaire : fort ou faible, loyal ou traître. Il peut blesser par la force de sa présence, ou se lever contre l'injustice. Derrière tout cela : une peur terrifiante d'être contrôlé."
        },
        keys: [
            { title: "Soyez plus fort, mais juste", desc: "Le Chef teste l'autorité parce qu'il en a besoin. Soyez ferme, cohérent, impartial, sans ironie ni dédain. Si vous montrez de la force tranquille avec intégrité, le Chef s'apaisera." },
            { title: "Créez de l'espace pour la vulnérabilité", desc: "Non pas en l'exigeant, mais en la nommant. « J'ai remarqué que c'est difficile de dire quand tu as peur. Mais admettre qu'on a besoin d'aide, c'est le contraire de la faiblesse. »" },
            { title: "Reconnaissez le bien qu'il fait", desc: "Le Chef protège les autres. Nommez-le : « Tu as défendu ce garçon que personne ne regardait. C'est beau. » Le Chef a besoin de savoir que sa force peut être une beauté, pas seulement une menace." }
        ],
        belief: "Le monde est une jungle où les forts dominent les faibles. Pour survivre et protéger les miens, je dois être fort, prendre le contrôle et ne jamais montrer ma vulnérabilité.",
        compulsion: { name: "Luxure (de vie, d'intensité)", desc: "Une soif d'intensité et de contrôle : repousser les limites, prendre plus d'espace, ne jamais se laisser dominer ni paraître vulnérable. L'intensité comme façon de rester maître de la situation et de sentir sa propre vitalité." },
        virtue: { name: "Innocence (Force protectrice)", desc: "Non pas la naïveté, mais le courage de déposer son armure, d'ouvrir son cœur et de redécouvrir sa propre tendresse. La vraie force protège plutôt qu'elle ne domine." },
        identity: "Je suis la force.",
        missionLibre: "Le 8 libéré n'a plus besoin de dominer. Il devient un leader protecteur et magnanime : sa puissance crée un espace sûr où les autres peuvent grandir, et il défend la justice plutôt que d'imposer sa volonté.",
        wings: "Type 7 (l'energique) et Type 9 (le pacifique)"
    },
    {
        num: 9,
        name: "Le Médiateur",
        color: "#7a9a7b",
        short: "Une douceur apaisante, un besoin d'harmonie.",
        fear: "Le conflit, être insignifiant",
        need: "Paix, harmonie et connexion",
        metaphor: "L'enfant qui apaise. Il entre dans une pièce et on sent une détente. Le ton baisse. Les voix se font plus douces. Le Médiateur n'a pas besoin de faire grand-chose. Il existe, et cela suffit. Il a une capacité d'absorption extraordinaire : il absorbe les joies, les tristesses, les conflits. Mais sous la surface lisse, les courants peuvent être complexes.",
        integration: {
            toward: 3,
            desc: "En intégration vers le type 3, l'enfant commence à avoir des objectifs. Un mouvement intentionnel. Il découvre qu'il peut vouloir, poursuivre, réussir quelque chose. Il devient actif au lieu de réactif."
        },
        disintegration: {
            toward: 6,
            desc: "En désintégration vers le type 6, l'apaisement devient anxiété. L'enfant devient soupçonneux et craintif, imaginant les pires scénarios, doutant de ce qui était autrefois évident."
        },
        ages: {
            "5-8": "L'enfant « facile » qui dit toujours oui. Pas de crises, pas de conflits. Mais il y a une forme de résistance passive — le Médiateur ne dit pas non par politesse, mais parce qu'il a compris que c'est plus sécurisant. Il a un sens extraordinaire de l'empathie.",
            "8-12": "Le médiateur invisible. Il flotte, sympathique à tout groupe, mais sans vraiment appartenir à aucun. Il risque de se perdre dans les autres. La procrastination s'installe : s'engager ressemble à choisir une identité.",
            "13-16": "Le Médiateur commence à se demander « Et moi ? » et cette question est terrifiante. Il est vulnérable aux pressions des pairs. Mais c'est aussi l'âge où il peut trouver sa voix, s'il est accompagné avec douceur."
        },
        keys: [
            { title: "Posez des questions, pas des attentes", desc: "Ne demandez pas « Qu'est-ce que tu veux ? » avec l'attente d'une réponse immédiate. Posez et attendez. Le Médiateur doit apprendre lentement qu'avoir une préférence est normal et autorisé." },
            { title: "Validez ses limites molles", desc: "Quand le Médiateur dit « je ne suis pas sûr » ou « peut-être », c'est une limite, pas une indécision. Respectez-la. Il doit apprendre que s'affirmer ne signifie pas blesser les autres." },
            { title: "Connectez-le à lui-même, pas aux autres", desc: "Aidez-le à distinguer : ce qui vient de lui, ce qui vient de sa mère, ce qui vient de son groupe. « Ceci est ce que TU ressens. Ceci est ce que TU crois. Ceci est ce que TU veux. »" }
        ],
        belief: "Mon opinion, mes désirs et ma présence ne sont pas si importants. Pour maintenir la paix, je ne dois pas m'affirmer — cela risquerait de créer des conflits.",
        compulsion: { name: "Paresse de soi", desc: "Pas une paresse physique, mais spirituelle : une tendance à s'oublier, à anesthésier ses propres désirs et sa colère pour ne pas déranger l'ordre établi." },
        virtue: { name: "Action juste (Amour saint)", desc: "S'engager pleinement dans la vie depuis son propre centre, en étant éveillé à soi-même. Sa contribution unique compte ; la vraie paix vient de la présence engagée." },
        identity: "Je suis facile à vivre.",
        missionLibre: "Le 9 libéré ne s'efface plus. Il devient un leader unificateur et éveillé : sa capacité à voir tous les points de vue n'est plus une paralysie mais un outil puissant de médiation, et sa présence calme apaise les conflits.",
        wings: "Type 8 (le protecteur) et Type 1 (le consciencieux)"
    }
];

// QuizMode — kept (used by QuizResult.tsx and admin.tsx). The legacy v2
// quiz question banks (QUIZ_ENFANT/ADO/ADULTE, DISAMBIG_POOL) and their
// interfaces were removed; the live quiz uses constants/quiz_v3.ts.
export type QuizMode = 'enfant' | 'ado' | 'adulte';

// ===== CHAPTERS =====
export const CHAPTERS = [
    {
        part: "Premiere partie — Le plus beau chantier du monde",
        chapters: [
            { num: 1, title: "Le seul animal qui ne sait pas elever ses petits", quote: "« L'homme est la mesure de toutes choses » — Protagoras", desc: "L'homme est le seul être vivant qui n'est pas programmé pour élever ses petits. Tout est à construire. Cette liberté est vertigineuse : pas de mode d'emploi, pas d'instinct qui dicte quoi faire. C'est le point de départ du livre — accepter qu'être parent, c'est avancer sans carte.", keyPoints: ["L'homme est le seul être vivant qui n'a pas de programme inné pour élever ses petits", "La parentalité est un chantier permanent, sans mode d'emploi", "Le dîner du mardi soir comme rituel sacré de connexion familiale", "Le principe du PGHM : en cordée, on n'avance pas tant que quelqu'un n'est pas entendu", "Ce livre n'est pas une méthode mais un récit personnel d'un père imparfait"], reflections: ["Quel est votre plus grand défi quotidien en tant que parent ?", "Avez-vous un rituel familial qui crée de la connexion ?", "Qu'est-ce que vous aimeriez transmettre que vous n'avez pas reçu ?"] },
            { num: 2, title: "Le chameau, le lion et l'enfant", quote: "« Il faut encore porter du chaos en soi pour enfanter une etoile dansante » — Nietzsche", desc: "Inspiré des trois métamorphoses de Nietzsche. Le chameau porte le poids de l'héritage, le lion se révolte contre les « tu dois », l'enfant crée librement. En tant que parent, on traverse ces phases : subir ce qu'on a reçu, s'en libérer, puis choisir ce qu'on veut transmettre.", keyPoints: ["Les trois métamorphoses de Nietzsche : chameau (porter l'héritage), lion (se révolter), enfant (créer librement)", "En tant que parent, on traverse ces phases : subir ce qu'on a reçu, s'en libérer, choisir ce qu'on veut transmettre", "L'Ennéagramme comme carte de la personnalité, pas une boîte", "Chaque type voit le monde avec un filtre différent — les « lunettes »", "Importance de la connaissance de soi avant de vouloir éduquer"], reflections: ["À quelle métamorphose vous situez-vous aujourd'hui : chameau, lion ou enfant ?", "Quel héritage familial avez-vous choisi consciemment de transmettre ?", "Connaissez-vous votre propre type Ennéagramme ?", "En quoi vos « lunettes » diffèrent-elles de celles de votre enfant ?"] },
            { num: 3, title: "On ne choisit pas sa famille (mais on la construit)", quote: "« Dis-moi comment tu aimes, je te dirai quelle societe tu construis »", desc: "Chaque famille est une société en miniature avec ses lois, ses rapports de force, ses valeurs implicites. Ce chapitre explore comment on construit consciemment le système familial plutôt que de le subir.", keyPoints: ["Chaque famille est une société en miniature avec ses lois et valeurs implicites", "Le concept du « monstre dans la cave » : nos mécanismes de défense inconscients", "Trois monstres : le corbeau (critique interne), le chameau (surcharge), le renard (esquive)", "Nommer le monstre = commencer à le désactiver", "Quand on crie sur son enfant, c'est souvent le monstre qui parle"], reflections: ["Quel est votre « monstre » principal : le corbeau, le chameau ou le renard ?", "Dans quelles situations votre monstre prend-il le dessus ?", "Comment réagissez-vous quand vous êtes fatigué(e) et que votre enfant vous sollicite ?", "Pouvez-vous nommer une fois récente où votre réaction était disproportionnée ?"] }
        ]
    },
    {
        part: "Deuxieme partie — Ouvre les yeux",
        chapters: [
            { num: 4, title: "Neuf facons de voir le monde", quote: "« Connais-toi toi-meme » — Temple de Delphes", desc: "Introduction à l'Ennéagramme : neuf façons de voir le monde, neuf lentilles différentes. Votre enfant et vous n'avez peut-être pas la même lentille. C'est là que résident les malentendus — pas de malveillance, juste deux mondes qui ne parlent pas la même langue.", keyPoints: ["Chaque enfant a sa propre logique interne et son mécanisme de survie affectif", "L'Ennéagramme décrit 9 façons fondamentales de percevoir le monde", "L'enfant n'est pas une version miniature du parent", "Les malentendus viennent de deux mondes qui ne parlent pas la même langue", "Ne pas projeter son propre type sur ses enfants"], reflections: ["En quoi votre enfant perçoit-il le monde différemment de vous ?", "Avez-vous déjà projeté vos propres attentes sur votre enfant ?", "Quel malentendu récurrent existe entre vous et votre enfant ?"] },
            { num: 5, title: "Ce qui parle quand vous criez", quote: "« Ce que tu ne ramenes pas a la conscience te revient sous forme de destin » — Jung", desc: "Explorer ses zones d'ombre. Quand on crie sur ses enfants, c'est souvent notre propre blessure qui parle. Ce chapitre invite à identifier son « monstre » — cette part d'ombre qui nous habite et qui, une fois reconnue, peut devenir une force.", keyPoints: ["Quand on crie, c'est souvent notre propre blessure qui parle, pas l'éducation", "Le travail d'ombre (shadow work) de Jung appliqué à la parentalité", "Les valeurs fondamentales de chaque type guident les décisions parentales", "Les conflits de valeurs dans le couple sont normaux — les comprendre change tout", "L'importance de comprendre les valeurs de l'autre avant de les juger"], reflections: ["Quelle blessure personnelle se réactive quand vous criez ?", "Connaissez-vous les valeurs non-négociables de votre conjoint(e) ?", "Sur quel sujet vos valeurs parentales divergent-elles le plus ?", "Comment réagissez-vous quand votre enfant touche à vos valeurs profondes ?"] },
            { num: 6, title: "Ce qui ne se negocie pas", quote: "« Il n'y a pas de vent favorable pour celui qui ne sait pas ou il va » — Seneque", desc: "Définir ses valeurs non-négociables en tant que parent. Pas des règles arbitraires, mais une boussole intérieure. C'est en explorant son monstre qu'on découvre ses valeurs — l'énergie est la même, juste canalisée différemment.", keyPoints: ["Les 5 langages de l'amour de Gary Chapman appliqués à la parentalité", "Chaque enfant a un langage de l'amour dominant : paroles, temps, cadeaux, services, toucher", "Le parent donne souvent de l'amour dans SON langage, pas celui de l'enfant", "Le croisement Ennéagramme × langages de l'amour pour comprendre plus finement", "L'amour n'est pas un sentiment mais une décision et un acte intentionnel"], reflections: ["Quel est votre langage de l'amour dominant ?", "Quel est celui de votre enfant ?", "Donnez-vous de l'amour dans votre langage ou dans celui de votre enfant ?", "Comment pourriez-vous « traduire » votre amour dans le langage de votre enfant ?"] }
        ]
    },
    {
        part: "Troisieme partie — Ce qui tient quand tout tremble",
        chapters: [
            { num: 7, title: "Le verbe le plus difficile", quote: "« L'amour prend patience, l'amour rend service... » — 1 Corinthiens 13", desc: "Qu'est-ce que l'amour ? Non pas un sentiment, mais un verbe. Un choix. Une exigence. Ce chapitre définit l'amour parental comme un acte délibéré, quotidien, difficile — pas comme une émotion spontanée.", keyPoints: ["L'amour n'est pas un sentiment spontané mais un verbe — un choix quotidien", "Le concept du « parent suffisamment bon » de Winnicott", "La parentalité n'est pas une performance mais une relation", "La différence entre aimer et bien aimer", "La robustesse familiale vient de la qualité des liens, pas de la force individuelle"], reflections: ["Cherchez-vous à être un parent parfait ou un parent « suffisamment bon » ?", "Quand l'amour parental devient-il le plus difficile pour vous ?", "Comment montrez-vous concrètement votre amour au quotidien ?"] },
            { num: 8, title: "Ce que la foret sait et la monoculture ignore", quote: "« Le chene qui n'a pas plie sous le vent se brise. Le roseau plie et ne se rompt jamais. » — La Fontaine", desc: "La robustesse inspirée du vivant, selon les travaux d'Olivier Hamant. Une forêt diverse est plus robuste qu'une monoculture. De même, une famille qui accepte ses différences et ses imperfections résiste mieux aux tempêtes.", keyPoints: ["La diversité est une force, pas un problème — comme une forêt mixte vs une monoculture", "La robustesse familiale vient de la diversité des profils, pas de l'uniformité", "La différence de profils dans le couple est une complémentarité", "Le Wu Wei (sagesse taoïste) : l'art de ne pas forcer", "Les meilleurs moments de paternité = ceux où on n'a rien forcé"], reflections: ["Comment la diversité des profils enrichit-elle votre famille ?", "Quel trait de votre enfant vous agace le plus ? Pourrait-il être une force ?", "Quand avez-vous lâché prise et constaté un meilleur résultat ?", "Votre famille ressemble-t-elle plutôt à une forêt mixte ou à une monoculture ?"] },
            { num: 9, title: "Ce que Laurent m'a appris", quote: "« Pardonner, c'est liberer un prisonnier et decouvrir que ce prisonnier, c'etait soi. » — Lewis B. Smedes", desc: "Le pardon comme geste fondamental. Nous blesserons ceux que nous aimons — par maladresse, par fatigue. Ni l'amour ni la robustesse ne survivent sans ce troisième geste, le plus difficile et le plus décisif.", keyPoints: ["Le pardon est l'acte central de la robustesse familiale", "La différence entre s'excuser (atténuer) et demander pardon (reconnaître)", "Le pardon envers soi-même est le plus difficile", "La culpabilité parentale est un monstre silencieux", "Le pardon est l'endroit où la connaissance de soi et l'amour de l'autre se rejoignent"], reflections: ["Quand avez-vous dernièrement demandé pardon à votre enfant ?", "Y a-t-il quelque chose que vous ne vous êtes pas encore pardonné en tant que parent ?", "Faites-vous la différence entre vous excuser et demander pardon ?", "Comment le pardon pourrait-il transformer une relation familiale tendue ?"] }
        ]
    },
    {
        part: "Quatrieme partie — Apprendre a regarder partir",
        chapters: [
            { num: 10, title: "La main qu'on lache", quote: "« L'enfant est l'avenir de l'homme. » — Gaston Bachelard", desc: "Le dernier chapitre parle du lâcher-prise. Quand les enfants grandissent, le parent doit apprendre à lâcher la main qu'il tient. Tous les outils du livre — les profils, les monstres, les valeurs, l'amour — sont forgés dans l'enfance pour préparer ce moment.", keyPoints: ["L'adolescence est une métamorphose, pas une crise", "L'émergence du lion chez l'ado : le « je veux » contre le « tu dois »", "Comprendre le type de l'ado pour adapter sa réponse parentale", "Se rendre inutile : le paradoxe ultime de la parentalité", "Le travail est réussi quand on ne l'est plus — quand l'enfant peut voler"], reflections: ["Comment vivez-vous le besoin d'autonomie croissant de votre enfant ?", "Quelle est la chose la plus difficile à « lâcher » dans votre rôle de parent ?", "Que souhaitez-vous que votre enfant retienne de son enfance ?", "Êtes-vous prêt(e) à devenir « inutile » ?"] }
        ]
    },
    {
        part: "Annexe",
        chapters: [
            { num: "A", title: "L'Enneagramme au quotidien", quote: "", desc: "Un guide détaillé des neuf profils de l'Ennéagramme, adapté aux enfants par tranche d'âge (5-8 ans, 8-12 ans, 13-16 ans). Avec un quiz, des portraits complets, les mécanismes d'intégration et de désintégration, et trois clés d'accompagnement pour chaque type.", keyPoints: ["Les 9 types en détail avec portraits par tranche d'âge", "Quiz pratique pour identifier le profil de votre enfant", "Mécanismes d'intégration et de désintégration", "3 clés d'accompagnement concrètes pour chaque type", "Le concept des ailes : les nuances entre types voisins"], reflections: ["Avez-vous reconnu votre enfant dans l'un des 9 portraits ?", "Quel profil vous surprend le plus ?", "Quelles clés d'accompagnement allez-vous essayer cette semaine ?"] }
        ]
    }
];

// ===== Q&A DATABASE =====
export const QA_DB = [
    {
        q: "Comment identifier le profil Enneagramme de mon enfant ?",
        a: "Le livre propose un quiz de 9 situations du quotidien (dessin, parc, changement de programme, repas de famille...). Pour chaque situation, choisissez la réaction qui ressemble le plus à votre enfant. Les résultats vous donneront une première intuition. Mais rappelez-vous : ce quiz n'est qu'une porte d'entrée. Un enfant est toujours plus complexe qu'une lettre. L'essentiel est de lire les portraits avec le cœur ouvert, en cherchant à reconnaître, non à enfermer.",
        tags: ["enneagramme", "profil", "quiz", "type", "identifier"],
        source: "Annexe — L'Enneagramme au quotidien"
    },
    {
        q: "Qu'est-ce que l'integration et la desintegration dans l'Enneagramme ?",
        a: "L'Ennéagramme n'est pas un système statique. Quand votre enfant grandit dans la sécurité affective, dans la joie, il intègre : il acquiert les qualités saines d'un autre type. Par exemple, un type 1 accepté qui se sent vraiment intégré développe l'optimisme du type 7. Inversement, quand l'enfant est sous stress, fatigué, menacé, il désintègre : il adopte les traits malsains d'un autre type. Ces moments de désintégration sont des signaux qui disent « Mon enfant souffre. Je dois le rassurer. »",
        tags: ["integration", "desintegration", "stress", "securite", "enneagramme", "croissance"],
        source: "Annexe — Integration et desintegration"
    },
    {
        q: "Qu'est-ce que les ailes dans l'Enneagramme ?",
        a: "Les ailes sont les deux types voisins de votre enfant sur le cercle de l'Ennéagramme. Par exemple, un type 1 a pour ailes le type 9 et le type 2. Cela signifie que votre enfant peut parfois basculer vers les tendances de l'un ou l'autre voisin. Reconnaître l'aile dominante de votre enfant, c'est ajouter une teinte à votre compréhension. Ce n'est pas une complication — c'est de la précision amoureuse.",
        tags: ["ailes", "wings", "enneagramme", "voisin", "type"],
        source: "Annexe — Les ailes"
    },
    {
        q: "Pourquoi est-ce que je crie sur mes enfants ?",
        a: "Le chapitre 5, « Ce qui parle quand vous criez », explore cette question essentielle. Quand vous criez, c'est souvent votre propre blessure qui parle, pas une réaction proportionnée à ce que l'enfant a fait. Jung disait : « Ce que tu ne ramènes pas à la conscience te revient sous forme de destin. » Identifier votre « monstre » — cette part d'ombre — est la première étape pour arrêter de le projeter sur vos enfants.",
        tags: ["crier", "colere", "ombre", "monstre", "jung", "blessure", "emotion"],
        source: "Chapitre 5 — Ce qui parle quand vous criez"
    },
    {
        q: "Comment definir mes valeurs en tant que parent ?",
        a: "Le chapitre 6 parle de « ce qui ne se négocie pas ». L'idée est de définir une boussole intérieure, pas des règles arbitraires. Et voici le paradoxe : c'est en explorant votre monstre (chapitre 5) que vous découvrez vos valeurs. L'énergie est la même, juste canalisée différemment. Le corbeau qui murmure « tu n'es pas assez » est la même énergie qui vous pousse à apprendre, comprendre et transmettre.",
        tags: ["valeurs", "boussole", "principes", "non-negociable", "education"],
        source: "Chapitre 6 — Ce qui ne se negocie pas"
    },
    {
        q: "C'est quoi la robustesse parentale ?",
        a: "Inspiré des travaux d'Olivier Hamant, le chapitre 8 compare la famille à une forêt : une forêt diverse est plus robuste qu'une monoculture. La robustesse, c'est la capacité à persister malgré l'imprévisible. Une famille qui accepte ses différences et ses imperfections résiste mieux aux tempêtes qu'une famille qui vise la perfection. C'est le chêne qui se brise sous le vent, tandis que le roseau plie et ne se rompt jamais.",
        tags: ["robustesse", "resilience", "foret", "hamant", "vivant", "imperfection", "diversite"],
        source: "Chapitre 8 — Ce que la foret sait et la monoculture ignore"
    },
    {
        q: "Comment aimer ses enfants ?",
        a: "Le chapitre 7 définit l'amour non comme un sentiment, mais comme un verbe. Un choix délibéré, quotidien, difficile. Aimer, ce n'est pas une émotion spontanée — c'est le verbe le plus difficile. L'amour parental demande patience, service, humilité. Et surtout, il demande de ne pas confondre aimer avec contrôler.",
        tags: ["amour", "aimer", "verbe", "patience", "choix", "sentiment"],
        source: "Chapitre 7 — Le verbe le plus difficile"
    },
    {
        q: "Comment pardonner en tant que parent ?",
        a: "Le chapitre 9, inspiré par ce que Laurent a appris à l'auteur, parle du pardon comme geste fondamental. Nous blesserons ceux que nous aimons — par maladresse, par fatigue, par notre monstre intérieur. Ni l'amour ni la robustesse ne survivent sans le pardon. Comme le dit Lewis B. Smedes : « Pardonner, c'est libérer un prisonnier et découvrir que ce prisonnier, c'était soi. »",
        tags: ["pardon", "pardonner", "erreur", "blessure", "faute", "culpabilite"],
        source: "Chapitre 9 — Ce que Laurent m'a appris"
    },
    {
        q: "Comment lacher prise quand mes enfants grandissent ?",
        a: "Le chapitre 10, « La main qu'on lâche », est le dernier du livre. Il parle de cette métamorphose qui arrive quand les enfants grandissent et que le parent doit apprendre à lâcher la main qu'il tient. Tous les outils du livre — les profils, les monstres, les valeurs, l'amour, le pardon — sont forgés dans l'enfance pour préparer ce moment. C'est peut-être la tâche la plus difficile : regarder partir celui qu'on a accompagné.",
        tags: ["lacher prise", "adolescence", "grandir", "partir", "autonomie", "separation"],
        source: "Chapitre 10 — La main qu'on lache"
    },
    {
        q: "Qu'est-ce que les trois metamorphoses de Nietzsche ?",
        a: "Le chapitre 2 s'inspire d'Ainsi parlait Zarathoustra. Le chameau porte le poids de l'héritage — tout ce que nos parents, la société, la culture ont posé sur nos épaules. Le lion se révolte contre les « tu dois » et dit « je veux ». L'enfant crée librement, sans le poids du passé ni la colère du présent. En tant que parent, on traverse ces phases : d'abord subir ce qu'on a reçu, puis s'en libérer, puis choisir ce qu'on veut transmettre.",
        tags: ["nietzsche", "chameau", "lion", "enfant", "metamorphose", "heritage", "liberte"],
        source: "Chapitre 2 — Le chameau, le lion et l'enfant"
    },
    {
        q: "Pourquoi mon enfant de type 1 est-il si critique ?",
        a: "L'enfant de type 1 a un fil à plomb en lui qui évalue constamment : c'est juste ou faux, c'est bien ou mal. Il ne critique pas par méchanceté, mais par un sens inné de la justice et de l'ordre. Il se critique lui-même encore plus durement. La clé est de valider ses standards sans les reproduire, de lui offrir des espaces d'imperfection, et surtout de lui dire : « Tu n'es pas responsable de rendre le monde parfait. Tes erreurs font partie de qui tu es. Et je t'aime dans tes erreurs. »",
        tags: ["type 1", "perfectionniste", "critique", "justice", "ordre", "erreur"],
        source: "Annexe — Type 1, Le Perfectionniste"
    },
    {
        q: "Mon enfant aide tout le monde mais s'oublie. C'est normal ?",
        a: "Votre enfant est probablement de type 2, le Généreux. C'est un enfant qui trouve sa place en étant utile, en aimant les autres. Mais le secret du type 2, c'est que cette générosité peut devenir une prison — donner pour être aimé, puis souffrir quand l'amour ne semble pas à la hauteur du don. Aidez-le à découvrir ses propres désirs et enseignez-lui que dire non, c'est un acte d'amour envers soi-même.",
        tags: ["type 2", "genereux", "aide", "oubli de soi", "dire non", "generosite"],
        source: "Annexe — Type 2, Le Genereux"
    },
    {
        q: "Mon enfant est obsede par la reussite. Comment reagir ?",
        a: "Votre enfant est peut-être de type 3, le Battant. Il a une capacité innée à performer et à réussir, mais risque de confondre ce qu'il fait avec ce qu'il est. La clé est de séparer votre amour de ses résultats. Célébrez qu'il existe, pas ce qu'il fait. Créez des espaces de non-performance où il n'y a rien à prouver. L'enfant doit apprendre que vous aimez sa présence, non sa productivité.",
        tags: ["type 3", "gagneur", "reussite", "performance", "echec", "image"],
        source: "Annexe — Type 3, Le Battant"
    },
    {
        q: "Mon enfant est tres sensible et se sent different. Comment l'aider ?",
        a: "Votre enfant est peut-être de type 4, l'Artiste. Il naît avec la conviction d'être différent, le mauvais mot dans la chanson. Cette sensation le pousse vers l'authenticité, mais d'abord elle le rend seul. Dites-lui que ses émotions sont réelles, pas dramatiques. Que sa différence est son chemin, pas sa prison. Et surtout, restez présent quand il s'enferme — il a besoin de savoir qu'on ne l'oublie pas, pas qu'on le force à sortir.",
        tags: ["type 4", "artiste", "sensible", "different", "emotion", "authenticite", "solitude"],
        source: "Annexe — Type 4, L'Artiste"
    },
    {
        q: "Mon enfant passe son temps seul a lire et observer. Dois-je m'inquieter ?",
        a: "Si votre enfant est de type 5 (l'Observateur), sa solitude n'est pas un symptôme à guérir — c'est de la respiration. Il a besoin d'espace pour fonctionner, de temps pour recharger. Ne le forcez pas à participer juste pour participer. Mais assurez-vous qu'il est seul de façon saine. Validez son expertise, créez des espaces où son savoir compte, et rappelez-lui que le cœur existe même derrière l'intellect.",
        tags: ["type 5", "observateur", "solitude", "lecture", "introverti", "espace", "savoir"],
        source: "Annexe — Type 5, L'Observateur"
    },
    {
        q: "Mon enfant est tres anxieux et pose beaucoup de questions. Que faire ?",
        a: "Votre enfant est peut-être de type 6, le Loyal. Il scanne en permanence l'horizon pour les dangers. Il a un comité intérieur de voix qui discutent : « Et si... ? » Ce n'est pas de la névrose, c'est de la vigilance — de l'amour qui a peur. La clé est la cohérence : si vous dites quelque chose, faites-le. Apprenez-lui à vivre avec son doute plutôt qu'à le combattre. Et montrez-lui qu'il vous appartient, inconditionnellement.",
        tags: ["type 6", "loyal", "anxiete", "peur", "securite", "confiance", "doute"],
        source: "Annexe — Type 6, Le Loyal"
    },
    {
        q: "Mon enfant commence plein de choses sans jamais finir. C'est un probleme ?",
        a: "C'est typique du type 7, l'Aventurier. Il a des idées en permanence, des projets qui se bousculent. Le moment excitant dure seulement jusqu'au moment où il faut vraiment le faire. Ce n'est pas de la paresse — c'est que l'Aventurier fuit l'inconfort émotionnel par instinct. Mettez de la structure (mais pas trop), aidez-le à terminer les choses en restant présent, et nommez l'évitement sans le reprocher.",
        tags: ["type 7", "aventurier", "finir", "projets", "enthousiasme", "ennui", "concentration"],
        source: "Annexe — Type 7, L'Aventurier"
    },
    {
        q: "Mon enfant veut tout controler et refuse l'autorite. Comment gerer ?",
        a: "Votre enfant est probablement de type 8, le Chef. L'autorité, pour lui, ça se gagne. Il voit les dynamiques de pouvoir instinctivement et refuse d'être du mauvais côté. Soyez plus fort mais juste — ferme, cohérent, impartial, sans ironie. Créez de l'espace pour la vulnérabilité en la nommant, sans l'exiger. Et reconnaissez le bien qu'il fait : il protège les autres, et cette force peut être une beauté.",
        tags: ["type 8", "chef", "autorite", "controle", "pouvoir", "force", "leader"],
        source: "Annexe — Type 8, Le Chef"
    },
    {
        q: "Mon enfant dit toujours oui et n'a jamais d'opinion. C'est normal ?",
        a: "Votre enfant est peut-être de type 9, le Médiateur. Il dit oui non par indécision, mais parce qu'il a compris que c'est plus sécurisant. Il a une résistance passive : si vous insistez trop, il se repliera dans un silence qui peut durer. Posez des questions sans attente de réponse immédiate. Validez ses « peut-être » comme des limites, pas des hésitations. Aidez-le à se connecter à lui-même : « Ceci est ce que TU veux. »",
        tags: ["type 9", "mediateur", "harmonie", "opinion", "passif", "oui", "conflit"],
        source: "Annexe — Type 9, Le Mediateur"
    },
    {
        q: "L'homme sait-il naturellement elever ses enfants ?",
        a: "Non, et c'est le point de départ du livre. Le chapitre 1 explique que l'homme est le seul animal qui ne sait pas élever ses petits. Il n'est pas programmé. Tout est à construire. Cette liberté est vertigineuse — pas de mode d'emploi, pas d'instinct qui dicte quoi faire. Mais c'est aussi ce qui rend la parentalité si riche : on peut choisir quel parent on veut être.",
        tags: ["instinct", "nature", "animal", "construire", "liberte", "choix"],
        source: "Chapitre 1 — Le seul animal qui ne sait pas elever ses petits"
    },
    {
        q: "Comment construire sa famille de facon consciente ?",
        a: "Le chapitre 3 rappelle qu'on ne choisit pas sa famille, mais qu'on la construit. Chaque famille est une société en miniature avec ses lois, ses rapports de force, ses valeurs implicites. Le livre invite à passer d'un système subi à un système choisi, en prenant conscience de la façon dont on distribue le pouvoir, dont on récompense et dont on punit au sein de la famille.",
        tags: ["famille", "construire", "systeme", "valeurs", "societe", "choix", "conscient"],
        source: "Chapitre 3 — On ne choisit pas sa famille (mais on la construit)"
    },
    {
        q: "Quel est le message central du livre ?",
        a: "Le livre porte un message central : on ne devient pas un meilleur parent en appliquant des méthodes, mais en acceptant de se transformer soi-même. Le titre « On a tous besoin de quelqu'un d'autre » est autant une déclaration de vulnérabilité que de force. L'alignement — être le même partout où l'on est — est ce qui donne au leadership parental sa puissance. De Nietzsche à l'Ennéagramme, de Jung à l'Arbinger Institute, le livre tisse philosophie, psychologie et expérience vécue.",
        tags: ["message", "central", "resume", "theme", "alignement", "transformation"],
        source: "A propos du livre"
    },
    {
        q: "Comment accompagner mon enfant selon son age ?",
        a: "L'annexe du livre détaille chaque type de l'Ennéagramme selon trois tranches d'âge : 5-8 ans (les fondations), 8-12 ans (le renforcement des traits) et 13-16 ans (la crise d'identité). Ces tranches correspondent à des tournants du développement moral et affectif. L'enfant de 5 ans ne raisonne pas comme l'adolescent de 14 ans, même s'ils sont du même type. Sa conscience grandit, sa complexité s'étoffe. Utilisez le quiz et les profils pour mieux comprendre chaque étape.",
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

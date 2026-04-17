// ═══════════════════════════════════════════════════════════════
//  WINGS — Variantes des 9 types selon l'aile dominante
//  Chaque type a 2 ailes possibles (les types adjacents)
//  → 18 variantes au total, chacune avec un portrait, des tranches
//  d'âge et des clés d'accompagnement spécifiques.
// ═══════════════════════════════════════════════════════════════

export interface WingVariant {
  nickname: string;          // ex. "L'Idéaliste"
  short: string;             // 1 phrase
  metaphor: string;          // portrait
  ages: {
    "5-8": string;
    "8-12": string;
    "13-16": string;
  };
  keys: { title: string; desc: string }[];
}

// Ailes possibles pour chaque type (types adjacents sur l'ennéagramme)
export const TYPE_WINGS: Record<number, [number, number]> = {
  1: [9, 2],
  2: [1, 3],
  3: [2, 4],
  4: [3, 5],
  5: [4, 6],
  6: [5, 7],
  7: [6, 8],
  8: [7, 9],
  9: [8, 1],
};

export const WINGS: Record<string, WingVariant> = {

  // ══════════════════════════════════════════
  //  TYPE 1 — Le Perfectionniste
  // ══════════════════════════════════════════

  "1w9": {
    nickname: "L'Idéaliste",
    short: "Un perfectionnisme calme et réfléchi, plus distant et philosophique que le 1 pur.",
    metaphor: "Le 1w9 est un perfectionniste qui rêve d'un monde meilleur depuis son bureau. Il garde l'exigence du 1, mais l'aile 9 lui apporte du recul, du calme, une certaine distance contemplative. Moins réactif que le 1 pur, il préfère réfléchir avant d'agir. Cet enfant peut sembler sage et posé pour son âge, mais il porte intérieurement le même tribunal moral que les autres 1 — simplement, il l'exprime moins fort. Sa colère, quand elle vient, est froide et tranchante.",
    ages: {
      "5-8": "Enfant calme et observateur, qui range ses jouets sans qu'on lui demande. Il préfère lire ou dessiner à courir. Il observe les injustices sans les pointer immédiatement, mais s'en souvient longtemps. Peu démonstratif, il a un univers intérieur très riche.",
      "8-12": "Le 1w9 devient l'élève sérieux et discret que les profs adorent. Il a des principes forts mais les exprime peu. Il peut se replier dans un monde imaginaire ou se passionner pour une cause (écologie, animaux). Sa critique intérieure est tenace, mais il la garde pour lui — au risque d'imploser.",
      "13-16": "Adolescent réfléchi, parfois mélancolique, qui peut s'isoler dans ses idéaux. Il aime débattre mais déteste les conflits frontaux. Il peut développer une vision pessimiste du monde tout en restant engagé pour le changer. Risque de burn-out silencieux."
    },
    keys: [
      { title: "Respectez son besoin de calme et d'introspection", desc: "Ne le forcez pas à participer à toutes les activités sociales. Sa solitude est un espace de ressourcement, pas un repli morbide. Mais vérifiez régulièrement qu'il n'y reste pas enfermé." },
      { title: "Aidez-le à exprimer sa colère verbalement", desc: "Sa rage perfectionniste est intense mais souterraine. Donnez-lui des mots : « Tu peux dire que c'est injuste, à voix haute. » Sans cela, il rumine et se rend malade." },
      { title: "Validez son besoin d'idéaux ET de retrait", desc: "Il porte des principes élevés mais peut s'épuiser. Apprenez-lui à choisir ses combats — toutes les injustices ne sont pas les siennes à corriger." }
    ]
  },

  "1w2": {
    nickname: "L'Avocat",
    short: "Un perfectionnisme chaleureux et engagé, tourné vers les autres.",
    metaphor: "Le 1w2 est un perfectionniste qui veut sauver le monde — et qui s'en occupe activement. L'aile 2 lui donne de la chaleur, du sens du service, et une vraie attention à l'autre. C'est l'enfant qui dénonce l'injustice ET console la victime. Plus relationnel que le 1 pur, il peut aussi être plus moralisateur : il sait ce qui est bien pour les autres et n'hésite pas à le leur dire. Son énergie est tournée vers la mission, pas vers la solitude.",
    ages: {
      "5-8": "Petit gardien moral du groupe : il rappelle les règles, défend les plus faibles, console les blessés. Il aime aider mais juge ceux qui ne le font pas. Très investi affectivement, il peut être bouleversé par les disputes.",
      "8-12": "Le 1w2 devient l'élève délégué, l'éco-représentant, le tuteur volontaire. Il s'investit dans les causes et dans les amitiés. Tendance à donner des leçons (« tu devrais faire comme ça »), parfois mal vécue par ses pairs.",
      "13-16": "Adolescent militant, engagé, parfois exalté. Il défend ses convictions avec passion et peut devenir intransigeant envers ceux qui ne partagent pas ses valeurs. Risque d'épuisement à force de vouloir réparer le monde et les autres."
    },
    keys: [
      { title: "Apprenez-lui à se reposer sans culpabilité", desc: "Il pense que ne pas agir = trahir ses principes. Modélisez le repos comme un acte de sagesse, pas de paresse. « Tu mérites de te reposer, même quand le monde ne va pas bien. »" },
      { title: "Tempérez son envie de corriger les autres", desc: "Distinguez « avoir raison » et « avoir le droit de dicter ». Apprenez-lui que ses standards sont SES standards — pas une vérité universelle à imposer." },
      { title: "Valorisez son cœur autant que sa morale", desc: "Soulignez la chaleur de ses gestes, pas seulement leur justesse. Il a besoin de sentir que vous l'aimez pour qui il est, pas pour ce qu'il fait de bien." }
    ]
  },

  // ══════════════════════════════════════════
  //  TYPE 2 — Le Généreux
  // ══════════════════════════════════════════

  "2w1": {
    nickname: "Le Serviteur",
    short: "Une générosité disciplinée, fondée sur le devoir d'aider et de bien faire.",
    metaphor: "Le 2w1 est un aidant avec une éthique. L'aile 1 apporte rigueur et sens du devoir : il aide non seulement par amour, mais aussi parce que c'est juste de le faire. Plus structuré et moins effusif que le 2 pur, il peut paraître réservé tout en étant profondément engagé pour les autres. Cet enfant aide avec méthode, range, organise, prend soin. Il peut être dur envers lui-même quand il pense ne pas avoir assez donné.",
    ages: {
      "5-8": "Enfant sage et serviable, qui propose son aide spontanément mais sans flatterie excessive. Il aime ranger, aider à mettre la table, prendre soin d'un animal. Il est sensible aux règles et aime les respecter.",
      "8-12": "Le 2w1 devient l'élève fiable, le délégué de classe consciencieux. Il aide ses amis à faire leurs devoirs, console avec sérieux. Tendance à se sacrifier en silence et à se juger sévèrement quand il échoue à aider.",
      "13-16": "Adolescent engagé, souvent dans le bénévolat ou les associations. Il peut se montrer rigide envers ceux qu'il aide (« je sais ce qui est bien pour toi »). Risque d'épuisement et de ressentiment masqué par la politesse."
    },
    keys: [
      { title: "Allégez son sens du devoir", desc: "Il aide par amour ET par obligation morale. Apprenez-lui que dire non n'est pas un manquement, mais un acte de respect envers soi-même." },
      { title: "Encouragez la spontanéité affective", desc: "Il aide « bien » mais peut perdre la chaleur. Modélisez les câlins gratuits, les compliments sans raison, les jeux pour rien." },
      { title: "Tempérez son auto-critique", desc: "Il se juge sévèrement quand il pense avoir mal fait. Rappelez-lui régulièrement : « Tu n'as pas à être parfait pour être aimé. »" }
    ]
  },

  "2w3": {
    nickname: "L'Hôte",
    short: "Une générosité brillante et sociable, soucieuse de bien faire et d'être vue.",
    metaphor: "Le 2w3 est un aidant qui aime aussi briller. L'aile 3 lui donne énergie, charisme et goût du résultat : il aide ET veut être reconnu pour son aide. Très sociable, il sait charmer, animer, fédérer. C'est l'enfant qui organise les goûters, qui met tout le monde à l'aise, qui devient vite le préféré des adultes. Plus affirmé que le 2 pur, il peut aussi être plus calculé : son aide n'est jamais totalement désintéressée.",
    ages: {
      "5-8": "Petit charmeur naturel, à l'aise avec les adultes. Il offre, donne, sourit, et observe les réactions. Il aime être au centre des fêtes, distribuer des câlins, faire rire. Très sensible à l'attention reçue.",
      "8-12": "Le 2w3 devient le « petit chef » sympathique, populaire, qui rassemble autour de lui. Il s'investit dans les amitiés mais peut aussi les utiliser pour se valoriser. Tendance à mesurer la réussite à la popularité.",
      "13-16": "Adolescent charismatique, doué pour les relations sociales. Il peut devenir excellent meneur ou tomber dans la course à l'image et l'épuisement relationnel. Risque de confusion entre vraie connexion et performance sociale."
    },
    keys: [
      { title: "Aimez-le aussi quand il ne brille pas", desc: "Il croit que l'amour vient avec la performance ET le service. Aimez-le explicitement dans le silence, dans la fatigue, dans l'imperfection." },
      { title: "Apprenez-lui que tout n'est pas un public", desc: "Il joue à être « celui qu'on aime ». Créez des espaces sans audience où il peut être maladroit, fatigué, vulnérable." },
      { title: "Aidez-le à distinguer aide vraie et aide intéressée", desc: "Pas pour le culpabiliser : pour l'aider à se connaître. « C'est OK de vouloir être reconnu — mais soyons clairs sur ce qui est don et ce qui est échange. »" }
    ]
  },

  // ══════════════════════════════════════════
  //  TYPE 3 — Le Gagneur
  // ══════════════════════════════════════════

  "3w2": {
    nickname: "Le Charmeur",
    short: "Un performeur chaleureux et relationnel, qui réussit en faisant rayonner les autres.",
    metaphor: "Le 3w2 est un gagneur qui aime aussi être aimé. L'aile 2 lui apporte chaleur, sens du contact et talent pour fédérer. Plus émotionnel et démonstratif que le 3 pur, il réussit en équipe, sait motiver, séduire, embarquer. C'est l'enfant qui gagne SES victoires en faisant gagner aussi les autres. Risque : confondre amitié et utilité, et s'investir dans les relations comme dans un projet — avec objectifs et indicateurs de succès.",
    ages: {
      "5-8": "Enfant solaire, sociable, qui charme les adultes et fait rire les autres. Il aime gagner aux jeux mais sait inclure ses amis. Très sensible aux compliments et aux humeurs des autres.",
      "8-12": "Le 3w2 devient le délégué populaire, l'élève brillant qui aide les copains. Il a beaucoup d'amis mais peut aussi être stratégique dans ses relations. Tendance à confondre admiration et amour.",
      "13-16": "Adolescent au charisme magnétique, souvent très investi socialement. Il peut viser les positions de leadership et bâtir un réseau impressionnant. Risque de surinvestir l'image et de s'épuiser à plaire."
    },
    keys: [
      { title: "Aimez-le pour qui il est, pas pour ce qu'il fait briller", desc: "Il pense devoir gagner ET séduire pour être aimé. Dites-lui souvent : « Tu n'as rien à prouver pour mériter mon amour. »" },
      { title: "Aidez-le à différencier vraies amitiés et alliances utiles", desc: "Sans le juger : aidez-le à voir quand il s'investit par affection vraie, et quand c'est pour l'image. La conscience est libératrice." },
      { title: "Encouragez la vulnérabilité visible", desc: "Modélisez l'imperfection : montrez vos doutes, vos échecs, vos émotions difficiles. Il apprendra que la vraie connexion vient de là." }
    ]
  },

  "3w4": {
    nickname: "Le Professionnel",
    short: "Un performeur introspectif et créatif, qui réussit avec style et sensibilité.",
    metaphor: "Le 3w4 est un gagneur qui veut aussi être unique. L'aile 4 lui donne profondeur, sensibilité et goût de l'esthétique. Moins relationnel que le 3w2, plus tourné vers son monde intérieur, il vise une réussite personnalisée et originale. C'est l'enfant qui veut être premier mais à sa façon — avec son style, ses idées, sa touche unique. Plus mélancolique que le 3 pur, il peut osciller entre confiance brillante et auto-doute profond.",
    ages: {
      "5-8": "Enfant créatif et déterminé, qui a déjà ses préférences esthétiques claires. Il aime montrer ce qu'il fait mais veut que ce soit beau ET original. Sensible aux critiques sur son travail.",
      "8-12": "Le 3w4 devient l'artiste-élève, ou le sportif au style unique. Il vise l'excellence à sa manière. Tendance à se replier après un échec et à ruminer sa différence.",
      "13-16": "Adolescent ambitieux et introspectif, souvent attiré par les domaines créatifs (art, musique, écriture, design). Il peut devenir perfectionniste et exigeant envers lui-même. Risque de dépression si son talent n'est pas reconnu à sa juste valeur."
    },
    keys: [
      { title: "Reconnaissez sa singularité ET sa réussite", desc: "Il a besoin que vous voyiez sa touche unique, pas seulement ses notes. Commentez son STYLE autant que ses résultats." },
      { title: "Tenez l'espace de sa mélancolie", desc: "Quand il doute, ne cherchez pas à le rebooster trop vite. Sa profondeur émotionnelle est sa force — laissez-la exister." },
      { title: "Aidez-le à finir ses projets", desc: "Sa quête d'originalité peut devenir paralysante (« ce n'est jamais assez beau »). Encouragez-le à publier, à montrer, à terminer — même imparfait." }
    ]
  },

  // ══════════════════════════════════════════
  //  TYPE 4 — L'Artiste
  // ══════════════════════════════════════════

  "4w3": {
    nickname: "L'Aristocrate",
    short: "Un sensible ambitieux, qui veut être unique ET reconnu.",
    metaphor: "Le 4w3 est un artiste qui veut aussi briller. L'aile 3 lui apporte énergie, ambition et capacité à se mettre en scène. Plus sociable et tourné vers le monde que le 4 pur, il veut transformer sa singularité en succès visible. C'est l'enfant qui veut être différent ET admiré pour cette différence. Plus dynamique mais aussi plus dépendant du regard des autres : sa sensibilité est exposée, et sa déception peut être brutale quand il n'est pas reconnu.",
    ages: {
      "5-8": "Enfant créatif et expressif, qui aime se déguiser, jouer la comédie, dessiner devant un public. Il a besoin qu'on remarque ses créations. Très sensible aux compliments et aux critiques.",
      "8-12": "Le 4w3 devient l'artiste-performeur, qui s'investit dans le théâtre, la danse, la musique. Il cherche la reconnaissance pour sa singularité. Tendance à dramatiser les échecs et à viser l'excellence visible.",
      "13-16": "Adolescent intense, souvent à la recherche d'une identité affirmée et visible. Il peut développer un style très personnel et l'exposer fièrement. Risque de souffrir profondément si sa singularité n'est pas reconnue."
    },
    keys: [
      { title: "Voyez son originalité ET son besoin d'être vu", desc: "Sa différence n'est pas un repli — c'est une offre au monde. Donnez-lui des occasions de la partager et applaudissez sincèrement." },
      { title: "Aidez-le à supporter le silence du public", desc: "Toutes ses créations ne seront pas remarquées. Apprenez-lui à créer pour lui-même d'abord, pour les autres ensuite." },
      { title: "Tempérez la dramatisation", desc: "Sa déception est intense. Validez l'émotion (« c'est dur ») sans surenchérir dans le drame. Et rappelez-lui ses succès passés quand il pense que tout est fini." }
    ]
  },

  "4w5": {
    nickname: "Le Bohème",
    short: "Un sensible introverti et intellectuel, replié dans son monde intérieur unique.",
    metaphor: "Le 4w5 est un artiste qui rêve en solitaire. L'aile 5 lui apporte profondeur, retrait et goût du savoir. Moins démonstratif que le 4 pur, plus contemplatif, il vit dans un monde intérieur dense, peuplé d'images, de pensées, d'esthétique. C'est l'enfant qui lit beaucoup, qui crée seul dans sa chambre, qui parle peu mais ressent énormément. Risque d'isolement profond et de fuite dans l'imaginaire — surtout s'il se sent incompris.",
    ages: {
      "5-8": "Enfant rêveur et discret, qui invente des mondes imaginaires riches. Il joue souvent seul, dessine, lit déjà des histoires longues. Peu démonstratif mais très attaché à ses figures de référence.",
      "8-12": "Le 4w5 devient le créatif solitaire : il écrit, dessine, lit, compose. Il a peu d'amis mais des amitiés intenses. Tendance à se sentir incompris et à se replier dans son univers intérieur.",
      "13-16": "Adolescent profond, souvent passionné par l'art, la philosophie, la littérature. Il peut développer une vie intérieure très riche et un style personnel marqué. Risque réel de dépression et d'isolement social."
    },
    keys: [
      { title: "Respectez son besoin de solitude créative", desc: "Sa chambre, ses cahiers, ses heures seul — ce sont des espaces sacrés, pas un repli inquiétant. Mais vérifiez qu'il a aussi des moments de lien." },
      { title: "Entrez dans son monde intérieur par les idées", desc: "Posez-lui des questions sur ce qu'il lit, dessine, écoute. Il s'ouvre par l'esthétique et l'intellect, rarement par l'émotion brute." },
      { title: "Forcez doucement les liens sociaux", desc: "Sans l'envahir : proposez régulièrement une activité avec un seul ami, un atelier créatif. Sa profondeur a besoin de contact pour ne pas s'enfermer." }
    ]
  },

  // ══════════════════════════════════════════
  //  TYPE 5 — L'Observateur
  // ══════════════════════════════════════════

  "5w4": {
    nickname: "L'Iconoclaste",
    short: "Un observateur sensible et créatif, qui pense ET ressent en profondeur.",
    metaphor: "Le 5w4 est un penseur qui crée. L'aile 4 lui apporte sensibilité, esthétique et goût de l'unicité. Plus émotionnel que le 5 pur, il combine analyse rigoureuse et imagination débordante. C'est l'enfant qui démonte ses jouets ET qui invente des histoires complexes pour eux. Souvent original, parfois excentrique, il peut être incompris par ses pairs mais fascinant pour les adultes attentifs. Risque de mélancolie intellectuelle et de retrait précoce.",
    ages: {
      "5-8": "Enfant à l'univers intérieur très riche, qui pose des questions étonnantes pour son âge. Il aime explorer seul, lire, observer les insectes, inventer. Peu attiré par les jeux de groupe.",
      "8-12": "Le 5w4 devient le « petit professeur » créatif, passionné par un sujet précis (espace, dinosaures, mythologie). Il peut être très original dans ses centres d'intérêt et ses créations. Tendance à se sentir différent et à le revendiquer.",
      "13-16": "Adolescent introspectif et original, souvent intéressé par la philosophie, la science, l'art. Il peut développer une pensée très personnelle et marquée. Risque d'isolement et de mélancolie intellectuelle."
    },
    keys: [
      { title: "Nourrissez sa curiosité ET sa sensibilité", desc: "Offrez-lui des livres, des musées, des expériences qui sollicitent à la fois sa tête ET son cœur. Pas seulement la science, pas seulement l'art." },
      { title: "Respectez son rythme intérieur", desc: "Il a besoin de longues plages de silence pour digérer ce qu'il vit. Ne le bousculez pas avec des activités constantes." },
      { title: "Validez sa différence sans la dramatiser", desc: "« Tu vois le monde autrement, c'est précieux. » Pas besoin d'en faire un destin tragique — c'est juste une façon d'être au monde." }
    ]
  },

  "5w6": {
    nickname: "Le Résolveur",
    short: "Un observateur loyal et anticipateur, qui pense pour comprendre ET pour se protéger.",
    metaphor: "Le 5w6 est un penseur qui se prépare. L'aile 6 lui apporte loyauté, vigilance et besoin de sécurité. Plus pratique et anxieux que le 5 pur, il analyse pour anticiper les problèmes et trouver des solutions. C'est l'enfant qui veut comprendre comment ça marche pour s'assurer que ça ne casse pas. Souvent précis, méthodique, fiable, il est aussi plus engagé socialement (avec ses proches) que le 5 pur — mais reste réservé.",
    ages: {
      "5-8": "Enfant prudent et observateur, qui pose beaucoup de questions sur la sécurité (« et si... ? »). Il aime comprendre les règles avant d'agir. Loyal envers ses figures d'attachement, méfiant envers les inconnus.",
      "8-12": "Le 5w6 devient l'élève sérieux et fiable, qui prépare ses contrôles avec méthode. Il a un petit groupe d'amis stables. Tendance à anticiper les problèmes et à se créer des scénarios anxieux.",
      "13-16": "Adolescent réfléchi, souvent passionné par les sciences, l'informatique, la stratégie. Il analyse beaucoup et peut développer des théories complexes. Risque d'anxiété analytique et de paralysie face à l'incertitude."
    },
    keys: [
      { title: "Rassurez par les faits et la cohérence", desc: "Il se rassure par la compréhension. Expliquez-lui les choses concrètement (« voilà ce qui se passera ») — pas par des « ne t'inquiète pas »." },
      { title: "Encouragez l'action malgré le doute", desc: "Il peut analyser sans fin pour éviter d'agir. Apprenez-lui à se lancer avec « assez d'informations », pas avec une certitude impossible." },
      { title: "Honorez sa loyauté discrète", desc: "Il s'attache profondément mais ne le montre pas beaucoup. Reconnaissez explicitement sa fidélité — elle est précieuse." }
    ]
  },

  // ══════════════════════════════════════════
  //  TYPE 6 — Le Loyal
  // ══════════════════════════════════════════

  "6w5": {
    nickname: "Le Défenseur",
    short: "Un loyaliste introspectif et analytique, qui se rassure en comprenant tout.",
    metaphor: "Le 6w5 est un loyal qui pense pour se protéger. L'aile 5 lui apporte profondeur intellectuelle et besoin de retrait. Plus introverti et analytique que le 6 pur, il anticipe les dangers en les étudiant longuement. C'est l'enfant qui lit les notices, regarde les plans d'évacuation, demande comment ça marche avant d'utiliser quelque chose. Souvent très loyal envers un petit cercle, il peut paraître méfiant envers le monde extérieur. Sa pensée est sa principale arme contre l'angoisse.",
    ages: {
      "5-8": "Enfant prudent et observateur, qui veut comprendre avant de faire confiance. Il s'attache fortement à ses figures de référence et reste discret avec les inconnus. Aime les jeux de stratégie, les énigmes, les histoires complexes.",
      "8-12": "Le 6w5 devient l'élève sérieux et discret, fiable et loyal envers son petit groupe. Il analyse beaucoup les relations sociales sans toujours s'y engager. Tendance à anticiper le pire et à se réfugier dans le savoir.",
      "13-16": "Adolescent réfléchi, souvent attiré par les domaines techniques ou intellectuels. Il peut développer une vision sceptique du monde et un cercle restreint de proches. Risque d'isolement et de pensée anxieuse en boucle."
    },
    keys: [
      { title: "Donnez-lui des informations claires et stables", desc: "Il se rassure par la compréhension. Expliquez vos décisions, vos plans, vos changements. Évitez les surprises et les flous." },
      { title: "Respectez son cercle restreint", desc: "Il fait confiance à peu de gens — c'est OK. Ne le forcez pas à élargir son groupe d'amis. La profondeur compte plus que le nombre." },
      { title: "Encouragez l'expérience corporelle", desc: "Il vit beaucoup dans sa tête. Sport, mouvement, nature, jeux physiques — sortez-le de sa pensée régulièrement, sans la dévaluer." }
    ]
  },

  "6w7": {
    nickname: "Le Compagnon",
    short: "Un loyaliste sociable et joyeux, qui apaise ses peurs par le lien et l'activité.",
    metaphor: "Le 6w7 est un loyal qui s'allège dans la fête. L'aile 7 lui apporte énergie, humour et goût du social. Plus extraverti et optimiste que le 6 pur, il combat ses angoisses par le contact, l'amusement, les projets. C'est l'enfant qui a beaucoup d'amis, qui rit fort, qui propose des activités — et qui s'inquiète encore beaucoup intérieurement, mais le cache mieux. Plus actif mais aussi plus dispersé, il peut fuir ses peurs au lieu de les regarder.",
    ages: {
      "5-8": "Enfant chaleureux et sociable, qui aime les copains, les fêtes, les jeux collectifs. Il peut être anxieux la nuit ou face à la nouveauté, mais s'apaise par le contact. Très attaché à ses parents.",
      "8-12": "Le 6w7 devient l'élève sociable et engagé, populaire dans son groupe. Il s'investit dans les amitiés, les projets de classe, les activités. Tendance à fuir ses inquiétudes par le mouvement permanent.",
      "13-16": "Adolescent dynamique et loyal, souvent au cœur de son groupe d'amis. Il peut être très investi dans les causes qui le touchent. Risque de dispersion et de difficulté à s'arrêter pour écouter ses propres peurs."
    },
    keys: [
      { title: "Aidez-le à s'arrêter pour ressentir", desc: "Il fuit ses angoisses par l'activité. Imposez des moments calmes (lecture, balade, conversation) où il peut sentir ce qui se passe à l'intérieur." },
      { title: "Honorez ses peurs malgré le sourire", desc: "Sa joie peut masquer une vraie inquiétude. Demandez-lui régulièrement : « Et au fond, tu vas bien ? » et écoutez vraiment la réponse." },
      { title: "Cadrez la dispersion", desc: "Sa peur le pousse à multiplier les projets sans en finir aucun. Aidez-le à choisir, prioriser, terminer — c'est aussi une forme de courage." }
    ]
  },

  // ══════════════════════════════════════════
  //  TYPE 7 — L'Épicurien
  // ══════════════════════════════════════════

  "7w6": {
    nickname: "L'Animateur",
    short: "Un épicurien chaleureux et fidèle, qui amuse tout en gardant ses proches au centre.",
    metaphor: "Le 7w6 est un enthousiaste qui aime aussi rassurer. L'aile 6 lui apporte loyauté, sens des responsabilités et chaleur relationnelle. Moins libre et plus engagé que le 7 pur, il met son énergie au service du groupe, de la famille, des amis. C'est l'enfant qui fait rire toute la classe ET qui prend soin de l'ami solitaire. Plus drôle qu'audacieux, plus présent que dispersé, mais avec un fond d'anxiété qu'il cache sous l'humour.",
    ages: {
      "5-8": "Enfant joyeux et drôle, qui adore faire rire ses parents et ses copains. Très attaché à sa famille, il a besoin de savoir que tout va bien à la maison. Anxieux face à la nouveauté ou aux séparations.",
      "8-12": "Le 7w6 devient le clown sympathique de la classe, populaire et fidèle à ses amis. Il s'investit dans les groupes et déteste être exclu. Tendance à utiliser l'humour pour désamorcer les tensions.",
      "13-16": "Adolescent enthousiaste et loyal, souvent au centre de son groupe. Il peut être engagé dans des causes qui touchent ses proches. Risque de masquer une vraie anxiété derrière la jovialité constante."
    },
    keys: [
      { title: "Reconnaissez la profondeur derrière l'humour", desc: "Son rire est sincère mais peut aussi être un bouclier. Faites-lui sentir qu'il peut être triste, fatigué, inquiet avec vous — sans devoir distraire." },
      { title: "Sécurisez ses attachements", desc: "Il a besoin de stabilité dans ses liens. Tenez vos promesses, prévenez des changements à l'avance, soyez constant dans votre affection." },
      { title: "Aidez-le à terminer ce qu'il commence", desc: "Son enthousiasme l'embarque dans mille projets. Apprenez-lui le plaisir d'achever — pas seulement de commencer." }
    ]
  },

  "7w8": {
    nickname: "Le Réaliste",
    short: "Un épicurien puissant et entreprenant, qui transforme l'enthousiasme en action.",
    metaphor: "Le 7w8 est un enthousiaste qui passe à l'action. L'aile 8 lui apporte force, audace et goût du défi. Plus affirmé et moins dispersé que le 7 pur, il transforme ses envies en projets concrets et n'a pas peur de bousculer pour avancer. C'est l'enfant qui propose ET qui mène, qui rit ET qui décide. Plus indépendant et combatif, il peut aussi être plus brutal dans ses choix : si quelque chose ne lui plaît plus, il quitte sans s'attarder.",
    ages: {
      "5-8": "Enfant énergique et fonceur, qui aime tout essayer et qui n'a peur de rien. Il est meneur dans les jeux, négocie avec autorité ce qu'il veut. Très vivant, parfois épuisant.",
      "8-12": "Le 7w8 devient l'élève dynamique et entrepreneur, qui monte des projets, organise, persuade. Il sait obtenir ce qu'il veut. Tendance à brusquer ceux qui freinent ses élans.",
      "13-16": "Adolescent puissant et entreprenant, souvent attiré par le sport, les voyages, l'aventure, le business. Il peut bâtir des projets impressionnants. Risque de dispersion à grande échelle et de conflits avec l'autorité."
    },
    keys: [
      { title: "Cadrez la puissance, ne la cassez pas", desc: "Sa force est précieuse. Mettez des limites claires (« non, pas ça ») sans essayer de l'éteindre. Il a besoin de respect, pas de soumission." },
      { title: "Apprenez-lui la patience et l'écoute", desc: "Il fonce sans toujours écouter les autres. Modélisez l'art de poser des questions, d'attendre, de tenir compte de ce que les autres ressentent." },
      { title: "Aidez-le à finir avant de relancer", desc: "Son énergie l'embarque dans le suivant avant d'avoir terminé le précédent. Imposez la règle du « finir d'abord »." }
    ]
  },

  // ══════════════════════════════════════════
  //  TYPE 8 — Le Chef
  // ══════════════════════════════════════════

  "8w7": {
    nickname: "L'Indépendant",
    short: "Un leader énergique et expansif, qui combine force et goût pour la vie.",
    metaphor: "Le 8w7 est un chef qui aime aussi s'amuser. L'aile 7 lui apporte énergie débordante, charisme et ouverture aux possibles. Plus extraverti et entreprenant que le 8 pur, il combine puissance et joie de vivre. C'est l'enfant qui mène les jeux, prend des initiatives audacieuses, embarque les autres dans des aventures. Charismatique mais aussi plus impulsif, il peut être très généreux comme très brutal — souvent dans la même journée.",
    ages: {
      "5-8": "Enfant énergique et meneur, qui prend les rênes des jeux et parle fort. Il aime les défis, les bagarres pour rire, les grandes aventures. Charmant mais peut imposer sa volonté.",
      "8-12": "Le 8w7 devient le « grand frère » naturel de la cour de récréation : il défend les plus faibles, organise les bandes, défie les règles avec panache. Tendance à dominer les amitiés.",
      "13-16": "Adolescent au charisme puissant, souvent leader de son groupe. Il peut être entrepreneur, sportif, militant. Très autonome, parfois rebelle. Risque de prises de risque excessives et de conflits frontaux avec l'autorité."
    },
    keys: [
      { title: "Soyez ferme et calme face à sa puissance", desc: "Il teste les limites pour vérifier que vous tenez. Ne cédez pas par épuisement, ne réagissez pas par colère — restez juste, ferme, calme." },
      { title: "Honorez son énergie sans la réprimer", desc: "Sa force est un don. Donnez-lui du sport, des projets ambitieux, des responsabilités à la hauteur. Sans cela, son énergie devient destructrice." },
      { title: "Apprenez-lui la nuance et la tendresse", desc: "Il fonce, attaque, défend, mais peut perdre la subtilité. Modélisez la douceur, la diplomatie, l'écoute — pas comme faiblesses, comme outils de puissance." }
    ]
  },

  "8w9": {
    nickname: "L'Ours",
    short: "Un leader calme et protecteur, qui préfère la force tranquille à la confrontation.",
    metaphor: "Le 8w9 est un chef qui aime aussi la paix. L'aile 9 lui apporte calme, recul et capacité de retenue. Plus posé et moins explosif que le 8 pur, il incarne une force tranquille, naturelle, qui ne cherche pas la confrontation mais ne recule pas non plus. C'est l'enfant qui ne crie pas mais qu'on écoute, qui défend les autres sans en faire un drame. Sa puissance est latente — quand elle se manifeste, c'est lent mais inarrêtable.",
    ages: {
      "5-8": "Enfant calme et solide, qui ne se laisse pas impressionner. Il joue tranquillement, mais ne supporte pas l'injustice. Quand il s'oppose, c'est rarement et fermement.",
      "8-12": "Le 8w9 devient le pilier discret du groupe : on lui fait confiance, on le suit sans qu'il ait à parler fort. Il défend les plus faibles avec calme. Tendance à enfouir ses émotions et à éviter les conflits jusqu'à l'explosion.",
      "13-16": "Adolescent posé, fiable, souvent respecté par ses pairs sans qu'il cherche à dominer. Il peut être entrepreneur ou s'investir dans des causes qui demandent endurance. Risque de passivité ou d'explosions soudaines après un trop-plein."
    },
    keys: [
      { title: "Respectez sa force tranquille", desc: "Il n'a pas besoin de prouver sa puissance. Ne le bousculez pas pour le faire réagir — sa nature est calme, pas faible." },
      { title: "Encouragez l'expression émotionnelle régulière", desc: "Il accumule en silence puis explose. Créez des rituels pour parler de ce qu'il ressent, avant que ça déborde." },
      { title: "Honorez son sens naturel de la justice", desc: "Il défend les autres avec discrétion mais conviction. Reconnaissez explicitement ces gestes — ils façonnent son identité de protecteur." }
    ]
  },

  // ══════════════════════════════════════════
  //  TYPE 9 — Le Médiateur
  // ══════════════════════════════════════════

  "9w8": {
    nickname: "L'Arbitre",
    short: "Un pacifique affirmé, qui peut sortir de sa réserve pour défendre les siens.",
    metaphor: "Le 9w8 est un médiateur qui sait aussi tenir tête. L'aile 8 lui apporte force, fermeté et capacité d'affirmation. Plus puissant et moins effaçable que le 9 pur, il préfère la paix mais sait poser des limites quand c'est nécessaire. C'est l'enfant calme qui surprend par une fermeté soudaine quand on dépasse les bornes. Sa colère est rare mais redoutable — et il rentre vite dans son calme après. Excellent médiateur naturel : il comprend toutes les positions ET peut décider.",
    ages: {
      "5-8": "Enfant doux et tranquille, mais qui ne se laisse pas faire. Il aime les jeux calmes mais peut s'imposer si on touche à ce qui compte (jouet préféré, copain). Attaché à sa routine.",
      "8-12": "Le 9w8 devient l'élève posé et fiable, qui aplanit les conflits dans la cour. Il a une autorité naturelle quand il choisit de l'exercer. Tendance à éviter les disputes mais à exploser si on insiste trop.",
      "13-16": "Adolescent calme et solide, souvent respecté pour sa stabilité. Il peut être leader sans agitation, médiateur dans les conflits. Risque de procrastination et d'inertie face aux décisions importantes."
    },
    keys: [
      { title: "Encouragez son affirmation sans la forcer", desc: "Il sait dire non quand c'est important, mais cède sur les petites choses. Aidez-le à voir que ses préférences comptent même dans les détails." },
      { title: "Respectez son rythme tout en l'invitant à décider", desc: "Il prend son temps pour choisir. Donnez-lui de l'espace, mais demandez-lui de trancher — ne décidez pas toujours à sa place." },
      { title: "Honorez sa force tranquille", desc: "Quand il s'affirme, prenez-le au sérieux. Ce n'est pas un caprice — c'est une vraie position. Et reconnaissez sa capacité unique à comprendre toutes les parties." }
    ]
  },

  "9w1": {
    nickname: "Le Rêveur",
    short: "Un pacifique idéaliste, qui rêve d'un monde meilleur sans bousculer personne.",
    metaphor: "Le 9w1 est un médiateur qui porte des principes. L'aile 1 lui apporte sens du devoir, idéal moral et besoin d'ordre intérieur. Plus posé et structuré que le 9 pur, il rêve d'un monde juste mais préfère l'incarner doucement plutôt que de le revendiquer fort. C'est l'enfant calme qui range ses jouets, qui rappelle gentiment les règles, qui défend ses convictions sans crier. Plus rigide intérieurement qu'il n'y paraît : il a des standards, simplement il ne les impose pas.",
    ages: {
      "5-8": "Enfant doux et organisé, qui aime que tout soit bien à sa place. Il est attentif aux règles et aux autres, sans en faire trop. Très peu de débordements émotionnels.",
      "8-12": "Le 9w1 devient l'élève sérieux et apprécié, fiable et juste. Il évite les conflits mais a une boussole morale forte. Tendance à se juger en silence et à rêver d'un monde idéal sans agir pour le changer.",
      "13-16": "Adolescent posé et idéaliste, souvent intéressé par les causes (écologie, justice, spiritualité). Il peut développer une vision philosophique du monde. Risque de procrastination et de fuite dans le rêve plutôt que dans l'action."
    },
    keys: [
      { title: "Honorez ses idéaux sans les juger naïfs", desc: "Sa vision d'un monde meilleur est précieuse. Aidez-le à passer du rêve à l'action concrète, à petits pas." },
      { title: "Encouragez l'engagement, même modeste", desc: "Il peut rester observateur de ses propres convictions. Aidez-le à incarner ce qu'il pense, ne serait-ce qu'un peu chaque jour." },
      { title: "Validez sa douceur ET sa fermeté intérieure", desc: "Il porte des standards forts derrière son calme. Reconnaissez cette force tranquille — elle façonne sa confiance en lui." }
    ]
  },
};

// ── Helper ──────────────────────────────────────────────
export function getWing(typeNum: number, wingNum: number): WingVariant | null {
  return WINGS[`${typeNum}w${wingNum}`] ?? null;
}

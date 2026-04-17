// ═══════════════════════════════════════════════════════════════
//  Duo — Interactions entre profils Enneagramme
//  81 paires dirigées (A→B) × 5 contextes
// ═══════════════════════════════════════════════════════════════

export type DuoContext = 'enfant' | 'ado' | 'couple' | 'adulte' | 'pairs';

export const CONTEXT_LABELS: Record<BaseContext, string> = {
  enfant:  '👨 Parent · Enfant (5–12)',
  ado:     '🧑 Parent · Ado (13–17)',
  couple:  '💑 Couple',
  adulte:  '👥 Amis · Collègues',
};

export type BaseContext = Exclude<DuoContext, 'pairs'>; // 'enfant' | 'ado' | 'couple' | 'adulte'

export interface DuoPair {
  pointsForts: string;
  vigilances: string;
  aApporte: string;   // ce que le type A apporte à B
  bApporte: string;   // ce que le type B apporte à A
  conseil: string;
  contexte: Record<BaseContext, string>; // tip spécifique par contexte (hors pairs)
}

// Clé : "${typeA}-${typeB}"  (ex. "1-4" = type 1 à gauche, type 4 à droite)
export const DUO_DATA: Record<string, DuoPair> = {

  // ══════════════════════════════════════════
  //  TYPE 1 — Le Perfectionniste
  // ══════════════════════════════════════════

  "1-1": {
    pointsForts: "Valeurs communes, sens du devoir partagé, efficacité dans les projets. Vous vous comprenez sans vous expliquer.",
    vigilances: "Risque de compétition sur « qui fait le mieux ». Les critiques mutuelles peuvent s'emballer et laisser peu de place à l'erreur.",
    aApporte: "Rigueur, fiabilité, honnêteté directe.",
    bApporte: "Le même miroir exigeant — inconfortable mais précieux.",
    conseil: "Créez ensemble une règle : une critique = un compliment sincère. Sans cela, votre espace commun peut devenir un tribunal.",
    contexte: {
      enfant: "Parent Type 1 avec enfant Type 1 : évitez la surenchère d'exigence. Votre enfant se punit déjà lui-même — il a besoin de votre légèreté, pas de votre perfectionnisme.",
      ado: "Votre ado Type 1 comprend vos règles mais les conteste sur le fond. Acceptez ses arguments : il veut améliorer le système, pas le détruire.",
      couple: "Vous partagez un foyer impeccable et des valeurs fortes, mais prenez soin de garder de la spontanéité — la vie ne doit pas être une check-list.",
      adulte: "Duo redoutable en projet mais prenez garde : sans humour ni tolérance à l'imperfection, votre collaboration peut virer au tribunal.",
    },
  },

  "1-2": {
    pointsForts: "Le 1 apporte le cadre, le 2 apporte la chaleur. Ensemble, vous conjuguez efficacité et humanité.",
    vigilances: "Le 1 trouve le 2 trop émotionnel et peu rigoureux. Le 2 se sent critiqué et jamais assez reconnu dans ses efforts.",
    aApporte: "Structure, principes clairs, honnêteté sans détour.",
    bApporte: "Douceur, empathie, sens du lien et de la relation.",
    conseil: "Type 1 : exprimez la gratitude avant la critique. Type 2 : dites clairement ce dont vous avez besoin au lieu d'attendre qu'il le devine.",
    contexte: {
      enfant: "Votre enfant Type 2 cherche votre approbation avant tout. Remplacez une correction sur deux par « je suis fier de toi » — il s'épanouira.",
      ado: "Votre ado Type 2 donne beaucoup aux autres et peut se négliger. Votre rigueur est utile ici : aidez-le à poser des limites sans se sentir coupable.",
      couple: "Le 2 adoucit le 1, le 1 structure le 2. Belle complémentarité si le 1 apprend à valoriser avant de corriger.",
      adulte: "Le 2 rend le 1 plus humain aux yeux des autres. Le 1 aide le 2 à ne pas se perdre dans le service des autres.",
    },
  },

  "1-3": {
    pointsForts: "Ambition partagée, sens du résultat, respect de l'effort. Vous vous tirez mutuellement vers le haut.",
    vigilances: "Le 1 veut bien faire, le 3 veut paraître efficace — le conflit éclate sur les moyens. Le 3 perçoit le 1 comme trop rigide.",
    aApporte: "Intégrité, refus du compromis éthique, travail de fond.",
    bApporte: "Adaptabilité, sens du timing, énergie orientée résultat.",
    conseil: "Clarifiez dès le départ : est-ce le processus ou le résultat qui prime ? Cette question évite la plupart de vos frictions.",
    contexte: {
      enfant: "Votre enfant Type 3 veut votre admiration, pas seulement votre approbation. Célébrez ses succès avec enthousiasme, pas avec « oui mais tu aurais pu... »",
      ado: "Votre ado Type 3 est en train de construire son image. Ne critiquez pas sa stratégie — guidez-le vers l'authenticité derrière la façade.",
      couple: "Duo puissant mais potentiellement compétitif. Définissez des domaines distincts où chacun excelle pour éviter la rivalité.",
      adulte: "Redoutable en équipe si le 1 accepte les raccourcis pragmatiques du 3 et si le 3 respecte les lignes rouges éthiques du 1.",
    },
  },

  "1-4": {
    pointsForts: "Le 1 et le 4 partagent un idéal élevé. Ensemble, vous pouvez créer quelque chose de vraiment beau et juste.",
    vigilances: "Le 1 trouve le 4 trop dramatique et imprévisible. Le 4 se sent incompris et jugé dans son unicité.",
    aApporte: "Discipline, cohérence, ancrage dans le réel.",
    bApporte: "Profondeur émotionnelle, créativité, sens esthétique.",
    conseil: "Type 1 : la sensibilité du 4 n'est pas un défaut — c'est sa force. Type 4 : la rigueur du 1 n'est pas du rejet — c'est sa façon d'aimer.",
    contexte: {
      enfant: "Votre enfant Type 4 a besoin de se sentir unique, pas parfait. Valorisez sa différence plutôt que de la corriger.",
      ado: "Votre ado Type 4 traverse des tempêtes intérieures intenses. Votre stabilité est précieuse — mais évitez de minimiser ce qu'il ressent.",
      couple: "Relation intense et riche si le 1 apprend à vivre dans le flou émotionnel et si le 4 accepte la structure comme acte d'amour.",
      adulte: "Collaboration artistique ou éthique idéale. Laissez le 4 créer et le 1 structurer — ne les inversez pas.",
    },
  },

  "1-5": {
    pointsForts: "Intellectuellement stimulants l'un pour l'autre. Partage de valeurs autour de la compétence et du travail bien fait.",
    vigilances: "Deux profils qui retiennent leurs émotions — la relation peut devenir froide et fonctionnelle. Les deux fuient la vulnérabilité.",
    aApporte: "Action, sens du concret, organisation.",
    bApporte: "Analyse, profondeur de réflexion, objectivité.",
    conseil: "Planifiez des moments de connexion émotionnelle — ni l'un ni l'autre n'en prendra l'initiative naturellement.",
    contexte: {
      enfant: "Votre enfant Type 5 a besoin de temps seul pour se ressourcer — ne le forcez pas à sociabiliser. Respectez son rythme.",
      ado: "Votre ado Type 5 peut sembler distant. Proposez des échanges intellectuels : c'est par là qu'il s'ouvre.",
      couple: "Relation stable et respectueuse mais risque de « vie parallèle ». Créez des rituels de connexion réguliers.",
      adulte: "Duo très efficace sur les projets analytiques. Attention à ne pas laisser la relation se réduire au seul plan professionnel.",
    },
  },

  "1-6": {
    pointsForts: "Fiabilité partagée, sens des responsabilités, loyauté forte. Vous pouvez construire quelque chose de durable ensemble.",
    vigilances: "Le 1 peut trouver le 6 trop anxieux et hésitant. Le 6 peut ressentir les principes du 1 comme des règles imposées.",
    aApporte: "Certitude morale, cap clair, courage d'agir.",
    bApporte: "Loyauté, anticipation des risques, soutien constant.",
    conseil: "Type 1 : rassurez avant de corriger. Type 6 : faites confiance aux intentions du 1 — sa rigueur protège, elle n'opprime pas.",
    contexte: {
      enfant: "Votre enfant Type 6 a besoin de règles claires ET de votre sécurité affective. Les deux ensemble, pas l'un sans l'autre.",
      ado: "Votre ado Type 6 peut être très rebelle ou très conformiste selon les jours. Offrez-lui un cadre stable sans rigidité.",
      couple: "Relation solide et fiable. Attention à ne pas tomber dans la routine par peur du changement — stimulez-vous mutuellement.",
      adulte: "Excellent binôme pour les projets qui demandent rigueur et anticipation. Le 6 voit les risques, le 1 tient le cap.",
    },
  },

  "1-7": {
    pointsForts: "Le 7 sort le 1 de sa rigidité. Le 1 donne de l'ancrage au 7. Complémentarité puissante si chacun accepte l'autre.",
    vigilances: "Le 1 trouve le 7 irresponsable et superficiel. Le 7 trouve le 1 ennuyeux et moralisateur.",
    aApporte: "Fiabilité, follow-through, sens des engagements.",
    bApporte: "Légèreté, enthousiasme, ouverture aux possibles.",
    conseil: "Définissez des zones de liberté pour le 7 et des lignes rouges pour le 1. Respectez-les mutuellement sans négociation constante.",
    contexte: {
      enfant: "Votre enfant Type 7 est une tornade d'énergie. Donnez-lui des règles COURTES et CLAIRES — les longues explications morales le perdent.",
      ado: "Votre ado Type 7 a horreur des contraintes. Négociez sur les modalités, jamais sur les valeurs essentielles.",
      couple: "Relation vivante et stimulante si le 1 apprend à lâcher prise et si le 7 honore ses engagements. Jamais ennuyeux.",
      adulte: "Le 7 génère les idées, le 1 les structure. Duo créatif redoutable si les rôles sont clairs.",
    },
  },

  "1-8": {
    pointsForts: "Deux forces qui s'engagent pleinement. Respect mutuel basé sur l'honnêteté directe et la puissance d'action.",
    vigilances: "Deux profils qui ont raison et qui ne cèdent pas. Les confrontations peuvent être violentes et les rancœurs durables.",
    aApporte: "Intégrité, méthode, sens de la justice.",
    bApporte: "Force, protection, décision rapide.",
    conseil: "Acceptez que vous puissiez tous les deux avoir raison en même temps. La complémentarité est possible si l'ego ne prend pas toute la place.",
    contexte: {
      enfant: "Votre enfant Type 8 teste les limites — c'est sa façon de chercher un adulte solide. Tenez bon sans écraser, c'est ce dont il a besoin.",
      ado: "Votre ado Type 8 ne respecte que ce qu'il ne peut pas intimider. Soyez cohérent, calme et ferme — jamais réactif.",
      couple: "Relation passionnée et explosive. Apprenez à vous disputer sans détruire — les blessures entre vous peuvent être profondes.",
      adulte: "Duo puissant en leadership. Définissez les territoires de décision de chacun pour éviter la rivalité.",
    },
  },

  "1-9": {
    pointsForts: "Le 9 apporte la paix là où le 1 apporte l'ordre. Relation harmonieuse si le 1 ne pousse pas trop.",
    vigilances: "Le 1 s'impatiente devant la lenteur du 9. Le 9 se ferme devant les injonctions du 1 et disparaît passivement.",
    aApporte: "Direction, clarté des attentes, efficacité.",
    bApporte: "Calme, acceptation, capacité à désamorcer les tensions.",
    conseil: "Type 1 : demandez l'avis du 9 avant de décider — il a souvent la meilleure réponse, mais ne la donnera pas si on ne lui laisse pas le temps.",
    contexte: {
      enfant: "Votre enfant Type 9 a besoin de douceur dans les consignes. Le ton compte autant que le contenu — évitez les ordres secs.",
      ado: "Votre ado Type 9 semble apathique mais observe tout. Impliquez-le dans les décisions qui le concernent.",
      couple: "Relation stable et paisible. Attention : la passivité du 9 peut masquer des frustrations que le 1 n'entend pas.",
      adulte: "Le 9 harmonise, le 1 organise. Excellent binôme si le 1 apprend à ne pas dominer les réunions.",
    },
  },

  // ══════════════════════════════════════════
  //  TYPE 2 — L'Altruiste
  // ══════════════════════════════════════════

  "2-1": {
    pointsForts: "Le 2 humanise le 1, le 1 structure le 2. Complémentarité entre chaleur et rigueur.",
    vigilances: "Le 2 se sent critiqué et jamais assez reconnu. Le 1 s'irrite des attentes implicites du 2.",
    aApporte: "Empathie, dévouement, sens du lien.",
    bApporte: "Honnêteté directe, clarté des attentes, cadre.",
    conseil: "Type 2 : dites ce dont vous avez besoin sans attendre que l'autre le devine. Type 1 : une reconnaissance sincère vaut plus que dix corrections.",
    contexte: {
      enfant: "Votre enfant Type 1 a des standards élevés pour lui-même. Célébrez ses efforts, pas seulement ses résultats parfaits.",
      ado: "Votre ado Type 1 a besoin de votre approbation sur ses valeurs, pas sur ses performances.",
      couple: "Belle complémentarité si le 2 n'attend pas la perfection du 1 et si le 1 exprime régulièrement sa gratitude.",
      adulte: "Le 2 rend le 1 accessible aux équipes. Le 1 aide le 2 à ne pas se dissoudre dans le service des autres.",
    },
  },

  "2-2": {
    pointsForts: "Empathie et bienveillance mutuelles. Vous vous soutenez avec une générosité rare.",
    vigilances: "Qui aide qui ? La compétition pour être « celui qui donne le plus » peut créer des tensions invisibles.",
    aApporte: "Soutien émotionnel, présence, dévouement.",
    bApporte: "Le même miroir bienveillant — et parfois un révélateur de codépendance.",
    conseil: "Assurez-vous que votre relation a de l'espace pour les deux. Deux 2 ensemble peuvent s'oublier mutuellement dans l'effort de se servir.",
    contexte: {
      enfant: "Parent Type 2 avec enfant Type 2 : apprenez-lui aussi à recevoir, pas seulement à donner. Votre enfant doit savoir qu'il a de la valeur en dehors du service.",
      ado: "Votre ado Type 2 donne tout à ses amis. Aidez-le à identifier ses propres besoins avant de les sacrifier.",
      couple: "Relation chaleureuse et douce. Attention : deux 2 peuvent éviter tous les conflits nécessaires par peur de blesser l'autre.",
      adulte: "Duo très soudé. Prenez garde à ne pas exclure les autres ou à créer une dépendance mutuelle excessive.",
    },
  },

  "2-3": {
    pointsForts: "Le 2 soutient l'ambition du 3, le 3 emmène le 2 vers ses propres réussites. Duo dynamique.",
    vigilances: "Le 2 peut se sentir utilisé par le 3 focalisé sur ses objectifs. Le 3 trouve le 2 trop centré sur les émotions.",
    aApporte: "Soutien inconditionnel, réseau relationnel, chaleur humaine.",
    bApporte: "Énergie, vision, capacité à passer à l'action.",
    conseil: "Type 3 : le 2 ne donne pas pour être utile — il donne pour être aimé. Répondez à ce besoin explicitement.",
    contexte: {
      enfant: "Votre enfant Type 3 veut votre admiration. Donnez-lui votre amour sans condition d'abord, l'admiration ensuite.",
      ado: "Votre ado Type 3 construit son image. Aidez-le à distinguer ce qu'il veut vraiment de ce qu'il pense que les autres veulent.",
      couple: "Relation dynamique où le 2 soutient et le 3 avance. Vérifiez régulièrement que le 2 ne s'efface pas totalement.",
      adulte: "Le 3 ouvre les portes, le 2 les entretient. Excellent duo commercial ou associatif.",
    },
  },

  "2-4": {
    pointsForts: "Profondeur émotionnelle partagée. Le 2 et le 4 se comprennent dans leur intensité affective.",
    vigilances: "Le 4 peut trouver le 2 intrusif et trop présent. Le 2 peut souffrir du repli et de la froideur apparente du 4.",
    aApporte: "Soutien pratique, présence physique, chaleur.",
    bApporte: "Profondeur, authenticité, questionnement sur le sens.",
    conseil: "Type 2 : donnez de l'espace au 4 — votre présence constante peut étouffer. Type 4 : exprimer votre gratitude concrètement nourrira le 2.",
    contexte: {
      enfant: "Votre enfant Type 4 a besoin d'être vu dans sa singularité. Aimez-le pour ce qu'il est, pas pour ce qu'il fait.",
      ado: "Votre ado Type 4 traverse des crises d'identité intenses. Soyez présent sans envahir — le juste milieu.",
      couple: "Relation profonde et intense. Le 2 apporte la stabilité affective que le 4 cherche ; le 4 donne au 2 la profondeur qu'il désire.",
      adulte: "Duo créatif et émotionnellement riche. Évitez les drames mutuels qui peuvent bloquer l'avancement.",
    },
  },

  "2-5": {
    pointsForts: "Le 2 sort le 5 de son isolement. Le 5 apporte au 2 la distance et la réflexion qui lui manquent.",
    vigilances: "Le 2 trouve le 5 froid et distant. Le 5 se sent envahi par les besoins émotionnels du 2.",
    aApporte: "Chaleur, connexion sociale, soutien émotionnel.",
    bApporte: "Espace, objectivité, réflexion sans jugement.",
    conseil: "Type 2 : respectez les silences du 5 — c'est sa façon de se ressourcer, pas un rejet. Type 5 : un mot d'appréciation sincère change tout pour le 2.",
    contexte: {
      enfant: "Votre enfant Type 5 préfère observer qu'interagir. Ne forcez pas la connexion — proposez des activités intellectuelles partagées.",
      ado: "Votre ado Type 5 peut sembler vous rejeter. Il a besoin de vous mais ne sait pas demander — restez disponible sans insister.",
      couple: "Relation possible et riche si le 2 apprend à ne pas surinvestir et si le 5 apprend à exprimer son attachement.",
      adulte: "Le 2 apporte l'humain, le 5 apporte l'analyse. Duo complémentaire dans les projets qui mêlent relation et réflexion.",
    },
  },

  "2-6": {
    pointsForts: "Loyauté et soutien mutuels. Vous êtes tous les deux là pour les autres — et pour l'un l'autre.",
    vigilances: "Deux profils qui peuvent alimenter leurs anxiétés mutuellement. Le 6 peut trouver le 2 trop centré sur les besoins des autres.",
    aApporte: "Générosité, chaleur, écoute inconditionnelle.",
    bApporte: "Fidélité, constance, anticipation des besoins pratiques.",
    conseil: "Assurez-vous que votre relation n'est pas que de la gestion des angoisses mutuelles. Construisez aussi de la joie et de la légèreté.",
    contexte: {
      enfant: "Votre enfant Type 6 a besoin de votre présence constante et de règles claires pour se sentir en sécurité.",
      ado: "Votre ado Type 6 doute de lui. Votre soutien inconditionnel est vital — mais évitez de surprotéger.",
      couple: "Relation très sécurisante et loyale. Risque de repli sur soi en bulle protectrice — continuez à vous ouvrir au monde.",
      adulte: "Duo de confiance absolue. Veillez à ne pas vous isoler du reste de l'équipe.",
    },
  },

  "2-7": {
    pointsForts: "Le 7 apporte la joie et la légèreté, le 2 apporte la chaleur et le soin. Relation vivante et joyeuse.",
    vigilances: "Le 2 peut se sentir peu prioritaire face à la fuite du 7. Le 7 peut trouver le 2 trop émotionnel et demandant.",
    aApporte: "Amour inconditionnel, présence, attention aux détails émotionnels.",
    bApporte: "Enthousiasme, fun, capacité à relativiser.",
    conseil: "Type 2 : ne prenez pas les escapades du 7 comme un rejet — c'est sa nature. Type 7 : la fidélité émotionnelle que demande le 2 est un ancrage précieux.",
    contexte: {
      enfant: "Votre enfant Type 7 vit à 100 à l'heure. Canalisez son énergie avec bienveillance — les règles doivent être courtes et motivantes.",
      ado: "Votre ado Type 7 fuit les responsabilités. Aidez-le à voir que s'engager n'est pas une prison mais une source de liberté.",
      couple: "Relation joyeuse et chaleureuse. Le 2 ancre le 7, le 7 allège le 2. Très belle dynamique si les besoins affectifs du 2 sont entendus.",
      adulte: "Le 2 fidélise les gens, le 7 les enthousiasme. Duo redoutable en animation ou en vente.",
    },
  },

  "2-8": {
    pointsForts: "Le 2 adoucit le 8, le 8 protège le 2. Relation de force et de douceur qui peut être très complémentaire.",
    vigilances: "Le 8 peut blesser le 2 avec sa brutalité. Le 2 peut manipuler émotionnellement pour obtenir la tendresse du 8.",
    aApporte: "Empathie, lien aux autres, capacité à désamorcer les conflits.",
    bApporte: "Force, protection, honnêteté sans filtre.",
    conseil: "Type 8 : la douceur du 2 n'est pas de la faiblesse — c'est sa puissance. Type 2 : dites directement ce que vous voulez au lieu d'attendre que le 8 le devine.",
    contexte: {
      enfant: "Votre enfant Type 8 teste les limites pour chercher un adulte solide. Soyez doux ET ferme — les deux ensemble.",
      ado: "Votre ado Type 8 a besoin que vous teniez bon face à ses provocations. Votre amour incondititionnel + votre fermeté = sa sécurité.",
      couple: "Relation intense et passionnée. Le 2 apporte la tendresse que le 8 n'ose pas demander. Belle alchimie si la brutalité du 8 est régulée.",
      adulte: "Le 8 avance, le 2 fédère. Duo efficace en leadership si le 8 respecte la dimension humaine portée par le 2.",
    },
  },

  "2-9": {
    pointsForts: "Douceur et harmonie partagées. Relation paisible, bienveillante, sans ego dominant.",
    vigilances: "Deux profils qui évitent le conflit — les problèmes s'accumulent silencieusement jusqu'à l'explosion.",
    aApporte: "Chaleur active, initiative dans le soin, engagement affectif.",
    bApporte: "Paix, acceptation, absence de jugement.",
    conseil: "Fixez un moment régulier pour parler de ce qui ne va pas — vos deux tendances naturelles sont d'ignorer les frictions.",
    contexte: {
      enfant: "Votre enfant Type 9 a besoin de douceur et de paix. Guidez-le sans brusquerie — il répond très bien à l'encouragement calme.",
      ado: "Votre ado Type 9 peut sembler sans direction. Aidez-le à identifier ce qu'IL veut vraiment, pas ce qui est commode.",
      couple: "Relation très harmonieuse. Risque de « trop de paix » et de non-dits. Cultivez aussi l'expression des désaccords.",
      adulte: "Duo très apprécié des équipes pour sa bienveillance. Attention à ne pas éviter les décisions difficiles ensemble.",
    },
  },

  // ══════════════════════════════════════════
  //  TYPE 3 — Le Battant
  // ══════════════════════════════════════════

  "3-1": {
    pointsForts: "Efficacité, ambition, résultats. Vous partagez le goût du travail bien fait et de la réussite.",
    vigilances: "Le 3 veut aller vite, le 1 veut faire bien — tension permanente sur les méthodes.",
    aApporte: "Énergie, pragmatisme, sens du résultat visible.",
    bApporte: "Rigueur, intégrité, profondeur de travail.",
    conseil: "Décidez ensemble si le projet est une vitrine (3 mène) ou un chef-d'œuvre (1 mène). La clarté évite 80% des frictions.",
    contexte: {
      enfant: "Votre enfant Type 1 veut faire bien, pas vite. Respectez son rythme et valorisez la qualité autant que la performance.",
      ado: "Votre ado Type 1 a des principes forts. Ne les bousculez pas par pragmatisme — engagez un dialogue sur le sens.",
      couple: "Duo de high-performers. Attention à ne pas transformer votre vie commune en concurrence permanente.",
      adulte: "Le 3 vend, le 1 livre. Très bonne répartition des rôles si elle est explicite.",
    },
  },

  "3-2": {
    pointsForts: "Le 3 avance, le 2 soutient. Duo dynamique et chaleureux qui séduit facilement son entourage.",
    vigilances: "Le 2 peut se sentir invisible dans le succès du 3. Le 3 peut utiliser inconsciemment la générosité du 2.",
    aApporte: "Vision, énergie, capacité à ouvrir des opportunités.",
    bApporte: "Réseau humain, fidélité, gestion des relations.",
    conseil: "Type 3 : partagez le crédit avec le 2 — publiquement. Type 2 : posez des limites claires sur ce que vous pouvez et voulez donner.",
    contexte: {
      enfant: "Votre enfant Type 2 cherche votre amour avant vos applaudissements. Dites-lui que vous l'aimez pour qui il est.",
      ado: "Votre ado Type 2 peut se sacrifier pour sa popularité. Aidez-le à comprendre que la vraie amitié ne demande pas de sacrifice.",
      couple: "Belle dynamique si le 3 valorise le 2 au-delà de son rôle de soutien. Le 2 doit aussi avoir ses propres victoires.",
      adulte: "Le 3 conquiert les nouveaux, le 2 fidélise les existants. Duo commercial ou RH excellent.",
    },
  },

  "3-3": {
    pointsForts: "Énergie, ambition et compréhension mutuelle des codes de la réussite. Deux moteurs ensemble.",
    vigilances: "Compétition masquée, image avant authenticité. Deux 3 ensemble peuvent créer une bulle de performance sans profondeur.",
    aApporte: "Miroir de réussite, stimulation mutuelle.",
    bApporte: "Le même drive — et la possibilité de se voir tel qu'on est vraiment.",
    conseil: "Créez des moments sans enjeu de performance. Qui êtes-vous quand personne ne regarde ? C'est là que votre relation prend de la profondeur.",
    contexte: {
      enfant: "Parent Type 3 avec enfant Type 3 : attention à la pression de performance. Votre enfant a besoin de savoir que vous l'aimez même quand il échoue.",
      ado: "Votre ado Type 3 est en compétition avec le monde — et peut-être avec vous. Soyez modèle d'authenticité, pas de succès.",
      couple: "Duo glamour et efficace. Prenez garde : vous pouvez tous les deux jouer un rôle sans jamais vous montrer vrais.",
      adulte: "Duo très performant. Définissez clairement les rôles pour éviter la rivalité destructrice.",
    },
  },

  "3-4": {
    pointsForts: "Le 3 ancre le 4 dans le réel, le 4 donne de la profondeur au 3. Complémentarité entre efficacité et sens.",
    vigilances: "Le 3 trouve le 4 trop focalisé sur ses émotions. Le 4 trouve le 3 superficiel et masqué.",
    aApporte: "Action, pragmatisme, énergie vers l'extérieur.",
    bApporte: "Profondeur, authenticité, sens du beau et du vrai.",
    conseil: "Type 3 : ralentissez assez pour entendre le 4. Type 4 : le 3 montre son amour par ses actes, pas toujours par ses mots.",
    contexte: {
      enfant: "Votre enfant Type 4 a besoin que vous le voyiez dans sa singularité. Résistez à l'envie de le « corriger » pour qu'il soit plus efficace.",
      ado: "Votre ado Type 4 peut sembler en crise permanente. C'est sa façon de chercher son identité. Soyez son ancre.",
      couple: "Relation riche et complexe. Le 4 apporte la profondeur que le 3 cherche secrètement. Le 3 sort le 4 de sa mélancolie.",
      adulte: "Le 3 commercialise, le 4 crée. Duo créatif remarquable si chacun respecte le territoire de l'autre.",
    },
  },

  "3-5": {
    pointsForts: "Le 3 valorise la compétence du 5. Le 5 apporte l'expertise qui crédibilise le 3. Partenariat efficace.",
    vigilances: "Le 3 veut aller vite, le 5 veut comprendre d'abord. Le 5 trouve le 3 trop focalisé sur l'image.",
    aApporte: "Visibilité, énergie, sens du marché.",
    bApporte: "Profondeur d'analyse, expertise, objectivité.",
    conseil: "Type 3 : donnez au 5 le temps de réflexion dont il a besoin — vous en bénéficierez. Type 5 : le 3 a besoin de résultats visibles pour avancer.",
    contexte: {
      enfant: "Votre enfant Type 5 observe beaucoup avant d'agir. Respectez sa prudence — ne l'accusez pas de lenteur.",
      ado: "Votre ado Type 5 peut sembler indifférent à votre regard. Il a ses propres standards intérieurs très élevés.",
      couple: "Relation possible et solide si le 3 apprend à être vrai et si le 5 apprend à s'engager émotionnellement.",
      adulte: "Le 3 présente, le 5 maîtrise le fond. Duo excellent en conseil ou en innovation.",
    },
  },

  "3-6": {
    pointsForts: "Le 3 donne confiance au 6, le 6 ancre le 3 dans la réalité des risques. Bon équilibre.",
    vigilances: "Le 6 peut trouver le 3 trop optimiste et peu fiable. Le 3 peut s'impatienter de l'anxiété du 6.",
    aApporte: "Confiance, optimisme, élan vers l'avant.",
    bApporte: "Fidélité, anticipation des risques, sens des responsabilités.",
    conseil: "Type 3 : prenez au sérieux les alertes du 6 — il voit ce que votre optimisme cache parfois. Type 6 : le 3 n'est pas imprudent, il a juste confiance.",
    contexte: {
      enfant: "Votre enfant Type 6 a besoin de sécurité pour oser. Encouragez-le à prendre des risques calculés — soyez son filet.",
      ado: "Votre ado Type 6 peut alterner confiance et doute. Votre constance et votre présence sont son ancre.",
      couple: "Bon duo si le 3 honore ses engagements et si le 6 fait confiance à la fidélité du 3 sans l'interroger sans cesse.",
      adulte: "Le 3 lance, le 6 sécurise. Excellent duo pour les projets ambitieux avec gestion des risques.",
    },
  },

  "3-7": {
    pointsForts: "Énergie, enthousiasme, plaisir de vivre et d'avancer. Relation vivante et stimulante.",
    vigilances: "Deux profils qui évitent la profondeur et la vulnérabilité. La relation peut rester en surface.",
    aApporte: "Focus, stratégie, orientation résultats.",
    bApporte: "Créativité, joie, nouvelles idées en permanence.",
    conseil: "Créez de vrais moments de profondeur. Deux profils aussi énergiques peuvent se divertir mutuellement sans jamais se rencontrer vraiment.",
    contexte: {
      enfant: "Votre enfant Type 7 est une source d'énergie inépuisable. Orientez-la vers des projets concrets avec des résultats visibles.",
      ado: "Votre ado Type 7 papillonne. Aidez-le à finir ce qu'il commence — c'est là qu'il construira sa confiance.",
      couple: "Relation très stimulante mais risque de fuite mutuelle vers l'action pour éviter les conversations difficiles.",
      adulte: "Duo explosion de créativité et d'énergie. Entourez-vous de profils plus posés pour structurer vos idées.",
    },
  },

  "3-8": {
    pointsForts: "Deux forces orientées vers le résultat. Respect mutuel basé sur la compétence et l'efficacité.",
    vigilances: "Deux egos forts — qui dirige ? La compétition peut être destructrice si elle n'est pas canalisée.",
    aApporte: "Image, stratégie, sens du timing.",
    bApporte: "Force d'exécution, protection, décision rapide.",
    conseil: "Définissez clairement les rôles. Un 3 et un 8 ensemble sans territoire défini = conflit de leadership assuré.",
    contexte: {
      enfant: "Votre enfant Type 8 a besoin de votre force. Ne cherchez pas à le séduire — soyez simplement solide et cohérent.",
      ado: "Votre ado Type 8 teste les limites. Tenez bon sans entrer dans le rapport de force — vous ne le gagnerez pas.",
      couple: "Relation puissante et passionnée. Attention à la compétition — chacun doit avoir un espace de leadership.",
      adulte: "Duo de choc en affaires. Définissez qui est CEO et qui est COO — et respectez cette ligne.",
    },
  },

  "3-9": {
    pointsForts: "Le 3 donne du mouvement au 9, le 9 apporte la sérénité au 3. Belle complémentarité.",
    vigilances: "Le 3 peut s'impatienter de la lenteur du 9. Le 9 peut se sentir poussé dans une direction qu'il n'a pas choisie.",
    aApporte: "Élan, ambition, sens de l'objectif.",
    bApporte: "Paix, stabilité, regard bienveillant.",
    conseil: "Type 3 : le 9 est votre meilleur miroir — il vous voit tel que vous êtes, pas tel que vous voulez paraître. Écoutez-le.",
    contexte: {
      enfant: "Votre enfant Type 9 s'adapte à vos attentes. Assurez-vous qu'il développe aussi ses propres désirs.",
      ado: "Votre ado Type 9 semble sans ambition. C'est souvent de la résistance passive — cherchez ce qui l'anime vraiment.",
      couple: "Le 9 apporte la paix dont le 3 a secrètement besoin. Le 3 tire le 9 de sa léthargie. Belle dynamique.",
      adulte: "Le 9 harmonise, le 3 motive. Duo apprécié en management.",
    },
  },

  // ══════════════════════════════════════════
  //  TYPE 4 — Le Romantique
  // ══════════════════════════════════════════

  "4-1": {
    pointsForts: "Idéal partagé, quête de sens et de qualité. Ensemble vous pouvez créer quelque chose de remarquable.",
    vigilances: "Le 4 ressent les critiques du 1 comme des rejets de son identité. Le 1 perd patience face aux émotions intenses du 4.",
    aApporte: "Profondeur, créativité, authenticité.",
    bApporte: "Structure, cohérence, ancrage dans le réel.",
    conseil: "Type 4 : la rigueur du 1 n'est pas un jugement de valeur sur vous. Type 1 : le 4 ne cherche pas la perfection — il cherche la vérité.",
    contexte: {
      enfant: "Votre enfant Type 1 se punit déjà de ses erreurs. Votre soutien émotionnel lui permet de lâcher prise.",
      ado: "Votre ado Type 1 a un fort sens moral. Engagez des discussions sur les valeurs — il adore ça.",
      couple: "Relation complexe et riche. Le 1 structure le 4, le 4 donne de la profondeur au 1. Fragile mais précieux.",
      adulte: "Le 4 crée, le 1 améliore. Duo artistique ou éditorial remarquable.",
    },
  },

  "4-2": {
    pointsForts: "Profondeur émotionnelle et générosité. Vous vous reconnaissez dans votre besoin de connexion authentique.",
    vigilances: "Le 4 peut trouver le 2 intrusif. Le 2 peut souffrir du besoin d'espace du 4.",
    aApporte: "Profondeur, sens, intensité relationnelle.",
    bApporte: "Présence, chaleur, soutien concret.",
    conseil: "Type 4 : le 2 a besoin d'être remercié concrètement. Type 2 : laissez le 4 disparaître parfois — il reviendra.",
    contexte: {
      enfant: "Votre enfant Type 2 cherche votre affection. Dites-lui souvent que vous l'aimez — en mots, pas seulement en actes.",
      ado: "Votre ado Type 2 se perd dans ses relations. Aidez-le à mettre ses propres besoins en premier.",
      couple: "Relation intense, profonde et émotionnellement riche. Risque d'excès dramatiques des deux côtés.",
      adulte: "Duo créatif et humain. Attention aux drames qui peuvent bloquer l'avancement des projets.",
    },
  },

  "4-3": {
    pointsForts: "Le 4 donne du sens au 3, le 3 aide le 4 à concrétiser ses visions. Complémentarité créative.",
    vigilances: "Le 4 trouve le 3 superficiel. Le 3 trouve le 4 lent et trop centré sur lui-même.",
    aApporte: "Authenticité, profondeur, vision artistique.",
    bApporte: "Énergie d'exécution, visibilité, sens du marché.",
    conseil: "Type 4 : le 3 peut rendre vos idées accessibles au monde — c'est précieux. Type 3 : donnez crédit à la source créative du 4.",
    contexte: {
      enfant: "Votre enfant Type 3 a besoin d'être admiré. Mais apprenez-lui aussi la valeur de la profondeur et de l'authenticité.",
      ado: "Votre ado Type 3 construit son image. Encouragez-le à explorer qui il est vraiment derrière la façade.",
      couple: "Relation créative et stimulante. Le 4 apporte la vérité, le 3 apporte l'élan. Fragile mais belle.",
      adulte: "Duo artistique-commercial idéal. Le 4 crée, le 3 vend. Ne les mélangez pas.",
    },
  },

  "4-4": {
    pointsForts: "Compréhension profonde et immédiate. Vous vous reconnaissez dans votre intensité et votre quête de sens.",
    vigilances: "Deux profils qui s'alimentent mutuellement dans la mélancolie. Risque de spirale émotionnelle.",
    aApporte: "Miroir de profondeur et d'authenticité.",
    bApporte: "Le même — et parfois un révélateur douloureux.",
    conseil: "Créez ensemble des espaces de légèreté. La profondeur est votre force, mais la vie demande aussi de la joie.",
    contexte: {
      enfant: "Parent Type 4 avec enfant Type 4 : évitez la transmission de la mélancolie. Montrez-lui la joie dans la beauté.",
      ado: "Votre ado Type 4 a besoin d'être vu et compris — vous le pouvez mieux que personne. Mais aidez-le aussi à agir.",
      couple: "Relation profonde et intense. Cultivez aussi la légèreté et l'humour pour équilibrer.",
      adulte: "Duo créatif exceptionnel. Entourez-vous de profils plus pragmatiques pour concrétiser vos visions.",
    },
  },

  "4-5": {
    pointsForts: "Curiosité intellectuelle et profondeur partagées. Deux esprits qui cherchent le sens au-delà des apparences.",
    vigilances: "Le 4 cherche la connexion émotionnelle, le 5 se protège derrière l'intellect. Risque de frustration mutuelle.",
    aApporte: "Profondeur émotionnelle, sens esthétique, authenticité.",
    bApporte: "Analyse, distance réflexive, clarté intellectuelle.",
    conseil: "Type 4 : le 5 vous aime différemment — par la curiosité et l'attention. Type 5 : exprimez votre attachement, même maladroitement.",
    contexte: {
      enfant: "Votre enfant Type 5 vit dans sa tête. Rejoignez-le là-bas avant d'essayer de le ramener dans le monde émotionnel.",
      ado: "Votre ado Type 5 préfère le livre ou l'ordinateur à la conversation. C'est normal — créez des ponts discrets.",
      couple: "Relation possible et profonde si chacun accepte le langage de l'autre. Belle complémentarité.",
      adulte: "Duo intellectuellement riche. Apportez un peu de chaleur humaine dans vos interactions pour les rendre accessibles.",
    },
  },

  "4-6": {
    pointsForts: "Le 4 aide le 6 à trouver son identité. Le 6 apporte la loyauté dont le 4 a besoin.",
    vigilances: "Les angoisses du 6 peuvent amplifier les peurs du 4. Le 4 peut trouver le 6 trop conventionnel.",
    aApporte: "Profondeur, unicité, permission d'être différent.",
    bApporte: "Loyauté, constance, présence dans le temps.",
    conseil: "Créez ensemble une relation fondée sur la confiance progressive. Ni le 4 ni le 6 ne s'ouvre facilement — mais les deux en ont besoin.",
    contexte: {
      enfant: "Votre enfant Type 6 a besoin de sécurité avant l'autonomie. Soyez son ancre sans le surprotéger.",
      ado: "Votre ado Type 6 peut être rebelle ou très conformiste. Aidez-le à trouver son propre cap.",
      couple: "Relation profonde et loyale. Attention aux spirales de doute mutuel — rassurez-vous souvent.",
      adulte: "Le 4 apporte l'originalité, le 6 apporte la loyauté. Bon équilibre dans les équipes créatives.",
    },
  },

  "4-7": {
    pointsForts: "Le 7 tire le 4 hors de sa mélancolie. Le 4 donne de la profondeur aux expériences du 7.",
    vigilances: "Le 4 trouve le 7 superficiel et fuyant. Le 7 trouve le 4 trop lourd émotionnellement.",
    aApporte: "Profondeur, sens, intensité.",
    bApporte: "Légèreté, joie, nouvelles perspectives.",
    conseil: "Type 4 : laissez le 7 vous emmener vers la légèreté — ce n'est pas une trahison de votre profondeur. Type 7 : restez quand c'est difficile.",
    contexte: {
      enfant: "Votre enfant Type 7 fuit la douleur. Aidez-le à apprendre que les émotions difficiles passent — et qu'elles enrichissent.",
      ado: "Votre ado Type 7 a besoin de liberté ET de sens. Aidez-le à construire une vision au-delà du plaisir immédiat.",
      couple: "Relation vivante. Le 7 allège le 4, le 4 ancre le 7. Très belle dynamique si le 7 honore ses engagements.",
      adulte: "Le 4 donne du sens, le 7 donne de l'énergie. Duo créatif remarquable.",
    },
  },

  "4-8": {
    pointsForts: "Intensité partagée, honnêteté brutale possible, profondeur de relation. Deux profils qui ne font pas semblant.",
    vigilances: "Le 8 peut blesser le 4 avec sa brutalité. Le 4 peut provoquer le 8 par ses drames émotionnels.",
    aApporte: "Profondeur, authenticité, intensité émotionnelle.",
    bApporte: "Force, protection, honnêteté sans détour.",
    conseil: "Type 8 : la sensibilité du 4 n'est pas une faiblesse — c'est sa force créatrice. Type 4 : la brutalité du 8 cache souvent une grande loyauté.",
    contexte: {
      enfant: "Votre enfant Type 8 est direct et puissant. Répondez à sa force sans le briser — tenez bon avec douceur.",
      ado: "Votre ado Type 8 peut sembler vous défier. Il teste si vous êtes digne de confiance — montrez-lui que oui.",
      couple: "Relation passionnée et intense. Les deux se blessent facilement. Apprenez les mots qui soignent.",
      adulte: "Duo très engagé. Les deux apportent leur entièreté. Définissez des espaces de désaccord sains.",
    },
  },

  "4-9": {
    pointsForts: "Le 9 apporte la paix dont le 4 a besoin. Le 4 aide le 9 à se connecter à ses émotions profondes.",
    vigilances: "Le 4 peut trouver le 9 trop neutre et peu engagé. Le 9 peut être écrasé par l'intensité émotionnelle du 4.",
    aApporte: "Profondeur, intensité, sens de l'authenticité.",
    bApporte: "Calme, acceptation totale, absence de jugement.",
    conseil: "Type 4 : le 9 vous accepte comme vous êtes — c'est rare. Reconnaissez cette qualité. Type 9 : exprimez vos propres désirs et émotions — le 4 en a besoin.",
    contexte: {
      enfant: "Votre enfant Type 9 absorbe les ambiances. Protégez-le de vos propres turbulences émotionnelles.",
      ado: "Votre ado Type 9 peut sembler sans vie propre. Aidez-le à trouver ce qui l'enflamme vraiment.",
      couple: "Relation profonde et apaisante. Le 9 est le havre dont le 4 a besoin. Le 4 réveille le 9. Belle dynamique.",
      adulte: "Le 4 inspire, le 9 harmonise. Bon duo en milieu créatif ou relationnel.",
    },
  },

  // ══════════════════════════════════════════
  //  TYPE 5 — L'Investigateur
  // ══════════════════════════════════════════

  "5-1": {
    pointsForts: "Exigence intellectuelle, travail de fond, respect mutuel basé sur la compétence.",
    vigilances: "Deux profils qui retiennent leurs émotions. La relation risque de rester fonctionnelle et froide.",
    aApporte: "Profondeur analytique, objectivité, expertise.",
    bApporte: "Structure, action, sens du devoir.",
    conseil: "Planifiez des moments de connexion humaine. Ni l'un ni l'autre ne le fera naturellement.",
    contexte: {
      enfant: "Votre enfant Type 1 cherche votre approbation. Exprimez votre fierté en mots, pas seulement en signes.",
      ado: "Votre ado Type 1 veut débattre sur les principes. C'est sa façon de se construire — engagez le dialogue.",
      couple: "Relation respectueuse et stable. Investissez dans la chaleur émotionnelle — elle ne viendra pas toute seule.",
      adulte: "Duo intellectuellement puissant. Attention à ne pas paraître distant ou arrogant aux autres.",
    },
  },

  "5-2": {
    pointsForts: "Le 2 sort le 5 de son isolement. Le 5 apporte au 2 la perspective et la distance qu'il lui manque.",
    vigilances: "Le 5 se sent envahi par le besoin de connexion du 2. Le 2 se sent rejeté par le retrait du 5.",
    aApporte: "Expertise, calme, réflexion approfondie.",
    bApporte: "Chaleur, soin, lien au monde émotionnel.",
    conseil: "Type 5 : un geste de gratitude sincère vers le 2 change tout. Type 2 : donnez de l'espace — c'est la condition pour que le 5 revienne.",
    contexte: {
      enfant: "Votre enfant Type 2 a besoin de connexion. Proposez des activités côte à côte — c'est votre façon naturelle d'être ensemble.",
      ado: "Votre ado Type 2 peut se sacrifier pour être aimé. Aidez-le à voir qu'il a de la valeur sans se donner.",
      couple: "Relation possible et complémentaire. Le 2 humanise le 5, le 5 ancre le 2. Besoin de négocier les niveaux d'intimité.",
      adulte: "Le 5 analyse, le 2 relie. Excellent duo dans les projets qui mêlent expertise et relationnel.",
    },
  },

  "5-3": {
    pointsForts: "Le 5 crédibilise le 3, le 3 rend visible le travail du 5. Belle complémentarité expertise-visibilité.",
    vigilances: "Le 5 trouve le 3 trop focalisé sur l'image. Le 3 trouve le 5 trop lent et trop perfectionniste.",
    aApporte: "Maîtrise du fond, objectivité, crédibilité.",
    bApporte: "Énergie, sens de la mise en valeur, résultats rapides.",
    conseil: "Type 5 : votre expertise a besoin d'être vue — laissez le 3 vous aider. Type 3 : sans le fond solide du 5, votre image est fragile.",
    contexte: {
      enfant: "Votre enfant Type 3 veut briller. Enseignez-lui que la compétence réelle est le meilleur fond de scène.",
      ado: "Votre ado Type 3 veut des résultats rapides. Guidez-le vers la profondeur — elle servira son ambition.",
      couple: "Relation efficace si les rôles sont clairs. Le 5 réfléchit, le 3 agit. Attention : le 5 ne doit pas rester dans l'ombre.",
      adulte: "Duo de conseil ou d'innovation très efficace. Le 5 fournit l'expertise, le 3 la vend.",
    },
  },

  "5-4": {
    pointsForts: "Curiosité, profondeur et quête de sens partagées. Deux esprits au-delà des apparences.",
    vigilances: "Le 4 cherche la fusion émotionnelle, le 5 cherche la distance réflexive. Frustration possible.",
    aApporte: "Clarté intellectuelle, objectivité, calme.",
    bApporte: "Profondeur émotionnelle, inspiration, authenticité.",
    conseil: "Type 5 : laissez le 4 vous emmener dans l'émotionnel — c'est la zone de croissance. Type 4 : le 5 vous aime par l'intellect d'abord.",
    contexte: {
      enfant: "Votre enfant Type 4 a besoin d'être vu dans sa singularité émotionnelle. Rejoignez-le là avec curiosité.",
      ado: "Votre ado Type 4 cherche son identité dans l'intensité. Soyez son ancre calme.",
      couple: "Relation riche et profonde. Deux êtres qui ne vivent pas en surface. Belle rencontre si la distance du 5 est apprivoisée.",
      adulte: "Le 5 structure, le 4 inspire. Duo créatif et intellectuellement exceptionnel.",
    },
  },

  "5-5": {
    pointsForts: "Respect mutuel de l'espace, stimulation intellectuelle, autonomie préservée.",
    vigilances: "Deux profils qui accumulent sans partager. La relation peut devenir deux solitudes parallèles.",
    aApporte: "Compréhension sans intrusion.",
    bApporte: "Le même — et parfois un miroir révélateur de l'isolement.",
    conseil: "Fixez intentionnellement des moments de partage. Deux 5 ensemble peuvent coexister sans vraiment se rencontrer.",
    contexte: {
      enfant: "Parent Type 5 avec enfant Type 5 : votre enfant a besoin de chaleur autant que d'espace. Verbalisez votre amour.",
      ado: "Votre ado Type 5 peut sembler ne pas avoir besoin de vous. Il en a besoin — différemment.",
      couple: "Relation intellectuellement riche mais risque de vie parallèle. Créez des projets communs.",
      adulte: "Duo extrêmement compétent. Risque d'isolement de l'équipe — impliquez les autres.",
    },
  },

  "5-6": {
    pointsForts: "Le 5 apporte l'objectivité que le 6 cherche. Le 6 apporte la loyauté dont le 5 a besoin.",
    vigilances: "Le 6 peut angoisser le 5 avec ses questionnements constants. Le 5 peut sembler froid au 6 qui a besoin de réassurance.",
    aApporte: "Objectivité, calme face à l'anxiété, expertise.",
    bApporte: "Loyauté, préparation, soutien constant.",
    conseil: "Type 5 : le 6 a besoin de réassurance régulière — un mot suffit. Type 6 : le calme du 5 n'est pas de l'indifférence.",
    contexte: {
      enfant: "Votre enfant Type 6 a besoin de votre présence constante. Ne disparaissez pas derrière votre travail sans le rassurer.",
      ado: "Votre ado Type 6 doute beaucoup. Partagez votre façon de raisonner avec lui — il apprendra à faire confiance à sa propre analyse.",
      couple: "Relation stable et complémentaire. Le 5 calme le 6, le 6 sort le 5 de son isolement.",
      adulte: "Le 5 maîtrise le fond, le 6 anticipe les risques. Excellent duo pour les projets complexes.",
    },
  },

  "5-7": {
    pointsForts: "Curiosité partagée, amour des idées nouvelles. Le 7 apporte l'enthousiasme que le 5 manque.",
    vigilances: "Le 5 trouve le 7 dispersé et superficiel. Le 7 trouve le 5 trop lent et trop sérieux.",
    aApporte: "Profondeur, maîtrise, patience d'analyse.",
    bApporte: "Enthousiasme, créativité, énergie.",
    conseil: "Type 5 : le 7 vous sort de votre bulle — laissez-le faire. Type 7 : restez assez longtemps pour bénéficier de la profondeur du 5.",
    contexte: {
      enfant: "Votre enfant Type 7 a besoin de stimulation constante. Canalisez avec des activités qui demandent aussi de la concentration.",
      ado: "Votre ado Type 7 saute d'une passion à l'autre. Aidez-le à finir quelque chose — la satisfaction est au bout.",
      couple: "Relation stimulante si le 5 accepte le rythme du 7 et si le 7 honore la profondeur du 5.",
      adulte: "Le 5 maîtrise, le 7 enthousiasme. Duo innovant remarquable.",
    },
  },

  "5-8": {
    pointsForts: "Le 8 respecte la compétence du 5. Le 5 apporte l'analyse que le 8 n'a pas le temps de faire.",
    vigilances: "Le 8 peut être intrusif dans l'espace du 5. Le 5 peut sembler trop lent ou timoré au 8.",
    aApporte: "Expertise, objectivité, analyse sans biais.",
    bApporte: "Force d'exécution, décision rapide, protection.",
    conseil: "Type 8 : donnez de l'espace au 5 — son expertise vaut la patience. Type 5 : le 8 a besoin de vos conclusions, pas de tout votre raisonnement.",
    contexte: {
      enfant: "Votre enfant Type 8 est fort et direct. Il a besoin d'un parent qui tient bon — soyez ce roc.",
      ado: "Votre ado Type 8 teste les autorités. Votre compétence est votre meilleure arme — soyez incontestable.",
      couple: "Relation complémentaire. Le 5 réfléchit, le 8 agit. Belle alliance si le 8 respecte les besoins d'espace du 5.",
      adulte: "Le 5 est le cerveau, le 8 est le bras. Duo puissant si les rôles sont clairement définis.",
    },
  },

  "5-9": {
    pointsForts: "Respect mutuel de l'espace et de la paix. Deux profils qui ne s'envahissent pas.",
    vigilances: "Deux profils qui évitent les confrontations — les problèmes s'accumulent silencieusement.",
    aApporte: "Profondeur intellectuelle, objectivité.",
    bApporte: "Paix, acceptation, harmonie.",
    conseil: "Planifiez des moments de vrai échange — vos deux naturels sont de coexister sans vous rencontrer vraiment.",
    contexte: {
      enfant: "Votre enfant Type 9 a besoin de guidance claire. Sa compliance peut masquer des désirs non exprimés.",
      ado: "Votre ado Type 9 cherche sa direction. Proposez-lui des options et laissez-le choisir — mais accompagnez.",
      couple: "Relation très paisible. Risque de « vie parallèle » douce mais vide de connexion profonde.",
      adulte: "Duo très respectueux. Excellent pour les environnements qui demandent calme et réflexion.",
    },
  },

  // ══════════════════════════════════════════
  //  TYPE 6 — Le Loyaliste
  // ══════════════════════════════════════════

  "6-1": {
    pointsForts: "Sens des responsabilités et des valeurs partagées. Relation fondée sur la confiance construite pas à pas.",
    vigilances: "Le 6 peut remettre en question les certitudes du 1. Le 1 peut trouver le 6 trop hésitant.",
    aApporte: "Loyauté, anticipation des risques, soutien dans la durée.",
    bApporte: "Cap moral, certitude, structure.",
    conseil: "Type 6 : faites confiance aux intentions du 1 — sa rigueur est son amour. Type 1 : rassurez le 6 sur le processus, pas seulement sur le résultat.",
    contexte: {
      enfant: "Votre enfant Type 1 a des standards très élevés. Montrez-lui que l'erreur est permise chez vous.",
      ado: "Votre ado Type 1 veut améliorer le système. Accueillez ses critiques comme des marques d'engagement.",
      couple: "Relation solide et durable. Attention à ne pas alimenter les peurs mutuelles — cherchez la légèreté.",
      adulte: "Duo de confiance. Excellent pour les projets qui demandent fiabilité et intégrité sur la durée.",
    },
  },

  "6-2": {
    pointsForts: "Loyauté et bienveillance partagées. Vous êtes tous deux là pour les autres.",
    vigilances: "Deux profils qui peuvent alimenter leur anxiété et leurs besoins affectifs mutuellement.",
    aApporte: "Fidélité, constance, anticipation des besoins.",
    bApporte: "Chaleur, générosité, connexion émotionnelle.",
    conseil: "Assurez-vous que votre relation inclut aussi de la joie et de la légèreté — pas seulement du soutien mutuel.",
    contexte: {
      enfant: "Votre enfant Type 2 donne beaucoup. Apprenez-lui à aussi recevoir et à poser des limites.",
      ado: "Votre ado Type 2 cherche l'approbation de ses pairs. Aidez-le à s'ancrer dans sa propre valeur.",
      couple: "Relation très sécurisante. Risque de repli en bulle protectrice — continuez à vous ouvrir au monde.",
      adulte: "Duo de soutien humain excellent. Faites attention à ne pas vous isoler des autres.",
    },
  },

  "6-3": {
    pointsForts: "Le 3 donne confiance au 6. Le 6 ancre le 3 dans la réalité des engagements.",
    vigilances: "Le 6 peut trouver le 3 trop opportuniste. Le 3 s'impatiente de l'anxiété du 6.",
    aApporte: "Loyauté, préparation, sens des risques.",
    bApporte: "Élan, optimisme, visibilité.",
    conseil: "Type 6 : le 3 n'est pas irresponsable — il a une confiance que vous pouvez apprendre. Type 3 : honorez vos engagements envers le 6.",
    contexte: {
      enfant: "Votre enfant Type 3 veut être admiré. Montrez-lui que l'intégrité est plus durable que le succès rapide.",
      ado: "Votre ado Type 3 prend des risques calculés. Guidez-le avec des règles sur les moyens, pas les fins.",
      couple: "Bon duo si le 3 est fiable dans ses engagements. Le 6 a besoin de certitude pour se sentir en sécurité.",
      adulte: "Le 6 sécurise, le 3 propulse. Excellent tandem en gestion de projet.",
    },
  },

  "6-4": {
    pointsForts: "Loyauté et profondeur. Vous cherchez tous deux quelque chose de vrai et de durable.",
    vigilances: "Les angoisses du 6 peuvent amplifier les peurs d'abandon du 4. Spirale émotionnelle possible.",
    aApporte: "Constance, fiabilité, présence dans le temps.",
    bApporte: "Profondeur, authenticité, intensité.",
    conseil: "Rassurez-vous mutuellement et régulièrement. Ni l'un ni l'autre ne fait facilement confiance — mais les deux en ont besoin.",
    contexte: {
      enfant: "Votre enfant Type 4 a besoin d'être vu dans sa différence. Votre présence constante est sa sécurité.",
      ado: "Votre ado Type 4 vit des tempêtes intérieures. Soyez son ancre stable sans chercher à les résoudre.",
      couple: "Relation profonde et loyale. Attention aux angoisses d'abandon croisées — développez un langage de réassurance.",
      adulte: "Le 6 apporte la fidélité, le 4 apporte la profondeur. Beau duo dans les milieux artistiques.",
    },
  },

  "6-5": {
    pointsForts: "Le 5 apporte la clarté analytique que le 6 cherche. Le 6 apporte la loyauté dont le 5 a besoin.",
    vigilances: "Le 6 peut interroger constamment le 5 qui a besoin de silence. Le 5 peut sembler trop détaché.",
    aApporte: "Loyauté, soutien pratique, anticipation des risques.",
    bApporte: "Clarté, objectivité, calme face à l'anxiété.",
    conseil: "Type 6 : la réflexion calme du 5 est votre meilleur antidote à l'anxiété. Type 5 : le 6 a juste besoin que vous disiez « c'est OK ».",
    contexte: {
      enfant: "Votre enfant Type 5 a besoin de temps seul pour réfléchir. Respectez ces moments — il reviendra.",
      ado: "Votre ado Type 5 peut sembler indifférent aux règles. Il les applique s'il les comprend — expliquez.",
      couple: "Relation complémentaire et stable. Le 5 rassure le 6 par sa clarté ; le 6 fidélise le 5 par sa constance.",
      adulte: "Duo d'analyse et de gestion des risques excellent. Très bon en conseil ou en gestion de crise.",
    },
  },

  "6-6": {
    pointsForts: "Loyauté et solidarité absolues. Vous vous soutenez avec une constance rare.",
    vigilances: "Deux profils anxieux ensemble — les peurs peuvent s'amplifier mutuellement.",
    aApporte: "Fiabilité, anticipation, soutien dans l'adversité.",
    bApporte: "Le même miroir de loyauté — et parfois de leurs peurs communes.",
    conseil: "Créez des rituels de joie et de légèreté. Vos deux natures vous portent vers la vigilance — équilibrez avec de la confiance.",
    contexte: {
      enfant: "Parent Type 6 avec enfant Type 6 : ne transmettez pas vos angoisses. Montrez-lui que le monde est aussi sûr.",
      ado: "Votre ado Type 6 a besoin de confiance en lui. Aidez-le à prendre des risques mesurés.",
      couple: "Relation très sécurisante. Attention à la bulle protectrice — ouvrez-vous au monde.",
      adulte: "Duo très fiable. Prenez garde à l'excès de prudence qui peut bloquer l'innovation.",
    },
  },

  "6-7": {
    pointsForts: "Le 7 sort le 6 de ses angoisses. Le 6 apporte la fiabilité qui manque au 7.",
    vigilances: "Le 6 peut trouver le 7 irresponsable. Le 7 peut trouver le 6 trop pessimiste.",
    aApporte: "Fiabilité, préparation, constance.",
    bApporte: "Légèreté, optimisme, élan vers l'avant.",
    conseil: "Type 6 : le 7 ne nie pas les risques — il choisit de ne pas les laisser diriger. Apprenez de ça. Type 7 : honorer ses engagements donne au 6 la sécurité dont il a besoin.",
    contexte: {
      enfant: "Votre enfant Type 7 a besoin de liberté ET de limites. Les deux ensemble, pas l'un sans l'autre.",
      ado: "Votre ado Type 7 fuit les contraintes. Négociez sur les formes, jamais sur les valeurs.",
      couple: "Relation complémentaire. Le 7 allège le 6, le 6 ancre le 7. Belle dynamique si le 7 honore ses engagements.",
      adulte: "Le 6 gère les risques, le 7 génère les opportunités. Excellent duo en développement.",
    },
  },

  "6-8": {
    pointsForts: "Le 8 protège le 6. Le 6 apporte la loyauté dont le 8 a secrètement besoin.",
    vigilances: "Le 8 peut intimider le 6. Le 6 peut remettre en question l'autorité du 8 au mauvais moment.",
    aApporte: "Loyauté absolue, préparation, fiabilité.",
    bApporte: "Protection, force, décision sans hésitation.",
    conseil: "Type 6 : le 8 teste votre loyauté — restez vous-même sous pression. Type 8 : votre douceur avec le 6 est votre plus grande force dans cette relation.",
    contexte: {
      enfant: "Votre enfant Type 8 a besoin d'un parent solide. Soyez son roc — il n'a pas besoin d'un ami.",
      ado: "Votre ado Type 8 ne cède qu'aux arguments solides. Soyez cohérent — jamais réactif.",
      couple: "Relation de force et de loyauté. Le 8 protège, le 6 fidélise. Belle dynamique si la brutalité du 8 est régulée.",
      adulte: "Le 8 avance, le 6 assure les arrières. Duo de leadership efficace.",
    },
  },

  "6-9": {
    pointsForts: "Paix et sécurité. Le 9 apporte le calme dont le 6 a besoin. Le 6 apporte la loyauté que le 9 apprécie.",
    vigilances: "Deux profils qui évitent le conflit — les problèmes ne se règlent jamais.",
    aApporte: "Loyauté, sens des responsabilités, anticipation.",
    bApporte: "Paix, acceptation, désamorçage des tensions.",
    conseil: "Créez des rituels de dialogue sur les désaccords. Vos deux tendances naturelles vous portent à éviter — mais les non-dits corrodent.",
    contexte: {
      enfant: "Votre enfant Type 9 est accommodant. Assurez-vous qu'il exprime aussi ses propres désirs.",
      ado: "Votre ado Type 9 peut sembler sans direction. Aidez-le à identifier ce qui l'anime profondément.",
      couple: "Relation très paisible et loyale. Attention aux non-dits — créez de l'espace pour les désaccords.",
      adulte: "Duo très fiable et apaisé. Excellent pour les environnements qui demandent calme et constance.",
    },
  },

  // ══════════════════════════════════════════
  //  TYPE 7 — L'Épicurien
  // ══════════════════════════════════════════

  "7-1": {
    pointsForts: "Le 1 donne l'ancrage dont le 7 a besoin. Le 7 apporte la légèreté qui manque au 1.",
    vigilances: "Le 7 trouve le 1 rigide et moralisateur. Le 1 trouve le 7 irresponsable.",
    aApporte: "Joie, créativité, ouverture aux possibles.",
    bApporte: "Structure, fiabilité, sens des engagements.",
    conseil: "Type 7 : finissez ce que vous commencez — le 1 a besoin de constance. Type 1 : laissez le 7 vous apporter de la légèreté.",
    contexte: {
      enfant: "Votre enfant Type 1 est sérieux et consciencieux. Apprenez-lui aussi à jouer et à accepter l'imperfection joyeusement.",
      ado: "Votre ado Type 1 porte le monde sur ses épaules. Votre légèreté est un cadeau — partagez-la.",
      couple: "Relation vivante et complémentaire. Le 7 allège le 1, le 1 ancre le 7. Fragile mais stimulante.",
      adulte: "Le 7 génère les idées, le 1 les réalise avec soin. Duo créatif si les rôles sont respectés.",
    },
  },

  "7-2": {
    pointsForts: "Joie et générosité partagées. Relation chaleureuse et enthousiaste.",
    vigilances: "Le 2 peut se sentir peu prioritaire dans la vie débordante du 7. Le 7 peut trouver le 2 trop centré sur les émotions.",
    aApporte: "Enthousiasme, fun, nouvelles expériences.",
    bApporte: "Chaleur, fidélité, soin des détails relationnels.",
    conseil: "Type 7 : le 2 a besoin d'être prioritaire régulièrement — montrez-le. Type 2 : la fuite du 7 n'est pas un rejet.",
    contexte: {
      enfant: "Votre enfant Type 2 cherche votre approbation constante. Dites-lui souvent que vous l'aimez tel qu'il est.",
      ado: "Votre ado Type 2 donne tout à ses amis. Aidez-le à construire ses propres limites.",
      couple: "Relation joyeuse et chaleureuse. Le 2 ancre le 7. Belle dynamique si le 7 honore ses engagements affectifs.",
      adulte: "Le 7 génère l'enthousiasme, le 2 tisse les liens durables. Excellent duo commercial.",
    },
  },

  "7-3": {
    pointsForts: "Énergie, ambition et enthousiasme. Duo qui avance vite et génère de l'excitement.",
    vigilances: "Deux profils qui fuient la profondeur et la vulnérabilité. Surface possible.",
    aApporte: "Joie, spontanéité, créativité.",
    bApporte: "Focus, stratégie, sens du résultat.",
    conseil: "Créez des moments de vraie connexion — deux profils aussi énergiques peuvent se stimuler sans jamais se rencontrer vraiment.",
    contexte: {
      enfant: "Votre enfant Type 3 a besoin de savoir qu'il est aimé au-delà de ses performances. Dites-le souvent.",
      ado: "Votre ado Type 3 construit son image. Guidez-le vers l'authenticité.",
      couple: "Relation stimulante mais attention à la fuite mutuelle — les conversations difficiles sont aussi nécessaires.",
      adulte: "Duo créatif et énergique. Entourez-vous de profils plus posés pour concrétiser.",
    },
  },

  "7-4": {
    pointsForts: "Le 4 donne de la profondeur au 7. Le 7 apporte la légèreté dont le 4 a besoin.",
    vigilances: "Le 4 trouve le 7 superficiel. Le 7 trouve le 4 trop lourd.",
    aApporte: "Légèreté, joie, nouvelles perspectives.",
    bApporte: "Profondeur, sens, authenticité.",
    conseil: "Type 7 : ne fuyez pas quand le 4 devient intense — ces moments sont les plus précieux. Type 4 : le 7 vous ouvre vers la joie — laissez-le.",
    contexte: {
      enfant: "Votre enfant Type 4 a besoin de profondeur. Rejoignez-le dans ses émotions avant de l'emmener vers la légèreté.",
      ado: "Votre ado Type 4 est en crise d'identité. Soyez son ancre — pas son divertisseur.",
      couple: "Relation vivante et complémentaire. Le 7 allège, le 4 ancre. Belle dynamique si le 7 ne fuit pas l'intensité.",
      adulte: "Le 7 donne de l'élan, le 4 donne du sens. Duo créatif remarquable.",
    },
  },

  "7-5": {
    pointsForts: "Curiosité et amour des idées. Stimulation intellectuelle et ouverture d'esprit.",
    vigilances: "Le 7 trouve le 5 trop lent. Le 5 trouve le 7 trop dispersé.",
    aApporte: "Enthousiasme, connexions inattendues, énergie.",
    bApporte: "Profondeur, maîtrise, patience.",
    conseil: "Type 7 : restez assez longtemps pour bénéficier de la profondeur du 5. Type 5 : l'enthousiasme du 7 peut être votre pont vers le monde.",
    contexte: {
      enfant: "Votre enfant Type 5 observe avant d'agir. Rejoignez-le dans sa curiosité — c'est votre terrain commun.",
      ado: "Votre ado Type 5 a des passions profondes. Stimulez-les sans les brusquer.",
      couple: "Relation stimulante si le 7 accepte les besoins d'espace du 5. Belle complémentarité.",
      adulte: "Le 7 génère, le 5 approfondit. Duo innovant excellent.",
    },
  },

  "7-6": {
    pointsForts: "Le 7 apporte l'optimisme, le 6 apporte la préparation. Complémentarité entre audace et prudence.",
    vigilances: "Le 7 peut trouver le 6 trop pessimiste. Le 6 peut trouver le 7 irresponsable.",
    aApporte: "Optimisme, élan, confiance.",
    bApporte: "Préparation, loyauté, anticipation des risques.",
    conseil: "Type 7 : les risques que le 6 voit sont réels — prenez-les au sérieux. Type 6 : le 7 vous montre que l'aventure peut être sûre.",
    contexte: {
      enfant: "Votre enfant Type 6 a besoin d'encouragement pour oser. Guidez-le avec enthousiasme.",
      ado: "Votre ado Type 6 hésite beaucoup. Votre confiance contagieuse est un cadeau précieux.",
      couple: "Relation complémentaire. Le 7 propulse, le 6 sécurise. Belle dynamique si le 7 honore ses engagements.",
      adulte: "Excellent duo en développement commercial. Le 7 ouvre les portes, le 6 gère les risques.",
    },
  },

  "7-7": {
    pointsForts: "Enthousiasme, joie, liberté partagée. Deux épicuriens ensemble — la vie est une fête.",
    vigilances: "Deux fugueurs qui ne s'ancrent pas. Aucun ne prend en charge les responsabilités.",
    aApporte: "Joie, créativité, optimisme.",
    bApporte: "Le même miroir d'enthousiasme — et parfois de leur fuite commune.",
    conseil: "Quelqu'un doit tenir le gouvernail. Deux 7 ensemble sans structure = énergie magnifique mais projets non finalisés.",
    contexte: {
      enfant: "Parent Type 7 avec enfant Type 7 : votre enfant a besoin de limites claires. Quelqu'un doit être l'adulte dans la pièce.",
      ado: "Votre ado Type 7 a besoin que vous teniez la structure. Soyez fun ET fiable.",
      couple: "Relation très vivante. Attention : quelqu'un doit gérer le quotidien — définissez qui.",
      adulte: "Duo créatif explosif. Entourez-vous de profils plus structurés pour concrétiser.",
    },
  },

  "7-8": {
    pointsForts: "Énergie, audace et appétit de vivre partagés. Relation intense et stimulante.",
    vigilances: "Deux profils forts qui peuvent entrer en collision. Qui décide ?",
    aApporte: "Joie, créativité, capacité à créer de l'enthousiasme.",
    bApporte: "Force d'exécution, protection, décision.",
    conseil: "Définissez les rôles clairement — sinon vous passerez votre énergie à vous affronter plutôt qu'à avancer.",
    contexte: {
      enfant: "Votre enfant Type 8 a besoin de votre solidité. Soyez fun ET ferme — les deux ensemble.",
      ado: "Votre ado Type 8 teste tout. Votre joie de vivre peut être un pont — mais tenez bon sur les limites.",
      couple: "Relation passionnée et vivante. Deux caractères forts — définissez des espaces de leadership distincts.",
      adulte: "Duo explosif en énergie. Excellents pour lancer, moins pour maintenir — entourez-vous.",
    },
  },

  "7-9": {
    pointsForts: "Le 9 apporte la paix, le 7 apporte l'élan. Relation douce et stimulante.",
    vigilances: "Le 7 peut entraîner le 9 là où il ne veut pas aller. Le 9 peut ralentir le 7 avec sa passivité.",
    aApporte: "Enthousiasme, énergie, nouvelles idées.",
    bApporte: "Paix, acceptation, stabilité.",
    conseil: "Type 7 : demandez au 9 ce qu'il veut vraiment — ne décidez pas pour lui. Type 9 : exprimez vos propres désirs au lieu de suivre.",
    contexte: {
      enfant: "Votre enfant Type 9 s'adapte à vos envies. Assurez-vous qu'il développe aussi les siennes.",
      ado: "Votre ado Type 9 peut sembler sans ambition. Aidez-le à trouver sa passion propre.",
      couple: "Relation douce et joyeuse. Le 7 apporte le mouvement que le 9 ne génère pas seul. Belle dynamique.",
      adulte: "Le 7 génère l'enthousiasme, le 9 crée l'harmonie. Bon duo en animation d'équipe.",
    },
  },

  // ══════════════════════════════════════════
  //  TYPE 8 — Le Chef
  // ══════════════════════════════════════════

  "8-1": {
    pointsForts: "Force et intégrité. Respect mutuel basé sur l'engagement total et la cohérence.",
    vigilances: "Deux profils qui ont raison. Les confrontations peuvent être violentes.",
    aApporte: "Force, protection, action directe.",
    bApporte: "Intégrité, méthode, sens de la justice.",
    conseil: "Apprenez à débattre sans détruire. Vos deux natures vous poussent à ne jamais céder — parfois il faut pourtant.",
    contexte: {
      enfant: "Votre enfant Type 1 porte déjà le monde sur ses épaules. Autorisez-le à faire des erreurs.",
      ado: "Votre ado Type 1 a des principes forts. Débattez avec lui — il a besoin d'un adversaire à sa hauteur.",
      couple: "Relation forte et passionnée. Apprenez à vous disputer sans blesser profondément.",
      adulte: "Duo de leadership puissant. Définissez les territoires de décision de chacun.",
    },
  },

  "8-2": {
    pointsForts: "Le 8 protège, le 2 adoucit. Relation de force et de tendresse complémentaires.",
    vigilances: "Le 8 peut blesser le 2. Le 2 peut manipuler pour obtenir la tendresse du 8.",
    aApporte: "Protection, honnêteté sans filtre, force.",
    bApporte: "Douceur, lien, capacité à désamorcer.",
    conseil: "Type 8 : votre douceur avec le 2 n'est pas de la faiblesse — c'est votre plus grande force ici. Type 2 : dites directement ce dont vous avez besoin.",
    contexte: {
      enfant: "Votre enfant Type 2 cherche votre approbation. Donnez-lui votre amour inconditionnel — pas seulement des encouragements.",
      ado: "Votre ado Type 2 donne trop. Aidez-le à apprendre à recevoir et à poser des limites.",
      couple: "Relation intense. Le 8 apporte la force, le 2 apporte la tendresse. Belle alchimie si la brutalité est régulée.",
      adulte: "Le 8 ouvre les portes, le 2 crée les liens durables. Duo puissant en leadership.",
    },
  },

  "8-3": {
    pointsForts: "Puissance, ambition et efficacité. Deux gagnants ensemble.",
    vigilances: "Compétition de leadership. Qui commande ?",
    aApporte: "Force brute, protection, décision rapide.",
    bApporte: "Stratégie, image, sens du timing.",
    conseil: "Définissez les rôles dès le départ. Un 8 et un 3 sans territoire défini = conflit de leadership destructeur.",
    contexte: {
      enfant: "Votre enfant Type 3 a besoin d'admiration. Mais apprenez-lui que la force vient aussi de l'authenticité.",
      ado: "Votre ado Type 3 cherche le succès. Montrez-lui la différence entre paraître fort et l'être.",
      couple: "Relation puissante. Définissez les domaines de chacun pour éviter la rivalité permanente.",
      adulte: "Duo redoutable en affaires. Définissez clairement qui est CEO — et respectez ça.",
    },
  },

  "8-4": {
    pointsForts: "Intensité et authenticité partagées. Deux profils qui ne font pas semblant.",
    vigilances: "Le 8 peut blesser le 4. Le 4 peut provoquer le 8 avec ses drames.",
    aApporte: "Force, honnêteté directe, protection.",
    bApporte: "Profondeur, sens, intensité créatrice.",
    conseil: "Type 8 : la sensibilité du 4 est sa force — apprenez à la lire. Type 4 : la brutalité du 8 cache une grande loyauté.",
    contexte: {
      enfant: "Votre enfant Type 4 a besoin de votre douceur autant que de votre force. Équilibrez les deux.",
      ado: "Votre ado Type 4 vit des crises d'identité. Votre présence solide est son ancre.",
      couple: "Relation passionnée et intense. Les deux se blessent facilement — apprenez les mots qui soignent.",
      adulte: "Duo engagé et créatif. Les deux apportent leur entièreté.",
    },
  },

  "8-5": {
    pointsForts: "Le 8 agit, le 5 pense. Complémentarité entre force et expertise.",
    vigilances: "Le 8 peut être intrusif pour le 5. Le 5 peut sembler trop lent ou trop prudent.",
    aApporte: "Force d'exécution, protection, décision.",
    bApporte: "Expertise, objectivité, profondeur.",
    conseil: "Type 8 : la réflexion du 5 vous donnera les meilleures décisions — patientez. Type 5 : le 8 a besoin de vos conclusions, pas de tout votre raisonnement.",
    contexte: {
      enfant: "Votre enfant Type 5 a besoin de silence pour penser. Respectez ses espaces de solitude.",
      ado: "Votre ado Type 5 peut sembler distant. Il vous observe et vous respecte — à sa façon.",
      couple: "Relation complémentaire. Le 8 décide, le 5 analyse. Belle alliance si le 8 respecte l'espace du 5.",
      adulte: "Le 8 est le bras, le 5 est le cerveau. Duo puissant si les rôles sont clairs.",
    },
  },

  "8-6": {
    pointsForts: "Le 8 protège le 6. Le 6 apporte la loyauté dont le 8 a besoin.",
    vigilances: "Le 8 peut intimider le 6. Le 6 peut remettre en question l'autorité du 8.",
    aApporte: "Protection, force, clarté des positions.",
    bApporte: "Loyauté, préparation, soutien constant.",
    conseil: "Type 8 : votre douceur avec le 6 est votre plus grande force. Type 6 : le 8 teste votre loyauté — montrez-la.",
    contexte: {
      enfant: "Votre enfant Type 6 a besoin de votre force ET de votre chaleur. Ne soyez pas que le chef.",
      ado: "Votre ado Type 6 a peur. Votre solidité est son remède — mais évitez de l'écraser.",
      couple: "Relation de force et de loyauté. Le 8 protège, le 6 fidélise. Belle dynamique.",
      adulte: "Le 8 avance, le 6 assure les arrières. Duo de leadership efficace.",
    },
  },

  "8-7": {
    pointsForts: "Énergie et appétit de vivre partagés. Relation intense et stimulante.",
    vigilances: "Deux profils forts qui peuvent entrer en collision sur les décisions.",
    aApporte: "Force d'exécution, structure, protection.",
    bApporte: "Créativité, enthousiasme, légèreté.",
    conseil: "Type 8 : le 7 apporte la joie dont vous avez besoin. Type 7 : l'engagement du 8 est précieux — honorez-le.",
    contexte: {
      enfant: "Votre enfant Type 7 a besoin de liberté encadrée. Soyez fun ET ferme — les deux ensemble.",
      ado: "Votre ado Type 7 fuit les contraintes. Négociez sur les formes, jamais sur les valeurs.",
      couple: "Relation passionnée et vivante. Deux caractères forts — des espaces de leadership distincts évitent les conflits.",
      adulte: "Duo d'énergie explosive. Le 8 ancre, le 7 élève. Excellent pour lancer des projets.",
    },
  },

  "8-8": {
    pointsForts: "Respect mutuel, force partagée, honnêteté totale. Quand deux 8 s'allient, ils sont inarrêtables.",
    vigilances: "Compétition de territoire. Deux 8 ensemble sans règles claires = guerre de pouvoir.",
    aApporte: "Force, décision, protection.",
    bApporte: "Le même — et parfois un miroir révélateur de leur propre dureté.",
    conseil: "Définissez des territoires clairs. Deux 8 en harmonie sont une force extraordinaire — deux 8 en conflit sont destructeurs.",
    contexte: {
      enfant: "Parent Type 8 avec enfant Type 8 : votre enfant teste votre autorité pour voir si vous êtes digne de confiance. Tenez bon.",
      ado: "Votre ado Type 8 ne cède qu'aux arguments solides. Soyez cohérent et jamais réactif.",
      couple: "Relation intense. Apprenez à vous battre sans détruire — et à vous réconcilier vraiment.",
      adulte: "Duo redoutable. Définissez absolument qui décide quoi — sinon conflit permanent.",
    },
  },

  "8-9": {
    pointsForts: "Le 9 apporte la paix dont le 8 a besoin. Le 8 donne l'élan qui manque au 9.",
    vigilances: "Le 8 peut écraser le 9. Le 9 peut se soumettre passivement au lieu d'exprimer ses désirs.",
    aApporte: "Force, direction, énergie.",
    bApporte: "Paix, acceptation, désamorçage des tensions.",
    conseil: "Type 8 : le 9 a besoin de votre douceur pour s'ouvrir. Type 9 : exprimez vos désirs clairement — le 8 les respectera si vous les affirmez.",
    contexte: {
      enfant: "Votre enfant Type 9 absorbe les ambiances. Protégez-le de votre intensité — il en a besoin.",
      ado: "Votre ado Type 9 peut sembler sans direction. Guidez-le avec douceur — pas d'ordres.",
      couple: "Relation complémentaire. Le 8 apporte le mouvement, le 9 apporte la paix. Belle dynamique si le 8 apprend la douceur.",
      adulte: "Le 8 avance, le 9 harmonise. Duo de management efficace et apprécié.",
    },
  },

  // ══════════════════════════════════════════
  //  TYPE 9 — Le Médiateur
  // ══════════════════════════════════════════

  "9-1": {
    pointsForts: "Le 9 apporte la paix, le 1 apporte l'ordre. Ensemble : harmonie et efficacité.",
    vigilances: "Le 1 s'impatiente de la passivité du 9. Le 9 se ferme sous les injonctions du 1.",
    aApporte: "Calme, acceptation, capacité à désamorcer.",
    bApporte: "Direction, clarté, efficacité.",
    conseil: "Type 9 : exprimez vos désirs avant que le 1 ne décide pour vous. Type 1 : le consensus que le 9 cherche n'est pas de la lenteur — c'est sa sagesse.",
    contexte: {
      enfant: "Votre enfant Type 1 a besoin de votre validation. Dites-lui souvent qu'il fait bien.",
      ado: "Votre ado Type 1 porte le monde. Votre calme est son refuge — soyez disponible.",
      couple: "Relation stable et harmonieuse. Attention : la passivité du 9 peut masquer des frustrations que le 1 n'entend pas.",
      adulte: "Le 9 harmonise, le 1 structure. Excellent binôme si le 1 n'écrase pas les décisions du 9.",
    },
  },

  "9-2": {
    pointsForts: "Douceur et bienveillance mutuelles. Relation paisible et chaleureuse.",
    vigilances: "Deux profils qui évitent le conflit — les problèmes s'accumulent.",
    aApporte: "Paix, acceptation, harmonie.",
    bApporte: "Chaleur, générosité, soutien actif.",
    conseil: "Créez des rituels de dialogue sur ce qui ne va pas. Vos deux natures évitent la confrontation — mais les non-dits corrodent.",
    contexte: {
      enfant: "Votre enfant Type 2 cherche votre approbation active. Dites-lui que vous l'aimez souvent.",
      ado: "Votre ado Type 2 se perd dans le service des autres. Aidez-le à se mettre en premier.",
      couple: "Relation douce et harmonieuse. Cultivez l'expression des désaccords pour éviter les non-dits.",
      adulte: "Duo bienveillant et apprécié. Attention à ne pas éviter les décisions difficiles ensemble.",
    },
  },

  "9-3": {
    pointsForts: "Le 3 donne l'élan, le 9 apporte la paix. Complémentarité entre mouvement et stabilité.",
    vigilances: "Le 3 peut entraîner le 9 sans lui demander son avis. Le 9 peut freiner le 3 avec sa passivité.",
    aApporte: "Calme, stabilité, vision sans biais.",
    bApporte: "Élan, ambition, capacité à concrétiser.",
    conseil: "Type 9 : le 3 a besoin de votre ancrage. Exprimez clairement vos désirs — il les respectera. Type 3 : le 9 est votre meilleur miroir d'authenticité.",
    contexte: {
      enfant: "Votre enfant Type 3 veut votre admiration. Donnez-lui d'abord votre amour inconditionnel.",
      ado: "Votre ado Type 3 construit son image. Encouragez-le à explorer qui il est au-delà du succès.",
      couple: "Le 3 tire le 9 de sa léthargie. Le 9 apporte la paix dont le 3 a besoin secrètement.",
      adulte: "Le 9 harmonise, le 3 propulse. Bon duo en management d'équipe.",
    },
  },

  "9-4": {
    pointsForts: "Acceptation profonde et authenticité. Le 9 accueille le 4 sans jugement.",
    vigilances: "Le 4 peut trouver le 9 trop neutre. Le 9 peut être écrasé par l'intensité du 4.",
    aApporte: "Acceptation totale, calme, espace pour être.",
    bApporte: "Profondeur, sens, intensité.",
    conseil: "Type 9 : exprimez vos propres émotions — le 4 en a besoin. Type 4 : le 9 vous accepte comme vous êtes — reconnaissez cette rareté.",
    contexte: {
      enfant: "Votre enfant Type 4 a besoin d'être vu dans sa singularité. Votre acceptation est son cadeau.",
      ado: "Votre ado Type 4 vit des tempêtes. Votre calme est son havre.",
      couple: "Relation profonde. Le 9 est l'ancre dont le 4 a besoin. Belle dynamique si le 9 exprime aussi ses désirs.",
      adulte: "Le 9 harmonise, le 4 crée. Bon duo dans les milieux artistiques.",
    },
  },

  "9-5": {
    pointsForts: "Respect mutuel de l'espace. Deux profils qui ne s'envahissent pas.",
    vigilances: "Deux profils qui peuvent coexister en silence sans jamais vraiment se rencontrer.",
    aApporte: "Paix, acceptation, espace pour penser.",
    bApporte: "Profondeur intellectuelle, analyse, clarté.",
    conseil: "Planifiez des moments d'échange actif. Vos deux natures vous portent à coexister — mais la relation demande aussi de la rencontre.",
    contexte: {
      enfant: "Votre enfant Type 5 a besoin de calme et d'espace. Vous êtes naturellement doué pour ça.",
      ado: "Votre ado Type 5 cherche à comprendre. Rejoignez-le dans sa curiosité — c'est votre terrain commun.",
      couple: "Relation très paisible. Risque de vie parallèle — créez des projets communs.",
      adulte: "Duo respectueux et efficace. Attention à ne pas paraître inaccessibles aux autres.",
    },
  },

  "9-6": {
    pointsForts: "Paix et loyauté. Le 9 apporte le calme dont le 6 a besoin.",
    vigilances: "Deux profils qui évitent le conflit — les problèmes ne se règlent jamais.",
    aApporte: "Calme, acceptation, désamorçage des peurs.",
    bApporte: "Loyauté, préparation, soutien constant.",
    conseil: "Créez des espaces pour parler des vrais problèmes. Vos deux natures évitent la confrontation.",
    contexte: {
      enfant: "Votre enfant Type 6 a besoin de sécurité. Votre calme naturel est son ancre.",
      ado: "Votre ado Type 6 hésite beaucoup. Guidez-le avec douceur vers la confiance en lui.",
      couple: "Relation très stable et loyale. Cultivez aussi l'expression des désaccords.",
      adulte: "Duo fiable et apaisant. Excellent dans les contextes qui demandent calme et constance.",
    },
  },

  "9-7": {
    pointsForts: "Le 7 apporte l'élan, le 9 apporte la paix. Relation douce et vivante.",
    vigilances: "Le 7 peut entraîner le 9 sans lui demander son avis. Le 9 peut ralentir le 7.",
    aApporte: "Paix, stabilité, ancrage.",
    bApporte: "Enthousiasme, joie, nouvelles idées.",
    conseil: "Type 9 : exprimez ce que vous voulez — le 7 s'adaptera si vous le dites clairement. Type 7 : demandez au 9 son avis avant de décider pour lui.",
    contexte: {
      enfant: "Votre enfant Type 7 a besoin de liberté encadrée. Votre calme naturel aide à structurer sans rigidité.",
      ado: "Votre ado Type 7 a besoin de sens. Aidez-le à construire une vision.",
      couple: "Relation douce et joyeuse. Le 7 apporte le mouvement, le 9 apporte la paix. Belle dynamique.",
      adulte: "Le 9 harmonise, le 7 enthousiasme. Bon duo en animation.",
    },
  },

  "9-8": {
    pointsForts: "Le 8 donne l'élan, le 9 apporte la paix et l'acceptation.",
    vigilances: "Le 8 peut écraser le 9. Le 9 peut se soumettre passivement.",
    aApporte: "Paix, désamorçage, harmonie.",
    bApporte: "Force, direction, protection.",
    conseil: "Type 9 : affirmez vos désirs clairement — le 8 les respecte si vous les posez. Type 8 : votre douceur avec le 9 l'ouvrira plus que votre force.",
    contexte: {
      enfant: "Votre enfant Type 8 a besoin d'un parent solide. Votre calme naturel est un atout — tenez bon aussi.",
      ado: "Votre ado Type 8 teste les autorités. Soyez calme ET ferme — jamais réactif.",
      couple: "Relation complémentaire. Le 9 apporte la paix, le 8 apporte l'élan. Belle dynamique si le 8 apprend la douceur.",
      adulte: "Le 9 harmonise, le 8 propulse. Excellent duo de management.",
    },
  },

  "9-9": {
    pointsForts: "Harmonie, paix et acceptation mutuelle. Relation d'une douceur rare.",
    vigilances: "Deux profils qui évitent tout conflit — les problèmes s'accumulent jusqu'à l'explosion.",
    aApporte: "Paix, acceptation, absence de jugement.",
    bApporte: "Le même — et parfois un miroir de leur inertie commune.",
    conseil: "Désignez quelqu'un pour prendre les décisions et tenir le cap. Deux 9 ensemble sans structure peuvent vivre dans un confort immobile.",
    contexte: {
      enfant: "Parent Type 9 avec enfant Type 9 : votre enfant a besoin que vous preniez des décisions claires. Quelqu'un doit guider.",
      ado: "Votre ado Type 9 cherche une direction. Soyez ce cap — doucement mais clairement.",
      couple: "Relation très paisible. Risque de vie sans direction commune — fixez des objectifs ensemble.",
      adulte: "Duo harmonieux. Attention à l'évitement systématique des décisions difficiles.",
    },
  },
};

// ═══════════════════════════════════════════════════════════════
//  Contexte PAIRS — Enfant-Enfant ou Ado-Ado (entre pairs)
//  81 paires dirigées, tip dédié aux relations entre peers
// ═══════════════════════════════════════════════════════════════

export const DUO_PAIRS_CONTEXT: Record<string, string> = {
  // ── Type 1 ──
  "1-1": "Deux perfectionnistes : ils se comprennent instinctivement mais risquent de se critiquer mutuellement. Valorisez leur coopération plutôt que la compétition entre eux.",
  "1-2": "Le 1 pose les règles, le 2 veut plaire et appartenir. Belle amitié si le 1 ne critique pas trop et si le 2 ne s'efface pas pour être accepté.",
  "1-3": "Duo ambitieux et efficace. Ils se stimulent mais peuvent vite rivaliser — aidez-les à célébrer la réussite de l'autre.",
  "1-4": "Le 1 trouve le 4 trop émotif, le 4 trouve le 1 trop rigide. Amitié surprenante mais enrichissante si on les aide à voir leurs différences comme une force.",
  "1-5": "Amitié intellectuelle sérieuse. Deux profils qui respectent la compétence — ils peuvent passer des heures à construire ou débattre ensemble.",
  "1-6": "Amitié solide et loyale. Le 6 apporte la fidélité, le 1 apporte la rigueur — ils se font confiance et forment un duo très stable.",
  "1-7": "Le 7 titille le 1 avec son désordre joyeux, le 1 structure le 7. Amitié vivante si on les met ensemble sur un projet créatif avec des règles courtes.",
  "1-8": "Deux personnalités fortes : soit une grande amitié fondée sur le respect mutuel, soit un rapport de force permanent. Aidez-les à trouver un terrain commun.",
  "1-9": "Amitié paisible et fiable. Le 9 accepte les règles du 1, le 1 apprécie la douceur du 9. Duo très stable.",

  // ── Type 2 ──
  "2-1": "Le 2 essaie de prendre soin du 1 qui préfère se débrouiller seul. Belle amitié si le 2 respecte l'autonomie du 1.",
  "2-2": "Amitié très soudée et très chaleureuse. Attention à la dépendance affective — encouragez-les à avoir aussi d'autres amis.",
  "2-3": "Le 2 admire le 3 et l'encourage. Le 3 apprécie ce soutien. Amitié fluide si le 3 ne prend pas le 2 pour acquis.",
  "2-4": "Le 2 veut consoler le 4, le 4 veut être compris en profondeur. Belle amitié émotionnelle si le 2 apprend à écouter sans chercher à résoudre.",
  "2-5": "Le 2 veut rapprocher, le 5 veut de l'espace. Amitié possible si le 2 respecte les zones de solitude du 5.",
  "2-6": "Amitié très loyale et rassurante. Ils se soutiennent dans les moments difficiles avec une confiance profonde.",
  "2-7": "Amitié joyeuse et généreuse. Le 7 entraîne le 2 dans ses aventures, le 2 prend soin du 7. Duo très populaire.",
  "2-8": "Le 2 adoucit le 8, le 8 protège le 2. Amitié intense fondée sur la loyauté.",
  "2-9": "Amitié douce et harmonieuse. Deux profils qui évitent le conflit — veillez à ce qu'ils s'expriment aussi quand quelque chose ne va pas.",

  // ── Type 3 ──
  "3-1": "Le 3 pousse le 1 vers la performance, le 1 rappelle au 3 l'importance de l'intégrité. Amitié stimulante si les deux acceptent de se remettre en question.",
  "3-2": "Le 3 profite du soutien du 2, le 2 brille dans l'ombre du 3. Amitié à surveiller pour que le 2 ne s'oublie pas.",
  "3-3": "Duo d'énergie et de réussite. La rivalité peut vite s'installer — aidez-les à coopérer plutôt qu'à se comparer.",
  "3-4": "Le 3 fonce, le 4 ressent. Amitié surprenante : le 4 aide le 3 à se connecter à lui-même, le 3 aide le 4 à passer à l'action.",
  "3-5": "Le 3 agit, le 5 analyse. Duo complémentaire si le 3 ne court-circuite pas la réflexion du 5 et si le 5 accepte de se lancer.",
  "3-6": "Le 3 donne confiance au 6, le 6 rappelle au 3 qu'il ne faut pas foncer tête baissée. Amitié bien équilibrée.",
  "3-7": "Énergie, enthousiasme, projets ! Deux profils qui évitent la profondeur émotionnelle — aidez-les aussi à parler de ce qu'ils ressentent.",
  "3-8": "Deux leaders naturels. Ils se respectent si aucun n'essaie de dominer l'autre. Amitié puissante et loyale.",
  "3-9": "Le 3 dynamise le 9, le 9 calme le 3. Belle complémentarité si le 3 laisse de l'espace au 9.",

  // ── Type 4 ──
  "4-1": "Le 4 trouve le 1 trop rigide, le 1 trouve le 4 trop dramatique. Leur idéal commun peut les réunir dans des projets créatifs ou engagés.",
  "4-2": "Amitié émotionnellement intense et profonde. Le 2 soutient le 4, le 4 aide le 2 à se connecter à ses propres émotions.",
  "4-3": "Le 4 aspire à l'authenticité, le 3 à la performance. Tension possible, mais chacun peut beaucoup apprendre de l'autre.",
  "4-4": "Amitié très profonde mais potentiellement mélancolique. Encouragez des activités légères — deux 4 ensemble peuvent s'enfermer dans l'intensité.",
  "4-5": "Duo introverti et intellectuellement riche. Ils se comprennent sans s'expliquer et respectent le besoin d'espace de l'autre.",
  "4-6": "Le 4 apporte la profondeur, le 6 apporte la loyauté. Amitié solide si le 6 ne s'épuise pas à rassurer le 4 dans ses doutes.",
  "4-7": "Le 4 plonge, le 7 survole. Contraste fort mais complémentaire : le 7 allège le 4, le 4 donne de la profondeur au 7.",
  "4-8": "Deux personnalités intenses. Le 8 protège le 4, le 4 aide le 8 à accéder à sa vulnérabilité. Amitié rare et précieuse.",
  "4-9": "Amitié douce et créative. Le 9 accepte l'intensité du 4, le 4 apprécie la paix totale que lui offre le 9.",

  // ── Type 5 ──
  "5-1": "Amitié intellectuelle et respectueuse. Ils partagent le goût du travail bien fait et ne se marchent pas dessus.",
  "5-2": "Le 5 a besoin d'espace, le 2 veut se rapprocher. Amitié possible si le 2 respecte le rythme et les silences du 5.",
  "5-3": "Le 5 réfléchit, le 3 agit. Ils se complètent si le 3 ne va pas trop vite et si le 5 accepte de partager ses analyses.",
  "5-4": "Amitié intellectuelle et émotionnellement riche. Ils se respectent et se comprennent à demi-mot.",
  "5-5": "Deux observateurs discrets qui se respectent mutuellement. Amitié rare et précieuse — veillez cependant à ce qu'ils ne s'isolent pas ensemble.",
  "5-6": "Le 5 analyse les risques, le 6 les anticipe. Duo très complémentaire sur les projets qui demandent de la réflexion.",
  "5-7": "Le 5 approfondit, le 7 élargit. Contraste stimulant si le 7 laisse le 5 finir ses pensées.",
  "5-8": "Le 5 pense, le 8 agit. Respect mutuel possible si le 8 ne bouscule pas le 5 et si le 5 sort de son monde intérieur.",
  "5-9": "Amitié tranquille et respectueuse. Deux profils qui apprécient le calme — ils peuvent rester côte à côte sans se déranger.",

  // ── Type 6 ──
  "6-1": "Amitié stable et fiable. Le 6 suit les règles du 1, le 1 rassure le 6. Duo très loyal et prévisible.",
  "6-2": "Amitié chaleureuse et loyale. Ils prennent soin l'un de l'autre avec une générosité sincère.",
  "6-3": "Le 6 ramène le 3 à la réalité, le 3 donne confiance au 6. Amitié dynamique et équilibrée.",
  "6-4": "Le 6 cherche la sécurité, le 4 cherche l'intensité. Amitié possible si le 6 ne trouve pas le 4 trop imprévisible.",
  "6-5": "Amitié tranquille et analytique. Ils se rassurent mutuellement par la logique et l'anticipation.",
  "6-6": "Deux profils anxieux qui se soutiennent — ou qui amplifient leurs peurs mutuelles. Aidez-les à cultiver la confiance plutôt que la vigilance.",
  "6-7": "Le 7 rassure le 6 par sa légèreté, le 6 rappelle au 7 de réfléchir avant de foncer. Belle complémentarité.",
  "6-8": "Le 6 teste la fiabilité du 8, le 8 protège le 6. Amitié forte fondée sur la loyauté une fois la confiance établie.",
  "6-9": "Amitié très douce et très stable. Ils évitent les conflits ensemble — veillez à ce qu'ils s'expriment aussi quand quelque chose ne va pas.",

  // ── Type 7 ──
  "7-1": "Le 7 bouscule les règles du 1, le 1 structure le chaos du 7. Amitié vivante si on les met sur un projet commun avec des règles courtes.",
  "7-2": "Amitié joyeuse et généreuse. Le 7 emmène le 2 dans ses aventures, le 2 prend soin du 7. Duo populaire et chaleureux.",
  "7-3": "Duo d'énergie et d'enthousiasme. Ils adorent les projets communs mais peuvent tous les deux éviter les émotions difficiles.",
  "7-4": "Le 7 allège le 4, le 4 donne de la profondeur au 7. Amitié surprenante et très enrichissante si chacun accepte la différence de l'autre.",
  "7-5": "Le 7 ouvre le monde du 5, le 5 approfondit les idées du 7. Amitié stimulante intellectuellement si le 7 laisse le 5 respirer.",
  "7-6": "Le 7 rassure le 6 avec sa légèreté, le 6 amène le 7 à réfléchir avant d'agir. Complémentarité précieuse.",
  "7-7": "Énergie contagieuse et créativité débordante — mais aussi dispersion ! Aidez-les à finir leurs projets ensemble.",
  "7-8": "Deux profils qui aiment l'action et le défi. Amitié intense et loyale si le 8 ne domine pas le 7.",
  "7-9": "Amitié joyeuse et paisible. Le 7 stimule le 9, le 9 calme le 7. Bon équilibre naturel.",

  // ── Type 8 ──
  "8-1": "Deux personnalités fortes qui se respectent mutuellement. Amitié possible si aucun n'essaie d'imposer ses règles à l'autre.",
  "8-2": "Le 8 protège le 2, le 2 adoucit le 8. Amitié intense et loyale fondée sur la confiance.",
  "8-3": "Deux leaders. Ils s'admirent et se tirent vers le haut — mais aussi vers la compétition. Aidez-les à coopérer plutôt que rivaliser.",
  "8-4": "Le 8 protège le 4, le 4 aide le 8 à accéder à ses émotions. Amitié rare, intense et précieuse.",
  "8-5": "Le 8 agit, le 5 réfléchit. Respect mutuel possible si le 8 laisse le 5 analyser avant de décider.",
  "8-6": "Le 8 protège le 6, le 6 est loyalement dévoué au 8. Amitié forte une fois la confiance établie.",
  "8-7": "Deux aventuriers. Énergie, action, défi — amitié intense et vivante. Veillez à ce qu'ils gèrent aussi leurs émotions.",
  "8-8": "Rivalité de pouvoir ou loyauté absolue : quand c'est une vraie amitié entre deux 8, elle est pour la vie — mais le chemin peut être chaotique.",
  "8-9": "Le 8 donne de l'énergie au 9, le 9 calme le 8. Belle amitié si le 8 ne prend pas toute la place.",

  // ── Type 9 ──
  "9-1": "Amitié tranquille et fiable. Le 9 accepte les règles du 1, le 1 apprécie la douceur du 9. Duo très stable.",
  "9-2": "Amitié douce et bienveillante. Deux profils qui prennent soin des autres — veillez à ce qu'ils prennent aussi soin d'eux-mêmes.",
  "9-3": "Le 9 admire l'énergie du 3, le 3 apprécie la sérénité du 9. Belle complémentarité si le 3 laisse de l'espace au 9.",
  "9-4": "Amitié créative et paisible. Le 9 apprécie la profondeur du 4, le 4 apprécie l'acceptation totale que lui offre le 9.",
  "9-5": "Amitié calme et respectueuse. Deux profils discrets qui apprécient le silence et l'espace partagé.",
  "9-6": "Amitié douce et stable. Ils se soutiennent sans se juger et créent un espace de confiance mutuelle.",
  "9-7": "Le 7 anime le 9, le 9 calme le 7. Amitié joyeuse et équilibrée.",
  "9-8": "Le 9 adoucit le 8, le 8 aide le 9 à s'affirmer. Belle amitié si le 8 ne prend pas toute la place.",
  "9-9": "Amitié très paisible et harmonieuse. Deux 9 ensemble évitent tous les conflits — veillez à ce qu'ils s'affirment aussi quand c'est nécessaire.",
};

// ── Helpers ──────────────────────────────────────────────────

export function getDuoPair(typeA: number, typeB: number): DuoPair | null {
  const key = `${typeA}-${typeB}`;
  return DUO_DATA[key] ?? null;
}

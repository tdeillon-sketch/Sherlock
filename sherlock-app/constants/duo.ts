// ═══════════════════════════════════════════════════════════════
//  Duo — Interactions entre profils Enneagramme
//  81 paires dirigées (A→B) × 5 contextes
// ═══════════════════════════════════════════════════════════════

// Note: the 'ado' context was retired with the 2-role Duo picker (Adulte
// / Enfant only). The 'enfant' bucket now covers the 5-17 range.
export type DuoContext = 'enfant' | 'couple' | 'adulte' | 'pairs';

export const CONTEXT_LABELS: Record<BaseContext, string> = {
  enfant:  '👨 Parent · Enfant (5–17)',
  couple:  '💑 Couple',
  adulte:  '👥 Amis · Collègues',
};

export type BaseContext = Exclude<DuoContext, 'pairs'>; // 'enfant' | 'couple' | 'adulte'

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

// ═══════════════════════════════════════════════════════════════
//  VUE PARENT — Quand A est parent et B est enfant/ado
//  Reformule pointsForts/vigilances/conseil pour le parent.
//  Type A = parent, Type B = enfant.
// ═══════════════════════════════════════════════════════════════

export interface PerspectiveView {
  pointsForts: string;
  vigilances: string;
  conseil: string;
  // parentSoutien / parentChallenge: only populated in DUO_PARENT_VIEW (not
  // DUO_PEERS_VIEW) — these replace the generic "apporte" sections when the
  // Duo context is parent-child, giving the parent a type-specific view of
  //   (a) how to help this particular child, and
  //   (b) how this child stretches them as a parent.
  parentSoutien?: string;
  parentChallenge?: string;
}

export const DUO_PARENT_VIEW: Record<string, PerspectiveView> = {
  // ── Parent Type 1 ──
  "1-1": {
    pointsForts: "Vous comprenez instinctivement son besoin de bien faire. Vous parlez la même langue de la rigueur et du sens du devoir.",
    vigilances: "Votre exigence + la sienne = surenchère. Il se critique déjà — il n'a pas besoin que vous en rajoutiez. Le perfectionnisme à deux peut devenir étouffant.",
    conseil: "Remplacez une critique sur deux par un compliment sincère. Et autorisez l'erreur : la vôtre comme la sienne.",
    parentSoutien: "Votre enfant Type 1 s'autocritique déjà bien assez — il n'a pas besoin que vous en rajoutiez. Donnez-lui la permission explicite de faire des erreurs et montrez-la dans vos propres comportements : riez de vos maladresses devant lui. Préservez des zones sans règle (jeu libre, moments câlins sans objectif) où il peut exister sans « bien faire ».",
    parentChallenge: "Votre enfant est votre miroir exigeant — il voit votre sévérité et la copie avant même d'en souffrir. Le voir se punir vous confronte à votre propre critique intérieure, que vous n'aviez peut-être jamais questionnée. Sa guérison commence par la vôtre : il vous oblige à lâcher ce que vous ne lâchiez pas pour vous-même.",
  },
  "1-2": {
    pointsForts: "Votre cadre rassure votre enfant Type 2 qui aime savoir comment plaire. Il se sent en sécurité avec votre clarté.",
    vigilances: "Votre rigueur peut couper son élan affectif. Il a besoin de votre approbation, pas de votre correction permanente.",
    conseil: "Dites « je suis fier de toi » avant « tu peux faire mieux ». Apprenez-lui à demander pour lui-même, pas seulement à donner.",
    parentSoutien: "Votre enfant Type 2 cherche votre approbation, mais votre cadre peut lui donner l'impression qu'il n'est jamais « assez gentil ». Valorisez ses élans affectifs avant de corriger : « merci de m'avoir aidé » passe avant « mais tu aurais pu ranger aussi ». Apprenez-lui à demander pour lui-même — sinon il se perdra dans les besoins des autres.",
    parentChallenge: "Cet enfant vous renvoie que votre rigueur peut blesser sans que vous le voyiez — il se plie silencieusement pour être aimé. Sa chaleur demande une chose qui vous coûte : moins corriger, plus câliner. Il vous apprend que l'amour inconditionnel n'a rien à voir avec la performance, et ce désapprentissage est le cadeau de votre vie de parent.",
  },
  "1-3": {
    pointsForts: "Vous valorisez tous les deux la performance et l'effort. Belle alliance autour des résultats et du travail bien fait.",
    vigilances: "Vous corrigez le processus, lui veut le résultat. Vos « oui mais tu aurais pu mieux » blessent un enfant qui cherche votre admiration.",
    conseil: "Célébrez ses réussites SANS modération ni « mais ». Aidez-le à trouver sa valeur au-delà des trophées.",
    parentSoutien: "Votre enfant Type 3 vit pour vos « bravo » — dosez-les, sinon il confondra sa valeur et ses résultats. Célébrez-le quand il échoue ou quand il est juste lui-même, pas seulement quand il gagne. Votre « tu aurais pu mieux faire » est particulièrement toxique pour lui : il l'entendra comme « je ne t'aime pas assez ».",
    parentChallenge: "Cet enfant est votre version performance, et c'est vertigineux : vous voyez dans ses yeux la même peur d'être jugé insuffisant que vous aviez. Votre exigence rencontre sa performance et crée une spirale où aucun des deux ne peut s'arrêter. Il vous force à dissocier amour et résultat — une leçon dont vous avez probablement besoin aussi.",
  },
  "1-4": {
    pointsForts: "Vous tenez tous les deux à un idéal élevé — esthétique pour lui, éthique pour vous. Terrain commun fertile pour la création.",
    vigilances: "Sa sensibilité vous semble excessive, votre rigueur lui semble froide. Risque réel de blessure mutuelle profonde.",
    conseil: "Ses émotions ne sont pas un problème à résoudre — c'est sa façon d'être au monde. Écoutez avant de cadrer.",
    parentSoutien: "Votre enfant Type 4 a besoin que ses émotions soient accueillies, pas résolues ni jugées « excessives ». Écoutez-le jusqu'au bout avant de proposer une solution ou un cadre — sinon il se sentira incompris à sa racine. Respectez ses envies esthétiques atypiques même si elles vous paraissent « pas correctes » : c'est par là qu'il s'affirme.",
    parentChallenge: "Cet enfant intense vous perturbe : ses émotions débordantes heurtent votre besoin d'ordre intérieur. Votre réflexe de cadrer fait exactement l'inverse de ce dont il a besoin — il se replie et cultive sa blessure en secret. Il vous oblige à accepter que tout ne se règle pas par la discipline et qu'il existe une intelligence émotionnelle que vous n'avez peut-être pas cultivée.",
  },
  "1-5": {
    pointsForts: "Vous respectez tous les deux la compétence et le travail bien fait. Relation calme et structurée, peu de drama.",
    vigilances: "Deux têtes, peu de câlins. Risque que la relation devienne purement fonctionnelle — il se sent jugé en silence.",
    conseil: "Initiez les moments de tendresse et de jeu — il ne le fera pas. Et respectez ses zones de retrait.",
    parentSoutien: "Votre enfant Type 5 a besoin d'espace mental et de temps seul pour se recharger — ne l'interprétez pas comme de la paresse ou de l'évitement. Annoncez les transitions à l'avance, il déteste être surpris ou bousculé. Respectez son besoin de comprendre avant d'agir : vos « fais-le parce que c'est comme ça » l'éteignent.",
    parentChallenge: "Cet enfant vous résiste sans se rebeller : il observe, note, et se retire. Votre volonté de bien faire et de cadrer se heurte à une autonomie tranquille qui ne plie pas. Il vous apprend que l'amour parental ce n'est pas toujours faire, parfois c'est laisser être — un renoncement difficile pour vous qui aimez agir juste.",
  },
  "1-6": {
    pointsForts: "Votre cohérence est un cadeau pour son anxiété. Il s'appuie sur vous comme sur un roc qui ne bouge pas.",
    vigilances: "S'il sent que rien n'est jamais assez bien, son anxiété explose. Vos critiques le terrifient et bloquent son initiative.",
    conseil: "Rassurez d'abord, corrigez ensuite. Tenez vos promesses : la prévisibilité est sa principale source de sécurité.",
    parentSoutien: "Votre enfant Type 6 a besoin de votre fiabilité, de votre présence, de votre cohérence — il s'en nourrit comme d'une base. Vos règles claires le rassurent, mais vos critiques l'inquiètent durablement : il rejouera une remarque pendant des jours. Rassurez-le explicitement sur son droit à décider, sinon il dépendra toujours de votre validation.",
    parentChallenge: "Cet enfant vous met face à l'effet de votre propre anxiété : il capte vos tensions sous le vernis de la rigueur. Vos exigences nourrissent son doute permanent au lieu de le rassurer. Il vous invite à cultiver la confiance tranquille — celle que vous voudriez transmettre mais que vous ne ressentez peut-être pas toujours vous-même.",
  },
  "1-7": {
    pointsForts: "Son énergie et sa joie peuvent vous sortir de votre sérieux. Il vous rappelle que la vie est aussi pour s'amuser.",
    vigilances: "Vos règles longues et morales le perdent. Il fuit le cadre rigide en se dispersant ou en jouant au clown.",
    conseil: "Règles COURTES et claires, pas de longs sermons. Acceptez qu'il commence beaucoup et finisse peu — c'est sa nature.",
    parentSoutien: "Votre enfant Type 7 a besoin d'air, de mouvement, de possibilités — le confiner tue son moteur. Tenez les règles vitales (sécurité, respect) mais lâchez sur l'accessoire : son désordre joyeux n'est pas un affront à votre cadre. Apprenez-lui à finir ce qu'il commence sans lui enlever l'étincelle initiale.",
    parentChallenge: "Cet enfant est votre opposé polaire : là où vous cadrez, il improvise ; là où vous corrigez, il relance. Son énergie joyeuse peut vous agacer parce qu'elle ne respecte pas les priorités que vous trouvez évidentes. Il vous force à goûter le plaisir, la légèreté, l'imparfait-mais-vivant — et c'est probablement ce qui vous manque le plus.",
  },
  "1-8": {
    pointsForts: "Deux forts caractères qui se respectent quand chacun tient son territoire. Vous êtes son repère solide qui ne plie pas.",
    vigilances: "Il teste vos limites pour voir si vous tenez. Vos sanctions doivent être justes, jamais humiliantes — il s'en souviendra longtemps.",
    conseil: "Soyez ferme et calme, jamais réactif. Reconnaissez sa force au lieu d'essayer de la mater.",
    parentSoutien: "Votre enfant Type 8 respecte la force, pas la justice seule — vos principes doivent s'incarner dans votre voix, pas juste dans vos mots. Tenez vos règles peu nombreuses et essentielles, sans négociation ni explication infinie : il teste pour trouver le mur. Reconnaissez sa protection des plus faibles — c'est son meilleur côté, cultivez-le.",
    parentChallenge: "Cet enfant défie frontalement votre autorité, et votre colère réprimée pourrait exploser contre lui — le pire scénario. Il ne se laissera pas culpabiliser et rejette vos « tu devrais » : vos armes habituelles ne marchent pas. Il vous oblige à incarner votre force au lieu de la rationaliser, à être ferme sans être moral — un exercice de virtuosité parental.",
  },
  "1-9": {
    pointsForts: "Votre cadre l'aide à structurer sa journée. Il accepte vos règles sans heurts ni rébellion ouverte.",
    vigilances: "Sa lenteur vous agace, votre pression le fait disparaître. Il devient fantôme sous votre exigence.",
    conseil: "Donnez-lui du temps pour répondre, pour décider, pour faire. Demandez-lui son avis — il l'a, mais ne le donne pas spontanément.",
    parentSoutien: "Votre enfant Type 9 s'éteint sous la pression et le conflit — adaptez la forme de vos attentes à sa sensibilité. Posez des échéances souples et célébrez les petits pas : il a besoin de se sentir capable, pas de réussir parfaitement. Aidez-le à dire ses préférences : « entre A ou B, tu choisis ? » plutôt que des questions ouvertes.",
    parentChallenge: "Cet enfant vous donne l'illusion que tout va bien parce qu'il ne proteste pas — mais il se fond dans vos attentes et se perd. Votre rigueur peut le faire disparaître sous sa propre vue sans qu'il proteste. Il vous invite à ralentir, à chercher sa vérité sous son consentement, à comprendre que son « oui » n'est pas toujours le sien.",
  },

  // ── Parent Type 2 ──
  "2-1": {
    pointsForts: "Votre chaleur adoucit son sérieux. Vous voyez sa valeur au-delà de ses performances et c'est un cadeau pour lui.",
    vigilances: "Il a besoin d'autonomie, pas d'attention envahissante. Vos câlins permanents peuvent l'étouffer.",
    conseil: "Aimez-le sans le couver. Et apprenez-lui que ses standards élevés sont une force, pas un défaut à consoler.",
    parentSoutien: "Votre enfant Type 1 est son propre critique — ne vous mettez pas en position de le rassurer après chaque erreur, vous finirez par sursolliciter votre affection pour combler son anxiété. Apprenez-lui à différencier « la règle » et « maman/papa fâché » — il confond les deux et se punit pour vous plaire. Créez des moments sans exigences où l'amour est juste là, sans rien à faire pour le mériter.",
    parentChallenge: "Cet enfant refuse votre aide quand elle est offerte sur le mode émotionnel — il veut résoudre lui-même, par principe. Vous prenez son refus comme un rejet alors que c'est sa façon d'être autonome. Il vous oblige à aimer sans sauver, sans adoucir, sans combler — juste être là et laisser son combat lui appartenir.",
  },
  "2-2": {
    pointsForts: "Tendresse mutuelle, complicité affective. Vous vous comprenez sans mots dans le registre du cœur.",
    vigilances: "Vous risquez de l'élever dans l'idée qu'aimer = se sacrifier. Il oubliera ses propres besoins comme vous oubliez les vôtres.",
    conseil: "Apprenez-lui à dire « non » et à recevoir. Modélisez-le en prenant soin de vous-même devant lui.",
    parentSoutien: "Votre enfant Type 2 apprend de vous qui donnez tout le temps — et il va vous copier, s'oublier, plaire. Modélisez le fait de dire non, de prendre du temps pour vous sans culpabilité : c'est le plus grand service. Demandez-lui ses besoins en premier, avant qu'il ne se devine dans les vôtres.",
    parentChallenge: "Cet enfant est votre petit miroir aimant — et cette ressemblance vous touche autant qu'elle vous inquiète quand vous voyez ses sacrifices silencieux. Son besoin de plaire réactive le vôtre, créant une boucle où personne ne peut vraiment dire « j'ai besoin ». Il vous invite à guérir votre propre rapport à vos limites — le cadeau qu'il attend de vous, c'est votre autonomie.",
  },
  "2-3": {
    pointsForts: "Vous adorez son énergie et célébrez ses succès avec un enthousiasme sincère. Il se sent vu et valorisé.",
    vigilances: "S'il sent qu'il doit performer pour mériter votre amour, il devient un « petit adulte » qui s'oublie.",
    conseil: "Aimez-le quand il échoue, pas seulement quand il gagne. Et dites-lui que vous l'aimeriez même s'il ne faisait rien de spécial.",
    parentSoutien: "Votre enfant Type 3 cherche l'admiration plus que l'amour — distinguez les deux pour lui. Aimez-le explicitement pour ce qu'il est (sa présence, son humour, sa façon), pas seulement pour ses résultats. Dites-lui que vous seriez fier de lui s'il ratait — et répétez-le jusqu'à ce qu'il y croie.",
    parentChallenge: "Cet enfant attire facilement votre admiration, et vous alimentez sans le vouloir sa peur d'être « juste lui ». Votre chaleur devient carburant de performance au lieu d'antidote à son anxiété. Il vous invite à aimer au-delà de la mise en valeur — à offrir une tendresse qui ne récompense rien mais accueille l'être entier.",
  },
  "2-4": {
    pointsForts: "Vous accueillez ses émotions intenses sans en avoir peur. Il se sent compris dans sa différence.",
    vigilances: "Vous voulez le consoler, lui veut être entendu dans sa douleur. Vos solutions trop rapides le ferment.",
    conseil: "Tenez l'espace de ses émotions sans chercher à résoudre. Parfois il a juste besoin d'être avec vous, en silence.",
    parentSoutien: "Votre enfant Type 4 ne veut pas être consolé — il veut être rejoint dans son ressenti. Asseyez-vous à côté de lui dans la tristesse plutôt que de chercher à la chasser avec des câlins. Votre sensibilité est un cadeau ici : reconnaissez explicitement son unicité sans la réduire à « tu es sensible comme maman ».",
    parentChallenge: "Cet enfant peut vous aspirer émotionnellement, vous fusionner dans son intensité. Votre tendance à vouloir soulager sa douleur l'empêche de la traverser et renforce son sentiment d'être « trop ». Il vous apprend la différence entre empathie et fusion — et cette distinction peut manquer à votre propre vie.",
  },
  "2-5": {
    pointsForts: "Vous voyez sa profondeur derrière sa réserve. Vous pouvez créer un lien intime sans pression.",
    vigilances: "Il a besoin d'espace pour se ressourcer. Vos élans affectifs trop fréquents l'épuisent et le font fuir.",
    conseil: "Respectez ses zones de solitude — ce n'est pas un rejet. Approchez-vous par les idées, pas seulement par le câlin.",
    parentSoutien: "Votre enfant Type 5 a besoin d'espace — vos câlins spontanés et votre disponibilité constante peuvent l'étouffer. Invitez sans insister, offrez sans exiger de réponse : il viendra à vous quand il sera prêt. Respectez sa porte fermée : elle ne signifie pas qu'il ne vous aime pas, juste qu'il se recharge.",
    parentChallenge: "Cet enfant vous semble froid, distant — et votre réflexe « donner plus d'amour » le fait reculer davantage. Son détachement réveille votre peur centrale : « et si je n'étais pas aimé en retour ? ». Il vous invite à cesser de mesurer votre valeur à l'affection qu'on vous rend — un travail profond que peu de parents 2 entreprennent.",
  },
  "2-6": {
    pointsForts: "Votre chaleur constante apaise son anxiété. Il sait qu'il peut compter sur vous quoi qu'il arrive.",
    vigilances: "Si vous montrez vous-même de l'inquiétude, il l'absorbe et la décuple. Votre calme est son ancre.",
    conseil: "Soyez la « base sûre » qui ne tremble pas. Et encouragez son autonomie progressive — il a besoin d'apprendre qu'il peut s'en sortir seul.",
    parentSoutien: "Votre enfant Type 6 a besoin que vous soyez fiable plus que chaleureuse — il trouve sa sécurité dans la cohérence, pas dans la quantité d'affection. Tenez vos promesses à la lettre ou ne les faites pas : il note tout et son doute se nourrit de vos imprécisions. Rassurez-le, mais surtout apprenez-lui à se faire confiance — sinon il vous consultera toute sa vie.",
    parentChallenge: "Cet enfant demande de la réassurance en permanence et vous aimez ça — mais vous l'enfermez sans le vouloir dans une dépendance affective. Son anxiété active votre besoin d'être indispensable et les deux se verrouillent. Il vous invite à l'autonomiser, ce qui veut dire pour vous : accepter d'être moins nécessaire. C'est contre-intuitif mais c'est le vrai amour.",
  },
  "2-7": {
    pointsForts: "Sa joie de vivre vous remplit. Vous savez participer à ses aventures sans étouffer son enthousiasme.",
    vigilances: "Il fuit les émotions difficiles. Si vous évitez aussi, vous l'aidez à se construire une carapace de gaieté.",
    conseil: "Aidez-le à nommer la tristesse, la peur, la déception. Restez disponible quand la fête est finie.",
    parentSoutien: "Votre enfant Type 7 fuit les émotions lourdes — ne tombez pas dans le piège d'y aller pour lui, « pour l'aider à sentir ». Quand il pleure, restez simplement présent sans paroles : c'est déjà beaucoup. Apprenez-lui la valeur de l'ennui et de la lenteur — vous avez peut-être vous-même un peu peur du vide.",
    parentChallenge: "Cet enfant joyeux et papillon vous séduit mais vous fuit dès que les choses deviennent intimes. Son refus d'accueillir la tristesse vous prive du lien profond que vous cherchez. Il vous apprend à aimer quelqu'un qui ne reste pas collé à vous — à aimer sans occuper, à donner sans tenir.",
  },
  "2-8": {
    pointsForts: "Vous voyez son cœur tendre derrière la carapace. Avec vous, il peut baisser sa garde.",
    vigilances: "Il refuse d'être materné. Vos « mon bébé » et vos câlins envahissants déclenchent sa rébellion.",
    conseil: "Aimez-le avec respect, pas avec mièvrerie. Reconnaissez sa force au lieu de la voir comme un problème à adoucir.",
    parentSoutien: "Votre enfant Type 8 n'a pas besoin de votre tendresse en priorité — il a besoin de sentir que vous êtes solide, que vous ne vous écrasez pas. Ne cédez pas à ses provocations pour préserver la paix : il interprètera votre douceur comme faiblesse et ira plus loin. Montrez-lui votre protection et votre force, pas juste votre amour : il les respectera.",
    parentChallenge: "Cet enfant peut dominer affectivement la famille et vous vous effacez pour éviter le conflit. Votre besoin de plaire vous pousse à céder alors que c'est exactement ce qu'il ne faut pas faire avec un 8. Il vous oblige à vous tenir debout, à dire non, à accepter son mécontentement — toutes choses qui vous terrifient et que vous avez besoin d'apprendre.",
  },
  "2-9": {
    pointsForts: "Tendresse paisible, foyer doux. Vous vous accordez naturellement sur le rythme et l'harmonie.",
    vigilances: "Vous deux évitez le conflit. Mais un enfant a besoin d'apprendre à dire ce qui ne va pas.",
    conseil: "Modélisez le « non » bienveillant. Et provoquez gentiment ses choix — il a tendance à dire « comme tu veux ».",
    parentSoutien: "Votre enfant Type 9 peut se fondre dans vos désirs sans que vous le remarquiez — il veut juste que tout aille bien et devine ce qui vous plaît. Posez-lui des questions très concrètes : « tu préfères A ou B ? » plutôt que « qu'est-ce que tu veux ? ». Ne comblez pas son silence : attendez qu'il trouve ses mots, sinon il apprendra à parler avec les vôtres.",
    parentChallenge: "Cet enfant adapte si bien à vos attentes que vous croyez à tort que vous vous comprenez parfaitement. Il disparaît doucement dans votre chaleur — un abandon de soi que vous pouvez confondre avec de la complicité. Il vous invite à regarder ses « oui » avec suspicion bienveillante : sa paix extérieure peut cacher un renoncement intérieur que vous n'aimeriez pas encourager.",
  },

  // ── Parent Type 3 ──
  "3-1": {
    pointsForts: "Vous reconnaissez son besoin de bien faire et célébrez ses efforts. Belle alliance sur la qualité du travail.",
    vigilances: "Vous voulez de la performance visible, lui veut faire les choses correctement. Tension sur les moyens vs les résultats.",
    conseil: "Valorisez son intégrité même quand elle ralentit le projet. Et apprenez-lui que l'image n'est pas tout dans la vie.",
    parentSoutien: "Votre enfant Type 1 n'a pas besoin de vos trucs pour être efficace — il a besoin de votre permission pour être imparfait. Valorisez son effort, son intention, son souci du détail, pas juste le résultat. Ne lui transmettez pas votre culture de la performance : il la transformera en tyrannie intérieure permanente.",
    parentChallenge: "Cet enfant voit clair dans votre image — il remarque vos incohérences et note vos compromis. Son regard peut vous désarçonner : il ne se laisse pas impressionner par la performance. Il vous invite à la congruence entre ce que vous montrez et ce que vous êtes — un chantier que peu de 3 entreprennent avant la quarantaine.",
  },
  "3-2": {
    pointsForts: "Vous êtes touché par sa générosité naturelle et savez la valoriser. Il s'épanouit dans votre admiration.",
    vigilances: "Vous l'utilisez parfois sans vous en rendre compte. Il donne sans rien demander — vous prenez sans rien rendre.",
    conseil: "Remerciez-le explicitement. Aidez-le à exprimer ses propres besoins, pas seulement à servir les vôtres.",
    parentSoutien: "Votre enfant Type 2 veut que vous le voyiez, pas que vous l'admiriez — deux choses très différentes. Offrez-lui des moments où rien n'est à prouver, où il peut juste exister dans votre présence. Apprenez-lui à recevoir sans se sentir redevable : il n'aura pas appris de vous si vous êtes toujours en mode échange productif.",
    parentChallenge: "Cet enfant vous aime fort, vous admire, et cherche à vous aider — et c'est délicieux pour votre ego, mais dangereux pour lui. Il risque de construire sa valeur sur sa capacité à vous plaire, comme vous l'avez peut-être fait avec vos propres parents. Il vous invite à valoriser l'être, pas le service — y compris chez vous.",
  },
  "3-3": {
    pointsForts: "Vous comprenez sa quête de réussite et savez la canaliser. Vous parlez la même langue du résultat.",
    vigilances: "Risque d'élever un « petit performeur » coupé de lui-même. Il vous imite — y compris dans vos angles morts.",
    conseil: "Montrez-lui que vous l'aimez quand il échoue, pas seulement quand il brille. Modélisez le repos et la vulnérabilité.",
    parentSoutien: "Votre enfant Type 3 va absorber votre culte de la performance comme une évidence — c'est exactement ce qu'il ne faut pas. Créez des espaces radicalement non-performatifs : jeux sans score, moments sans objectif, présence sans projet. Dites-lui explicitement, dix fois par semaine, que vous l'aimez même s'il échoue — il ne le croira pas avant longtemps.",
    parentChallenge: "Cet enfant est votre miroir identique, et ce qui vous a blessé enfant vous blesse à nouveau en le regardant. Sa quête d'admiration est la vôtre, et vous reconnaissez la solitude qui se cache derrière. Il vous force au travail que vous remettez depuis toujours : dissocier amour et résultat, pour lui et pour vous.",
  },
  "3-4": {
    pointsForts: "Sa créativité vous fascine. Vous savez la mettre en valeur sans la dénaturer.",
    vigilances: "Vous voulez du résultat, lui veut de l'authenticité. Vos accélérations brisent son processus créatif.",
    conseil: "Respectez son rythme intérieur. Et n'essayez pas de transformer son originalité en produit vendable.",
    parentSoutien: "Votre enfant Type 4 vit dans une profondeur émotionnelle qui vous semble improductive — résistez à l'envie de le remonter, de l'activer, de le « sortir de là ». Sa sensibilité n'est pas un problème à résoudre : c'est son don, et il a besoin que vous le respectiez. Valorisez sa créativité et sa singularité avant ses productions visibles : elles sont le cœur de qui il est.",
    parentChallenge: "Cet enfant ne joue pas le jeu social que vous connaissez — il ne cherche ni admiration ni succès, il cherche à être vrai. Votre pragmatisme le blesse, vos encouragements à « voir le positif » lui disent qu'il est incompris. Il vous invite à ralentir, à sentir, à accepter ce qui n'est pas optimisable — un territoire que vous fuyez souvent.",
  },
  "3-5": {
    pointsForts: "Vous respectez sa profondeur intellectuelle et savez l'encourager dans ses passions.",
    vigilances: "Vous bougez vite, lui réfléchit lentement. Vos demandes d'action immédiate le bloquent.",
    conseil: "Laissez-lui le temps d'analyser avant d'agir. Et acceptez qu'il ne soit pas démonstratif — son amour passe par l'attention, pas par l'expression.",
    parentSoutien: "Votre enfant Type 5 a besoin de temps pour penser — votre rythme rapide et orienté-résultats le bloque. Demandez-lui son avis et attendez en silence : il réfléchit avant de parler. Valorisez sa profondeur de réflexion, pas sa rapidité d'action : c'est là que son intelligence particulière se révèle.",
    parentChallenge: "Cet enfant méprise discrètement ce que vous valorisez : l'apparence, la performance sociale, l'ambition. Votre énergie et votre chaleur peuvent l'épuiser — il se retire et vous vous sentez rejeté. Il vous apprend qu'il existe une autre forme de réussite que la vôtre : celle de la maîtrise intérieure, sans spectateurs.",
  },
  "3-6": {
    pointsForts: "Votre énergie et votre confiance en l'avenir le rassurent. Vous lui montrez qu'on peut avancer malgré les doutes.",
    vigilances: "Vous foncez, lui anticipe les risques. Si vous écrasez ses craintes, il les enfouit et l'anxiété explose ailleurs.",
    conseil: "Prenez ses inquiétudes au sérieux avant de les dépasser. Sa prudence n'est pas un frein — c'est une intelligence.",
    parentSoutien: "Votre enfant Type 6 doute de tout, y compris de vous — votre assurance peut l'inquiéter plus qu'elle ne le rassure. Écoutez ses « et si » sans les balayer : il a besoin de sentir que ses peurs sont prises au sérieux avant d'être relativisées. Transmettez-lui l'idée que se tromper n'est pas catastrophique : vous êtes le modèle dont il a besoin.",
    parentChallenge: "Cet enfant inquiet freine vos plans et ralentit votre rythme — son anxiété peut vous agacer, vous qui avancez sans vous retourner. Sa question « et si ça ratait ? » vous renvoie à une peur que vous avez apprise à ignorer, pas à résoudre. Il vous invite à reconnecter avec la vulnérabilité sous l'action — un ancrage que beaucoup de 3 évitent toute leur vie.",
  },
  "3-7": {
    pointsForts: "Vous adorez son énergie et savez l'embarquer dans des projets stimulants. Duo dynamique et joyeux.",
    vigilances: "Vous avez tous les deux du mal avec les émotions difficiles. Vous risquez de toujours fuir vers la suite.",
    conseil: "Apprenez-lui à finir ce qu'il commence. Et osez les conversations sérieuses, même quand c'est inconfortable.",
    parentSoutien: "Votre enfant Type 7 adore votre énergie mais a besoin d'apprendre à finir ce qu'il commence — modélisez la persévérance sans en faire une démonstration. Aidez-le à sentir la satisfaction d'aller au bout, même quand c'est ennuyeux. Ne l'encouragez pas à enchaîner les projets brillants sans profondeur : ce serait votre piège commun.",
    parentChallenge: "Cet enfant vous ressemble sur le versant « fonceur » et vous séduit immédiatement — mais sa superficialité vous inquiète secrètement parce que vous la reconnaissez. Votre complicité autour du faire peut masquer l'absence de présence émotionnelle chez les deux. Il vous invite à ralentir ensemble, à construire de l'intime plutôt que de l'expérience.",
  },
  "3-8": {
    pointsForts: "Vous reconnaissez sa puissance et savez la canaliser. Il vous respecte parce que vous ne pliez pas.",
    vigilances: "Deux personnalités fortes peuvent rivaliser. Si vous gagnez toujours, il se braque ; si vous cédez toujours, il vous méprise.",
    conseil: "Soyez ferme sans être autoritaire. Reconnaissez sa force comme un atout, pas comme un problème.",
    parentSoutien: "Votre enfant Type 8 respecte votre efficacité mais teste votre autorité — ne négociez pas sur l'essentiel, il méprise ceux qui plient. Donnez-lui des missions concrètes avec de vraies responsabilités : il a besoin de canaliser sa puissance. Ne le comparez jamais : il humiliera son rival sans remord ou vous rejettera complètement.",
    parentChallenge: "Cet enfant ne joue pas votre jeu social — il dit ce qu'il pense, casse les stratégies, s'en fout de l'image. Sa franchise brutale attaque votre façade soigneusement construite et vous voyez que l'armure vacille. Il vous offre le cadeau le plus difficile : un enfant qui ne vous flattera jamais, et qui vous aime pour votre substance, pas votre apparence.",
  },
  "3-9": {
    pointsForts: "Votre dynamisme le sort doucement de sa torpeur. Sa sérénité vous rappelle de ralentir.",
    vigilances: "Votre rythme rapide le fait disparaître. Il dit « oui » mais s'absente intérieurement pour se protéger de votre énergie.",
    conseil: "Ralentissez quand vous lui parlez. Demandez-lui son avis et attendez vraiment la réponse — elle vient lentement.",
    parentSoutien: "Votre enfant Type 9 ne répond pas à votre dynamisme — votre énergie le fatigue et l'endort au lieu de le stimuler. Abaissez le rythme quand vous êtes avec lui, synchronisez-vous sur son tempo. Aidez-le à identifier ses vrais désirs : il se fondra dans les vôtres si vous ne cherchez pas activement sous son « ça me va ».",
    parentChallenge: "Cet enfant calme vous agace sans que vous le disiez — son rythme vous paraît une résistance passive à l'élan vital. Vos questions « qu'est-ce que tu veux faire ? » tombent dans le vide et vous n'avez pas la patience pour chercher plus loin. Il vous invite à ralentir radicalement, à écouter ce qui ne s'impose pas, à valoriser une présence tranquille — c'est une ascèse pour vous.",
  },

  // ── Parent Type 4 ──
  "4-1": {
    pointsForts: "Vous reconnaissez la beauté de sa rigueur et la valorisez. Il se sent vu dans sa singularité.",
    vigilances: "Votre intensité émotionnelle peut le déstabiliser. Il a besoin de constance, pas de vagues.",
    conseil: "Stabilisez votre humeur autour de lui. Et célébrez sa différence à votre manière — il est unique, mais à sa façon, pas à la vôtre.",
    parentSoutien: "Votre enfant Type 1 cherche des règles claires, pas des nuances émotionnelles — offrez-lui la structure qu'il réclame même si elle vous ennuie. Votre sensibilité peut le rassurer uniquement si elle s'appuie sur une fiabilité quotidienne simple (heures de coucher, rituels, engagements tenus). Soulignez son effort moral autant que sa créativité : c'est sa zone de valeur.",
    parentChallenge: "Cet enfant rigide vous agace par son besoin de perfection extérieure — vous qui cherchez l'intérieur, l'authentique, le non-convenu. Son jugement silencieux sur vos humeurs peut vous blesser et vous le vivez comme un rejet. Il vous apprend que la stabilité n'est pas la mort de la beauté — qu'on peut être profond ET fiable, un couple que vous n'avez pas toujours vu s'accorder.",
  },
  "4-2": {
    pointsForts: "Vous accueillez sa générosité avec une vraie reconnaissance. Il sent que vous voyez son cœur.",
    vigilances: "Votre intensité peut l'écraser. Il met ses propres émotions de côté pour gérer les vôtres.",
    conseil: "Veillez à ne pas inverser les rôles. C'est à vous de tenir l'espace émotionnel, pas à lui.",
    parentSoutien: "Votre enfant Type 2 cherche à vous plaire — ne lui demandez pas d'absorber vos humeurs ni de vous consoler. Soyez vigilant à ne pas inverser les rôles : c'est lui l'enfant, pas votre témoin affectif. Apprenez-lui à dire « non » en le disant vous-même explicitement : il a besoin du modèle.",
    parentChallenge: "Cet enfant sensible capte vos oscillations émotionnelles et s'ajuste avant que vous ne vous en aperceviez. Votre intensité peut devenir son fardeau — il vous aime et vous protège à son insu. Il vous invite à la régulation émotionnelle, non pour vous renier, mais pour offrir une maison stable à quelqu'un qui se ferait terrain de votre météo.",
  },
  "4-3": {
    pointsForts: "Vous voyez sa profondeur derrière son besoin de réussir. Vous savez l'aider à se connecter à lui-même.",
    vigilances: "Vos « tu vaux mieux que la course aux résultats » peuvent être perçus comme un rejet de ce qu'il aime.",
    conseil: "Honorez son besoin de briller — ce n'est pas un défaut. Aidez-le à trouver l'authenticité DANS la performance, pas contre elle.",
    parentSoutien: "Votre enfant Type 3 est orienté résultats et image — il va chercher la validation extérieure que vous méprisez. Ne décrédibilisez pas ses ambitions mondaines : il a besoin de les traverser pour découvrir autre chose plus tard. Reconnaissez explicitement ses réussites sans ironie : votre scepticisme lui dira qu'il ne peut pas gagner votre approbation.",
    parentChallenge: "Cet enfant performatif vous semble superficiel, et votre regard discret le blesse sans que vous le sachiez. Son monde d'efficacité est exactement ce que vous avez rejeté et vous avez du mal à le lui offrir pleinement. Il vous invite à respecter un mode de valeur qui n'est pas le vôtre — et peut-être à revisiter votre propre rapport à la reconnaissance extérieure.",
  },
  "4-4": {
    pointsForts: "Vous vous comprenez en profondeur, sans mots. Complicité émotionnelle rare et précieuse.",
    vigilances: "Risque de cocon mélancolique. Deux 4 ensemble peuvent s'enfermer dans l'intensité et perdre le contact avec le réel.",
    conseil: "Cultivez la légèreté, le rire, le quotidien banal. Il a besoin de stabilité émotionnelle, pas d'un miroir d'intensité.",
    parentSoutien: "Votre enfant Type 4 est votre jumeau intensifié — et vous risquez de vous noyer ensemble dans le même tourbillon. Offrez-lui une stabilité que vous n'avez pas eue : horaires prévisibles, humeur reconstruite chaque jour, fiabilité des petits engagements. Modélisez l'équilibre entre profondeur et vie ordinaire — il a besoin de voir que la beauté n'exige pas le drame.",
    parentChallenge: "Cet enfant vous renvoie votre propre intensité, et cela vous émeut aux larmes autant que cela vous effraie. Ses humeurs alimentent les vôtres, vos humeurs alimentent les siennes — une spirale à deux qui peut isoler le reste de la famille. Il vous invite à votre propre guérison : un enfant 4 a besoin d'un parent 4 qui a fait le travail.",
  },
  "4-5": {
    pointsForts: "Vous respectez son besoin d'espace et de profondeur. Relation riche, faite de moments choisis.",
    vigilances: "Vous deux pouvez vous isoler et créer une bulle où le monde extérieur n'existe plus.",
    conseil: "Forcez-vous à sortir, à inviter, à montrer le monde large. Il a besoin de stimulation extérieure pour ne pas se renfermer.",
    parentSoutien: "Votre enfant Type 5 préfère le silence à l'émotion partagée — ne le forcez pas à « ressentir avec vous ». Respectez son espace physique et mental : ne l'envahissez pas de votre intensité ou de vos questions intimes. Créez un lien par l'intellectuel et l'esthétique plutôt que l'émotionnel : il vous suivra là volontiers.",
    parentChallenge: "Cet enfant distant active votre peur fondamentale de ne pas être vu, de ne pas être aimé, de ne pas compter. Sa retenue émotionnelle heurte votre besoin d'être senti et reconnu à un niveau profond. Il vous invite à aimer sans être payé en retour de la façon dont vous aimeriez — un travail profond sur le besoin de résonance qui gouverne votre vie.",
  },
  "4-6": {
    pointsForts: "Vous accueillez ses peurs avec empathie. Il se sent vraiment compris dans ses inquiétudes.",
    vigilances: "Votre intensité émotionnelle nourrit son anxiété. S'il sent que rien n'est stable, il panique.",
    conseil: "Stabilisez vos humeurs et tenez vos engagements. La prévisibilité est plus précieuse que la profondeur pour cet enfant.",
    parentSoutien: "Votre enfant Type 6 a besoin de fiabilité bien plus que de profondeur — ne l'alarmez pas avec vos doutes existentiels ou vos nuances complexes. Tenez vos engagements avec précision : il vérifie tout et note tout. Transmettez-lui une foi simple en la vie : il regarde comment vous faites face aux difficultés bien plus que ce que vous lui dites.",
    parentChallenge: "Cet enfant angoissé a besoin de la stabilité que vous avez le plus de mal à offrir. Ses « et si ça rate ? » rejouent vos propres abandons imaginaires et vous ne lui donnez pas d'ancrage. Il vous invite à devenir le parent que vous auriez aimé avoir — quelqu'un qui ne s'effondre pas, qui tient, qui rassure par sa présence et pas par ses mots.",
  },
  "4-7": {
    pointsForts: "Sa joie vous éclaire. Vous savez aussi reconnaître sa profondeur cachée derrière l'enthousiasme.",
    vigilances: "Vos états d'âme intenses le poussent à fuir vers le divertissement. Il se construit une carapace joyeuse.",
    conseil: "Allégez votre intensité quand vous êtes avec lui. Et apprenez-lui à toucher ses émotions difficiles sans les fuir.",
    parentSoutien: "Votre enfant Type 7 fuit ce que vous cultivez : la tristesse, la profondeur, la mélancolie. Respectez sa façon d'être au monde sans la juger superficielle — c'est sa survie émotionnelle. Apprenez-lui à sentir la tristesse sans la dramatiser : par l'exemple, pas par l'exhortation.",
    parentChallenge: "Cet enfant joyeux vous aime sans chercher à comprendre votre profondeur — il zappe quand ça devient intense. Son optimisme peut vous sembler une façon de ne pas vous rejoindre, et ça vous blesse en silence. Il vous apprend la légèreté, le droit au plaisir simple, la joie non-méritée — des territoires qui vous intimident.",
  },
  "4-8": {
    pointsForts: "Vous voyez sa vulnérabilité derrière la force. Avec vous, il peut être tendre sans avoir honte.",
    vigilances: "Vos vagues émotionnelles le poussent à se durcir pour se protéger. Il devient son propre rempart.",
    conseil: "Soyez stable et fiable. Sa force ne demande qu'à devenir tendresse — mais seulement dans un cadre sûr.",
    parentSoutien: "Votre enfant Type 8 refuse la nuance émotionnelle — il veut du solide, du concret, du clair. Posez des règles fermes et tenez-les sans débordements : il ne peut pas composer avec la variabilité. Reconnaissez sa force sans la romancer : il ne veut pas être « sensible », il veut être respecté dans sa puissance.",
    parentChallenge: "Cet enfant direct et puissant vous déstabilise — il n'a pas les codes de l'intensité émotionnelle que vous maîtrisez. Votre mélancolie l'agace : il voit ça comme une faiblesse ou un abandon. Il vous force à la clarté, à l'action, à l'ancrage — des énergies qui sont votre convalescence.",
  },
  "4-9": {
    pointsForts: "Sa douceur vous apaise. Vous savez ressentir avec lui sans le forcer à parler.",
    vigilances: "Votre intensité l'efface. Il s'absente pour ne pas porter vos émotions, et vous perdez le contact avec lui.",
    conseil: "Régulez votre intensité, posez des questions ouvertes, écoutez les silences. Sa parole vient lentement.",
    parentSoutien: "Votre enfant Type 9 absorbe vos humeurs sans se défendre — vos états émotionnels l'envahissent même quand vous essayez de les cacher. Offrez-lui un climat émotionnel stable : c'est le cadeau le plus rare et le plus précieux pour un 9. Provoquez-le doucement à se positionner : « entre ça ou ça, tu préfères quoi ? » — sinon il se fondra dans vos préférences.",
    parentChallenge: "Cet enfant apaisant vous pacifie, mais son calme peut masquer une disparition sous le poids de votre intensité. Son « tout va bien » peut devenir son habitat quand votre météo émotionnelle est trop lourde à porter. Il vous invite à la retenue bienveillante : protéger son espace intérieur même quand vous vous sentez débordé.",
  },

  // ── Parent Type 5 ──
  "5-1": {
    pointsForts: "Vous respectez son sens du devoir et l'accompagnez avec calme. Vous lui apportez la profondeur derrière la rigueur.",
    vigilances: "Vous êtes peu démonstratif, lui cherche votre approbation. Votre silence est interprété comme une critique.",
    conseil: "Verbalisez votre fierté — il ne la devine pas. Et offrez-lui des explications de fond, pas juste des évaluations.",
    parentSoutien: "Votre enfant Type 1 cherche des règles — vous les posez souvent mais les expliquez à l'excès. Soyez clair et bref : « voici la règle, pas d'analyse ». Apprenez-lui que votre silence n'est pas un jugement : il interprète vos non-dits comme des critiques.",
    parentChallenge: "Cet enfant exigeant et insistant sollicite votre engagement verbal permanent — il réclame vos positions sur tout. Votre retrait est interprété comme une fuite de vos responsabilités parentales. Il vous oblige à sortir de votre tour d'observation et à prendre position concrètement — une intrusion contre laquelle vous résistez.",
  },
  "5-2": {
    pointsForts: "Vous lui offrez l'espace de penser et d'être seul, ce qu'il sait apprécier mais peu d'enfants reçoivent.",
    vigilances: "Il a besoin de chaleur affective explicite. Votre retenue émotionnelle peut être vécue comme un rejet.",
    conseil: "Faites des câlins, dites « je t'aime » à voix haute. La distance n'est pas une option pour cet enfant.",
    parentSoutien: "Votre enfant Type 2 a faim d'affection et de contact — votre retrait est vécu comme un abandon répété. Offrez-lui des petits gestes physiques sans parole (main sur l'épaule, câlin rapide) : c'est une langue que vous parlez peu et dont il a besoin. Apprenez-lui que votre besoin d'espace n'est pas un rejet — il faut le nommer explicitement, sinon il conclut « je suis trop ».",
    parentChallenge: "Cet enfant réclame plus d'affection que vous n'en avez à donner — et votre rationnement émotionnel le blesse. Votre économie d'énergie se heurte à son besoin de connexion constant. Il vous force à sortir de votre bulle pour le rencontrer — un déplacement coûteux qui est pourtant la vraie leçon de parentalité pour vous.",
  },
  "5-3": {
    pointsForts: "Vous tempérez son agitation par votre calme. Il apprend à réfléchir avant d'agir grâce à vous.",
    vigilances: "Il a besoin de votre admiration enthousiaste. Vos analyses froides de ses succès l'éteignent.",
    conseil: "Manifestez votre fierté avec des mots et de l'énergie. Et participez à ses victoires au lieu de les commenter.",
    parentSoutien: "Votre enfant Type 3 a besoin d'applaudissements explicites — votre sobriété émotionnelle le fait douter de votre amour. Exprimez votre fierté verbalement, par des phrases entières, pas juste par un hochement de tête. Équilibrez la valorisation de la performance par la valorisation de son être — il risque sinon de se construire uniquement sur ses résultats.",
    parentChallenge: "Cet enfant énergique et social vous épuise — sa demande de reconnaissance vous semble excessive, presque gênante. Son rythme d'action contredit votre besoin d'observation tranquille. Il vous invite à sortir du mode « observateur » pour devenir acteur de sa construction — il ne peut pas construire son identité seul avec votre présence silencieuse.",
  },
  "5-4": {
    pointsForts: "Vous respectez son monde intérieur et sa créativité. Vous savez communiquer en profondeur sans surcharge.",
    vigilances: "Il a besoin de connexion émotionnelle, pas seulement intellectuelle. Votre froideur apparente le blesse.",
    conseil: "Asseyez-vous près de lui. Touchez-le, regardez ses créations longuement. La présence physique compte autant que les idées.",
    parentSoutien: "Votre enfant Type 4 a besoin que ses émotions soient reçues — pas analysées ni classées. Asseyez-vous avec lui dans son chagrin sans chercher à le comprendre intellectuellement : juste être là. Reconnaissez son unicité sans essayer de la disséquer : il se sentira regardé à sa vraie valeur.",
    parentChallenge: "Cet enfant émotionnel vous submerge — ses vagues heurtent votre besoin de contrôle intérieur. Vous tentez de rationaliser ses sentiments pour les apprivoiser, ce qui lui donne le sentiment d'être incompris. Il vous oblige à habiter votre corps et votre cœur, pas juste votre tête — un territoire inconnu que seul un enfant 4 peut vous faire explorer.",
  },
  "5-5": {
    pointsForts: "Vous vous comprenez sans mots. Respect mutuel des silences et de l'espace personnel.",
    vigilances: "Risque de relation parallèle où chacun vit dans son monde. Il a besoin de plus que vous.",
    conseil: "Initiez le contact malgré votre nature réservée. Asseyez-vous dans sa chambre, partagez une activité — la présence suffit.",
    parentSoutien: "Votre enfant Type 5 est votre double — vous le comprenez sans vous expliquer, mais cette complicité tranquille peut le priver d'initiative parentale. Sortez de votre silence mutuel : proposez, invitez, faites des choses ensemble même quand il ne demande rien. Apprenez-lui à sortir de sa tête pour habiter son corps : jeu physique, sport, contact — votre zone commune d'inconfort.",
    parentChallenge: "Cet enfant vous ressemble tant que vous risquez de vous retirer tous les deux dans vos mondes parallèles, satisfaits et seuls. Son respect de votre espace conforte votre évitement — personne ne vient chercher l'autre. Il vous invite à l'effort inverse : sortir de vous-même pour le rejoindre, même quand il ne le demande pas.",
  },
  "5-6": {
    pointsForts: "Votre calme analytique apaise son anxiété. Vous lui apprenez à comprendre ses peurs au lieu d'y céder.",
    vigilances: "Il a besoin de chaleur explicite et constante. Votre distance émotionnelle peut alimenter son insécurité.",
    conseil: "Rassurez avec des mots ET des gestes. Et tenez vos rituels — pour lui, la prévisibilité est sécurisante.",
    parentSoutien: "Votre enfant Type 6 a besoin d'interactions fréquentes pour se sentir en sécurité — pas nécessairement longues, juste régulières. Vos silences sont interprétés comme des retraits : nommez-les pour lui (« je réfléchis, ça n'a rien à voir avec toi »). Rassurez-le explicitement, souvent : il ne déduit pas votre amour, il a besoin de l'entendre.",
    parentChallenge: "Cet enfant questionne, doute, demande confirmation en permanence — sollicitations qui épuisent votre capital d'énergie sociale. Son besoin d'être rassuré heurte votre besoin de solitude. Il vous invite à une présence disponible que vous aviez protégée — apprenez le « petit oui tranquille », il suffit pour l'ancrer sans vous consumer.",
  },
  "5-7": {
    pointsForts: "Vous savez canaliser son énergie débordante en l'orientant vers la profondeur. Vous lui ouvrez de nouveaux mondes.",
    vigilances: "Son besoin de stimulation et de jeu peut vous épuiser. Vous risquez de vous retirer dans votre bulle.",
    conseil: "Acceptez de jouer même quand vous préféreriez lire. Et donnez-lui des règles — son énergie a besoin d'un cadre.",
    parentSoutien: "Votre enfant Type 7 a besoin de mouvement et de stimulation — votre calme contemplatif le rend nerveux. Acceptez de sortir, de bouger, même quand vous préféreriez un livre : c'est votre engagement corporel qui le nourrit. Apprenez-lui à rester avec l'ennui : c'est une leçon que vous pouvez lui offrir, vous qui savez habiter le temps long.",
    parentChallenge: "Cet enfant bruyant et exubérant draine vos réserves en une heure et vous avez le réflexe de vous retirer. Son besoin d'expérience partagée contredit votre besoin de retraite solitaire. Il vous force à un engagement physique et énergétique que vous fuyez habituellement — et c'est justement là qu'il vous fera grandir.",
  },
  "5-8": {
    pointsForts: "Votre calme apaise sa puissance. Vous ne vous laissez pas impressionner par sa force.",
    vigilances: "Il teste vos limites avec vigueur. Si vous vous retirez face à lui, il prend tout l'espace et perd ses repères.",
    conseil: "Tenez vos positions calmement. Et engagez-vous corporellement avec lui — bagarres pour rire, sport, action concrète.",
    parentSoutien: "Votre enfant Type 8 a besoin de sentir une autorité solide, pas seulement de l'espace. Posez peu de règles mais tenez-les sans céder, et engagez-vous corporellement avec lui (sport, bagarre pour rire, défis) — c'est sa langue. Sous sa colère, il y a presque toujours une vulnérabilité qu'il ne sait pas dire : nommez-la pour lui.",
    parentChallenge: "Cet enfant active ce que vous évitez le plus : l'engagement frontal, l'instant, le corps. Il videra vos réserves d'énergie en quelques heures et ne respectera pas votre retrait — il y verra une fuite, et c'est ce qu'il méprise le plus. Mais c'est précisément ce qui vous fera grandir : il ne vous laissera pas être à moitié là.",
  },
  "5-9": {
    pointsForts: "Deux profils paisibles qui apprécient le calme. Vous ne vous bousculez pas mutuellement.",
    vigilances: "Risque de vie parallèle dans le silence. Personne n'initie, personne ne demande, personne ne se rencontre vraiment.",
    conseil: "Forcez le contact régulier — un dîner, une promenade, une activité commune. Sans cela, vous vous éloignez doucement.",
    parentSoutien: "Votre enfant Type 9 est paisible comme vous — mais cette harmonie peut devenir un silence où personne ne se rencontre. Initiez régulièrement le contact : une promenade, un jeu, une conversation proposée par vous. Aidez-le à s'exprimer : sans sollicitation, il restera dans l'implicite toute sa vie.",
    parentChallenge: "Cet enfant conforte votre mode par défaut : se retirer, ne rien demander, laisser faire. Sa présence silencieuse ne vous force à rien, et vous n'apprenez rien. Il vous invite à cultiver une initiative parentale consciente — c'est l'intention qui vous sauve, car la pente naturelle vous éloigne l'un de l'autre sans qu'aucun ne proteste.",
  },

  // ── Parent Type 6 ──
  "6-1": {
    pointsForts: "Vous lui apportez de la sécurité par votre fiabilité. Il s'épanouit dans votre cadre clair et constant.",
    vigilances: "Votre anxiété alimente son perfectionnisme. Il s'épuise à essayer d'éviter les catastrophes que vous redoutez.",
    conseil: "Travaillez VOTRE anxiété pour ne pas la lui transmettre. Et faites-lui confiance pour décider seul, à sa mesure.",
    parentSoutien: "Votre enfant Type 1 cherche la certitude morale — ne le chargez pas de vos doutes anxieux en permanence. Valorisez son souci du bien, modérez son autocritique : il porte déjà sa propre charge. Apprenez-lui que l'erreur n'est pas catastrophique : vous êtes le modèle dont il a besoin pour lâcher.",
    parentChallenge: "Cet enfant rigoureux se comporte souvent comme un adulte miniature et vous sollicite pour des validations que vous n'avez pas toujours. Son besoin de certitude heurte votre propre incertitude intérieure. Il vous oblige à incarner une sécurité que vous cherchez vous-même — un exercice que la maturité vous offre enfin.",
  },
  "6-2": {
    pointsForts: "Vous lui offrez chaleur et sécurité. Foyer affectueux et prévisible — il s'y sent profondément aimé.",
    vigilances: "Votre besoin de protection peut l'étouffer. Il apprend à se sacrifier pour ne pas vous inquiéter.",
    conseil: "Faites confiance à sa capacité à gérer le monde. Et apprenez-lui à dire « non » — y compris à vos demandes.",
    parentSoutien: "Votre enfant Type 2 cherche à vous rassurer et à prendre soin de vous — protégez-le de ce rôle inversé. Évitez de lui confier vos angoisses : il portera le poids en silence. Encouragez-le à recevoir sans rendre : lui apprendre que l'amour ne se mérite pas par le service est votre cadeau le plus précieux.",
    parentChallenge: "Cet enfant vous console, vous prend dans ses bras, anticipe vos besoins — et c'est tendre, mais pas son rôle. Son dévouement vous attendrit mais l'empêche de se consacrer à lui-même. Il vous invite à sortir de votre demande implicite de protection — pour qu'il puisse être enfant, pas votre allié émotionnel.",
  },
  "6-3": {
    pointsForts: "Vous voyez sa fragilité derrière son énergie. Vous savez l'ancrer quand il s'épuise dans la performance.",
    vigilances: "Il fuit votre anxiété en surinvestissant la réussite. Plus vous vous inquiétez, plus il performe pour vous rassurer.",
    conseil: "Détendez-vous visiblement quand il est avec vous. Aimez-le sans condition de réussite, c'est ce qui le libère.",
    parentSoutien: "Votre enfant Type 3 affiche une assurance qui masque une peur d'échouer plus grande que la vôtre — ne soyez pas dupe de sa façade. Rassurez-le sur ce qui compte au-delà des résultats : sa présence, son existence, ses élans. Modérez vos propres « attention, et si… » : il interprète votre anxiété comme un doute sur lui.",
    parentChallenge: "Cet enfant optimiste et orienté-action vous bouscule — il ne voit pas les dangers que vous voyez. Son énergie fonceuse vous inquiète et vous ralentissez son élan. Il vous apprend que la confiance vient de l'action, pas de l'anticipation — votre chemin pour gagner votre propre solidité.",
  },
  "6-4": {
    pointsForts: "Vous accueillez ses émotions intenses avec sérieux. Vous ne les minimisez pas et il vous en est reconnaissant.",
    vigilances: "Vos angoisses + son intensité = spirale émotionnelle. Vous pouvez vous nourrir mutuellement dans le drame.",
    conseil: "Restez ancré quand il vacille. Et n'ajoutez pas vos peurs à ses tempêtes — il en a déjà beaucoup à gérer.",
    parentSoutien: "Votre enfant Type 4 a besoin de sentir que ses émotions sont accueillies sans que vous vous effondriez avec lui. Votre stabilité est son cadeau : ne vous laissez pas envahir par son intensité, sinon il perd son ancrage. Reconnaissez sa singularité explicitement : « tu vois le monde différemment, et c'est précieux ».",
    parentChallenge: "Cet enfant intense active votre anxiété : vous craignez sa tristesse, sa colère, sa différence. Vos tentatives de le rassurer le font se sentir incompris. Il vous invite à tolérer l'inconfort émotionnel sans le fuir par des conseils pratiques — une présence silencieuse qui vous coûte beaucoup plus que vos mots rassurants.",
  },
  "6-5": {
    pointsForts: "Vous respectez son besoin d'analyse et de calme. Vous lui apportez la chaleur, il vous apporte la pensée.",
    vigilances: "Il a besoin d'un parent rassurant, pas inquiet. Vos doutes constants le poussent à se réfugier dans la tête.",
    conseil: "Affichez votre confiance même quand vous doutez intérieurement. Et autorisez-le à se retirer pour penser — c'est sa façon de gérer.",
    parentSoutien: "Votre enfant Type 5 a besoin de silence et d'espace — ne vous inquiétez pas de son retrait, ce n'est pas un signe de mal-être. Respectez sa porte fermée sans y voir un rejet : il se recharge. Demandez-lui son avis sur des sujets précis : il répond volontiers au concret, pas au flou « comment tu vas ? ».",
    parentChallenge: "Cet enfant distant inquiète votre besoin de vérifier le lien — et vos sollicitations répétées l'éloignent davantage. Son détachement réveille votre peur d'être abandonné, de ne pas compter. Il vous apprend que l'amour n'a pas besoin de vérification permanente — une sécurité intérieure que vous cherchez dans les liens extérieurs toute votre vie.",
  },
  "6-6": {
    pointsForts: "Vous vous comprenez sur le terrain de la vigilance. Loyauté et fiabilité réciproques.",
    vigilances: "Vos inquiétudes s'amplifient mutuellement. Vous pouvez créer une bulle de peur où le monde extérieur paraît dangereux.",
    conseil: "Cultivez la confiance en l'avenir. Modélisez le courage face à l'incertitude — il l'apprend en vous regardant.",
    parentSoutien: "Votre enfant Type 6 est anxieux comme vous — et votre commune inquiétude peut se renforcer mutuellement, jusqu'à construire un monde effrayant à deux. Modérez vos « attention », « et si », « tu as pensé à… » : ce sont des graines de doute. Montrez-lui comment affronter vos peurs au lieu de les partager — c'est ce qu'il a besoin d'apprendre de vous.",
    parentChallenge: "Cet enfant vous renvoie votre propre anxiété en miroir — ses doutes alimentent les vôtres, vos doutes alimentent les siens. Votre complicité anxieuse est votre piège. Il vous invite à faire votre propre travail de sécurité intérieure, sinon vous transmettrez un héritage de peur que vous n'avez peut-être pas guéri.",
  },
  "6-7": {
    pointsForts: "Sa joie de vivre vous rassure : la vie n'est pas que dangers. Vous lui offrez la solidité, il vous offre la légèreté.",
    vigilances: "Vous voulez le protéger, lui veut explorer. Vos « attention » répétés peuvent éteindre son enthousiasme naturel.",
    conseil: "Laissez-le prendre des risques mesurés. Sa confiance dans la vie est un cadeau — ne la lui volez pas par excès de protection.",
    parentSoutien: "Votre enfant Type 7 voit le verre plein alors que vous voyez les risques — résistez au réflexe d'éteindre son élan par prudence. Encadrez sans décourager : « oui, tu peux, voici les deux limites » plutôt que « attention, tu pourrais… ». Apprenez-lui à sentir ses émotions difficiles sans panique : il a besoin de votre exemple pour traverser, pas pour fuir.",
    parentChallenge: "Cet enfant heureux et fonceur vous confronte à votre anxiété — il ne l'a pas, il ne la comprend pas, et cela vous déstabilise. Sa fuite en avant vous inquiète mais c'est parfois un bien plus grand risque que vos retenues. Il vous invite à la confiance — un terrain que vous n'avez jamais vraiment habité, et dont il peut être un guide.",
  },
  "6-8": {
    pointsForts: "Sa force vous rassure : il sait se défendre. Vous savez aussi voir sa vulnérabilité derrière la carapace.",
    vigilances: "Il teste vos limites avec puissance. Si vous reculez par peur du conflit, il perd ses repères et s'agite davantage.",
    conseil: "Soyez ferme et calme face à ses débordements. Votre solidité (pas votre dureté) le sécurise.",
    parentSoutien: "Votre enfant Type 8 a besoin de sentir que vous êtes solide, même quand vous tremblez à l'intérieur. Posez un cadre clair et maintenez-le malgré le doute — vos angoisses doivent rester pour vous, sinon il se sentira responsable de votre sécurité, et c'est un poids trop lourd pour son âge. Reconnaissez aussi son instinct protecteur : confiez-lui des petites responsabilités à sa mesure, il s'y épanouira.",
    parentChallenge: "Cet enfant active vos peurs comme aucun autre : sa fougue, son refus de précaution, ses défis frontaux. Vos « attention » ne marchent pas — il les vit comme une faiblesse. Il vous oblige à puiser une autorité dans votre propre force, pas dans les règles ou les conseils extérieurs : devenir l'adulte solide que vous avez parfois cherché vous-même.",
  },
  "6-9": {
    pointsForts: "Sa sérénité vous apaise. Foyer doux où chacun trouve sa place sans heurts.",
    vigilances: "Vous vous évitez mutuellement les conflits, mais ils s'accumulent en silence. Et vos angoisses peuvent perturber son calme.",
    conseil: "Initiez les conversations difficiles avec douceur. Et rassurez-vous : il va bien — son calme n'est pas un signe d'inquiétude.",
    parentSoutien: "Votre enfant Type 9 est paisible et peu demandeur — ne confondez pas son calme avec de l'aisance, il évite peut-être simplement votre anxiété. Posez-lui des questions concrètes pour chercher sa vraie voix sous le « ça me va ». Rassurez-le que ses besoins comptent et que dire « non » à votre proposition n'abîme pas le lien.",
    parentChallenge: "Cet enfant peut absorber vos angoisses sans en parler — il devient votre régulateur émotionnel silencieux. Sa paix apparente peut vous rassurer à tort : il évite peut-être juste votre inconfort. Il vous invite à la vigilance bienveillante — détecter ce qu'il ne dit pas, sans l'envahir de vos propres peurs projetées.",
  },

  // ── Parent Type 7 ──
  "7-1": {
    pointsForts: "Votre énergie l'allège. Vous lui montrez qu'on peut vivre sans être parfait à chaque instant.",
    vigilances: "Votre dispersion peut frustrer son besoin de stabilité. Il a besoin de routine et de tenue des promesses.",
    conseil: "Tenez vos engagements et vos rituels. Sa rigueur est une force — ne la confondez pas avec de la rigidité.",
    parentSoutien: "Votre enfant Type 1 a besoin de règles claires et de sérieux — votre spontanéité le déstabilise plus qu'elle ne le libère. Tenez vos engagements : votre souplesse sur « on fera ça un autre jour » le ronge intérieurement. Valorisez son effort moral, pas sa performance enjouée : c'est là qu'il se construit.",
    parentChallenge: "Cet enfant rigide vous agace par son besoin de contrôle et son sérieux — vous qui cherchez la joie et l'élan. Ses « mais tu avais dit » vous coincent dans des engagements que vous aviez lancés légèrement. Il vous apprend la fiabilité simple, tenue jour après jour — un cadeau coûteux mais salvateur pour votre propre vie.",
  },
  "7-2": {
    pointsForts: "Joie et chaleur réciproques. Foyer pétillant où l'on rit et où l'on aime fort.",
    vigilances: "Il prend soin de votre humeur. Si vous fuyez les moments difficiles, il apprend à porter seul ses propres tristesses.",
    conseil: "Restez disponible quand la fête est finie. Et autorisez-vous à montrer la tristesse — il a besoin de voir que c'est OK.",
    parentSoutien: "Votre enfant Type 2 veut être vu dans son aide — ne minimisez pas ses gestes par légèreté (« oh t'es mignon »). Exprimez votre gratitude de façon spécifique : il a besoin de sentir que ses attentions sont reçues dans leur poids. Apprenez-lui à se tourner vers lui-même — vous qui savez poursuivre vos désirs, montrez-le-lui.",
    parentChallenge: "Cet enfant affectif sollicite une attention plus profonde que vous ne donnez habituellement — vous papillonnez, il reste. Sa tendresse continue vous touche mais vous fuyez quand ça devient intime. Il vous apprend la présence stable à un lien unique — un engagement que vous avez toujours évité en multipliant les amitiés.",
  },
  "7-3": {
    pointsForts: "Duo dynamique, projets sans fin, énergie contagieuse. Votre admiration mutuelle vous porte.",
    vigilances: "Vous fuyez tous les deux les émotions difficiles. La famille devient une succession d'activités sans profondeur.",
    conseil: "Imposez-vous des moments calmes et profonds. Posez la question « comment tu te sens VRAIMENT ? » et écoutez.",
    parentSoutien: "Votre enfant Type 3 aime votre énergie mais a besoin de profondeur pour ne pas se construire uniquement sur l'image. Ralentissez avec lui sur les essentiels : qui il est, pas ce qu'il a accompli. Votre capacité à célébrer lui convient bien — mais équilibrez avec une présence sans projet, juste être là.",
    parentChallenge: "Cet enfant vous ressemble sur le versant « fonceur » et vous séduit — votre complicité peut toutefois masquer l'absence d'intimité émotionnelle. Son besoin de réussir résonne avec votre évitement de la douleur : ni l'un ni l'autre ne ralentit. Il vous invite à la présence quand ça pique, pas juste quand ça brille.",
  },
  "7-4": {
    pointsForts: "Sa profondeur vous touche. Il vous apprend à ralentir et à ressentir — c'est précieux pour vous deux.",
    vigilances: "Vous fuyez vers le positif quand il a besoin de plonger. Votre « allez, ça va passer » le coupe de lui-même.",
    conseil: "Tenez l'espace de ses émotions sans chercher à les transformer. La présence vaut plus que les solutions.",
    parentSoutien: "Votre enfant Type 4 habite la tristesse comme un territoire — n'essayez pas de l'en sortir avec votre optimisme, c'est son chemin. Accompagnez-le sans fuir : asseyez-vous dans le silence quand il est bas. Valorisez sa sensibilité sans la minimiser : c'est son cœur, pas un problème à résoudre.",
    parentChallenge: "Cet enfant lourd émotionnellement vous effraie — son besoin de profondeur vous confronte à ce que vous fuyez toute votre vie. Votre réflexe « regarde le positif » le blesse profondément et il se referme. Il vous offre le cadeau le plus exigeant : rester avec la tristesse, sentir sans fuir, habiter ce que vous avez évité depuis l'enfance.",
  },
  "7-5": {
    pointsForts: "Vous lui ouvrez le monde large par votre énergie. Il vous apprend la profondeur et la concentration.",
    vigilances: "Votre rythme rapide et vos changements de plan le déstabilisent. Il a besoin d'espace mental pour digérer.",
    conseil: "Annoncez les changements à l'avance. Et acceptez ses temps de retrait — ce n'est pas de l'antisocial, c'est de la recharge.",
    parentSoutien: "Votre enfant Type 5 préfère la compagnie tranquille à l'animation — votre rythme rapide et bruyant l'épuise. Calez-vous sur son tempo : lectures côte à côte, jeux silencieux, promenades contemplatives. Respectez ses temps seul sans chercher à les remplir : il a besoin de son univers intérieur pour exister.",
    parentChallenge: "Cet enfant silencieux vous semble ennuyeux parfois — ou pire, rejetant votre enthousiasme. Son retrait face à votre énergie vous blesse en silence. Il vous apprend à aimer le calme, la lenteur, l'intime non-spectaculaire — toutes choses que vous considériez comme des menaces au plaisir.",
  },
  "7-6": {
    pointsForts: "Votre optimisme rassure ses peurs. Vous lui montrez qu'il y a toujours une porte de sortie.",
    vigilances: "Vos « ne t'inquiète pas » sans écoute le laissent seul avec ses angoisses. Il n'ose plus en parler.",
    conseil: "Validez ses peurs avant de les dépasser. « C'est normal d'avoir peur de ça, voilà ce qu'on peut faire ensemble. »",
    parentSoutien: "Votre enfant Type 6 a besoin de stabilité et de prévisibilité — vos changements de plan le stressent profondément. Annoncez les choses à l'avance et tenez-les : votre spontanéité est un luxe qu'il ne peut pas supporter. Rassurez-le sur vos retours et vos présences : il note chaque absence comme un abandon possible.",
    parentChallenge: "Cet enfant anxieux ralentit votre élan et vous donne envie de fuir — vos « mais non, ça ira » ne le rassurent pas, ils l'isolent. Son doute vous met face à votre évitement de l'inconfort. Il vous invite à la présence dans ses peurs, pas au déni : être là dans la zone où vous êtes le moins à l'aise.",
  },
  "7-7": {
    pointsForts: "Famille pétillante, créative, jamais ennuyeuse. Vous l'aidez à embrasser la vie pleinement.",
    vigilances: "Vous fuyez ensemble les moments difficiles. Personne ne pose les conversations sérieuses ni ne finit les projets.",
    conseil: "Forcez-vous à rester quand c'est inconfortable. Et apprenez-lui à finir avant de commencer autre chose.",
    parentSoutien: "Votre enfant Type 7 vous ressemble et vous enchante — mais vous allez tous les deux fuir ensemble quand ça pique. Apprenez-lui à rester dans l'inconfort en le vivant vous-même devant lui. Offrez-lui de finir ce qu'il commence : c'est la leçon la plus difficile pour vous, et donc la plus nécessaire pour lui.",
    parentChallenge: "Cet enfant est votre jumeau énergétique — votre complicité est délicieuse mais peut devenir un pacte de fuite à deux. Votre joie de vivre commune peut masquer un évitement partagé des émotions difficiles. Il vous invite à grandir pour lui : sinon vous lui transmettrez la même incapacité à habiter le dur que celle qui vous a construit.",
  },
  "7-8": {
    pointsForts: "Sa puissance vous stimule. Vous savez transformer son énergie brute en jeu et en aventure.",
    vigilances: "Il a besoin de cadres clairs. Votre flexibilité naturelle peut être perçue comme un manque de tenue.",
    conseil: "Tenez les règles essentielles fermement. Soyez flexible sur les détails, ferme sur les principes.",
    parentSoutien: "Votre enfant Type 8 a besoin de structure et de limites fermes — votre tendance à « arranger les choses » le dérègle. Ne cédez pas sur l'essentiel pour éviter le conflit : vos compromis faciles nourrissent sa confusion. Engagez-vous corporellement avec lui — bagarres, sport, défis : c'est votre zone de rencontre la plus naturelle.",
    parentChallenge: "Cet enfant puissant ne tolère pas vos esquives et vos promesses non-tenues — il note et juge. Votre aversion pour le conflit rencontre son appétit de confrontation : vous perdez du terrain sans le voir. Il vous force à tenir, à dire non, à ne pas bouger quand ça se tend — une musculation parentale que vous évitiez confortablement.",
  },
  "7-9": {
    pointsForts: "Votre énergie le sort doucement de sa torpeur. Sa sérénité vous repose de votre agitation.",
    vigilances: "Votre vitesse l'efface. Il dit « oui à tout » pour suivre votre rythme, et perd contact avec ses propres envies.",
    conseil: "Ralentissez régulièrement. Demandez-lui ce qu'IL veut, pas ce qu'il pense que vous voulez qu'il veuille.",
    parentSoutien: "Votre enfant Type 9 a besoin de calme et de non-sollicitation — votre effervescence l'endort ou le noie. Respectez son rythme lent : laissez-le finir ses phrases, ses pensées, ses activités à son tempo. Aidez-le à se positionner : « parmi ces trois choix, lequel ? » sinon il se fond dans vos préférences pétillantes.",
    parentChallenge: "Cet enfant calme se fond silencieusement dans votre énergie et vous ne voyez pas qu'il disparaît. Son « ça me va » vous arrange — vous continuez votre élan sans vérifier s'il vous suit vraiment. Il vous invite à la pause, à l'écoute sans agitation, à créer un espace où il peut exister sans votre présence-spectacle.",
  },

  // ── Parent Type 8 ──
  "8-1": {
    pointsForts: "Vous reconnaissez sa rigueur et la respectez. Vous lui apportez la force quand sa rigidité le bloque.",
    vigilances: "Vous frontal, lui méthodique : conflit possible. Vos décisions rapides court-circuitent son besoin de bien faire.",
    conseil: "Laissez-lui le temps de finir avant de bouger. Et reconnaissez son sens du devoir — c'est son moteur, pas une lenteur.",
    parentSoutien: "Votre enfant Type 1 s'autocritique déjà beaucoup — votre force peut lui sembler écrasante s'il ne sent pas votre tendresse sous l'armure. Montrez-lui votre fierté explicitement, pas seulement par vos attentes élevées. Canalisez sa rigidité par l'humour : vous pouvez l'aider à rire de lui-même comme personne d'autre.",
    parentChallenge: "Cet enfant vous juge silencieusement sur vos incohérences morales — il voit quand vous dites une chose et faites une autre. Son regard exigeant teste votre autorité sur un autre terrain que la force : la justesse. Il vous invite à une intégrité que vous aviez peut-être négligée — aligner vos actes et vos principes, même quand personne ne regarde.",
  },
  "8-2": {
    pointsForts: "Votre force et sa douceur se complètent magnifiquement. Vous le protégez, il vous adoucit.",
    vigilances: "Votre intensité peut écraser sa sensibilité. Il s'efface pour ne pas vous heurter.",
    conseil: "Modérez votre énergie face à lui. Et invitez-le à exprimer ses désaccords — il en a, mais les tait.",
    parentSoutien: "Votre enfant Type 2 est très sensible à votre ton — votre voix forte, même sans colère, le blesse et le fait se replier. Montrez-lui explicitement votre tendresse : ne supposez pas qu'il la devine derrière votre protection. Apprenez-lui à dire « non » en le valorisant quand il le fait avec vous — sinon il s'efface toute sa vie.",
    parentChallenge: "Cet enfant tendre et anticipatif réveille une douceur que vous enfouissez habituellement — et c'est à la fois émouvant et inconfortable. Sa façon d'apaiser quand vous montez en intensité peut vous agacer ou vous adoucir, selon le jour. Il vous invite à la vulnérabilité, à la gratitude exprimée, à une forme d'amour qui ne protège pas mais qui reçoit.",
  },
  "8-3": {
    pointsForts: "Énergie partagée, ambitions élevées. Vous le poussez à se dépasser, il vous donne du grain à moudre.",
    vigilances: "Compétition possible. Vos comparaisons (« quand j'avais ton âge... ») le blessent même si vous croyez l'encourager.",
    conseil: "Célébrez SES réussites sans les comparer aux vôtres. Il a besoin d'être vu pour lui-même.",
    parentSoutien: "Votre enfant Type 3 performe pour gagner votre admiration — dosez vos critiques sur l'effort insuffisant, elles le marquent durablement. Valorisez-le quand il échoue sans y être contraint : c'est là qu'il apprend la vraie confiance. Apprenez-lui que sa valeur ne dépend pas de sa performance — vous êtes en position d'offrir cette vérité.",
    parentChallenge: "Cet enfant fonceur et compétitif vous ressemble — et cette complicité peut masquer une pression partagée pour toujours être au top. Votre approbation est si puissante qu'elle peut devenir une tyrannie implicite. Il vous invite à offrir un amour inconditionnel explicite — dit, répété, tenu dans l'échec aussi — un déplacement qui vous demande du travail.",
  },
  "8-4": {
    pointsForts: "Vous le protégez dans ses tempêtes émotionnelles. Il sait qu'avec vous, il peut tout ressentir sans danger.",
    vigilances: "Votre force peut sembler insensible à sa fragilité. Vos « arrête de pleurer » écrasent ce qu'il vit.",
    conseil: "Soyez présent en silence pendant ses émotions. La force ne s'oppose pas à la tendresse — elle peut la contenir.",
    parentSoutien: "Votre enfant Type 4 vit des émotions intenses qu'il ne peut pas « tenir » comme vous — respectez son temps de traversée. Ne cherchez pas à le secouer pour qu'il « avance » : asseyez-vous avec lui dans son chagrin. Protégez sa sensibilité de l'extérieur : votre force peut être sa carapace pendant qu'il apprend la sienne.",
    parentChallenge: "Cet enfant fragile vous confronte à une vulnérabilité que vous avez apprise à mépriser en vous-même. Ses larmes faciles et ses émotions débordantes peuvent vous agacer profondément. Il vous invite à accueillir la douceur comme une force — un renversement complet de votre logique habituelle, mais c'est là qu'il vous fait grandir.",
  },
  "8-5": {
    pointsForts: "Vous respectez son intelligence et savez le défendre quand il s'isole. Il vous fait confiance pour le protéger.",
    vigilances: "Votre énergie l'épuise. Il a besoin de calme et de retrait — vous risquez de l'envahir par votre intensité.",
    conseil: "Modérez votre présence quand il est dans sa bulle. Et engagez-vous corporellement avec lui — sport, jeux d'action.",
    parentSoutien: "Votre enfant Type 5 a besoin de silence et d'espace — votre présence corporelle forte peut l'envahir et le faire se retirer. Demandez avant d'entrer dans sa chambre ou son monde : il a besoin de contrôler son intimité. Parlez-lui par ses centres d'intérêt et par l'intellect : il s'ouvre par la pensée, pas par l'énergie.",
    parentChallenge: "Cet enfant distant et silencieux vous déstabilise — votre force ne sert à rien face à son retrait, il ne se laisse pas impressionner. Son refus d'engagement corporel vous prive de votre canal de lien le plus naturel. Il vous force à développer une présence douce et patiente — une musculation inverse de celle que vous avez habituellement.",
  },
  "8-6": {
    pointsForts: "Vous incarnez la solidité dont il a besoin. Sa loyauté envers vous est totale dès qu'il vous fait confiance.",
    vigilances: "Vos accès de force peuvent terroriser son anxiété. Il se construit sur la peur si vous tonnez trop.",
    conseil: "Soyez fort SANS être effrayant. Calme + ferme, jamais explosif. Votre voix forte le tétanise plus qu'elle ne l'éduque.",
    parentSoutien: "Votre enfant Type 6 est très sensible à votre fiabilité : tenez vos promesses au mot près, sinon sa confiance s'érode. Évitez les menaces même pour rire : il les prend au sérieux et note tout. Montrez-lui explicitement que vous êtes calme sous votre force : c'est ce qu'il cherche à savoir, pas votre puissance.",
    parentChallenge: "Cet enfant anxieux et questionnant vous agace — ses « et si » heurtent votre appétit d'action directe. Votre force peut devenir intimidante au lieu de rassurante. Il vous oblige à ralentir, à expliquer, à apaiser avec des mots et non avec votre présence seule — un travail de précision émotionnelle que vous n'aviez pas forcément cultivé.",
  },
  "8-7": {
    pointsForts: "Énergie débordante des deux côtés. Aventures, sport, action — vous vous comprenez dans le mouvement.",
    vigilances: "Vous évitez tous les deux les émotions difficiles via l'action. Personne ne s'arrête pour ressentir.",
    conseil: "Imposez-vous des moments calmes en duo. Et apprenez-lui à finir ce qu'il commence — votre exemple compte.",
    parentSoutien: "Votre enfant Type 7 aime votre énergie et votre présence corporelle — profitez-en pour créer du lien physique (sport, aventures, jeux intenses). Ne lui laissez pas tout — il a besoin de sentir vos limites pour grandir. Apprenez-lui à finir ce qu'il commence : votre fermeté peut l'aider là où votre amour seul ne suffit pas.",
    parentChallenge: "Cet enfant joyeux esquive quand ça se tend — votre intensité peut lui sembler un mur à contourner plus qu'un parent à rencontrer. Sa fuite en avant heurte votre besoin de confrontation directe. Il vous apprend à ne pas prendre sa légèreté comme un manque de respect — et peut-être à retrouver une joie que vous avez rangée sous votre armure.",
  },
  "8-8": {
    pointsForts: "Respect mutuel des forts caractères. Quand vous êtes alliés, rien ne vous arrête.",
    vigilances: "Rivalité de pouvoir possible. Si vous êtes toujours le plus fort, il se braque ; si vous cédez, il vous méprise.",
    conseil: "Choisissez vos batailles. Reconnaissez sa force comme égale à la vôtre — il a besoin que vous la voyiez.",
    parentSoutien: "Votre enfant Type 8 est votre miroir de puissance — mais il est aussi plus fragile qu'il ne le montre. Ne rivalisez pas avec lui : reconnaissez sa force, pas son impertinence. Nommez sa tendresse cachée explicitement : c'est peut-être vous qui pouvez la faire exister dans la famille.",
    parentChallenge: "Cet enfant teste votre autorité avec une force identique à la vôtre — le rapport peut devenir un bras de fer permanent si aucun des deux ne plie. Votre réflexe d'imposer rencontre son refus de se soumettre, et la tension peut endommager le lien. Il vous invite à une tendresse que vous n'offrez pas facilement — et qui est la seule issue à ce duel potentiel.",
  },
  "8-9": {
    pointsForts: "Sa douceur vous apaise. Vous incarnez la force qu'il n'ose pas mobiliser.",
    vigilances: "Votre intensité l'efface. Il dit « comme tu veux » pour éviter le choc avec votre énergie.",
    conseil: "Demandez-lui son avis et attendez vraiment la réponse. Modérez votre voix, votre rythme, votre intensité.",
    parentSoutien: "Votre enfant Type 9 se referme sous la pression — votre voix forte et vos exigences directes peuvent l'éteindre, même sans colère. Modérez votre énergie dans ses moments de retrait : il a besoin de douceur pour s'engager. Aidez-le à se positionner en lui offrant des choix binaires : « A ou B ? » plutôt que « qu'est-ce que tu veux ? ».",
    parentChallenge: "Cet enfant pacifique disparaît sous votre intensité — il évite et s'adapte, vous croyez à tort que ça passe. Votre force envahit son espace intérieur et il se fond pour survivre. Il vous invite à la retenue — un art que vous méprisiez peut-être mais qui est la condition pour qu'il puisse exister vraiment à vos côtés.",
  },

  // ── Parent Type 9 ──
  "9-1": {
    pointsForts: "Votre calme l'apaise. Vous l'aidez à relâcher son perfectionnisme et à profiter du moment.",
    vigilances: "Il a besoin d'un cadre clair. Votre tendance à tout accepter peut le déstabiliser — il cherche des limites.",
    conseil: "Posez des règles fermes même si ça vous coûte. Sa structure intérieure se construit sur les vôtres.",
    parentSoutien: "Votre enfant Type 1 a besoin de règles claires et d'autorité assumée — votre tendance à éviter le conflit le laisse sans cadre. Prenez position explicitement : « c'est non » sans justification infinie. Valorisez son souci du bien sans devenir son exécutant moral : il a besoin que vous teniez votre place d'adulte.",
    parentChallenge: "Cet enfant rigoureux attend de vous une clarté morale que vous évitez naturellement — votre « oui, c'est comme tu veux » le désoriente. Son exigence silencieuse vous juge et vous vous sentez incompris ou coupable. Il vous force à prendre des positions claires, à incarner un cadre — une musculation que votre tempérament évite.",
  },
  "9-2": {
    pointsForts: "Foyer doux et harmonieux. Vous accueillez sa générosité avec gratitude et calme.",
    vigilances: "Vous évitez tous les deux les conflits. Il apprend à étouffer ses besoins pour préserver l'harmonie.",
    conseil: "Modélisez le « non » bienveillant. Et invitez-le à exprimer ses désaccords sans peur de vous décevoir.",
    parentSoutien: "Votre enfant Type 2 a besoin de sentir que vous le voyez activement — votre présence douce peut être vécue comme un retrait poli. Exprimez votre affection explicitement, régulièrement : il ne devine pas aussi bien qu'il le pense. Apprenez-lui à demander pour lui-même en modélisant vos propres besoins : sinon il s'efface toute sa vie comme vous.",
    parentChallenge: "Cet enfant affectif sollicite votre attention plus que votre nature ne le permet facilement — votre tendance à vous laisser porter le prive d'initiative affective claire. Son besoin de reconnaissance explicite heurte votre confort dans l'implicite. Il vous invite à sortir de votre zone de non-intervention — pour manifester votre amour activement, pas juste le laisser exister.",
  },
  "9-3": {
    pointsForts: "Vous tempérez son agitation par votre sérénité. Il vous apporte de l'énergie et du mouvement.",
    vigilances: "Vous risquez de freiner ses élans par votre passivité. Sa quête de réussite se heurte à votre absence d'enthousiasme.",
    conseil: "Investissez visiblement dans ses projets. Votre soutien actif compte autant que votre acceptation calme.",
    parentSoutien: "Votre enfant Type 3 a besoin d'un parent qui le voit performer et valorise ses efforts — votre sérénité peut être interprétée comme du désintérêt. Célébrez explicitement ses réussites : votre « bravo » plat ne suffit pas, il lui faut un enthousiasme visible. Apprenez-lui que vous l'aimez quand il rate — dites-le, répétez-le, montrez-le par vos gestes.",
    parentChallenge: "Cet enfant performant vous inquiète par son rythme et vous en éloigne sans que vous le voyiez — vous suivez de loin, il interprète comme un abandon. Son ambition vous dépasse et vous ne lui offrez pas la stimulation dont il a besoin. Il vous force à l'engagement actif — prendre position sur sa trajectoire, le soutenir concrètement, pas juste « être là ».",
  },
  "9-4": {
    pointsForts: "Vous accueillez ses émotions sans les juger ni les surcharger. Il se sent profondément accepté.",
    vigilances: "Votre passivité peut le laisser seul dans ses tempêtes. Il a besoin que vous engagiez le contact.",
    conseil: "Allez vers lui activement quand il se renferme. Posez des questions, restez présent — votre silence l'isole.",
    parentSoutien: "Votre enfant Type 4 a besoin d'être vu dans son intensité — votre neutralité douce peut lui donner l'impression que son monde intérieur n'intéresse personne. Reconnaissez ses émotions avec des mots précis : nommer ce qu'il vit le calme plus que votre présence silencieuse. Ne minimisez jamais ses drames : pour lui ce sont des territoires réels.",
    parentChallenge: "Cet enfant émotionnel vous sollicite à un niveau que vous habitez peu — vos zones intérieures restent à distance, par habitude protective. Son intensité peut vous sembler fatigante et vous vous endormez sur place. Il vous invite à habiter votre propre vie émotionnelle — pour pouvoir accueillir la sienne sans vous détacher.",
  },
  "9-5": {
    pointsForts: "Vous respectez son besoin d'espace et de silence. Coexistence paisible et respectueuse.",
    vigilances: "Risque de vie parallèle où personne n'initie le contact. Il se replie, vous le laissez se replier.",
    conseil: "Forcez les moments partagés — repas, sortie, jeu. Sans rituels imposés, vous vous éloignez insensiblement.",
    parentSoutien: "Votre enfant Type 5 se fond facilement dans votre silence — votre calme ne le stimule pas à sortir. Initiez les échanges activement : proposez des discussions, posez des questions précises sur ses centres d'intérêt. Respectez son besoin d'espace mais ne confondez pas respect et absence : offrez-lui un lien volontaire.",
    parentChallenge: "Cet enfant autonome vous arrange — il ne demande rien, vous ne donnez rien de particulier, et vous n'apprenez rien l'un de l'autre. Votre pente vers le moindre effort conforte son retrait naturel. Il vous invite à l'initiative consciente — c'est vous qui devez bouger vers lui, sinon chacun reste dans son monde toute votre vie.",
  },
  "9-6": {
    pointsForts: "Votre sérénité apaise son anxiété. Foyer stable où il sait qu'il peut compter sur la constance.",
    vigilances: "Il a besoin de réponses claires à ses inquiétudes. Vos « ça va aller » sans engagement le laissent seul.",
    conseil: "Engagez-vous concrètement face à ses peurs : « voilà ce qu'on va faire ensemble ». La présence active rassure.",
    parentSoutien: "Votre enfant Type 6 a besoin de sentir votre fiabilité active — votre calme rassure à moitié, il cherche aussi une direction. Prenez des décisions nettes : dire « on fait ça » rassure plus que « comme tu veux ». Ne diluez pas ses inquiétudes par « mais non » : écoutez-les, nommez-les, puis tranchez doucement.",
    parentChallenge: "Cet enfant questionnant sollicite votre prise de position — et c'est précisément ce que vous évitez. Son doute rencontre votre absence de certitude affichée et se nourrit au lieu de s'apaiser. Il vous force à l'expression claire : décider visiblement, affirmer tranquillement, offrir une direction — votre antidote à la fuite habituelle.",
  },
  "9-7": {
    pointsForts: "Sa joie vous anime, votre calme l'ancre. Belle complémentarité entre énergie et sérénité.",
    vigilances: "Son rythme rapide vous épuise. Vous risquez de vous absenter mentalement pour vous protéger.",
    conseil: "Restez engagé même quand vous voulez vous retirer. Il a besoin de votre présence active, pas seulement physique.",
    parentSoutien: "Votre enfant Type 7 est énergique — votre calme est un repos pour lui mais il a besoin d'une présence engagée, pas passive. Rejoignez-le dans certaines de ses explorations : c'est par l'action partagée qu'il sent votre intérêt pour lui. Tenez des limites fermes sur l'essentiel : votre souplesse habituelle le laisse sans cadre sur ce qui compte.",
    parentChallenge: "Cet enfant dynamique vous épuise et votre réflexe est de « laisser faire » quand vous êtes dépassé. Son appétit d'expérience peut vous faire vous absenter mentalement pendant que lui continue sans ancrage. Il vous invite à l'engagement actif — initier, cadrer, dire non — un travail d'initiative permanente qui va à contre-courant de votre paresse profonde.",
  },
  "9-8": {
    pointsForts: "Votre douceur adoucit sa puissance. Vous ne le craignez pas, et c'est précieux pour lui.",
    vigilances: "Il teste vos limites avec force. Si vous cédez systématiquement, il prend toute la place et perd ses repères.",
    conseil: "Tenez vos positions calmement mais fermement. Votre fermeté tranquille est plus puissante que la confrontation.",
    parentSoutien: "Votre enfant Type 8 a besoin d'un parent qui tient, qui se positionne, qui dit non sans trembler — votre évitement du conflit est son plus grand danger. Posez des règles claires et tenez-les : il les testera, soyez prêt. Reconnaissez sa puissance sans la minimiser : c'est un trésor à canaliser, pas un problème à lisser.",
    parentChallenge: "Cet enfant explose là où vous vous effacez — et il va prendre tout l'espace si vous cédez, pour votre confort immédiat. Sa force rencontre votre inertie et il règne vite. Il vous force à l'affrontement, à la fermeté, à l'autorité assumée — votre zone la plus inconfortable est précisément ce dont il a besoin pour grandir.",
  },
  "9-9": {
    pointsForts: "Calme, harmonie, fluidité. Vous vivez en paix dans le même rythme tranquille.",
    vigilances: "Vous évitez tous les deux les décisions et les conflits. Personne ne tranche, personne n'avance.",
    conseil: "Imposez-vous d'être celui qui décide et qui initie. Il a besoin d'apprendre à choisir — par votre exemple actif.",
    parentSoutien: "Votre enfant Type 9 est paisible comme vous — et ce confort commun peut devenir un non-lieu où personne ne se rencontre vraiment. Provoquez le contact : initiatives, activités, questions ciblées, sinon la vie glisse entre vous sans incident ni rencontre. Aidez-le à se positionner : vous êtes vous-même ce modèle, devenez-le volontairement pour lui.",
    parentChallenge: "Cet enfant vous ressemble tellement que votre accord silencieux remplace la présence — personne ne demande, personne ne donne, tout va bien. Votre confort commun est le piège même que vous avez toute votre vie tenté de quitter. Il vous invite à briser votre pente : pour qu'il puisse exister, il vous faut vous réveiller — c'est l'effort central de votre parentalité.",
  },
};

// ═══════════════════════════════════════════════════════════════
//  VUE PEERS — Quand A et B sont enfants entre eux ou ados entre eux
//  Reformule pointsForts/vigilances/conseil pour le parent qui observe.
// ═══════════════════════════════════════════════════════════════

export const DUO_PEERS_VIEW: Record<string, PerspectiveView> = {
  // ── Type 1 (frère/ami) avec... ──
  "1-1": {
    pointsForts: "Deux petits perfectionnistes qui se comprennent parfaitement. Ils peuvent construire des projets très aboutis ensemble.",
    vigilances: "Compétition féroce sur « qui fait le mieux ». Les critiques mutuelles peuvent dégénérer en disputes pour des broutilles.",
    conseil: "Encouragez la coopération plutôt que la comparaison. Et célébrez ce qu'ils font ENSEMBLE, pas individuellement.",
  },
  "1-2": {
    pointsForts: "Le 1 cadre, le 2 réconforte. Le 2 admire la rigueur du 1, le 1 accepte la chaleur du 2. Belle complémentarité.",
    vigilances: "Le 1 critique, le 2 souffre en silence. Le 2 apprend à se sacrifier pour avoir l'approbation du 1.",
    conseil: "Apprenez au 1 à valoriser avant de corriger. Et au 2 à dire ce qu'il ressent au lieu de l'absorber.",
  },
  "1-3": {
    pointsForts: "Duo ambitieux, projets sérieux et bien menés. Ils se respectent dans l'effort et la performance.",
    vigilances: "Le 1 corrige le processus du 3, le 3 trouve le 1 lent. Compétition sur les résultats inévitable.",
    conseil: "Donnez-leur des projets distincts où chacun peut briller à sa façon. Et apprenez-leur à célébrer la réussite de l'autre.",
  },
  "1-4": {
    pointsForts: "Contraste enrichissant : le 1 structure, le 4 crée. Ensemble ils peuvent produire quelque chose d'unique et d'abouti.",
    vigilances: "Le 1 trouve le 4 trop dramatique, le 4 trouve le 1 trop froid. Frictions sur les émotions et le rythme.",
    conseil: "Aidez-les à voir leurs différences comme une richesse. Le 4 a besoin d'espace émotionnel, le 1 a besoin de cadre.",
  },
  "1-5": {
    pointsForts: "Amitié intellectuelle solide. Ils peuvent passer des heures à construire, débattre, expérimenter sans se lasser.",
    vigilances: "Deux profils peu démonstratifs. Personne n'initie le câlin ou le « j'ai besoin de toi ».",
    conseil: "Encouragez les moments physiques — sport, jeu, balade. La connexion ne passe pas que par les idées.",
  },
  "1-6": {
    pointsForts: "Loyauté forte, fiabilité réciproque. Le 6 fait confiance au cap du 1, le 1 apprécie la constance du 6.",
    vigilances: "Le 1 peut juger les peurs du 6, le 6 peut se sentir bousculé par la rigueur du 1.",
    conseil: "Apprenez au 1 à rassurer avant d'exiger. Et au 6 à exprimer ses craintes au lieu de les cacher.",
  },
  "1-7": {
    pointsForts: "Le 7 décoince le 1, le 1 ancre le 7. S'ils s'acceptent, ils créent ensemble du beau et du joyeux.",
    vigilances: "Le 1 trouve le 7 irresponsable, le 7 trouve le 1 ennuyeux. Conflits fréquents sur le respect des règles.",
    conseil: "Donnez-leur des projets COMMUNS avec des règles courtes. Le 1 cadre, le 7 anime — répartition naturelle.",
  },
  "1-8": {
    pointsForts: "Deux personnalités fortes qui se respectent dans la confrontation. Quand ils s'allient, ils sont redoutables.",
    vigilances: "Affrontements possibles. Le 1 a raison sur les principes, le 8 a raison sur la force — chacun campe sur ses positions.",
    conseil: "Médiez les conflits sans prendre parti. Aidez-les à voir que leur force commune est plus précieuse que la rivalité.",
  },
  "1-9": {
    pointsForts: "Amitié calme et stable. Le 9 accepte le cadre du 1 sans heurts, le 1 apprécie la sérénité du 9.",
    vigilances: "Le 1 peut presser le 9 qui s'efface. Le 9 peut frustrer le 1 par sa lenteur à décider.",
    conseil: "Apprenez au 1 à attendre, au 9 à s'exprimer. Donnez au 9 le temps dont il a besoin.",
  },

  // ── Type 2 ──
  "2-1": {
    pointsForts: "Le 2 chaleureux entoure le 1 sérieux. Le 1 fait gagner du sérieux au 2, le 2 fait gagner de la chaleur au 1.",
    vigilances: "Le 2 cherche l'approbation du 1, le 1 critique sans s'en rendre compte. Le 2 peut se sentir constamment insuffisant.",
    conseil: "Apprenez au 1 à exprimer sa gratitude. Et au 2 à ne pas se définir par l'approbation des autres.",
  },
  "2-2": {
    pointsForts: "Tendresse et générosité mutuelles. Ils prennent soin l'un de l'autre avec une douceur rare entre enfants.",
    vigilances: "Risque de codépendance. Ils s'oublient l'un pour l'autre et excluent les autres amis.",
    conseil: "Encouragez-les à avoir aussi des amis individuels. Et apprenez-leur à recevoir, pas seulement à donner.",
  },
  "2-3": {
    pointsForts: "Le 2 admire et soutient les ambitions du 3. Le 3 brille avec un fan club fidèle.",
    vigilances: "Le 3 prend l'aide du 2 pour acquise. Le 2 s'efface dans l'ombre du 3 et oublie ses propres rêves.",
    conseil: "Apprenez au 3 à remercier explicitement. Et au 2 à briller pour lui-même, pas seulement à servir le succès des autres.",
  },
  "2-4": {
    pointsForts: "Amitié émotionnelle profonde. Le 2 entoure le 4, le 4 offre au 2 sa profondeur.",
    vigilances: "Le 2 veut consoler, le 4 veut être compris dans la douleur. Le 2 peut se sentir impuissant et coupable.",
    conseil: "Apprenez au 2 que tenir l'espace ne veut pas dire résoudre. Et au 4 à dire merci pour la présence reçue.",
  },
  "2-5": {
    pointsForts: "Le 2 ouvre le cocon du 5 avec respect. Le 5 offre au 2 sa pensée et sa profondeur.",
    vigilances: "Le 2 envahit le 5 par excès d'attention, le 5 se replie. Le 2 vit la distance comme un rejet.",
    conseil: "Apprenez au 2 à respecter les zones de retrait du 5. Et au 5 à manifester sa présence quand il revient.",
  },
  "2-6": {
    pointsForts: "Amitié très loyale et chaleureuse. Ils se soutiennent dans les moments difficiles avec une fidélité rare.",
    vigilances: "Ils peuvent s'enfermer dans une bulle d'inquiétude mutuelle. Le 2 alimente les peurs du 6 en voulant le rassurer.",
    conseil: "Encouragez-les à explorer le monde extérieur. Et invitez d'autres amis dans leur duo pour aérer la relation.",
  },
  "2-7": {
    pointsForts: "Le 7 entraîne le 2 dans la joie, le 2 prend soin du 7 dans ses débordements. Duo populaire et chaleureux.",
    vigilances: "Le 7 court partout, le 2 s'épuise à le suivre. Et tous deux fuient les émotions difficiles.",
    conseil: "Apprenez-leur à s'arrêter ensemble. Et invitez-les à parler de ce qui ne va pas, pas seulement de ce qui pétille.",
  },
  "2-8": {
    pointsForts: "Le 2 adoucit le 8, le 8 protège le 2. Loyauté profonde une fois la confiance installée.",
    vigilances: "Le 8 peut écraser le 2 sans le vouloir. Le 2 absorbe l'intensité du 8 et oublie de s'affirmer.",
    conseil: "Apprenez au 8 à modérer sa force avec ses amis. Et au 2 à se respecter assez pour dire « stop ».",
  },
  "2-9": {
    pointsForts: "Amitié douce et harmonieuse. Ils prennent soin l'un de l'autre dans le calme et la bienveillance.",
    vigilances: "Aucun ne dit ce qui ne va pas. Les non-dits s'accumulent jusqu'à un éloignement silencieux.",
    conseil: "Encouragez-les à exprimer leurs désaccords. Sans frictions verbalisées, leur amitié peut s'étioler sans bruit.",
  },

  // ── Type 3 ──
  "3-1": {
    pointsForts: "Ambition et rigueur partagées. Ils se tirent mutuellement vers le haut sur les projets sérieux.",
    vigilances: "Le 3 veut briller, le 1 veut bien faire. Conflit possible sur les méthodes (raccourci vs travail de fond).",
    conseil: "Apprenez-leur à respecter le mode de l'autre. Et à reconnaître que les deux approches sont valides.",
  },
  "3-2": {
    pointsForts: "Le 2 soutient le 3, le 3 fait briller le 2 par association. Amitié fluide où chacun trouve son compte.",
    vigilances: "Le 3 utilise le 2 sans s'en rendre compte. Le 2 s'efface pour servir l'image du 3.",
    conseil: "Aidez le 2 à briller pour lui-même. Et apprenez au 3 à inclure le 2 dans ses succès, pas à le mettre en arrière-plan.",
  },
  "3-3": {
    pointsForts: "Énergie débordante, projets ambitieux, succès partagés. Ils se comprennent dans la quête de réussite.",
    vigilances: "Compétition féroce. La comparaison constante peut détruire leur amitié et créer des blessures durables.",
    conseil: "Donnez-leur des projets distincts. Encouragez-les à célébrer la réussite de l'autre comme la leur.",
  },
  "3-4": {
    pointsForts: "Le 3 entraîne le 4 vers l'action, le 4 ramène le 3 à lui-même. Apprentissages mutuels précieux.",
    vigilances: "Le 3 trouve le 4 trop lent et trop intense. Le 4 trouve le 3 superficiel et déconnecté.",
    conseil: "Aidez-les à voir ce que l'autre apporte. Le 4 a besoin du dynamisme du 3, le 3 a besoin de la profondeur du 4.",
  },
  "3-5": {
    pointsForts: "Le 3 met en action les analyses du 5. Duo très efficace sur les projets qui demandent réflexion ET exécution.",
    vigilances: "Le 3 court-circuite la pensée du 5, le 5 freine l'élan du 3. Tension sur le rythme.",
    conseil: "Définissez les rôles : le 5 réfléchit, le 3 exécute. Et respectez le temps dont chacun a besoin.",
  },
  "3-6": {
    pointsForts: "Le 3 donne confiance au 6, le 6 ramène le 3 à la prudence. Belle alliance pour des projets bien préparés.",
    vigilances: "Le 3 fonce, le 6 anticipe les catastrophes. Tension sur les risques à prendre.",
    conseil: "Apprenez au 3 à écouter les craintes du 6 (souvent justifiées). Et au 6 à faire confiance à l'élan du 3.",
  },
  "3-7": {
    pointsForts: "Énergie, projets, enthousiasme à deux. Ils peuvent monter des choses incroyables ensemble.",
    vigilances: "Vous fuyez tous les deux les émotions difficiles. Vos amitiés peuvent rester en surface.",
    conseil: "Apprenez-leur à parler de ce qui ne va pas. La profondeur vient quand on partage les difficultés, pas seulement les succès.",
  },
  "3-8": {
    pointsForts: "Deux leaders ambitieux qui se respectent. Quand ils s'allient, ils peuvent emmener le groupe.",
    vigilances: "Rivalité de pouvoir possible. Compétition sur qui décide, qui mène, qui réussit.",
    conseil: "Aidez-les à coopérer plutôt qu'à s'affronter. Définir des territoires distincts évite les frictions.",
  },
  "3-9": {
    pointsForts: "Le 3 dynamise le 9, le 9 calme le 3. Belle complémentarité entre énergie et sérénité.",
    vigilances: "Le 3 trouve le 9 trop passif, le 9 trouve le 3 trop agité. Le 9 disparaît sous la pression du 3.",
    conseil: "Apprenez au 3 à respecter le rythme du 9. Et au 9 à exprimer ses envies avant que le 3 ne décide pour lui.",
  },

  // ── Type 4 ──
  "4-1": {
    pointsForts: "Esthétique et rigueur unies. Ils peuvent créer des œuvres ou projets très aboutis ensemble.",
    vigilances: "Le 4 trouve le 1 froid, le 1 trouve le 4 dramatique. Frictions sur l'expression émotionnelle.",
    conseil: "Aidez-les à voir leurs différences comme complémentaires. Et à respecter le besoin émotionnel de chacun.",
  },
  "4-2": {
    pointsForts: "Profondeur émotionnelle partagée. Le 2 console, le 4 révèle des couches que peu osent toucher.",
    vigilances: "Le 4 absorbe l'attention du 2 par son intensité. Le 2 s'épuise à essayer de réparer ce qui n'est pas cassé.",
    conseil: "Apprenez au 2 à être présent sans résoudre. Et au 4 à apprécier la présence sans toujours plonger.",
  },
  "4-3": {
    pointsForts: "Le 4 offre la profondeur, le 3 offre l'action. Ensemble ils peuvent produire du sens ET du résultat.",
    vigilances: "Le 4 trouve le 3 superficiel, le 3 trouve le 4 lent. Conflit sur ce qui compte vraiment.",
    conseil: "Aidez-les à voir ce que l'autre apporte. Et à respecter leurs visions différentes du succès.",
  },
  "4-4": {
    pointsForts: "Compréhension émotionnelle profonde, amitié intense. Ils se voient mutuellement dans leur vraie nature.",
    vigilances: "Risque de cocon mélancolique. Deux 4 ensemble peuvent s'enfermer dans l'intensité et perdre le contact avec le réel.",
    conseil: "Encouragez les activités légères, joyeuses, physiques. Et invitez d'autres amis pour aérer leur bulle.",
  },
  "4-5": {
    pointsForts: "Amitié intellectuelle et émotionnelle riche. Ils respectent mutuellement leur monde intérieur.",
    vigilances: "Risque d'isolement à deux. Personne n'invite, personne ne sort, le monde extérieur s'éloigne.",
    conseil: "Forcez l'ouverture vers d'autres relations. Leur amitié gagne à être nourrie par le monde large.",
  },
  "4-6": {
    pointsForts: "Le 4 offre la profondeur, le 6 offre la loyauté. Belle complémentarité émotionnelle.",
    vigilances: "Le 4 nourrit les peurs du 6 avec son intensité. Le 6 s'épuise à rassurer le 4 dans ses doutes.",
    conseil: "Apprenez au 4 à modérer ses tempêtes. Et au 6 à ne pas se sentir responsable du bonheur du 4.",
  },
  "4-7": {
    pointsForts: "Le 4 plonge, le 7 survole — leurs différences sont enrichissantes si chacun s'ouvre à l'autre.",
    vigilances: "Le 7 fuit l'intensité du 4, le 4 trouve le 7 superficiel. Tension sur ce qui mérite attention.",
    conseil: "Aidez le 7 à rester quand c'est inconfortable. Et le 4 à apprécier la légèreté sans la juger.",
  },
  "4-8": {
    pointsForts: "Intensité partagée. Le 8 protège le 4, le 4 aide le 8 à toucher sa vulnérabilité.",
    vigilances: "Le 8 peut écraser le 4 par sa force. Le 4 peut frustrer le 8 par ses tempêtes émotionnelles.",
    conseil: "Apprenez au 8 à respecter la sensibilité du 4. Et au 4 à recevoir la protection sans la dramatiser.",
  },
  "4-9": {
    pointsForts: "Le 9 accueille toutes les émotions du 4 sans les juger. Le 4 apprécie cette acceptation totale.",
    vigilances: "Le 4 peut envahir le 9 par son intensité. Le 9 disparaît pour ne pas porter les émotions du 4.",
    conseil: "Apprenez au 4 à respecter la paix du 9. Et au 9 à dire quand c'est trop, au lieu de s'absenter.",
  },

  // ── Type 5 ──
  "5-1": {
    pointsForts: "Amitié intellectuelle solide, rigoureuse, fiable. Ils respectent mutuellement leur sérieux.",
    vigilances: "Peu de chaleur explicite, peu de spontanéité. La relation peut devenir purement fonctionnelle.",
    conseil: "Encouragez les moments de jeu, de sport, d'expression corporelle. La connexion ne passe pas que par la tête.",
  },
  "5-2": {
    pointsForts: "Le 5 offre sa pensée, le 2 offre sa chaleur. Si les deux respectent le rythme de l'autre, belle amitié.",
    vigilances: "Le 2 envahit le 5, le 5 se replie. Le 2 vit la distance comme un rejet et redouble d'attention.",
    conseil: "Apprenez au 2 à laisser de l'espace. Et au 5 à manifester sa présence quand il revient de sa bulle.",
  },
  "5-3": {
    pointsForts: "Le 5 réfléchit, le 3 agit. Duo efficace si chacun respecte le rythme de l'autre.",
    vigilances: "Le 3 court-circuite la pensée du 5, le 5 freine l'élan du 3. Tension sur le tempo.",
    conseil: "Apprenez-leur à valoriser ce que l'autre apporte. Et à se laisser mutuellement le temps nécessaire.",
  },
  "5-4": {
    pointsForts: "Profondeur intellectuelle ET émotionnelle. Amitié rare où l'on peut tout partager sans superficialité.",
    vigilances: "Risque de bulle hermétique. Deux profils introvertis qui s'isolent ensemble du reste du monde.",
    conseil: "Encouragez l'ouverture vers d'autres amis. Et les activités physiques pour les sortir du mental.",
  },
  "5-5": {
    pointsForts: "Respect mutuel des silences et de l'espace. Amitié calme, sans drame, profondément stable.",
    vigilances: "Personne n'initie le contact. Ils peuvent rester côte à côte sans jamais vraiment se rencontrer.",
    conseil: "Encouragez les rituels concrets — un projet commun, une activité régulière. Sans cela, ils se perdent de vue.",
  },
  "5-6": {
    pointsForts: "Le 5 analyse, le 6 anticipe. Duo très complémentaire pour les projets qui demandent prudence et réflexion.",
    vigilances: "Risque de spirale d'inquiétude analytique. Ils peuvent voir des dangers partout et se paralyser.",
    conseil: "Encouragez l'action et le risque calculé. Et invitez d'autres profils dans leur duo pour aérer la pensée.",
  },
  "5-7": {
    pointsForts: "Le 5 approfondit, le 7 ouvre. Apprentissages mutuels riches si chacun s'ouvre à l'autre.",
    vigilances: "Le 7 épuise le 5 par son agitation. Le 5 frustre le 7 par sa lenteur et son retrait.",
    conseil: "Apprenez au 7 à respecter les zones de retrait du 5. Et au 5 à participer à l'énergie du 7 par moments.",
  },
  "5-8": {
    pointsForts: "Respect mutuel possible : le 8 protège le 5, le 5 conseille le 8. Duo intéressant si chacun respecte l'autre.",
    vigilances: "Le 8 bouscule le 5 par sa force. Le 5 frustre le 8 par sa retenue.",
    conseil: "Apprenez au 8 à modérer son intensité. Et au 5 à s'engager corporellement, pas juste mentalement.",
  },
  "5-9": {
    pointsForts: "Calme partagé, respect des silences, coexistence paisible. Amitié sans drame.",
    vigilances: "Personne n'initie. Ils peuvent rester très proches dans le silence et finir par se perdre.",
    conseil: "Encouragez les rituels concrets — sport, jeu, projet commun. Sans cela, leur amitié s'éteint doucement.",
  },

  // ── Type 6 ──
  "6-1": {
    pointsForts: "Loyauté et rigueur partagées. Amitié fiable, respectueuse, sur laquelle on peut compter.",
    vigilances: "Le 1 critique les hésitations du 6, le 6 se sent jugé. Risque d'amitié sous tension permanente.",
    conseil: "Apprenez au 1 à rassurer avant d'exiger. Et au 6 à faire confiance aux intentions du 1.",
  },
  "6-2": {
    pointsForts: "Tendresse et loyauté. Ils prennent soin l'un de l'autre avec une fidélité touchante.",
    vigilances: "Le 2 nourrit les peurs du 6 en voulant le rassurer. Ils peuvent s'enfermer dans une bulle d'inquiétude.",
    conseil: "Encouragez-les à explorer le monde extérieur. Et à inviter d'autres amis dans leur duo.",
  },
  "6-3": {
    pointsForts: "Le 3 donne confiance au 6, le 6 ancre le 3. Belle complémentarité entre prudence et énergie.",
    vigilances: "Le 3 minimise les peurs du 6, le 6 freine l'élan du 3. Tension sur les risques.",
    conseil: "Apprenez au 3 à écouter les craintes du 6 avant de les dépasser. Et au 6 à oser malgré l'inquiétude.",
  },
  "6-4": {
    pointsForts: "Le 6 offre la fiabilité, le 4 offre la profondeur. Complémentarité émotionnelle riche.",
    vigilances: "L'intensité du 4 alimente l'anxiété du 6. Le 6 peut s'épuiser à essayer de stabiliser le 4.",
    conseil: "Apprenez au 4 à modérer ses tempêtes. Et au 6 à ne pas se sentir responsable du bonheur du 4.",
  },
  "6-5": {
    pointsForts: "Amitié calme et analytique. Ils se rassurent mutuellement par la pensée et l'anticipation.",
    vigilances: "Risque de spirale de doute et d'inquiétude intellectuelle. Ils peuvent se paralyser à deux.",
    conseil: "Encouragez l'action et le risque mesuré. Et invitez d'autres profils dans leur duo pour aérer.",
  },
  "6-6": {
    pointsForts: "Loyauté absolue, soutien mutuel face aux peurs. Quand l'un doute, l'autre rassure.",
    vigilances: "Risque d'amplification des angoisses. Ils peuvent se nourrir mutuellement dans l'inquiétude.",
    conseil: "Cultivez la confiance, le risque calculé, l'aventure. Et modélisez (vous, parent) le courage face à l'incertitude.",
  },
  "6-7": {
    pointsForts: "Le 7 rassure le 6 par sa légèreté, le 6 ancre le 7 par sa prudence. Belle complémentarité.",
    vigilances: "Le 7 minimise les peurs du 6, le 6 freine l'élan du 7. Tension récurrente.",
    conseil: "Apprenez au 7 à valider les peurs du 6 avant de les dépasser. Et au 6 à oser malgré les doutes.",
  },
  "6-8": {
    pointsForts: "Le 8 protège le 6, le 6 est loyalement dévoué au 8. Amitié forte une fois la confiance installée.",
    vigilances: "Le 8 peut intimider le 6 par sa force. Le 6 peut frustrer le 8 par ses hésitations.",
    conseil: "Apprenez au 8 à modérer sa puissance. Et au 6 à ne pas se laisser écraser — son avis compte.",
  },
  "6-9": {
    pointsForts: "Amitié douce et stable. Le 9 apaise les peurs du 6 par sa sérénité naturelle.",
    vigilances: "Aucun n'aborde les conflits. Les non-dits s'accumulent et peuvent éroder la relation.",
    conseil: "Encouragez-les à exprimer leurs désaccords. Et à prendre des décisions claires ensemble — ils tergiversent à deux.",
  },

  // ── Type 7 ──
  "7-1": {
    pointsForts: "Le 7 décoince le 1, le 1 ancre le 7. Si les deux s'acceptent, ils créent du joyeux ET du structuré.",
    vigilances: "Le 1 critique le désordre du 7, le 7 fuit la rigidité du 1. Conflits récurrents sur les règles.",
    conseil: "Donnez-leur des projets communs avec règles courtes. Et apprenez-leur à respecter ce que l'autre apporte.",
  },
  "7-2": {
    pointsForts: "Joie et chaleur partagées. Le 7 emmène le 2 dans ses aventures, le 2 prend soin du 7.",
    vigilances: "Le 7 court partout, le 2 s'épuise à le suivre. Tous deux fuient les émotions difficiles.",
    conseil: "Apprenez-leur à s'arrêter ensemble. Et à parler de ce qui ne va pas, pas seulement de ce qui pétille.",
  },
  "7-3": {
    pointsForts: "Énergie débordante, projets joyeux, succès partagés. Ils se boostent mutuellement avec enthousiasme.",
    vigilances: "Vous fuyez tous les deux la profondeur émotionnelle. Vos amitiés peuvent rester en surface.",
    conseil: "Apprenez-leur à parler de ce qui les touche vraiment. La profondeur enrichit l'amitié sans la plomber.",
  },
  "7-4": {
    pointsForts: "Le 4 offre la profondeur, le 7 offre la légèreté. Apprentissages mutuels précieux.",
    vigilances: "Le 7 fuit l'intensité du 4, le 4 trouve le 7 superficiel. Frictions sur ce qui mérite attention.",
    conseil: "Aidez le 7 à rester quand c'est inconfortable. Et le 4 à apprécier la joie sans la dévaluer.",
  },
  "7-5": {
    pointsForts: "Le 7 ouvre, le 5 approfondit. Duo intéressant si chacun respecte le rythme de l'autre.",
    vigilances: "Le 7 épuise le 5 par son agitation. Le 5 frustre le 7 par sa lenteur et son retrait.",
    conseil: "Apprenez au 7 à respecter les zones de retrait du 5. Et au 5 à participer à l'énergie du 7 par moments.",
  },
  "7-6": {
    pointsForts: "Le 7 rassure le 6, le 6 ancre le 7. Belle complémentarité entre joie et prudence.",
    vigilances: "Le 7 minimise les peurs du 6, le 6 freine l'élan du 7. Tension récurrente.",
    conseil: "Apprenez au 7 à valider les peurs du 6. Et au 6 à oser malgré les doutes — souvent c'est OK.",
  },
  "7-7": {
    pointsForts: "Énergie contagieuse, créativité débordante, projets sans fin. Amitié pétillante et joyeuse.",
    vigilances: "Dispersion, projets jamais finis, fuite des émotions difficiles. Personne ne s'arrête.",
    conseil: "Apprenez-leur à finir UN projet avant d'en commencer un autre. Et à parler de ce qu'ils ressentent vraiment.",
  },
  "7-8": {
    pointsForts: "Énergie et action partagées. Aventures, sport, défis — ils se comprennent dans le mouvement.",
    vigilances: "Vous évitez tous les deux les émotions difficiles via l'action. Personne ne s'arrête pour ressentir.",
    conseil: "Imposez-leur des moments calmes. Et apprenez-leur à parler de ce qui ne va pas, pas seulement à agir.",
  },
  "7-9": {
    pointsForts: "Le 7 anime le 9, le 9 calme le 7. Belle complémentarité entre énergie et sérénité.",
    vigilances: "Le 7 entraîne le 9 dans son rythme, le 9 dit oui mais s'absente. Risque de désengagement silencieux.",
    conseil: "Apprenez au 7 à demander vraiment l'avis du 9. Et au 9 à exprimer ses propres envies.",
  },

  // ── Type 8 ──
  "8-1": {
    pointsForts: "Force et rigueur partagées. Quand ils s'allient, ils sont redoutables sur les projets sérieux.",
    vigilances: "Le 8 frontal, le 1 méthodique : conflits possibles sur le rythme et les règles.",
    conseil: "Aidez-les à voir leur force commune. Le 1 cadre, le 8 propulse — répartition naturelle si chacun respecte l'autre.",
  },
  "8-2": {
    pointsForts: "Le 8 protège le 2, le 2 adoucit le 8. Loyauté et tendresse mutuelles.",
    vigilances: "Le 8 peut écraser le 2 sans le vouloir. Le 2 absorbe l'intensité du 8 et oublie de s'affirmer.",
    conseil: "Apprenez au 8 à modérer sa force. Et au 2 à se respecter assez pour dire « stop ».",
  },
  "8-3": {
    pointsForts: "Deux leaders ambitieux qui se respectent. Quand ils coopèrent, ils peuvent tout entreprendre.",
    vigilances: "Rivalité de pouvoir possible. Compétition sur qui décide, qui mène, qui réussit.",
    conseil: "Aidez-les à coopérer plutôt qu'à s'affronter. Définir des territoires distincts évite les frictions.",
  },
  "8-4": {
    pointsForts: "Intensité partagée. Le 8 protège le 4, le 4 aide le 8 à toucher sa vulnérabilité.",
    vigilances: "Le 8 peut écraser le 4 par sa force. Le 4 peut frustrer le 8 par ses tempêtes émotionnelles.",
    conseil: "Apprenez au 8 à respecter la sensibilité du 4. Et au 4 à recevoir la protection sans la dramatiser.",
  },
  "8-5": {
    pointsForts: "Respect mutuel : le 8 protège le 5, le 5 conseille le 8. Duo intéressant et stable.",
    vigilances: "Le 8 bouscule le 5 par son énergie. Le 5 frustre le 8 par sa retenue.",
    conseil: "Apprenez au 8 à modérer son intensité. Et au 5 à participer corporellement, pas juste mentalement.",
  },
  "8-6": {
    pointsForts: "Le 8 protège le 6, le 6 est loyalement dévoué au 8. Amitié forte une fois la confiance installée.",
    vigilances: "Le 8 peut intimider le 6. Le 6 peut frustrer le 8 par ses hésitations.",
    conseil: "Apprenez au 8 à modérer sa puissance. Et au 6 à ne pas se laisser écraser — son avis compte.",
  },
  "8-7": {
    pointsForts: "Énergie partagée, action, aventure. Amitié intense et vivante, jamais ennuyeuse.",
    vigilances: "Vous évitez tous les deux les émotions difficiles via l'action. Personne ne s'arrête pour ressentir.",
    conseil: "Imposez-leur des moments calmes. Et apprenez-leur à parler de ce qui ne va pas, pas seulement à foncer.",
  },
  "8-8": {
    pointsForts: "Quand deux 8 sont alliés, ils sont indestructibles. Loyauté absolue et respect mutuel total.",
    vigilances: "Quand ils s'affrontent, c'est explosif. La rivalité de pouvoir peut détruire leur amitié.",
    conseil: "Aidez-les à reconnaître la force de l'autre comme un atout, pas un défi. Le respect mutuel est la clé.",
  },
  "8-9": {
    pointsForts: "Le 8 protège le 9, le 9 apaise le 8. Belle complémentarité si l'équilibre est respecté.",
    vigilances: "Le 8 prend toute la place, le 9 disparaît pour éviter le conflit. Le 9 perd sa voix.",
    conseil: "Apprenez au 8 à demander vraiment l'avis du 9. Et au 9 à s'affirmer face au 8 — il en est capable.",
  },

  // ── Type 9 ──
  "9-1": {
    pointsForts: "Amitié calme, le 9 accepte le cadre du 1, le 1 apprécie la sérénité du 9. Stabilité bienvenue.",
    vigilances: "Le 1 peut presser le 9 qui s'efface. Le 9 peut frustrer le 1 par sa lenteur.",
    conseil: "Apprenez au 1 à attendre. Et au 9 à exprimer ses envies au lieu de toujours s'adapter.",
  },
  "9-2": {
    pointsForts: "Amitié douce et bienveillante. Ils prennent soin l'un de l'autre dans le calme.",
    vigilances: "Aucun ne dit ce qui ne va pas. Les non-dits s'accumulent jusqu'à l'éloignement silencieux.",
    conseil: "Encouragez-les à exprimer leurs désaccords. Sans frictions verbalisées, leur amitié s'éteint.",
  },
  "9-3": {
    pointsForts: "Le 9 calme le 3, le 3 dynamise le 9. Belle complémentarité entre énergie et sérénité.",
    vigilances: "Le 3 entraîne le 9 dans son rythme, le 9 dit oui mais s'absente. Risque de désengagement.",
    conseil: "Apprenez au 3 à demander vraiment l'avis du 9. Et au 9 à exprimer ses propres envies clairement.",
  },
  "9-4": {
    pointsForts: "Le 9 accueille toutes les émotions du 4 sans les juger. Le 4 apprécie cette acceptation totale.",
    vigilances: "Le 4 peut envahir le 9 par son intensité. Le 9 disparaît pour ne pas porter les émotions du 4.",
    conseil: "Apprenez au 4 à respecter la paix du 9. Et au 9 à dire « stop » au lieu de s'absenter silencieusement.",
  },
  "9-5": {
    pointsForts: "Calme partagé, respect des silences, coexistence paisible. Amitié sans drame.",
    vigilances: "Personne n'initie. Ils peuvent rester très proches dans le silence et finir par se perdre.",
    conseil: "Encouragez les rituels concrets — sport, jeu, projet commun. Sans cela, leur amitié s'éteint doucement.",
  },
  "9-6": {
    pointsForts: "Amitié douce et stable. Le 9 apaise les peurs du 6 par sa sérénité naturelle.",
    vigilances: "Aucun n'aborde les conflits. Les non-dits s'accumulent et peuvent éroder la relation.",
    conseil: "Encouragez-les à exprimer leurs désaccords. Et à prendre des décisions claires ensemble.",
  },
  "9-7": {
    pointsForts: "Le 9 calme le 7, le 7 anime le 9. Belle complémentarité entre énergie et sérénité.",
    vigilances: "Le 7 entraîne le 9 dans son rythme, le 9 dit oui mais s'absente. Risque de désengagement.",
    conseil: "Apprenez au 7 à demander vraiment l'avis du 9. Et au 9 à exprimer ses propres envies.",
  },
  "9-8": {
    pointsForts: "Le 8 protège le 9, le 9 apaise le 8. Belle complémentarité si l'équilibre est respecté.",
    vigilances: "Le 8 prend toute la place, le 9 disparaît pour éviter le conflit. Le 9 perd sa voix.",
    conseil: "Apprenez au 8 à demander vraiment l'avis du 9. Et au 9 à s'affirmer face au 8.",
  },
  "9-9": {
    pointsForts: "Calme, harmonie, fluidité. Ils vivent en paix dans le même rythme tranquille.",
    vigilances: "Personne ne décide, personne ne tranche. L'amitié peut s'enliser dans la passivité mutuelle.",
    conseil: "Encouragez-les à prendre des initiatives, à choisir, à proposer. Et à exprimer leurs désaccords sans peur.",
  },
};

// ── Helpers ──────────────────────────────────────────────────

export function getDuoPair(typeA: number, typeB: number): DuoPair | null {
  const key = `${typeA}-${typeB}`;
  return DUO_DATA[key] ?? null;
}

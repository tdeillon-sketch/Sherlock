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
    parentSoutien: "Quand il ramène un 18/20 et que votre première phrase est « c'était quoi, les deux points ? », vous pensez l'aider à progresser. Lui entend : « ce n'est jamais assez, je ne suis jamais assez ». Il a déjà cette petite voix qui lui souffle ça — la vôtre devient la preuve. Et cette preuve-là, il la gardera toute sa vie.",
    parentChallenge: "Ce qui vous agace chez lui — ce besoin d'avoir raison sur tout, cette incapacité à lâcher, cette tension permanente — c'est exactement ce que votre conjoint·e essaie de vous dire depuis des années sur vous-même. Vous le voyez dans ses yeux, et vous ne le supportez pas parce que vous reconnaissez l'image. Le soulager lui, c'est vous soulager vous. Le juger lui, c'est vous juger vous.",
  },
  "1-2": {
    pointsForts: "Votre cadre rassure votre enfant Type 2 qui aime savoir comment plaire. Il se sent en sécurité avec votre clarté.",
    vigilances: "Votre rigueur peut couper son élan affectif. Il a besoin de votre approbation, pas de votre correction permanente.",
    conseil: "Dites « je suis fier de toi » avant « tu peux faire mieux ». Apprenez-lui à demander pour lui-même, pas seulement à donner.",
    parentSoutien: "Il court vers vous avec son dessin, tout fier. Votre œil accroche immédiatement : « oh, tu as dépassé ici ». Pour vous c'est un détail technique. Pour lui, qui offre ce dessin comme un acte d'amour, c'est la preuve que son amour n'est pas recevable tel quel. À force, il apprendra à vérifier avant de donner. Et ce qu'il donnera sera plus prudent, moins vrai, moins lui.",
    parentChallenge: "Cet enfant vous aime sans condition, et c'est précisément ce qui vous déstabilise. Votre tête cherche le retour d'ascenseur, la réciprocité « méritée », l'ordre juste. Son amour gratuit vous désoriente parce que vous n'avez jamais appris à le recevoir comme ça. Lui apprendre à mériter l'amour, c'est lui transmettre le vide dans lequel vous avez grandi.",
  },
  "1-3": {
    pointsForts: "Vous valorisez tous les deux la performance et l'effort. Belle alliance autour des résultats et du travail bien fait.",
    vigilances: "Vous corrigez le processus, lui veut le résultat. Vos « oui mais tu aurais pu mieux » blessent un enfant qui cherche votre admiration.",
    conseil: "Célébrez ses réussites SANS modération ni « mais ». Aidez-le à trouver sa valeur au-delà des trophées.",
    parentSoutien: "Quand il gagne sa compétition et que vous dites « bravo, mais tu aurais pu serrer ton coude », vous croyez l'aider à progresser. Lui comprend : mon succès ne vaut rien en lui-même. Il va chercher le « presque-parfait » de plus en plus haut, espérant un jour que votre phrase s'arrêtera avant le « mais ». Elle ne s'arrêtera pas tant que vous ne réglez pas, vous, cette phrase dans votre tête.",
    parentChallenge: "C'est l'enfant que vous auriez voulu être — brillant, visible, adoré. Et c'est précisément ce qui vous trouble : il est admiré pour ce qui n'est pas noble à vos yeux (la performance visible), alors que vous avez travaillé dur pour l'excellence invisible. Votre exigence cache peut-être une jalousie inavouable pour cet accès facile au regard des autres.",
  },
  "1-4": {
    pointsForts: "Vous tenez tous les deux à un idéal élevé — esthétique pour lui, éthique pour vous. Terrain commun fertile pour la création.",
    vigilances: "Sa sensibilité vous semble excessive, votre rigueur lui semble froide. Risque réel de blessure mutuelle profonde.",
    conseil: "Ses émotions ne sont pas un problème à résoudre — c'est sa façon d'être au monde. Écoutez avant de cadrer.",
    parentSoutien: "Il pleure pour la troisième fois cette semaine à propos de quelque chose qui vous paraît disproportionné. Votre phrase part toute seule : « arrête, c'est rien ». Mais pour lui, ce n'est jamais rien — son monde intérieur est le seul endroit où il existe vraiment. En banalisant ce qu'il ressent, vous lui dites que ce qu'il a de plus vrai n'a pas sa place dans votre famille. Il apprendra à pleurer ailleurs, seul.",
    parentChallenge: "Sa sensibilité vous dérange parce qu'elle révèle la vôtre — celle que vous avez transformée très tôt en rigueur pour ne plus avoir à la sentir. Vous n'avez pas supprimé votre fragilité, vous l'avez juste convertie en exigence morale. Cet enfant, lui, refuse cette conversion. Il vit tout ce que vous avez enterré, et c'est pour ça que vous le trouvez « difficile ».",
  },
  "1-5": {
    pointsForts: "Vous respectez tous les deux la compétence et le travail bien fait. Relation calme et structurée, peu de drama.",
    vigilances: "Deux têtes, peu de câlins. Risque que la relation devienne purement fonctionnelle — il se sent jugé en silence.",
    conseil: "Initiez les moments de tendresse et de jeu — il ne le fera pas. Et respectez ses zones de retrait.",
    parentSoutien: "Vous entrez dans sa chambre pour la cinquième fois avec une consigne, il ne lève pas les yeux. Vous montez le ton — « tu pourrais au moins répondre ». Mais lui est ailleurs, en train de comprendre quelque chose qui vous échappe, et chaque interruption est une rupture violente. Vos règles bien intentionnées lui apprennent que sa propre concentration n'est pas respectable. Il deviendra expert en fuite invisible.",
    parentChallenge: "Son autonomie tranquille vous fait mal sans que vous sachiez pourquoi. Vous avez construit votre valeur en étant irréprochable devant quelqu'un — lui construit la sienne sans regard. Son indépendance naturelle vous renvoie à votre propre dépendance au jugement extérieur. Vous voulez le cadrer « pour son bien » — en réalité pour retrouver le contrôle que sa distance vous fait perdre.",
  },
  "1-6": {
    pointsForts: "Votre cohérence est un cadeau pour son anxiété. Il s'appuie sur vous comme sur un roc qui ne bouge pas.",
    vigilances: "S'il sent que rien n'est jamais assez bien, son anxiété explose. Vos critiques le terrifient et bloquent son initiative.",
    conseil: "Rassurez d'abord, corrigez ensuite. Tenez vos promesses : la prévisibilité est sa principale source de sécurité.",
    parentSoutien: "Vous avez dit « demain on fait tel truc », et puis un imprévu. Pour vous, un détail logistique. Pour lui, vigilant, la promesse cassée s'inscrit quelque part — et demain, il testera votre fiabilité avant de vous faire confiance. Vos corrections, vos « il faut », vos critiques même justes deviennent des micro-séismes. Il n'apprend pas les règles : il apprend à avoir peur de vous.",
    parentChallenge: "Son anxiété vous agace parce qu'elle est la vôtre, en version sonore. Vous aussi scannez le monde pour les failles, mais vous appelez ça de la lucidité. Lui n'a pas encore construit cette façade de rigueur — il avoue sa peur, et sa vulnérabilité vous met en colère. Ce n'est pas lui que vous voulez faire taire : c'est votre propre peur, qu'il révèle sans filtre.",
  },
  "1-7": {
    pointsForts: "Son énergie et sa joie peuvent vous sortir de votre sérieux. Il vous rappelle que la vie est aussi pour s'amuser.",
    vigilances: "Vos règles longues et morales le perdent. Il fuit le cadre rigide en se dispersant ou en jouant au clown.",
    conseil: "Règles COURTES et claires, pas de longs sermons. Acceptez qu'il commence beaucoup et finisse peu — c'est sa nature.",
    parentSoutien: "Quand il débarque avec quinze idées en cinq minutes et que vous lui répondez « commence d'abord par finir ce que tu as déjà lancé », ce n'est pas de la pédagogie — c'est votre peur du bazar qui parle, déguisée en sagesse. À chaque fois, vous lui apprenez que ses élans joyeux sont un problème à gérer. Un jour il cessera d'avoir des élans. Et ce jour-là, vous en pleurerez.",
    parentChallenge: "Sa joie pure vous agace parfois — vous ne l'admettrez jamais, même à vous-même, mais vous le trouvez « pas assez sérieux ». La vérité, c'est que vous, vous prenez tout trop au sérieux depuis toujours. Il vous offre tous les jours, gratuitement, ce que personne ne vous a appris : qu'on peut être heureux sans l'avoir mérité.",
  },
  "1-8": {
    pointsForts: "Deux forts caractères qui se respectent quand chacun tient son territoire. Vous êtes son repère solide qui ne plie pas.",
    vigilances: "Il teste vos limites pour voir si vous tenez. Vos sanctions doivent être justes, jamais humiliantes — il s'en souviendra longtemps.",
    conseil: "Soyez ferme et calme, jamais réactif. Reconnaissez sa force au lieu d'essayer de la mater.",
    parentSoutien: "Il vous défie frontalement à table, devant tout le monde. Votre réflexe part vite : « tu ne me parles pas sur ce ton ». Pour vous c'est respect de l'autorité. Pour lui c'est la preuve que la force brute (la vôtre) a raison de la force honnête (la sienne). Il apprendra que l'autorité n'écoute pas — elle impose. Et vous aurez perdu, dans ce petit moment, la seule chose qu'il respecte vraiment : l'argument juste.",
    parentChallenge: "Sa force vous intimide, même si vous ne le direz jamais. Il nomme sans filtre ce que vous avez passé votre vie à contourner par la droiture morale : qu'il y a des rapports de force, et qu'ils comptent. Vous voulez le « civiliser » — en réalité vous voulez le faire rentrer dans le cadre rassurant de vos règles, parce que sa puissance brute vous rappelle que vos règles ne sont qu'une façon polie de ne pas regarder le monde en face.",
  },
  "1-9": {
    pointsForts: "Votre cadre l'aide à structurer sa journée. Il accepte vos règles sans heurts ni rébellion ouverte.",
    vigilances: "Sa lenteur vous agace, votre pression le fait disparaître. Il devient fantôme sous votre exigence.",
    conseil: "Donnez-lui du temps pour répondre, pour décider, pour faire. Demandez-lui son avis — il l'a, mais ne le donne pas spontanément.",
    parentSoutien: "Il vous dit oui à tout. Vous êtes soulagé·e : au moins un enfant facile. Mais ce oui-là n'est pas un accord — c'est une disparition. Il a compris très tôt que ses désirs à lui n'avaient pas leur place face à vos exigences, et il s'est retiré. Vous pensez avoir un enfant docile. Vous aurez bientôt un enfant absent — physiquement présent, mais introuvable quand vous chercherez vraiment à le rencontrer.",
    parentChallenge: "Sa lenteur vous fait monter la mayonnaise comme rien d'autre. Ce n'est pas sa lenteur qui vous agace, c'est ce qu'elle révèle : que votre rythme acharné n'est peut-être pas le seul rythme légitime, que votre « il faut se bouger » n'est pas une loi universelle. Chaque fois que vous le bousculez, vous défendez la nécessité de votre propre course permanente. Lui propose simplement un autre rythme.",
  },

  // ── Parent Type 2 ──
  "2-1": {
    pointsForts: "Votre chaleur adoucit son sérieux. Vous voyez sa valeur au-delà de ses performances et c'est un cadeau pour lui.",
    vigilances: "Il a besoin d'autonomie, pas d'attention envahissante. Vos câlins permanents peuvent l'étouffer.",
    conseil: "Aimez-le sans le couver. Et apprenez-lui que ses standards élevés sont une force, pas un défaut à consoler.",
    parentSoutien: "Il a fait une bêtise, vous voyez qu'il s'en veut déjà — et votre réflexe est de le consoler immédiatement, de l'enlacer, de lui dire « ce n'est pas grave, chéri ». Pour vous c'est de l'amour. Pour lui c'est un message subtil : ta souffrance m'est insupportable, il faut que tu ailles mieux tout de suite. Il apprendra à cacher sa peine pour vous protéger. Et bientôt, il se cachera lui-même.",
    parentChallenge: "Cet enfant vous refuse régulièrement — il veut gérer seul, il n'a pas besoin de vos câlins, il résout lui-même. Ça vous pique : vous voulez être nécessaire, il vous dit que vous ne l'êtes pas toujours. C'est exactement la leçon que vous ne voulez pas entendre : votre valeur n'est pas dans votre utilité. Il la confirme tous les jours en vous aimant sans avoir besoin de vous.",
  },
  "2-2": {
    pointsForts: "Tendresse mutuelle, complicité affective. Vous vous comprenez sans mots dans le registre du cœur.",
    vigilances: "Vous risquez de l'élever dans l'idée qu'aimer = se sacrifier. Il oubliera ses propres besoins comme vous oubliez les vôtres.",
    conseil: "Apprenez-lui à dire « non » et à recevoir. Modélisez-le en prenant soin de vous-même devant lui.",
    parentSoutien: "Il vous apporte la tasse de café avant que vous l'ayez demandée. Vous êtes touché·e, fier·ère même. Mais regardez bien : il vous copie. Il apprend de vous que l'amour, c'est deviner les besoins de l'autre avant soi. Cette leçon, vous l'avez payée cher toute votre vie. Vous êtes en train de la lui transmettre intégralement, avec votre reconnaissance en cadeau d'emballage.",
    parentChallenge: "Cet enfant est votre miroir, et ce qu'il vous renvoie vous gêne. Vous l'aimez par élan, oui, mais aussi parce qu'il comble ce vide affectif que vous portez depuis toujours. Sa générosité vous nourrit plus que vous ne la nourrissez — un échange discrètement inversé. Pour le libérer de ce piège, il faudrait d'abord reconnaître que vous-même êtes encore dedans.",
  },
  "2-3": {
    pointsForts: "Vous adorez son énergie et célébrez ses succès avec un enthousiasme sincère. Il se sent vu et valorisé.",
    vigilances: "S'il sent qu'il doit performer pour mériter votre amour, il devient un « petit adulte » qui s'oublie.",
    conseil: "Aimez-le quand il échoue, pas seulement quand il gagne. Et dites-lui que vous l'aimeriez même s'il ne faisait rien de spécial.",
    parentSoutien: "Il rentre de l'école avec une super note. Vous dites « bravo mon amour », vous préparez son goûter préféré, vous téléphonez à mamie pour lui dire. Votre intention est pure. Mais lui apprend vite : le grand amour de maman/papa suit les victoires. Et il continuera à collectionner les victoires comme on nourrit quelqu'un qu'on a peur de perdre. Il ne s'arrêtera pas, même épuisé, parce que son carburant sera devenu votre regard.",
    parentChallenge: "Sa capacité à se vendre, à charmer, à « réussir socialement » vous impressionne et vous gêne à la fois. Vous sentez qu'il y a quelque chose de calculé, et ça vous heurte dans votre croyance que l'amour est au-dessus des stratégies. Mais vous oubliez que votre générosité est elle aussi une stratégie — plus élégante, mais aussi une façon de se rendre nécessaire. Lui fait juste la version plus visible de ce que vous faites en sourdine.",
  },
  "2-4": {
    pointsForts: "Vous accueillez ses émotions intenses sans en avoir peur. Il se sent compris dans sa différence.",
    vigilances: "Vous voulez le consoler, lui veut être entendu dans sa douleur. Vos solutions trop rapides le ferment.",
    conseil: "Tenez l'espace de ses émotions sans chercher à résoudre. Parfois il a juste besoin d'être avec vous, en silence.",
    parentSoutien: "Il est triste, replié dans sa chambre. Vous entrez, vous vous asseyez près de lui, vous lui dites « dis-moi ce qui ne va pas, je suis là ». Vous pensez offrir de la présence. Lui ressent une intrusion douce : vous voulez « réparer » son émotion pour vous rassurer, pas pour lui. Il apprendra à pleurer en silence, à vous épargner, à vivre ses tempêtes intérieures seul pour ne pas vous inquiéter.",
    parentChallenge: "Cet enfant refuse votre consolation quand vous en avez le plus envie. Vous voulez être celui/celle qui sauve, il préfère traverser sa nuit. Son repli vous blesse profondément parce qu'il vous prive de votre rôle. C'est exactement là votre travail : apprendre que l'aimer, parfois, c'est accepter de ne pas être utile. Peu de choses vous coûteront autant.",
  },
  "2-5": {
    pointsForts: "Vous voyez sa profondeur derrière sa réserve. Vous pouvez créer un lien intime sans pression.",
    vigilances: "Il a besoin d'espace pour se ressourcer. Vos élans affectifs trop fréquents l'épuisent et le font fuir.",
    conseil: "Respectez ses zones de solitude — ce n'est pas un rejet. Approchez-vous par les idées, pas seulement par le câlin.",
    parentSoutien: "Vous entrez dans sa chambre avec un sourire, un chocolat chaud, une intention joyeuse. Il lève les yeux, presque froid : « tu peux fermer la porte s'il te plaît ? ». Votre cœur se serre — vous pensez qu'il vous rejette. Mais il vous aime, à sa façon. Chaque intrusion « pour son bien » est un prélèvement d'énergie sur un réservoir déjà petit. Il apprendra que l'amour, c'est de l'envahissement légitimé.",
    parentChallenge: "Son besoin d'isolement vous fait mal au ventre — vous le vivez comme un rejet personnel, vous cherchez ce que vous avez fait de mal. Rien. Il a juste une autre économie de l'énergie. Son indépendance vous renvoie à votre peur existentielle : celle de n'être pas indispensable. L'aimer à travers sa distance est l'un des travaux les plus durs qu'il puisse vous demander.",
  },
  "2-6": {
    pointsForts: "Votre chaleur constante apaise son anxiété. Il sait qu'il peut compter sur vous quoi qu'il arrive.",
    vigilances: "Si vous montrez vous-même de l'inquiétude, il l'absorbe et la décuple. Votre calme est son ancre.",
    conseil: "Soyez la « base sûre » qui ne tremble pas. Et encouragez son autonomie progressive — il a besoin d'apprendre qu'il peut s'en sortir seul.",
    parentSoutien: "Il vous pose pour la dixième fois la même question rassurante : « tu m'aimes même si… ? ». Vous répondez évidemment oui, chaque fois, patiemment. Mais votre patience n'est pas neutre — il la sent, il sent qu'il vous épuise, et cela ajoute à son anxiété au lieu de la calmer. Sa sécurité ne viendra pas de vos mots doux à répétition. Elle viendra de votre fiabilité silencieuse, celle qui ne demande pas de « merci ».",
    parentChallenge: "Sa méfiance instinctive vous blesse — vous qui donnez tant, il doute de vous. Et cette méfiance touche exactement là où ça fait mal : votre attente secrète de gratitude. Vous voulez être aimé·e en retour de ce que vous donnez. Lui ne joue pas ce jeu. Il vous demande de l'aimer sans solde, sans retour garanti — la seule forme d'amour qui puisse vraiment le sécuriser.",
  },
  "2-7": {
    pointsForts: "Sa joie de vivre vous remplit. Vous savez participer à ses aventures sans étouffer son enthousiasme.",
    vigilances: "Il fuit les émotions difficiles. Si vous évitez aussi, vous l'aidez à se construire une carapace de gaieté.",
    conseil: "Aidez-le à nommer la tristesse, la peur, la déception. Restez disponible quand la fête est finie.",
    parentSoutien: "Il vous échappe, encore. Vous aviez prévu un moment ensemble, il a accepté mille autres choses entre-temps. Votre réaction n'est pas une colère franche — c'est une petite phrase : « ce n'est pas grave, fais comme tu veux ». Mais le ton est là, et lui capte parfaitement votre déception enveloppée. Il apprendra à vous éviter pour ne pas sentir cette culpabilité collante. Vous perdrez exactement ce que vous cherchiez : sa présence libre.",
    parentChallenge: "Sa fuite vers l'ailleurs vous met à plat. Vous avez toujours cru qu'aimer, c'était être là, dispo, présent — il vous dit que parfois, aimer c'est partir. Son désir de liberté vous confronte à votre propre dépendance affective, cette peur silencieuse d'être seul·e. Le libérer signifie lâcher la corde invisible — et sentir, peut-être pour la première fois, le vide qu'il cache.",
  },
  "2-8": {
    pointsForts: "Vous voyez son cœur tendre derrière la carapace. Avec vous, il peut baisser sa garde.",
    vigilances: "Il refuse d'être materné. Vos « mon bébé » et vos câlins envahissants déclenchent sa rébellion.",
    conseil: "Aimez-le avec respect, pas avec mièvrerie. Reconnaissez sa force au lieu de la voir comme un problème à adoucir.",
    parentSoutien: "Vous lui dites « tu pourrais être un peu plus gentil avec ta sœur ». Il vous regarde et répond « non ». Pas agressif — juste clair. Votre sang ne fait qu'un tour : comment peut-il vous dire non comme ça ? Parce qu'il ne joue pas à votre jeu. Il n'a pas appris que l'amour, c'est obéir à la demande affective camouflée. Votre travail n'est pas de le faire plier — c'est d'apprendre de lui qu'on peut dire non sans cesser d'aimer.",
    parentChallenge: "Cet enfant ne vous récompense pas, et ça vous brise quelque chose. Vous donnez, il ne remercie pas. Vous proposez, il prend ce qu'il veut. Vous voulez aimer, il veut respecter. Votre Orgueil d'aide se cogne à sa pure verticalité, et il vous oblige à choisir : continuer à donner pour obtenir, ou apprendre à donner juste parce que c'est donner. Seule la deuxième voie le gardera près de vous.",
  },
  "2-9": {
    pointsForts: "Tendresse paisible, foyer doux. Vous vous accordez naturellement sur le rythme et l'harmonie.",
    vigilances: "Vous deux évitez le conflit. Mais un enfant a besoin d'apprendre à dire ce qui ne va pas.",
    conseil: "Modélisez le « non » bienveillant. Et provoquez gentiment ses choix — il a tendance à dire « comme tu veux ».",
    parentSoutien: "Il accepte tout ce que vous proposez, toujours. Vous avez un enfant rêvé. Mais regardez bien : quand vous lui demandez « tu préférerais A ou B ? », il dit « comme tu veux ». Il a compris très tôt que son désir à lui pesait moins que votre envie de bien faire. Il vous donne de la paix, vous lui donnez de l'inexistence. L'échange est profondément inégal.",
    parentChallenge: "Son effacement vous rassure et vous alerte en même temps. Rassure parce qu'il ne conteste rien. Alerte parce qu'il ne vous demande rien non plus — et ça, ça vous prive de votre rôle. Cet enfant vous oblige à aimer quelqu'un qui ne vous appelle pas. Accepter qu'il existe sans que vous l'aidiez à exister, c'est peut-être le plus grand cadeau que vous puissiez lui faire.",
  },

  // ── Parent Type 3 ──
  "3-1": {
    pointsForts: "Vous reconnaissez son besoin de bien faire et célébrez ses efforts. Belle alliance sur la qualité du travail.",
    vigilances: "Vous voulez de la performance visible, lui veut faire les choses correctement. Tension sur les moyens vs les résultats.",
    conseil: "Valorisez son intégrité même quand elle ralentit le projet. Et apprenez-lui que l'image n'est pas tout dans la vie.",
    parentSoutien: "Il vous montre son cahier tenu impeccablement, avec fierté. Votre œil, habitué à évaluer, part directement vers le résultat : « combien tu as eu ? ». Pour lui qui a mis son âme dans la forme, la forme elle-même comptait. Il comprend que pour vous, le processus n'existe que s'il produit un trophée. Il apprendra à optimiser ce qui se voit — et à mépriser ce qu'il aime vraiment.",
    parentChallenge: "Sa lenteur minutieuse vous rend dingue — vous avez mille choses à faire et il peaufine un trait. Mais ce qui vous agace, c'est exactement ce que vous avez sacrifié en vous : le soin pour le soin, le travail bien fait parce que c'est juste. Vous confondez son éthique avec de l'inefficacité. Lui, lucide, sent cette confusion — et elle l'humilie.",
  },
  "3-2": {
    pointsForts: "Vous êtes touché par sa générosité naturelle et savez la valoriser. Il s'épanouit dans votre admiration.",
    vigilances: "Vous l'utilisez parfois sans vous en rendre compte. Il donne sans rien demander — vous prenez sans rien rendre.",
    conseil: "Remerciez-le explicitement. Aidez-le à exprimer ses propres besoins, pas seulement à servir les vôtres.",
    parentSoutien: "Il vous offre un dessin qu'il a fait pour vous. Votre premier réflexe est « oh merci chéri » — puis votre cerveau part ailleurs, sur vos messages, sur la prochaine tâche. Lui reste avec son dessin dans les mains, comprenant que l'affection qu'il tendait ne mérite pas une vraie pause. Il ne vous en voudra pas. Il apprendra juste à tendre moins, et à se consoler tout seul.",
    parentChallenge: "Cet enfant vous aime pour qui vous êtes quand vous ne performez pas. Et ça vous déstabilise profondément — parce que vous ne savez pas qui vous êtes en dehors du rôle. Sa chaleur inconditionnelle vous met face au vide identitaire que vous avez comblé par l'action. Le recevoir vraiment exigerait d'abord d'arrêter la course. Vous ne savez pas comment.",
  },
  "3-3": {
    pointsForts: "Vous comprenez sa quête de réussite et savez la canaliser. Vous parlez la même langue du résultat.",
    vigilances: "Risque d'élever un « petit performeur » coupé de lui-même. Il vous imite — y compris dans vos angles morts.",
    conseil: "Montrez-lui que vous l'aimez quand il échoue, pas seulement quand il brille. Modélisez le repos et la vulnérabilité.",
    parentSoutien: "Il revient avec une coupe, vous vous félicitez l'un l'autre, c'est la fête à la maison. Mais au fond de la soirée, une question flotte sans être posée : et s'il n'avait pas gagné ? Vous ne l'aimeriez pas moins, vous en êtes sûr·e. Mais lui n'en est pas sûr. Parce qu'il ne vous a jamais vu·e vraiment fêter autre chose que la victoire. Il courra toute sa vie pour ne pas avoir à tester votre amour dans l'échec.",
    parentChallenge: "Cet enfant est exactement ce que vous êtes devenu·e — brillant, adaptable, stratégique. Vous le regardez et vous devinez déjà son avenir. Le problème : vous savez aussi ce que vous n'avez jamais trouvé derrière votre propre réussite. L'aimer jusqu'à lui épargner ce chemin exigerait d'admettre que votre propre chemin était peut-être une impasse. Et ça, c'est l'aveu le plus cher.",
  },
  "3-4": {
    pointsForts: "Sa créativité vous fascine. Vous savez la mettre en valeur sans la dénaturer.",
    vigilances: "Vous voulez du résultat, lui veut de l'authenticité. Vos accélérations brisent son processus créatif.",
    conseil: "Respectez son rythme intérieur. Et n'essayez pas de transformer son originalité en produit vendable.",
    parentSoutien: "Il traîne, il ne veut pas participer à la compétition, il préfère « rester dans sa chambre à dessiner ». Votre réaction part : « tu pourrais essayer, tu es doué ». Vous voulez le pousser vers ce qui vous semble une belle vie. Mais ce que vous appelez « doué » touche rarement ce qui compte pour lui. Il apprendra à cacher ses passions mal rentables, ou à les abandonner. Ce qu'il appelait son monde deviendra sa honte.",
    parentChallenge: "Sa profondeur sans trophée vous déroute — il peut passer une heure sur une émotion sans rien produire. Vous ressentez alors un malaise : et si la vie n'était pas faite que de KPIs ? Cet enfant vous pose la question que vous avez enterrée à 12 ans pour vous permettre de fonctionner. La réveiller maintenant, c'est renégocier ce que vous avez cru être votre force.",
  },
  "3-5": {
    pointsForts: "Vous respectez sa profondeur intellectuelle et savez l'encourager dans ses passions.",
    vigilances: "Vous bougez vite, lui réfléchit lentement. Vos demandes d'action immédiate le bloquent.",
    conseil: "Laissez-lui le temps d'analyser avant d'agir. Et acceptez qu'il ne soit pas démonstratif — son amour passe par l'attention, pas par l'expression.",
    parentSoutien: "Il ne fait pas ses devoirs, il lit depuis deux heures un truc sur les oiseaux migrateurs. Votre agacement monte : « c'est pas ce qui est noté, concentre-toi ». Pour lui, apprendre vraiment n'a rien à voir avec la note. Chaque fois que vous le ramenez au barème, vous lui enseignez que la connaissance n'a de valeur que si elle est vérifiée par le système. Il deviendra peut-être un bon élève — et un adulte qui a perdu sa curiosité.",
    parentChallenge: "Son indifférence totale à votre regard vous blesse secrètement. Vous avez bâti votre identité sur l'admiration reçue, lui refuse le jeu. Il pense par lui-même, il s'intéresse seul, il ne vous demande pas de valider. Ce que vous appelez sa « distance » est en réalité sa souveraineté — et elle vous confronte à tout ce que vous avez cédé pour être aimé·e des autres.",
  },
  "3-6": {
    pointsForts: "Votre énergie et votre confiance en l'avenir le rassurent. Vous lui montrez qu'on peut avancer malgré les doutes.",
    vigilances: "Vous foncez, lui anticipe les risques. Si vous écrasez ses craintes, il les enfouit et l'anxiété explose ailleurs.",
    conseil: "Prenez ses inquiétudes au sérieux avant de les dépasser. Sa prudence n'est pas un frein — c'est une intelligence.",
    parentSoutien: "Il doute, encore, avant de lancer un projet : « et si je n'y arrive pas ? ». Votre réponse part en mode coach : « mais si, vas-y, t'es capable ! ». Intention louable. Effet : il sent que vous ne prenez pas sa peur au sérieux, que vous êtes déjà passé·e à la phase « mobilisation ». Il apprendra à simuler la confiance pour vous rassurer, tout en portant son doute seul. Sa peur ne disparaîtra pas — elle deviendra juste invisible.",
    parentChallenge: "Sa prudence vous exaspère souvent — pourquoi ne fonce-t-il pas ? Mais cette prudence est précisément ce que votre jeunesse a écrasé en vous. Vous avez foncé, oui, et vous avez construit. Mais vous avez aussi perdu quelque chose en route : la permission de dire « je ne sais pas ». Lui l'habite naturellement, et ça réveille en vous une nostalgie que vous ne savez pas nommer.",
  },
  "3-7": {
    pointsForts: "Vous adorez son énergie et savez l'embarquer dans des projets stimulants. Duo dynamique et joyeux.",
    vigilances: "Vous avez tous les deux du mal avec les émotions difficiles. Vous risquez de toujours fuir vers la suite.",
    conseil: "Apprenez-lui à finir ce qu'il commence. Et osez les conversations sérieuses, même quand c'est inconfortable.",
    parentSoutien: "Il démarre trois projets en même temps, abandonne avant la fin, enchaîne sur un quatrième. Votre réaction : « finis au moins un truc ». Votre intention : le discipliner. Son entendement : même les moments de pure joie doivent produire un résultat. Vous voulez le structurer — en réalité, vous voulez qu'il devienne un petit vous, efficace et focalisé. Il finira par choisir un seul chemin, mais pas le sien : le vôtre.",
    parentChallenge: "Sa dispersion joyeuse vous heurte parce qu'elle ressemble dangereusement à ce que vous appelez « le manque de caractère ». Mais regardez mieux : lui vit, vous performez. Il prend ce que la vie offre sans avoir besoin de prouver quelque chose. Vous, vous ne goûtez rien sans objectif. Son gaspillage apparent vous renvoie à votre propre pénurie affective.",
  },
  "3-8": {
    pointsForts: "Vous reconnaissez sa puissance et savez la canaliser. Il vous respecte parce que vous ne pliez pas.",
    vigilances: "Deux personnalités fortes peuvent rivaliser. Si vous gagnez toujours, il se braque ; si vous cédez toujours, il vous méprise.",
    conseil: "Soyez ferme sans être autoritaire. Reconnaissez sa force comme un atout, pas comme un problème.",
    parentSoutien: "Il refuse votre façon de faire, frontalement, sans négocier. Votre instinct : hausser le niveau, utiliser votre autorité. Mais ça ne marche pas avec lui — il ne cède pas à l'autorité sociale, il cède uniquement à l'autorité incarnée. Chaque fois que vous tentez de le faire plier par statut, vous perdez son respect. Et le respect, chez lui, une fois perdu, est très dur à reconstruire.",
    parentChallenge: "Cet enfant ne peut pas être géré — et ça vous enrage parce que vous gérez tout, partout, toujours. Sa pure volonté vous rappelle que l'image et la stratégie ne fonctionnent que sur ceux qui les respectent. Lui non. Vous êtes obligé·e de redescendre à ce que vous avez laissé derrière vous à 10 ans : la vérité brute, le mot qui tient, l'engagement sans paillettes. C'est brutal.",
  },
  "3-9": {
    pointsForts: "Votre dynamisme le sort doucement de sa torpeur. Sa sérénité vous rappelle de ralentir.",
    vigilances: "Votre rythme rapide le fait disparaître. Il dit « oui » mais s'absente intérieurement pour se protéger de votre énergie.",
    conseil: "Ralentissez quand vous lui parlez. Demandez-lui son avis et attendez vraiment la réponse — elle vient lentement.",
    parentSoutien: "Il accepte tout, ne demande rien, vous suit sans protester. Vous avez un enfant « facile » selon votre entourage. Mais regardez où il disparaît : dans les coins, dans les rêveries, dans le oui automatique. Vous le chargez d'un programme qui n'est pas le sien, et il se plie parce qu'il n'a pas encore appris à revendiquer un espace. Vous construisez sa vie pendant qu'il se dissout. Un jour il ne répondra plus. Et vous ne comprendrez pas pourquoi.",
    parentChallenge: "Sa lenteur, son non-engagement, ce moule où rien ne s'imprime vraiment — tout ça vous exaspère. Mais son inertie est exactement le contraire de votre fuite en avant, et elle vous oblige à rester immobile avec lui. Dans cette immobilité, une vérité remonte : vous courez peut-être pour ne pas avoir à vous rencontrer. Lui, en ne bougeant pas, vous propose ce rendez-vous.",
  },

  // ── Parent Type 4 ──
  "4-1": {
    pointsForts: "Vous reconnaissez la beauté de sa rigueur et la valorisez. Il se sent vu dans sa singularité.",
    vigilances: "Votre intensité émotionnelle peut le déstabiliser. Il a besoin de constance, pas de vagues.",
    conseil: "Stabilisez votre humeur autour de lui. Et célébrez sa différence à votre manière — il est unique, mais à sa façon, pas à la vôtre.",
    parentSoutien: "Vous traversez une phase émotionnelle intense, vous partagez vos états avec tous — y compris lui. Votre idée : l'éduquer à la vie émotionnelle riche. Mais lui, petit 1 en construction, a besoin de cadre stable pour se développer. Chaque vague d'humeur que vous partagez devient pour lui une incertitude fondatrice. Il apprendra à marcher sur des œufs, à surveiller votre visage au lieu de construire le sien.",
    parentChallenge: "Sa rigueur tranquille vous ennuie parfois — vous trouvez qu'il manque de vie intérieure, de drama. Mais cette rigueur est précisément la stabilité que vous n'avez jamais su vous offrir. Son besoin d'ordre révèle votre dépendance au chaos intérieur, cette façon de confondre intensité et profondeur. Apprendre de lui, c'est accepter que la paix n'est pas l'inverse de la vie.",
  },
  "4-2": {
    pointsForts: "Vous accueillez sa générosité avec une vraie reconnaissance. Il sent que vous voyez son cœur.",
    vigilances: "Votre intensité peut l'écraser. Il met ses propres émotions de côté pour gérer les vôtres.",
    conseil: "Veillez à ne pas inverser les rôles. C'est à vous de tenir l'espace émotionnel, pas à lui.",
    parentSoutien: "Il vous offre un câlin spontané. Votre tête part ailleurs dans l'instant — dans un passé triste, dans un souci, dans un poème intérieur. Vous lui rendez le câlin mais sans y être vraiment. Son petit cœur sent la distance immédiatement, même à 4 ans. Il apprendra à se contenter d'un amour tiède, ou pire, à devenir le psychologue de son parent pour obtenir un peu de votre présence pleine.",
    parentChallenge: "Cet enfant vous aime de façon simple, fluide, inconditionnelle — et ça vous trouble parce que vous n'avez jamais cru possible qu'on vous aime sans complication. Vous cherchez le sens profond de son amour, vous le questionnez, vous le compliquez. Lui veut juste être là avec vous. Recevoir sa simplicité, c'est accepter que l'amour n'ait pas toujours besoin d'être intense pour être vrai.",
  },
  "4-3": {
    pointsForts: "Vous voyez sa profondeur derrière son besoin de réussir. Vous savez l'aider à se connecter à lui-même.",
    vigilances: "Vos « tu vaux mieux que la course aux résultats » peuvent être perçus comme un rejet de ce qu'il aime.",
    conseil: "Honorez son besoin de briller — ce n'est pas un défaut. Aidez-le à trouver l'authenticité DANS la performance, pas contre elle.",
    parentSoutien: "Il gagne une compétition, tout content. Votre félicitation s'accompagne d'une petite phrase : « mais bon, tu sais, l'important c'est pas ça ». Vous pensez lui offrir de la profondeur. Lui reçoit : « maman/papa trouve ma joie superficielle ». Il apprendra à ne pas partager ses succès avec vous, à les célébrer ailleurs, avec ceux qui savent juste dire « bravo » sans relativiser.",
    parentChallenge: "Son besoin visible de réussir vous semble presque vulgaire. Mais cette « superficialité » est en réalité une capacité que votre intensité vous a enlevée : faire les choses pour elles-mêmes, habiter le présent sans le poison du « mais pour quoi vraiment ? ». Vous lui enseignez la profondeur — lui pourrait vous enseigner la fluidité. L'échange vous intimide parce qu'il vous obligerait à quitter votre profondeur comme refuge.",
  },
  "4-4": {
    pointsForts: "Vous vous comprenez en profondeur, sans mots. Complicité émotionnelle rare et précieuse.",
    vigilances: "Risque de cocon mélancolique. Deux 4 ensemble peuvent s'enfermer dans l'intensité et perdre le contact avec le réel.",
    conseil: "Cultivez la légèreté, le rire, le quotidien banal. Il a besoin de stabilité émotionnelle, pas d'un miroir d'intensité.",
    parentSoutien: "Vous êtes tous les deux dans une ambiance mélancolique un dimanche, vous vous comprenez sans parler. Vous trouvez ça magnifique. Mais pour lui, petit 4, ces moments deviennent des nids. Il y apprend qu'être triste ensemble est plus intime qu'être joyeux ensemble. Il cherchera toute sa vie des partenaires qui partagent la tristesse — parce qu'il aura reçu, de vous, l'équation : mélancolie partagée = amour vrai.",
    parentChallenge: "Cet enfant est votre miroir, et il vous charme autant qu'il vous effraie. Vous reconnaissez chaque oscillation d'humeur, chaque phase sombre. Vous voulez le sauver de ce qui vous a abîmé·e — et en même temps vous adorez cette intimité commune. Le libérer exige de choisir : entretenir votre lien privilégié dans la douleur, ou l'aider à en sortir même au prix de moins de communion. La seconde voie est plus solitaire pour vous.",
  },
  "4-5": {
    pointsForts: "Vous respectez son besoin d'espace et de profondeur. Relation riche, faite de moments choisis.",
    vigilances: "Vous deux pouvez vous isoler et créer une bulle où le monde extérieur n'existe plus.",
    conseil: "Forcez-vous à sortir, à inviter, à montrer le monde large. Il a besoin de stimulation extérieure pour ne pas se renfermer.",
    parentSoutien: "Il se retire dans sa bulle mentale, vous le sentez loin. Votre réflexe : essayer de le reconnecter, chercher à savoir ce qu'il pense, lui demander ce qu'il ressent. Vos questions, bien intentionnées, lui sont des ponctions d'énergie. Il apprendra à simuler la conversation, à donner le minimum pour que vous le laissiez tranquille, tout en se sentant coupable de cette stratégie.",
    parentChallenge: "Sa capacité à vivre sans ressentir intensément vous déstabilise profondément. Vous pensez qu'il manque quelque chose — il pense la même chose de vous. Sa frugalité émotionnelle n'est pas une pauvreté, c'est un autre langage. La reconnaître vous oblige à remettre en cause votre croyance centrale : que ressentir fort égale vivre vrai. Vous ne voulez pas de cette remise en question. Elle est pourtant juste.",
  },
  "4-6": {
    pointsForts: "Vous accueillez ses peurs avec empathie. Il se sent vraiment compris dans ses inquiétudes.",
    vigilances: "Votre intensité émotionnelle nourrit son anxiété. S'il sent que rien n'est stable, il panique.",
    conseil: "Stabilisez vos humeurs et tenez vos engagements. La prévisibilité est plus précieuse que la profondeur pour cet enfant.",
    parentSoutien: "Vous traversez une tempête intérieure et vous le lui montrez (le visage défait, le soupir profond). Vous croyez être transparent·e, authentique. Lui, hyper-vigilant, capte votre orage comme une menace vitale. Ses nuits deviennent peuplées de scénarios, son anxiété explose — et vous ne comprenez pas d'où elle vient. Votre authenticité émotionnelle est, pour un 6, une catastrophe invisible.",
    parentChallenge: "Sa peur vous semble peu noble, peu profonde. Vous préférez la mélancolie à la panique. Mais cette hiérarchie des souffrances est un privilège : vous pouvez contempler la vôtre, lui doit survivre à la sienne. Apprendre à respecter sa peur, c'est apprendre que toutes les émotions ne sont pas des matières esthétiques. Certaines demandent juste à être apaisées, pas magnifiées.",
  },
  "4-7": {
    pointsForts: "Sa joie vous éclaire. Vous savez aussi reconnaître sa profondeur cachée derrière l'enthousiasme.",
    vigilances: "Vos états d'âme intenses le poussent à fuir vers le divertissement. Il se construit une carapace joyeuse.",
    conseil: "Allégez votre intensité quand vous êtes avec lui. Et apprenez-lui à toucher ses émotions difficiles sans les fuir.",
    parentSoutien: "Il rigole d'un truc qui vous paraît bête. Votre réaction part un peu bas : « t'as pas mieux comme humour ? ». Vous pensez l'éduquer au bon goût. Lui reçoit : ma joie est banale. Il apprendra à modérer ses rires devant vous, à garder son excitation pour ailleurs. Votre maison deviendra un endroit sérieux, où il faut mériter la joie par la profondeur. Il préférera la maison des copains.",
    parentChallenge: "Sa légèreté vous met parfois en colère, et vous ne savez pas bien pourquoi. Parce qu'elle est gratuite, qu'elle ne paie pas son ticket d'entrée par la souffrance ? Parce qu'elle menace votre théorie que la vie sérieuse est une vie plus noble ? Cet enfant, en riant de rien, vous demande si vous n'auriez pas fait de votre tristesse une identité plutôt qu'un moment traversé.",
  },
  "4-8": {
    pointsForts: "Vous voyez sa vulnérabilité derrière la force. Avec vous, il peut être tendre sans avoir honte.",
    vigilances: "Vos vagues émotionnelles le poussent à se durcir pour se protéger. Il devient son propre rempart.",
    conseil: "Soyez stable et fiable. Sa force ne demande qu'à devenir tendresse — mais seulement dans un cadre sûr.",
    parentSoutien: "Il écrase sa sœur en jeu, vous le reprenez « sois plus doux ». Il ne comprend pas ce que vous voulez dire. Pour vous, la douceur est un signe de sophistication intérieure. Pour lui, elle est un mensonge social. Chaque fois que vous l'invitez à « nuancer », vous le coupez de sa vitalité brute — celle-là même qui vous fascine et vous fait peur à la fois. Il apprendra à se retenir, ou à exploser.",
    parentChallenge: "Sa force vous intimide et vous subjugue. Vous, vous êtes dans l'intériorité, dans la nuance, dans l'ombre. Lui est dans l'acte, la clarté, l'impact. Sa capacité à agir sans tergiverser vous rappelle que votre profondeur est parfois un alibi pour ne jamais décider. L'aimer vraiment signifie admettre qu'il y a des formes de justesse qui n'ont rien à voir avec le ressenti — et qu'il en a une.",
  },
  "4-9": {
    pointsForts: "Sa douceur vous apaise. Vous savez ressentir avec lui sans le forcer à parler.",
    vigilances: "Votre intensité l'efface. Il s'absente pour ne pas porter vos émotions, et vous perdez le contact avec lui.",
    conseil: "Régulez votre intensité, posez des questions ouvertes, écoutez les silences. Sa parole vient lentement.",
    parentSoutien: "Vous proposez une discussion « importante », il dit oui. Pendant que vous parlez avec intensité, il hoche la tête mais son regard est ailleurs. Vous pensez qu'il écoute. Il n'écoute pas — il se protège. Votre densité émotionnelle le submerge, et il a développé cette capacité d'être présent physiquement et absent intérieurement. Il aura sa vie entière cette stratégie de fusion invisible pour survivre aux gens trop intenses.",
    parentChallenge: "Son effacement vous exaspère et vous attriste à la fois. Mais regardez bien : il s'efface parce que votre présence prend tout l'air. Votre Envie cherche constamment la singularité — la sienne, celle des autres, la profondeur — et lui disparaît dans votre quête. Le rencontrer demande de lui laisser d'abord un espace où vous n'êtes pas. C'est votre travail le plus dur.",
  },

  // ── Parent Type 5 ──
  "5-1": {
    pointsForts: "Vous respectez son sens du devoir et l'accompagnez avec calme. Vous lui apportez la profondeur derrière la rigueur.",
    vigilances: "Vous êtes peu démonstratif, lui cherche votre approbation. Votre silence est interprété comme une critique.",
    conseil: "Verbalisez votre fierté — il ne la devine pas. Et offrez-lui des explications de fond, pas juste des évaluations.",
    parentSoutien: "Il vient vous montrer un truc, tout fier·ère. Vous êtes concentré·e, vous levez à peine les yeux, vous dites « c'est bien ». Pour vous c'est une réponse courtoise. Pour lui qui a besoin de voir dans votre regard la confirmation que son effort compte, c'est une absence. Il apprendra à ne plus vous déranger. Plus tard, il ne comprendra pas pourquoi il a besoin de l'approbation de tout le monde — sauf de la sienne.",
    parentChallenge: "Son besoin constant de validation vous épuise et vous semble excessif. Mais cet enfant n'est pas « trop demandant » — c'est vous qui êtes trop économe. Votre rétention affective, que vous appelez « respect de son autonomie », est pour lui un désert. Admettre cela coûte cher : cela signifie que votre distance, que vous croyez protectrice, crée exactement l'anxiété que vous lui reprochez.",
  },
  "5-2": {
    pointsForts: "Vous lui offrez l'espace de penser et d'être seul, ce qu'il sait apprécier mais peu d'enfants reçoivent.",
    vigilances: "Il a besoin de chaleur affective explicite. Votre retenue émotionnelle peut être vécue comme un rejet.",
    conseil: "Faites des câlins, dites « je t'aime » à voix haute. La distance n'est pas une option pour cet enfant.",
    parentSoutien: "Il vient dans votre bureau pour vous raconter sa journée, il déborde d'énergie. Vous êtes dans un problème intellectuel, vous répondez distrait·e. Il repart, moins brillant qu'en entrant. Vous avez économisé votre énergie — et il a perdu la sienne. Il apprendra que son flux vital est une nuisance pour ceux qu'il aime. Il le muselera progressivement, jusqu'à ne plus savoir comment on raconte sa journée à quelqu'un.",
    parentChallenge: "Son besoin constant de contact vous fatigue profondément. Vous le vivez comme un prélèvement, alors qu'il s'agit d'un élan. Ce qu'il vous demande — être là, juste là — est ce qui vous coûte le plus cher. Pas parce que vous ne l'aimez pas, mais parce que chaque contact est une dépense que votre économie intérieure ne peut pas se permettre. Ce n'est pas lui le problème : c'est votre stock.",
  },
  "5-3": {
    pointsForts: "Vous tempérez son agitation par votre calme. Il apprend à réfléchir avant d'agir grâce à vous.",
    vigilances: "Il a besoin de votre admiration enthousiaste. Vos analyses froides de ses succès l'éteignent.",
    conseil: "Manifestez votre fierté avec des mots et de l'énergie. Et participez à ses victoires au lieu de les commenter.",
    parentSoutien: "Il revient de l'école avec sa médaille, il l'agite devant vous. Votre cerveau évalue rationnellement : « c'est bien, continue ». Lui attend autre chose — un éclat dans vos yeux, une célébration chaleureuse. Votre approbation froide ne nourrit pas son besoin de regard admiratif. Il ira le chercher ailleurs, avec une intensité qui grandira avec les années. Vous aurez construit, sans le vouloir, un adulte dépendant du regard des autres.",
    parentChallenge: "Son besoin constant d'être vu vous semble vulgaire, presque. Vous avez construit votre valeur dans l'invisibilité, dans le travail souterrain, dans la connaissance qui ne s'affiche pas. Lui affirme le contraire : il veut être regardé, et il en a besoin. Votre silence n'est pas de la profondeur à ses yeux — c'est un manque. Il vous confronte à la possibilité que la visibilité soit aussi une forme de vie légitime.",
  },
  "5-4": {
    pointsForts: "Vous respectez son monde intérieur et sa créativité. Vous savez communiquer en profondeur sans surcharge.",
    vigilances: "Il a besoin de connexion émotionnelle, pas seulement intellectuelle. Votre froideur apparente le blesse.",
    conseil: "Asseyez-vous près de lui. Touchez-le, regardez ses créations longuement. La présence physique compte autant que les idées.",
    parentSoutien: "Il pleure pour quelque chose qui vous semble disproportionné. Votre réaction : analyse rationnelle, « mais pourquoi tu réagis comme ça ? ». Votre intention : comprendre. Son vécu : vous cherchez à invalider son émotion par la logique. Il apprendra à ne plus partager ses états intérieurs avec vous. Vous continuerez à penser qu'il est « mystérieux », alors que c'est vous qui avez fermé la porte.",
    parentChallenge: "Cet enfant vous ressemble dans le retrait, mais pour des raisons radicalement différentes. Vous vous protégez de l'envahissement, lui cultive sa souffrance comme une singularité. Sa façon de transformer ses émotions en art vous fascine et vous agace — parce qu'elle révèle que vous avez peut-être, vous aussi, transformé votre retrait en identité. Juste avec moins de drama.",
  },
  "5-5": {
    pointsForts: "Vous vous comprenez sans mots. Respect mutuel des silences et de l'espace personnel.",
    vigilances: "Risque de relation parallèle où chacun vit dans son monde. Il a besoin de plus que vous.",
    conseil: "Initiez le contact malgré votre nature réservée. Asseyez-vous dans sa chambre, partagez une activité — la présence suffit.",
    parentSoutien: "Vous êtes deux dans la même pièce, chacun dans son monde, personne ne dérange personne. Vous appelez ça « respect mutuel ». Mais il apprend, de vous, que l'amour entre proches ressemble à une cohabitation courtoise. Il construira des relations adultes sur ce modèle — propres, économiques, sans friction. Et il se demandera, plus tard, pourquoi rien ne le bouleverse jamais vraiment.",
    parentChallenge: "Cet enfant est votre miroir exact, et c'est précisément le problème. Vous vous comprenez sans mots, vous respectez chacun votre espace, rien ne grince. C'est confortable. C'est aussi le piège ultime : personne ne vous tire hors de votre économie, personne n'exige votre présence entière. Sa ressemblance avec vous l'expose au même destin que vous — une vie mentalement riche, affectivement étroite.",
  },
  "5-6": {
    pointsForts: "Votre calme analytique apaise son anxiété. Vous lui apprenez à comprendre ses peurs au lieu d'y céder.",
    vigilances: "Il a besoin de chaleur explicite et constante. Votre distance émotionnelle peut alimenter son insécurité.",
    conseil: "Rassurez avec des mots ET des gestes. Et tenez vos rituels — pour lui, la prévisibilité est sécurisante.",
    parentSoutien: "Il vient vous demander pour la sixième fois si vous serez là demain pour le match. Votre réaction : « je l'ai dit, non ? ». Votre agacement est visible. Lui a besoin de cette répétition non pas pour l'information mais pour le lien — chaque « oui je serai là » dit avec chaleur est une brique de sécurité. Votre réponse aride lui confirme que votre amour est conditionnel à sa sobriété émotionnelle. Il l'apprendra.",
    parentChallenge: "Son anxiété vous exaspère parce qu'elle demande ce que vous ne savez pas donner : de la présence rassurante et répétée. Vous préférez la présence ponctuelle et « juste », économique. Mais cet enfant vous montre que votre économie est aussi une forme d'avarice — affective, cette fois. L'aimer exige d'accepter qu'il mérite plus que vous ne voulez dépenser. Cette bataille est avec vous-même.",
  },
  "5-7": {
    pointsForts: "Vous savez canaliser son énergie débordante en l'orientant vers la profondeur. Vous lui ouvrez de nouveaux mondes.",
    vigilances: "Son besoin de stimulation et de jeu peut vous épuiser. Vous risquez de vous retirer dans votre bulle.",
    conseil: "Acceptez de jouer même quand vous préféreriez lire. Et donnez-lui des règles — son énergie a besoin d'un cadre.",
    parentSoutien: "Il est en plein bavardage enthousiaste, vous l'écoutez à peine. Votre cerveau est ailleurs, votre énergie est comptée, vous notez juste les points principaux. Lui le sent et continue — mais quelque part, en lui, une déception s'inscrit. Vous lui apprenez sans le vouloir que son énergie est trop pour les autres. Un jour il baissera le volume. Son étincelle, qui fait son charme, se ternira d'abord en votre présence.",
    parentChallenge: "Cet enfant vous force à sortir, à parler, à répondre en temps réel. Vous le trouvez épuisant, mais c'est en réalité votre flèche d'intégration qui l'emprunte — l'engagement, la chaleur, la présence explosive. Votre stress à ses côtés n'est pas de la fatigue : c'est de l'inconfort de croissance. Ce qui vous étend est précisément ce qui le nourrit.",
  },
  "5-8": {
    pointsForts: "Votre calme apaise sa puissance. Vous ne vous laissez pas impressionner par sa force.",
    vigilances: "Il teste vos limites avec vigueur. Si vous vous retirez face à lui, il prend tout l'espace et perd ses repères.",
    conseil: "Tenez vos positions calmement. Et engagez-vous corporellement avec lui — bagarres pour rire, sport, action concrète.",
    parentSoutien: "Il vous teste sur tout, il veut tout négocier, il conteste vos règles. Votre stratégie : rester calme, expliquer rationnellement. Mais pour un 8 enfant, vos explications interminables sont perçues comme une faiblesse — la vraie autorité n'argumente pas, elle incarne. Chaque fois que vous expliquez au lieu de trancher, vous lui apprenez qu'il peut vous déstabiliser. Votre règne sera court.",
    parentChallenge: "Cet enfant porte exactement ce que vous avez laissé derrière vous : l'engagement corporel, la confrontation, la puissance non négociée. Il vous oblige à descendre de votre tour mentale pour incarner vos limites. C'est atroce. C'est aussi votre croissance la plus difficile — et la plus nécessaire. Il ne vous respectera que quand vous accepterez de vous tenir debout sans explication.",
  },
  "5-9": {
    pointsForts: "Deux profils paisibles qui apprécient le calme. Vous ne vous bousculez pas mutuellement.",
    vigilances: "Risque de vie parallèle dans le silence. Personne n'initie, personne ne demande, personne ne se rencontre vraiment.",
    conseil: "Forcez le contact régulier — un dîner, une promenade, une activité commune. Sans cela, vous vous éloignez doucement.",
    parentSoutien: "Il partage votre besoin de calme, votre rythme lent, votre amour du retrait. Vous êtes soulagé·e : un enfant qui ne vous prélève pas d'énergie. Mais cet enfant vous ressemble non par choix mais par défaut — il disparaît parce que personne ne le tire hors de lui. Votre absence active est pour lui une confirmation que sa présence n'intéresse pas. Il s'effacera tout seul, sans drame, et vous ne remarquerez rien avant très tard.",
    parentChallenge: "Son effacement tranquille vous arrange. Pas de conflit, pas d'exigence, pas de demande. C'est précisément le piège. Cet enfant vous montre ce que devient un 5 qui n'a jamais été tiré de son retrait : pas un sage, juste un absent. Son salut dépend de ce que vous n'aimez pas faire — déranger, interpeller, exiger sa présence. Votre amour passera par l'inconfort que vous fuyez.",
  },

  // ── Parent Type 6 ──
  "6-1": {
    pointsForts: "Vous lui apportez de la sécurité par votre fiabilité. Il s'épanouit dans votre cadre clair et constant.",
    vigilances: "Votre anxiété alimente son perfectionnisme. Il s'épuise à essayer d'éviter les catastrophes que vous redoutez.",
    conseil: "Travaillez VOTRE anxiété pour ne pas la lui transmettre. Et faites-lui confiance pour décider seul, à sa mesure.",
    parentSoutien: "Il est perfectionniste déjà, anxieux de bien faire. Vous, anxieux·se aussi, vous renforcez son cadre avec encore plus de règles « pour son bien ». Deux anxiétés qui se nourrissent mutuellement. Il comprend que le monde est effectivement dangereux, qu'il faut constamment se surveiller. Votre alliance de la prudence construit un enfant qui ne s'autorisera jamais à respirer. Vous ferez exactement de lui ce que votre propre enfance a fait de vous.",
    parentChallenge: "Son autocritique vous fait écho — vous reconnaissez l'anxiété morale, ce « et si j'avais mal fait ? ». Mais en voulant le rassurer, vous confirmez sa peur : vous ne la contestez jamais, vous la validez avec empathie. Ce qu'il lui faut, c'est quelqu'un qui ose lui dire « c'est pas grave » sans inquiétude. Pour faire ça, il vous faudrait d'abord vous le dire à vous.",
  },
  "6-2": {
    pointsForts: "Vous lui offrez chaleur et sécurité. Foyer affectueux et prévisible — il s'y sent profondément aimé.",
    vigilances: "Votre besoin de protection peut l'étouffer. Il apprend à se sacrifier pour ne pas vous inquiéter.",
    conseil: "Faites confiance à sa capacité à gérer le monde. Et apprenez-lui à dire « non » — y compris à vos demandes.",
    parentSoutien: "Il est chaleureux, il vous câline, il cherche votre affection. Vous, inquiet·ète par nature, scannez ce qu'il peut ne pas dire : « tu as eu un problème à l'école ? ». Votre vigilance, que vous croyez attentive, lui apprend que la proximité s'accompagne d'une enquête permanente. Il apprendra à vous rassurer avant lui-même. Son amour deviendra, sans que vous le voyiez, un travail de sécurisation.",
    parentChallenge: "Son amour spontané vous désarme — vous cherchez le piège, le « pourquoi » caché. Votre méfiance de fond ne supporte pas la gratuité. Cet enfant vous offre ce que votre propre enfance vous a peut-être refusé : une affection sans contrepartie. Le recevoir demande de déposer, juste un instant, le scanner. Vous ne savez pas si vous êtes capable de ce geste.",
  },
  "6-3": {
    pointsForts: "Vous voyez sa fragilité derrière son énergie. Vous savez l'ancrer quand il s'épuise dans la performance.",
    vigilances: "Il fuit votre anxiété en surinvestissant la réussite. Plus vous vous inquiétez, plus il performe pour vous rassurer.",
    conseil: "Détendez-vous visiblement quand il est avec vous. Aimez-le sans condition de réussite, c'est ce qui le libère.",
    parentSoutien: "Il rentre avec un projet ambitieux. Votre premier réflexe : énumérer les risques, les choses qui peuvent mal tourner, les garde-fous nécessaires. Vous pensez le protéger. Lui reçoit : maman/papa ne me fait pas confiance. Il apprendra à ne plus partager ses élans avant d'avoir sécurisé lui-même le terrain — ou à les réaliser en cachette, avec cette petite honte d'avoir osé.",
    parentChallenge: "Cet enfant fonce là où vous hésitez — et ça vous fait peur, mais ça vous fascine aussi. Vous reconnaissez en lui ce que vous auriez voulu être, ce que l'anxiété vous a empêché·e de devenir. Le laisser grandir implique d'accepter qu'il soit ce que vous n'avez pas osé. C'est l'une des libérations les plus fortes et les plus jalouses qu'un parent puisse vivre.",
  },
  "6-4": {
    pointsForts: "Vous accueillez ses émotions intenses avec sérieux. Vous ne les minimisez pas et il vous en est reconnaissant.",
    vigilances: "Vos angoisses + son intensité = spirale émotionnelle. Vous pouvez vous nourrir mutuellement dans le drame.",
    conseil: "Restez ancré quand il vacille. Et n'ajoutez pas vos peurs à ses tempêtes — il en a déjà beaucoup à gérer.",
    parentSoutien: "Il est dans une phase sombre, mélancolique. Votre réaction : inquiétude maximale, consultation intérieure sur « faut-il s'alarmer ? ». Vos questions anxieuses lui confirment que ses émotions sont effectivement dangereuses, qu'elles inquiètent. Il apprendra à les gérer seul pour ne pas vous alarmer, ou à les amplifier pour vous garder proche. Dans les deux cas, ses émotions deviennent un théâtre au lieu d'un territoire.",
    parentChallenge: "Sa capacité à habiter l'intensité vous terrifie — pour vous, forte émotion égale perte de contrôle, égale danger. Mais lui vit ces états comme son pays natal. Sa tolérance à l'émotion, que vous trouvez dangereuse, est peut-être juste une autre façon d'habiter la vie. L'accepter demande de réviser votre équation fondatrice : intensité égale menace. Peut-être pas toujours.",
  },
  "6-5": {
    pointsForts: "Vous respectez son besoin d'analyse et de calme. Vous lui apportez la chaleur, il vous apporte la pensée.",
    vigilances: "Il a besoin d'un parent rassurant, pas inquiet. Vos doutes constants le poussent à se réfugier dans la tête.",
    conseil: "Affichez votre confiance même quand vous doutez intérieurement. Et autorisez-le à se retirer pour penser — c'est sa façon de gérer.",
    parentSoutien: "Il est dans sa bulle, il lit, il ne vous répond pas tout de suite. Votre anxiété monte : « est-ce qu'il va bien ? ». Vous entrez dans sa chambre pour vérifier. Votre intention est bienveillante. Son vécu : intrusion. Il apprendra à fermer davantage, à communiquer moins, à vous épargner l'alerte permanente. Vous perdrez l'accès à son monde précisément à force de vouloir le vérifier.",
    parentChallenge: "Son retrait tranquille vous inquiète parce qu'il est hors de portée de votre vigilance. Vous ne pouvez pas le contrôler, vous ne pouvez pas anticiper. Cet enfant vous demande ce qui vous coûte le plus : faire confiance sans vérifier. Son autonomie silencieuse vous renvoie à votre propre peur de lâcher le volant. Il vous apprend que l'amour peut être aussi le fait de ne pas savoir.",
  },
  "6-6": {
    pointsForts: "Vous vous comprenez sur le terrain de la vigilance. Loyauté et fiabilité réciproques.",
    vigilances: "Vos inquiétudes s'amplifient mutuellement. Vous pouvez créer une bulle de peur où le monde extérieur paraît dangereux.",
    conseil: "Cultivez la confiance en l'avenir. Modélisez le courage face à l'incertitude — il l'apprend en vous regardant.",
    parentSoutien: "Vous partagez la même vigilance, la même anticipation des dangers. Vous êtes deux scanners qui s'activent mutuellement. Vous pensez créer de la complicité — vous construisez en réalité un écosystème de peur permanente. Chaque « et si » que vous validez chez lui devient un « et si » de plus qu'il portera à vie. Votre alliance dans l'inquiétude est un poison doux.",
    parentChallenge: "Cet enfant est votre miroir anxieux, et le regarder vous met face à ce que vous ne pouvez plus nier : votre peur ne vous a pas rendu·e plus sûr·e, elle vous a rendu·e épuisé·e. Sa guérison passe par la vôtre — pas par la vigilance partagée, mais par une confiance que vous n'avez jamais incarnée. Lui apprendre la paix exige que vous la trouviez vous-même, après toutes ces années.",
  },
  "6-7": {
    pointsForts: "Sa joie de vivre vous rassure : la vie n'est pas que dangers. Vous lui offrez la solidité, il vous offre la légèreté.",
    vigilances: "Vous voulez le protéger, lui veut explorer. Vos « attention » répétés peuvent éteindre son enthousiasme naturel.",
    conseil: "Laissez-le prendre des risques mesurés. Sa confiance dans la vie est un cadeau — ne la lui volez pas par excès de protection.",
    parentSoutien: "Il prend un risque — monte haut, court vite, dit oui à une sortie. Votre phrase part : « fais attention ». Vous la répétez dix fois par jour. Pour vous, c'est de l'amour vigilant. Pour lui c'est une dose quotidienne de doute injectée dans son moteur. Il commencera à hésiter là où il n'hésitait pas, à entendre votre voix au moment de décider, à associer aventure et peur parentale.",
    parentChallenge: "Son optimisme naturel vous heurte presque physiquement. Comment peut-il ne pas voir les dangers ? Comment peut-il foncer sans plan B ? Vous l'enviez en secret, et cette envie devient parfois colère. Cet enfant incarne ce que votre vigilance vous a enlevé : la confiance de base que le monde ne va pas s'effondrer. L'admettre, c'est reconnaître que votre peur ne vous a pas protégé·e — elle vous a juste amputé·e.",
  },
  "6-8": {
    pointsForts: "Sa force vous rassure : il sait se défendre. Vous savez aussi voir sa vulnérabilité derrière la carapace.",
    vigilances: "Il teste vos limites avec puissance. Si vous reculez par peur du conflit, il perd ses repères et s'agite davantage.",
    conseil: "Soyez ferme et calme face à ses débordements. Votre solidité (pas votre dureté) le sécurise.",
    parentSoutien: "Il vous défie, frontalement, sans filtre. Votre anxiété explose : vous voyez déjà les conflits à venir, les appels de l'école, les ennuis. Votre réaction devient contrôlante — vous serrez les boulons, vous multipliez les règles. Mais pour un 8 enfant, le contrôle anxieux est illisible : il n'y voit ni force ni justice, juste une mère/un père qui a peur. Il testera davantage, pour trouver la vraie autorité qu'il cherche.",
    parentChallenge: "Sa force vous terrifie plus qu'elle ne terrifie les autres parents. Pas à cause de ses colères — à cause de ce qu'elle révèle en creux : votre propre peur d'exister. Lui incarne la verticalité brute que votre anxiété a lentement dissoute. Votre travail parental avec cet enfant est paradoxal : pour tenir face à lui, il faut d'abord trouver en vous une force que vous ne croyez pas posséder.",
  },
  "6-9": {
    pointsForts: "Sa sérénité vous apaise. Foyer doux où chacun trouve sa place sans heurts.",
    vigilances: "Vous vous évitez mutuellement les conflits, mais ils s'accumulent en silence. Et vos angoisses peuvent perturber son calme.",
    conseil: "Initiez les conversations difficiles avec douceur. Et rassurez-vous : il va bien — son calme n'est pas un signe d'inquiétude.",
    parentSoutien: "Il vous dit que tout va bien, tout le temps. Vous savez pertinemment que ce n'est pas vrai, mais son calme vous soulage — au moins un front de moins à surveiller. Vous fermez les yeux sur ses tensions masquées, par épuisement. Il apprend que le « ça va » est un cadeau qu'il fait à ses parents. Plus tard, vous ne saurez pas ce qu'il ressent vraiment. Et vous ne saurez pas comment vous en êtes arrivé·e là.",
    parentChallenge: "Son calme apparent vous rassure à court terme et vous trouble au fond. Vous sentez qu'il y a quelque chose sous la surface lisse, mais vous n'osez pas y toucher — par peur de révéler un truc que vous ne sauriez pas gérer. Cet enfant vous oblige à un choix inconfortable : préserver votre propre paix fragile, ou aller chercher la sienne dans les profondeurs. La deuxième option demande une énergie que vous ne savez pas si vous avez.",
  },

  // ── Parent Type 7 ──
  "7-1": {
    pointsForts: "Votre énergie l'allège. Vous lui montrez qu'on peut vivre sans être parfait à chaque instant.",
    vigilances: "Votre dispersion peut frustrer son besoin de stabilité. Il a besoin de routine et de tenue des promesses.",
    conseil: "Tenez vos engagements et vos rituels. Sa rigueur est une force — ne la confondez pas avec de la rigidité.",
    parentSoutien: "Il vous réclame un cadre, des règles, des horaires. Vous lui répondez avec une version souple, inventive, négociable. Votre intention : lui offrir la liberté que vous chérissez. Son vécu : l'absence de repères, l'angoisse de ne pas savoir ce qui tient. Il apprendra à poser ses propres règles, compensatoirement rigides, pour survivre à votre fluidité. Il sera plus rigide que vous n'avez jamais imaginé qu'il pourrait l'être.",
    parentChallenge: "Son besoin de rigueur vous fatigue et vous agace — pourquoi faut-il tout cadrer ? Mais cet enfant vous pointe précisément ce que votre gourmandise a évité : l'engagement soutenu, la contrainte choisie, la profondeur qui exige de ne pas papillonner. Votre flèche de désintégration vers le 1 s'éveille à son contact, et ça pique. Pour l'aimer, il faut accepter qu'il vous oblige à atterrir.",
  },
  "7-2": {
    pointsForts: "Joie et chaleur réciproques. Foyer pétillant où l'on rit et où l'on aime fort.",
    vigilances: "Il prend soin de votre humeur. Si vous fuyez les moments difficiles, il apprend à porter seul ses propres tristesses.",
    conseil: "Restez disponible quand la fête est finie. Et autorisez-vous à montrer la tristesse — il a besoin de voir que c'est OK.",
    parentSoutien: "Il a besoin de moments d'attention pleine, prévisibles, réguliers. Vous lui offrez des moments sublimes, intenses, mais irréguliers. Pour vous, l'éclat d'un moment vaut mieux que la régularité. Pour lui, la régularité est le fondement affectif. Il apprendra à valoriser l'intensité au détriment de la fiabilité — comme vous. Et il cherchera l'amour dans les gens excitants plutôt que dans les gens sûrs.",
    parentChallenge: "Sa demande constante de présence vous pèse comme un fil à la patte. Vous aimez l'intensité par éclats, il veut la présence dans la durée. Cet enfant vous confronte à votre fuite de base : l'engagement soutenu. Son besoin d'ancrage est précisément ce que votre gourmandise fuit. L'accepter demande de renoncer au mythe que l'amour doit toujours être étincelant.",
  },
  "7-3": {
    pointsForts: "Duo dynamique, projets sans fin, énergie contagieuse. Votre admiration mutuelle vous porte.",
    vigilances: "Vous fuyez tous les deux les émotions difficiles. La famille devient une succession d'activités sans profondeur.",
    conseil: "Imposez-vous des moments calmes et profonds. Posez la question « comment tu te sens VRAIMENT ? » et écoutez.",
    parentSoutien: "Il s'applique, finit ce qu'il commence, performe. Votre réaction : « mais relax, amuse-toi ». Votre intention : le protéger de la pression. Son vécu : mon sérieux n'est pas valorisé par maman/papa. Il apprendra à cacher son ambition chez vous, ou à se sentir incompris dans ce qu'il a de plus fort. Votre fluidité, qui vous semble un cadeau, l'éloigne de votre reconnaissance.",
    parentChallenge: "Sa discipline vous ennuie presque — pourquoi s'impose-t-il tant, alors que la vie peut être plus légère ? Mais regardez bien : son engagement dans l'accomplissement est précisément ce que vous n'avez pas su construire. Votre légèreté a un coût caché — vous n'avez jamais vraiment fini les choses importantes. Cet enfant, en terminant, vous renvoie à tout ce que vous avez commencé et abandonné.",
  },
  "7-4": {
    pointsForts: "Sa profondeur vous touche. Il vous apprend à ralentir et à ressentir — c'est précieux pour vous deux.",
    vigilances: "Vous fuyez vers le positif quand il a besoin de plonger. Votre « allez, ça va passer » le coupe de lui-même.",
    conseil: "Tenez l'espace de ses émotions sans chercher à les transformer. La présence vaut plus que les solutions.",
    parentSoutien: "Il est dans une phase triste, il ne veut rien faire. Votre réflexe : l'emmener quelque part, lui proposer mille distractions, « allez, ça va te changer les idées ». Pour vous c'est une aide. Pour lui c'est un refus d'habiter sa tristesse. Il apprendra que ses émotions profondes sont des dérangements pour les autres. Il sera joyeux en surface avec vous, et malheureux en secret.",
    parentChallenge: "Sa mélancolie vous met en panique — vous y sentez la privation que vous fuyez depuis toujours. Ce qu'il habite naturellement, vous le fuyez activement. Cet enfant vous montre qu'il est possible de rester dans la gravité sans y mourir. Votre gourmandise n'est peut-être pas une richesse — juste une technique d'évitement. L'accepter demande de goûter, vous aussi, à ce qui n'est pas brillant.",
  },
  "7-5": {
    pointsForts: "Vous lui ouvrez le monde large par votre énergie. Il vous apprend la profondeur et la concentration.",
    vigilances: "Votre rythme rapide et vos changements de plan le déstabilisent. Il a besoin d'espace mental pour digérer.",
    conseil: "Annoncez les changements à l'avance. Et acceptez ses temps de retrait — ce n'est pas de l'antisocial, c'est de la recharge.",
    parentSoutien: "Il a besoin de calme, de silence, de retrait. Vous entrez dans sa bulle avec une proposition joyeuse, un « viens, on fait un truc ». Il décline, vous insistez, vous trouvez ça « triste » de rester seul. Chaque intrusion est un drainage énergétique pour lui, déguisé en invitation à la joie. Il apprendra à vous fuir pour se préserver. Votre maison deviendra, pour lui, un espace où l'on ne peut pas se recharger.",
    parentChallenge: "Son retrait tranquille vous met en panique — comment peut-il ne pas vouloir être avec les autres ? Mais son économie silencieuse est précisément ce que votre dispersion ne sait pas incarner : la profondeur par la concentration. Il porte votre flèche d'intégration vers le 5, et chaque moment où vous respectez son silence est un moment où vous grandissez malgré vous.",
  },
  "7-6": {
    pointsForts: "Votre optimisme rassure ses peurs. Vous lui montrez qu'il y a toujours une porte de sortie.",
    vigilances: "Vos « ne t'inquiète pas » sans écoute le laissent seul avec ses angoisses. Il n'ose plus en parler.",
    conseil: "Validez ses peurs avant de les dépasser. « C'est normal d'avoir peur de ça, voilà ce qu'on peut faire ensemble. »",
    parentSoutien: "Il vous demande confirmation, trois fois, que vous serez bien là ce soir. Votre réponse : « oui oui, t'en fais pas ». Mais vous avez déjà envie de sortir, et votre oui est teinté d'incertitude qu'il capte parfaitement. Il apprendra que vos promesses sont des oui flottants, que votre amour est réel mais pas fiable. Son anxiété se décuplera, non par défaut d'amour, mais par défaut de constance.",
    parentChallenge: "Son besoin de garanties vous étouffe. Vous aimez garder les options ouvertes, il veut les verrouiller. Sa demande de sécurité vous rappelle toutes les prisons que vous avez évitées — engagements, promesses fermes, présences sans issue. Cet enfant vous demande de choisir une prison : la sienne, celle de sa sécurité. C'est votre amour qui passe par cette claustrophobie volontaire.",
  },
  "7-7": {
    pointsForts: "Famille pétillante, créative, jamais ennuyeuse. Vous l'aidez à embrasser la vie pleinement.",
    vigilances: "Vous fuyez ensemble les moments difficiles. Personne ne pose les conversations sérieuses ni ne finit les projets.",
    conseil: "Forcez-vous à rester quand c'est inconfortable. Et apprenez-lui à finir avant de commencer autre chose.",
    parentSoutien: "Vous partagez la même énergie, les mêmes idées à la seconde, la même fuite en avant joyeuse. Vous êtes complices, vous vous comprenez, vous ne vous ennuyez jamais ensemble. Mais dans cette symbiose brillante, il y a un silence : personne n'atterrit, personne ne finit, personne ne regarde la profondeur. Vous construisez ensemble une maison sans fondations. Elle sera merveilleuse à vivre tant qu'il n'y aura pas de tempête.",
    parentChallenge: "Cet enfant est votre miroir joyeux, et c'est précisément le problème. Vous vous complétez dans l'évitement, vous vous rassurez mutuellement dans la course à l'expérience. Sa guérison passe par la vôtre — l'un de vous deux doit apprendre à s'arrêter d'abord. Vous pouvez lui demander de le faire, ou vous pouvez accepter que c'est à vous, l'adulte, de montrer le chemin. La seconde option est moins drôle.",
  },
  "7-8": {
    pointsForts: "Sa puissance vous stimule. Vous savez transformer son énergie brute en jeu et en aventure.",
    vigilances: "Il a besoin de cadres clairs. Votre flexibilité naturelle peut être perçue comme un manque de tenue.",
    conseil: "Tenez les règles essentielles fermement. Soyez flexible sur les détails, ferme sur les principes.",
    parentSoutien: "Il impose son point de vue avec force, il ne plie pas. Votre réaction : vous négociez, vous charmez, vous contournez. Vous ne voulez pas de confrontation frontale. Mais pour un 8 enfant, votre fuite du conflit est lue comme de la faiblesse. Il perd le respect de votre autorité non pas parce que vous êtes mou·lle, mais parce que vous n'assumez pas votre centre. Il testera de plus en plus pour trouver le mur.",
    parentChallenge: "Sa puissance frontale vous dérange — vous qui préférez glisser, il veut confronter. Mais lui vous offre ce que votre fluidité a perdu : l'engagement sans porte de sortie. Apprendre à tenir face à lui, c'est apprendre à exister sans l'option de la fuite. C'est l'un des muscles que votre gourmandise a laissé atrophier, et lui vous force à le réveiller.",
  },
  "7-9": {
    pointsForts: "Votre énergie le sort doucement de sa torpeur. Sa sérénité vous repose de votre agitation.",
    vigilances: "Votre vitesse l'efface. Il dit « oui à tout » pour suivre votre rythme, et perd contact avec ses propres envies.",
    conseil: "Ralentissez régulièrement. Demandez-lui ce qu'IL veut, pas ce qu'il pense que vous voulez qu'il veuille.",
    parentSoutien: "Il est dans son calme, vous débarquez avec une énergie débordante. Il accepte, il sourit, il suit le mouvement. Vous pensez qu'il s'amuse. En réalité, il a appris à vous accompagner dans votre rythme pour préserver la paix, au prix de son propre besoin de lenteur. Il deviendra un adulte qui ne sait plus bien ce qui le fatigue — parce qu'il a trop appris à ne pas le dire.",
    parentChallenge: "Son calme passif vous fait presque peur — vous sentez que sans vous, il ne se passerait rien. Cet enfant vous donne l'illusion d'être indispensable à son dynamisme. Mais regardez mieux : il s'efface d'autant plus que vous remplissez. Votre énergie devient la sienne, et il perd la sienne. Le réveiller demande de parfois, juste parfois, vous taire vous-même. C'est presque impossible pour vous.",
  },

  // ── Parent Type 8 ──
  "8-1": {
    pointsForts: "Vous reconnaissez sa rigueur et la respectez. Vous lui apportez la force quand sa rigidité le bloque.",
    vigilances: "Vous frontal, lui méthodique : conflit possible. Vos décisions rapides court-circuitent son besoin de bien faire.",
    conseil: "Laissez-lui le temps de finir avant de bouger. Et reconnaissez son sens du devoir — c'est son moteur, pas une lenteur.",
    parentSoutien: "Il est appliqué, sérieux, un peu tendu. Votre réaction pour le « détendre » : pousser fort, taquiner, le bousculer physiquement. Vous pensez lui insuffler de la force. Lui reçoit une menace à son centre : vos blagues robustes atteignent son point fragile. Il apprendra à se rigidifier davantage pour encaisser, ou à se replier — dans tous les cas, à ne pas se sentir en sécurité dans votre tendresse brute.",
    parentChallenge: "Son exigence morale vous pique. Sa droiture vous ramène à une notion que vous avez enterrée : qu'il existe des forces douces, lentes, qui ne s'imposent pas. Son refus de votre brusquerie n'est pas de la faiblesse, c'est une autre forme de tenue. Cet enfant vous oblige à considérer qu'on peut être debout autrement que par la puissance brute. Vous détestez cette idée.",
  },
  "8-2": {
    pointsForts: "Votre force et sa douceur se complètent magnifiquement. Vous le protégez, il vous adoucit.",
    vigilances: "Votre intensité peut écraser sa sensibilité. Il s'efface pour ne pas vous heurter.",
    conseil: "Modérez votre énergie face à lui. Et invitez-le à exprimer ses désaccords — il en a, mais les tait.",
    parentSoutien: "Il vient vers vous pour un câlin, tendre, vulnérable. Votre réaction chaleureuse mais énergique — gros câlin ferme, grosse tape dans le dos — est de l'amour pour vous. Lui, petit cœur, a besoin d'une douceur enveloppante, pas d'une force bienveillante. Il apprendra à apprécier votre amour, mais il ne saura jamais comment recevoir de la vraie tendresse. Votre puissance l'aura rééduqué.",
    parentChallenge: "Cet enfant vous offre ce que vous cherchez sans le savoir : la tendresse. Votre Luxure de vie se heurte à sa douceur comme à un mur de plumes — rien à combattre, juste à recevoir. Et recevoir vous est presque impossible. Votre flèche d'intégration vers le 2 passe par lui, et il vous demande de faire le plus vertigineux : poser les armes devant un être plus petit que vous, sans condition.",
  },
  "8-3": {
    pointsForts: "Énergie partagée, ambitions élevées. Vous le poussez à se dépasser, il vous donne du grain à moudre.",
    vigilances: "Compétition possible. Vos comparaisons (« quand j'avais ton âge... ») le blessent même si vous croyez l'encourager.",
    conseil: "Célébrez SES réussites sans les comparer aux vôtres. Il a besoin d'être vu pour lui-même.",
    parentSoutien: "Il performe, il réussit, il attend votre fierté. Votre approbation est sèche : « ouais, bien ». Pour vous c'est déjà un engagement. Pour lui qui vit de votre regard admiratif, c'est une douche froide. Il en rajoutera, il performera plus, il montera le curseur — jusqu'à ce qu'il arrache un vrai « bravo » de vous, un jour peut-être. Il vendra son équilibre intérieur pour cette minute-là.",
    parentChallenge: "Cet enfant cherche votre admiration — et ça vous gêne parce que vous n'admirez pas facilement. Vous respectez la force, pas la performance. Mais lui vous demande précisément ce que vous ne savez pas donner gratuitement : un regard valorisant. Votre avarice de reconnaissance est peut-être le seul muscle que vous n'avez pas entraîné. Il vous oblige à l'entraîner.",
  },
  "8-4": {
    pointsForts: "Vous le protégez dans ses tempêtes émotionnelles. Il sait qu'avec vous, il peut tout ressentir sans danger.",
    vigilances: "Votre force peut sembler insensible à sa fragilité. Vos « arrête de pleurer » écrasent ce qu'il vit.",
    conseil: "Soyez présent en silence pendant ses émotions. La force ne s'oppose pas à la tendresse — elle peut la contenir.",
    parentSoutien: "Quand il pleure pour un truc qui vous semble anodin, votre réflexe part tout seul : « allez, redresse-toi, c'est rien ». Pour vous, la fragilité est dangereuse — c'est comme ça qu'on vous a élevé·e, c'est comme ça que vous avez survécu. Mais chaque fois, votre enfant apprend que sa sensibilité — ce qu'il a de plus précieux — est un problème à vos yeux. À 10 ans il apprendra à la cacher. À 20 il ne saura plus où elle est.",
    parentChallenge: "Vous vous êtes construit·e en décidant très jeune que pleurer rendait vulnérable aux coups. Ce choix a été nécessaire, sans doute. Mais cet enfant, lui, n'a pas besoin de cette armure — il vous demande la permission de rester tendre. La lui refuser, c'est lui transmettre une blessure que vous n'aviez pas choisi d'hériter. La lui accorder demande de recroiser quelque chose en vous, enterré vers 8 ans.",
  },
  "8-5": {
    pointsForts: "Vous respectez son intelligence et savez le défendre quand il s'isole. Il vous fait confiance pour le protéger.",
    vigilances: "Votre énergie l'épuise. Il a besoin de calme et de retrait — vous risquez de l'envahir par votre intensité.",
    conseil: "Modérez votre présence quand il est dans sa bulle. Et engagez-vous corporellement avec lui — sport, jeux d'action.",
    parentSoutien: "Il se retire dans sa chambre, calmement, pour lire. Votre réaction : « viens dehors, bouge, fais quelque chose ». Votre conviction : la vie, c'est l'action, pas l'observation. Mais pour cet enfant, le mouvement intérieur vaut tout le reste. Chaque fois que vous le poussez vers l'extérieur, vous lui apprenez que son monde intérieur est inférieur. Il obéira peut-être, en surface. Sa richesse intérieure, elle, se rétrécira.",
    parentChallenge: "Son retrait analytique vous fait grincer des dents. Pour vous, la force se prouve dans l'action, pas dans la contemplation. Mais cet enfant incarne exactement votre flèche de désintégration — sous stress, vous vous repliez aussi dans la méfiance silencieuse. Le voir vous dérange parce qu'il fait naturellement ce que vous faites quand vous allez mal. Vous refusez de le voir.",
  },
  "8-6": {
    pointsForts: "Vous incarnez la solidité dont il a besoin. Sa loyauté envers vous est totale dès qu'il vous fait confiance.",
    vigilances: "Vos accès de force peuvent terroriser son anxiété. Il se construit sur la peur si vous tonnez trop.",
    conseil: "Soyez fort SANS être effrayant. Calme + ferme, jamais explosif. Votre voix forte le tétanise plus qu'elle ne l'éduque.",
    parentSoutien: "Il est anxieux, il pose des questions, il doute. Votre réflexe : « arrête de stresser pour rien, fonce ». Votre intention : l'affranchir de sa peur. Son vécu : vous ne voyez pas sa peur, vous la méprisez. Il apprendra à cacher son anxiété, à la refouler, à simuler la confiance devant vous. Ses doutes ne disparaîtront pas — ils deviendront juste invisibles et internes, beaucoup plus toxiques.",
    parentChallenge: "Sa prudence vous agace profondément — pourquoi ne va-t-il pas juste y aller ? Mais sa peur est réelle, pas négociable, pas dissipable par la force. Cet enfant vous oblige à faire ce que vous ne savez pas faire : respecter une fragilité sans la mépriser, sans vouloir la faire disparaître. Votre Luxure de contrôle n'est pas outillée pour ça. Apprendre, c'est lent, humiliant, et nécessaire.",
  },
  "8-7": {
    pointsForts: "Énergie débordante des deux côtés. Aventures, sport, action — vous vous comprenez dans le mouvement.",
    vigilances: "Vous évitez tous les deux les émotions difficiles via l'action. Personne ne s'arrête pour ressentir.",
    conseil: "Imposez-vous des moments calmes en duo. Et apprenez-lui à finir ce qu'il commence — votre exemple compte.",
    parentSoutien: "Il démarre dix choses, il change d'avis, il n'est pas fiable. Votre sang monte : « tu t'engages ou tu t'engages pas, faut choisir ». Votre force veut le discipliner, le ramener à la verticalité. Mais pour un 7 enfant, votre verticalité ressemble à une prison. Il apprendra à vous fuir pour préserver sa liberté, ou à se conformer par peur. Dans les deux cas, il perd — et vous aussi.",
    parentChallenge: "Sa dispersion joyeuse vous heurte parce qu'elle bafoue votre code de l'honneur : on tient parole, on finit, on assume. Mais cet enfant ne joue pas à ce code-là. Sa liberté ne passe pas par l'engagement, et vous devez reconnaître que votre verticalité peut être aussi une rigidité déguisée. Votre force peut intégrer la sienne — mais il faut d'abord accepter qu'elle soit aussi une force.",
  },
  "8-8": {
    pointsForts: "Respect mutuel des forts caractères. Quand vous êtes alliés, rien ne vous arrête.",
    vigilances: "Rivalité de pouvoir possible. Si vous êtes toujours le plus fort, il se braque ; si vous cédez, il vous méprise.",
    conseil: "Choisissez vos batailles. Reconnaissez sa force comme égale à la vôtre — il a besoin que vous la voyiez.",
    parentSoutien: "Vous êtes deux forts caractères, les affrontements sont fréquents et spectaculaires. Vous prenez ça comme une saine confrontation, du caractère reconnu, de l'éducation par la force. Mais derrière ces batailles, il y a un enfant qui apprend que l'amour passe par la domination, que les liens se testent par le conflit. Il aura du mal à construire des relations adultes douces — il aura besoin de friction pour sentir l'attachement.",
    parentChallenge: "Cet enfant est votre miroir brut, et vos confrontations sont passionnantes autant que destructrices. Vous reconnaissez votre propre puissance en face de vous, et ça vous oblige à choisir : continuer à gagner sur lui, ou lui céder des territoires. Votre Luxure de contrôle déteste céder. Mais c'est le seul chemin pour qu'il apprenne que la force n'est pas l'opposé de la tendresse — et vous aussi.",
  },
  "8-9": {
    pointsForts: "Sa douceur vous apaise. Vous incarnez la force qu'il n'ose pas mobiliser.",
    vigilances: "Votre intensité l'efface. Il dit « comme tu veux » pour éviter le choc avec votre énergie.",
    conseil: "Demandez-lui son avis et attendez vraiment la réponse. Modérez votre voix, votre rythme, votre intensité.",
    parentSoutien: "Il s'efface quand vous êtes dans la pièce. Vous prenez tout l'oxygène, sans mauvaise intention, c'est votre manière d'être. Lui disparaît dans le paysage. Vous pensez qu'il est d'accord avec tout. En réalité il a appris à ne pas lutter — le combat avec vous est perdu d'avance. Il deviendra un adulte qui s'éteint sous les personnalités puissantes. Vous aurez formé son schéma amoureux sans le vouloir.",
    parentChallenge: "Son effacement vous convient trop bien. Pas de conflit, pas de résistance, tout roule. C'est précisément le piège. Cet enfant vous renvoie votre désintégration vers le 5 — dans la relation silencieuse, méfiante, où l'on ne s'engage pas vraiment. Il vous demande de faire l'effort le plus difficile pour vous : réduire votre intensité pour qu'il puisse simplement exister. Vous n'avez jamais appris à diminuer.",
  },

  // ── Parent Type 9 ──
  "9-1": {
    pointsForts: "Votre calme l'apaise. Vous l'aidez à relâcher son perfectionnisme et à profiter du moment.",
    vigilances: "Il a besoin d'un cadre clair. Votre tendance à tout accepter peut le déstabiliser — il cherche des limites.",
    conseil: "Posez des règles fermes même si ça vous coûte. Sa structure intérieure se construit sur les vôtres.",
    parentSoutien: "Il vous demande une décision claire, un cadre ferme, une position nette. Votre réponse : « on verra, on va trouver un moyen, fais comme tu sens ». Votre intention : ne pas l'enfermer. Son vécu : mon parent ne tient pas debout quand je lui demande un repère. Il apprendra à se donner lui-même ses règles — plus dures, plus rigides, plus punitives que les vôtres ne l'auraient jamais été.",
    parentChallenge: "Son exigence vous épuise — il veut trop, il demande trop, il cadre trop. Mais ce qu'il réclame est exactement ce que votre Paresse fuit : la position ferme, l'engagement incarné, le non non négociable. Cet enfant vous confronte à votre désinvestissement déguisé en tolérance. L'aimer demande de vous réveiller, et vous n'avez pas envie.",
  },
  "9-2": {
    pointsForts: "Foyer doux et harmonieux. Vous accueillez sa générosité avec gratitude et calme.",
    vigilances: "Vous évitez tous les deux les conflits. Il apprend à étouffer ses besoins pour préserver l'harmonie.",
    conseil: "Modélisez le « non » bienveillant. Et invitez-le à exprimer ses désaccords sans peur de vous décevoir.",
    parentSoutien: "Il vient vers vous avec tout son amour, il vous câline, il vous donne. Vous recevez avec douceur, en silence, fondu avec lui. Vous pensez être en communion. Mais il a besoin de vous voir lui rendre quelque chose d'actif — un regard, un mot précis, une reconnaissance. Votre fusion silencieuse le met dans le doute : est-ce qu'il est vraiment aimé, ou juste absorbé ? Il cherchera sa vie durant la différence.",
    parentChallenge: "Cet enfant vous aime intensément, et cette intensité vous attire à l'effacement plutôt qu'à la présence. Vous vous laissez couler dans son amour au lieu d'en être un interlocuteur. Il vous demande de vous lever face à lui, pas de fusionner. Votre Paresse confond cette demande avec une pression agressive. Ce n'est pas agressif — c'est une invitation à exister.",
  },
  "9-3": {
    pointsForts: "Vous tempérez son agitation par votre sérénité. Il vous apporte de l'énergie et du mouvement.",
    vigilances: "Vous risquez de freiner ses élans par votre passivité. Sa quête de réussite se heurte à votre absence d'enthousiasme.",
    conseil: "Investissez visiblement dans ses projets. Votre soutien actif compte autant que votre acceptation calme.",
    parentSoutien: "Il a besoin de vous pour briller, pour être applaudi, pour exister dans le regard. Vous trouvez ça fatigant et un peu vaniteux. Votre regard reste tiède, posé, pas spectaculaire. Il prendra votre tiédeur pour un désinvestissement, et il redoublera d'efforts jusqu'à l'épuisement pour mériter l'éclat qui ne vient pas. Votre paix intérieure est, pour lui, une absence.",
    parentChallenge: "Cet enfant porte votre flèche d'intégration — l'élan, le mouvement, l'affirmation visible. Sa flamme vous intimide et vous épuise. Mais regardez bien : sa présence vous oblige à ne pas vous effacer. Chaque fois que vous le suivez activement, vous grandissez. Votre Paresse veut le ramener à votre tempo. Lui vous demande, au contraire, d'accélérer au sien.",
  },
  "9-4": {
    pointsForts: "Vous accueillez ses émotions sans les juger ni les surcharger. Il se sent profondément accepté.",
    vigilances: "Votre passivité peut le laisser seul dans ses tempêtes. Il a besoin que vous engagiez le contact.",
    conseil: "Allez vers lui activement quand il se renferme. Posez des questions, restez présent — votre silence l'isole.",
    parentSoutien: "Il est dans une tempête émotionnelle, vous l'accueillez en silence, présent·e mais dissout·e dans son état. Vous pensez être à ses côtés. En réalité, vous vous fondez dans sa douleur au lieu de lui offrir un pôle extérieur. Il a besoin d'une présence qui reste soi pendant sa tempête, pas d'un parent qui coule avec lui. Votre empathie passive devient un risque pour lui.",
    parentChallenge: "Sa profondeur émotionnelle vous fascine et vous aspire. Vous vous y noyez avec plaisir — c'est reposant d'être dans l'émotion d'un autre plutôt que dans la sienne. Mais cet enfant demande exactement ce que votre Paresse refuse : rester centré sur soi même dans l'empathie. Votre présence doit être une présence distincte, pas une présence diluée.",
  },
  "9-5": {
    pointsForts: "Vous respectez son besoin d'espace et de silence. Coexistence paisible et respectueuse.",
    vigilances: "Risque de vie parallèle où personne n'initie le contact. Il se replie, vous le laissez se replier.",
    conseil: "Forcez les moments partagés — repas, sortie, jeu. Sans rituels imposés, vous vous éloignez insensiblement.",
    parentSoutien: "Il se retire, il se tait, il s'installe dans son calme. Vous trouvez ça confortable : deux êtres tranquilles dans la même pièce. Vous ne le dérangez pas, il ne vous dérange pas. Mais cette paix apparente est une double absence. Personne n'initie, personne ne porte le lien. Il grandira en pensant que l'amour ressemble à une cohabitation courtoise et silencieuse. Il aura du mal à croire à plus.",
    parentChallenge: "Son retrait silencieux vous arrange trop bien. C'est votre profil préféré : quelqu'un qui ne vous demande rien. Mais cet enfant vous oblige, si vous voulez vraiment le rencontrer, à devenir celui/celle qui frappe à la porte, qui interrompt, qui invite. Votre paresse vous dit qu'il « est bien comme ça ». Faux — il attend juste que quelqu'un vienne le chercher.",
  },
  "9-6": {
    pointsForts: "Votre sérénité apaise son anxiété. Foyer stable où il sait qu'il peut compter sur la constance.",
    vigilances: "Il a besoin de réponses claires à ses inquiétudes. Vos « ça va aller » sans engagement le laissent seul.",
    conseil: "Engagez-vous concrètement face à ses peurs : « voilà ce qu'on va faire ensemble ». La présence active rassure.",
    parentSoutien: "Il est anxieux, il vous demande des repères, il veut savoir. Votre réponse : « on verra, pas besoin de t'inquiéter ». Vous pensez le rassurer. Son vécu : mon parent ne m'aide pas à structurer ma peur. Il apprendra à construire seul ses scénarios de sécurité, avec beaucoup plus de rigidité que vous ne l'auriez imaginé. Votre fluidité rassurante est pour lui un vide angoissant.",
    parentChallenge: "Son anxiété active votre désintégration vers le 6 — vous devenez, en sa présence, plus méfiant·e, plus doutant·e. Cet enfant vous rappelle qu'on ne peut pas vraiment vivre dans la paix superficielle quand quelqu'un qu'on aime est dans la peur. Il vous tire hors de votre anesthésie — et votre Paresse, qui refusait d'y aller, n'a plus le choix. Vous lui devez votre réveil.",
  },
  "9-7": {
    pointsForts: "Sa joie vous anime, votre calme l'ancre. Belle complémentarité entre énergie et sérénité.",
    vigilances: "Son rythme rapide vous épuise. Vous risquez de vous absenter mentalement pour vous protéger.",
    conseil: "Restez engagé même quand vous voulez vous retirer. Il a besoin de votre présence active, pas seulement physique.",
    parentSoutien: "Il déborde d'énergie, d'idées, de projets. Vous suivez à votre rythme, posé·e, non pressé·e. Vous laissez faire, vous accompagnez sans encadrer. Mais ce qu'il lit dans votre détachement tranquille, ce n'est pas du respect pour sa liberté : c'est un désengagement. Il redoublera d'énergie pour vous atteindre, ou il renoncera à vous chercher. Votre neutralité bienveillante est, pour lui, une forme d'abandon.",
    parentChallenge: "Cet enfant porte le feu que votre Paresse a éteint en vous. Sa vitalité débordante est précisément ce que vous avez abandonné pour avoir la paix. Son intensité vous fatigue — mais elle est aussi votre seule chance d'échapper à votre anesthésie. Votre flèche d'intégration vers le 3 passe par lui. Le suivre, c'est vous réveiller. Le laisser tomber, c'est mourir un peu plus chaque jour.",
  },
  "9-8": {
    pointsForts: "Votre douceur adoucit sa puissance. Vous ne le craignez pas, et c'est précieux pour lui.",
    vigilances: "Il teste vos limites avec force. Si vous cédez systématiquement, il prend toute la place et perd ses repères.",
    conseil: "Tenez vos positions calmement mais fermement. Votre fermeté tranquille est plus puissante que la confrontation.",
    parentSoutien: "Il vous défie, il teste, il pousse. Votre réflexe : éviter le conflit, contourner, céder pour préserver la paix. Mais pour un 8 enfant, céder sans résistance est le pire des messages — il a besoin de trouver un mur, une vraie autorité incarnée. Votre fuite du conflit lui confirme qu'il est le plus fort — et qu'il n'y a personne pour le cadrer. Il en aura peur. Vous n'aurez pas voulu le voir.",
    parentChallenge: "Sa puissance frontale vous terrifie. Vous n'avez pas les outils — votre Paresse a économisé le muscle de la confrontation. Cet enfant vous demande exactement ce que vous n'avez jamais voulu incarner : la verticalité ferme, l'autorité qui tient. Soit vous apprenez, soit vous le perdez. Il n'y a pas de troisième option avec un 8, et il a besoin que vous le sachiez.",
  },
  "9-9": {
    pointsForts: "Calme, harmonie, fluidité. Vous vivez en paix dans le même rythme tranquille.",
    vigilances: "Vous évitez tous les deux les décisions et les conflits. Personne ne tranche, personne n'avance.",
    conseil: "Imposez-vous d'être celui qui décide et qui initie. Il a besoin d'apprendre à choisir — par votre exemple actif.",
    parentSoutien: "Vous êtes deux paisibles, vous vivez en bonne entente fluide, rien ne heurte. Vous croyez avoir réussi votre duo parent-enfant. Mais regardez bien : personne n'exige rien, personne ne pousse, personne ne va au fond. Il apprend, de vous, que l'amour se résume à la paix sans friction. Il construira des relations adultes dans ce moule — douces, confortables, mais aussi inertes. Il se demandera pourquoi rien ne le transporte.",
    parentChallenge: "Cet enfant est votre miroir tranquille, et c'est le piège ultime. Vous vous comprenez en silence, vous vous respectez sans effort, rien ne gratte. Mais personne ne sort de sa torpeur, personne ne grandit. Sa guérison passe par la vôtre : il faut que quelqu'un, dans ce duo, se mette à exister franchement. Ce ne sera pas lui — un enfant ne sort pas seul de l'effacement. Ce sera vous. Ou personne.",
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

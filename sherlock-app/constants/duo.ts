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
    parentSoutien: "Votre enfant porte la même croyance que vous : « pour être aimé, je dois être parfait ». Sa propre Colère intérieure le critique déjà sans relâche — votre exigence supplémentaire devient une double peine. Créez explicitement des zones sans règle où il peut exister sans avoir à « bien faire ».",
    parentChallenge: "Cet enfant est votre miroir le plus aigu : sa rigidité, son auto-flagellation, sa difficulté à lâcher — c'est vous, en plus jeune. Votre Colère perfectionniste reconnaît la sienne et veut la corriger, alors qu'elle a besoin d'être adoucie. Sa guérison passe par la vôtre : il vous oblige à vous accorder ce que vous ne vous accordez pas.",
  },
  "1-2": {
    pointsForts: "Votre cadre rassure votre enfant Type 2 qui aime savoir comment plaire. Il se sent en sécurité avec votre clarté.",
    vigilances: "Votre rigueur peut couper son élan affectif. Il a besoin de votre approbation, pas de votre correction permanente.",
    conseil: "Dites « je suis fier de toi » avant « tu peux faire mieux ». Apprenez-lui à demander pour lui-même, pas seulement à donner.",
    parentSoutien: "Votre enfant Type 2 vit dans la croyance « pour être aimé, je dois être utile » — il ferait n'importe quoi pour votre approbation. Votre cadre rigoureux risque de lui faire entendre « tu n'es pas assez gentil » à chaque correction. Valorisez d'abord ses élans affectifs, et apprenez-lui à demander ce dont il a besoin pour lui-même.",
    parentChallenge: "Cet enfant chaleureux active votre méfiance contre la « facilité émotionnelle » qui vous semble peu sérieuse. Votre Colère contenue blesse une sensibilité qui ne sait que se plier silencieusement pour être aimée. Il vous apprend que l'amour n'a pas à être mérité par la performance morale — un désapprentissage majeur.",
  },
  "1-3": {
    pointsForts: "Vous valorisez tous les deux la performance et l'effort. Belle alliance autour des résultats et du travail bien fait.",
    vigilances: "Vous corrigez le processus, lui veut le résultat. Vos « oui mais tu aurais pu mieux » blessent un enfant qui cherche votre admiration.",
    conseil: "Célébrez ses réussites SANS modération ni « mais ». Aidez-le à trouver sa valeur au-delà des trophées.",
    parentSoutien: "Votre enfant Type 3 vit pour vos « bravo », mais il confond votre approbation et votre amour. Vos « tu aurais pu mieux faire » l'écrasent en silence : il les entend comme « je ne t'aime pas assez ». Célébrez-le quand il échoue ou quand il est juste lui-même, sans accomplissement à valider.",
    parentChallenge: "Cet enfant est votre version performance, et c'est vertigineux : vous voyez dans ses yeux la même peur d'être jugé insuffisant. Votre exigence rencontre sa quête de valeur dans une spirale dont aucun de vous ne peut sortir seul. Il vous force à dissocier amour et résultat — une leçon que vous n'avez peut-être jamais reçue vous-même.",
  },
  "1-4": {
    pointsForts: "Vous tenez tous les deux à un idéal élevé — esthétique pour lui, éthique pour vous. Terrain commun fertile pour la création.",
    vigilances: "Sa sensibilité vous semble excessive, votre rigueur lui semble froide. Risque réel de blessure mutuelle profonde.",
    conseil: "Ses émotions ne sont pas un problème à résoudre — c'est sa façon d'être au monde. Écoutez avant de cadrer.",
    parentSoutien: "Votre enfant Type 4 vit dans la conviction qu'il manque quelque chose d'essentiel pour être complet. Vos cadres et corrections lui confirment qu'il « n'est pas comme il faudrait » — exactement la peur qui le ronge. Asseyez-vous à côté de ses émotions sans chercher à les résoudre : c'est ce qu'il vous demande.",
    parentChallenge: "Cet enfant intense heurte votre besoin d'ordre intérieur — ses émotions « excessives » contreviennent à votre code du bon comportement. Votre réflexe de cadrer fait l'inverse de ce dont il a besoin : il se replie et cultive sa blessure en silence. Il vous oblige à reconnaître une intelligence émotionnelle que la rigueur seule ne couvre pas.",
  },
  "1-5": {
    pointsForts: "Vous respectez tous les deux la compétence et le travail bien fait. Relation calme et structurée, peu de drama.",
    vigilances: "Deux têtes, peu de câlins. Risque que la relation devienne purement fonctionnelle — il se sent jugé en silence.",
    conseil: "Initiez les moments de tendresse et de jeu — il ne le fera pas. Et respectez ses zones de retrait.",
    parentSoutien: "Votre enfant Type 5 a peur d'être envahi — son retrait est sa façon de protéger ses ressources, pas de vous fuir. Annoncez les transitions à l'avance et ne lui demandez pas de partager ses émotions sur commande. Votre « fais-le parce que c'est la règle » l'éteint : donnez-lui le pourquoi, il vous suivra.",
    parentChallenge: "Cet enfant vous résiste sans rébellion : il observe, note, et se retire. Votre volonté de « bien faire pour lui » se heurte à une autonomie tranquille qui ne plie pas. Il vous apprend que l'amour parental n'est pas toujours faire — parfois c'est laisser être, un renoncement difficile pour vous.",
  },
  "1-6": {
    pointsForts: "Votre cohérence est un cadeau pour son anxiété. Il s'appuie sur vous comme sur un roc qui ne bouge pas.",
    vigilances: "S'il sent que rien n'est jamais assez bien, son anxiété explose. Vos critiques le terrifient et bloquent son initiative.",
    conseil: "Rassurez d'abord, corrigez ensuite. Tenez vos promesses : la prévisibilité est sa principale source de sécurité.",
    parentSoutien: "Votre enfant Type 6 est anxieux par défaut : il scanne le monde à la recherche du danger, et vos critiques deviennent des menaces qu'il ressasse pendant des jours. Votre cohérence est son ancre — tenez vos promesses à la lettre, c'est sa principale source de sécurité. Rassurez avant de corriger, toujours.",
    parentChallenge: "Cet enfant vous renvoie l'effet de votre propre tension intérieure : il capte vos doutes sous le vernis de la rigueur. Votre exigence nourrit son anxiété au lieu de la calmer — une boucle douloureuse que vous n'aviez pas vue. Il vous invite à cultiver la confiance tranquille que vous voudriez lui transmettre, mais que vous-même peinez à habiter.",
  },
  "1-7": {
    pointsForts: "Son énergie et sa joie peuvent vous sortir de votre sérieux. Il vous rappelle que la vie est aussi pour s'amuser.",
    vigilances: "Vos règles longues et morales le perdent. Il fuit le cadre rigide en se dispersant ou en jouant au clown.",
    conseil: "Règles COURTES et claires, pas de longs sermons. Acceptez qu'il commence beaucoup et finisse peu — c'est sa nature.",
    parentSoutien: "Votre enfant Type 7 fuit la contrainte par la dispersion — vos longues règles et sermons le perdent. Tenez ce qui est vital (sécurité, respect) et lâchez l'accessoire : son désordre joyeux n'est pas un affront à votre cadre. Aidez-le à finir ce qu'il commence sans éteindre l'étincelle initiale.",
    parentChallenge: "Cet enfant porte exactement ce que vous cherchez en intégration : la légèreté, la spontanéité, le plaisir. Sa joie agace votre Colère contenue parce qu'elle vous renvoie ce que vous vous interdisez. Il est votre maître involontaire — apprendre à goûter avec lui le plaisir et l'imparfait-vivant est probablement le don le plus important de votre vie de parent.",
  },
  "1-8": {
    pointsForts: "Deux forts caractères qui se respectent quand chacun tient son territoire. Vous êtes son repère solide qui ne plie pas.",
    vigilances: "Il teste vos limites pour voir si vous tenez. Vos sanctions doivent être justes, jamais humiliantes — il s'en souviendra longtemps.",
    conseil: "Soyez ferme et calme, jamais réactif. Reconnaissez sa force au lieu d'essayer de la mater.",
    parentSoutien: "Votre enfant Type 8 respecte la force, pas les principes seuls — votre voix doit incarner votre cadre, pas le réciter. Tenez peu de règles, mais tenez-les sans négociation : il teste pour trouver le mur. Reconnaissez sa protection des plus faibles, c'est son plus beau côté à cultiver.",
    parentChallenge: "Cet enfant défie frontalement votre autorité, et votre Colère réprimée pourrait exploser contre lui — le pire scénario. Vos armes habituelles (le « tu devrais », la culpabilisation) ne marchent pas sur lui. Il vous oblige à incarner votre force au lieu de la rationaliser, à être ferme sans être moral — un exercice de virtuosité parental.",
  },
  "1-9": {
    pointsForts: "Votre cadre l'aide à structurer sa journée. Il accepte vos règles sans heurts ni rébellion ouverte.",
    vigilances: "Sa lenteur vous agace, votre pression le fait disparaître. Il devient fantôme sous votre exigence.",
    conseil: "Donnez-lui du temps pour répondre, pour décider, pour faire. Demandez-lui son avis — il l'a, mais ne le donne pas spontanément.",
    parentSoutien: "Votre enfant Type 9 disparaît sous la pression — il dit « oui » pour préserver la paix, sans que ce soit son vrai oui. Votre rigueur peut littéralement le faire s'éteindre. Posez des échéances souples, célébrez ses petits pas, et donnez-lui des choix fermés (« A ou B ? ») plutôt que des questions ouvertes.",
    parentChallenge: "Cet enfant vous donne l'illusion que tout va bien parce qu'il ne proteste pas — mais il se fond dans vos attentes et se perd. Il vous invite à ralentir, à chercher sa vérité sous son consentement, à comprendre que son « oui » n'est pas toujours le sien. Votre exigence demande à apprendre la patience qu'aucune règle ne vous a jamais enseignée.",
  },

  // ── Parent Type 2 ──
  "2-1": {
    pointsForts: "Votre chaleur adoucit son sérieux. Vous voyez sa valeur au-delà de ses performances et c'est un cadeau pour lui.",
    vigilances: "Il a besoin d'autonomie, pas d'attention envahissante. Vos câlins permanents peuvent l'étouffer.",
    conseil: "Aimez-le sans le couver. Et apprenez-lui que ses standards élevés sont une force, pas un défaut à consoler.",
    parentSoutien: "Votre enfant Type 1 a son propre critique intérieur très sévère — votre tendance à le rassurer après chaque erreur risque de devenir étouffante. Apprenez-lui à différencier « la règle » et « papa/maman fâché » — il confond les deux et se punit pour vous plaire. Créez des moments où l'amour est juste là, sans rien à mériter.",
    parentChallenge: "Cet enfant refuse votre aide quand elle est offerte sur le mode émotionnel — il veut résoudre seul, par principe. Vous prenez son refus comme un rejet alors que c'est sa façon de devenir lui-même. Il vous oblige à aimer sans sauver, sans adoucir, sans combler — juste être là et laisser son combat lui appartenir.",
  },
  "2-2": {
    pointsForts: "Tendresse mutuelle, complicité affective. Vous vous comprenez sans mots dans le registre du cœur.",
    vigilances: "Vous risquez de l'élever dans l'idée qu'aimer = se sacrifier. Il oubliera ses propres besoins comme vous oubliez les vôtres.",
    conseil: "Apprenez-lui à dire « non » et à recevoir. Modélisez-le en prenant soin de vous-même devant lui.",
    parentSoutien: "Votre enfant Type 2 apprend de vous, qui donnez tout le temps — il va vous copier, s'oublier, plaire. Modélisez explicitement le « non » et le temps pour vous sans culpabilité : c'est le plus grand cadeau. Demandez-lui ses besoins en premier, avant qu'il ne devine les vôtres.",
    parentChallenge: "Cet enfant est votre petit miroir aimant — sa ressemblance vous touche autant qu'elle vous inquiète quand vous voyez ses sacrifices silencieux. Son Orgueil de l'aide réactive le vôtre, créant une boucle où personne ne peut dire « j'ai besoin ». Il vous invite à guérir votre propre rapport à vos limites — le cadeau qu'il attend, c'est votre autonomie.",
  },
  "2-3": {
    pointsForts: "Vous adorez son énergie et célébrez ses succès avec un enthousiasme sincère. Il se sent vu et valorisé.",
    vigilances: "S'il sent qu'il doit performer pour mériter votre amour, il devient un « petit adulte » qui s'oublie.",
    conseil: "Aimez-le quand il échoue, pas seulement quand il gagne. Et dites-lui que vous l'aimeriez même s'il ne faisait rien de spécial.",
    parentSoutien: "Votre enfant Type 3 cherche votre admiration plus que votre amour — distinguez les deux pour lui. Aimez-le explicitement pour ce qu'il est (sa présence, son rire), pas pour ce qu'il accomplit. Dites-lui que vous seriez fier même s'il ratait — et répétez-le jusqu'à ce qu'il y croie.",
    parentChallenge: "Cet enfant attire facilement votre admiration, et vous alimentez sans le vouloir sa peur d'être « juste lui ». Votre chaleur devient carburant de performance au lieu d'antidote à son anxiété de valeur. Il vous invite à aimer au-delà de la mise en valeur — à offrir une tendresse qui ne récompense rien mais accueille l'être entier.",
  },
  "2-4": {
    pointsForts: "Vous accueillez ses émotions intenses sans en avoir peur. Il se sent compris dans sa différence.",
    vigilances: "Vous voulez le consoler, lui veut être entendu dans sa douleur. Vos solutions trop rapides le ferment.",
    conseil: "Tenez l'espace de ses émotions sans chercher à résoudre. Parfois il a juste besoin d'être avec vous, en silence.",
    parentSoutien: "Votre enfant Type 4 ne veut pas être consolé — il veut être rejoint dans son ressenti. Asseyez-vous à côté de lui dans la tristesse plutôt que de chasser l'émotion par un câlin. Reconnaissez son unicité sans la réduire à « tu es sensible comme moi ».",
    parentChallenge: "Cet enfant repousse parfois votre tendresse, ce qui touche votre peur la plus profonde d'être indigne d'amour. Il vous oblige à donner sans recevoir confirmation — un terrain inconfortable pour qui se nourrit de la reconnaissance. Il vous apprend que l'amour authentique est parfois silencieux et patient.",
  },
  "2-5": {
    pointsForts: "Vous voyez sa profondeur derrière sa réserve. Vous pouvez créer un lien intime sans pression.",
    vigilances: "Il a besoin d'espace pour se ressourcer. Vos élans affectifs trop fréquents l'épuisent et le font fuir.",
    conseil: "Respectez ses zones de solitude — ce n'est pas un rejet. Approchez-vous par les idées, pas seulement par le câlin.",
    parentSoutien: "Votre enfant Type 5 a besoin d'espace seul pour se recharger — votre proximité affective constante peut être vécue comme une intrusion énergétique. Frappez à la porte avant d'entrer, annoncez les contacts physiques. Apprenez à montrer votre amour par le respect du territoire, pas seulement par les câlins.",
    parentChallenge: "Cet enfant ne valide pas votre besoin d'être nécessaire — son autonomie est sa fierté. Vous pouvez le vivre comme un rejet alors qu'il vous aime à sa manière (silencieuse, observatrice). Il vous oblige à accepter qu'aimer ne se mesure pas au volume d'attention donnée — un renoncement précieux pour votre Orgueil.",
  },
  "2-6": {
    pointsForts: "Votre chaleur constante apaise son anxiété. Il sait qu'il peut compter sur vous quoi qu'il arrive.",
    vigilances: "Si vous montrez vous-même de l'inquiétude, il l'absorbe et la décuple. Votre calme est son ancre.",
    conseil: "Soyez la « base sûre » qui ne tremble pas. Et encouragez son autonomie progressive — il a besoin d'apprendre qu'il peut s'en sortir seul.",
    parentSoutien: "Votre enfant Type 6 vit dans une anxiété de fond et a besoin de votre fiabilité plus que de votre tendresse débordante. Tenez exactement ce que vous promettez : la cohérence est plus rassurante que les déclarations d'amour. Aidez-le à faire confiance à sa propre guidance plutôt que de devenir dépendant de votre validation.",
    parentChallenge: "Cet enfant vous teste subtilement pour vérifier votre constance — votre tendance à donner « selon votre humeur » réveille son doute. Votre besoin d'être aimé en retour entre en collision avec son besoin de sécurité prévisible. Il vous invite à aimer sans attendre, à être fiable sans demander confirmation.",
  },
  "2-7": {
    pointsForts: "Sa joie de vivre vous remplit. Vous savez participer à ses aventures sans étouffer son enthousiasme.",
    vigilances: "Il fuit les émotions difficiles. Si vous évitez aussi, vous l'aidez à se construire une carapace de gaieté.",
    conseil: "Aidez-le à nommer la tristesse, la peur, la déception. Restez disponible quand la fête est finie.",
    parentSoutien: "Votre enfant Type 7 fuit l'intensité émotionnelle par la dispersion — vos « parlons sérieusement » l'angoissent. Honorez sa joie sans la psychologiser à chaque fois. Apprenez-lui doucement à habiter l'inconfort, par petites doses, sans le forcer à plonger dans ses ombres.",
    parentChallenge: "Cet enfant esquive votre besoin de connexion profonde — il préfère le mouvement à l'introspection. Vous pouvez le vivre comme un manque d'amour alors que c'est sa stratégie de survie. Il vous oblige à respecter une autre voie d'amour : la légèreté, le jeu, le présent qui suffit.",
  },
  "2-8": {
    pointsForts: "Vous voyez son cœur tendre derrière la carapace. Avec vous, il peut baisser sa garde.",
    vigilances: "Il refuse d'être materné. Vos « mon bébé » et vos câlins envahissants déclenchent sa rébellion.",
    conseil: "Aimez-le avec respect, pas avec mièvrerie. Reconnaissez sa force au lieu de la voir comme un problème à adoucir.",
    parentSoutien: "Votre enfant Type 8 est rebuté par la mièvrerie et veut un parent qui tient son cap. Vos câlins permanents et vos « ça va mon chéri ? » l'agacent — il veut être respecté, pas couvé. Reconnaissez sa force, posez votre cadre fermement, et offrez votre tendresse en quantité limitée mais authentique.",
    parentChallenge: "Cet enfant vous oblige à dire « non » alors que c'est précisément ce que votre Orgueil ne veut pas faire. Sa force vous renvoie votre propre évitement de l'affirmation — vous voudriez qu'il vous aime alors qu'il a besoin que vous teniez. Il vous force à intégrer votre Type 8 intérieur : l'autorité tranquille, sans manipulation affective.",
  },
  "2-9": {
    pointsForts: "Tendresse paisible, foyer doux. Vous vous accordez naturellement sur le rythme et l'harmonie.",
    vigilances: "Vous deux évitez le conflit. Mais un enfant a besoin d'apprendre à dire ce qui ne va pas.",
    conseil: "Modélisez le « non » bienveillant. Et provoquez gentiment ses choix — il a tendance à dire « comme tu veux ».",
    parentSoutien: "Votre enfant Type 9 dit « oui » par souci de paix, sans que ce soit son vrai oui. Vos demandes affectives implicites le surchargent : il sent ce que vous voulez et abdique. Aidez-le à dire « non » en valorisant explicitement son désaccord — sinon il se perdra dans vos attentes.",
    parentChallenge: "Cet enfant vous donne tout l'amour silencieux que vous cherchez, mais ce n'est pas le sien : c'est sa stratégie pour préserver l'harmonie. Vous risquez de confondre son apaisement avec une véritable réciprocité affective. Il vous invite à chercher sa vérité au-delà de son acquiescement, et à accepter l'inconfort de son émergence.",
  },

  // ── Parent Type 3 ──
  "3-1": {
    pointsForts: "Vous reconnaissez son besoin de bien faire et célébrez ses efforts. Belle alliance sur la qualité du travail.",
    vigilances: "Vous voulez de la performance visible, lui veut faire les choses correctement. Tension sur les moyens vs les résultats.",
    conseil: "Valorisez son intégrité même quand elle ralentit le projet. Et apprenez-lui que l'image n'est pas tout dans la vie.",
    parentSoutien: "Votre enfant Type 1 a une éthique exigeante qui peut entrer en conflit avec votre culte de l'efficacité. Pour lui, le « comment » compte autant que le « combien » — ne réduisez pas ses scrupules à de la lenteur. Valorisez sa rigueur en lui donnant le temps de bien faire.",
    parentChallenge: "Cet enfant juge silencieusement votre obsession de l'image, et son regard moral peut vous mettre mal à l'aise. Votre Mensonge à vous-même est démasqué par sa droiture. Il vous invite à interroger ce que vous performez et pourquoi — un travail d'authenticité qui n'est confortable pour personne.",
  },
  "3-2": {
    pointsForts: "Vous êtes touché par sa générosité naturelle et savez la valoriser. Il s'épanouit dans votre admiration.",
    vigilances: "Vous l'utilisez parfois sans vous en rendre compte. Il donne sans rien demander — vous prenez sans rien rendre.",
    conseil: "Remerciez-le explicitement. Aidez-le à exprimer ses propres besoins, pas seulement à servir les vôtres.",
    parentSoutien: "Votre enfant Type 2 cherche votre amour, pas votre admiration — distinguez bien les deux. Vos « bravo champion » l'incitent à se déguiser en « petit performeur » pour vous plaire, ce qui le coupe de sa propre voie. Aimez-le pour sa chaleur, pas pour ce qu'il fait.",
    parentChallenge: "Cet enfant vous offre une affection inconditionnelle que vous n'avez peut-être jamais cru possible. Sa générosité vous renvoie votre propre transactionnel : vous donnez (énergie, attention) pour recevoir (admiration). Il vous invite à recevoir l'amour sans avoir à le mériter — un séisme intérieur.",
  },
  "3-3": {
    pointsForts: "Vous comprenez sa quête de réussite et savez la canaliser. Vous parlez la même langue du résultat.",
    vigilances: "Risque d'élever un « petit performeur » coupé de lui-même. Il vous imite — y compris dans vos angles morts.",
    conseil: "Montrez-lui que vous l'aimez quand il échoue, pas seulement quand il brille. Modélisez le repos et la vulnérabilité.",
    parentSoutien: "Votre enfant porte la même croyance que vous : « je vaux ce que je réussis ». À deux, vous risquez de bâtir une famille-podium où l'être disparaît derrière le faire. Modélisez activement la pause, l'inutile, le simple plaisir d'exister — sinon vous lui transmettez votre course épuisante.",
    parentChallenge: "Cet enfant est votre miroir de performance, et c'est troublant : sa peur de l'échec est la vôtre, son besoin de briller aussi. Votre admiration mutuelle peut devenir un piège dont aucun ne peut sortir. Sa guérison passe par la vôtre : il vous oblige à incarner enfin votre Vertu — la véracité, au-delà du masque.",
  },
  "3-4": {
    pointsForts: "Sa créativité vous fascine. Vous savez la mettre en valeur sans la dénaturer.",
    vigilances: "Vous voulez du résultat, lui veut de l'authenticité. Vos accélérations brisent son processus créatif.",
    conseil: "Respectez son rythme intérieur. Et n'essayez pas de transformer son originalité en produit vendable.",
    parentSoutien: "Votre enfant Type 4 ne veut surtout pas être « efficace » — son chemin passe par la profondeur émotionnelle, pas par le résultat. Votre tendance à l'orienter vers le « productif » lui confirme qu'il est inadéquat. Honorez ses lenteurs, ses mélancolies, ses créations sans utilité — c'est son mode d'existence.",
    parentChallenge: "Cet enfant vous force à ralentir, à ressentir, à habiter ce que vous fuyez par l'action. Sa profondeur émotionnelle expose votre déconnexion intérieure. Il vous invite à traverser vos propres ombres au lieu de courir vers la prochaine victoire — votre vraie maturation parentale est là.",
  },
  "3-5": {
    pointsForts: "Vous respectez sa profondeur intellectuelle et savez l'encourager dans ses passions.",
    vigilances: "Vous bougez vite, lui réfléchit lentement. Vos demandes d'action immédiate le bloquent.",
    conseil: "Laissez-lui le temps d'analyser avant d'agir. Et acceptez qu'il ne soit pas démonstratif — son amour passe par l'attention, pas par l'expression.",
    parentSoutien: "Votre enfant Type 5 ne se mesure pas à vos critères de visibilité — sa réussite est intérieure (compréhension, maîtrise) et silencieuse. Vos « tu pourrais te montrer plus » l'éteignent. Valorisez sa profondeur sans la transformer en produit à promouvoir.",
    parentChallenge: "Cet enfant ne joue pas le jeu de l'admiration — son retrait calme renvoie votre besoin de regard à son vide. Vous pouvez le vivre comme un échec parental alors que c'est juste son énergie. Il vous oblige à aimer ce qui ne brille pas — un apprentissage radical pour vous.",
  },
  "3-6": {
    pointsForts: "Votre énergie et votre confiance en l'avenir le rassurent. Vous lui montrez qu'on peut avancer malgré les doutes.",
    vigilances: "Vous foncez, lui anticipe les risques. Si vous écrasez ses craintes, il les enfouit et l'anxiété explose ailleurs.",
    conseil: "Prenez ses inquiétudes au sérieux avant de les dépasser. Sa prudence n'est pas un frein — c'est une intelligence.",
    parentSoutien: "Votre enfant Type 6 a besoin d'authenticité avant l'image — il flaire la posture à des kilomètres. Si votre amour se manifeste par des accomplissements visibles, il sentira que c'est conditionnel et doutera. Tenez vos engagements à la lettre : sa sécurité affective est dans votre cohérence, pas dans votre charisme.",
    parentChallenge: "Cet enfant questionne vos motivations, et son regard prudent vous renvoie l'inauthenticité dont vous ne voulez pas être conscient. Sa loyauté n'est pas automatique — elle se gagne par la vérité. Il vous oblige à sortir du rôle pour entrer dans la relation, ce qui ouvre votre chemin d'intégration vers le Type 6.",
  },
  "3-7": {
    pointsForts: "Vous adorez son énergie et savez l'embarquer dans des projets stimulants. Duo dynamique et joyeux.",
    vigilances: "Vous avez tous les deux du mal avec les émotions difficiles. Vous risquez de toujours fuir vers la suite.",
    conseil: "Apprenez-lui à finir ce qu'il commence. Et osez les conversations sérieuses, même quand c'est inconfortable.",
    parentSoutien: "Votre enfant Type 7 partage votre énergie débordante — danger d'être dans une famille « tout-action » sans temps de digestion. Apprenez-lui à finir ce qu'il commence en lui montrant que la profondeur a sa propre récompense. Et accordez-vous à lui des moments « inutiles » de pure joie ensemble.",
    parentChallenge: "Cet enfant vous renvoie votre propre fuite en avant — sa dispersion ressemble à votre suractivité. Vous risquez de vous reconnaître dans une dimension qui vous échappe et que vous ne savez pas réguler. Il vous invite à incarner enfin la profondeur, pour vous-même autant que pour lui.",
  },
  "3-8": {
    pointsForts: "Vous reconnaissez sa puissance et savez la canaliser. Il vous respecte parce que vous ne pliez pas.",
    vigilances: "Deux personnalités fortes peuvent rivaliser. Si vous gagnez toujours, il se braque ; si vous cédez toujours, il vous méprise.",
    conseil: "Soyez ferme sans être autoritaire. Reconnaissez sa force comme un atout, pas comme un problème.",
    parentSoutien: "Votre enfant Type 8 ne veut ni séduction ni admiration — il veut un parent qui tient son cap et reconnaît sa force. Vos stratégies d'image ne marchent pas sur lui, il les démasque. Soyez direct, ferme, et reconnaissez sa puissance plutôt que d'essayer de la canaliser pour qu'elle vous valorise.",
    parentChallenge: "Cet enfant ne se laisse pas modeler à votre image — sa volonté brute écrase vos stratagèmes. Sa force vous renvoie votre propre déficit d'authenticité. Il vous oblige à retrouver votre verticalité réelle, sans masque ni performance — un terrain de transformation profond.",
  },
  "3-9": {
    pointsForts: "Votre dynamisme le sort doucement de sa torpeur. Sa sérénité vous rappelle de ralentir.",
    vigilances: "Votre rythme rapide le fait disparaître. Il dit « oui » mais s'absente intérieurement pour se protéger de votre énergie.",
    conseil: "Ralentissez quand vous lui parlez. Demandez-lui son avis et attendez vraiment la réponse — elle vient lentement.",
    parentSoutien: "Votre enfant Type 9 ne mesure pas la valeur en accomplissements — sa quête est l'harmonie, et vos pressions le font disparaître. Acceptez sa lenteur comme son rythme légitime, pas comme un retard à combler. Demandez-lui ses préférences avec patience : il les a, mais ne les donne pas spontanément.",
    parentChallenge: "Cet enfant illustre exactement votre flèche de désintégration : sous stress, vous devenez comme lui — engourdi, en retrait, déconnecté. Le voir vous renvoie un futur possible si vous ne ralentissez pas. Il vous oblige à apprendre à exister sans produire — une leçon vitale pour vous, pas seulement pour lui.",
  },

  // ── Parent Type 4 ──
  "4-1": {
    pointsForts: "Vous reconnaissez la beauté de sa rigueur et la valorisez. Il se sent vu dans sa singularité.",
    vigilances: "Votre intensité émotionnelle peut le déstabiliser. Il a besoin de constance, pas de vagues.",
    conseil: "Stabilisez votre humeur autour de lui. Et célébrez sa différence à votre manière — il est unique, mais à sa façon, pas à la vôtre.",
    parentSoutien: "Votre enfant Type 1 a besoin de stabilité émotionnelle, pas de vos vagues d'humeur intenses. Vos passions et tristesses peuvent l'angoisser — il interprétera vos états comme étant de sa faute. Tenez votre rôle de parent stable même quand vous traversez vos propres tempêtes intérieures.",
    parentChallenge: "Cet enfant vous renvoie une rigueur que vous trouvez « peu créative » et vit difficilement vos débordements. Sa structure rigoureuse heurte votre besoin d'authenticité émotionnelle non filtrée. Il vous oblige à apprendre la discipline et la régularité — votre flèche d'intégration vers le Type 1, justement.",
  },
  "4-2": {
    pointsForts: "Vous accueillez sa générosité avec une vraie reconnaissance. Il sent que vous voyez son cœur.",
    vigilances: "Votre intensité peut l'écraser. Il met ses propres émotions de côté pour gérer les vôtres.",
    conseil: "Veillez à ne pas inverser les rôles. C'est à vous de tenir l'espace émotionnel, pas à lui.",
    parentSoutien: "Votre enfant Type 2 cherche la connexion plus que la profondeur — il a besoin de chaleur stable, pas d'orages émotionnels. Évitez de l'aspirer dans vos états intérieurs : ce n'est pas son rôle de vous comprendre. Apprenez-lui à honorer ses propres besoins avant de répondre aux vôtres.",
    parentChallenge: "Cet enfant donne facilement, et votre Envie peut s'agripper à son amour comme à une preuve que vous êtes aimable. Vous risquez de devenir affectivement demandeur sans le voir. Il vous oblige à trouver votre source d'amour à l'intérieur, pas dans son don — un travail d'autonomie intérieure.",
  },
  "4-3": {
    pointsForts: "Vous voyez sa profondeur derrière son besoin de réussir. Vous savez l'aider à se connecter à lui-même.",
    vigilances: "Vos « tu vaux mieux que la course aux résultats » peuvent être perçus comme un rejet de ce qu'il aime.",
    conseil: "Honorez son besoin de briller — ce n'est pas un défaut. Aidez-le à trouver l'authenticité DANS la performance, pas contre elle.",
    parentSoutien: "Votre enfant Type 3 a besoin de votre fierté simple, pas de vos doutes existentiels sur le sens de ses succès. Célébrez ses victoires sans les analyser ni les relativiser. Apprenez-lui en parallèle qu'il vaut au-delà de ce qu'il accomplit — sans en faire un drame.",
    parentChallenge: "Cet enfant traverse la vie en mode efficace, ce qui peut vous paraître superficiel ou inauthentique. Vous risquez de vouloir « le ralentir pour qu'il sente » alors que ce n'est pas son chemin. Il vous oblige à respecter une autre forme d'intelligence — l'action incarnée — et à canaliser votre profondeur en projets concrets.",
  },
  "4-4": {
    pointsForts: "Vous vous comprenez en profondeur, sans mots. Complicité émotionnelle rare et précieuse.",
    vigilances: "Risque de cocon mélancolique. Deux 4 ensemble peuvent s'enfermer dans l'intensité et perdre le contact avec le réel.",
    conseil: "Cultivez la légèreté, le rire, le quotidien banal. Il a besoin de stabilité émotionnelle, pas d'un miroir d'intensité.",
    parentSoutien: "Votre enfant porte la même croyance que vous : « il me manque l'essentiel ». À deux, vous risquez de cultiver une mélancolie partagée qui vous semble belle mais l'enferme. Apportez-lui de la stabilité, du concret, du « tout va bien aujourd'hui » — l'antidote dont vous avez tous deux besoin.",
    parentChallenge: "Cet enfant est votre miroir d'envie — il veut ce qu'il n'a pas, et vous le reconnaissez intimement. Sa souffrance vous attire et active votre besoin de la valider, alors qu'elle a besoin d'être traversée, pas magnifiée. Sa guérison passe par la vôtre : incarner ensemble l'équanimité, pas la mélancolie partagée.",
  },
  "4-5": {
    pointsForts: "Vous respectez son besoin d'espace et de profondeur. Relation riche, faite de moments choisis.",
    vigilances: "Vous deux pouvez vous isoler et créer une bulle où le monde extérieur n'existe plus.",
    conseil: "Forcez-vous à sortir, à inviter, à montrer le monde large. Il a besoin de stimulation extérieure pour ne pas se renfermer.",
    parentSoutien: "Votre enfant Type 5 préfère le contenu factuel à l'effusion émotionnelle — vos partages intenses peuvent l'envahir. Respectez son besoin d'espace mental et de questions concrètes. Aimez-le par le respect de ses centres d'intérêt, pas par l'invitation à ressentir avec vous.",
    parentChallenge: "Cet enfant vit dans la tête, vous vivez dans le cœur — il peut vous paraître froid et il vous trouve trop intense. Sa retenue émotionnelle réveille votre Envie : « pourquoi ne se livre-t-il pas plus ? ». Il vous oblige à respecter une autre intériorité que la vôtre — une humilité émotionnelle précieuse.",
  },
  "4-6": {
    pointsForts: "Vous accueillez ses peurs avec empathie. Il se sent vraiment compris dans ses inquiétudes.",
    vigilances: "Votre intensité émotionnelle nourrit son anxiété. S'il sent que rien n'est stable, il panique.",
    conseil: "Stabilisez vos humeurs et tenez vos engagements. La prévisibilité est plus précieuse que la profondeur pour cet enfant.",
    parentSoutien: "Votre enfant Type 6 a besoin de votre stabilité, pas de votre intensité émotionnelle. Vos états changeants l'angoissent : il a besoin d'un cadre prévisible pour faire baisser son anxiété. Tenez vos engagements concrets à la lettre — c'est plus utile pour lui que mille déclarations d'amour.",
    parentChallenge: "Cet enfant doute, scanne, anticipe — sa peur peut vous paraître peu poétique alors qu'elle est aussi profonde que la vôtre. Vous pourriez minimiser son anxiété ou la dramatiser. Il vous invite à incarner la solidité tranquille — quelque chose que votre Envie n'a jamais cherché mais dont il a urgent besoin.",
  },
  "4-7": {
    pointsForts: "Sa joie vous éclaire. Vous savez aussi reconnaître sa profondeur cachée derrière l'enthousiasme.",
    vigilances: "Vos états d'âme intenses le poussent à fuir vers le divertissement. Il se construit une carapace joyeuse.",
    conseil: "Allégez votre intensité quand vous êtes avec lui. Et apprenez-lui à toucher ses émotions difficiles sans les fuir.",
    parentSoutien: "Votre enfant Type 7 fuit la lourdeur émotionnelle — vos partages sur le sens de la vie le mettent en alerte de « privation ». Honorez sa joie sans l'analyser ; ne tirez pas constamment ses émotions vers la profondeur. Apprenez-lui doucement à habiter l'inconfort sans le forcer à plonger.",
    parentChallenge: "Cet enfant vit en surface lumineuse, et vous y voyez de la fuite alors que c'est sa nature. Son optimisme automatique peut activer votre Envie : « pourquoi je n'arrive pas à être léger comme ça ? ». Il vous offre un autre rapport à la vie — moins habiter le manque, plus habiter le présent.",
  },
  "4-8": {
    pointsForts: "Vous voyez sa vulnérabilité derrière la force. Avec vous, il peut être tendre sans avoir honte.",
    vigilances: "Vos vagues émotionnelles le poussent à se durcir pour se protéger. Il devient son propre rempart.",
    conseil: "Soyez stable et fiable. Sa force ne demande qu'à devenir tendresse — mais seulement dans un cadre sûr.",
    parentSoutien: "Votre enfant Type 8 méprise la fragilité émotionnelle qu'il associe à la faiblesse — vos états mélancoliques le perturbent. Évitez de lui imposer vos vagues intérieures : il a besoin que vous teniez le cap, pas que vous lui montriez vos blessures. Reconnaissez sa force tranquillement.",
    parentChallenge: "Cet enfant nie la vulnérabilité que vous habitez en permanence — vous le trouvez « bloqué », il vous trouve « excessif ». Sa force brute vous renvoie à votre propre absence de structure intérieure. Il vous oblige à canaliser votre intensité en action — votre flèche d'intégration vers le Type 1, par ce miroir contraire.",
  },
  "4-9": {
    pointsForts: "Sa douceur vous apaise. Vous savez ressentir avec lui sans le forcer à parler.",
    vigilances: "Votre intensité l'efface. Il s'absente pour ne pas porter vos émotions, et vous perdez le contact avec lui.",
    conseil: "Régulez votre intensité, posez des questions ouvertes, écoutez les silences. Sa parole vient lentement.",
    parentSoutien: "Votre enfant Type 9 absorbe les émotions ambiantes et fusionne avec vos états — vos tempêtes intérieures deviennent les siennes. Tenez votre intensité pour vous : il n'est pas votre confident. Aidez-le à dire ses préférences en posant des choix concrets, pas des questions ouvertes.",
    parentChallenge: "Cet enfant s'efface précisément où votre Envie cherche la singularité — il vous semble fade alors qu'il a juste désappris à se vouloir. Vous risquez d'être déçu de son manque de profondeur affichée. Il vous oblige à aimer ce qui ne se met pas en scène — un bel apprentissage d'humilité.",
  },

  // ── Parent Type 5 ──
  "5-1": {
    pointsForts: "Vous respectez son sens du devoir et l'accompagnez avec calme. Vous lui apportez la profondeur derrière la rigueur.",
    vigilances: "Vous êtes peu démonstratif, lui cherche votre approbation. Votre silence est interprété comme une critique.",
    conseil: "Verbalisez votre fierté — il ne la devine pas. Et offrez-lui des explications de fond, pas juste des évaluations.",
    parentSoutien: "Votre enfant Type 1 a besoin de chaleur affective explicite, pas seulement de votre cohérence intellectuelle. Votre retrait peut être interprété comme un désaveu silencieux qui nourrit son auto-critique. Initiez régulièrement les contacts physiques et verbalisez votre fierté — il en a vraiment besoin.",
    parentChallenge: "Cet enfant vous demande une présence émotionnelle qui vous coûte beaucoup d'énergie. Sa quête d'approbation fréquente sollicite votre Avarice de soi : vous voulez vous retirer, il insiste. Il vous oblige à donner sans calculer le coût — un apprentissage vital pour votre intégration vers le Type 8.",
  },
  "5-2": {
    pointsForts: "Vous lui offrez l'espace de penser et d'être seul, ce qu'il sait apprécier mais peu d'enfants reçoivent.",
    vigilances: "Il a besoin de chaleur affective explicite. Votre retenue émotionnelle peut être vécue comme un rejet.",
    conseil: "Faites des câlins, dites « je t'aime » à voix haute. La distance n'est pas une option pour cet enfant.",
    parentSoutien: "Votre enfant Type 2 cherche la connexion émotionnelle — votre tendance à vous retirer dans vos pensées le blesse en silence. Programmez explicitement des moments de présence dédiée : 15 minutes vraiment avec lui, sans téléphone ni livre. Verbalisez votre amour, même si c'est inconfortable pour vous.",
    parentChallenge: "Cet enfant a besoin de plus que ce que vous donnez naturellement — sa demande affective constante active votre sentiment d'être envahi. Vous pouvez le vivre comme une intrusion alors que c'est son langage d'amour. Il vous oblige à sortir de votre tour pour incarner votre savoir dans le contact — votre vraie sagesse.",
  },
  "5-3": {
    pointsForts: "Vous tempérez son agitation par votre calme. Il apprend à réfléchir avant d'agir grâce à vous.",
    vigilances: "Il a besoin de votre admiration enthousiaste. Vos analyses froides de ses succès l'éteignent.",
    conseil: "Manifestez votre fierté avec des mots et de l'énergie. Et participez à ses victoires au lieu de les commenter.",
    parentSoutien: "Votre enfant Type 3 a besoin de votre attention valorisante en temps réel — il ne supporte pas les retours différés ou intellectualisés. Soyez présent à ses « regarde papa/maman ! » : votre regard nourrit littéralement son sentiment de valeur. Dites-lui aussi qu'il vaut au-delà de ses performances.",
    parentChallenge: "Cet enfant vit en surface visible et veut être vu — l'opposé de votre besoin de profondeur invisible. Vous pouvez le trouver superficiel, il vous trouve absent. Il vous oblige à sortir de votre tour pour vous engager dans le monde — exactement ce que votre flèche d'intégration vers le Type 8 demande.",
  },
  "5-4": {
    pointsForts: "Vous respectez son monde intérieur et sa créativité. Vous savez communiquer en profondeur sans surcharge.",
    vigilances: "Il a besoin de connexion émotionnelle, pas seulement intellectuelle. Votre froideur apparente le blesse.",
    conseil: "Asseyez-vous près de lui. Touchez-le, regardez ses créations longuement. La présence physique compte autant que les idées.",
    parentSoutien: "Votre enfant Type 4 a besoin que ses émotions soient accueillies, pas analysées intellectuellement. Vos tentatives d'expliquer ses sentiments lui donnent l'impression de ne pas être ressenti vraiment. Asseyez-vous à côté de lui en silence : votre présence calme est plus thérapeutique que mille analyses.",
    parentChallenge: "Cet enfant vit dans le ressenti, vous vivez dans l'analyse — il vous trouve froid, vous le trouvez excessif. Sa demande émotionnelle dépasse vos ressources et déclenche votre repli. Il vous oblige à descendre de votre tête vers votre cœur, sans solutionner — un territoire inconnu pour vous.",
  },
  "5-5": {
    pointsForts: "Vous vous comprenez sans mots. Respect mutuel des silences et de l'espace personnel.",
    vigilances: "Risque de relation parallèle où chacun vit dans son monde. Il a besoin de plus que vous.",
    conseil: "Initiez le contact malgré votre nature réservée. Asseyez-vous dans sa chambre, partagez une activité — la présence suffit.",
    parentSoutien: "Votre enfant porte la même croyance que vous : « le monde est envahissant, je dois protéger mon énergie ». À deux, vous risquez de bâtir une famille de cohabitants courtois plutôt qu'un nid affectif. Forcez-vous à initier les contacts chaleureux — il ne le fera jamais le premier.",
    parentChallenge: "Cet enfant est votre miroir d'avarice — sa retenue, son besoin d'espace, sa difficulté à donner émotionnellement. Vous vous comprenez parfaitement, et c'est le piège : personne n'apprend à donner. Sa guérison passe par la vôtre : oser ensemble l'engagement vital — votre flèche d'intégration vers le Type 8 partagée.",
  },
  "5-6": {
    pointsForts: "Votre calme analytique apaise son anxiété. Vous lui apprenez à comprendre ses peurs au lieu d'y céder.",
    vigilances: "Il a besoin de chaleur explicite et constante. Votre distance émotionnelle peut alimenter son insécurité.",
    conseil: "Rassurez avec des mots ET des gestes. Et tenez vos rituels — pour lui, la prévisibilité est sécurisante.",
    parentSoutien: "Votre enfant Type 6 a besoin de présence rassurante régulière, pas seulement de votre disponibilité « si vraiment ». Son anxiété s'apaise par la prévisibilité de votre attention. Tenez vos rendez-vous (lecture du soir, weekends), c'est votre engagement physique qui le sécurise.",
    parentChallenge: "Cet enfant a besoin de votre lien plus que vous n'aimez en donner — il quémande de la sécurité que vous trouvez excessive. Votre rétention nourrit son doute. Il vous oblige à prouver votre engagement non par les mots mais par la présence régulière — un effort qui transforme votre rapport au don.",
  },
  "5-7": {
    pointsForts: "Vous savez canaliser son énergie débordante en l'orientant vers la profondeur. Vous lui ouvrez de nouveaux mondes.",
    vigilances: "Son besoin de stimulation et de jeu peut vous épuiser. Vous risquez de vous retirer dans votre bulle.",
    conseil: "Acceptez de jouer même quand vous préféreriez lire. Et donnez-lui des règles — son énergie a besoin d'un cadre.",
    parentSoutien: "Votre enfant Type 7 vous épuise par son énergie débordante — il a besoin de mouvement, vous avez besoin de retrait. Établissez des rythmes clairs : moments d'effervescence partagée, moments de calme garanti. Aidez-le à découvrir le plaisir de la profondeur, sans lui imposer votre besoin d'isolement.",
    parentChallenge: "Cet enfant illustre votre flèche de désintégration : sous stress, vous fuyez aussi vers la dispersion. Sa course en avant peut vous renvoyer un futur peu désirable. Il vous oblige à canaliser son énergie sans la museler, ce qui vous aide à canaliser la vôtre.",
  },
  "5-8": {
    pointsForts: "Votre calme apaise sa puissance. Vous ne vous laissez pas impressionner par sa force.",
    vigilances: "Il teste vos limites avec vigueur. Si vous vous retirez face à lui, il prend tout l'espace et perd ses repères.",
    conseil: "Tenez vos positions calmement. Et engagez-vous corporellement avec lui — bagarres pour rire, sport, action concrète.",
    parentSoutien: "Votre enfant Type 8 a besoin d'un parent qui s'incarne, pas qui observe — il méprise la passivité. Affirmez votre présence physique et votre cadre fermement, sans expliquer à l'infini. Reconnaissez sa force et défiez-le par l'action partagée plutôt que par la parole.",
    parentChallenge: "Cet enfant porte exactement ce que vous cherchez en intégration : l'engagement, l'incarnation, la force d'agir sans tout comprendre d'abord. Sa puissance peut vous intimider et activer votre repli. Il est votre maître involontaire — apprendre à vous engager corps entier auprès de lui est probablement votre plus grande croissance parentale.",
  },
  "5-9": {
    pointsForts: "Deux profils paisibles qui apprécient le calme. Vous ne vous bousculez pas mutuellement.",
    vigilances: "Risque de vie parallèle dans le silence. Personne n'initie, personne ne demande, personne ne se rencontre vraiment.",
    conseil: "Forcez le contact régulier — un dîner, une promenade, une activité commune. Sans cela, vous vous éloignez doucement.",
    parentSoutien: "Votre enfant Type 9 a besoin de votre engagement actif pour s'éveiller — votre retrait + son auto-effacement = invisibilité totale. Demandez-lui ses préférences avec patience et insistance bienveillante. Modélisez l'affirmation : il apprend par observation.",
    parentChallenge: "Cet enfant fond et disparaît, exactement comme vous le faites différemment. Vos deux retraits forment une famille silencieuse où personne ne s'affirme. Il vous oblige à incarner enfin votre présence — pour qu'il apprenne à incarner la sienne. Vos deux libérations sont liées.",
  },

  // ── Parent Type 6 ──
  "6-1": {
    pointsForts: "Vous lui apportez de la sécurité par votre fiabilité. Il s'épanouit dans votre cadre clair et constant.",
    vigilances: "Votre anxiété alimente son perfectionnisme. Il s'épuise à essayer d'éviter les catastrophes que vous redoutez.",
    conseil: "Travaillez VOTRE anxiété pour ne pas la lui transmettre. Et faites-lui confiance pour décider seul, à sa mesure.",
    parentSoutien: "Votre enfant Type 1 a déjà son propre critique intérieur — votre anxiété protectrice peut se traduire par des règles surajoutées qui l'écrasent. Allégez vos consignes, faites confiance à son sens du devoir naturel. Rassurez-le sur le droit à l'erreur que vous-même n'arrivez pas toujours à prendre.",
    parentChallenge: "Cet enfant amplifie votre tendance au contrôle anxieux — vous voulez le protéger de tout en cadrant tout. Sa rigueur valide votre vigilance et ferme votre famille à la spontanéité. Il vous oblige à incarner votre flèche d'intégration vers le Type 9 : la confiance tranquille au lieu de la prudence permanente.",
  },
  "6-2": {
    pointsForts: "Vous lui offrez chaleur et sécurité. Foyer affectueux et prévisible — il s'y sent profondément aimé.",
    vigilances: "Votre besoin de protection peut l'étouffer. Il apprend à se sacrifier pour ne pas vous inquiéter.",
    conseil: "Faites confiance à sa capacité à gérer le monde. Et apprenez-lui à dire « non » — y compris à vos demandes.",
    parentSoutien: "Votre enfant Type 2 cherche votre amour explicite — vos doutes intérieurs peuvent le faire se sentir non aimé. Verbalisez votre tendresse régulièrement et fiabilisez vos rituels affectifs (bisous du soir, mots de réconfort). Ne le laissez jamais incertain de votre attachement.",
    parentChallenge: "Cet enfant a besoin d'une affection que votre méfiance instinctive freine parfois. Vous le testez sans le vouloir, et il en souffre. Il vous oblige à donner sans vérifier, sans conditions — un territoire vulnérable que votre Peur fuit habituellement.",
  },
  "6-3": {
    pointsForts: "Vous voyez sa fragilité derrière son énergie. Vous savez l'ancrer quand il s'épuise dans la performance.",
    vigilances: "Il fuit votre anxiété en surinvestissant la réussite. Plus vous vous inquiétez, plus il performe pour vous rassurer.",
    conseil: "Détendez-vous visiblement quand il est avec vous. Aimez-le sans condition de réussite, c'est ce qui le libère.",
    parentSoutien: "Votre enfant Type 3 a besoin de votre confiance avant votre prudence — vos « attention à... » brident son élan. Validez ses ambitions, accompagnez-le dans la prise de risque mesurée. Rappelez-lui qu'il vaut au-delà de ses performances quand vos craintes pour lui se réveillent.",
    parentChallenge: "Cet enfant illustre votre flèche de désintégration : sous stress, vous courez vers la performance et l'image. Le voir réussir peut activer en vous un mélange admiratif/anxieux complexe. Il vous invite à célébrer le succès sans l'inquiéter — vous lui apprenez et vous apprenez en même temps.",
  },
  "6-4": {
    pointsForts: "Vous accueillez ses émotions intenses avec sérieux. Vous ne les minimisez pas et il vous en est reconnaissant.",
    vigilances: "Vos angoisses + son intensité = spirale émotionnelle. Vous pouvez vous nourrir mutuellement dans le drame.",
    conseil: "Restez ancré quand il vacille. Et n'ajoutez pas vos peurs à ses tempêtes — il en a déjà beaucoup à gérer.",
    parentSoutien: "Votre enfant Type 4 vit dans des intensités émotionnelles qui peuvent activer votre alarme intérieure. Évitez de pathologiser ses émotions ou de chercher à les « réparer ». Apprenez-lui à habiter ses tempêtes en restant présent à ses côtés sans dramatiser.",
    parentChallenge: "Cet enfant explore des territoires émotionnels que votre Peur préfère éviter. Sa mélancolie peut vous angoisser ou vous attendrir excessivement. Il vous oblige à descendre dans l'inconfort émotionnel sans vouloir le résoudre — un courage différent du vôtre.",
  },
  "6-5": {
    pointsForts: "Vous respectez son besoin d'analyse et de calme. Vous lui apportez la chaleur, il vous apporte la pensée.",
    vigilances: "Il a besoin d'un parent rassurant, pas inquiet. Vos doutes constants le poussent à se réfugier dans la tête.",
    conseil: "Affichez votre confiance même quand vous doutez intérieurement. Et autorisez-le à se retirer pour penser — c'est sa façon de gérer.",
    parentSoutien: "Votre enfant Type 5 a besoin d'autonomie tranquille — votre besoin de vérifier régulièrement « tout va bien ? » l'envahit. Donnez-lui de l'espace garanti et des règles claires sur quand il peut être seul. Faites confiance à sa capacité à venir vers vous quand il en a besoin.",
    parentChallenge: "Cet enfant ne vous donne pas la confirmation affective que vous cherchez — son retrait active votre doute (« est-ce qu'il m'aime ? »). Vous risquez de le solliciter pour vous rassurer, ce qui le fait s'éloigner davantage. Il vous oblige à habiter votre propre confiance sans demander preuve.",
  },
  "6-6": {
    pointsForts: "Vous vous comprenez sur le terrain de la vigilance. Loyauté et fiabilité réciproques.",
    vigilances: "Vos inquiétudes s'amplifient mutuellement. Vous pouvez créer une bulle de peur où le monde extérieur paraît dangereux.",
    conseil: "Cultivez la confiance en l'avenir. Modélisez le courage face à l'incertitude — il l'apprend en vous regardant.",
    parentSoutien: "Votre enfant porte la même croyance que vous : « le monde est dangereux ». À deux, vous risquez de bâtir une famille de l'anxiété mutuelle où chaque alerte devient menace. Pratiquez le « et si ça se passait bien ? » ensemble et célébrez les preuves quotidiennes de sécurité.",
    parentChallenge: "Cet enfant est votre miroir d'anxiété — vous reconnaissez chaque scénario catastrophe qu'il invente. Votre vigilance partagée nourrit son inquiétude au lieu de la calmer. Sa guérison passe par la vôtre : incarner ensemble le courage tranquille — votre Vertu commune.",
  },
  "6-7": {
    pointsForts: "Sa joie de vivre vous rassure : la vie n'est pas que dangers. Vous lui offrez la solidité, il vous offre la légèreté.",
    vigilances: "Vous voulez le protéger, lui veut explorer. Vos « attention » répétés peuvent éteindre son enthousiasme naturel.",
    conseil: "Laissez-le prendre des risques mesurés. Sa confiance dans la vie est un cadeau — ne la lui volez pas par excès de protection.",
    parentSoutien: "Votre enfant Type 7 fuit l'inquiétude par la stimulation — vos « attention à... » constants l'agressent. Tenez peu d'alertes mais tenez-les fermement, et accompagnez-le dans les expériences nouvelles. Apprenez de son optimisme : il porte précisément ce qui vous manque.",
    parentChallenge: "Cet enfant esquive votre prudence et prend des risques qui activent toutes vos alarmes. Sa légèreté vous semble inconsciente alors que c'est sa façon de gérer la peur. Il vous oblige à modérer vos projections catastrophes — un travail libérateur pour votre famille.",
  },
  "6-8": {
    pointsForts: "Sa force vous rassure : il sait se défendre. Vous savez aussi voir sa vulnérabilité derrière la carapace.",
    vigilances: "Il teste vos limites avec puissance. Si vous reculez par peur du conflit, il perd ses repères et s'agite davantage.",
    conseil: "Soyez ferme et calme face à ses débordements. Votre solidité (pas votre dureté) le sécurise.",
    parentSoutien: "Votre enfant Type 8 méprise la peur et a besoin d'un parent qui ne flanche pas. Vos doutes affichés affaiblissent votre autorité à ses yeux. Affirmez vos règles avec calme et sans justification anxieuse — il respectera la fermeté incarnée, pas l'inquiétude transformée en sanction.",
    parentChallenge: "Cet enfant porte la force que votre Peur n'ose pas habiter. Sa puissance peut vous intimider ou vous donner envie de la contrôler. Il vous oblige à trouver votre propre autorité intérieure — un cadeau précieux pour qui cherche toujours l'autorité dehors.",
  },
  "6-9": {
    pointsForts: "Sa sérénité vous apaise. Foyer doux où chacun trouve sa place sans heurts.",
    vigilances: "Vous vous évitez mutuellement les conflits, mais ils s'accumulent en silence. Et vos angoisses peuvent perturber son calme.",
    conseil: "Initiez les conversations difficiles avec douceur. Et rassurez-vous : il va bien — son calme n'est pas un signe d'inquiétude.",
    parentSoutien: "Votre enfant Type 9 absorbe vos anxiétés sans le dire — votre stress devient son fond émotionnel quotidien. Tenez votre paix intérieure pour la lui transmettre. Posez-lui des choix simples (« tu veux A ou B ? ») et célébrez ses préférences exprimées — c'est rare et précieux.",
    parentChallenge: "Cet enfant porte précisément la qualité que vous cherchez en intégration : la paix tranquille du Type 9. Sa capacité à ne pas s'agiter pour rien peut vous paraître étrange ou même inquiétante. Il est votre maître involontaire — apprendre de sa quiétude est votre voie de libération.",
  },

  // ── Parent Type 7 ──
  "7-1": {
    pointsForts: "Votre énergie l'allège. Vous lui montrez qu'on peut vivre sans être parfait à chaque instant.",
    vigilances: "Votre dispersion peut frustrer son besoin de stabilité. Il a besoin de routine et de tenue des promesses.",
    conseil: "Tenez vos engagements et vos rituels. Sa rigueur est une force — ne la confondez pas avec de la rigidité.",
    parentSoutien: "Votre enfant Type 1 a besoin de structure et de cohérence — votre tendance à improviser le déstabilise. Tenez les rituels (heures de coucher, devoirs) avec régularité même si ça vous ennuie. Validez son sérieux sans le pathologiser.",
    parentChallenge: "Cet enfant est votre opposé polaire : votre légèreté heurte sa rigueur. Sa critique implicite (« tu ne tiens pas tes engagements ») touche votre flèche de désintégration vers le Type 1 — vous risquez de devenir cassant à votre tour. Il vous oblige à ancrer votre énergie en discipline, ce qui paradoxalement vous libère.",
  },
  "7-2": {
    pointsForts: "Joie et chaleur réciproques. Foyer pétillant où l'on rit et où l'on aime fort.",
    vigilances: "Il prend soin de votre humeur. Si vous fuyez les moments difficiles, il apprend à porter seul ses propres tristesses.",
    conseil: "Restez disponible quand la fête est finie. Et autorisez-vous à montrer la tristesse — il a besoin de voir que c'est OK.",
    parentSoutien: "Votre enfant Type 2 a besoin de connexion stable, pas de votre énergie « ce-soir-on-fait-tout-et-demain-on-verra ». Tenez la régularité affective : un câlin quotidien à la même heure vaut mieux qu'une grande effusion sporadique. Aidez-le à exprimer ses besoins, vous serez tenté de tout deviner.",
    parentChallenge: "Cet enfant veut une présence ancrée que votre dispersion ne donne pas naturellement. Sa demande affective constante peut vous saturer et activer votre fuite. Il vous oblige à atterrir, à habiter le présent affectif au lieu de courir vers la prochaine excitation.",
  },
  "7-3": {
    pointsForts: "Duo dynamique, projets sans fin, énergie contagieuse. Votre admiration mutuelle vous porte.",
    vigilances: "Vous fuyez tous les deux les émotions difficiles. La famille devient une succession d'activités sans profondeur.",
    conseil: "Imposez-vous des moments calmes et profonds. Posez la question « comment tu te sens VRAIMENT ? » et écoutez.",
    parentSoutien: "Votre enfant Type 3 a besoin que vous valorisiez ses accomplissements concrets, pas seulement votre amour général enthousiaste. Soyez précis dans vos félicitations (« j'ai vu que tu... ») et accompagnez-le dans la finalisation de ses projets — domaine où vous-même peinez.",
    parentChallenge: "Cet enfant termine ce que vous commencez, et son sérieux peut vous ennuyer ou vous renvoyer votre dispersion. Vous risquez de le trouver « trop sérieux » alors qu'il est juste appliqué. Il vous oblige à respecter une autre voie d'épanouissement — l'engagement soutenu.",
  },
  "7-4": {
    pointsForts: "Sa profondeur vous touche. Il vous apprend à ralentir et à ressentir — c'est précieux pour vous deux.",
    vigilances: "Vous fuyez vers le positif quand il a besoin de plonger. Votre « allez, ça va passer » le coupe de lui-même.",
    conseil: "Tenez l'espace de ses émotions sans chercher à les transformer. La présence vaut plus que les solutions.",
    parentSoutien: "Votre enfant Type 4 vit dans la profondeur émotionnelle — votre rationalisation positive (« mais c'est pas si grave ! ») le blesse profondément. Honorez ses tristesses sans chercher à les transformer en opportunités. Asseyez-vous dans son inconfort sans plan B mental.",
    parentChallenge: "Cet enfant vous force à habiter exactement ce que vous fuyez : la lourdeur, la mélancolie, la gravité. Sa tristesse vous met en panique de privation. Il vous invite à incarner votre Vertu — la sobriété : être pleinement présent à ce qui est, même quand c'est dense.",
  },
  "7-5": {
    pointsForts: "Vous lui ouvrez le monde large par votre énergie. Il vous apprend la profondeur et la concentration.",
    vigilances: "Votre rythme rapide et vos changements de plan le déstabilisent. Il a besoin d'espace mental pour digérer.",
    conseil: "Annoncez les changements à l'avance. Et acceptez ses temps de retrait — ce n'est pas de l'antisocial, c'est de la recharge.",
    parentSoutien: "Votre enfant Type 5 a besoin de calme et de prévisibilité — votre énergie spontanée et bruyante l'épuise. Annoncez vos arrivées, respectez son besoin de retrait, tempérez votre tendance à proposer mille activités. Apprenez à habiter son silence sans le combler.",
    parentChallenge: "Cet enfant porte exactement ce que vous cherchez en intégration : la profondeur, la concentration, la satisfaction de la maîtrise. Sa quiétude peut vous paraître ennuyeuse alors qu'elle est votre médecine. Il est votre maître involontaire — apprendre à habiter le silence avec lui est votre voie de libération.",
  },
  "7-6": {
    pointsForts: "Votre optimisme rassure ses peurs. Vous lui montrez qu'il y a toujours une porte de sortie.",
    vigilances: "Vos « ne t'inquiète pas » sans écoute le laissent seul avec ses angoisses. Il n'ose plus en parler.",
    conseil: "Validez ses peurs avant de les dépasser. « C'est normal d'avoir peur de ça, voilà ce qu'on peut faire ensemble. »",
    parentSoutien: "Votre enfant Type 6 a besoin de cohérence et de prévisibilité — votre changement constant de plans le rend anxieux. Tenez vos engagements à la lettre, prévenez à l'avance des modifications. Rassurez-le explicitement : votre joie n'est pas une garantie de sécurité pour lui.",
    parentChallenge: "Cet enfant amplifie sa peur quand votre légèreté contourne ses inquiétudes. Vous le trouvez excessif, il vous trouve inconscient. Il vous oblige à honorer la prudence — un mode d'être que vous n'avez jamais cultivé mais qui le sécurise vitalement.",
  },
  "7-7": {
    pointsForts: "Famille pétillante, créative, jamais ennuyeuse. Vous l'aidez à embrasser la vie pleinement.",
    vigilances: "Vous fuyez ensemble les moments difficiles. Personne ne pose les conversations sérieuses ni ne finit les projets.",
    conseil: "Forcez-vous à rester quand c'est inconfortable. Et apprenez-lui à finir avant de commencer autre chose.",
    parentSoutien: "Votre enfant porte la même croyance que vous : « la vie doit être stimulante, fuir l'ennui à tout prix ». À deux, vous risquez de bâtir une famille du papillonnage où personne ne digère rien. Modélisez explicitement le « rester avec », la finalisation, la satisfaction du présent.",
    parentChallenge: "Cet enfant est votre miroir de gourmandise — sa course aux options reflète la vôtre. Vous vous comprenez parfaitement, et c'est le piège : personne n'apprend à atterrir. Sa guérison passe par la vôtre : incarner ensemble la sobriété — votre Vertu partagée.",
  },
  "7-8": {
    pointsForts: "Sa puissance vous stimule. Vous savez transformer son énergie brute en jeu et en aventure.",
    vigilances: "Il a besoin de cadres clairs. Votre flexibilité naturelle peut être perçue comme un manque de tenue.",
    conseil: "Tenez les règles essentielles fermement. Soyez flexible sur les détails, ferme sur les principes.",
    parentSoutien: "Votre enfant Type 8 a besoin d'un parent qui tient son cap — vos « on verra plus tard » ou changements d'avis activent sa rébellion. Soyez direct, ferme et fiable. Reconnaissez sa force, ne cherchez pas à l'amuser pour adoucir le cadre.",
    parentChallenge: "Cet enfant ne se laisse pas distraire par votre charme — il veut un parent solide, pas séduisant. Sa volonté brute peut vous mettre en panique de contrainte (votre peur de fond). Il vous oblige à incarner votre verticalité, à être clair même quand c'est inconfortable.",
  },
  "7-9": {
    pointsForts: "Votre énergie le sort doucement de sa torpeur. Sa sérénité vous repose de votre agitation.",
    vigilances: "Votre vitesse l'efface. Il dit « oui à tout » pour suivre votre rythme, et perd contact avec ses propres envies.",
    conseil: "Ralentissez régulièrement. Demandez-lui ce qu'IL veut, pas ce qu'il pense que vous voulez qu'il veuille.",
    parentSoutien: "Votre enfant Type 9 a besoin de calme — votre énergie débordante l'épuise et le fait s'effacer encore plus. Tenez des temps de tranquillité partagée. Demandez-lui ses préférences avec insistance bienveillante : il en a, mais ne les donne pas spontanément.",
    parentChallenge: "Cet enfant absorbe votre énergie sans la traiter — votre exubérance le dilue dans votre vouloir. Sa lenteur peut vous frustrer ou vous renvoyer à votre propre fuite du calme. Il vous oblige à modérer votre rythme pour honorer le sien — un atterrissage que vous-même cherchez.",
  },

  // ── Parent Type 8 ──
  "8-1": {
    pointsForts: "Vous reconnaissez sa rigueur et la respectez. Vous lui apportez la force quand sa rigidité le bloque.",
    vigilances: "Vous frontal, lui méthodique : conflit possible. Vos décisions rapides court-circuitent son besoin de bien faire.",
    conseil: "Laissez-lui le temps de finir avant de bouger. Et reconnaissez son sens du devoir — c'est son moteur, pas une lenteur.",
    parentSoutien: "Votre enfant Type 1 a un cadre intérieur très exigeant — votre force brute peut écraser sa droiture en formation. Modulez votre intensité, valorisez son sens du juste plutôt que d'imposer le vôtre. Verbalisez votre tendresse explicitement : il en a besoin sous votre carapace.",
    parentChallenge: "Cet enfant juge silencieusement votre exubérance, et son regard moral peut vous blesser sans qu'il le veuille. Vous le trouvez rigide, il vous trouve excessif. Il vous oblige à modérer votre force pour respecter son rythme intérieur — un apprentissage de douceur radicale.",
  },
  "8-2": {
    pointsForts: "Votre force et sa douceur se complètent magnifiquement. Vous le protégez, il vous adoucit.",
    vigilances: "Votre intensité peut écraser sa sensibilité. Il s'efface pour ne pas vous heurter.",
    conseil: "Modérez votre énergie face à lui. Et invitez-le à exprimer ses désaccords — il en a, mais les tait.",
    parentSoutien: "Votre enfant Type 2 cherche votre tendresse, et votre force peut l'effrayer ou l'écraser sans que vous le voyiez. Modulez votre voix, vos gestes, votre présence physique. Verbalisez régulièrement votre amour avec des mots simples — il en a un besoin vital.",
    parentChallenge: "Cet enfant porte exactement ce que vous cherchez en intégration : la tendresse, l'attention au lien, la vulnérabilité partagée. Sa douceur peut vous attendrir ou vous mettre en panique de faiblesse. Il est votre maître involontaire — apprendre à recevoir et donner de l'amour visible avec lui est votre voie de libération.",
  },
  "8-3": {
    pointsForts: "Énergie partagée, ambitions élevées. Vous le poussez à se dépasser, il vous donne du grain à moudre.",
    vigilances: "Compétition possible. Vos comparaisons (« quand j'avais ton âge... ») le blessent même si vous croyez l'encourager.",
    conseil: "Célébrez SES réussites sans les comparer aux vôtres. Il a besoin d'être vu pour lui-même.",
    parentSoutien: "Votre enfant Type 3 a besoin de votre fierté explicite — vos brusqueries peuvent l'écraser sans le motiver. Reconnaissez ses succès avec des mots clairs (« je suis fier de toi »), pas seulement des claques amicales. Aimez-le aussi quand il échoue, sinon il devient esclave de la performance.",
    parentChallenge: "Cet enfant veut votre admiration et performe pour l'obtenir — vous risquez de l'utiliser comme prolongation de votre puissance. Sa quête peut activer votre besoin de contrôle. Il vous oblige à séparer votre fierté de ses résultats — un travail de respect de son chemin propre.",
  },
  "8-4": {
    pointsForts: "Vous le protégez dans ses tempêtes émotionnelles. Il sait qu'avec vous, il peut tout ressentir sans danger.",
    vigilances: "Votre force peut sembler insensible à sa fragilité. Vos « arrête de pleurer » écrasent ce qu'il vit.",
    conseil: "Soyez présent en silence pendant ses émotions. La force ne s'oppose pas à la tendresse — elle peut la contenir.",
    parentSoutien: "Votre enfant Type 4 vit dans une sensibilité que vous trouvez « excessive » — elle est pourtant son intelligence du monde. Évitez les « arrête de pleurer » ou « sois fort » qui le coupent de sa source. Asseyez-vous à côté de ses émotions sans les solutionner par la force.",
    parentChallenge: "Cet enfant exprime tout ce que vous refusez en vous : la fragilité, la tristesse, le doute. Sa vulnérabilité affichée peut vous mettre en colère contre lui — une colère qui parle de la vôtre, intérieure. Il vous invite à descendre dans votre propre tendresse cachée — votre voie d'innocence retrouvée.",
  },
  "8-5": {
    pointsForts: "Vous respectez son intelligence et savez le défendre quand il s'isole. Il vous fait confiance pour le protéger.",
    vigilances: "Votre énergie l'épuise. Il a besoin de calme et de retrait — vous risquez de l'envahir par votre intensité.",
    conseil: "Modérez votre présence quand il est dans sa bulle. Et engagez-vous corporellement avec lui — sport, jeux d'action.",
    parentSoutien: "Votre enfant Type 5 a besoin d'espace et de calme — votre intensité physique et émotionnelle l'épuise. Modulez votre présence : moments forts choisis, retraits respectés. Ne le forcez pas à participer ; valorisez sa profondeur intellectuelle, c'est sa force.",
    parentChallenge: "Cet enfant illustre votre flèche de désintégration : sous stress, vous vous repliez aussi dans la méfiance et l'isolement. Le voir vous renvoie à votre propre tendance au retrait défensif. Il vous oblige à respecter une force différente — celle qui se construit dans le silence.",
  },
  "8-6": {
    pointsForts: "Vous incarnez la solidité dont il a besoin. Sa loyauté envers vous est totale dès qu'il vous fait confiance.",
    vigilances: "Vos accès de force peuvent terroriser son anxiété. Il se construit sur la peur si vous tonnez trop.",
    conseil: "Soyez fort SANS être effrayant. Calme + ferme, jamais explosif. Votre voix forte le tétanise plus qu'elle ne l'éduque.",
    parentSoutien: "Votre enfant Type 6 a besoin de fiabilité, pas de votre puissance imprévisible. Vos changements d'humeur ou explosions le terrifient durablement. Tenez vos règles peu nombreuses mais constantes, et rassurez-le explicitement sur sa sécurité avec vous.",
    parentChallenge: "Cet enfant doute là où vous tranchez — son questionnement peut activer votre intolérance à l'hésitation. Vous risquez de le brusquer pour le « réveiller » alors qu'il a besoin de douceur. Il vous oblige à incarner une autorité protectrice, pas dominatrice — votre vraie magnanimité.",
  },
  "8-7": {
    pointsForts: "Énergie débordante des deux côtés. Aventures, sport, action — vous vous comprenez dans le mouvement.",
    vigilances: "Vous évitez tous les deux les émotions difficiles via l'action. Personne ne s'arrête pour ressentir.",
    conseil: "Imposez-vous des moments calmes en duo. Et apprenez-lui à finir ce qu'il commence — votre exemple compte.",
    parentSoutien: "Votre enfant Type 7 partage votre énergie débordante mais a besoin de structure pour ne pas s'éparpiller. Tenez les limites essentielles fermement et joyeusement à la fois. Apprenez-lui à finir ce qu'il commence sans étouffer son enthousiasme.",
    parentChallenge: "Cet enfant esquive votre cadre par la dispersion — sa fuite peut activer votre besoin de contrôle direct. Vous risquez de l'écraser pour le « ramener », alors qu'il fuit justement la pression. Il vous oblige à inventer une autorité plus souple — une force qui canalise sans étouffer.",
  },
  "8-8": {
    pointsForts: "Respect mutuel des forts caractères. Quand vous êtes alliés, rien ne vous arrête.",
    vigilances: "Rivalité de pouvoir possible. Si vous êtes toujours le plus fort, il se braque ; si vous cédez, il vous méprise.",
    conseil: "Choisissez vos batailles. Reconnaissez sa force comme égale à la vôtre — il a besoin que vous la voyiez.",
    parentSoutien: "Votre enfant porte la même croyance que vous : « je dois être fort sinon je serai écrasé ». À deux, vous risquez d'avoir une famille où la vulnérabilité est interdite. Modélisez explicitement la tendresse, demandez de l'aide devant lui, montrez vos doutes.",
    parentChallenge: "Cet enfant est votre miroir de force — vos affrontements peuvent être spectaculaires. Sa résistance frontale teste votre Luxure de contrôle quotidiennement. Sa guérison passe par la vôtre : incarner ensemble l'innocence — votre Vertu commune.",
  },
  "8-9": {
    pointsForts: "Sa douceur vous apaise. Vous incarnez la force qu'il n'ose pas mobiliser.",
    vigilances: "Votre intensité l'efface. Il dit « comme tu veux » pour éviter le choc avec votre énergie.",
    conseil: "Demandez-lui son avis et attendez vraiment la réponse. Modérez votre voix, votre rythme, votre intensité.",
    parentSoutien: "Votre enfant Type 9 fond et disparaît sous votre intensité — il dit oui pour la paix, sans que ce soit son vrai oui. Modulez votre présence pour lui laisser de l'espace pour exister. Demandez-lui ses préférences avec patience — son émergence est plus précieuse que votre efficacité.",
    parentChallenge: "Cet enfant active votre flèche de désintégration : son non-engagement peut vous rendre froid et méfiant. Vous risquez de l'écraser involontairement par votre simple présence. Il vous oblige à modérer votre force pour qu'il puisse advenir — un apprentissage de retenue qui ouvre votre cœur.",
  },

  // ── Parent Type 9 ──
  "9-1": {
    pointsForts: "Votre calme l'apaise. Vous l'aidez à relâcher son perfectionnisme et à profiter du moment.",
    vigilances: "Il a besoin d'un cadre clair. Votre tendance à tout accepter peut le déstabiliser — il cherche des limites.",
    conseil: "Posez des règles fermes même si ça vous coûte. Sa structure intérieure se construit sur les vôtres.",
    parentSoutien: "Votre enfant Type 1 a besoin de votre présence affirmée et de votre engagement — vos « ça va aller, ne t'en fais pas » minimisent ses préoccupations. Engagez-vous activement à ses côtés sur ce qui compte pour lui. Modélisez l'imperfection : il a besoin de voir un parent qui s'autorise à se tromper.",
    parentChallenge: "Cet enfant exige une rigueur que votre Paresse de soi tend à esquiver — vos évitements le déçoivent. Sa critique implicite peut activer votre repli passif. Il vous invite à incarner votre vertu — l'action juste — au lieu de l'éviter par recherche d'harmonie.",
  },
  "9-2": {
    pointsForts: "Foyer doux et harmonieux. Vous accueillez sa générosité avec gratitude et calme.",
    vigilances: "Vous évitez tous les deux les conflits. Il apprend à étouffer ses besoins pour préserver l'harmonie.",
    conseil: "Modélisez le « non » bienveillant. Et invitez-le à exprimer ses désaccords sans peur de vous décevoir.",
    parentSoutien: "Votre enfant Type 2 cherche votre attention explicite — votre tendance à fusionner en silence ne suffit pas. Verbalisez votre amour, posez des questions sur ses besoins, soyez activement présent. Aidez-le à différencier son désir et le vôtre — il vous copie facilement et s'oublie.",
    parentChallenge: "Cet enfant vous donne tout ce que vous-même n'osez pas demander — sa générosité peut vous engourdir dans la passivité de la réception. Vous risquez de prendre sans même vous en rendre compte. Il vous oblige à émerger pour ne pas l'écraser sous votre fusion silencieuse.",
  },
  "9-3": {
    pointsForts: "Vous tempérez son agitation par votre sérénité. Il vous apporte de l'énergie et du mouvement.",
    vigilances: "Vous risquez de freiner ses élans par votre passivité. Sa quête de réussite se heurte à votre absence d'enthousiasme.",
    conseil: "Investissez visiblement dans ses projets. Votre soutien actif compte autant que votre acceptation calme.",
    parentSoutien: "Votre enfant Type 3 a besoin que vous le voyiez activement — votre acceptation passive ne le valide pas. Engagez-vous concrètement dans ses projets, célébrez ses succès avec un enthousiasme palpable. Aimez-le aussi quand il ne brille pas, sinon il devient esclave de sa performance.",
    parentChallenge: "Cet enfant porte exactement ce que vous cherchez en intégration : l'élan, l'objectif, la réalisation concrète. Son énergie peut vous intimider ou vous épuiser. Il est votre maître involontaire — apprendre à vous engager pour quelque chose qui vous tient à cœur est votre voie de libération.",
  },
  "9-4": {
    pointsForts: "Vous accueillez ses émotions sans les juger ni les surcharger. Il se sent profondément accepté.",
    vigilances: "Votre passivité peut le laisser seul dans ses tempêtes. Il a besoin que vous engagiez le contact.",
    conseil: "Allez vers lui activement quand il se renferme. Posez des questions, restez présent — votre silence l'isole.",
    parentSoutien: "Votre enfant Type 4 a besoin que vous teniez votre place — votre tendance à fusionner avec ses émotions le perd. Restez vous-même quand il traverse une tempête, ne devenez pas son écho. Validez son vécu sans vous y dissoudre — votre stabilité est ce qu'il cherche.",
    parentChallenge: "Cet enfant exige une présence centrée que votre auto-effacement ne donne pas naturellement. Sa profondeur peut vous fasciner et vous faire disparaître davantage. Il vous oblige à exister face à lui — un défi qui vous fait grandir tous les deux.",
  },
  "9-5": {
    pointsForts: "Vous respectez son besoin d'espace et de silence. Coexistence paisible et respectueuse.",
    vigilances: "Risque de vie parallèle où personne n'initie le contact. Il se replie, vous le laissez se replier.",
    conseil: "Forcez les moments partagés — repas, sortie, jeu. Sans rituels imposés, vous vous éloignez insensiblement.",
    parentSoutien: "Votre enfant Type 5 a besoin de votre présence engagée mais discrète — votre Paresse confond facilement « le laisser tranquille » et « ne pas s'occuper de lui ». Posez-lui des questions ciblées sur ses passions, montrez un intérêt actif. Engagez-vous dans ses sujets, ne soyez pas juste à côté.",
    parentChallenge: "Cet enfant ressemble à votre repli préféré — vous risquez de cohabiter en silence sans vraiment vous rencontrer. Sa quête de profondeur peut activer votre confort de la non-engagement. Il vous oblige à incarner enfin votre voix — pour ne pas l'isoler dans sa tour avec votre absence.",
  },
  "9-6": {
    pointsForts: "Votre sérénité apaise son anxiété. Foyer stable où il sait qu'il peut compter sur la constance.",
    vigilances: "Il a besoin de réponses claires à ses inquiétudes. Vos « ça va aller » sans engagement le laissent seul.",
    conseil: "Engagez-vous concrètement face à ses peurs : « voilà ce qu'on va faire ensemble ». La présence active rassure.",
    parentSoutien: "Votre enfant Type 6 a besoin de votre fiabilité explicite — votre tendance à laisser flotter (« on verra ») nourrit son anxiété. Tenez vos engagements à la lettre, soyez clair sur les règles. Affirmez-vous calmement quand il vous teste : il a besoin d'un parent qui tient debout.",
    parentChallenge: "Cet enfant illustre votre flèche de désintégration : sous stress, vous devenez aussi anxieux et soupçonneux. Son inquiétude peut vous activer ou vous démobiliser. Il vous oblige à incarner la solidité tranquille que vous habitez naturellement quand vous êtes éveillé — votre Vertu.",
  },
  "9-7": {
    pointsForts: "Sa joie vous anime, votre calme l'ancre. Belle complémentarité entre énergie et sérénité.",
    vigilances: "Son rythme rapide vous épuise. Vous risquez de vous absenter mentalement pour vous protéger.",
    conseil: "Restez engagé même quand vous voulez vous retirer. Il a besoin de votre présence active, pas seulement physique.",
    parentSoutien: "Votre enfant Type 7 vous épuise par son énergie débordante — vous risquez de vous éteindre face à son flot d'idées. Engagez-vous activement dans son monde plutôt que de subir passivement. Tenez les limites essentielles : votre absence d'autorité est ressentie comme un abandon, pas comme une liberté.",
    parentChallenge: "Cet enfant porte une intensité que votre Paresse fuit instinctivement — vous risquez de le laisser faire pour préserver votre tranquillité. Sa fuite et la vôtre s'amplifient mutuellement en évitement collectif. Il vous oblige à émerger, à dire non, à incarner — votre flèche d'intégration vers le Type 3.",
  },
  "9-8": {
    pointsForts: "Votre douceur adoucit sa puissance. Vous ne le craignez pas, et c'est précieux pour lui.",
    vigilances: "Il teste vos limites avec force. Si vous cédez systématiquement, il prend toute la place et perd ses repères.",
    conseil: "Tenez vos positions calmement mais fermement. Votre fermeté tranquille est plus puissante que la confrontation.",
    parentSoutien: "Votre enfant Type 8 a besoin d'un parent qui tient le cap — votre tendance à céder par souci d'harmonie active sa rébellion. Affirmez vos règles fermement, sans excuses ni explications infinies. Reconnaissez sa force, ne cherchez pas à la « pacifier » — c'est sa nature.",
    parentChallenge: "Cet enfant frontal active votre peur du conflit à un degré insupportable. Sa puissance peut vous faire disparaître complètement ou exploser dans une rare colère qui vous surprend. Il vous oblige à incarner votre verticalité — un travail vital pour vous, et nécessaire pour qu'il vous respecte.",
  },
  "9-9": {
    pointsForts: "Calme, harmonie, fluidité. Vous vivez en paix dans le même rythme tranquille.",
    vigilances: "Vous évitez tous les deux les décisions et les conflits. Personne ne tranche, personne n'avance.",
    conseil: "Imposez-vous d'être celui qui décide et qui initie. Il a besoin d'apprendre à choisir — par votre exemple actif.",
    parentSoutien: "Votre enfant porte la même croyance que vous : « ma présence ne compte pas, mieux vaut s'effacer ». À deux, vous risquez de bâtir une famille fantôme où personne n'affirme rien. Modélisez explicitement le « non », l'avis tranché, le désaccord respectueux — sinon vous lui transmettez votre invisibilité.",
    parentChallenge: "Cet enfant est votre miroir de Paresse — vous vous comprenez en silence, et c'est le piège. Personne n'apprend à exister face à l'autre. Sa guérison passe par la vôtre : incarner ensemble l'action juste — votre Vertu commune. Vous avez tous les deux à vous éveiller.",
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

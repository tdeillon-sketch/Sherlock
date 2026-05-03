// ═══════════════════════════════════════════════════════════════
//  Chapitre 1 — Le seul animal qui ne sait pas élever ses petits
//  Texte complet, tiré du livre. Présenté dans l'app comme l'épisode
//  pilote gratuit (~12 min de lecture).
// ═══════════════════════════════════════════════════════════════

export type ParagraphKind = 'p' | 'h2' | 'pullquote' | 'epigraph' | 'callout';

export interface Paragraph {
  kind: ParagraphKind;
  text: string;
  /** For paragraphs that contain inline italic — wrap the italic part with *…* */
  italic?: boolean;
}

export interface ChapterText {
  // Part intro — opens the pilot before the chapter itself
  partLabel: string;      // "Première partie" / "Part one"
  partTitle: string;      // "Le plus beau chantier du monde"
  partIntro: Paragraph[]; // The 4 paragraphs that introduce Part I
  // Fixed metadata
  number: number;
  title: string;
  epigraph: string;       // The « L'homme est la mesure de toutes choses » quote
  epigraphAuthor: string; // Protagoras
  // The body, as ordered paragraphs
  body: Paragraph[];
  // Closing
  signature: string;      // — Thomas
  // Reading time hint
  durationLabel: string;
}

// ── FR ──
export const CHAPTER_1_FR: ChapterText = {
  partLabel: "Première partie",
  partTitle: "Le plus beau chantier du monde",
  partIntro: [
    { kind: 'pullquote', text: "Avant de construire, il faut comprendre sur quoi l'on construit." },
    { kind: 'p', text: "La plupart des livres sur la parentalité commencent par des conseils. Faites ceci, évitez cela, voici les cinq erreurs à ne pas commettre. Ce livre commence ailleurs. Il commence par une question plus ancienne et plus inconfortable : pourquoi est-ce si difficile d'être parent ?" },
    { kind: 'p', text: "La réponse n'est pas dans le manque de méthodes. Les méthodes existent — il y en a même trop. La réponse est dans ce que nous sommes. Des êtres inachevés, nés prématurément par rapport à tous les autres mammifères, équipés d'un cerveau extraordinaire mais livrés sans notice. Des êtres qui portent en eux les modèles de leur propre enfance — souvent sans le savoir. Des êtres qui construisent des familles avec les moyens du bord, en reproduisant ce qu'ils ont reçu ou en essayant de faire le contraire, sans toujours comprendre la différence." },
    { kind: 'p', text: "Les trois chapitres qui suivent posent ce diagnostic. Le premier explore notre condition d'animal inachevé — ce que la biologie et la philosophie nous apprennent sur le fait d'être humain. Le deuxième regarde les modèles que nous portons en nous, ces trois stades que Nietzsche a si bien nommés : le chameau, le lion et l'enfant. Le troisième observe la famille comme une petite société — un système vivant avec ses règles, ses forces et ses fragilités." },
    { kind: 'p', text: "Ce n'est pas la partie la plus réconfortante du livre. Mais c'est la plus nécessaire. Parce qu'on ne peut pas changer ce qu'on n'a pas d'abord regardé en face." },
  ],
  number: 1,
  title: "Le seul animal qui ne sait pas élever ses petits",
  epigraph: "« L'homme est la mesure de toutes choses »",
  epigraphAuthor: "Protagoras",
  durationLabel: "14 min de lecture",
  signature: "— Thomas",
  body: [
    { kind: 'p', text: "Je ne suis pas un spécialiste de la parentalité. Je n'ai aucun diplôme en pédagogie, aucune autorité particulière pour vous dire comment élever vos enfants. D'ailleurs, si vous cherchez un livre de recettes, posez celui-ci. Il ne vous servira pas." },
    { kind: 'p', text: "Je suis père de deux filles. Et chaque jour, je doute. Je doute d'avoir trouvé le bon ton quand l'aînée me défie du regard. Je doute de ma patience quand la cadette me demande pour la cinquième fois quelque chose alors que je suis au téléphone. Je doute de ma cohérence quand je leur demande de ne pas crier… en criant. Certains soirs, après les avoir couchées, je reste un moment dans le couloir et je me demande : est-ce que je fais bien ? Est-ce que je suis à la hauteur de ce qu'elles méritent ?" },
    { kind: 'p', text: "Si vous vous posez ces questions, ce livre est pour vous. Non pas parce que j'ai les réponses, mais parce que je crois que le simple fait de se les poser est déjà le signe que quelque chose d'essentiel est à l'œuvre. Le parent qui doute est un parent qui cherche. Et celui qui cherche a déjà commencé à trouver." },

    { kind: 'h2', text: "Pourquoi ce livre" },
    { kind: 'p', text: "Ce livre est né d'une lente prise de conscience. Pas d'un éclair, pas d'une révélation spectaculaire. Plutôt d'une accumulation de petits moments où deux mondes que je croyais séparés — ma vie professionnelle et ma vie de père — se sont mis à se parler." },
    { kind: 'p', text: "Mon métier m'a donné une habitude : prendre ce qui fonctionne dans différents cadres et en faire un tout cohérent. Philosophie, psychologie, sciences du comportement, spiritualité — je pioche partout. Et au fil des années, une observation m'a intrigué, puis convaincu : les mêmes principes qui transforment les équipes transforment les familles. Le leadership et la parentalité boivent à la même source." },
    { kind: 'p', text: "Parallèlement, en réfléchissant à ma propre règle de vie — ce fil rouge qui donne une direction quand tout s'accélère — j'ai réalisé que la même boussole me guidait au bureau et à la maison : faire grandir les autres. Parce qu'être leader, au fond, c'est servir. Et servir, c'est aimer en acte." },
    { kind: 'p', text: "Ce livre n'est donc pas un traité. C'est une conversation entre ce que j'apprends au travail et ce que je vis en tant que père. Et j'écris parce que cela m'aide à voir plus clair." },
    { kind: 'p', text: "Pour commencer, j'aimerais vous raconter un mythe. Un très vieux mythe, raconté par Platon il y a presque deux mille cinq cents ans, mais qui contient peut-être la clé la plus profonde pour comprendre pourquoi être parent est une aventure si vertigineuse — et si libre." },

    { kind: 'h2', text: "Le mythe qui explique tout" },
    { kind: 'p', text: "Dans le Protagoras de Platon, le sophiste Protagoras raconte à Socrate comment les dieux ont créé les êtres vivants. L'histoire est à la fois simple et bouleversante. Elle commence comme un conte pour enfants et finit comme un traité de philosophie. Mais c'est justement pour cela qu'elle nous parle encore." },
    { kind: 'p', text: "Au commencement, les dieux façonnent toutes les espèces à partir de terre et de feu, puis confient à deux frères titans, Prométhée et Épiméthée, la tâche de distribuer les qualités à chaque créature. Prométhée, dont le nom signifie « celui qui réfléchit avant », propose de superviser le travail. Mais son frère Épiméthée, « celui qui réfléchit après », insiste pour s'en charger seul. Prométhée accepte." },
    { kind: 'p', text: "Épiméthée se met au travail avec générosité et méthode. Aux uns, il donne la force ; aux autres, la vitesse. À ceux qui sont petits, il offre des ailes ou un refuge souterrain. Aux grands, il donne une peau épaisse pour résister aux éléments. Il distribue la fourrure pour le froid, les sabots pour les terrains rocailleux, les griffes pour la chasse, le camouflage pour la fuite. Chaque animal reçoit son équipement, son mode d'emploi, son programme. Le lion sait être lion dès sa naissance. L'aigle n'a pas besoin qu'on lui apprenne à voler. Le saumon remonte sa rivière natale guidé par un compas invisible inscrit dans ses gènes." },
    { kind: 'p', text: "Mais Épiméthée, fidèle à son nom, n'a pas réfléchi assez loin. Quand vient le tour de l'homme, il a épuisé toutes les qualités. Plus de griffes, plus de fourrure, plus de crocs, plus d'ailes, plus de venin, plus de carapace. L'homme se retrouve nu, pieds nus, sans armes, sans abri, sans programme. Il est le seul être vivant à qui la nature n'a rien donné de précis." },
    { kind: 'p', text: "Imaginez cette scène un instant : tous les animaux sont là, équipés, prêts, déjà chez eux dans le monde. Et l'homme est là, tremblant, désarmé, ne sachant même pas comment se nourrir." },
    { kind: 'p', text: "Prométhée découvre le désastre. Pour sauver cette créature démunie, il vole le feu et les arts techniques à Héphaïstos et Athéna, et les offre à l'homme. Avec le feu, l'homme peut cuisiner, se chauffer, forger des outils. Avec les arts, il peut inventer, créer, transformer son environnement. L'homme n'a pas de griffes ? Il forge une épée. Il n'a pas de fourrure ? Il tisse un vêtement. Il n'a pas d'ailes ? Il construira un jour des avions." },
    { kind: 'p', text: "Mais cela ne suffit pas. Car les hommes, livrés à eux-mêmes avec leurs outils, sont incapables de vivre ensemble. Ils se détruisent mutuellement. C'est alors que Zeus intervient. Il envoie Hermès distribuer à tous les hommes — non pas à quelques-uns, mais à chacun sans exception — aidôs et dikè, le sens de la pudeur et le sens de la justice. Le respect mutuel et le sens du juste." },

    { kind: 'pullquote', text: "C'est précisément dans ce dénuement que réside sa grandeur." },

    { kind: 'p', text: "Le chat naît chat et mourra chat. Le saumon remonte sa rivière sans qu'on le lui ait enseigné. L'abeille construit sa ruche selon un plan gravé dans ses gènes depuis des millions d'années. Mais l'homme ? L'homme arrive au monde démuni. Il ne sait ni marcher, ni parler, ni se nourrir seul. Il ne sait même pas qui il est." },

    { kind: 'h2', text: "L'homme hors nature" },
    { kind: 'p', text: "Le philosophe Luc Ferry, dans sa relecture lumineuse de ce mythe, fait un rapprochement saisissant avec un texte de la Renaissance. En 1486, un jeune prodige italien de vingt-trois ans, Jean Pic de la Mirandole, prononce un discours qui va révolutionner la pensée occidentale : le De dignitate hominis, le Discours sur la dignité de l'homme." },
    { kind: 'p', text: "Pic de la Mirandole imagine Dieu s'adressant à Adam après la création. Et ce qu'il lui dit est stupéfiant : « Je ne t'ai donné ni place déterminée, ni visage propre, ni don particulier, afin que tu puisses conquérir et posséder la place, le visage et les dons que tu auras toi-même choisis. La nature enferme les autres espèces dans des lois par moi établies. Toi, nul obstacle ne te contraint. C'est ton propre jugement qui te permettra de définir ta nature. »" },
    { kind: 'p', text: "Voilà ce que j'aime dans cette démarche : la même idée traverse les siècles. Protagoras dans la Grèce antique, Pic de la Mirandole à la Renaissance, Luc Ferry aujourd'hui. Trois époques, une même conviction : l'homme n'a pas de nature fixée. Il est, comme le dit Ferry, un « être d'anti-nature ». Là où l'éducation animale est une activation — la chatte apprend à son petit à chasser, mais elle porte déjà en lui tout ce qu'il faut pour être chat — l'éducation humaine est une création. L'enfant qui naît ne porte pas en lui un programme à dérouler. Il porte un potentiel à éveiller. Et l'éveil dépend presque entièrement de ceux qui l'entourent." },
    { kind: 'p', text: "Cette idée, quand on la transpose à la parentalité, est à la fois terrifiante et exaltante." },
    { kind: 'p', text: "Terrifiante, parce qu'elle signifie que rien n'est garanti. Il n'existe pas de pilote automatique pour élever un enfant. Aucun instinct ne viendra à votre secours pour lui apprendre la justice, le courage, la bienveillance, la capacité de se relever après un échec. Le lionceau apprend à chasser en regardant sa mère ; six mois plus tard, il est autonome. L'enfant humain, lui, a besoin de quinze, vingt ans d'accompagnement. Et ce qu'il apprend ne dépend pas d'un code génétique : cela dépend entièrement de ce que ses parents choisissent d'être et de faire." },
    { kind: 'p', text: "Exaltante, parce que cette absence de programme est une liberté vertigineuse. Si rien n'est écrit, tout est possible. Votre enfant n'est pas condamné à répéter vos erreurs, ni enfermé dans un héritage génétique, ni prisonnier d'un destin tracé d'avance. Il est un espace ouvert, un potentiel pur, une page sur laquelle l'amour et l'éducation vont écrire les premières lignes. Et vous, en tant que parent, êtes le premier auteur de cette histoire — non pas pour l'écrire à sa place, mais pour lui donner les mots, la grammaire, le goût de la langue, afin qu'il puisse un jour écrire la sienne." },

    { kind: 'callout', text: "Avez-vous déjà ressenti ce vertige ? Ce moment où vous réalisez que l'enfant qui vous regarde attend de vous non pas des réponses toutes faites, mais un témoignage vivant de ce que signifie être humain ?" },

    { kind: 'h2', text: "Le parent a tout à faire" },
    { kind: 'p', text: "J'entends parfois des parents dire : « C'est dans son caractère », ou « Il est comme ça, on n'y peut rien ». Ces phrases, souvent prononcées avec un mélange de fatalité et de soulagement, sont le contraire exact de ce que nous enseigne le mythe de Protagoras. Si l'homme était programmé comme le saumon ou l'hirondelle, alors oui, nous pourrions nous asseoir et attendre que la nature fasse son travail. Mais ce n'est pas le cas. L'homme est l'animal inachevé. Et c'est parce qu'il est inachevé qu'il a besoin de parents." },
    { kind: 'p', text: "Non pas de parents qui le programment — ce serait remplacer une nature absente par une nature artificielle, étouffante. Mais des parents qui l'accompagnent dans la découverte de sa propre liberté. Des parents qui comprennent que leur rôle n'est pas de fabriquer un adulte conforme à leurs attentes, mais d'aider un être humain à déployer ce qu'il porte en lui de plus singulier." },
    { kind: 'p', text: "C'est ici que le parallèle avec le leadership prend tout son sens. Dans mon métier de transformateur d'entreprise, j'ai appris une chose fondamentale : un vrai leader ne crée pas des suiveurs. Il crée d'autres leaders. Il ne cherche pas à ce qu'on dépende de lui, mais à ce que chacun découvre sa propre capacité à agir, décider, créer. Le leadership, dans son essence, c'est le service. Servir non pas par soumission ou par complaisance, mais par amour de ce qu'il peut devenir. C'est un acte de confiance radical : croire que l'autre a en lui les ressources pour grandir, et que mon rôle est de créer les conditions de cette croissance." },
    { kind: 'p', text: "Et qu'est-ce qu'un parent, sinon le premier leader que connaît un enfant ? Pas un chef qui ordonne. Pas un expert qui sait tout. Mais un être humain qui, par son exemple, sa présence, son écoute et son amour, montre à l'enfant un chemin possible — tout en lui laissant la liberté de tracer le sien." },

    { kind: 'h2', text: "Le syndrome de la pièce de puzzle parfaite" },
    { kind: 'p', text: "Je me souviens d'un soir où ma fille aînée, qui avait alors neuf ans, refusait de montrer un devoir qu'elle n'avait pas réussi. Elle tenait bon : pas question de paraître faible. Cette attitude, je la connaissais — pour l'avoir vue chez des dizaines de managers à haut potentiel. Cette peur de la vulnérabilité, cette conviction que montrer ses difficultés, c'est perdre en crédibilité. Dans le monde de l'entreprise, j'appelle cela le syndrome de la pièce de puzzle parfaite : cette pièce totalement carrée, sans tenons ni cavités, solide et indépendante — mais incapable de s'assembler avec les autres." },
    { kind: 'p', text: "Alors j'ai fait la seule chose qui me semblait juste : je lui ai raconté mon propre échec de la journée. Une présentation qui n'avait pas convaincu, un message mal passé. Et je lui ai dit : « Tu sais, les gens les plus forts que je connais ne sont pas ceux qui ne tombent jamais. Ce sont ceux qui osent dire qu'ils sont tombés. Parce que c'est à ce moment-là que les autres peuvent les aider à se relever. »" },
    { kind: 'p', text: "Elle m'a regardé avec un mélange de surprise et de soulagement. Puis elle a ouvert son cahier. Pas parce que j'avais trouvé les mots magiques. Mais parce que, pendant un instant, elle avait vu que son père aussi pouvait être vulnérable — et que cela ne le rendait pas plus faible. Au contraire. Ce soir-là, j'ai compris que le parent qui sert, ce n'est pas celui qui résout le problème de l'enfant. C'est celui qui lui montre qu'il est possible de traverser le problème. Et parfois, le geste le plus puissant n'est pas de tendre la main, mais de montrer ses propres cicatrices." },

    { kind: 'h2', text: "Le plus grand risque et la plus grande liberté" },
    { kind: 'p', text: "Un enfant n'est pas un produit. C'est un mystère. Un être dont la liberté est d'autant plus précieuse qu'elle est fragile — et qu'elle dépend, dans ses premières années, presque entièrement de ceux qui choisissent de la nourrir." },
    { kind: 'p', text: "Souvenez-vous du mythe. Après le feu de Prométhée, les hommes avaient la technique mais pas la capacité de vivre ensemble. C'est Zeus qui leur donne le sens de la justice et le respect mutuel. Transposé à l'éducation, cela signifie que les compétences techniques — lire, écrire, compter, coder, maîtriser un métier — ne suffisent pas. Un enfant qui sait tout mais qui ne sait pas vivre avec les autres, qui ne comprend pas le respect, la justice, la solidarité, est un être techniquement équipé mais humainement démuni. Comme l'homme d'avant Zeus : capable de forger des outils, incapable de bâtir une cité." },
    { kind: 'p', text: "Nos écoles enseignent le feu de Prométhée. Mais le don de Zeus — le sens moral, le respect de l'autre, la capacité de vivre ensemble — c'est essentiellement aux parents qu'il revient de le transmettre. Et cette seconde tâche est infiniment plus subtile que la première. On n'enseigne pas la justice comme on enseigne les mathématiques. On ne transmet pas le respect par des cours magistraux. Ces choses-là se transmettent par l'exemple, par la cohérence entre ce qu'on dit et ce qu'on fait, par la façon dont on traite son conjoint quand on est fatigué, par la manière dont on parle du voisin quand il n'est pas là, par le regard qu'on porte sur celui qui est différent." },

    { kind: 'callout', text: "Et si le plus grand cadeau que nous puissions faire à nos enfants n'était pas de les protéger du monde, mais de les préparer à l'habiter ?" },

    { kind: 'h2', text: "Le chemin le plus sous-estimé" },
    { kind: 'p', text: "Il y a un paradoxe immense dans nos sociétés modernes. Nous investissons des années à étudier pour exercer un métier. Nous suivons des formations pour gérer un projet, animer une équipe, négocier un contrat. Certains passent des mois à préparer un marathon, des années à peaufiner un swing de golf. Mais pour élever un enfant — la responsabilité la plus déterminante de notre existence — nous nous en remettons le plus souvent à l'improvisation, à la reproduction inconsciente de ce que nous avons reçu, ou à l'espoir vague que tout se passera bien." },
    { kind: 'p', text: "C'est comme si un PDG décidait de diriger son entreprise sans stratégie, en se fiant uniquement à son instinct et aux habitudes héritées de son prédécesseur. Cela fonctionnerait peut-être un temps. Mais dès que la tempête arrive — et elle arrive toujours — l'absence de fondations profondes se révèle cruellement." },
    { kind: 'p', text: "J'ai vu des entreprises se transformer en quelques heures simplement parce que le leader changeait. L'ambiance d'une équipe peut basculer du jour au lendemain quand un nouveau manager arrive, pour le meilleur ou pour le pire. C'est saisissant. Et c'est exactement ce qui se passe à la maison. Un changement de leader dans une entreprise modifie l'atmosphère en quelques heures. Un changement d'attitude du parent modifie le climat familial en quelques secondes. Nos enfants sont des éponges extraordinaires. Ils ne capturent pas nos paroles ; ils capturent notre état d'être." },
    { kind: 'p', text: "Voilà pourquoi je crois profondément que la parentalité est le chemin de développement personnel le plus efficace qui existe. Pas le plus confortable. Pas le plus rapide. Mais le plus complet. Car pour aider votre enfant à grandir, vous êtes obligé de grandir vous-même. Pour lui enseigner la patience, vous devez d'abord l'apprendre. Pour lui montrer le courage, vous devez d'abord l'incarner. Pour l'aimer inconditionnellement, vous devez d'abord faire la paix avec vos propres blessures." },

    { kind: 'pullquote', text: "L'enfant est le miroir le plus honnête que la vie puisse vous tendre." },

    { kind: 'h2', text: "L'adolescence comme horizon" },
    { kind: 'p', text: "Si vous lisez ce livre, il y a de fortes chances que vos enfants soient encore jeunes. Et c'est tant mieux, car c'est maintenant que se posent les fondations. Pas plus tard. Pas quand ils seront adolescents. Maintenant." },
    { kind: 'p', text: "L'adolescence fait peur à beaucoup de parents. On l'imagine comme une tempête, une rivière tumultueuse, un moment de rupture. Les médias nous inondent d'histoires de crises, de conflits, de portes qui claquent. Mais je voudrais proposer un autre regard. L'adolescence n'est pas une menace ; c'est un aboutissement. C'est le moment où votre enfant commence à exercer la liberté que vous avez passé dix ou douze ans à cultiver en lui. Si les fondations sont solides, l'adolescence n'est pas une crise : c'est un envol." },
    { kind: 'p', text: "Le mythe de Protagoras nous le rappelle : l'homme est fait pour la liberté et la responsabilité. Pas pour l'obéissance aveugle. Le parent qui prépare son enfant à l'adolescence ne cherche pas à le garder sous contrôle. Il cherche à lui donner les ressources intérieures — le feu de Prométhée et la justice de Zeus — pour qu'il puisse, le moment venu, marcher seul. L'adolescence, c'est l'enfant qui essaie ses ailes. Et si nous avons fait notre travail, ces ailes tiendront." },
    { kind: 'p', text: "Car c'est cela, la finalité de l'éducation : se rendre progressivement inutile. Le meilleur leader est celui dont l'équipe fonctionne parfaitement sans lui. Le meilleur parent est celui dont l'enfant n'a plus besoin de lui pour faire les bons choix. Non pas parce qu'il l'a abandonné, mais parce qu'il lui a donné des racines assez profondes pour tenir debout dans le vent, et des ailes assez solides pour quitter le nid quand le moment est venu." },

    { kind: 'h2', text: "Mais comment ?" },
    { kind: 'p', text: "Le mythe nous le dit : vous avez le pouvoir de changer le monde de votre enfant. Mais par où commencer ?" },
    { kind: 'p', text: "C'est précisément la question des chapitres qui suivent. Le deuxième chapitre regarde les modèles que nous portons en nous, ces trois stades que Nietzsche a si bien nommés : le chameau, le lion et l'enfant. Le troisième observe la famille comme une petite société — un système vivant avec ses règles, ses forces et ses fragilités. Puis viendra l'Ennéagramme — neuf manières d'être au monde, neuf clés pour comprendre que votre enfant n'est pas un mini-vous, et que votre conjoint·e non plus." },
    { kind: 'p', text: "Mais avant d'aller plus loin, une invitation toute simple :" },

    { kind: 'callout', text: "Cette semaine — Observez un moment où votre enfant fait quelque chose que vous n'aviez pas prévu. Pas un problème à résoudre — un signe de cette liberté fondamentale dont nous avons parlé. Que choisit-il quand personne ne lui dit quoi choisir ?" },
  ],
};

// ── EN ──
export const CHAPTER_1_EN: ChapterText = {
  partLabel: "Part one",
  partTitle: "The most beautiful project in the world",
  partIntro: [
    { kind: 'pullquote', text: "Before you build, you must understand what you're building on." },
    { kind: 'p', text: "Most parenting books begin with advice. Do this, avoid that, here are the five mistakes you must never make. This book begins elsewhere. It begins with an older, more uncomfortable question: why is being a parent so difficult?" },
    { kind: 'p', text: "The answer isn't in a lack of methods. Methods exist — there are even too many. The answer lies in what we are. Unfinished beings, born prematurely compared to all other mammals, equipped with an extraordinary brain but delivered without a manual. Beings who carry within them the models of their own childhood — often without knowing it. Beings who build families with whatever means they have, reproducing what they received or trying to do the opposite, without always understanding the difference." },
    { kind: 'p', text: "The three chapters that follow lay out this diagnosis. The first explores our condition as the unfinished animal — what biology and philosophy teach us about being human. The second looks at the models we carry within us, those three stages Nietzsche named so well: the camel, the lion, and the child. The third observes the family as a small society — a living system with its rules, its strengths, and its fragilities." },
    { kind: 'p', text: "This isn't the most comforting part of the book. But it's the most necessary. Because you can't change what you haven't first looked in the face." },
  ],
  number: 1,
  title: "The only animal that doesn't know how to raise its young",
  epigraph: "\"Man is the measure of all things\"",
  epigraphAuthor: "Protagoras",
  durationLabel: "14 min read",
  signature: "— Thomas",
  body: [
    { kind: 'p', text: "I am not a parenting specialist. I have no degree in pedagogy, no special authority to tell you how to raise your children. In fact, if you're looking for a recipe book, put this one down. It won't help you." },
    { kind: 'p', text: "I am the father of two daughters. And every day, I doubt. I doubt I've found the right tone when my eldest defies me with a look. I doubt my patience when the youngest asks me for the fifth time for something while I'm on the phone. I doubt my consistency when I ask them not to shout… while shouting. Some evenings, after putting them to bed, I stand for a moment in the hallway and ask myself: am I doing this right? Am I living up to what they deserve?" },
    { kind: 'p', text: "If you ask yourself these questions, this book is for you. Not because I have the answers, but because I believe that the very act of asking is a sign that something essential is at work. The parent who doubts is a parent who is searching. And the one who searches has already begun to find." },

    { kind: 'h2', text: "Why this book" },
    { kind: 'p', text: "This book was born from a slow awakening. Not a flash, not a spectacular revelation. Rather an accumulation of small moments where two worlds I thought were separate — my professional life and my life as a father — began to speak to each other." },
    { kind: 'p', text: "My profession has given me a habit: take what works in different frames and weave them into a coherent whole. Philosophy, psychology, behavioral science, spirituality — I draw from everywhere. Over the years, an observation intrigued me, then convinced me: the same principles that transform teams transform families. Leadership and parenting drink from the same source." },
    { kind: 'p', text: "In parallel, while reflecting on my own rule of life — the thread that gives direction when everything accelerates — I realized that the same compass guided me at the office and at home: helping others grow. Because being a leader, deep down, is to serve. And to serve is to love in action." },
    { kind: 'p', text: "This book is therefore not a treatise. It's a conversation between what I learn at work and what I live as a father. I write because it helps me see more clearly." },
    { kind: 'p', text: "To begin, I want to tell you a myth. A very old myth, told by Plato almost two thousand five hundred years ago, but which may contain the deepest key to understanding why being a parent is such a vertiginous adventure — and such a free one." },

    { kind: 'h2', text: "The myth that explains it all" },
    { kind: 'p', text: "In Plato's Protagoras, the sophist Protagoras tells Socrates how the gods created living beings. The story is at once simple and overwhelming. It begins as a children's tale and ends as a treatise of philosophy. But that's exactly why it still speaks to us." },
    { kind: 'p', text: "In the beginning, the gods shaped all species from earth and fire, then entrusted two titan brothers, Prometheus and Epimetheus, with the task of distributing qualities to each creature. Prometheus, whose name means \"the one who thinks before,\" proposed to supervise the work. But his brother Epimetheus — \"the one who thinks after\" — insisted on doing it alone. Prometheus accepted." },
    { kind: 'p', text: "Epimetheus set to work with generosity and method. To some, he gave strength; to others, speed. To the small, wings or underground refuges. To the large, thick skin to resist the elements. He distributed fur for cold, hooves for rocky ground, claws for hunting, camouflage for fleeing. Each animal received its equipment, its manual, its program. The lion knows how to be a lion from birth. The eagle doesn't need to be taught to fly. The salmon swims back up its native river guided by an invisible compass written in its genes." },
    { kind: 'p', text: "But Epimetheus, true to his name, did not think far enough ahead. When man's turn came, he had used up all the qualities. No claws, no fur, no fangs, no wings, no venom, no shell. Man found himself naked, barefoot, weaponless, shelterless, programless. He was the only living being to whom nature had given nothing specific." },
    { kind: 'p', text: "Picture the scene: all the animals are there, equipped, ready, already at home in the world. And man is there, trembling, defenseless, not even knowing how to feed himself." },
    { kind: 'p', text: "Prometheus discovered the disaster. To save this destitute creature, he stole fire and the technical arts from Hephaestus and Athena, and offered them to man. With fire, man could cook, warm himself, forge tools. With the arts, he could invent, create, transform his environment. Man has no claws? He forges a sword. No fur? He weaves a garment. No wings? One day, he will build airplanes." },
    { kind: 'p', text: "But that wasn't enough. For men, left to themselves with their tools, were unable to live together. They destroyed one another. That's when Zeus intervened. He sent Hermes to distribute to all men — not only to a few, but to each without exception — aidôs and dikè, the sense of shame and the sense of justice. Mutual respect and the sense of what is right." },

    { kind: 'pullquote', text: "It is precisely in this destitution that his greatness resides." },

    { kind: 'p', text: "The cat is born a cat and will die a cat. The salmon swims up its river without being taught. The bee builds its hive following a plan engraved in its genes for millions of years. But man? Man arrives in the world destitute. He cannot walk, speak, or feed himself alone. He doesn't even know who he is." },

    { kind: 'h2', text: "Man outside nature" },
    { kind: 'p', text: "The philosopher Luc Ferry, in his luminous re-reading of this myth, draws a striking connection with a Renaissance text. In 1486, a young Italian prodigy of twenty-three named Giovanni Pico della Mirandola gave a speech that would revolutionize Western thought: the De dignitate hominis, the Oration on the Dignity of Man." },
    { kind: 'p', text: "Pico della Mirandola imagined God speaking to Adam after creation. And what he says is staggering: \"I have given you neither a fixed place, nor a face of your own, nor any particular gift, so that you may conquer and possess the place, the face, and the gifts you choose for yourself. Nature confines other species in laws established by me. You — no obstacle constrains you. It is your own judgment that will define your nature.\"" },
    { kind: 'p', text: "Here is what I love about this approach: the same idea travels across centuries. Protagoras in ancient Greece, Pico della Mirandola in the Renaissance, Luc Ferry today. Three eras, one conviction: man has no fixed nature. He is, as Ferry puts it, an \"anti-nature being.\" Where animal education is an activation — the cat teaches her cub to hunt, but already carries within him everything needed to be a cat — human education is a creation. The child who is born does not carry a program to unfold. He carries a potential to awaken. And awakening depends almost entirely on those who surround him." },
    { kind: 'p', text: "This idea, transposed to parenting, is at once terrifying and exhilarating." },
    { kind: 'p', text: "Terrifying, because it means nothing is guaranteed. There is no autopilot for raising a child. No instinct will come to your rescue to teach him justice, courage, kindness, the ability to rise after failure. The lion cub learns to hunt by watching his mother; six months later, he is autonomous. The human child needs fifteen, twenty years of accompaniment. And what he learns does not depend on a genetic code: it depends entirely on what his parents choose to be and to do." },
    { kind: 'p', text: "Exhilarating, because this absence of program is a vertiginous freedom. If nothing is written, everything is possible. Your child is not condemned to repeat your mistakes, nor locked in a genetic inheritance, nor a prisoner of a destiny mapped in advance. He is an open space, a pure potential, a page on which love and education will write the first lines. And you, as a parent, are the first author of this story — not to write it for him, but to give him the words, the grammar, the taste of language, so that one day he can write his own." },

    { kind: 'callout', text: "Have you ever felt that vertigo? That moment when you realize the child looking at you isn't waiting for ready-made answers, but for a living testimony of what it means to be human?" },

    { kind: 'h2', text: "The parent has everything to do" },
    { kind: 'p', text: "I sometimes hear parents say: \"That's just his nature,\" or \"He's like that, nothing we can do.\" These phrases, often uttered with a mix of fatalism and relief, are the exact opposite of what the myth of Protagoras teaches us. If man were programmed like the salmon or the swallow, then yes, we could sit back and wait for nature to do its work. But that is not the case. Man is the unfinished animal. And it is because he is unfinished that he needs parents." },
    { kind: 'p', text: "Not parents who program him — that would replace an absent nature with an artificial, suffocating one. But parents who accompany him in discovering his own freedom. Parents who understand that their role is not to manufacture an adult who conforms to their expectations, but to help a human being deploy what is most singular within him." },
    { kind: 'p', text: "This is where the parallel with leadership takes its full meaning. In my work as a corporate transformer, I learned one fundamental thing: a true leader does not create followers. He creates other leaders. He doesn't seek to be depended on, but for each person to discover their own capacity to act, decide, create. Leadership, in its essence, is service. To serve not from submission or compliance, but from love of what the other can become. It is an act of radical trust: to believe that the other has within them the resources to grow, and that my role is to create the conditions for that growth." },
    { kind: 'p', text: "And what is a parent, if not the first leader a child knows? Not a chief who orders. Not an expert who knows everything. But a human being who, through example, presence, listening, and love, shows the child a possible path — while leaving them free to trace their own." },

    { kind: 'h2', text: "The perfect puzzle piece syndrome" },
    { kind: 'p', text: "I remember an evening when my eldest daughter, then nine years old, refused to show a homework she hadn't done well. She held firm: no question of appearing weak. I knew that attitude — I had seen it in dozens of high-potential managers. That fear of vulnerability, that conviction that showing your difficulties is losing credibility. In the corporate world, I call it the perfect puzzle piece syndrome: that totally square piece, with no tabs or notches, solid and independent — but incapable of fitting with the others." },
    { kind: 'p', text: "So I did the only thing that felt right: I told her about my own failure of the day. A presentation that hadn't convinced, a message that didn't land. And I said: \"You know, the strongest people I know aren't the ones who never fall. They're the ones who dare to say they fell. Because that's the moment when others can help them rise.\"" },
    { kind: 'p', text: "She looked at me with a mix of surprise and relief. Then she opened her notebook. Not because I had found the magic words. But because, for an instant, she had seen that her father too could be vulnerable — and that this didn't make him weaker. On the contrary. That evening, I understood that the parent who serves is not the one who solves the child's problem. He is the one who shows that it is possible to walk through the problem. And sometimes, the most powerful gesture is not to extend your hand, but to show your own scars." },

    { kind: 'h2', text: "The greatest risk and the greatest freedom" },
    { kind: 'p', text: "A child is not a product. He is a mystery. A being whose freedom is all the more precious for being fragile — and which depends, in his earliest years, almost entirely on those who choose to nourish it." },
    { kind: 'p', text: "Remember the myth. After Prometheus's fire, men had technique but not the capacity to live together. It is Zeus who gives them the sense of justice and mutual respect. Transposed to education, this means that technical skills — reading, writing, counting, coding, mastering a trade — are not enough. A child who knows everything but doesn't know how to live with others, who doesn't understand respect, justice, solidarity, is a being technically equipped but humanly destitute. Like the man before Zeus: capable of forging tools, incapable of building a city." },
    { kind: 'p', text: "Our schools teach Prometheus's fire. But Zeus's gift — the moral sense, respect for the other, the capacity to live together — it is essentially the parents' role to transmit it. And this second task is infinitely more subtle than the first. We don't teach justice the way we teach mathematics. We don't transmit respect through formal lessons. These things are transmitted through example, through the coherence between what we say and what we do, through the way we treat our partner when we are tired, through how we speak about the neighbor when they aren't there, through the gaze we cast on the one who is different." },

    { kind: 'callout', text: "What if the greatest gift we could give our children was not to protect them from the world, but to prepare them to inhabit it?" },

    { kind: 'h2', text: "The most underestimated path" },
    { kind: 'p', text: "There is an immense paradox in our modern societies. We invest years studying to practice a profession. We follow training to manage a project, lead a team, negotiate a contract. Some spend months preparing for a marathon, years polishing a golf swing. But to raise a child — the most decisive responsibility of our existence — we most often surrender to improvisation, to the unconscious reproduction of what we received, or to the vague hope that everything will turn out fine." },
    { kind: 'p', text: "It's as if a CEO decided to lead their company with no strategy, relying solely on instinct and habits inherited from their predecessor. It might work for a while. But the moment the storm arrives — and it always does — the absence of deep foundations becomes painfully clear." },
    { kind: 'p', text: "I have seen companies transform in a few hours simply because the leader changed. The atmosphere of a team can shift overnight when a new manager arrives, for better or worse. It is striking. And it's exactly what happens at home. A change of leader in a company changes the atmosphere within hours. A change of attitude in the parent changes the family climate within seconds. Our children are extraordinary sponges. They don't capture our words; they capture our state of being." },
    { kind: 'p', text: "That is why I deeply believe that parenting is the most effective path of personal development that exists. Not the most comfortable. Not the fastest. But the most complete. Because to help your child grow, you are forced to grow yourself. To teach him patience, you must first learn it. To show him courage, you must first embody it. To love him unconditionally, you must first make peace with your own wounds." },

    { kind: 'pullquote', text: "The child is the most honest mirror life can offer you." },

    { kind: 'h2', text: "Adolescence as horizon" },
    { kind: 'p', text: "If you are reading this book, there is a strong chance your children are still young. And that's just as well, because it is now that the foundations are laid. Not later. Not when they become teenagers. Now." },
    { kind: 'p', text: "Adolescence frightens many parents. We imagine it as a storm, a turbulent river, a moment of rupture. The media floods us with stories of crises, conflicts, slamming doors. But I want to propose another view. Adolescence is not a threat; it is a culmination. It is the moment when your child begins to exercise the freedom you spent ten or twelve years cultivating in him. If the foundations are solid, adolescence is not a crisis: it is a flight." },
    { kind: 'p', text: "The myth of Protagoras reminds us: man is made for freedom and responsibility. Not for blind obedience. The parent who prepares his child for adolescence is not trying to keep him under control. He is trying to give him the inner resources — Prometheus's fire and Zeus's justice — so that, when the moment comes, he can walk alone. Adolescence is the child trying his wings. And if we have done our work, those wings will hold." },
    { kind: 'p', text: "For that is the goal of education: to make oneself progressively useless. The best leader is the one whose team functions perfectly without them. The best parent is the one whose child no longer needs them to make the right choices. Not because they were abandoned, but because they were given roots deep enough to stand in the wind, and wings strong enough to leave the nest when the time comes." },

    { kind: 'h2', text: "But how?" },
    { kind: 'p', text: "The myth tells us: you have the power to change your child's world. But where to begin?" },
    { kind: 'p', text: "That is precisely the question of the chapters that follow. The second chapter looks at the models we carry within us — those three stages Nietzsche named so well: the camel, the lion, and the child. The third observes the family as a small society — a living system with its rules, its strengths, and its fragilities. Then will come the Enneagram — nine ways of being in the world, nine keys to understand that your child is not a mini-you, and neither is your partner." },
    { kind: 'p', text: "But before going further, a simple invitation:" },

    { kind: 'callout', text: "This week — Notice a moment when your child does something you hadn't planned. Not a problem to solve — a sign of the fundamental freedom we just spoke about. What does he choose when no one tells him what to choose?" },
  ],
};


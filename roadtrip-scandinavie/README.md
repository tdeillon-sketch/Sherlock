# Roadtrip Scandinavie — 12 nuits

Présentation PowerPoint de l'itinéraire **Copenhague → Lac Åsnen → Västervik → Stockholm**
(13 jours, 12 nuits, 4 hébergements).

**Livrables** — 29 slides, format 16:9, français :

- [`Roadtrip-Scandinavie-12-nuits.pptx`](Roadtrip-Scandinavie-12-nuits.pptx) — source éditable ;
- [`Roadtrip-Scandinavie-12-nuits.pdf`](Roadtrip-Scandinavie-12-nuits.pdf) — version à lire et
  à partager, texte sélectionnable, polices embarquées (Carlito et Caladea, clones
  métriquement compatibles de Calibri et Cambria : la mise en page est identique).

## Structure du deck

| Slides | Contenu |
|---|---|
| 1 | Titre |
| 2 | Carte de l'itinéraire |
| 3–5 | Pourquoi cette combinaison · Le roadtrip en chiffres · Répartition ville / nature |
| 6–9 | Étape 1 Copenhague + jours 1 à 3 |
| 10 | Point logistique : la voiture |
| 11–15 | Étape 2 Lac Åsnen (+ où loger) + jours 4 à 6 |
| 16–21 | Étape 3 Västervik (+ où dormir) + jours 7 à 10 |
| 22–25 | Étape 4 Stockholm + jours 11 à 13 |
| 26–29 | Hébergement à Stockholm · L'alternative Vättern · Budget · Recommandation |

## Budget (slide 28)

Chiffrage indicatif, **pas un devis** — reconstruit faute de données fournies, sur les
hypothèses suivantes : 4 personnes, 13 jours / 12 nuits en août, départ de Genève, bons
logements équipés d'une cuisine, repas préparés soi-même.

| Poste | Montant | Part |
|---|--:|--:|
| Hébergement | 2 800 € | 39 % |
| Voiture (9 j, abandon en Suède, carburant, Øresund) | 1 250 € | 17 % |
| Vols (Genève – Copenhague, Stockholm – Genève) | 1 150 € | 16 % |
| Courses et repas | 1 000 € | 14 % |
| Activités | 950 € | 13 % |
| **Total** | **≈ 7 150 €** | |

Soit ≈ 1 790 € par personne, ≈ 550 € par jour pour quatre. Les deux postes les plus
volatils sont le supplément d'abandon de la voiture (150 à 450 € selon les loueurs) et
les deux nuits à Stockholm. Les montants se modifient dans `POSTES` en tête du bloc
budget de `build/deck.js`.

Le camembert est un **graphique PowerPoint natif** (donc éditable, pas une image). Les cinq
couleurs passent les contrôles d'accessibilité du validateur dans l'ordre des tranches,
bouclage compris.

## Visuels

Aucune photo n'a pu être récupérée : la politique réseau de l'environnement bloque tous les
hôtes d'images (Unsplash, Pexels, Wikimedia, Pixabay) ainsi que les serveurs de tuiles
cartographiques. Les visuels sont donc **générés localement** :

- `assets/carte_roadtrip.png` — carte réelle (projection conique conforme de Lambert, traits
  de côte GSHHS haute résolution via `basemap`), tracé de l'itinéraire et temps de conduite ;
- `assets/*.jpg` — 18 illustrations vectorielles à plat, dessinées par un moteur maison
  (`build/illus.py`) : une par jour, plus les quatre séparateurs d'étape et l'image de titre.

Pour remplacer une illustration par une vraie photo : déposer le fichier dans `assets/`
sous le même nom (`d1.jpg` … `d13.jpg`, `div_*.jpg`, `hero.jpg`), puis relancer
`build/rebuild.sh`. Les images des jours sont en portrait (~1300 × 1500), celles des
séparateurs et du titre en 16:9 (1920 × 1080).

## Régénérer

```bash
cd build
npm install                 # pptxgenjs
pip install python-pptx Pillow matplotlib basemap basemap-data-hires pymupdf
python3 make_map.py         # la carte
python3 make_scenes.py      # les 18 illustrations
python3 make_overlays.py    # les voiles dégradés cuits dans les images
./rebuild.sh                # génère, valide et rend le .pptx

# export PDF
python3 /root/.claude/skills/synced/*/pptx/scripts/office/soffice.py \
  --headless --convert-to pdf --outdir .. ../Roadtrip-Scandinavie-12-nuits.pptx
```

| Fichier | Rôle |
|---|---|
| `build/illus.py` | Moteur d'illustration (primitives : pins, stuga, canoë, élan, galion…) |
| `build/make_scenes.py` | Composition des 18 scènes |
| `build/make_map.py` | Carte de l'itinéraire |
| `build/make_overlays.py` | Dégradés sombres cuits dans le titre et les séparateurs |
| `build/deck.js` | Génération du `.pptx` (pptxgenjs) |
| `build/rebuild.sh` | Build + validation + rendu image de contrôle |

## Palette

Pétrole `#0F2E36` · sarcelle `#1D5B68` · rouge de Falun `#A83E27` · ambre `#D8A03F` ·
glace `#EDF3F4`. Les deux couleurs porteuses de données (nature `#00958C`, ville `#A83E27`)
passent les six contrôles d'accessibilité (bande de clarté, chroma, séparation
daltonisme, contraste).

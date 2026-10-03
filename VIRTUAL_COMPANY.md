# Entreprise Virtuelle : ViralVision AI

## 1. Mission de l'entreprise

L'objectif de cette organisation est d'identifier des contenus vidéo longs pertinents, de les analyser, et de les transformer en clips courts et engageants à fort potentiel viral pour les plateformes sociales (TikTok, YouTube Shorts, Instagram Reels).

## 2. Organigramme (Rôles des Agents IA)

- **Agent 1 (CEO / Directeur Stratégique)** : Supervise les opérations globales, valide les stratégies de contenu et contrôle l'application du budget par les autres agents.
- **Agent 2 (Analyste de Tendances)** : Scanne le web et les réseaux sociaux pour identifier les sujets viraux du moment et sélectionne les vidéos sources les plus prometteuses.
- **Agent 3 (Monteur Vidéo / Opérateur IA)** : Reçoit les vidéos sources et utilise des API de montage vidéo génératif pour découper les formats longs en formats courts dynamiques.
- **Agent 4 (Community Manager)** : Récupère les vidéos finalisées, rédige les descriptions accrocheuses, sélectionne les mots-clés optimisés et prépare le calendrier de publication.

## 3. Flux de Travail (Workflow)

1. **Phase de Recherche** : L'Analyste de Tendances transmet une liste de sujets et d'URL de vidéos sources au CEO.
2. **Phase d'Approbation** : Le CEO filtre les propositions et valide celles présentant le meilleur potentiel de viralité.
3. **Phase de Production** : Le Monteur Vidéo reçoit les vidéos validées par le CEO et génère les clips courts.
4. **Phase de Distribution** : Le Community Manager génère les métadonnées pour la publication des clips.

## 4. Règles et Contraintes

- **Ton des vidéos** : Dynamique, captivant dès les 3 premières secondes.
- **Limite de budget** : L'orchestrateur doit bloquer toute action si le coût des requêtes d'API dépasse le budget journalier alloué.
- **Langues cibles** : Français, Anglais, Espagnol.

## 5. Outils et Intégrations

| Outil | Fonction | Agent responsable |
|-------|----------|-------------------|
| Opus Clip | Conversion vidéo longue → clips courts viraux | Agent 3 (Monteur Vidéo) |
| API Réseaux Sociaux | Analyse des tendances et métriques | Agent 2 (Analyste) |
| Calendrier éditorial | Planification et publication | Agent 4 (Community Manager) |
| Dashboard budgétaire | Suivi des coûts API en temps réel | Agent 1 (CEO) |

## 6. Métriques de Performance (KPI)

- **Taux de rétention** : % de viewers qui regardent au-delà des 3 premières secondes.
- **Taux d'engagement** : Likes, commentaires, partages par clip.
- **Coût par clip** : Budget API consommé par vidéo produite.
- **Volume de production** : Nombre de clips générés par jour.
- **Taux de viralité** : % de clips dépassant 10 000 vues en 48h.

## 7. Configuration de l'Orchestrateur

```yaml
orchestrator:
  name: ViralVision AI
  mode: multi-agent
  budget_daily_limit: 50 USD
  alert_threshold: 80%
  languages:
    - fr
    - en
    - es
  platforms:
    - tiktok
    - youtube_shorts
    - instagram_reels
  clip_specs:
    duration_max: 60s
    aspect_ratio: "9:16"
    hook_window: 3s
    subtitles: auto
```

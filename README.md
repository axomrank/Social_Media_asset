# AxomRank brand and social media asset library

AxomRank is currently a learning app. Its wider ambition is a trusted starting point for information about Assam: learning, education opportunities, places, culture and everyday information. This repository stores the brand assets, editorial plans, research references and production records supporting that journey. Expanded services in the roadmap are proposals, not launched capabilities.

## Start here

- [Brand foundation and expansion](docs/brand/BRAND_FOUNDATION.md): present positioning, proposed wider identity, voice and visual authority.
- [Development roadmap](docs/strategy/DEVELOPMENT_ROADMAP.md): phased work, responsible roles, dependencies and completion gates.
- [Assets still required](docs/strategy/ASSET_REQUIREMENTS.md): prioritised AI illustrations, real media, maps, templates, audio and information records.
- [Organised asset catalog](catalog/README.md): existing campaigns and references, plus the imported project.
- [Publication workflow](docs/operations/CONTENT_WORKFLOW.md): evidence, language review, rights, corrections and expiration.
- [Project import report](docs/operations/PROJECT_IMPORT.md): all available files, checksums and known missing assets.

## Repository map

| Location | Purpose |
|---|---|
| `docs/brand/` | Current interpretation and proposed broader positioning |
| `docs/strategy/` | Development roadmap and production requirements |
| `docs/operations/` | Import, review and maintenance procedures |
| `catalog/` | Searchable legacy inventory and project provenance |
| `templates/` | Content briefs, notices and metadata examples |
| `projects/ahom-history/` | All 163 available original project files, with their internal layout preserved |
| `outputs/` | Existing carousel exports, plans, reel scripts and research references |
| `AI_AHOM/` | Existing historical illustration collection |
| `style_work/`, `reel_work/` | Existing campaign production code and design references |
| Root DOCX guides and heritage artwork | Original brand authorities and supplied marks |

Existing assets retain their paths so campaign references and production scripts continue to resolve. New strategy, operations, templates and project material have dedicated folders. Use the catalog to navigate legacy content; do not infer that an export or a draft is approved simply because it is present.

## Current brand rules

Use AxomRank in prose, maroon/ivory colours, the supplied Rang Ghar artwork and the applicable supplied gold insignia. [Later carousel decisions](CAROUSEL_PREFERENCES.md) supersede the original guide where relevant: finished cards are square 1:1, with aesthetic 3D treatment and no gamosa/textile borders. Preserve historical delivered campaigns unless a revision is requested. Keep internal evidence records even where sources are omitted from finished cards/captions.

## Ahom history project

The chosen series is **From Sukaphaa to Gomdhar Konwar**. [Master plan](projects/ahom-history/Insta_Angsumi/book/Ahom_Dynasty_Book_Plan_1228_to_Gomdhar_Konwar.md), [chapter overview](projects/ahom-history/Insta_Angsumi/book/Ahom_Dynasty_Chapter_Overview.md) and [Volume I working folder](projects/ahom-history/Insta_Angsumi/book/volume_01/README.md) are preserved. Five opening chapters and initial research registers exist; the book is unfinished and factual disputes remain open. PDF covers and Chapter 1 layout exports are included.

## Validate the library

Run `python3 scripts/validate_library.py` from the repository root. It checks imported files against their SHA-256 manifest and parses repository JSON files. Existing draft-link gaps and unavailable upstream assets are documented in the import report. New planning quantities are proposals, not completed artwork.

The original documents and third-party references retain their own ownership and rights status. This import does not grant a blanket licence to the asset library. Record rights before publishing or redistributing an individual asset.

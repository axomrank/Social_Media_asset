# AxomRank source-based asset pilot

Collected 11 October 2026. Open [gallery.html](gallery.html) for photographs, source credits, maps and directory downloads. Original media files are unchanged; smaller previews are index derivatives.

| Requested asset | Acquired | Remaining review or acquisition |
| --- | --- | --- |
| Credited local photographs | 30 originals, creator/licence/source/date/checksum records | Captions must describe the source date, not current conditions. No model release or endorsement is inferred. |
| Geospatial masters | Assam overview and Guwahati/Kamrup Metropolitan, Sivasagar and Silchar/Cachar district contexts; GeoJSON + editable SVG + PNG | State dataset represents 2011; districts represent 2021. These are dated boundary masters, not current street maps. |
| Education directory | 25 programme records at **two institutions** (Tezpur University and IIT Guwahati); CSV + JSON. Also 25 separate historical institution seeds and the original Assam government stream-list PDF | This is not a 25-institution verified current directory. Tezpur records identify 2026–27; IIT records are standing programme descriptions. Live deadlines, fees, complete eligibility and Assamese review remain open. |
| Place information | 12 source-linked records, CSV + JSON | Visitor hours, fees, timetables, closures and accessibility remain unknown until checked with the relevant authority. Media coverage is partial. |
| Document/object reproductions | Eight coin, inscription and manuscript images, source and reuse records | Verify identification, transcription, provenance and suitability for each lesson. A historical drawing is labelled as a reproduction, not a photograph of a surviving object. |
| Pronunciation | 30 real, publicly licensed Assamese audio files and a draft English/Assamese glossary | Language/dialect review remains pending. Public licences are recorded; no signed AxomRank contributor consent or speaker identity is fabricated. Separate 30-term place/culture spelling draft has no recordings yet. |
| Contributor perspectives | Six licensed published Karbi archive segments from **one speaker**, D.S. Teron, recorded by Subhashish Panigrahi | These are archive references, not six commissioned voices. The six briefs for diverse future submissions remain unfilled. |

## Source and reuse records

- [Media register](media-register.json): photographic and object/document originals.
- [Audio register](pronunciation/licensed-audio-register.json): 30 real speech recordings, exact file licences and public credits.
- [Archive register](contributors/archive-register.json): six segments from the [original publisher](https://theofdn.org/resources/karbi/).
- `metadata/`: original Commons API responses with creator/source/licence fields, plus download fingerprints.
- [Map sources](maps/source-register.json): pinned geoBoundaries downloads and original dataset licences. State: CC BY 2.5 India. Districts: ODbL 1.0. Keep attribution and applicable database/derivative obligations with reuse.
- [QA](qa.json) and [file manifest](manifest.json): acquired counts and byte checksums.

For Commons material, retain the named creator, source page and exact licence URL from `public_credit`. Follow the linked licence's attribution and share-alike requirements when adapting material. Public-domain metadata is retained as source evidence; public-domain-labelled files remain flagged for a territory-specific rights check. This package does not grant additional rights to people, institutions or culturally sensitive material.

Directory summaries are short original editorial descriptions. Government and university site imagery has not been copied under an assumed open licence. The historical college-list PDF is an internal source reference; its public availability is not treated as permission to republish its layout. University navigation inventories are research records, not proof of a complete programme audit. The UNESCO Moidams page was verified through web access after a direct HTTP fetch failed; that distinction is recorded.

## Editorial handoff

1. Have a qualified Assamese reviewer check English glosses, source spellings and each audio file. Record the reviewer, regional variation and approved transcription.
2. Recheck admission-cycle and travel-access fields before publication. Blanks mean unknown, not free/open/accessible.
3. Commission the six distinct voices in [commissioning-register.json](contributors/commissioning-register.json), with the existing [contributor consent template](contributors/CONTRIBUTOR_CONSENT_AND_LICENCE.md). Archive licences do not substitute for signed consent to a new interview.
4. Obtain additional place-specific licensed media where `media_ids` is empty. Keep credits in captions and asset records.
5. Acquire newer administrative boundary evidence before describing a map as current; preserve the historical masters separately.

Rebuild commands: `scripts/download_sources.py`, `scripts/curate_media.py`, `scripts/download_audio.py`, `scripts/download_perspectives.py`, `scripts/build_records.py`, `scripts/build_maps.py`, `scripts/build_catalog.py`. Network scripts fetch external sources and may need refreshed source metadata. Map rendering uses Inkscape if CairoSVG is unavailable. `manifest.json` excludes itself and Python caches.

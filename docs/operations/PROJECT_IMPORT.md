# Project import and known gaps

Prepared 11 October 2026. Imported **163 files**, **298,131,445 bytes** from the available local project into `projects/ahom-history/`. Every available document, manuscript, JSON register, source PDF, extracted text, image reference, rendered PDF and QA file was preserved byte-for-byte. The original local project remains available. The checkout itself and protected control folders are outside the source import.

## Organisation and verification

Original internal paths are preserved under the project folder so existing relative book links continue to work where the target existed. The manuscripts stay with their evidence registers; publication outputs stay with their prompts and records; temporary render images are explicitly archived production QA, not approved publication assets. No remote legacy files were removed or moved. The root README and category catalog provide navigation for the existing campaigns.

The [project manifest](../../catalog/project-import.json) records the old/new path, size and SHA-256 of every imported file. The [legacy inventory](../../catalog/legacy-inventory.json) records existing repository paths and Git blob IDs at the import baseline. Run `python3 scripts/validate_library.py` to check file preservation and JSON parsing.

| Imported category | Files |
|---|---:|
| archived-production-qa | 9 |
| manuscript-and-research | 67 |
| publication-export | 7 |
| reference-library | 79 |
| standalone-reference | 1 |

## Gaps already present in the source project

- The saved AHOM availability report contains **233 object errors** from a previous download attempt. These are upstream availability records, not newly downloaded images. Retain the report and recover actual objects from their owner/storage before claiming the AHOM library is complete.
- The first and latest cover PNGs are referenced by production records but absent from this project: `Insta_Angsumi/output/imagegen/From_Sukaphaa_to_Gomdhar_Konwar_Volume_I_Cover.png`, `Insta_Angsumi/output/imagegen/From_Sukaphaa_to_Gomdhar_Konwar_Volume_I_Cover_v3.png`. The v2 PNG and all three cover PDFs are present. In particular, the Volume I README's latest PNG link cannot resolve until that file is recovered.
- Generation records contain historical absolute paths to earlier Desktop/generated-image locations. These are preserved provenance, not portable build instructions. Repository-relative prompts and existing outputs are available; do not assume those old machine paths exist.
- The book remains unfinished. Five opening chapters and preliminary research do not constitute a published volume, and the source registers explicitly retain disputes and acquisition leads.
- Imported third-party scans, reference photographs and generated images retain their original rights status. Presence in this repository is not a reuse permission or factual approval.

## Import scope

This import covers files actually present in the local workspace when this task began. Earlier cloud-workspace documents that are not present locally cannot be inferred or recovered from filenames alone. The existing two brand guides and campaign plans already in the target repository are retained and cataloged. No new image generation was requested or performed; the requirements document commissions future production.

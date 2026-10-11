# AxomRank asset rights and contributor records

Proprietor: **Angsuman Das**, sole proprietor trading as AxomRank. Contact: angsuman.das@rgu.ac.in; +91 78965 05109.

## Ready editorial records

- [Asset rights register](registers/ASSET_REGISTER.md) and [authoritative JSON](registers/asset-register.json): source, creator, permission, credit, restrictions and inherited dependencies for the file inventory.
- [Status summary](registers/summary.json): documented uses versus unresolved permissions.
- [Contributor licence and consent template](templates/CONTRIBUTOR_CONSENT_AND_LICENCE.md): per-asset, non-exclusive permission with channels, adaptations, term, territory, consideration, credit and signatures.
- [Adult participant consent](templates/ADULT_PARTICIPANT_RELEASE.md): separate permission for a person's image or voice.
- [Existing asset confirmation](templates/RIGHTS_CONFIRMATION.md): closes missing owner/creator/licence evidence for legacy media.

## What counts as publishable

Before a final media asset is approved, identify its source, the party authorised to grant the relevant rights, permitted use and public credit. Record a licence or signed permission reference and review all included source assets. Confirm any participant permission and agreed publication context. A licence to one photograph does not license the person portrayed, every derivative, or future campaigns automatically.

The register distinguishes `licence_documented`, `owner_requested_brand_copy`, `owner_requested_template`, `generation_terms_review` and `pending`. The eligibility field is limited to the declared scope; it is not a general resale licence. Technical QA or a public GitHub URL does not clear underlying rights. Original font licences are documented; supplied artwork, downloaded references and derivatives remain pending where no rights evidence exists.

## First permissions to resolve

1. Identify the original rights holder and permitted reuse of the supplied Rang Ghar artwork. Record the grant against the master; its vector, wordmark, PNG and preview derivatives inherit that evidence.
2. Confirm the supplied gold insignia's creator and permitted uses, then review templates/exports embedding it.
3. Confirm generation/account terms for AI illustrations and rights to any reference inputs. Keep the generation records and avoid exclusive ownership claims without evidence.
4. Review historic scans, object/site images and source photographs individually. A publication year, download link or creator credit alone is not a completed licence assessment.
5. For future real proprietor/contributor photographs, obtain both the photographer's rights and applicable participant permission before publication.

## Store completed records privately

This repository is public. Keep signed forms, signatures and contributor contact information in private storage. Publish only a permission record ID, approved public credit, allowed use and non-sensitive restrictions. Do not upload signed forms as examples. The proprietor's own public contact details were supplied expressly for this kit.

## Update and validate

Run `python3 rights/scripts/build_asset_register.py` after staging new assets. Record completed permissions in [clearance-records.json](clearance-records.json) using the [example](templates/clearance-record.example.json), with the exact source SHA-256 and a reviewed evidence reference; do not hand-edit the generated table or turn pending rows into approved ones by inference. Run `python3 rights/scripts/validate_asset_register.py` to check coverage, hashes, complete eligible rows and inherited-media restrictions. Repository ZIPs are containers and excluded; their constituent files are registered.

Legal drafting sources: Copyright Office [sections 30/30A on licences](https://copyright.gov.in/Copyright_Act_1957/chapter_vi.html) and [section 19 on identification, scope, term, territory, consideration and signatures](https://copyright.gov.in/Copyright_Act_1957/chapter_iv.html). The templates record those fields; unsigned templates do not establish permission.

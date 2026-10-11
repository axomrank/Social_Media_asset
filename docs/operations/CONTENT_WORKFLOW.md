# AxomRank content and asset workflow

## One content item, one source pack

Give each item a stable ID such as `AXR-LEARN-0001` or `AXR-PLACE-0001`. Keep its brief, sources, factual claim notes, English/Assamese copy, generation record or media credit, editable design, exports, caption, alt text and approval together. Existing campaign IDs remain unchanged.

Use these states: draft → evidence review → language review → design review → approved → published → corrected/expired/withdrawn. The imported files begin as legacy/unreviewed unless an existing approval record proves otherwise. A historical-source PDF is a reference, not an approved modern lesson.

## Review and publish

1. Define the audience, factual question, content category and one useful next action.
2. Identify the source for every important claim. For notices use the exact official notice and cycle; for history record edition and page/folio plus disagreement. Separate reports, interpretation and folklore.
3. Check rights and provenance. Record consent for identifiable contributors and actual testimonials. Generated art is illustrative, never documentary proof.
4. Draft the explanation in English and Assamese where that item is bilingual. A fluent Assamese editor reviews meaning, spelling and rendered text. Keep technical terms in the glossary.
5. Design against current brand rules; check phone readability and actual pixel dimensions. Do not stretch supplied marks. Test colour-independent answer labels and write meaningful alt text.
6. Verify the destination link and actual product feature/access claim. For expiring notices confirm the date, time zone, deadline and official status immediately before publication.
7. Record the reviewers, approval date, final version and published URL. Store the exact export and caption used, not only a prompt or screenshot.

Later carousel preferences omit citations on finished cards and captions. Maintain complete internal source packs. Information records should display sources, status and last checked date so a reader can judge currency.

## Review cadence

| Content | Proposed maintenance |
|---|---|
| Open deadlines and live notices | Check official source before publication and daily while actively promoted; expire at the stated deadline |
| College admissions/programmes | Recheck at the start of each admission cycle and before any comparison/promotion |
| Service procedures and destination access | Monthly review for active guides and immediately after a known change |
| Product screenshots/access details | Refresh when the demonstrated feature, UI or offer changes |
| History and enduring explainers | Annual editorial review, sooner when a correction or new evidence appears |
| Asset rights and contributor permissions | Check before reuse; record withdrawal immediately |

These are proposed operating standards; assign an owner before promising them publicly. Do not operate a daily notice service without someone able to perform the checks.

## Corrections

Keep a correction log with item ID, affected claim, old/new wording, reason, source, reviewer, date and affected exports/URLs. Correct the source copy and every derivative, then publish a clear correction where readers saw the error. Do not silently recycle an old wrong answer. Preserve superseded versions with their status and link to the corrected version.

## Storage and future imports

Preserve editable masters. For future heavy media, choose Git LFS or controlled object storage with a documented backup/restore path. Do not add LFS patterns retroactively without uploading and verifying the actual objects: this project's availability report already records missing upstream LFS objects.

Run the validator after imports. Keep dependency directories and machine-specific symlinks out of new production folders. Existing production-code symlinks are historical records and not portable dependencies; document actual build requirements before relying on them. Keep credentials and personal documents out of this public repository.

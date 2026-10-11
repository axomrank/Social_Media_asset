"""Inventory tracked project assets with explicit rights evidence; never infer permission."""
from pathlib import Path
import hashlib,json,subprocess,html,collections
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'rights/registers';OUT.mkdir(parents=True,exist_ok=True)
tracked=[x for x in subprocess.check_output(['git','ls-files','-z'],cwd=ROOT).decode().split('\0') if x]
# Include newly authored files before staging, but not generated register outputs.
for folder in ['docs/about-contact','rights/templates','rights/scripts']:
 tracked.extend(str(p.relative_to(ROOT)) for p in (ROOT/folder).rglob('*') if p.is_file())
tracked.extend(['rights/README.md','rights/clearance-records.json'])
paths=sorted(set(x for x in tracked if not x.startswith('rights/registers/') and not x.endswith('.zip') and x not in {'.gitignore','.gitattributes'}))
imports=json.loads((ROOT/'catalog/project-import.json').read_text())
import_by_path={x['repository_path']:x for x in imports['files']}
legacy=json.loads((ROOT/'catalog/legacy-inventory.json').read_text())
legacy_by_path={x['path']:x for x in legacy['files']}
base='projects/ahom-history/Insta_Angsumi/'
manifest=json.loads((ROOT/(base+'social assent/download_manifest.json')).read_text())
download_by_path={base+'social assent/'+x['repository']+'/'+x['path']:x for x in manifest.get('images',[])}
source_register=json.loads((ROOT/(base+'book/volume_01/research/source_register.json')).read_text())
source_pdfs={base+'book/volume_01/research/'+x['file']:x for x in source_register if x.get('file')}
records=[]
for name in paths:
 p=ROOT/name
 if not p.exists() and not p.is_symlink():continue
 islink=p.is_symlink();raw=(str(p.readlink()).encode() if islink else p.read_bytes());sha=hashlib.sha256(raw).hexdigest()
 suffix=p.suffix.lower();kind='image' if suffix in {'.png','.jpg','.jpeg','.webp','.svg'} else 'font' if suffix=='.ttf' else 'document' if suffix in {'.pdf','.docx','.md','.txt'} else 'production_record_or_code'
 refs=[];source_urls=[];creator=None;credit=None;permission=None;rights='pending';basis=None;scope=[];purpose='reference_or_production';notes=[];dependencies=[]
 if name in import_by_path:
  refs.append('catalog/project-import.json');notes.append('Imported original; import checksums do not grant reuse rights.')
 if name in legacy_by_path:refs.append('catalog/legacy-inventory.json');notes.append('Legacy repository asset; creator and reuse permission are not established by inventory.')
 if name in download_by_path:
  x=download_by_path[name];source_urls.append(x['source']);refs.append(base+'social assent/download_manifest.json');notes.append('Upstream download source is known; its licence is not inferred.')
 if name in source_pdfs:
  x=source_pdfs[name];creator=x.get('author');credit=f'{x.get("author")}, {x.get("title")} ({x.get("year")})';source_urls.append(x['url']);refs.append(base+'book/volume_01/research/source_register.json');notes.append('Historical source scan; edition, scan and publication reuse rights need separate review.')
 if name.startswith('brand-kit/v1/logo/') or name.startswith('brand-kit/v1/wordmarks/'):
  refs.append('brand-kit/v1/logo/source/provenance.json');dependencies.append('brand-kit/v1/logo/source/rang-ghar-original.jpg');notes.append('Derivative trace/export inherits unresolved rights of supplied source artwork.')
 if name=='brand-kit/v1/logo/source/rang-ghar-original.jpg':
  refs.append('AxomRank_Brand_Identity_Guide.docx / word/media/image1.jpg');dependencies=[];notes.append('Original author/rights grant not yet confirmed.')
 if name in ['Golden Ahom winged insignia.png','brand-kit/v1/logo/source/winged-insignia-original.png']:
  refs=['CAROUSEL_PREFERENCES.md'];dependencies=[];notes.append('Owner-supplied motif and use direction exist; original rights evidence remains pending.')
 if name.startswith('brand-kit/v1/templates/') and kind in ['image','document']:
  refs.append('brand-kit/v1/templates/template-manifest.json');dependencies.append('brand-kit/v1/logo/source/winged-insignia-original.png');notes.append('Template/export embeds supplied motif; its upstream permission must be confirmed. Assamese editorial signoff remains pending.')
  if 'carousel-start' in name:dependencies.append('brand-kit/v1/illustrations/learning-still-life.png')
 if name=='brand-kit/v1/illustrations/learning-still-life.png':
  refs=['brand-kit/v1/illustrations/generation-record.json'];rights='generation_terms_review';notes.append('Native AI decorative illustration, no identifiable real-person reference. Confirm applicable generation/account terms before public reuse; no exclusive-rights claim recorded.')
 if name.startswith('brand-kit/v1/previews/'):
  refs.append('brand-kit/v1/docs/USAGE_GUIDE.md');dependencies.extend(['brand-kit/v1/logo/source/rang-ghar-original.jpg','brand-kit/v1/logo/source/winged-insignia-original.png']);notes.append('Composite preview inherits constituent rights; not automatically cleared because it is a preview.')
 if name.startswith('brand-kit/v1/fonts/') and suffix=='.ttf':
  refs=['brand-kit/v1/fonts/OFL.txt','brand-kit/v1/fonts/DISTRIBUTION-COPYRIGHT.txt','brand-kit/v1/fonts/provenance.json'];source_urls=['https://github.com/googlei18n/noto-fonts'];creator='Google Inc. / Google LLC';credit='Noto font software — Google Inc. / Google LLC; SIL Open Font License 1.1';permission='LIC-NOTO-OFL-1.1';rights='licence_documented';basis='Bundled unmodified fonts and full copyright/licence notices';scope=['Use, embed and redistribute with OFL/copyright notices; do not sell fonts on their own'];notes=['Specific font licence documented; does not clear other artwork.']
 if name.startswith('docs/about-contact/') and suffix in ['.md','.json']:
  refs=['docs/about-contact/identity.json','docs/about-contact/CONTACT_VERIFICATION.json'];creator='Prepared for AxomRank from Angsuman Das’s supplied facts';credit='AxomRank';permission='OWNER-REQUEST-2026-10-11';rights='owner_requested_brand_copy';basis='Proprietor explicitly requested this about/contact kit and supplied public details';scope=['AxomRank about/contact/support communication'];purpose='brand_copy';notes=['No founder photograph or additional staff/credentials asserted. Contact delivery was not tested.']
 if name in ['rights/README.md'] or name.startswith('rights/templates/'):
  refs=['rights/README.md'];creator='Prepared for AxomRank';credit='AxomRank';permission='OWNER-REQUEST-2026-10-11';rights='owner_requested_template';basis='Requested editorial templates for AxomRank';scope=['Use and adapt as internal editorial templates'];purpose='internal_template';notes=['Blank consent template is not a signed permission record.']
 if name=='docs/about-contact/ABOUT_CARD.svg' or name=='docs/about-contact/ABOUT_CARD.png':
  # These inherit the logo, unlike the text-only contact copy.
  rights='pending';permission=None;basis=None;scope=[];dependencies=['brand-kit/v1/logo/source/rang-ghar-original.jpg'];purpose='brand_card';notes.append('Public contact facts are supplied; embedded logo still requires upstream rights confirmation.')
 # Publication eligibility is intentionally narrow; evidence must be complete for approved use.
 eligible=rights=='licence_documented' or rights=='owner_requested_brand_copy' and kind=='document'
 record={'asset_id':'AXR-A-'+hashlib.sha256(name.encode()).hexdigest()[:12].upper(),'path':name,'sha256':sha,'bytes':len(raw),'kind':kind,'purpose':purpose,'creator':creator,'source_urls':source_urls,'source_references':list(dict.fromkeys(refs)),'rights_status':rights,'permission_record_id':permission,'permission_basis':basis,'approved_scope':scope,'public_credit':credit,'dependencies':list(dict.fromkeys(dependencies)),'eligible_for_declared_use':eligible,'approval_date':'2026-10-11' if eligible else None,'permission_expires_at':None,'review_owner':'Angsuman Das','private_permission_evidence_reference':None,'notes':notes}
 records.append(record)
# Apply explicit reviewed grants, bound to the exact file fingerprint.
clearance=json.loads((ROOT/'rights/clearance-records.json').read_text())
by_path={x['path']:x for x in records}
for grant in clearance['records']:
    row=by_path.get(grant['asset_path'])
    if row is None or grant['source_sha256']!=row['sha256']:
        raise ValueError('Clearance record does not match current asset fingerprint')
    if grant['rights_status'] not in ['licence_documented','permission_documented']:
        raise ValueError('Only completed grants belong in clearance-records.json')
    required=['creator','public_credit','permission_record_id','permission_basis','approved_scope','approval_date','review_owner']
    if any(not grant.get(k) for k in required) or not (grant.get('public_evidence_reference') or grant.get('private_permission_evidence_reference')):
        raise ValueError('Reviewed grant lacks required evidence fields')
    for key in required+['rights_status','permission_expires_at','private_permission_evidence_reference']:
        if key in grant:row[key]=grant[key]
    if grant.get('public_evidence_reference'):row['source_references'].append(grant['public_evidence_reference'])
    row['notes'].append('Explicit reviewed clearance from rights/clearance-records.json.')
    row['eligible_for_declared_use']=True
# A composite is not eligible until each known source dependency is eligible too.
for row in records:
    if row['eligible_for_declared_use'] and any(not by_path.get(dep,{}).get('eligible_for_declared_use',False) for dep in row['dependencies']):
        row['eligible_for_declared_use']=False
        row['notes'].append('Grant recorded but dependency clearance remains incomplete.')
result={'version':1,'baseline_date':'2026-10-11','proprietor':'Angsuman Das','definition':'Permission status is independent of public repository availability. Only documented declared uses are eligible; draft templates and missing-source assets are not publication permissions.','count':len(records),'assets':records}
(OUT/'asset-register.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
counts=collections.Counter(x['rights_status'] for x in records);eligible=[x for x in records if x['eligible_for_declared_use']]
summary={'date':'2026-10-11','assets_registered':len(records),'rights_status_counts':dict(counts),'eligible_for_declared_use':len(eligible),'open_permissions':sum(1 for x in records if x['rights_status'] in ['pending','generation_terms_review']),'notes':'No signed contributor forms or missing creator permissions were fabricated. ZIP packages are excluded as containers; each constituent file is inventoried. Registers exclude themselves to avoid a recursive inventory.'}
(OUT/'summary.json').write_text(json.dumps(summary,indent=2)+'\n')
# A plain Markdown table is convenient for repository browsing; JSON is authoritative.
lines=['# AxomRank asset rights register','',f'Baseline 11 October 2026. {len(records)} file records. Machine-readable authority: [asset-register.json](asset-register.json). Pending means evidence is incomplete, not that a file is unlawful.','', '| Asset ID | Path | Status | Credit |','|---|---|---|---|']
for x in records:lines.append('| '+x['asset_id']+' | `'+x['path'].replace('|','\\|')+'` | '+x['rights_status']+' | '+(x['public_credit'] or 'Unconfirmed').replace('|','\\|')+' |')
(OUT/'ASSET_REGISTER.md').write_text('\n'.join(lines)+'\n')
print(json.dumps(summary,indent=2))

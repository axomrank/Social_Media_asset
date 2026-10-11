"""Portable source-media index, SHA validation and honest completion report."""
from pathlib import Path
import json,hashlib,html
from PIL import Image,ImageDraw,ImageFont
ROOT=Path(__file__).resolve().parents[1]
rows=json.loads((ROOT/'media-register.json').read_text())['assets'];errors=[]
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',17)
(ROOT/'previews').mkdir(exist_ok=True)
for x in rows:
    p=ROOT/x['path']
    if hashlib.sha256(p.read_bytes()).hexdigest()!=x['sha256']:errors.append('Checksum '+x['id'])
    with Image.open(p) as im:
        im.verify()
    with Image.open(p) as im:
        im=im.convert('RGB');im.thumbnail((420,420));im.save(ROOT/'previews'/f'{x["id"].lower()}.jpg',quality=88)
for group in ['PHO','OBJ']:
    selected=[x for x in rows if x['id'].startswith(group)];out=Image.new('RGB',(1200,((len(selected)+3)//4)*245),'#F7F2EC');d=ImageDraw.Draw(out)
    for n,x in enumerate(selected):
        with Image.open(ROOT/'previews'/f'{x["id"].lower()}.jpg') as im:
            im.thumbnail((280,205));left=n%4*300+10;top=n//4*245+5;out.paste(im,(left,top))
        d.text((left,top+212),x['id']+' '+x['title'][:19],font=font,fill='#80151A')
    out.save(ROOT/'previews'/f'{group.lower()}-contact-sheet.jpg',quality=92)
cards=[]
for x in rows:
    e=lambda s:html.escape(str(s),quote=True)
    cards.append(f'<article><img loading="lazy" src="previews/{x["id"].lower()}.jpg" alt="{e(x["title"])}"><div><h2>{e(x["id"]+" — "+x["title"])}</h2><p>{e(x["creator"])} · {e(x["licence"])}</p><p>Source date: {e(x["date_created"] or "not established")}<br>Checked: {x["checked_at"]}</p><a href="{e(x["path"])}">Original file</a> · <a href="{e(x["source_page"])}">Source / credit</a> · <a href="metadata/{x["id"].lower()}.json">Metadata</a><p class="small">{e(x["public_credit"])}</p></div></article>')
page='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>AxomRank source assets</title><style>body{background:#F7F2EC;color:#292929;font:16px/1.5 system-ui;margin:30px}h1,h2,a{color:#80151A}h2{font-size:18px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}article{background:white;border-radius:12px;overflow:hidden}article img{width:100%;height:240px;object-fit:contain}article div{padding:18px}.small{font-size:12px;overflow-wrap:anywhere}header{max-width:1000px;margin-bottom:25px}</style><header><h1>AxomRank — source-based asset pilot</h1><p>30 credited photographs · 8 object/document images · 4 dated GIS map masters · 25 programme records · 12 place records.</p><p>30 pronunciation drafts and 6 commissioning briefs remain incomplete: consented recordings and genuine contributions have not been acquired. Maps use historical boundary dates. Programme records cover two institutions. No current opening hours, booking availability or admission deadlines are asserted.</p><p><a href="README.md">Usage and limitations</a> · <a href="media-register.json">Media credits</a> · <a href="education/directory.csv">Education CSV</a> · <a href="places/directory.csv">Places CSV</a> · <a href="pronunciation/glossary-draft.csv">Glossary draft</a> · <a href="maps/assam-overview.svg">Assam map</a> · <a href="maps/guwahati-district-context.svg">Guwahati context</a> · <a href="maps/sivasagar-district-context.svg">Sivasagar context</a> · <a href="maps/silchar-district-context.svg">Silchar context</a></p></header><main class="grid">CARDS</main></html>'''.replace('CARDS',''.join(cards))
audio=json.loads((ROOT/'pronunciation/licensed-audio-register.json').read_text())['records']
archive=json.loads((ROOT/'contributors/archive-register.json').read_text())['records'] if (ROOT/'contributors/archive-register.json').exists() else []
extra=['<section><h1>Real Assamese pronunciation — native review pending</h1><div class="grid">']
for x in audio:
    extra.append('<article><div><h2>'+html.escape(x['assamese_source_spelling']+' — '+x['english_draft'])+'</h2><audio controls preload="none" src="'+x['path']+'"></audio><p class="small">'+html.escape(x['public_credit'])+'</p></div></article>')
extra.append('</div><h1>Karbi oral-history archive — one speaker</h1><p>Six published segments from D.S. Teron; these do not fill six independent contributor commissions.</p><div class="grid">')
for x in archive:
    extra.append('<article><div><h2>'+html.escape(x['title'].replace('OpenSpeaks_-_Language_Documentation_-_Karbi_-_','').replace('_',' '))+'</h2><audio controls preload="none" src="'+x['path']+'"></audio><p class="small">'+html.escape(x['public_credit'])+'</p></div></article>')
extra.append('</div></section>')
page=page.replace('</main>', '</main>'+''.join(extra)).replace('30 pronunciation drafts and 6 commissioning briefs remain incomplete: consented recordings and genuine contributions have not been acquired.', '30 publicly licensed pronunciation files and six published Karbi archive segments are included below. Native language review and six new contributor commissions remain open.')
(ROOT/'gallery.html').write_text(page)
import subprocess
speech_checks=[]
for x in audio+archive:
    p=ROOT/x['path']
    if hashlib.sha256(p.read_bytes()).hexdigest()!=x['sha256']:errors.append('Audio checksum '+x['id'])
    result=subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','json',str(p)],capture_output=True,text=True)
    try:duration=float(json.loads(result.stdout)['format']['duration']);assert duration>0
    except Exception:errors.append('Unreadable audio '+x['id']);duration=None
    speech_checks.append({'id':x['id'],'duration_seconds':duration,'review':'format/duration only; language validation pending'})
(ROOT/'pronunciation/audio-format-checks.json').write_text(json.dumps(speech_checks,indent=2)+'\n')
for p in (ROOT/'maps').glob('*.geojson'):
    j=json.loads(p.read_text());assert j['features'] and all(f['geometry']['type'] in ['Polygon','MultiPolygon'] for f in j['features'])
edu=json.loads((ROOT/'education/directory.json').read_text());places=json.loads((ROOT/'places/directory.json').read_text())
qa={'downloaded_photographs':sum(x['id'].startswith('PHO') for x in rows),'downloaded_object_document_images':sum(x['id'].startswith('OBJ') for x in rows),'geospatial_masters':4,'education_programme_records':len(edu['records']),'education_institutions':edu['institution_count'],'place_records':len(places['records']),'place_sources_retrieved':sum(x['fetch_status']=='retrieved' for x in places['records']),'pronunciation_draft_terms':30,'licensed_pronunciation_files_downloaded':len(audio),'reviewed_pronunciation_audio':0,'published_archive_segments_downloaded':len(archive),'archive_unique_speakers':1 if archive else 0,'contributor_briefs':6,'received_consented_contributions':0,'image_and_checksum_errors':errors,'notes':['Audio is publicly licensed; native review and signed AxomRank submissions remain separate gaps.','Source-file licensing is separate from subject/context verification.','UNESCO page blocked a direct HTTP fetch; its record retains a verified browser-source link.']}
(ROOT/'qa.json').write_text(json.dumps(qa,indent=2)+'\n')
manifest=[{'path':str(p.relative_to(ROOT)),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(ROOT.rglob('*')) if p.is_file() and '__pycache__' not in p.parts and p.name!='manifest.json']
(ROOT/'manifest.json').write_text(json.dumps({'files':manifest},indent=2)+'\n')
print(json.dumps(qa,indent=2))

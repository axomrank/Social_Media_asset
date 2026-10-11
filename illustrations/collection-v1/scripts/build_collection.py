"""Build a portable gallery, provenance manifest, contact sheets and file QA."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import collections,hashlib,html,json,argparse
ROOT=Path(__file__).resolve().parents[1];REPO=ROOT.parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--allow-incomplete',action='store_true');args=parser.parse_args()
plan=json.loads((ROOT/'production-plan.json').read_text())['items']
notes=json.loads((ROOT/'visual-review.json').read_text()) if (ROOT/'visual-review.json').exists() else {}
assets=[];errors=[]
for item in plan:
    rp=ROOT/'records'/f'{item["id"].lower()}.json'
    if not rp.exists():
        if not args.allow_incomplete:errors.append('Missing record '+item['id'])
        continue
    record=json.loads(rp.read_text());p=REPO/record['master']
    if not p.exists():errors.append('Missing master '+item['id']);continue
    with Image.open(p) as image:
        image.load();w,h=image.size
        if w!=h or w<1080:errors.append('Dimensions '+item['id'])
        thumb=image.convert('RGB');thumb.thumbnail((420,420))
        (ROOT/'previews').mkdir(exist_ok=True)
        thumb.save(ROOT/'previews'/f'{item["id"].lower()}.jpg',quality=88)
    if not record.get('prompt'):errors.append('Missing prompt '+item['id'])
    review=notes.get(item['id'],{})
    status=record['review_status'] if record['review_status']=='individually_approved' else 'batch_authorised_technical_reviewed' if review else 'batch_authorised_pending_visual_qa'
    if not args.allow_incomplete and status.endswith('pending_visual_qa'):errors.append('Unreviewed master '+item['id'])
    record['review_status']=status;record['visual_review']=review
    rp.write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n')
    classification='AI-generated conceptual reconstruction — not to scale' if item.get('history') else 'AI-generated regional concept illustration' if item['set']=='assam-environments' else 'AI-generated illustration'
    caption=classification+'. '+item['title']+'.'
    if item.get('history'):caption+=' Details require heritage review; see evidence/HISTORY_BRIEFS.md.'
    if item.get('method'):caption+=' Method: '+item['method'].rstrip('.')+'. Use the editable companion diagram.'
    assets.append({'id':item['id'],'set':item['set'],'title':item['title'],'path':str(p.relative_to(ROOT)),'preview':'previews/'+item['id'].lower()+'.jpg','width':w,'height':h,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size,'classification':classification,'alt_text':review.get('alt_text',item['title']+'; AI-generated illustration.'),'caption':caption,'review_status':status,'rights_status':'generation_terms_review','sources':item['sources'],'generation_record':'records/'+item['id'].lower()+'.json','editable_diagram':'concept-diagrams/'+item['id'].lower()+'.svg' if item.get('diagram') else None,'visual_review':review})
counts=dict(collections.Counter(x['set'] for x in assets))
manifest={'version':1,'date':'2026-10-11','count':len(assets),'set_counts':counts,'approval_scope':'Four individually approved samples; remaining images generated under explicit full-collection authorisation. Technical review does not invent individual owner or heritage approval.','assets':assets}
(ROOT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
qa={'master_count':len(assets),'expected_count':36,'set_counts':counts,'square_minimum_1080':not any(x.startswith('Dimensions') for x in errors),'unique_sha256':len(set(x['sha256'] for x in assets))==len(assets),'exact_prompt_records':len(assets),'individually_approved':sum(x['review_status']=='individually_approved' for x in assets),'batch_technically_reviewed':sum(x['review_status']=='batch_authorised_technical_reviewed' for x in assets),'concept_companions':len(list((ROOT/'concept-diagrams').glob('ci-*.svg'))),'errors':errors,'limitations':['Concept bitmap geometry/counts are illustrative; editable diagrams carry verified methods.','History reconstructions are conceptual and unmeasured; heritage signoff remains separate.','No actual people, current ecology, precise location or source rights inferred.']}
if not qa['unique_sha256']:errors.append('Duplicate master hash')
(ROOT/'qa.json').write_text(json.dumps(qa,indent=2)+'\n')
# Contact sheets are QA/index derivatives, not replacements for original generated art.
try:font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',18)
except OSError:font=ImageFont.load_default()
for set_name in [*counts, 'collection-overview']:
    rows=assets if set_name=='collection-overview' else [x for x in assets if x['set']==set_name];cols=6 if set_name=='collection-overview' else 4;cell=290;rh=330
    sheet=Image.new('RGB',(cols*cell,((len(rows)+cols-1)//cols)*rh),'#F7F2EC');draw=ImageDraw.Draw(sheet)
    for n,x in enumerate(rows):
        with Image.open(ROOT/x['preview']) as im:
            im.thumbnail((274,274));left=(n%cols)*cell+8;top=(n//cols)*rh+8;sheet.paste(im,(left,top))
        draw.text((left,top+280),x['id']+' / '+x['title'][:23],font=font,fill='#80151A')
    sheet.save(ROOT/'previews'/f'contact-sheet-{set_name}.jpg',quality=92)
data=json.dumps(assets,ensure_ascii=False).replace('<','\\u003c')
page='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>AxomRank — 36 illustration masters</title><style>
*{box-sizing:border-box}body{margin:0;background:#F7F2EC;color:#292929;font:16px/1.5 system-ui,sans-serif}header,main{max-width:1440px;margin:auto;padding:28px}h1{color:#80151A;font-size:clamp(30px,4vw,54px);margin:0}p{max-width:940px}nav{display:flex;gap:8px;flex-wrap:wrap;margin:24px 0}button,input{font:inherit;border:1px solid #80151A;border-radius:8px;padding:10px;background:transparent;color:#80151A}button[aria-pressed=true]{background:#80151A;color:white}input{min-width:230px}#grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px}article{background:#fff;border-radius:14px;overflow:hidden;border:1px solid #dfd6ce}article img{width:100%;aspect-ratio:1;object-fit:contain;background:#F7F2EC}article div{padding:16px}article h2{font-size:19px;margin:0 0 10px;color:#80151A}.small{font-size:13px;color:#555}article a{color:#80151A;margin-right:12px}article p{margin:8px 0}.status{font-size:12px;background:#F7F2EC;padding:6px;border-radius:5px}footer{padding:28px;text-align:center}a{color:#80151A}</style>
<header><p>AXOMRANK / ASSET LIBRARY / V1</p><h1>36 illustration masters</h1><p>Learning rooted in Assam. Original square masters, exact prompts, source briefs and editable concept explanations. Four samples individually approved; the remaining collection was authorised as a batch and technically reviewed.</p><p class="small">All images are AI-generated illustrations. Environments are regional concepts. History images are conceptual reconstructions, not to scale, and need heritage review. Concept diagrams carry the actual methods. Add bilingual copy and supplied brand elements through editable brand templates.</p><a href="README.md">Usage guide</a> · <a href="manifest.json">Manifest</a> · <a href="evidence/HISTORY_BRIEFS.md">History evidence</a> · <a href="qa.json">QA record</a><nav id="filters"></nav><label>Find an illustration <input id="search" type="search" placeholder="ID, topic or set"></label><p id="count" aria-live="polite"></p></header><main id="grid"></main><footer>AxomRank — Angsuman Das · AI-generated illustration collection</footer><script>
const assets=DATA;let selected='all';const filters=document.querySelector('#filters');const search=document.querySelector('#search');const grid=document.querySelector('#grid');
function render(){const q=search.value.toLowerCase();const shown=assets.filter(x=>(selected==='all'||x.set===selected)&&(x.id+' '+x.title+' '+x.set).toLowerCase().includes(q));grid.replaceChildren();document.querySelector('#count').textContent=shown.length+' of '+assets.length+' masters';for(const x of shown){const article=document.createElement('article');const im=document.createElement('img');im.src=x.preview;im.alt=x.alt_text;im.loading='lazy';article.append(im);const d=document.createElement('div');const h=document.createElement('h2');h.textContent=x.id+' — '+x.title;d.append(h);const p=document.createElement('p');p.className='small';p.textContent=x.caption;d.append(p);const st=document.createElement('p');st.className='status';st.textContent=x.review_status.replaceAll('_',' ');d.append(st);for(const [label,path] of [['Master PNG',x.path],['Prompt / provenance',x.generation_record],['Editable method',x.editable_diagram]]){if(path){const a=document.createElement('a');a.href=path;a.textContent=label;d.append(a)}}article.append(d);grid.append(article)}for(const b of filters.children)b.setAttribute('aria-pressed',b.dataset.set===selected)}
for(const set of ['all',...new Set(assets.map(x=>x.set))]){const b=document.createElement('button');b.type='button';b.textContent=set.replaceAll('-',' ');b.dataset.set=set;b.onclick=()=>{selected=set;render()};filters.append(b)}search.oninput=render;render();
</script></html>'''.replace('DATA',data)
(ROOT/'gallery.html').write_text(page)
print(json.dumps(qa,indent=2))
if errors:raise SystemExit(1)

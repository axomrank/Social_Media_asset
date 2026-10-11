"""Download original Commons files and exact metadata; retain per-file licences."""
from pathlib import Path
import requests,json,hashlib,re,time,html
ROOT=Path(__file__).resolve().parents[1]
HEAD={'User-Agent':'AxomRankAssetResearch/1.0 (angsuman.das@rgu.ac.in)'}
API='https://commons.wikimedia.org/w/api.php'
def get(url,**kwargs):
    for n in range(4):
        try:
            r=requests.get(url,headers=HEAD,timeout=60,**kwargs);r.raise_for_status();return r
        except requests.RequestException:
            if n==3:raise
            time.sleep(2*(n+1))
def api(**kw):return get(API,params={'format':'json',**kw}).json()
def clean(s):return html.unescape(re.sub('<[^>]+>',' ',s or '')).strip()
def save_json(p,v):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
def candidates(category):
    j=api(action='query',list='categorymembers',cmtitle='Category:'+category,cmtype='file',cmlimit=100)
    return [x['title'] for x in j.get('query',{}).get('categorymembers',[])]
def download(title,group,index):
    j=api(action='query',titles=title,prop='imageinfo',iiprop='url|size|extmetadata|timestamp|sha1')
    page=next(iter(j['query']['pages'].values()))
    if not page.get('imageinfo'):return None
    i=page['imageinfo'][0];e=i.get('extmetadata',{});v=lambda k:clean(e.get(k,{}).get('value',''))
    licence=v('LicenseShortName');url=v('LicenseUrl')
    # Require an explicit reusable licence. US-only public-domain claims are retained as research leads, not downloaded here.
    if not (licence.startswith(('CC BY','CC0')) or licence in ['Public domain','PD']) or v('Restrictions'):return None
    if licence in ['Public domain','PD'] and ('United States' in v('UsageTerms') or 'PD-US' in v('License')):return None
    ext=Path(title).suffix.lower()
    if ext not in ['.jpg','.jpeg','.png','.tif','.tiff','.webp']:return None
    if i.get('size',0)>45_000_000:return None
    filename=f'{group[:3]}-{index:02d}-'+re.sub('[^a-z0-9]+','-',title[5:].rsplit('.',1)[0].lower())[:85]+ext
    p=ROOT/group/filename;p.parent.mkdir(parents=True,exist_ok=True)
    if not p.exists():p.write_bytes(get(i['url']).content)
    row={'id':f'{group[:3].upper()}-{index:02d}','path':str(p.relative_to(ROOT)),'title':title[5:],'source_page':i['descriptionurl'],'original_url':i['url'],'creator':v('Artist'),'source_statement':v('Credit'),'licence':licence,'licence_url':url,'usage_terms':v('UsageTerms'),'attribution_required':v('AttributionRequired'),'copyrighted':v('Copyrighted'),'description':v('ImageDescription'),'date_created':v('DateTimeOriginal'),'commons_upload_timestamp':i['timestamp'],'checked_at':'2026-10-11','bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'width':i.get('width'),'height':i.get('height'),'review_status':'metadata_checked_visual_review_pending','classification':'source-based photograph' if group=='photographs' else 'authentic object/document reproduction; source identification needs editorial review','public_credit':f"{title[5:]} — {v('Artist')}; {licence}; {i['descriptionurl']}",'notes':['Original file downloaded without image modification. Source description is a contributor statement, not independent archaeological identification. No model release is inferred.']}
    save_json(ROOT/'metadata'/f'{row["id"].lower()}.json',{'record':row,'raw_commons_response':j});return row
def media():
    groups={'photographs':['Rang Ghar','Talatal Ghar','Guwahati','Sivasagar','Silchar','Kaziranga National Park','Majuli','Tea gardens in Assam','Deepor Beel','Dibrugarh','Tezpur','Indian Institute of Technology Guwahati'], 'objects':['Coins of Assam','Assam inscriptions','Assamese manuscripts']}
    records=[];seen=set();errors=[]
    for group,cats in groups.items():
        rows=[];target=30 if group=='photographs' else 8
        for cat in cats:
            if len(rows)>=target:break
            try:titles=candidates(cat)
            except Exception as ex:errors.append({'category':cat,'error':str(ex)});continue
            taken=0
            for title in titles:
                if title in seen:continue
                if group=='photographs' and (taken>=3 or len(rows)>=target):break
                if group=='objects' and (taken>=4 or len(rows)>=target):break
                try:
                    row=download(title,group,len(rows)+1)
                    if row:row['selection_category']=cat;rows.append(row);seen.add(title);taken+=1;print(row['id'],row['title'],row['licence'],flush=True)
                except Exception as ex:errors.append({'title':title,'error':str(ex)})
        records.extend(rows)
    save_json(ROOT/'media-register.json',{'checked_at':'2026-10-11','assets':records,'errors':errors})
def gis():
    metadata=[]
    for level in ['ADM1','ADM2']:
        m=get(f'https://www.geoboundaries.org/api/current/gbOpen/IND/{level}/').json();metadata.append(m)
        save_json(ROOT/'maps'/f'{level.lower()}-source-metadata.json',m)
        url=m['gjDownloadURL'].replace('https://github.com/','https://media.githubusercontent.com/media/').replace('/raw/','/')
        data=get(url).json()
        if level=='ADM1':
            features=[f for f in data['features'] if f['properties'].get('shapeName','').lower()=='assam'];assert len(features)==1
            save_json(ROOT/'maps'/'assam-overview.geojson',{'type':'FeatureCollection','features':features})
        else:
            wanted={'Kamrup Metropolitan':'guwahati','Kamrup Metro':'guwahati','Kamrup (M)':'guwahati','Sivasagar':'sivasagar','Sibsagar':'sivasagar','Cachar':'silchar'}
            print('GIS candidate names',[f['properties'].get('shapeName') for f in data['features'] if any(s in f['properties'].get('shapeName','').lower() for s in ['kamrup','siva','sibsa','cachar'])],flush=True)
            for name,slug in wanted.items():
                fs=[f for f in data['features'] if f['properties'].get('shapeName')==name]
                if fs:save_json(ROOT/'maps'/f'{slug}-district-context.geojson',{'type':'FeatureCollection','features':fs})
    save_json(ROOT/'maps'/'source-register.json',metadata)
if __name__=='__main__':
    import sys
    if 'media' in sys.argv:media()
    if 'gis' in sys.argv:gis()

"""Acquire real, publicly licensed Assamese speech; do not infer identity/consent."""
from download_sources import ROOT,api,get,save_json,clean
from build_records import write_csv
import hashlib,concurrent.futures,re,json
TERMS=[('অসম','Assam'),('অসমীয়া','Assamese'),('বিহু','Bihu'),('গোলাঘাট','Golaghat'),('বহী','notebook'),('এক','one'),('দুই','two'),('তিনি','three'),('চাৰি','four'),('পাঁচ','five'),('ছয়','six'),('সাত','seven'),('আঠ','eight'),('ন','nine'),('দহ','ten'),('আপুনি','you (polite)'),('মই','I'),('আমি','we'),('তুমি','you (familiar)'),('তেওঁ','he/she (respectful)'),('তেখেত','he/she (honorific)'),('কি','what'),('কিমান','how much/how many'),('কিয়','why'),('কেতিয়া','when'),('কেনেকৈ','how'),('ক’ত','where'),('নীলা','blue'),('বগা','white'),('ৰঙা','red')]
def run(item):
    n,(term,en)=item
    results=api(action='query',list='search',srsearch='intitle:"As-'+term+'" filetype:audio',srnamespace=6,srlimit=10)
    titles=[x['title'] for x in results.get('query',{}).get('search',[])]
    exact=[x for x in titles if x.rsplit('.',1)[0]=='File:As-'+term]
    if not exact:return {'term':term,'error':'No exact reusable recording located'}
    title=exact[0];raw=api(action='query',titles=title,prop='imageinfo',iiprop='url|size|extmetadata|timestamp')
    i=next(iter(raw['query']['pages'].values()))['imageinfo'][0];e=i['extmetadata'];v=lambda k:clean(e.get(k,{}).get('value',''));lic=v('LicenseShortName')
    if not lic.startswith(('CC BY','CC0')) or v('Restrictions'):return {'term':term,'error':'Licence requires review'}
    p=ROOT/'pronunciation/audio'/f'aud-{n:02d}{title[title.rfind("."):]}';p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(get(i['url']).content)
    row={'id':f'AUD-{n:02d}','assamese_source_spelling':term,'english_draft':en,'source_title':title,'source_page':i['descriptionurl'],'original_url':i['url'],'source_description':v('ImageDescription'),'source_creator':v('Artist'),'speaker_identity':None,'speaker_region':None,'licence':lic,'licence_url':v('LicenseUrl'),'date_created':v('DateTimeOriginal'),'checked_at':'2026-10-11','path':str(p.relative_to(ROOT)),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'public_credit':f'{title[5:]} — {v("Artist")}; {lic}; {v("LicenseUrl")}; {i["descriptionurl"]}; unchanged original recording.','language_review':'pending qualified native reviewer; English gloss is draft','signed_axomrank_consent_record':None,'permission_basis':'Public Commons licence only; not a newly commissioned or signed AxomRank contribution','review_status':'original audio downloaded; native linguistic validation pending'}
    save_json(ROOT/'metadata'/f'aud-{n:02d}.json',{'record':row,'raw_commons_response':raw});print(row['id'],term,lic,flush=True);return row
if __name__=='__main__':
    rows=list(concurrent.futures.ThreadPoolExecutor(max_workers=3).map(run,enumerate(TERMS,1)))
    save_json(ROOT/'pronunciation'/'licensed-audio-register.json',{'records':[r for r in rows if 'path' in r],'errors':[r for r in rows if 'error' in r],'notes':'30 learning terms supplement the separate place/culture glossary draft. Public licence records do not establish dialect, speaker identity or signed local consent.'})
    write_csv(ROOT/'pronunciation'/'licensed-audio-glossary.csv',[r for r in rows if 'path' in r])

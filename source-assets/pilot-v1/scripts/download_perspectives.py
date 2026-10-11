"""Six licensed archive segments from one identified Karbi speaker; not six new voices."""
from download_sources import ROOT,get,api,clean,save_json
from bs4 import BeautifulSoup
import urllib.parse,re,hashlib,concurrent.futures
SOURCE='https://theofdn.org/resources/karbi/'
def run(item):
    n,url=item;filename=urllib.parse.unquote(url.rsplit('/',1)[-1]);title='File:'+filename
    j=api(action='query',titles=title,prop='imageinfo',iiprop='url|size|extmetadata|timestamp')
    i=next(iter(j['query']['pages'].values()))['imageinfo'][0];e=i['extmetadata'];v=lambda k:clean(e.get(k,{}).get('value',''));lic=v('LicenseShortName')
    assert lic.startswith(('CC BY','CC0')),lic
    assert i['size']<95_000_000,i['size']
    p=ROOT/'contributors/archive'/f'karbi-{n:02d}.wav';p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(get(i['url']).content)
    row={'id':f'ARC-{n:02d}','title':filename,'path':str(p.relative_to(ROOT)),'source_page':i['descriptionurl'],'original_url':i['url'],'publisher_source':SOURCE,'speaker':'D.S. Teron','speaker_context':'Karbi elder and self-sponsored language/culture researcher, as described by the publisher','speaker_origin':'Karbi Anglong district, Assam, India','recordist':'Subhashish Panigrahi','recording_date':'2017-05-21','languages':'Karbi and English; inspect individual segment before excerpting','creator':v('Artist'),'licence':lic,'licence_url':v('LicenseUrl'),'public_credit':f'D.S. Teron (speaker), Subhashish Panigrahi (recordist), O Foundation/OpenSpeaks; {lic}; {v("LicenseUrl")}; {i["descriptionurl"]}; original recording unchanged.','checked_at':'2026-10-11','sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size,'signed_axomrank_consent_record':None,'status':'licensed published archive; context and transcription review pending','notes':['All six segments come from one interviewee, not six independent contributors.','These are source-based published perspectives, not commissioned AxomRank submissions.','Do not generalise one account to every Karbi person or other Assam communities.']}
    save_json(ROOT/'metadata'/f'arc-{n:02d}.json',{'record':row,'raw_commons_response':j});print(row['id'],p.stat().st_size,flush=True);return row
if __name__=='__main__':
    soup=BeautifulSoup(get(SOURCE).content,'html.parser');urls=[]
    for a in soup.find_all('a',href=True):
        u=a['href'];filename=urllib.parse.unquote(u.rsplit('/',1)[-1])
        if 'upload.wikimedia.org' in u and u.endswith('.wav') and 'File:' not in u and re.search(r'Karbi_-_[245678]\.',filename) and u not in urls:urls.append(u)
    assert len(urls)==6,len(urls)
    rows=list(concurrent.futures.ThreadPoolExecutor(max_workers=2).map(run,enumerate(urls,1)))
    save_json(ROOT/'contributors'/'archive-register.json',{'records':rows,'unique_speakers':1,'source':SOURCE,'qualification_basis':'Publisher description, not an independently certified credential.','notes':'Six archive segments supplement the six unfilled commissioning briefs; diversity target remains open.'})

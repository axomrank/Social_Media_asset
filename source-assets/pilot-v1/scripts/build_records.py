"""Build evidence records. Unknown deadlines, access and consent remain null."""
from download_sources import ROOT,get,save_json
from bs4 import BeautifulSoup
import json,csv,re,hashlib,concurrent.futures,urllib.parse
DATE='2026-10-11'
TU='https://www.tezu.ernet.in/adm26/'
IIT='https://www.iitg.ac.in/acad/programmes/masters.php/'
def education():
    soup=BeautifulSoup(get(TU).content,'html.parser');tu=[]
    first=soup.find(string=lambda x:x and 'BTech in Civil Engineering' in x)
    container=first.parent.parent.parent
    for tr in container.select('.grid-row'):
        cells=[c.get_text(' ',strip=True) for c in tr.find_all('div',recursive=False)]
        if len(cells)==5 and cells[0].isdigit():tu.append(cells)
    assert len(tu)==19,len(tu)
    rows=[]
    for cells in tu:
        if cells[0] in ['7','8']:continue
        rows.append({'institution':'Tezpur University','institution_url':'https://www.tezu.ernet.in/','programme':cells[1],'programme_level':'undergraduate/integrated; BEd is a post-bachelor professional course' if cells[0]=='19' else 'undergraduate/integrated','academic_session':'2026-27','evidence_type':'current-cycle official programme table','intake_as_published':int(cells[2]),'entry_channel_as_published':cells[4],'source_url':TU,'evidence_section':'Undergraduate / Integrated Programmes, row '+cells[0]})
    iit_text=BeautifulSoup(get(IIT).content,'html.parser').get_text(' ',strip=True)
    for award,discipline in [('M.Des','Design'),('M.Des','Electronic Product Design'),('MA','Development Studies'),('MA','Liberal Arts'),('M.Sc','Physics'),('M.Sc','Chemistry'),('M.Sc','Mathematics and Computing'),('M.Sc','Mathematics')]:
        assert discipline in iit_text
        rows.append({'institution':'Indian Institute of Technology Guwahati','institution_url':'https://www.iitg.ac.in/','programme':award+' in '+discipline,'programme_level':'postgraduate','academic_session':None,'evidence_type':'standing official programme description; not cycle-specific admission confirmation','duration_years':2,'intake_as_published':None,'entry_channel_as_published':None,'source_url':IIT,'evidence_section':award+' / '+discipline})
    assert len(rows)==25
    for n,row in enumerate(rows,1):
        row.update({'id':f'EDU-{n:02d}','checked_at':DATE,'application_deadline':None,'admission_open_now':None,'fees':None,'eligibility_summary':None,'assamese_name':None,'language_review':'pending native Assamese review','verification_status':'programme existence source checked; live deadline/fees/eligibility not verified','next_check_before':'any admission advice or application','notes':['A programme record is not a separate institution. This pilot covers 25 programmes at two institutions. No applicant data collected.']})
    save_json(ROOT/'education'/'directory.json',{'records':rows,'programme_count':25,'institution_count':2,'scope':'Pilot programme directory, not a 25-institution directory or exhaustive site inventory.'})
    write_csv(ROOT/'education'/'directory.csv',rows)
    # Historical institution seeds are separate from current programme records.
    lines=__import__('subprocess').check_output(['pdftotext','-layout',str(ROOT/'education/reference/official-stream-list-historical.pdf'),'-']).decode().splitlines();seeds=[]
    for line in lines:
        parts=re.split(r'\s{2,}',line.strip())
        if len(parts)>=7 and parts[0].isdigit() and len(seeds)<25:
            seeds.append({'source_row':parts[0],'name_as_published':parts[1],'district_as_published':parts[2],'streams_as_published':', '.join(x for x in parts[3:6] if x!='0'),'affiliation_as_published':parts[6],'source_url':'https://highereducation.assam.gov.in/sites/default/files/swf_utility_folder/departments/higheredu_medhassu_in_oid_3/do_u_want_2_know/337_stream_wise_colleges.pdf','checked_at':DATE,'status':'historical source seed; current identity, programmes and affiliation require recheck','publication_date':None,'academic_session':None})
    save_json(ROOT/'education'/'historical-institution-seeds.json',{'records':seeds,'notes':'Source predates current admissions; its spelling and affiliations are not asserted as current.'})
def write_csv(p,rows):
    p.parent.mkdir(parents=True,exist_ok=True);fields=list(dict.fromkeys(k for r in rows for k in r))
    with p.open('w',newline='') as f:
        w=csv.DictWriter(f,fieldnames=fields,lineterminator='\n');w.writeheader();w.writerows({k:json.dumps(v,ensure_ascii=False) if isinstance(v,(list,dict)) else re.sub(r'\s+',' ',v).strip() if isinstance(v,str) else v for k,v in r.items()} for r in rows)
PLACES=[
('Sivasagar','https://assamtourism.gov.in/Sivasagar.php','Ahom heritage town; monument visits','Check opening times and monument tickets with the site authority.'),
('Rang Ghar','https://sivasagar.assam.gov.in/index.php/tourist-place-detail/276','Historic pavilion in Sivasagar','Use monument visitor rules; do not promise access to every level.'),
('Talatal Ghar','https://sivasagar.assam.gov.in/tourist-place-detail/277','Historic masonry complex in Sivasagar','Do not promise underground tunnel access.'),
('Charaideo Moidams','https://whc.unesco.org/en/list/1711/','Ahom mound-burial heritage site','Follow current site authority entry and respectful photography rules.'),
('Silchar','https://assamtourism.gov.in/Silchar.php','Barak Valley urban base in Cachar','Recheck airport, railway and road connections; no live timetable is supplied.'),
('Majuli','https://assamtourism.gov.in/Majuli-Island1.php','River-island communities and satra visits','Recheck ferries, weather and local visitor permissions before travel.'),
('Kaziranga','https://assamtourism.gov.in/Kaziranga1.php','National park visitor destination','Recheck park range openings, bookings and seasonal closures.'),
('Manas','https://assamtourism.gov.in/Manas-National-Park1.php','National park visitor destination','Recheck park entry, guide requirements and operating season.'),
('Sualkuchi','https://assamtourism.gov.in/Sualkuchi1.php','Weaving-town visit context','Obtain workshop permission; no open-house access is assumed.'),
('Gandhi Mandap','https://assamtourism.gov.in/gandhi-mandap.php','Guwahati hilltop memorial','Recheck opening times and road access.'),
('Deepor Beel','https://rsis.ramsar.org/ris/1207','Freshwater wetland conservation context','Recheck allowed observation points; do not enter protected habitat.'),
('Dima Hasao','https://dimahasao.assam.gov.in/','Hill-district visitor information gateway','Recheck road disruptions, local permissions and community protocols.')]
def places():
    def check(item):
        name,url,summary,advice=item
        row={'name':name,'source_url':url,'summary':summary,'practical_note':advice,'checked_at':DATE,'opening_hours':None,'entry_fee':None,'booking_url':None,'accessibility':None,'seasonal_closure':None,'transport_timetable':None,'language_review':'pending native Assamese review','media_ids':[],'next_check':'Before each publication or journey'}
        try:
            r=get(url);s=BeautifulSoup(r.content,'html.parser');row.update({'source_resolved_url':r.url,'source_title':s.title.get_text(' ',strip=True) if s.title else name,'fetch_status':'retrieved','source_response_sha256':hashlib.sha256(r.content).hexdigest()})
        except Exception as e:row.update({'fetch_status':'fetch_failed; source lead only','error':str(e)})
        return row
    rows=list(concurrent.futures.ThreadPoolExecutor(max_workers=4).map(check,PLACES))
    for n,row in enumerate(rows,1):row['id']=f'PLC-{n:02d}'
    save_json(ROOT/'places'/'directory.json',{'records':rows,'notes':'Short original summaries; government website photographs are not copied without an explicit media licence. Date-sensitive fields remain unknown.'});write_csv(ROOT/'places'/'directory.csv',rows)
def glossary():
    terms=[('Assam','অসম'),('Guwahati','গুৱাহাটী'),('Dispur','দিছপুৰ'),('Sivasagar','শিৱসাগৰ'),('Jorhat','যোৰহাট'),('Dibrugarh','ডিব্ৰুগড়'),('Tezpur','তেজপুৰ'),('Silchar','শিলচৰ'),('Majuli','মাজুলী'),('Kaziranga','কাজিৰঙা'),('Manas','মানাহ'),('Brahmaputra','ব্ৰহ্মপুত্ৰ'),('Barak','বৰাক'),('Rang Ghar','ৰংঘৰ'),('Talatal Ghar','তলাতল ঘৰ'),('Kareng Ghar','কাৰেং ঘৰ'),('Charaideo','চৰাইদেউ'),('Moidam','মৈদাম'),('Bihu','বিহু'),('Bohag','বহাগ'),('Magh','মাঘ'),('Kati','কাতি'),('Satra','সত্ৰ'),('Namghar','নামঘৰ'),('Bhaona','ভাওনা'),('Gamosa','গামোচা'),('Jaapi','জাপি'),('Xorai','শৰাই'),('Beel','বিল'),('Pukhuri','পুখুৰী')]
    rows=[{'id':f'TERM-{n:02d}','english_label':en,'assamese_draft':as_,'spelling_status':'draft; native reviewer required','reviewer':None,'dialect_or_region':None,'phonetic_transcription':None,'audio_file':None,'speaker':None,'consent_record':None,'audio_status':'not acquired; consented local speaker required','recording_brief':'Record normal speed, then slower repetition, without background music; identify regional variation.','checked_at':DATE} for n,(en,as_) in enumerate(terms,1)]
    save_json(ROOT/'pronunciation'/'glossary-draft.json',{'records':rows,'notes':'These drafts are not reviewed pronunciations. No synthetic voice or downloaded unconsented speaker recording substitutes for the target.'});write_csv(ROOT/'pronunciation'/'glossary-draft.csv',rows)
    briefs=['Assam-type housing and local building variation','Brahmaputra river livelihoods and floodplain experience','Barak Valley language and place context','Hill-community geography and self-description','Satra, weaving or other cultural practice from a practitioner','Learning, admission information and accessibility from a student/educator']
    save_json(ROOT/'contributors'/'commissioning-register.json',{'slots':[{'id':f'CONTRIB-{n:02d}','brief':b,'contributor':None,'qualification_or_lived_context':None,'submission_file':None,'consent_record':None,'status':'not acquired; genuine contributor required'} for n,b in enumerate(briefs,1)],'notes':'Publicly available articles are not commissioned contributions or consent records. No outreach was sent.'})
if __name__=='__main__':education();places();glossary();print('Built 25 programme records, 12 place records, 30 draft glossary rows and 6 commissioning briefs.')

"""Specific replacements selected after contact-sheet inspection."""
import concurrent.futures,json
from download_sources import ROOT,download,save_json
JOBS=[
('photographs',9,'File:A view of Deepor Beel in the vicinity of AEC.jpg'),
('photographs',10,'File:A Tea Garden in Cachar District, Assam..JPG'),
('photographs',12,'File:Silchar Nazirpatty.jpg'),
('photographs',13,'File:Barak River as seen from Sadarghat Bridge, Silchar, Assam..JPG'),
('photographs',14,'File:New Silchar Railway Station 2016.jpg'),
('photographs',19,'File:Adrian Scottow, C S Rawanapar High School on Majuli Island (Assam) IMG 7996.jpg'),
('photographs',23,'File:Dibrugarh railway station.jpg'),
('photographs',24,'File:A street at Chitadar chuk, Majuli, Assam.jpg'),
('objects',5,'File:Siva-1.JPG')]
def run(job):
    group,n,title=job
    try:
        row=download(title,group,n)
        if row:
            for p in (ROOT/group).glob(f'{group[:3]}-{n:02d}-*'):
                if str(p.relative_to(ROOT))!=row['path']:p.unlink()
            print(row['id'],title,flush=True)
            return row
        return {'failed_title':title,'reason':'No acceptable licence metadata'}
    except Exception as e:return {'failed_title':title,'reason':str(e)}
if __name__=='__main__':
    rows=list(concurrent.futures.ThreadPoolExecutor(max_workers=3).map(run,JOBS))
    save_json(ROOT/'curation-changes.json',{'reason':'Replace dark/decorative/portrait-led matches and a sketch misclassified as a local photograph; replace courtyard incorrectly selected as an object reproduction.','results':rows})

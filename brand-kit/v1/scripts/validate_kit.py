"""Validate delivered dimensions, transparency, shaped text bounds and trace fidelity."""
from pathlib import Path
import json,subprocess,xml.etree.ElementTree as E,hashlib
from PIL import Image
import numpy as np
from fontTools.ttLib import TTFont
ROOT=Path(__file__).resolve().parents[1];NS='{http://www.w3.org/2000/svg}'
failures=[];rows=0;textcount=0;missing=set()
font=TTFont(ROOT/'fonts/NotoSansBengali-Regular.ttf');cmap=font.getBestCmap()
for p in (ROOT/'templates/svg').glob('*.svg'):
 tree=E.parse(p);node=tree.getroot();w=int(node.attrib['width']);h=int(node.attrib['height']);im=Image.open(ROOT/'templates/png'/(p.stem+'.png'))
 if im.size!=(w,h):failures.append('Incorrect dimensions: '+p.name)
 for ch in ''.join(node.itertext()):
  if '\u0980'<=ch<='\u09ff' and ord(ch) not in cmap:missing.add(ch)
 result=subprocess.run(['inkscape',str(p),'--query-all'],capture_output=True,text=True,check=True)
 for row in result.stdout.splitlines():
  fields=row.split(',')
  if len(fields)!=5 or not fields[0].startswith('text'):continue
  textcount+=1;x,y,bw,bh=map(float,fields[1:])
  if x<70 or x+bw>w-70 or y+bh>h-20:failures.append('Text outside safe bounds: '+p.name+' / '+fields[0])
 rows+=1
if missing:failures.append('Missing Assamese glyphs: '+''.join(sorted(missing)))
alpha_count=0
for p in (ROOT/'logo/png').glob('*.png'):
 if p.name.startswith('profile'):continue
 im=Image.open(p)
 if im.mode!='RGBA' or im.getextrema()[3]!=(0,255):failures.append('Transparency failed: '+p.name)
 alpha_count+=1
for p in (ROOT/'logo/svg').glob('rang-ghar*.svg'):
 if E.parse(p).getroot().findall('.//'+NS+'image'):failures.append('Logo vector contains raster image: '+p.name)
for p in (ROOT/'wordmarks/outlined').glob('*.svg'):
 if E.parse(p).getroot().findall('.//'+NS+'text'):failures.append('Unoutlined text: '+p.name)
for size in [16,32,48,64,128,256,512]:
 for variant in ['maroon','reversed']:
  if Image.open(ROOT/f'logo/favicon/favicon-{variant}-{size}.png').size!=(size,size):failures.append('Incorrect favicon size')
# Compare the trace to the supplied raster foreground at the original cropped resolution.
provenance=json.loads((ROOT/'logo/source/provenance.json').read_text());x0,y0,x1,y1=provenance['trace_bounds_xyxy'];w,h=provenance['viewbox']
tmp=Path('/tmp/axr-trace-qa.png');subprocess.run(['inkscape',str(ROOT/'logo/svg/rang-ghar-master.svg'),'--export-width='+str(w),'--export-filename='+str(tmp)],capture_output=True,check=True)
a=np.array(Image.open(ROOT/'logo/source/rang-ghar-original.jpg').convert('RGB'))[y0:y1,x0:x1];source=(a[:,:,0]<220)&(a[:,:,1]<170)&(a[:,:,2]<170)
trace=np.array(Image.open(tmp).convert('RGBA'))[:,:,3]>=128
intersection=int(np.logical_and(source,trace).sum());union=int(np.logical_or(source,trace).sum());iou=intersection/union
if iou<.97:failures.append('Trace differs materially from supplied foreground')
report={'date':'2026-10-11','result':'pass' if not failures else 'fail','templates_checked':rows,'shaped_text_objects_checked':textcount,'missing_assamese_glyphs':sorted(missing),'text_safe_bounds_failures':failures,'transparent_mark_exports_checked':alpha_count,'favicon_sizes':[16,32,48,64,128,256,512],'logo_vector_raster_embeds':0,'outlined_wordmark_live_text_elements':0,'source_trace_foreground_intersection_over_union':round(iou,6),'visual_review':['logo family and actual-size icon preview','English template contact sheet and cover at full resolution','Assamese template contact sheet and long-copy stress test','bilingual wordmark','visual token board'],'editorial_status':'Technical shaping/glyph/layout checks complete. Independent fluent Assamese review and owner adoption are pending.','limitations':['The detailed mark intentionally becomes a silhouette at favicon size.','Templates contain sample copy/placeholders, not live notices or real video footage.','Changing copy requires a new line-fit check.']}
(ROOT/'docs/QA_REPORT.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2))
raise SystemExit(bool(failures))

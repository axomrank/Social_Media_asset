"""Build editable AxomRank vectors from supplied artwork; raster exports use Inkscape."""
from pathlib import Path
import json,hashlib,html,math,subprocess,base64
from collections import defaultdict
import numpy as np
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
M='#80151A';I='#F7F2EC';C='#292929';G='#3F6B4F';B='#DED4CC';S='#6F625B';GOLD='#A77B37'
NS='http://www.w3.org/2000/svg'
def save(path,value):
 p=ROOT/path;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(value)
def svg(w,h,body,title='AxomRank editable design'):
 return f'<svg xmlns="{NS}" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><title>{html.escape(title)}</title>{body}</svg>'
def rect(x,y,w,h,fill,rx=0,stroke=None):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}"'+(f' stroke="{stroke}" stroke-width="2"' if stroke else '')+'/>'
def text(x,y,lines,size=40,fill=C,weight=400,lang='en',leading=None,anchor='start',id=None):
 if isinstance(lines,str):lines=[lines]
 font='Noto Sans Bengali, Noto Sans, sans-serif' if lang=='as' else 'Noto Sans, sans-serif'
 return f'<text'+(f' id="{id}"' if id else '')+f' x="{x}" y="{y}" fill="{fill}" font-family="{font}" font-size="{size}" font-weight="{weight}" text-anchor="{anchor}" xml:lang="{lang}">'+''.join(f'<tspan x="{x}" dy="{0 if n==0 else leading or size*1.42}">{html.escape(v)}</tspan>' for n,v in enumerate(lines))+'</text>'
def rdp(points,eps=.6):
 if len(points)<3:return points
 a=np.array(points[0]);b=np.array(points[-1]);pts=np.array(points)
 v=b-a;length=np.linalg.norm(v)
 dist=np.linalg.norm(pts-a,axis=1) if length==0 else np.abs(v[0]*(pts[:,1]-a[1])-v[1]*(pts[:,0]-a[0]))/length
 ix=int(np.argmax(dist))
 if dist[ix]<=eps:return [points[0],points[-1]]
 return rdp(points[:ix+1],eps)[:-1]+rdp(points[ix:],eps)
def trace():
 source=ROOT/'logo/source/rang-ghar-original.jpg';arr=np.array(Image.open(source).convert('RGB'));mask=(arr[:,:,0]<220)&(arr[:,:,1]<170)&(arr[:,:,2]<170)
 ys,xs=np.where(mask);x0,x1,y0,y1=int(xs.min()),int(xs.max())+1,int(ys.min()),int(ys.max())+1
 mask=mask[y0:y1,x0:x1];h,w=mask.shape
 adj=defaultdict(list)
 # Clockwise edges around foreground pixels; even-odd fill preserves interior apertures.
 pad=np.pad(mask,1)
 for condition,side in [(mask&~pad[:-2,1:-1],0),(mask&~pad[1:-1,2:],1),(mask&~pad[2:,1:-1],2),(mask&~pad[1:-1,:-2],3)]:
  yy,xx=np.where(condition)
  for y,x in zip(yy.tolist(),xx.tolist()):
   a,b=([(x,y),(x+1,y)],[(x+1,y),(x+1,y+1)],[(x+1,y+1),(x,y+1)],[(x,y+1),(x,y)])[side];adj[a].append(b)
 loops=[]
 while adj:
  first=next(iter(adj));p=first;pts=[p]
  while True:
   q=adj[p].pop()
   if not adj[p]:del adj[p]
   pts.append(q);p=q
   if p==first:break
  area=sum(a[0]*b[1]-b[0]*a[1] for a,b in zip(pts,pts[1:]))/2
  if abs(area)>=6:loops.append((area,rdp(pts)))
 def paths(minarea):
  return ''.join('M'+' L'.join(f'{x},{y}' for x,y in pts)+'Z' for area,pts in loops if abs(area)>=minarea)
 detailed=paths(6);small=paths(1000)
 source_record={'source':'AxomRank_Brand_Identity_Guide.docx / word/media/image1.jpg','preserved_master':'logo/source/rang-ghar-original.jpg','sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'source_dimensions':list(Image.open(source).size),'trace_bounds_xyxy':[x0,y0,x1,y1],'viewbox':[w,h],'method':'Foreground pixel contours, even-odd holes, Douglas-Peucker tolerance 0.6 source pixels; tiny regions below 6 px² removed. One-colour normalisation. No generated replacement geometry.','companion_method':'Same traced contours; areas below 1000 source px² removed for small-size clarity.','approval':'Developed from supplied brand-guide artwork; technical QA complete after export; owner signoff pending.'}
 save('logo/source/provenance.json',json.dumps(source_record,indent=2)+'\n')
 for name,color in [('master',M),('monochrome',C),('reversed',I)]:save(f'logo/svg/rang-ghar-{name}.svg',svg(w,h,f'<path fill="{color}" fill-rule="evenodd" d="{detailed}"/>','Rang Ghar source-traced mark'))
 for name,color in [('maroon',M),('charcoal',C),('ivory',I)]:save(f'logo/svg/rang-ghar-small-{name}.svg',svg(w,h,f'<path fill="{color}" fill-rule="evenodd" d="{small}"/>','Rang Ghar simplified source-derived companion'))
 return w,h,detailed,small
W,H,DETAIL,SMALL=trace()
def mark(x,y,w,color=M,small=False):return f'<g transform="translate({x} {y}) scale({w/W})"><path fill="{color}" fill-rule="evenodd" d="{SMALL if small else DETAIL}"/></g>'
for name,bg,fg in [('maroon',I,M),('reversed',M,I)]:
 save(f'logo/svg/profile-{name}.svg',svg(512,512,rect(0,0,512,512,bg,112)+mark(58,143,396,fg,True)))
 # Favicon is a deliberately optically larger companion; detailed master is not used at 16 px.
 save(f'logo/svg/favicon-{name}.svg',svg(64,64,rect(0,0,64,64,bg,14)+mark(5,20,54,fg,True)))
for orient in ['horizontal','stacked','bilingual']:
 for variant in ['maroon','reversed']:
  fg=M if variant=='maroon' else I
  if orient=='horizontal':w,h=1440,320;body=mark(40,74,320,fg)+text(416,195,'AxomRank',128,fg,700,id='wordmark')
  elif orient=='stacked':w,h=840,630;body=mark(150,58,540,fg)+text(420,495,'AxomRank',116,fg,700,anchor='middle',id='wordmark')
  else:w,h=1480,370;body=mark(40,80,340,fg)+text(440,188,'AxomRank',116,fg,700,id='wordmark')+text(448,266,'অসমৰ জ্ঞান আৰু শিক্ষা',43,fg,400,'as',id='assamese-descriptor')
  save(f'wordmarks/svg/{orient}-{variant}.svg',svg(w+160,h+160,f'<g transform="translate(80 80)">{body}</g>',f'AxomRank {orient} lockup, editable text'))
tokens={'version':'1.0.0','color':{k:{'$type':'color','$value':v} for k,v in {'maroon':M,'ivory':I,'charcoal':C,'white':'#FFFFFF','success':G,'border':B,'secondary':S,'gold':GOLD}.items()},'typography':{'latin':{'family':'Noto Sans','fallback':'sans-serif'},'assamese':{'family':'Noto Sans Bengali','fallback':'Noto Sans, sans-serif'},'weights':[400,600,700],'square1080':{'headline':68,'body':38,'label':24,'caption':28,'assamese_line_height':1.5}},'spacing':{'unit':8,'scale':[8,16,24,32,48,64,80,96],'square_safe_inset':80,'video_safe_inset_x':80,'video_safe_top':180,'video_safe_bottom':280},'radii':{'card':24,'pill':24,'button':16},'logo':{'clear_space':'25% of mark height on every side','detailed_min_width_px':240,'small_companion_min_width_px':32,'favicon_16_exception':'Use dedicated icon; identify by silhouette, not architectural detail.'},'formats':{'square':[1080,1080],'vertical':[1080,1920]},'language_status':'Assamese rendering and glyph coverage tested; independent fluent editorial signoff remains pending.'}
save('tokens/brand.tokens.json',json.dumps(tokens,ensure_ascii=False,indent=2)+'\n')
save('tokens/brand.css',':root {\n'+''.join(f'  --axr-{k}: {v["$value"]};\n' for k,v in tokens['color'].items())+'  --axr-font-latin: "Noto Sans", sans-serif;\n  --axr-font-assamese: "Noto Sans Bengali", "Noto Sans", sans-serif;\n  --axr-space-unit: 8px;\n  --axr-card-radius: 24px;\n  --axr-square-inset: 80px;\n}\n:lang(as) { font-family: var(--axr-font-assamese); line-height: 1.5; }\n')
def insignia(x,y,w):
 data=base64.b64encode((ROOT/'logo/source/winged-insignia-original.png').read_bytes()).decode()
 return f'<image id="supplied-gold-insignia" x="{x}" y="{y}" width="{w}" height="{w*1046/1503}" xlink:href="data:image/png;base64,{data}"/>'
def header(label,lang='en',dark=False):
 fg=I if dark else M
 return text(80,107,'AxomRank',31,fg,700)+text(80,158,label,22,fg,600,lang)+insignia(824,55,176)
def footer(tag='01 / 06',lang='en',dark=False):
 fg=I if dark else M
 return f'<path d="M80 982H1000" stroke="{fg}" stroke-width="2"/>'+text(80,1024,'অসমৰ জ্ঞান • AxomRank' if lang=='as' else 'Learn. Understand. Explore Assam.',22,fg,400,lang)+text(1000,1024,tag,22,fg,600,anchor='end')
def base(label,lang,dark=False):return rect(0,0,1080,1080,M if dark else I)+header(label,lang,dark)
def bullet(x,y,label,bodylines,lang='en',color=M):return rect(x,y-28,52,52,color,16)+text(x+26,y+8,label,26,I,700,anchor='middle')+text(x+84,y+8,bodylines,38,C,500,lang,leading=58)
manifest=[]
for lang in ['en','as']:
 as_=lang=='as'
 # Question: spacious typesetting, editable options and bilingual alternative.
 body=base('অনুশীলন' if as_ else 'PRACTICE QUESTION',lang)+text(80,280,['আগতে চেষ্টা কৰক।','তাৰ পিছত উত্তৰ চাওক।'] if as_ else ['Try first.','Then check your reasoning.'],62,M,700,lang,leading=90)
 body+=text(80,506,['১০০ৰ পৰা ২০% বৃদ্ধি, তাৰ পিছত','২০% হ্ৰাস। শেষৰ মান কিমান?'] if as_ else ['Start at 100. Increase by 20%,','then decrease by 20%. What remains?'],39,C,400,lang,leading=64)
 for n,(label,val) in enumerate(zip('ABCD',['৯৬','১০০','১০৪','১২০'] if as_ else ['96','100','104','120'])):
  x=80+(n%2)*480;y=666+(n//2)*122
  body+=rect(x,y,440,96,'#FFFFFF',20,B)+text(x+28,y+61,label,30,M,700)+text(x+104,y+63,val,40,C,600,lang)
 body+=text(80,949,'এটা বিকল্প বাছনি কৰক।' if as_ else 'Choose one option before swiping.',28,S,400,lang)+footer('02 / 06',lang)
 save(f'templates/svg/01-question-{lang}.svg',svg(1080,1080,body));manifest.append(('question',lang))
 body=base('উত্তৰৰ ব্যাখ্যা' if as_ else 'ANSWER EXPLAINED',lang)+text(80,278,['নতুন মান।','নতুন ভিত্তি।'] if as_ else ['New value.','New percentage base.'],66,M,700,lang,leading=92)
 body+=rect(80,452,920,124,G,24)+text(116,529,'শুদ্ধ উত্তৰ: A • ৯৬' if as_ else 'Correct answer: A • 96',46,'#FFFFFF',700,lang)
 for y,label,lines in [(654,'1',['১০০ × ১.২০ = ১২০'] if as_ else ['100 × 1.20 = 120']),(754,'2',['১২০ × ০.৮০ = ৯৬'] if as_ else ['120 × 0.80 = 96'])]:body+=bullet(80,y,label,lines,lang)
 body+=text(80,900,['দ্বিতীয় শতাংশটো নতুন মানৰ ওপৰত','গণনা কৰা হয়।'] if as_ else ['The second percentage uses the new value.','Use the same method on your next question.'],32,C,400,lang,leading=51)+footer('05 / 06',lang)
 save(f'templates/svg/02-explanation-{lang}.svg',svg(1080,1080,body));manifest.append(('explanation',lang))
 body=base('ঠাই পৰিচয়' if as_ else 'PLACE GUIDE',lang)+text(80,288,'আপোনাৰ ঠাইৰ নাম' if as_ else 'Your place name',68,M,700,lang)
 body+=text(80,356,'এটা ঠাই। এটা উপযোগী পৰিচয়।' if as_ else 'One place. A useful introduction.',30,S,400,lang)
 body+=rect(80,400,920,280,'#FFFFFF',24,B)+text(540,528,'অনুমতিপ্ৰাপ্ত ছবি যোগ কৰক' if as_ else 'Add a credited photograph',38,S,500,lang,anchor='middle')+text(540,583,'এই অংশটো সম্পাদনা কৰিব পাৰি।' if as_ else 'Editable image placeholder',24,S,400,lang,anchor='middle')
 body+=text(80,764,['কি জানিব লাগে','যাচাই কৰা তথ্য ইয়াত লিখক।','উৎস আৰু পৰীক্ষাৰ তাৰিখ সংৰক্ষণ কৰক।'] if as_ else ['What to know','Write one verified fact here.','Keep the source and checked date in the record.'],34,C,400,lang,leading=63)+footer('03 / 06',lang)
 save(f'templates/svg/03-place-{lang}.svg',svg(1080,1080,body));manifest.append(('place',lang))
 body=base('সুযোগৰ তথ্য' if as_ else 'OPPORTUNITY NOTICE',lang)+text(80,278,['পৰৱৰ্তী পদক্ষেপ','স্পষ্ট হওক।'] if as_ else ['Make your','next step clear.'],68,M,700,lang,leading=94)
 body+=rect(80,448,920,92,M,20)+text(112,507,'নমুনা • প্ৰকাশৰ বাবে নহয়' if as_ else 'SAMPLE TEMPLATE • NOT A LIVE NOTICE',30,I,600,lang)
 for y,lab,line in [(630,'01','অনুষ্ঠান / প্ৰতিষ্ঠান' if as_ else 'Programme / institution'),(737,'02','যোগ্যতা: চৰকাৰী জাননী চাওক' if as_ else 'Eligibility: check the official notice'),(844,'03','শেষ তাৰিখ: প্ৰকাশৰ আগতে যাচাই কৰক' if as_ else 'Deadline: verify before publishing')]:body+=bullet(80,y,lab,line,lang)
 body+=text(80,950,'চৰকাৰী জাননীৰ লিংক যোগ কৰক।' if as_ else 'Add the exact official notice link.',27,S,400,lang)+footer('04 / 06',lang)
 save(f'templates/svg/04-opportunity-{lang}.svg',svg(1080,1080,body));manifest.append(('opportunity',lang))
 body=base('তথ্য সংশোধন' if as_ else 'CORRECTION',lang)+text(80,280,['শুদ্ধ তথ্য।','স্পষ্ট সংশোধন।'] if as_ else ['Correct the record.','Explain the change.'],64,M,700,lang,leading=94)
 body+=rect(80,454,920,338,'#FFFFFF',24,B)+text(116,517,'সংশোধিত তথ্য' if as_ else 'Updated information',33,M,700,lang)+text(116,587,['আগৰ কথাটো ইয়াত লিখক।','শুদ্ধ কথাটো আৰু কাৰণটো লিখক।','যাচাই কৰা উৎস সংৰক্ষণ কৰক।'] if as_ else ['State what the earlier item said.','Write the correction and the reason.','Record the verified source and affected posts.'],32,C,400,lang,leading=64)
 body+=text(80,883,['পোষ্টৰ নম্বৰ আৰু সংশোধনৰ তাৰিখ যোগ কৰক।'] if as_ else ['Add the post ID and correction date.'],30,S,400,lang)+footer('UPDATE',lang)
 save(f'templates/svg/05-correction-{lang}.svg',svg(1080,1080,body));manifest.append(('correction',lang))
 body=base('অসমৰ জ্ঞান' if as_ else 'ASSAM EXPLAINED',lang)+text(80,278,['এটা প্ৰশ্ন।','এটা নতুন বুজাবুজি।'] if as_ else ['One question.','A clearer understanding.'],64,M,700,lang,leading=92)+text(80,443,['শিকক। বুজক। আগবাঢ়ক।'] if as_ else ['Learn something worth remembering.'],34,C,400,lang)
 # Standalone SVG embeds generated image if present, otherwise source-derived mark panel.
 imagefile=ROOT/'illustrations/learning-still-life.png'
 if imagefile.exists():
  import base64
  body+=f'<image id="learning-illustration" x="230" y="480" width="770" height="470" preserveAspectRatio="xMidYMid slice" xlink:href="data:image/png;base64,{base64.b64encode(imagefile.read_bytes()).decode()}"/>'
 else:body+=rect(80,510,920,414,'#FFFFFF',24)+mark(155,592,770,M)
 body+=footer('01 / 06',lang)
 save(f'templates/svg/06-carousel-start-{lang}.svg',svg(1080,1080,body));manifest.append(('carousel-start',lang))
 body=base('পৰৱৰ্তী পদক্ষেপ' if as_ else 'YOUR NEXT STEP',lang,True)+text(80,295,['এতিয়া চেষ্টা','কৰাৰ সময়।'] if as_ else ['Put your knowledge','into practice.'],68,I,700,lang,leading=98)
 body+=text(80,551,['এটা প্ৰশ্ন চেষ্টা কৰক।','নিজৰ যুক্তি পৰীক্ষা কৰক।','আৰু এটা বিষয় শিকক।'] if as_ else ['Try one question.','Check your reasoning.','Choose what to learn next.'],42,I,400,lang,leading=82)
 body+=rect(80,818,920,102,I,22)+text(540,883,'শিকিবলৈ আৰম্ভ কৰক' if as_ else 'Start learning',38,M,700,lang,anchor='middle')+footer('06 / 06',lang,True)
 save(f'templates/svg/07-carousel-end-{lang}.svg',svg(1080,1080,body));manifest.append(('carousel-end',lang))
 body=rect(0,0,1080,1920,I)+text(80,240,'AxomRank',40,M,700)+insignia(812,170,188)+text(80,365,'আজিৰ প্ৰশ্ন' if as_ else 'TODAY’S QUESTION',28,M,600,lang)+text(80,470,['এটা স্পষ্ট','ব্যাখ্যা।'] if as_ else ['One clear','explanation.'],76,M,700,lang,leading=110)
 body+=rect(80,674,920,608,'#FFFFFF',30,B)+text(540,937,'ভিডিঅ’ ইয়াত যোগ কৰক' if as_ else 'Add your video here',40,S,500,lang,anchor='middle')+text(540,1008,'এটা উদাহৰণ বা প্ৰকৃত এপৰ দৃশ্য' if as_ else 'A lesson or a real app recording',27,S,400,lang,anchor='middle')
 body+=rect(80,1330,920,176,M,24)+text(112,1392,['সম্পূৰ্ণ উপশিৰোনাম যোগ কৰক।','দুই শাৰীৰ ভিতৰত ৰাখক।'] if as_ else ['Add complete subtitles here.','Keep each caption within two lines.'],35,I,400,lang,leading=66)+text(80,1610,'এটা প্ৰশ্ন চেষ্টা কৰক।' if as_ else 'Try one question on AxomRank.',34,M,600,lang)
 save(f'templates/svg/08-vertical-video-{lang}.svg',svg(1080,1920,body));manifest.append(('vertical-video',lang))
# Typography stress test: full Assamese clauses, conjuncts and Assamese-specific ra/wa.
body=base('অসমীয়া আখৰ আৰু দীঘল বাক্য', 'as')+text(80,278,'অসমীয়া পঢ়িবলৈ সহজ হওক।',58,M,700,'as')+text(80,402,['উত্তৰটো বাছনি কৰাৰ আগতে প্ৰশ্নটো','মনোযোগেৰে পঢ়ক। প্ৰতিটো বিকল্পৰ অৰ্থ','বুজি লওক আৰু নিজৰ যুক্তি লিখি ৰাখক।','','ভুল উত্তৰ মানে শিকাৰ এটা সুযোগ।','ব্যাখ্যাটো পঢ়ি একে ধৰণৰ আন এটা','প্ৰশ্ন চেষ্টা কৰক।'],40,C,400,'as',leading=68)+text(80,962,'ৰ • ৱ • ক্ষ • জ্ঞ • ত্ৰ • শ্ৰ • ০১২৩৪৫৬৭৮৯',26,M,500,'as')+footer('TYPE QA','as')
save('templates/svg/09-assamese-type-test.svg',svg(1080,1080,body))
save('templates/template-manifest.json',json.dumps({'version':'1.0','editable_source':'SVG, live text and named SVG objects','square_canvas':[1080,1080],'video_canvas':[1080,1920],'template_count':16,'families':[{'name':k,'language':l,'status':'editable template; example copy requires publication review'} for k,l in manifest],'assamese_status':'Technical font and layout validation; fluent editorial signoff pending.'},ensure_ascii=False,indent=2)+'\n')
# Visual system board.
body=rect(0,0,1800,1260,I)+text(80,128,'AxomRank / visual system', sixty:=60,M,700)+text(80,181,'Rooted in Assam. Built for clear learning.',28,S)
colors=[('Maroon',M),('Ivory',I),('Charcoal',C),('Success',G),('Gold accent',GOLD)]
for n,(label,color) in enumerate(colors):
 x=80+n*344;body+=rect(x,238,296,148,color,22,B)+text(x,430,label,28,C,600)+text(x,476,color,25,S)
body+=text(80,582,'Noto Sans',48,M,700)+text(80,650,'One question. A clearer understanding.',32,C)+text(80,735,'AxomRank',66,M,700)+text(900,582,'Noto Sans Bengali',42,M,700)+text(900,650,'অসমৰ জ্ঞান আৰু শিক্ষা',40,C,400,'as')+text(900,735,'ৰ ৱ ক্ষ জ্ঞ ত্ৰ শ্ৰ',42,M,600,'as')
body+=text(80,878,'Spacing / 8 px foundation',34,M,600)
for n,value in enumerate([8,16,24,32,48,64,80]):
 x=80+n*238;body+=rect(x,923,value*1.5,60,M,8)+text(x,1036,str(value)+' px',26,C)
body+=text(80,1140,'Square cards 1080 × 1080  •  Video 1080 × 1920  •  Square safe inset 80 px',30,C)+text(80,1200,'Assamese type is technically tested; final copy receives fluent editorial review.',24,S)
save('tokens/visual-system.svg',svg(1800,1260,body))
body=rect(0,0,1800,1200,I)+text(80,115,'AxomRank / logo system',60,M,700)+text(80,180,'Original artwork → source-traced vector → small-size companion',28,S)+mark(80,270,740,M)+mark(1010,280,650,M,True)+text(80,760,'Detailed master',32,M,700)+text(1010,760,'Small-size companion',32,M,700)+rect(80,850,780,220,M,24)+mark(110,885,260,I)+text(414,984,'AxomRank',64,I,700)
for n,size in enumerate([16,32,48,64,128]):
 x=1010+n*138;body+=rect(x,902,size,size,M,max(4,size/5))+mark(x+size*.09,902+size*.3,size*.82,I,True)+text(x,1106,f'{size} px',22,S)
save('previews/logo-system.svg',svg(1800,1200,body))
print('Built vectors, tokens and 16 social templates + Assamese stress test.')

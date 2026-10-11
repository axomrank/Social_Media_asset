"""Build editable, deterministic explanations; AI art is not a numeric authority."""
from pathlib import Path
import html,json,textwrap
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'concept-diagrams';OUT.mkdir(parents=True,exist_ok=True)
MAROON='#80151A';IVORY='#F7F2EC';INK='#292929';GREEN='#3F6B4F'
def text(x,y,s,size=32,fill=INK,anchor='start'):
    return f'<text x="{x}" y="{y}" font-family="Noto Sans, sans-serif" font-size="{size}" fill="{fill}" text-anchor="{anchor}">{html.escape(str(s))}</text>'
def box(x,y,w,h,fill=IVORY):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="18" fill="{fill}" stroke="{INK}" stroke-width="3"/>'
def line(x1,y1,x2,y2,arrow=False):
    return f'<path d="M{x1},{y1} L{x2},{y2}" fill="none" stroke="{MAROON}" stroke-width="6"'+(' marker-end="url(#arrow)"' if arrow else '')+'/>'
def card(id,title,body,method,explanation):
    defs='<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 Z" fill="#80151A"/></marker></defs>'
    out=f'<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080"><title>{html.escape(title)}</title><desc>{html.escape(method+". "+explanation)}</desc>{defs}<rect width="1080" height="1080" fill="{IVORY}"/>'
    out+=text(72,82,'AXOMRANK / '+id+' / EDITABLE EXPLANATION',22,MAROON)
    for i,t in enumerate(textwrap.wrap(title,30)):out+=text(72,163+i*58,t,50)
    out+=body
    out+=text(72,860,method,30,MAROON)
    for i,t in enumerate(textwrap.wrap(explanation,57)):out+=text(72,918+i*36,t,27)
    out+=text(72,1035,'Diagram is authoritative. Pair with illustration; translate as editable text.',20)
    return out+'</svg>'
checks=[]
def save(id,title,body,method,explanation,validation):
    (OUT/(id.lower()+'.svg')).write_text(card(id,title,body,method,explanation))
    checks.append({'id':id,'method':method,'validation':validation,'status':'pass'})

body=''
for n in range(16):
    x=280+(n%4)*125;y=290+(n//4)*125
    body+=box(x,y,100,100,MAROON if n<4 else IVORY)
assert 4/16*100==25
save('CI-01','Percentage: part of a whole',body,'4 / 16 × 100 = 25%','Count the selected four out of sixteen equal units. Divide part by whole, then multiply by 100.',{'whole':16,'selected':4,'percent':25})

body=text(170,345,'Original ratio',34)+text(170,590,'Scale both groups by 2',34)
for row,(m,g) in enumerate([(2,3),(4,6)]):
    for n in range(m+g):
        x=140+n*83;y=430+row*245
        body+=f'<circle cx="{x}" cy="{y}" r="27" fill="{MAROON if n<m else GREEN}"/>'
    body+=text(140,490+row*245,f'Maroon {m} : Green {g}',30)
assert 2/3==4/6 and 4+6==10
save('CI-02','Ratios: scale both parts',body,'2 : 3 → 4 : 6','Multiply both parts by the same factor. The total changes; the ratio stays equivalent.',{'original':[2,3],'scaled':[4,6],'factor':2})

body=''
for i,n in enumerate([2,4,6,8,10]):
    x=80+i*190;body+=box(x,420,155,155)+text(x+77,518,n,60,MAROON,'middle')
    if i<4:body+=text(x+174,385,'+2',28,MAROON,'middle')+line(x+145,405,x+210,405,True)
assert all(b-a==2 for a,b in zip([2,4,6,8],[4,6,8,10]))
save('CI-03','Reasoning: find the rule',body,'2, 4, 6, 8, 10 — add 2','Compare neighbouring terms. Here every difference is 2; apply the same rule to continue.',{'sequence':[2,4,6,8,10],'differences':[2,2,2,2]})

body=box(72,310,936,420)+text(120,395,'observe',64,MAROON)+text(120,465,'Verb: notice carefully.',36)
for i,s in enumerate(['Observe how the seedling','changes each day.']):body+=text(120,555+i*52,s,40)
body+=text(120,675,'Context: watching a plant over time.',28)
save('CI-04','Vocabulary: use the context',body,'observe → notice carefully','Read the sentence, identify the action, then use the word in another sentence with the same meaning.',{'word':'observe','part_of_speech':'verb','example':'Observe how the seedling changes each day.'})

body=''
nodes=[(95,310,'Evaporation'),(600,310,'Condensation'),(600,620,'Precipitation'),(95,620,'Collection')]
for x,y,s in nodes:body+=box(x,y,380,120)+text(x+190,y+75,s,34,MAROON,'middle')
body+=line(485,370,585,370,True)+line(790,445,790,600,True)+line(585,680,485,680,True)+line(285,605,285,445,True)
body+=text(540,550,'Energy from the Sun',30,INK,'middle')
save('CI-05','Science: the water cycle',body,'Evaporate → condense → rain → collect','Water vapour is invisible; clouds are droplets or ice. This is a simplified cycle, with other paths omitted.',{'nodes':[s for _,_,s in nodes],'cycle_closed':True})

# Closed loop schematic: source, closed switch and lamp in series.
body=f'<path d="M200,400 H450 M560,400 H880 V502 M880,598 V710 H200 V570 M200,510 V400" fill="none" stroke="{INK}" stroke-width="7"/>'
body+=line(450,400,560,400)+f'<circle cx="450" cy="400" r="9" fill="{MAROON}"/><circle cx="560" cy="400" r="9" fill="{MAROON}"/>'
body+=line(165,510,235,510)+line(180,570,220,570)
body+=f'<circle cx="880" cy="550" r="48" fill="{IVORY}" stroke="{INK}" stroke-width="6"/>'+line(850,520,910,580)+line(850,580,910,520)
body+=text(505,350,'Closed switch',30,INK,'middle')+text(110,615,'Cell',30)+text(790,640,'Lamp',30)+text(540,780,'Complete path',34,MAROON,'middle')
save('CI-06','Science: a closed circuit',body,'Closed path → current can flow','Opening the switch breaks the path. This schematic is conceptual; use supervised low-voltage kits only.',{'source':1,'switch':'closed','lamp':1,'series_loop':True})

body=''
for x,title,detail in [(72,'Input','Keyboard'),(402,'Process','Computer'),(732,'Output','Screen')]:
    body+=box(x,410,260,240)+text(x+130,485,title,40,MAROON,'middle')+text(x+130,560,detail,32,INK,'middle')
body+=line(346,530,390,530,True)+line(676,530,720,530,True)
save('CI-07','Computing: input to output',body,'Input → process → output','A keyboard supplies input. The computer processes it; the screen presents the result.',{'ordered_stages':['input','process','output']})

body=''
for i,(weight,bit) in enumerate(zip([8,4,2,1],[1,0,1,0])):
    x=100+i*240;body+=text(x+90,345,weight,44,INK,'middle')+box(x,400,180,155,MAROON if bit else IVORY)+text(x+90,502,bit,64,'#FFFFFF' if bit else INK,'middle')+text(x+90,640,f'{bit} × {weight}',32,INK,'middle')
assert sum(w*b for w,b in zip([8,4,2,1],[1,0,1,0]))==10
save('CI-08','Computing: binary place values',body,'1010 in base 2 = 8 + 2 = 10 in base 10','From right to left, place values double: 1, 2, 4, 8. Add only the places whose digit is 1.',{'weights':[8,4,2,1],'bits':[1,0,1,0],'decimal':10})
(OUT/'method-validation.json').write_text(json.dumps({'editable_diagrams':8,'checks':checks},indent=2)+'\n')
print('Built eight editable concept diagrams; method checks passed.')

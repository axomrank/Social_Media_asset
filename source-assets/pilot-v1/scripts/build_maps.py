"""Render real GIS polygons to editable SVG, with source dates and licence labels."""
from pathlib import Path
import json,math,html
ROOT=Path(__file__).resolve().parents[1]
def project(p):
    lon,lat=p[:2];return math.radians(lon)*6378137,6378137*math.log(math.tan(math.pi/4+math.radians(lat)/2))
def rings(g):
    if g['type']=='Polygon':return g['coordinates']
    if g['type']=='MultiPolygon':return [r for poly in g['coordinates'] for r in poly]
    raise ValueError(g['type'])
for slug,title,meta in [('assam-overview','Assam state overview','adm1'),('guwahati-district-context','Guwahati pilot — Kamrup Metropolitan district','adm2'),('sivasagar-district-context','Sivasagar pilot — district context','adm2'),('silchar-district-context','Silchar pilot — Cachar district context','adm2')]:
    p=ROOT/'maps'/f'{slug}.geojson';data=json.loads(p.read_text());m=json.loads((ROOT/'maps'/f'{meta}-source-metadata.json').read_text())
    polygons=[[project(v) for v in r] for f in data['features'] for r in rings(f['geometry'])]
    xs=[v[0] for r in polygons for v in r];ys=[v[1] for r in polygons for v in r]
    xmin,xmax,ymin,ymax=min(xs),max(xs),min(ys),max(ys);scale=min(1040/(xmax-xmin),650/(ymax-ymin));ox=80+(1040-(xmax-xmin)*scale)/2;oy=160+(650-(ymax-ymin)*scale)/2
    paths=[]
    for r in polygons:
        points=[(ox+(x-xmin)*scale,oy+(ymax-y)*scale) for x,y in r]
        paths.append('M '+' L '.join(f'{x:.2f},{y:.2f}' for x,y in points)+' Z')
    note='Historical boundary dataset; not a current administrative or navigation map.'
    credit='geoBoundaries; '+m['boundarySource']
    svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1080" viewBox="0 0 1200 1080"><title>{html.escape(title)}</title><desc>Vector GIS geometry. Dataset represents {m['boundaryYearRepresented']}. Retrieved 2026-10-11. CRS rendering EPSG:3857 from WGS84 source.</desc><rect width="1200" height="1080" fill="#F7F2EC"/><g font-family="sans-serif" fill="#292929"><text x="60" y="65" font-size="30" fill="#80151A">{html.escape(title)}</text><text x="60" y="110" font-size="22">Boundary year: {m['boundaryYearRepresented']} · Retrieved: 11 October 2026</text></g><path d="{' '.join(paths)}" fill="#dbc5ba" stroke="#80151A" stroke-width="2" fill-rule="evenodd"/><g font-family="sans-serif" fill="#292929" font-size="20"><text x="1090" y="150">N ↑</text><text x="60" y="875">Layer: {html.escape(', '.join(f['properties']['shapeName'] for f in data['features']))}</text><text x="60" y="918">{html.escape(note)}</text><text x="60" y="960" font-size="15">{html.escape(credit)}</text><text x="60" y="993" font-size="15">{html.escape(m['boundaryLicense'])}</text><text x="60" y="1026" font-size="15">Source geometry retained in accompanying GeoJSON; render projection EPSG:3857.</text></g></svg>'''
    (ROOT/'maps'/f'{slug}.svg').write_text(svg)
    try:
        import cairosvg
        cairosvg.svg2png(bytestring=svg.encode(),write_to=str(ROOT/'maps'/f'{slug}.png'))
    except ImportError:
        import subprocess,os
        env=os.environ.copy();env['XDG_CACHE_HOME']='/tmp/axr-inkscape-cache'
        subprocess.run(['inkscape',str(ROOT/'maps'/f'{slug}.svg'),'--export-type=png','--export-filename='+str(ROOT/'maps'/f'{slug}.png')],check=True,env=env,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
print('Built four editable GIS-derived maps.')

"""Export SVG masters with Inkscape, preserving alpha and shaped type."""
from pathlib import Path
import subprocess,json,hashlib
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]

def render(src,out,width=None,outline=False):
 out.parent.mkdir(parents=True,exist_ok=True)
 cmd=['inkscape',str(src),'--export-filename='+str(out)]
 if width:cmd+=['--export-width='+str(width)]
 if outline:cmd+=['--export-text-to-path','--export-plain-svg']
 result=subprocess.run(cmd,capture_output=True,text=True)
 if result.returncode or not out.exists():raise RuntimeError(result.stderr)

for src in (ROOT/'logo/svg').glob('*.svg'):
 for width in ([512,1024] if src.stem.startswith('profile') else [512,1024,2048]):
  if src.stem.startswith('favicon'):continue
  render(src,ROOT/f'logo/png/{src.stem}-{width}.png',width)
for variant in ['maroon','reversed']:
 for width in [16,32,48,64,128,256,512]:
  render(ROOT/f'logo/svg/favicon-{variant}.svg',ROOT/f'logo/favicon/favicon-{variant}-{width}.png',width)
 Image.open(ROOT/f'logo/favicon/favicon-{variant}-256.png').save(ROOT/f'logo/favicon/favicon-{variant}.ico',sizes=[(16,16),(32,32),(48,48),(64,64),(128,128),(256,256)])
for src in (ROOT/'wordmarks/svg').glob('*.svg'):
 render(src,ROOT/f'wordmarks/png/{src.stem}.png')
 render(src,ROOT/f'wordmarks/outlined/{src.name}',outline=True)
for src in (ROOT/'templates/svg').glob('*.svg'):render(src,ROOT/f'templates/png/{src.stem}.png')
for src in [ROOT/'tokens/visual-system.svg',ROOT/'previews/logo-system.svg']:render(src,ROOT/f'previews/{src.stem}.png')
# Contact sheet is a new SVG composed of the exported designs, with live labels.
import base64
body='<rect width="1800" height="1350" fill="#F7F2EC"/><text x="48" y="70" font-family="Noto Sans" font-size="38" font-weight="700" fill="#80151A">AxomRank / editable social templates</text>'
for n,src in enumerate(sorted((ROOT/'templates/png').glob('*-en.png'))):
 x=48+(n%4)*438;y=116+(n//4)*594
 body+=f'<image x="{x}" y="{y}" width="396" height="496" preserveAspectRatio="xMidYMid meet" xlink:href="data:image/png;base64,{base64.b64encode(src.read_bytes()).decode()}"/>'
 body+=f'<text x="{x}" y="{y+542}" font-family="Noto Sans" font-size="21" fill="#292929">{src.stem[3:-3].replace("-"," ").title()}</text>'
body+='</svg>'
(ROOT/'previews/social-templates.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1800" height="1350" viewBox="0 0 1800 1350">'+body)
render(ROOT/'previews/social-templates.svg',ROOT/'previews/social-templates.png')
# Assamese contact sheet, all eight families at readable preview size.
body='<rect width="1800" height="2200" fill="#F7F2EC"/>'
for n,src in enumerate(sorted((ROOT/'templates/png').glob('*-as.png'))):
 x=40+(n%3)*590;y=48+(n//3)*706
 body+=f'<image x="{x}" y="{y}" width="548" height="648" preserveAspectRatio="xMidYMid meet" xlink:href="data:image/png;base64,{base64.b64encode(src.read_bytes()).decode()}"/>'
body+='</svg>'
(ROOT/'previews/assamese-templates.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1800" height="2200" viewBox="0 0 1800 2200">'+body)
render(ROOT/'previews/assamese-templates.svg',ROOT/'previews/assamese-templates.png')
print('Exported transparent logos, icon sizes, outlined wordmarks, social templates and previews.')

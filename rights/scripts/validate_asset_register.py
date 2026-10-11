"""Check register coverage, fingerprints and complete permitted-use evidence."""
from pathlib import Path
import json,hashlib,subprocess
ROOT=Path(__file__).resolve().parents[2]
m=json.loads((ROOT/'rights/registers/asset-register.json').read_text());rows=m['assets'];by_path={x['path']:x for x in rows};errors=[]
if len(by_path)!=len(rows):errors.append('Duplicate registered paths')
tracked=[x for x in subprocess.check_output(['git','ls-files','-z'],cwd=ROOT).decode().split('\0') if x]
for name in tracked:
 if name.startswith('rights/registers/') or name.endswith('.zip') or name in ['.gitignore','.gitattributes']:continue
 if name not in by_path:errors.append('Missing registered path: '+name)
for x in rows:
 p=ROOT/x['path']
 if not p.exists() and not p.is_symlink():errors.append('Missing file: '+x['path']);continue
 raw=str(p.readlink()).encode() if p.is_symlink() else p.read_bytes()
 if hashlib.sha256(raw).hexdigest()!=x['sha256']:errors.append('Asset changed since register: '+x['path'])
 if x['eligible_for_declared_use']:
  for field in ['creator','public_credit','permission_record_id','permission_basis','approved_scope','approval_date','review_owner','source_references']:
   if not x.get(field):errors.append('Eligible asset missing '+field+': '+x['path'])
  if x['rights_status'] not in ['licence_documented','permission_documented','owner_requested_brand_copy']:errors.append('Uncleared eligible asset: '+x['path'])
  for dep in x['dependencies']:
   if not by_path.get(dep,{}).get('eligible_for_declared_use'):errors.append('Uncleared eligible dependency: '+x['path'])
print('Registered assets:',len(rows),'validation failures:',len(errors))
for e in errors:print(e)
raise SystemExit(bool(errors))

"""Validate imported file provenance and JSON without third-party dependencies."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def main():
    manifest = json.loads((ROOT / 'catalog/project-import.json').read_text())
    failures = []
    for entry in manifest['files']:
        path = ROOT / entry['repository_path']
        if not path.is_file():
            failures.append(f"Missing imported file: {entry['repository_path']}")
            continue
        if path.stat().st_size != entry['bytes'] or hashlib.sha256(path.read_bytes()).hexdigest() != entry['sha256']:
            failures.append(f"Checksum mismatch: {entry['repository_path']}")
    checked_json = 0
    for path in ROOT.rglob('*.json'):
        if any(part in {'.git', 'node_modules', '__pycache__'} for part in path.parts):
            continue
        try:
            json.loads(path.read_text())
            checked_json += 1
        except (ValueError, UnicodeError) as exc:
            failures.append(f"Invalid JSON: {path.relative_to(ROOT)}: {exc}")
    for failure in failures:
        print(failure)
    print(f"Imported files checked: {len(manifest['files'])}; JSON files parsed: {checked_json}; failures: {len(failures)}")
    return bool(failures)

if __name__ == '__main__':
    raise SystemExit(main())

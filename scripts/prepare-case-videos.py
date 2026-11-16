"""Encode downloaded case demos; usage: python3 scripts/prepare-case-videos.py audit.json.
Requires ffmpeg/ffprobe. Originals stay on their source CDN; generated files are versioned.
"""
import concurrent.futures, hashlib, json, pathlib, subprocess, sys
root = pathlib.Path(__file__).resolve().parent.parent
out = root / 'public/media/cases'
out.mkdir(parents=True, exist_ok=True)
items = [x for x in json.load(open(sys.argv[1])) if x['tag'] == 'video']

def encode(item):
    source = pathlib.Path(item['file']).with_suffix('.full.mp4')
    expected = int(item['headers']['content-range'].split('/')[-1])
    if not source.exists() or source.stat().st_size != expected:
        raise RuntimeError(f'Incomplete source: {source}')
    digest = hashlib.sha256(source.read_bytes()).hexdigest()[:12]
    target = out / f'{digest}-1600.mp4'
    poster = out / f'{digest}-poster.jpg'
    if not target.exists():
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(source), '-map', '0:v:0', '-an',
                        '-vf', 'scale=min(1600\\,iw):-2', '-c:v', 'libx264', '-crf', '21',
                        '-preset', 'slow', '-threads', '2', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(target)], check=True)
    if not poster.exists():
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', '0.1', '-i', str(target), '-frames:v', '1',
                        '-vf', 'scale=800:-2', '-q:v', '3', str(poster)], check=True)
    info = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'stream=width,height,r_frame_rate:format=duration', '-of', 'json', str(target)]))
    print(source.name, expected, '->', target.stat().st_size, flush=True)
    return item['url'], {'src': f'/media/cases/{target.name}', 'poster': f'/media/cases/{poster.name}',
                         'originalBytes': expected, 'bytes': target.stat().st_size, 'duration': float(info['format']['duration'])}

with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
    manifest = dict(pool.map(encode, items))
(root / 'app/case-videos.json').write_text(json.dumps(manifest, indent=2) + '\n')

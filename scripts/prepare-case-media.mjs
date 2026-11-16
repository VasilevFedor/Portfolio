// Rebuild optimized case images from a downloaded audit inventory.
// Usage: node scripts/prepare-case-media.mjs /path/to/audit.json
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
const inventory = JSON.parse(await readFile(process.argv[2], 'utf8'));
const root = new URL('../public/media/cases/', import.meta.url);
await mkdir(root, { recursive: true });
const images = {};
for (const item of inventory.filter(item => item.tag === 'img' && !item.url.endsWith('.svg'))) {
  const input = await readFile(item.file);
  const id = createHash('sha256').update(input).digest('hex').slice(0, 12);
  const meta = await sharp(input).metadata();
  const avatar = item.url.includes('/team/');
  const widths = avatar ? [80, 120] : [640, 960, Math.min(1600, meta.width)];
  const variants = [];
  for (const width of widths) {
    const name = `${id}-${width}.webp`;
    await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 88, effort: 6 }).toFile(fileURLToPath(new URL(name, root)));
    variants.push({ src: `/media/cases/${name}`, width });
  }
  const key = item.url.replace('https://fedor-design.com', '');
  images[key] = { width: meta.width, height: meta.height, src: variants.at(-1).src, srcSet: variants.map(v => `${v.src} ${v.width}w`).join(', ') };
}
await writeFile(new URL('../app/case-images.json', import.meta.url), JSON.stringify(images, null, 2) + '\n');

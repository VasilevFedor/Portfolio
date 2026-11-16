import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Keep small sky maps in the server-rendered payload. The first frame must not
// wait for another network round trip after React hydrates.
const skyRoot = new URL('../public/img/hero-sky/', import.meta.url);
const bitmap = async name => `data:image/webp;base64,${(await readFile(new URL(`unvalley-${name}.webp`, skyRoot))).toString('base64')}`;
const sky = {
  text: await readFile(new URL('unvalley-sky.txt', skyRoot), 'utf8'),
  light: await bitmap('sky-light'),
  near: await bitmap('clouds-near'),
  far: await bitmap('clouds-far'),
};
await writeFile(new URL('../app/components/hero-sky/assets.json', import.meta.url), JSON.stringify(sky));

// The largest ASCII sampling grid is ~424px wide. Keep headroom and lossless
// alpha, but never send the 1536px painting originals to visitors.
for (const name of ['cosmos', 'tulips', 'callas']) {
  const root = new URL('../public/img/footer-flowers/', import.meta.url);
  await sharp(fileURLToPath(new URL(`${name}-source.png`, root)))
    .resize(768, 512)
    .webp({ lossless: true })
    .toFile(fileURLToPath(new URL(`${name}-sample.webp`, root)));
}

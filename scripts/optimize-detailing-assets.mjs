import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ASSETS =
  "C:/Users/karel/.cursor/projects/c-Users-karel-nexton-new/assets";
const PUBLIC = path.resolve("public");

const covers = [
  ["detailing-okleyka-cover.jpg", "images/detailing/okleyka.jpg"],
  ["detailing-tonirovka-cover.jpg", "images/detailing/tonirovka.jpg"],
  ["detailing-himchistka-cover.jpg", "images/detailing/himchistka.jpg"],
  ["detailing-polirovka-cover.jpg", "images/detailing/polirovka.jpg"],
  ["detailing-keramika-cover.jpg", "images/detailing/keramika.jpg"],
  ["detailing-antikor-cover.jpg", "images/detailing/antikor.jpg"],
  ["detailing-lkp-cover.jpg", "images/detailing/lkp.jpg"],
  ["detailing-dvigatel-cover.jpg", "images/detailing/dvigatel.jpg"],
];

const galleries = {
  "okleyka-avto": ["okleyka-1.jpg", "okleyka-2.jpg", "okleyka-3.jpg", "okleyka-4.jpg"],
  tonirovka: ["tonirovka-1.jpg", "tonirovka-2.jpg", "tonirovka-3.jpg", "tonirovka-4.jpg"],
  himchistka: ["himchistka-1.jpg", "himchistka-2.jpg", "himchistka-3.jpg", "himchistka-4.jpg"],
  polirovka: ["polirovka-1.jpg", "polirovka-2.jpg", "polirovka-3.jpg", "polirovka-4.jpg"],
  keramika: ["keramika-1.jpg", "keramika-2.jpg", "keramika-3.jpg", "keramika-4.jpg"],
  antikor: ["antikor-1.jpg", "antikor-2.jpg", "antikor-3.jpg", "antikor-4.jpg"],
  "vosstanovlenie-lkp": ["lkp-1.jpg", "lkp-2.jpg", "lkp-3.jpg", "lkp-4.jpg"],
  "himchistka-dvigatelya": [
    "dvigatel-1.jpg",
    "dvigatel-2.jpg",
    "dvigatel-3.jpg",
    "dvigatel-4.jpg",
  ],
};

async function toJpg(src, dest, { w = 1200, h = 800, maxKb = 300 } = {}) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  let quality = 78;
  let buf;
  for (; quality >= 40; quality -= 4) {
    buf = await sharp(src)
      .rotate()
      .resize(w, h, { fit: "cover", position: "centre" })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();
    if (buf.length <= maxKb * 1024) break;
  }
  fs.writeFileSync(dest, buf);
  const kb = (buf.length / 1024).toFixed(1);
  console.log(`${path.relative(PUBLIC, dest)} → ${kb} KB (q${quality})`);
}

async function main() {
  // covers
  for (const [srcName, rel] of covers) {
    const src = path.join(ASSETS, srcName);
    if (!fs.existsSync(src)) {
      console.warn("MISSING cover", srcName);
      continue;
    }
    await toJpg(src, path.join(PUBLIC, rel), { maxKb: 300 });
  }

  // galleries 1..4
  for (const [slug, files] of Object.entries(galleries)) {
    for (let i = 0; i < files.length; i++) {
      const src = path.join(ASSETS, files[i]);
      if (!fs.existsSync(src)) {
        console.warn("MISSING", files[i]);
        continue;
      }
      await toJpg(
        src,
        path.join(PUBLIC, "images/detailing", slug, `${i + 1}.jpg`),
        { maxKb: 300 },
      );
    }
  }

  // hero poster ≤200 KB, ~1920x1080
  const posterSrc = path.join(ASSETS, "detailing-hero-poster.jpg");
  if (fs.existsSync(posterSrc)) {
    await toJpg(posterSrc, path.join(PUBLIC, "detailing-hero-poster.jpg"), {
      w: 1920,
      h: 1080,
      maxKb: 200,
    });
  }

  // hero video — copy; compress later if needed
  const videoSrc = path.join(ASSETS, "detailing-hero.mp4");
  const videoDest = path.join(PUBLIC, "detailing-hero.mp4");
  if (fs.existsSync(videoSrc)) {
    fs.copyFileSync(videoSrc, videoDest);
    const mb = (fs.statSync(videoDest).size / (1024 * 1024)).toFixed(2);
    console.log(`detailing-hero.mp4 → ${mb} MB`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

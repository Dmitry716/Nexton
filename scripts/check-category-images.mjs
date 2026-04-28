import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const MIN_BYTES = 1024;
const categories = [
  "avtokondicionery",
  "otopiteli",
  "radiatory",
  "svarka",
  "gruzovye",
  "pnevmosistemy_legkovyh",
  "plastik",
];

let hasIssues = false;

function checkFile(filename) {
  const fullPath = join(ROOT, "public", "images", "categories", filename);
  if (!existsSync(fullPath)) {
    console.log(`MISSING: ${filename}`);
    hasIssues = true;
    return;
  }

  const size = statSync(fullPath).size;
  if (size < MIN_BYTES) {
    console.log(`TOO_SMALL (<${MIN_BYTES}B): ${filename} (${size}B)`);
    hasIssues = true;
    return;
  }

  console.log(`OK: ${filename} (${size}B)`);
}

console.log("Checking category images...");
for (const id of categories) {
  checkFile(`${id}.webp`);
  checkFile(`${id}-thumb.webp`);
}

if (hasIssues) {
  console.log(
    "\nSome category images are missing or too small. The site will use remote fallbacks for these files."
  );
  process.exit(1);
}

console.log("\nAll category images are valid.");

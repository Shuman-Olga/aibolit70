const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGE_DIR = path.resolve(__dirname, "../src/assets/img");

const SOURCE_EXTENSIONS = [".jpg", ".jpeg", ".png"];

const WEBP_OPTIONS = {
  quality: 80,
};

const AVIF_OPTIONS = {
  quality: 65,
  effort: 4,
};

function getFilesRecursive(dir) {
  const result = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      result.push(...getFilesRecursive(fullPath));
    } else {
      result.push(fullPath);
    }
  }

  return result;
}

function formatKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function createFormat(
  sourcePath,
  targetPath,
  format,
  options,
  originalSize,
) {
  if (fs.existsSync(targetPath)) {
    const existingSize = fs.statSync(targetPath).size;

    if (existingSize < originalSize) {
      console.log(
        `  ${format}:     already exists (${formatKB(existingSize)})`,
      );

      return existingSize;
    }

    fs.unlinkSync(targetPath);

    console.log(
      `  ${format}:     removed (${formatKB(existingSize)} >= ${formatKB(originalSize)})`,
    );

    return null;
  }

  await sharp(sourcePath)[format](options).toFile(targetPath);

  const size = fs.statSync(targetPath).size;

  if (size >= originalSize) {
    fs.unlinkSync(targetPath);

    console.log(
      `  ${format}:     skipped (${formatKB(size)} >= ${formatKB(originalSize)})`,
    );

    return null;
  }

  console.log(`  ${format}:     ${formatKB(size)}`);

  return size;
}

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (!SOURCE_EXTENSIONS.includes(ext)) {
    return null;
  }

  const baseName = filePath.slice(0, -ext.length);

  const webpPath = `${baseName}.webp`;
  const avifPath = `${baseName}.avif`;

  const originalSize = fs.statSync(filePath).size;

  console.log(`\nProcessing: ${path.basename(filePath)}`);
  console.log(`  original: ${formatKB(originalSize)}`);

  const webpSize = await createFormat(
    filePath,
    webpPath,
    "webp",
    WEBP_OPTIONS,
    originalSize,
  );

  const avifSize = await createFormat(
    filePath,
    avifPath,
    "avif",
    AVIF_OPTIONS,
    originalSize,
  );

  return {
    original: originalSize,
    webp: webpSize || 0,
    avif: avifSize || 0,
  };
}

async function main() {
  if (!fs.existsSync(IMAGE_DIR)) {
    console.error(`Directory not found: ${IMAGE_DIR}`);
    process.exit(1);
  }

  const files = getFilesRecursive(IMAGE_DIR).filter((file) =>
    SOURCE_EXTENSIONS.includes(path.extname(file).toLowerCase()),
  );

  console.log(`Found ${files.length} source images.`);

  let processed = 0;
  let totalOriginal = 0;
  let totalWebp = 0;
  let totalAvif = 0;

  for (const file of files) {
    try {
      const result = await processImage(file);

      if (!result) {
        continue;
      }

      processed++;

      totalOriginal += result.original;
      totalWebp += result.webp;
      totalAvif += result.avif;
    } catch (error) {
      console.error(`\nERROR: ${file}`);
      console.error(error.message);
    }
  }

  console.log("\n----------------------------------------");
  console.log("Optimization complete");
  console.log("----------------------------------------");

  console.log(`Source images: ${processed}`);
  console.log(`Original:      ${formatKB(totalOriginal)}`);
  console.log(`WebP:          ${formatKB(totalWebp)}`);
  console.log(`AVIF:          ${formatKB(totalAvif)}`);

  const webpSaving =
    totalOriginal > 0
      ? ((1 - totalWebp / totalOriginal) * 100).toFixed(1)
      : "0.0";

  const avifSaving =
    totalOriginal > 0
      ? ((1 - totalAvif / totalOriginal) * 100).toFixed(1)
      : "0.0";

  console.log(`WebP saving:   ${webpSaving}%`);
  console.log(`AVIF saving:   ${avifSaving}%`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

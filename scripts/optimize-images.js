const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGE_DIR = path.resolve(__dirname, "../src/assets/img");

const SOURCE_EXTENSIONS = [".jpg", ".jpeg", ".png"];

const MAX_WIDTH = 1600;
const MAX_HEIGHT = 1600;

const DOCUMENT_MAX_WIDTH = 2400;
const DOCUMENT_MAX_HEIGHT = 2400;

const WEBP_OPTIONS = {
  quality: 72,
  effort: 6,
};

const AVIF_OPTIONS = {
  quality: 50,
  effort: 6,
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
  resizeOptions,
) {
  await sharp(sourcePath)
    .resize(resizeOptions)
    [format](options)
    .toFile(targetPath);

  const size = fs.statSync(targetPath).size;

  if (size >= originalSize) {
    fs.unlinkSync(targetPath);

    console.log(
      `  ${format}: skipped (${formatKB(size)} >= ${formatKB(originalSize)})`,
    );

    return 0;
  }

  console.log(`  ${format}: ${formatKB(size)}`);

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

  const fileName = path.basename(filePath);

  const isDocument = /^Лицензия/i.test(fileName);

  const resizeOptions = {
    width: isDocument ? DOCUMENT_MAX_WIDTH : MAX_WIDTH,
    height: isDocument ? DOCUMENT_MAX_HEIGHT : MAX_HEIGHT,
    fit: "inside",
    withoutEnlargement: true,
  };

  console.log(`\nProcessing: ${fileName}`);
  console.log(`  original: ${formatKB(originalSize)}`);

  const webpSize = await createFormat(
    filePath,
    webpPath,
    "webp",
    WEBP_OPTIONS,
    originalSize,
    resizeOptions,
  );

  const avifSize = await createFormat(
    filePath,
    avifPath,
    "avif",
    AVIF_OPTIONS,
    originalSize,
    resizeOptions,
  );

  return {
    original: originalSize,
    webp: webpSize,
    avif: avifSize,
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
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

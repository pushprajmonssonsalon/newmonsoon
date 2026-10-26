const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ASSETS_DIR = path.join(__dirname, "..", "src", "assets", "images");
const PUBLIC_DIR = path.join(__dirname, "..", "public");

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
}

async function convertImageToWebp(filePath, options = {}) {
  const ext = path.extname(filePath).toLowerCase();
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);
  const outputFilePath = path.join(dir, `${baseName}.webp`);

  const statBefore = fs.statSync(filePath);
  const sizeBefore = statBefore.size;

  try {
    const inputBuffer = fs.readFileSync(filePath);
    let pipeline = sharp(inputBuffer);
    const metadata = await pipeline.metadata();

    // Resize if ridiculously oversized for web
    if (metadata.width && metadata.width > 2000) {
      pipeline = pipeline.resize({ width: 2000, withoutEnlargement: true });
    }

    const quality = options.quality || 80;

    if (ext === ".webp") {
      // Re-compress oversized webp (like monsoonsalonbook.webp which is 6.89 MB)
      const compressedBuffer = await pipeline
        .webp({ quality, effort: 6 })
        .toBuffer();
      if (compressedBuffer.length < sizeBefore) {
        fs.writeFileSync(filePath, compressedBuffer);
        const sizeAfter = compressedBuffer.length;
        return {
          file: path.basename(filePath),
          output: path.basename(filePath),
          before: sizeBefore,
          after: sizeAfter,
          saved: sizeBefore - sizeAfter,
          percent:
            (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(1) + "%",
        };
      } else {
        return null;
      }
    } else {
      await pipeline.webp({ quality, effort: 6 }).toFile(outputFilePath);
      const statAfter = fs.statSync(outputFilePath);
      const sizeAfter = statAfter.size;
      return {
        file: path.basename(filePath),
        output: path.basename(outputFilePath),
        before: sizeBefore,
        after: sizeAfter,
        saved: sizeBefore - sizeAfter,
        percent:
          (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(1) + "%",
      };
    }
  } catch (err) {
    console.error(`Failed to convert ${filePath}:`, err.message);
    return null;
  }
}

async function run() {
  console.log("🚀 Starting image optimization...\n");

  if (!fs.existsSync(ASSETS_DIR)) {
    console.error(`Assets directory not found: ${ASSETS_DIR}`);
    return;
  }

  const files = fs.readdirSync(ASSETS_DIR);
  const results = [];
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const filePath = path.join(ASSETS_DIR, file);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    const ext = path.extname(file).toLowerCase();
    const size = stat.size;

    // Convert PNGs and JPGs over 80KB, or WebPs over 1MB
    const shouldConvert =
      ([".png", ".jpg", ".jpeg"].includes(ext) && size > 80 * 1024) ||
      (ext === ".webp" && size > 1024 * 1024);

    if (shouldConvert) {
      process.stdout.write(`Converting ${file} (${formatBytes(size)})... `);
      const res = await convertImageToWebp(filePath, { quality: 80 });
      if (res) {
        console.log(
          `➔ ${res.output} (${formatBytes(res.after)}) [-${res.percent}]`,
        );
        results.push(res);
        totalBefore += res.before;
        totalAfter += res.after;
      } else {
        console.log(`[Skipped/No reduction]`);
      }
    }
  }

  // Also optimize public/logo1024.png if exists
  const publicLogo = path.join(PUBLIC_DIR, "logo1024.png");
  if (fs.existsSync(publicLogo)) {
    const stat = fs.statSync(publicLogo);
    if (stat.size > 200 * 1024) {
      process.stdout.write(
        `Optimizing public/logo1024.png (${formatBytes(stat.size)})... `,
      );
      const res = await convertImageToWebp(publicLogo, { quality: 85 });
      if (res) {
        console.log(
          `➔ ${res.output} (${formatBytes(res.after)}) [-${res.percent}]`,
        );
        results.push(res);
        totalBefore += res.before;
        totalAfter += res.after;
      }
    }
  }

  console.log("\n========================================");
  console.log("🎉 IMAGE OPTIMIZATION SUMMARY");
  console.log("========================================");
  console.log(`Images processed : ${results.length}`);
  console.log(`Original total   : ${formatBytes(totalBefore)}`);
  console.log(`Optimized total  : ${formatBytes(totalAfter)}`);
  const totalSaved = totalBefore - totalAfter;
  const totalPercent =
    totalBefore > 0 ? ((totalSaved / totalBefore) * 100).toFixed(1) : 0;
  console.log(
    `TOTAL SAVED      : ${formatBytes(totalSaved)} (${totalPercent}% reduction)`,
  );
  console.log("========================================\n");
}

run();

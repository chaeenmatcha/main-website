import { build as viteBuild } from "vite";
import { rm, copyFile, mkdir } from "fs/promises";
import path from "path";

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  // Ensure favicon is present in client/public
  try {
    const src = path.resolve(process.cwd(), "attached_assets", "chaeenmatcha_logo.png");
    const destDir = path.resolve(process.cwd(), "client", "public");
    await mkdir(destDir, { recursive: true });
    const dest = path.join(destDir, "favicon.png");
    await copyFile(src, dest);
    console.log(`Copied favicon to ${dest}`);
  } catch (err) {
    console.warn("Could not copy favicon:", err);
  }

  console.log("Building client...");
  await viteBuild();
  
  console.log("Build complete!");
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});

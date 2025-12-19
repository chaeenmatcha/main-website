import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, copyFile, mkdir } from "fs/promises";
import path from "path";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("generating sitemap + static public files...");
  try {
    // generate sitemap/robots/manifest before client build
    await import("./generate-sitemap").then((m) => m.generateSitemap());
  } catch (err) {
    console.warn("sitemap generation failed, continuing:", err);
  }

  // Ensure favicon is present in client/public for SEO and no-JS fallback
  try {
    const src = path.resolve(process.cwd(), "attached_assets", "chaeenmatcha_logo.png");
    const destDir = path.resolve(process.cwd(), "client", "public");
    await mkdir(destDir, { recursive: true });
    const dest = path.join(destDir, "favicon.png");
    await copyFile(src, dest);
    console.log(`Copied favicon to ${dest}`);
  } catch (err) {
    console.warn("Could not copy favicon to client/public:", err);
  }

  console.log("building client...");
  await viteBuild();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});

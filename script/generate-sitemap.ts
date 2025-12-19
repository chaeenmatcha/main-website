import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

export async function generateSitemap() {
  const siteUrl = process.env.SITE_URL || "https://chaeenmatcha.example.com";
  const today = new Date().toISOString();

  const dataPath = path.resolve(process.cwd(), "client", "src", "lib", "data.ts");
  let ids: string[] = [];
  try {
    const content = await readFile(dataPath, "utf-8");
    const re = /id:\s*'([^']+)'/g;
    const m = content.matchAll(re);
    ids = Array.from(m, (r) => r[1]);
  } catch (err) {
    console.warn("Could not read product data to generate product URLs, continuing with static routes.", err);
  }

  const routes = ["/", "/shop", "/about", "/admin"];
  const urls = routes.concat(ids.map((id) => `/product/${id}`));

  const sitemapItems = urls
    .map(
      (u) => `  <url>
    <loc>${siteUrl.replace(/\/$/, "")}${u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapItems}
</urlset>`;

  const publicDir = path.resolve(process.cwd(), "client", "public");
  await mkdir(publicDir, { recursive: true });

  await writeFile(path.join(publicDir, "sitemap.xml"), sitemap, "utf-8");

  const robots = `User-agent: *
Allow: /
Sitemap: ${siteUrl.replace(/\/$/, "")}/sitemap.xml
`;
  await writeFile(path.join(publicDir, "robots.txt"), robots, "utf-8");

  const manifest = {
    name: "CHAEEN MATCHA",
    short_name: "CHAEEN",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1F6F63",
    icons: [
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
  await writeFile(path.join(publicDir, "manifest.webmanifest"), JSON.stringify(manifest, null, 2), "utf-8");

  console.log(`Generated sitemap with ${urls.length} URLs at ${publicDir}`);
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  generateSitemap().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

export default generateSitemap;

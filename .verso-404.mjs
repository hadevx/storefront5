import { chromium } from "playwright";
const b = await chromium.launch({ channel: "msedge" });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const bad = [];
p.on("response", (r) => { if (r.status() >= 400) bad.push(r.status() + " " + r.url()); });
for (const path of ["/", "/books", "/books/circe", "/about", "/collections", "/checkout"]) {
  await p.goto("http://localhost:5173" + path, { waitUntil: "networkidle" });
  await p.waitForTimeout(400);
}
console.log(bad.length ? [...new Set(bad)].join("\n") : "no failures");
await b.close();

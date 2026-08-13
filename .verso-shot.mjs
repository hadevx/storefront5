import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:5174";
const OUT = process.env.OUT || ".";
const SPEC = JSON.parse(process.env.SPEC || "[]");

const browser = await chromium.launch({ channel: "msedge" });
const errors = [];

for (const s of SPEC) {
  const ctx = await browser.newContext({
    viewport: { width: s.w || 1440, height: s.h || 900 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`[${s.name}] ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`[${s.name}] pageerror: ${e.message}`));

  await page.goto(BASE + s.path, { waitUntil: "networkidle" });
  await page.evaluate(async (sel) => {
    await new Promise((r) => setTimeout(r, 300));
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    if (sel) {
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({ block: "start" });
      window.scrollBy(0, -90);
    } else {
      window.scrollTo(0, 0);
    }
    await new Promise((r) => setTimeout(r, 900));
  }, s.sel || null);

  if (s.click) {
    await page.click(s.click);
    await page.waitForTimeout(900);
  }
  if (s.hover) {
    await page.hover(s.hover);
    await page.waitForTimeout(700);
  }

  await page.screenshot({ path: `${OUT}/${s.name}.png`, fullPage: Boolean(s.full) });
  console.log("shot:", s.name);
  await ctx.close();
}

await browser.close();
console.log("--- errors ---");
console.log(errors.length ? errors.join("\n") : "none");

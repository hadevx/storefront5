import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:5173";
const OUT = process.env.OUT || ".";
const URL_PATH = process.env.P || "/";
const SEL = process.env.SEL || "footer";
const NAME = process.env.NAME || "probe";
const EVAL = process.env.EVAL || "";

const b = await chromium.launch({ channel: "msedge" });
const ctx = await b.newContext({ viewport: { width: Number(process.env.W || 1440), height: Number(process.env.H || 900) } });
const p = await ctx.newPage();
const errors = [];
p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
p.on("pageerror", (e) => errors.push("pageerror: " + e.message));

await p.goto(BASE + URL_PATH, { waitUntil: "networkidle" });
await p.evaluate(async () => {
  const step = 400;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 180));
  }
  window.scrollTo(0, document.body.scrollHeight);
  await new Promise((r) => setTimeout(r, 1500));
});

if (EVAL) {
  const out = await p.evaluate(EVAL);
  console.log("eval:", JSON.stringify(out, null, 2));
}

const el = await p.$(SEL);
if (!el) {
  console.log("selector not found:", SEL);
} else {
  await el.screenshot({ path: `${OUT}/${NAME}.png` });
  console.log("box:", JSON.stringify(await el.boundingBox()));
}
console.log("--- errors ---");
console.log(errors.length ? errors.join("\n") : "none");
await b.close();

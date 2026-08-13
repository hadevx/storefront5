import { chromium } from "playwright";
const P = process.env.P2 || "/";
const b = await chromium.launch({ channel: "msedge" });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
const p = await ctx.newPage();
const errors = [];
p.on("pageerror", (e) => errors.push("pageerror: " + e.message));
p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await p.goto("http://localhost:5173" + P, { waitUntil: "networkidle" });
const scan = async () => p.evaluate(() => {
  const all = [...document.querySelectorAll("span.overflow-hidden > span")];
  const hidden = all.filter(s => { const t = getComputedStyle(s).transform; return t !== "none" && !/matrix\(1, 0, 0, 1, 0, 0\)/.test(t); });
  return { total: all.length, hiddenCount: hidden.length, hidden: hidden.map(s => s.textContent.slice(0, 18)) };
});
await p.waitForTimeout(2500);
console.log("at load (above-fold should be revealed, rest hidden):", JSON.stringify(await scan()));
await p.evaluate(async () => {
  for (let y = 0; y < document.documentElement.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 170)); }
  window.scrollTo(0, document.documentElement.scrollHeight);
  await new Promise(r => setTimeout(r, 2000));
});
console.log("after scroll:", JSON.stringify(await scan()));
console.log("errors:", errors.length ? errors.join("\n") : "none");
await b.close();

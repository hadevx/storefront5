import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:5174";
const OUT = process.env.OUT || ".";
const errors = [];

const browser = await chromium.launch({ channel: "msedge" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));

const shot = async (name, opts = {}) => {
  await page.screenshot({ path: `${OUT}/${name}.png`, ...opts });
  console.log("shot:", name);
};

/* 1. mega menu */
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await page.hover("text=GENRES");
await page.waitForTimeout(700);
await shot("f-megamenu");

/* 2. search overlay */
await page.click('button[aria-label="Search the shop"]');
await page.waitForTimeout(800);
await shot("f-search-empty");
await page.fill("#verso-search", "murakami");
await page.waitForTimeout(900);
await shot("f-search-results");
await page.keyboard.press("Escape");
await page.waitForTimeout(500);

/* 3. add to bag from a book page -> drawer */
await page.goto(`${BASE}/books/circe`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await page.click('button:has-text("Add to bag")');
await page.waitForTimeout(500);
await shot("f-toast");
await page.goto(`${BASE}/books/piranesi`, { waitUntil: "networkidle" });
await page.click('button:has-text("Add to bag")');
await page.waitForTimeout(400);
await page.click('button[aria-label*="Bag,"]');
await page.waitForTimeout(900);
await shot("f-bagdrawer");
await page.keyboard.press("Escape");

/* 4. cart page */
await page.goto(`${BASE}/cart`, { waitUntil: "networkidle" });
await page.waitForTimeout(700);
await shot("f-cart");

/* 5. checkout steps */
await page.goto(`${BASE}/checkout`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await shot("f-checkout-1");
await page.fill("#co-email", "reader@verso.books");
await page.fill("#co-first", "Ada");
await page.fill("#co-last", "Mensah");
await page.click('button:has-text("Continue to delivery")');
await page.waitForTimeout(700);
await shot("f-checkout-2");

/* 6. wishlist with an item */
await page.goto(`${BASE}/books/devotions`, { waitUntil: "networkidle" });
await page.click('button[aria-label*="Save"]');
await page.waitForTimeout(400);
await page.goto(`${BASE}/wishlist`, { waitUntil: "networkidle" });
await page.waitForTimeout(700);
await shot("f-wishlist");

/* 7. catalog filtering */
await page.goto(`${BASE}/books`, { waitUntil: "networkidle" });
await page.click('button:has-text("Poetry")');
await page.waitForTimeout(900);
await page.evaluate(() => window.scrollTo(0, 520));
await page.waitForTimeout(400);
await shot("f-catalog-filtered");

/* 8. mobile menu */
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const mp = await m.newPage();
mp.on("pageerror", (e) => errors.push("mobile pageerror: " + e.message));
await mp.goto(`${BASE}/`, { waitUntil: "networkidle" });
await mp.click('button[aria-label="Open menu"]');
await mp.waitForTimeout(900);
await mp.screenshot({ path: `${OUT}/f-mobilemenu.png` });
console.log("shot: f-mobilemenu");
await mp.keyboard.press("Escape");
await mp.goto(`${BASE}/books`, { waitUntil: "networkidle" });
await mp.waitForTimeout(500);
await mp.click('button:has-text("Filter")');
await mp.waitForTimeout(900);
await mp.screenshot({ path: `${OUT}/f-mobilefilters.png` });
console.log("shot: f-mobilefilters");

await browser.close();
console.log("--- errors ---");
console.log(errors.length ? errors.join("\n") : "none");

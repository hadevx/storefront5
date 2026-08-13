import clsx from "clsx";

export const cn = (...args) => clsx(...args);

const DIACRITICS = new RegExp("[\\u0300-\\u036f]", "g");

export const slugify = (str = "") =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Small, stable string hash — used to art-direct covers and pick editorial copy. */
export const hash = (str = "") => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
};

export const pick = (arr, seed, offset = 0) => arr[(hash(seed) + offset * 7919) % arr.length];

export const pickMany = (arr, seed, count) => {
  const out = [];
  const pool = [...arr];
  let h = hash(seed);
  while (out.length < count && pool.length) {
    h = (h * 1103515245 + 12345) >>> 0;
    out.push(pool.splice(h % pool.length, 1)[0]);
  }
  return out;
};

/** Kuwaiti dinar — three decimals (fils), prefixed with the local "KD" symbol. */
export const formatPrice = (value) =>
  `KD ${new Intl.NumberFormat("en-KW", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(value ?? 0)}`;

export const formatDate = (iso) =>
  new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(iso));

export const formatShortDate = (iso) =>
  new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(new Date(iso));

export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

export const pad2 = (n) => String(n).padStart(2, "0");

/** Deterministic, well-formed-looking ISBN-13 for demo catalogue data. */
export const isbnFor = (slug) => {
  const n = hash(slug);
  const body = String(n).padStart(9, "0").slice(0, 9);
  const digits = `978${body}`.split("").map(Number);
  const sum = digits.reduce((acc, d, i) => acc + d * (i % 2 === 0 ? 1 : 3), 0);
  const check = (10 - (sum % 10)) % 10;
  return `978-${body.slice(0, 1)}-${body.slice(1, 4)}-${body.slice(4)}-${check}`;
};

/**
 * VERSO cover system
 * ------------------------------------------------------------------
 * Rather than scraping inconsistent third-party cover images, every book in
 * the catalogue is art-directed from a fixed set of palettes and layout
 * templates. The result is a shelf that reads as one curated imprint, loads
 * instantly, scales to any size and never breaks.
 */

export const PALETTES = {
  ivory: { bg: "#EDE7DA", fg: "#17140F", ac: "#7A2231", edge: "#F6F1E6" },
  oxblood: { bg: "#6B1F2B", fg: "#F1E6D8", ac: "#D9A441", edge: "#EFE6D6" },
  ink: { bg: "#14161A", fg: "#EDE9E0", ac: "#C2553F", edge: "#E8E2D5" },
  olive: { bg: "#3F4A34", fg: "#EFE9D9", ac: "#D8B46A", edge: "#EDE6D4" },
  clay: { bg: "#C4643C", fg: "#FDF3E6", ac: "#2B211B", edge: "#F7EEDF" },
  mist: { bg: "#A8BBC4", fg: "#17222A", ac: "#7A2231", edge: "#F1EDE3" },
  mustard: { bg: "#D9A441", fg: "#241C10", ac: "#6B1F2B", edge: "#F6EEDC" },
  plum: { bg: "#3B2740", fg: "#EFE3EC", ac: "#C9A227", edge: "#EDE5E7" },
  sand: { bg: "#DCCBB0", fg: "#2E2318", ac: "#4F6B4A", edge: "#F7F1E4" },
  midnight: { bg: "#1B2A4A", fg: "#E8ECF2", ac: "#E0A458", edge: "#E9E5DA" },
  sage: { bg: "#B7C4B1", fg: "#22291F", ac: "#7A3B2E", edge: "#F2EEE2" },
  blush: { bg: "#E6C7C0", fg: "#33211F", ac: "#2F4739", edge: "#F8F0E7" },
  slate: { bg: "#4A5459", fg: "#E9EDEE", ac: "#D98E5A", edge: "#EBE6DA" },
  emerald: { bg: "#1F4A3D", fg: "#EAF0E8", ac: "#E2B857", edge: "#EDE8DA" },
  bone: { bg: "#F0E9DC", fg: "#1A1A1A", ac: "#1F5C4B", edge: "#FAF6EC" },
  cobalt: { bg: "#2C4C9B", fg: "#EFF1F7", ac: "#F0C24B", edge: "#E9E7DC" },
};

export const PALETTE_KEYS = Object.keys(PALETTES);

/**
 * Layout templates. Each one decides the geometry layer and where the
 * typography sits — `title` position, alignment and relative scale.
 */
export const TEMPLATES = {
  rule: { align: "center", place: "center", scale: 1, case: "title" },
  block: { align: "left", place: "bottom", scale: 1.05, case: "title" },
  arc: { align: "center", place: "bottom", scale: 0.95, case: "title" },
  stripes: { align: "left", place: "top", scale: 0.92, case: "upper" },
  type: { align: "left", place: "fill", scale: 1.45, case: "upper" },
  grid: { align: "left", place: "bottom", scale: 0.95, case: "title" },
  horizon: { align: "center", place: "top", scale: 1, case: "title" },
  orbit: { align: "center", place: "bottom", scale: 1, case: "title" },
  diagonal: { align: "left", place: "center", scale: 1, case: "title" },
  frame: { align: "center", place: "center", scale: 0.9, case: "title" },
};

export const TEMPLATE_KEYS = Object.keys(TEMPLATES);

export const getPalette = (key) => PALETTES[key] || PALETTES.ivory;
export const getTemplate = (key) => TEMPLATES[key] || TEMPLATES.rule;

export const STORE = {
  name: "VERSO",
  legalName: "Verso Booksellers",
  since: 1994,
  tagline: "A world of stories, beautifully curated.",
  address: ["17 Aldergate Lane", "London EC1V 9BR"],
  hours: ["Mon–Fri 09:00 — 19:00", "Sat 10:00 — 19:00", "Sun 11:00 — 17:00"],
  email: "counter@verso.books",
  phone: "+44 20 7946 0812",
  freeShippingThreshold: 45,
};

export const MANIFESTO = [
  "We stock fewer books than the shop across the road, on purpose.",
  "Every title on these shelves was read by someone who works here.",
  "A recommendation is worth more than an algorithm.",
  "Independent publishers get the front table twice a year.",
  "Nobody is upsold anything at this counter, ever.",
];

export const TICKER = [
  "Free delivery over KD 45",
  "Signed first editions in store",
  "Reading room open until seven",
  "New this week — 11 titles",
  "Gift wrapping in marbled paper",
  "Booksellers since 1994",
];

export const NAV = [
  { label: "Books", to: "/books" },
  { label: "Genres", to: "/genres", mega: true },
  { label: "New Releases", to: "/new" },
  { label: "Best Sellers", to: "/bestsellers" },
  { label: "Collections", to: "/collections" },
  { label: "About", to: "/about" },
];

export const SUGGESTED_SEARCHES = ["Fiction", "Atomic Habits", "Fantasy", "Psychology", "New releases", "Murakami"];

export const ABOUT_CHAPTERS = [
  {
    number: "01",
    title: "The shop",
    body: "VERSO began in 1994 as one room above a locksmith on Aldergate Lane, with four hundred titles and a chair nobody was allowed to sell. Thirty years later there are eleven thousand titles, three rooms and the same chair, now reupholstered.",
  },
  {
    number: "02",
    title: "How we choose",
    body: "Nothing reaches the shelf on the strength of a marketing budget. Each of our seven booksellers keeps a section, reads for it, and writes the card that sits beneath the stack. If a card is unsigned, the book is not on the table.",
  },
  {
    number: "03",
    title: "Independent presses",
    body: "Twice a year the front table belongs entirely to independent publishers — small houses translating from Korean, Portuguese and Icelandic, printing runs of two thousand, doing the work the market will not fund.",
  },
  {
    number: "04",
    title: "The reading room",
    body: "The room at the back has eight seats, a kettle and no wifi. It is open to anyone with or without a purchase, and it closes at seven whether or not you have finished the chapter.",
  },
];

export const PRESS = [
  { quote: "The best-curated shelf in the city, and the least pretentious about it.", source: "Monocle" },
  { quote: "A shop that behaves like a good editor.", source: "The Bookseller" },
  { quote: "You go in for one thing and leave having had a conversation.", source: "Time Out" },
];

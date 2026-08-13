import { BOOKS } from "./books";

export const COLLECTIONS = [
  {
    slug: "for-quiet-sundays",
    title: "For Quiet Sundays",
    number: "01",
    kicker: "Slow reading",
    theme: "light",
    palette: "sand",
    tagline: "Books that ask for an afternoon, not a commute.",
    description:
      "Nothing here needs to be finished quickly. Long paragraphs, low stakes, high attention — the shelf we reach for when the week has been loud.",
    curator: "Curated by Ines, fiction buyer",
  },
  {
    slug: "books-that-change-your-mind",
    title: "Books That Change Your Mind",
    number: "02",
    kicker: "Ideas",
    theme: "dark",
    palette: "ink",
    tagline: "Read one. Argue with it. Come back different.",
    description:
      "Each of these has altered a default in somebody on our staff — how we work, what we owe, where history actually happened. They do not agree with each other, which is the point.",
    curator: "Curated by the VERSO floor",
  },
  {
    slug: "the-midnight-shelf",
    title: "The Midnight Shelf",
    number: "03",
    kicker: "After hours",
    theme: "dark",
    palette: "midnight",
    tagline: "For the hours when the house is asleep.",
    description:
      "Strange, nocturnal, faintly unsafe. Books that behave differently after eleven — dream logic, deep water, poems written before dawn.",
    curator: "Curated by Tomas, night shift",
  },
  {
    slug: "start-here",
    title: "Start Here",
    number: "04",
    kicker: "First shelf",
    theme: "light",
    palette: "bone",
    tagline: "If you have fallen out of the habit of reading.",
    description:
      "Short chapters, strong momentum, no homework. The books we hand to people who say they used to read and would like to again.",
    curator: "Curated by the counter",
  },
  {
    slug: "for-the-curious",
    title: "For the Curious",
    number: "05",
    kicker: "Wide angle",
    theme: "light",
    palette: "olive",
    tagline: "Fungi, silver, time travel, video games.",
    description:
      "Books written by people who went a long way down one particular hole and came back able to explain it. Bring a pencil.",
    curator: "Curated by Ada, non-fiction buyer",
  },
  {
    slug: "short-and-devastating",
    title: "Short & Devastating",
    number: "06",
    kicker: "Under 300 pages",
    theme: "dark",
    palette: "oxblood",
    tagline: "One sitting. Considerable damage.",
    description:
      "Small books with a long reach. Read on a train, thought about for a decade. None of them will take more than an evening.",
    curator: "Curated by Ines, fiction buyer",
  },
];

export const collectionBySlug = (slug) => COLLECTIONS.find((c) => c.slug === slug);

export const collectionBooks = (slug) => BOOKS.filter((b) => b.collections.includes(slug));

export const COLLECTIONS_WITH_BOOKS = COLLECTIONS.map((c) => ({ ...c, books: collectionBooks(c.slug) }));

export const GENRES = [
  {
    name: "Fiction",
    slug: "fiction",
    tagline: "Lives other than your own.",
    blurb: "Novels that hold a life up to the light and turn it slowly until you see your own reflection.",
  },
  {
    name: "Fantasy",
    slug: "fantasy",
    tagline: "Rules bent, worlds built.",
    blurb: "Invented worlds with real weather — magic that costs something, maps worth memorising.",
  },
  {
    name: "Romance",
    slug: "romance",
    tagline: "The oldest plot, still undefeated.",
    blurb: "Wanting, waiting, misreading, arriving. Books that take feeling seriously.",
  },
  {
    name: "Mystery",
    slug: "mystery",
    tagline: "Someone knows. Not you. Yet.",
    blurb: "Crime, misdirection and the pleasure of a last page that rearranges everything before it.",
  },
  {
    name: "Science Fiction",
    slug: "science-fiction",
    tagline: "The present, wearing a mask.",
    blurb: "Futures precise enough to argue with, written by people paying close attention to now.",
  },
  {
    name: "Biography",
    slug: "biography",
    tagline: "A life, examined.",
    blurb: "Memoir and biography — the long look back, told by people who lived it or loved it.",
  },
  {
    name: "History",
    slug: "history",
    tagline: "How we got here.",
    blurb: "Narrative history that reads like reportage from a country you've only seen in ruins.",
  },
  {
    name: "Business",
    slug: "business",
    tagline: "Work, made deliberate.",
    blurb: "Strategy, craft and company-building — the useful shelf, minus the airport paperbacks.",
  },
  {
    name: "Psychology",
    slug: "psychology",
    tagline: "The mind, from the inside.",
    blurb: "How attention, memory, trauma and habit actually behave when nobody's performing.",
  },
  {
    name: "Self Development",
    slug: "self-development",
    tagline: "Small changes, kept.",
    blurb: "Books about attention and practice, for readers allergic to being shouted at.",
  },
  {
    name: "Philosophy",
    slug: "philosophy",
    tagline: "Questions that outlive answers.",
    blurb: "Ancient and modern thinking about how to live with limits, doubt and other people.",
  },
  {
    name: "Science",
    slug: "science",
    tagline: "Wonder, with evidence.",
    blurb: "Nature writing and popular science by authors who can hold a fact and a sentence at once.",
  },
  {
    name: "Children",
    slug: "children",
    tagline: "First libraries.",
    blurb: "The books that get read four hundred times, and hold up on the four hundredth.",
  },
  {
    name: "Poetry",
    slug: "poetry",
    tagline: "Language at full attention.",
    blurb: "Collections to keep by the bed and open at random for the rest of your life.",
  },
];

export const genreBySlug = (slug) => GENRES.find((g) => g.slug === slug);
export const genreByName = (name) => GENRES.find((g) => g.name === name);

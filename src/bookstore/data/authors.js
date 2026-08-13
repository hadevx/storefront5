import { BOOKS } from "./books";
import { slugify, hash, pad2 } from "../lib/utils";
import { PALETTE_KEYS } from "../lib/covers";

/**
 * Author files. A handful are written out in full — the ones the store
 * actually champions — and the rest are composed from the catalogue so every
 * author link in the site lands somewhere with dignity.
 */
const PROFILES = [
  {
    name: "Haruki Murakami",
    born: "1949, Kyoto",
    nationality: "Japanese",
    palette: "cobalt",
    quote: "If you only read the books that everyone else is reading, you can only think what everyone else is thinking.",
    bio: [
      "Murakami ran a Tokyo jazz bar called Peter Cat until, at twenty-nine, he watched a baseball game and decided — with no evidence — that he could write a novel. He wrote it at the kitchen table after closing time.",
      "The books that followed built a private weather system: vanishing cats, parallel Tokyos, wells, ears, hotels with too many floors. Beneath the surrealism is an unusually disciplined writer who runs a marathon most years and treats the desk as a training schedule.",
    ],
  },
  {
    name: "Sally Rooney",
    born: "1991, County Mayo",
    nationality: "Irish",
    palette: "sage",
    quote: "It's not a question of what to do with your life. It's a question of what to do with today.",
    bio: [
      "A former champion debater who writes conversation better than almost anyone working — the pauses, the misfires, the things people say to test whether they're allowed to say the next thing.",
      "Her novels are domestic in scale and political in argument: class, money, Catholicism and the small betrayals that decide whether two people can stay in a room together.",
    ],
  },
  {
    name: "Madeline Miller",
    born: "1978, Boston",
    nationality: "American",
    palette: "clay",
    quote: "I could recognise him by touch alone, by smell; I would know him blind.",
    bio: [
      "Miller taught Latin and Greek to high-school students for a decade while rewriting the same novel. The result, The Song of Achilles, took ten years and reads as though it took one long summer.",
      "Her subject is the classical world felt from the inside — myth as domestic life, gods as difficult relatives, heroism as something that happens to people who wanted an ordinary evening.",
    ],
  },
  {
    name: "Rick Rubin",
    born: "1963, Long Beach, New York",
    nationality: "American",
    palette: "ivory",
    quote: "The audience comes last. Make the thing you want to exist.",
    bio: [
      "Rubin has produced records across four decades and almost every genre while refusing, by his own account, to learn to operate the equipment. His instrument is attention.",
      "The Creative Act distils that method into short chapters on noticing, waiting and finishing — a producer's philosophy for anyone who has to bring something into the world without a guarantee.",
    ],
  },
  {
    name: "Matt Haig",
    born: "1975, Sheffield",
    nationality: "British",
    palette: "midnight",
    quote: "The only way to learn is to live.",
    bio: [
      "Haig writes about depression and survival with the plainness of someone reporting from inside it, then wraps the report in a story kind enough to finish.",
      "The Midnight Library became one of the defining novels of the decade for the simplest of reasons: it takes regret seriously and refuses to end there.",
    ],
  },
  {
    name: "Kazuo Ishiguro",
    born: "1954, Nagasaki",
    nationality: "British",
    palette: "mist",
    quote: "Memories, even your most precious ones, fade surprisingly quickly.",
    bio: [
      "A Nobel laureate whose narrators are always slightly wrong about their own lives — butlers, clones, artificial friends — and whose restraint is the loudest thing on the page.",
      "Ishiguro writes the same book from new angles: what it costs to serve, to be useful, to accept a life someone else designed for you.",
    ],
  },
  {
    name: "Mary Oliver",
    born: "1935, Maple Heights, Ohio",
    nationality: "American",
    palette: "sage",
    quote: "Tell me, what is it you plan to do with your one wild and precious life?",
    bio: [
      "Oliver walked in the woods early each morning with a notebook in her pocket for fifty years. That is very nearly the whole biography, and the whole method.",
      "Her poems are short, plain and difficult to argue with: pay attention, be astonished, tell about it.",
    ],
  },
  {
    name: "James Clear",
    born: "1986, Ohio",
    nationality: "American",
    palette: "bone",
    quote: "Every action is a vote for the type of person you wish to become.",
    bio: [
      "Clear spent years writing a weekly essay for a small mailing list before Atomic Habits sold in the millions — an unusually literal demonstration of his own thesis.",
      "He writes about behaviour change the way an engineer writes documentation: small units, tested claims, nothing decorative.",
    ],
  },
  {
    name: "Tara Westover",
    born: "1986, Idaho",
    nationality: "American",
    palette: "sand",
    quote: "You can love someone and still choose to say goodbye to them.",
    bio: [
      "Westover did not set foot in a classroom until she was seventeen. Ten years later she had a doctorate from Cambridge and a memoir that refuses to make her family into villains.",
      "Educated is a book about the price of an education — paid, in her case, in the currency of belonging.",
    ],
  },
  {
    name: "Yuval Noah Harari",
    born: "1976, Kiryat Ata",
    nationality: "Israeli",
    palette: "bone",
    quote: "Large numbers of strangers can cooperate successfully by believing in common myths.",
    bio: [
      "A medieval military historian who took a running jump at the whole of the human story and landed, improbably, on the bestseller list of every country with bookshops.",
      "Harari's gift is compression: seventy thousand years of cognition, agriculture and money delivered in chapters you can finish before your coffee goes cold.",
    ],
  },
  {
    name: "Robert Macfarlane",
    born: "1976, Nottinghamshire",
    nationality: "British",
    palette: "ink",
    quote: "We are part mineral beings too — our teeth are reefs, our bones are stones.",
    bio: [
      "Macfarlane writes landscape as language and language as landscape, reviving lost words for weather and terrain while descending into places most writers describe from the car park.",
      "Underland took six years and took him into catacombs, glaciers and nuclear tombs designed to outlast every language now spoken.",
    ],
  },
  {
    name: "Emily St. John Mandel",
    born: "1979, British Columbia",
    nationality: "Canadian",
    palette: "midnight",
    quote: "Hell is the absence of the people you long for.",
    bio: [
      "Mandel writes catastrophe as chamber music: small casts, precise interiors, and a structure that folds back on itself so quietly you only notice on the last page.",
      "Her novels share a private universe — characters, hotels and a travelling symphony drift between books like recurring dreams.",
    ],
  },
  {
    name: "Ocean Vuong",
    born: "1988, Ho Chi Minh City",
    nationality: "American",
    palette: "clay",
    quote: "The most beautiful part of your body is where it's headed.",
    bio: [
      "Vuong learned to read at eleven and now writes some of the most physically precise English of his generation — a poet whose sentences behave like objects with weight.",
      "Time Is a Mother, written after his mother's death, keeps interrupting its own elegy with jokes, receipts and hunger.",
    ],
  },
  {
    name: "Susanna Clarke",
    born: "1959, Nottingham",
    nationality: "British",
    palette: "slate",
    quote: "The beauty of the house is immeasurable; its kindness infinite.",
    bio: [
      "Clarke published a nine-hundred-page debut, then illness took most of two decades. Piranesi arrived sixteen years later at a quarter of the length and twice the strangeness.",
      "She writes magic as an archive: footnotes, journals, ledgers — the paperwork of the impossible.",
    ],
  },
  {
    name: "Gabrielle Zevin",
    born: "1977, New York",
    nationality: "American",
    palette: "cobalt",
    quote: "What is a game? It's tomorrow, and tomorrow, and tomorrow.",
    bio: [
      "Zevin has written novels, screenplays and one runaway hit about video games that is really about the exhausting, irreplaceable intimacy of making something with another person.",
      "She is very good on work: the arguments, the credit, the years.",
    ],
  },
  {
    name: "Patti Smith",
    born: "1946, Chicago",
    nationality: "American",
    palette: "ivory",
    quote: "In art and dream may you proceed with abandon.",
    bio: [
      "Musician, poet, photographer and the keeper of one of the great friendships in American art. Smith writes about poverty and ambition without a shred of nostalgia's soft focus.",
      "Just Kids is the record of two people deciding to be artists before anyone agreed to it.",
    ],
  },
];

const PROFILE_MAP = new Map(PROFILES.map((p) => [slugify(p.name), p]));

const uniqueAuthorNames = [...new Set(BOOKS.map((b) => b.author))];

export const AUTHORS = uniqueAuthorNames
  .map((name) => {
    const slug = slugify(name);
    const books = BOOKS.filter((b) => b.authorSlug === slug);
    const profile = PROFILE_MAP.get(slug);
    const h = hash(slug);
    const genres = [...new Set(books.map((b) => b.genre))];
    return {
      name,
      slug,
      books,
      genres,
      featured: Boolean(profile),
      palette: profile?.palette || PALETTE_KEYS[h % PALETTE_KEYS.length],
      born: profile?.born || null,
      nationality: profile?.nationality || null,
      quote: profile?.quote || null,
      bio: profile?.bio || [
        `${name} is stocked at VERSO for ${books.length > 1 ? `${books.length} titles` : "one title"} in ${genres.join(" and ")} — chosen by our booksellers and kept on the shelf because readers keep returning to it.`,
        "Every author page in this shop is written by the person who buys for that section. If you would like a recommendation beyond this list, ask at the counter.",
      ],
      initials: name
        .split(" ")
        .filter(Boolean)
        .map((w) => w[0])
        .slice(0, 2)
        .join(""),
    };
  })
  .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.books.length - a.books.length);

AUTHORS.forEach((a, i) => {
  a.number = pad2(i + 1).padStart(3, "0");
});

export const authorBySlug = (slug) => AUTHORS.find((a) => a.slug === slug);
export const FEATURED_AUTHORS = AUTHORS.filter((a) => a.featured);

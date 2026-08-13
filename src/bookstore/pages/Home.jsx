import Hero from "../sections/Hero";
import FeaturedBook from "../sections/FeaturedBook";
import Discovery from "../sections/Discovery";
import EditorialGrid from "../sections/EditorialGrid";
import NewReleases from "../sections/NewReleases";
import Bestsellers from "../sections/Bestsellers";
import Bookshelf from "../sections/Bookshelf";
import CollectionsStrip from "../sections/CollectionsStrip";
import AuthorSpotlight from "../sections/AuthorSpotlight";
import Note from "../sections/Note";
import { Marquee } from "../components/ui/Bits";
import { TICKER } from "../data/site";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="border-y border-[var(--line)] text-[var(--ink-muted)]">
        <Marquee items={TICKER} speed={58} />
      </div>
      <FeaturedBook />
      <Discovery />
      <EditorialGrid />
      <NewReleases />
      <Bestsellers />
      <Bookshelf />
      <CollectionsStrip />
      <AuthorSpotlight />
      <Note />
    </>
  );
}

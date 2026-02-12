import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useGsapTimeline } from "../hooks/use-gsap";

export function HeroSection() {
  const contentRef = useGsapTimeline();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover object-center"
          src="/video.mp4" // ✅ replace with your video path
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 w-full py-20">
        <div className="max-w-xl">
          <p data-animate className="text-sm tracking-[0.3em] uppercase text-white/80 mb-4">
            Spring / Summer 2026
          </p>

          <h2
            data-animate
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-white text-balance">
            Redefine Your Style
          </h2>

          <p data-animate className="mt-6 text-lg text-white/80 leading-relaxed max-w-md">
            Premium essentials crafted for comfort and designed for the streets. Discover our latest
            collection.
          </p>

          <div data-animate className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/all-products"
              className="inline-flex items-center justify-center bg-white text-black hover:bg-white/90 rounded-none px-8 py-4 text-sm tracking-widest uppercase">
              Shop Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <a
              href="#featured"
              className="inline-flex items-center justify-center border border-white text-white hover:bg-white/10 rounded-none px-8 py-4 text-sm tracking-widest uppercase">
              Explore
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

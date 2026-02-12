import React from "react";

/**
 * Minimal luxury hero (React + Tailwind) — JS only
 * - No navbar
 * - English only
 * - Background video from an online CDN (Coverr)
 *
 * Drop into: Hero.jsx and render <Hero />
 */
export default function Hero() {
  const videoSrc =
    "https://cdn.coverr.co/videos/coverr-woman-browses-clothes-at-street-market/1080p.mp4";

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-neutral-950 text-white">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata">
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Luxury overlays (similar mood to the reference) */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/35 to-neutral-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_70%_28%,rgba(255,255,255,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_18%_55%,rgba(255,255,255,0.08),transparent_55%)]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col px-4">
        <div className="flex flex-1 items-center py-10">
          <div className="grid w-full items-center gap-10 lg:grid-cols-12">
            {/* Minimal copy */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                Limited drop
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
                Depth of <span className="text-white/80">Style</span>
              </h1>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/70 sm:text-base">
                Clean cuts. Quiet fabric.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90">
                  Shop now
                </button>

                <button
                  type="button"
                  className="rounded-full border border-white/18 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
                  View lookbook
                </button>
              </div>

              {/* tiny trust row */}
              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-white/55">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur">
                  Fast shipping
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur">
                  Easy returns
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur">
                  Secure checkout
                </span>
              </div>
            </div>

            {/* Product focus (center object like reference) */}
            <div className="lg:col-span-7">
              <div className="relative mx-auto max-w-xl">
                {/* back glow */}
                <div className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -right-10 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

                <div className="relative rounded-[28px] border border-white/12 bg-white/5 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold text-white/70">Featured</div>
                      <div className="mt-1 text-sm font-semibold text-white">Minimal Overcoat</div>
                      <div className="mt-1 text-xs text-white/60">Straight fit • Neutral tones</div>
                    </div>

                    <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/80">
                      New
                    </span>
                  </div>

                  {/* Center “product” mock */}
                  <div className="mt-7 grid place-items-center">
                    <div className="relative">
                      <div className="h-[300px] w-[200px] rounded-[999px] bg-gradient-to-b from-white/40 to-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.55)]" />
                      <div className="absolute left-1/2 top-[58%] w-[170px] -translate-x-1/2 rounded-2xl border border-white/12 bg-white/10 px-3 py-2 backdrop-blur">
                        <div className="text-[10px] font-semibold text-white/70">
                          Depthwear • Winter
                        </div>
                        <div className="mt-0.5 text-xs font-semibold text-white">
                          Premium outerwear
                        </div>
                      </div>
                      <div className="absolute -bottom-10 left-1/2 h-20 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-2xl" />
                    </div>
                  </div>

                  {/* Price + actions */}
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-xs text-white/60">From</div>
                      <div className="mt-1 text-lg font-semibold text-white">$129</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="rounded-full border border-white/18 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
                        Details
                      </button>
                      <button
                        type="button"
                        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-white/90">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>

                {/* Minimal footer row */}
                <div className="mt-5 flex items-center justify-between text-xs text-white/55">
                  <span>Instagram</span>
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span>Lookbook</span>
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span>Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* subtle divider */}
        <div className="pointer-events-none mb-6 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>
    </section>
  );
}

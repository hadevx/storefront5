import React, { useEffect, useMemo, useState } from "react";

/**
 * SOCO-inspired landing page (UNCHANGED design/layout)
 * - Only changes: ecommerce clothing copy + FULLSCREEN background image (q.jpg)
 * - q.jpg must exist in your public/ folder: /public/q.jpg  (so src="/q.jpg" works)
 */

export default function SocoLandingPage() {
  const nav = useMemo(
    () => [
      { label: "Home", href: "#top" },
      { label: "Shop", href: "#services" },
      { label: "Featured", href: "#work" },
      { label: "About", href: "#about" },
      { label: "Reviews", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ],
    [],
  );

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const u = (topic, w, h, sig) =>
    `https://source.unsplash.com/random/${w}x${h}/?${encodeURIComponent(topic)}&sig=${sig}`;

  const IMAGES = {
    heroPill: "/q.jpg", // keep pill using q.jpg too (safe local)
    work1: u("fashion,editorial,lookbook,studio", 1400, 900, 21),
    work2: u("streetwear,clothing,product,studio", 1400, 900, 22),
    work3: u("minimal,wardrobe,fashion,flatlay", 1400, 900, 23),
    about: u("fashion,atelier,studio,workshop", 1400, 900, 31),
    avatar1: u("portrait,person", 200, 200, 41),
    avatar2: u("portrait,person", 200, 200, 42),
    avatar3: u("portrait,person", 200, 200, 43),
  };

  return (
    <div id="top" className="relative min-h-screen  text-white">
      {/* FULLSCREEN BACKGROUND (q.jpg) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="/q.jpg"
          alt="Background"
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
        {/* subtle readability overlays (minimal, keeps design clean) */}
        <div className="absolute inset-0 bg-black/80" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(900px 520px at 55% 30%, rgba(0,0,0,0.06), transparent 60%), radial-gradient(700px 520px at 40% 55%, rgba(255,106,61,0.10), transparent 55%)",
          }}
        />
      </div>

      {/* HERO (Portfolio -> Ecommerce) */}
      <section className="px-6 pt-12 pb-10">
        <div className="mx-auto max-w-[1160px]">
          <div className="flex flex-col items-center text-center">
            {/* tiny status line */}
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black/60 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              New season drop live
              <span className="text-black/30">•</span>
              2026
            </div>

            {/* headline (same typography/layout, ecommerce copy) */}
            <h1 className="mt-6 font-black max-w-[980px] text-[clamp(2.4rem,6.2vw,6.2rem)]  leading-[1.02] tracking-[-0.035em]">
              <span className="text-black/20">Everyday essentials</span>
              <br />
              made to{" "}
              <span className="inline-flex font-bold items-center gap-3 align-baseline">
                feel
                <span className="relative inline-flex items-center rounded-[24px] border border-black/10 bg-white/10 px-2 sm:px-2.5 py-2 sm:py-2 shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
                  <img
                    src={IMAGES.heroPill}
                    alt="Lookbook preview"
                    className="h-16 w-28 sm:h-20 sm:w-36 rounded-[16px] object-cover object-[50%_20%]"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e) => (e.currentTarget.src = "https://picsum.photos/260/180")}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[24px] opacity-70"
                    style={{
                      background:
                        "radial-gradient(180px 70px at 20% 0%, rgba(255,255,255,0.75), transparent 60%)",
                    }}
                  />
                </span>
              </span>
              <br />
              premium — without the noise
            </h1>

            {/* intro (ecommerce) */}
            <p className="mt-6 max-w-[760px] text-base leading-relaxed text-white/55">
              Welcome to <span className="font-semibold text-white/75">WebSchema</span> — a clothing
              label built around clean silhouettes, soft fabrics, and timeless color palettes.
              Thoughtful fits for daily wear, designed to mix, match, and last.
            </p>

            {/* CTA row (ecommerce) */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] hover:brightness-95 transition">
                Shop new arrivals
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-white/70 hover:bg-black/5 transition">
                Explore categories ↗
              </a>
            </div>

            {/* Bento capabilities (keep design; ecommerce labels) */}
            {/*  <div className="mt-12 grid w-full max-w-[980px] gap-5 md:grid-cols-3">
              <ServiceBento index="01" title="Outerwear" meta="Jackets → Puffers → Layers" />
              <div className="md:translate-y-2">
                <ServiceBento index="02" title="Basics" meta="Tees → Hoodies → Everyday sets" />
              </div>
              <ServiceBento index="03" title="Accessories" meta="Caps → Bags → Finishing touches" />
            </div> */}

            {/* Quick stats row (ecommerce vibe) */}
            {/*     <div className="mt-8 grid w-full max-w-[980px] gap-4 sm:grid-cols-3">
              <StatCard label="Free shipping" value="Orders $75+" />
              <StatCard label="Easy returns" value="14 days" />
              <StatCard label="Drop cadence" value="Weekly" />
            </div> */}
          </div>
        </div>
      </section>

      {/* SERVICES -> Categories */}
      {/*  <section id="services" className="px-6 py-12">
        <div className="mx-auto max-w-[1160px]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-black/50">Shop</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-black/85">
                Categories you’ll actually wear
              </h2>
              <p className="mt-2 max-w-[720px] text-sm leading-relaxed text-black/55">
                Clean pieces, consistent sizing, and fabrics that feel good day one—and day one
                hundred.
              </p>
            </div>
            <a
              href="#work"
              className="hidden rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-black/70 hover:bg-black/5 transition md:inline-flex">
              View featured
            </a>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <ServiceCard
              title="New arrivals"
              desc="Fresh drops designed for easy outfits and fast repeats."
              bullets={["Seasonal colors", "Refined fits", "Limited runs", "Quick restocks"]}
            />
            <ServiceCard
              title="Best sellers"
              desc="The pieces customers come back for—simple, clean, dependable."
              bullets={["Signature tees", "Core hoodies", "Everyday pants", "Layering staples"]}
            />
            <ServiceCard
              title="Essentials"
              desc="Build a wardrobe that works—minimal silhouettes, premium hand-feel."
              bullets={["Soft cotton", "Neutral palette", "Easy pairing", "Durable construction"]}
            />
          </div>
        </div>
      </section> */}

      {/* WORK -> Featured products / lookbook (keep card style) */}
      {/*   <section id="work" className="px-6 py-12">
        <div className="mx-auto max-w-[1160px]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-black/50">Featured</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-black/85">
                Shop the highlights
              </h2>
              <p className="mt-2 text-sm text-black/55">
                A small selection of our current favorites.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <CaseCard
              className="lg:col-span-7"
              img={IMAGES.work1}
              year="2026"
              role="Outerwear"
              title="Aero Puff Jacket"
              desc="Warm, light, and clean-lined—built for daily rotation."
              tall
            />
            <div className="grid gap-6 lg:col-span-5">
              <CaseCard
                img={IMAGES.work2}
                year="2026"
                role="Basics"
                title="Core Hoodie Set"
                desc="Soft fleece, structured fit, and everyday comfort."
              />
              <CaseCard
                img={IMAGES.work3}
                year="2026"
                role="Essentials"
                title="Minimal Wardrobe Kit"
                desc="Neutral staples that pair with everything."
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* ABOUT */}
      {/*   <section id="about" className="px-6 py-12">
        <div className="mx-auto max-w-[1160px]">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="text-xs font-semibold text-black/50">About</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-black/85">
                Designed to be worn. Built to last.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-black/55">
                We focus on fit, fabric, and finish—so your wardrobe feels effortless. Clean lines,
                premium basics, and a drop schedule that keeps things fresh.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InfoTile label="Fit" value="True-to-size silhouettes" />
                <InfoTile label="Fabric" value="Soft, durable blends" />
                <InfoTile label="Quality" value="Details + stitching" />
                <InfoTile label="Support" value="Fast help + returns" />
              </div>

              <a
                href="#contact"
                className="mt-7 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] hover:brightness-95 transition">
                Get in touch
              </a>
            </div>

            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-black/[0.02] shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
                <div className="h-[320px] w-full sm:h-[420px]">
                  <img
                    src={IMAGES.about}
                    alt="Studio"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e) => (e.currentTarget.src = "https://picsum.photos/1400/900")}
                  />
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    background:
                      "radial-gradient(520px 220px at 15% 0%, rgba(255,255,255,0.7), transparent 60%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* TESTIMONIALS -> Reviews */}
      {/*    <section id="testimonials" className="px-6 py-12">
        <div className="mx-auto max-w-[1160px]">
          <div className="text-xs font-semibold text-black/50">Reviews</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-black/85">
            What customers say
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <QuoteCard
              img={IMAGES.avatar1}
              name="Cristian"
              role="Verified buyer"
              quote="“The fit is perfect and the fabric feels expensive. I’m ordering another color.”"
            />
            <QuoteCard
              img={IMAGES.avatar2}
              name="Aisha"
              role="Verified buyer"
              quote="“Clean design, fast shipping, and the hoodie is ridiculously soft.”"
            />
            <QuoteCard
              img={IMAGES.avatar3}
              name="Noah"
              role="Verified buyer"
              quote="“Minimal but premium. These are the basics I actually keep wearing.”"
            />
          </div>
        </div>
      </section> */}

      {/* CTA */}
      {/*  <section id="contact" className="px-6 py-14">
        <div className="mx-auto max-w-[1160px]">
          <div className="relative overflow-hidden rounded-[32px] bg-black p-8 text-white shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background:
                  "radial-gradient(900px 420px at 20% 10%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(900px 420px at 80% 90%, rgba(255,106,61,0.25), transparent 55%)",
              }}
            />
            <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <div className="text-xs font-semibold text-white/65">Newsletter</div>
                <div className="mt-2 text-3xl font-semibold tracking-tight">Get early access</div>
                <div className="mt-2 text-sm text-white/65">
                  Drop alerts, restocks, and exclusive colorways—sent occasionally.
                </div>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="rounded-[24px] bg-white/10 p-4 ring-1 ring-white/15">
                <div className="grid gap-3">
                  <Input placeholder="Your name" />
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="What are you shopping for?" />
                  <button className="mt-1 rounded-full bg-[#ff6a3d] px-5 py-3 text-sm font-semibold text-white hover:brightness-95 transition">
                    Join list
                  </button>
                  <div className="text-xs text-white/60">
                    Support: <span className="font-semibold">support@webschema.store</span>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 text-sm text-black/55 sm:flex-row">
            <div>© {new Date().getFullYear()} WebSchema. All rights reserved.</div>
            <div className="flex gap-6">
              <a className="hover:text-black transition" href="#">
                Instagram
              </a>
              <a className="hover:text-black transition" href="#">
                TikTok
              </a>
              <a className="hover:text-black transition" href="#">
                Pinterest
              </a>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

/* -------------------------------- UI -------------------------------- */

function ServiceBento({ index, title, meta }) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)] transition hover:-translate-y-1">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
        style={{
          background: "radial-gradient(420px 160px at 20% 0%, rgba(0,0,0,0.04), transparent 60%)",
        }}
      />
      <div className="relative">
        <div className="text-xs font-semibold tracking-wide text-black/30">{index}</div>
        <div className="mt-3 text-lg font-semibold tracking-tight text-black/85">{title}</div>
        <div className="mt-2 text-sm leading-relaxed text-black/55">{meta}</div>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-black/70">
          Explore
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-[22px] border border-black/10 bg-black/[0.02] px-5 py-4">
      <div className="text-xs font-semibold text-black/50">{label}</div>
      <div className="mt-2 text-base font-semibold tracking-tight text-black/80">{value}</div>
    </div>
  );
}

function ServiceCard({ title, desc, bullets }) {
  return (
    <div className="rounded-[28px] border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
      <div className="p-6">
        <div className="text-lg font-semibold tracking-tight text-black/85">{title}</div>
        <div className="mt-2 text-sm leading-relaxed text-black/55">{desc}</div>

        <div className="mt-5 grid gap-2">
          {bullets.map((b) => (
            <div key={b} className="flex items-center gap-2 text-sm text-black/65">
              <span className="h-1.5 w-1.5 rounded-full bg-black/25" />
              {b}
            </div>
          ))}
        </div>

        <a
          href="#contact"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-black/75 hover:text-black transition">
          Learn more <span className="translate-y-[1px]">→</span>
        </a>
      </div>
    </div>
  );
}

function CaseCard({ img, year, role, title, desc, tall, className = "" }) {
  return (
    <a
      href="#"
      className={
        "group block overflow-hidden rounded-[30px] border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 " +
        className
      }>
      <div className={(tall ? "h-[360px] sm:h-[420px]" : "h-[220px]") + " w-full overflow-hidden"}>
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          loading="lazy"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          onError={(e) => (e.currentTarget.src = "https://picsum.photos/1400/900")}
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between text-xs font-semibold text-black/45">
          <span>{role}</span>
          <span>{year}</span>
        </div>
        <div className="mt-3 text-lg font-semibold text-black/85">{title}</div>
        <div className="mt-2 text-sm leading-relaxed text-black/55">{desc}</div>
        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-black/75">
          View <span className="transition group-hover:translate-x-0.5">→</span>
        </div>
      </div>
    </a>
  );
}

function InfoTile({ label, value }) {
  return (
    <div className="rounded-[22px] border border-black/10 bg-black/[0.02] p-5">
      <div className="text-xs font-semibold text-black/50">{label}</div>
      <div className="mt-2 text-sm font-semibold text-black/80">{value}</div>
    </div>
  );
}

function QuoteCard({ img, name, role, quote }) {
  return (
    <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
      <div className="text-sm leading-relaxed text-black/60">“{quote}”</div>
      <div className="mt-6 flex items-center gap-3">
        <div className="h-11 w-11 overflow-hidden rounded-2xl border border-black/10 bg-black/[0.02]">
          <img
            src={img}
            alt={name}
            className="h-full w-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            onError={(e) => (e.currentTarget.src = "https://picsum.photos/200/200")}
          />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-black/80">{name}</div>
          <div className="text-xs text-black/50">{role}</div>
        </div>
      </div>
    </div>
  );
}

function Input({ type = "text", placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/55 outline-none transition focus:border-white/25 focus:bg-white/15"
    />
  );
}

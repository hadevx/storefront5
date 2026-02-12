import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

/**
 * Clone-style Hero (React + Tailwind + GSAP)
 *
 * Install:
 *   npm i gsap
 *
 * Usage:
 *   <JayColeCloneHero />
 *
 * Notes:
 * - Replace HERO_IMG with your own image URL if you want.
 * - This is a visual clone (layout + vibe) with GSAP entrance animations.
 */

const HERO_IMG =
  "https://images.unsplash.com/photo-1520975958225-9fbb9271d8d4?auto=format&fit=crop&w=1800&q=80"; // replace if you want

export default function JayColeCloneHero() {
  const rootRef = useRef(null);

  const refs = useMemo(
    () => ({
      imgWrap: React.createRef(),
      img: React.createRef(),
      glow: React.createRef(),
      topLeft: React.createRef(),
      topRight: React.createRef(),
      titleWrap: React.createRef(),
      titleLetters: [],
      metaRow: React.createRef(),
      cardsRow: React.createRef(),
      chips: [],
      footer: React.createRef(),
    }),
    [],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set(refs.imgWrap.current, { opacity: 0, scale: 0.95 });
      gsap.set(refs.img.current, { scale: 1.15, rotate: -2, x: 30, y: 10, opacity: 0 });
      gsap.set(refs.glow.current, { opacity: 0, scale: 0.9 });
      gsap.set([refs.topLeft.current, refs.topRight.current], { opacity: 0, y: -12 });
      gsap.set(refs.titleWrap.current, { opacity: 1 }); // keep layout
      gsap.set(refs.titleLetters, { opacity: 0, y: 28, filter: "blur(8px)" });
      gsap.set(refs.metaRow.current, { opacity: 0, y: 18 });
      gsap.set(refs.cardsRow.current, { opacity: 0, y: 18 });
      gsap.set(refs.chips, { opacity: 0, y: 14, scale: 0.98 });
      gsap.set(refs.footer.current, { opacity: 0, y: 10 });

      tl.to([refs.topLeft.current, refs.topRight.current], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
      })
        .to(
          refs.imgWrap.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
          },
          0.05,
        )
        .to(
          refs.glow.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
          },
          0.1,
        )
        .to(
          refs.img.current,
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            x: 0,
            y: 0,
            duration: 1.1,
          },
          0.15,
        )
        .to(
          refs.titleLetters,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.02,
          },
          0.35,
        )
        .to(
          refs.metaRow.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          0.7,
        )
        .to(
          refs.cardsRow.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          0.8,
        )
        .to(
          refs.chips,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.06,
          },
          0.95,
        )
        .to(
          refs.footer.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          1.05,
        );

      // Subtle floating loop on the hero image
      gsap.to(refs.img.current, {
        y: "+=8",
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Glow pulse
      gsap.to(refs.glow.current, {
        opacity: 0.75,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, [refs]);

  const Title = ({ text, className }) => {
    // Make letter spans so GSAP can stagger nicely
    const letters = Array.from(text);
    return (
      <h1 className={className} aria-label={text}>
        {letters.map((ch, i) => (
          <span
            key={`${ch}-${i}`}
            ref={(el) => {
              if (el) refs.titleLetters[i] = el;
            }}
            className="inline-block will-change-transform">
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </h1>
    );
  };

  const chips = [
    { label: "Frame Blox", icon: "◉" },
    { label: "Supa Blox", icon: "◉" },
    { label: "Hype Blox", icon: "◉" },
    { label: "Hype Blox", icon: "◉" },
    { label: "Ultra Blox", icon: "◉" },
    { label: "Ship Blox", icon: "◉" },
  ];

  return (
    <div ref={rootRef} className="min-h-screen w-full overflow-x-hidden bg-black text-white">
      {/* Background vignette */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_50%_30%,rgba(255,255,255,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(700px_500px_at_75%_40%,rgba(255,92,0,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      </div>

      <main className="relative mx-auto flex min-h-screen w-full max-w-[1100px] flex-col px-5 pb-10 pt-5 sm:px-7 sm:pt-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div
            ref={refs.topLeft}
            className="flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur">
            <span className="text-sm font-semibold tracking-tight">Jay Cole</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-white/60">Available</span>
          </div>

          <div ref={refs.topRight} className="flex items-center gap-3">
            <button className="group inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/8">
              <span className="text-xs text-white/80">Menu</span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 ring-1 ring-white/10 transition group-hover:bg-white/15">
                <span className="text-base leading-none">≡</span>
              </span>
            </button>
          </div>
        </div>

        {/* Hero */}
        <section className="relative mt-6 flex flex-1 flex-col justify-center">
          {/* Image area */}
          <div className="relative mx-auto w-full">
            <div
              ref={refs.imgWrap}
              className="relative mx-auto aspect-[16/11] w-full overflow-hidden rounded-[32px] bg-white/5 ring-1 ring-white/10">
              {/* Glow */}
              <div
                ref={refs.glow}
                className="pointer-events-none absolute -inset-20 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,92,0,0.40),transparent_60%)] blur-3xl"
              />

              {/* Image */}
              <img
                ref={refs.img}
                src={HERO_IMG}
                alt="Hero"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="eager"
              />

              {/* Dark overlay / vignette */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_40%_40%,rgba(0,0,0,0.10),rgba(0,0,0,0.75))]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
            </div>

            {/* Giant title over image */}
            <div
              ref={refs.titleWrap}
              className="pointer-events-none absolute inset-x-0 bottom-[-12px] z-20 flex items-end justify-center px-2 sm:bottom-[-18px]">
              <Title
                text={"Jay Cole®"}
                className="select-none text-center font-semibold tracking-tight text-white/95
                           text-[64px] leading-[0.92]
                           sm:text-[92px]
                           md:text-[120px]
                           lg:text-[140px]"
              />
            </div>
          </div>

          {/* Meta row (under title) */}
          <div ref={refs.metaRow} className="mt-10 grid grid-cols-1 gap-7 sm:mt-12 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="text-xs text-white/50">©2025</p>
              <p className="text-xs leading-relaxed text-white/45">
                Designing digital experiences that captivate, connect, and convert.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">Brand</p>
              <p className="text-xs leading-relaxed text-white/45">
                We craft bold, memorable brand identities that tell your story and leave a lasting
                impression.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">UI/UX</p>
              <p className="text-xs leading-relaxed text-white/45">
                Intuitive, user-focused interfaces that elevate engagement and drive seamless
                interactions.
              </p>
            </div>
          </div>

          {/* Chips row */}
          <div ref={refs.cardsRow} className="mt-8 sm:mt-10">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {chips.map((c, i) => (
                <button
                  key={c.label + i}
                  ref={(el) => {
                    if (el) refs.chips[i] = el;
                  }}
                  className="group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-white/5 px-3 py-3 text-xs text-white/80 ring-1 ring-white/10 backdrop-blur
                             transition hover:bg-white/8 hover:text-white">
                  <span className="text-white/60 transition group-hover:text-white/80">
                    {c.icon}
                  </span>
                  <span className="font-medium">{c.label}</span>

                  {/* hover sheen */}
                  <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    <span className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-white/10 opacity-0 blur-md transition duration-500 group-hover:translate-x-[220%] group-hover:opacity-100" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer micro */}
          <div
            ref={refs.footer}
            className="mt-8 flex items-center justify-between text-[11px] text-white/35">
            <span>Minimal • Dark • Editorial</span>
            <span className="hidden sm:inline">React + Tailwind + GSAP</span>
          </div>
        </section>
      </main>
    </div>
  );
}

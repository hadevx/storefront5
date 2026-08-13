import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NewHijriYearPoster({ camelSrc = "/Ramadan.jpg" }) {
  const rootRef = useRef(null);

  const yearRef = useRef(null);
  const newYearRef = useRef(null);
  const arabicTitleRef = useRef(null);
  const englishTitleRef = useRef(null);

  const archRef = useRef(null);
  const imgRef = useRef(null);

  const leftMsgRef = useRef(null);
  const rightMsgRef = useRef(null);
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // Everything is visible initially. On scroll, we fade/translate out.
      const fadeOut = (el, opts = {}) =>
        gsap.to(el, {
          autoAlpha: 0,
          y: opts.y ?? -16,
          ...(opts.scale ? { scale: opts.scale } : {}),
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: opts.start ?? "top top",
            end: opts.end ?? "+=600",
            scrub: true,
          },
        });

      // Header fades earlier
      fadeOut([yearRef.current, newYearRef.current], { y: -10, end: "+=450" });
      fadeOut(arabicTitleRef.current, { y: -18, end: "+=520" });
      fadeOut(englishTitleRef.current, { y: -22, end: "+=560" });

      // Arch + image fade a bit later, with slight zoom
      fadeOut(archRef.current, { y: 14, scale: 0.985, start: "top top+=120", end: "+=700" });
      gsap.to(imgRef.current, {
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top+=120",
          end: "+=700",
          scrub: true,
        },
      });

      // Bottom messages fade last
      fadeOut(leftMsgRef.current, { y: 18, start: "top top+=220", end: "+=800" });
      fadeOut(rightMsgRef.current, { y: 18, start: "top top+=240", end: "+=820" });
      fadeOut(footerRef.current, { y: 22, start: "top top+=280", end: "+=900" });

      // cleanup for hot reloads
      ScrollTrigger.refresh();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#1a0d08] flex items-center justify-center">
      {/* Poster */}
      <div
        ref={rootRef}
        className="relative w-full sm:w-[860px] sm:max-w-[95vw] min-h-screen aspect-[3/4] overflow-hidden rounded-2xl bg-[#1a0d08] shadow-2xl">
        {/* Warm textured glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,190,120,0.18)_0%,_rgba(140,70,30,0.12)_32%,_rgba(10,5,3,0.92)_75%,_rgba(0,0,0,1)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,205,140,0.10)_0%,_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,_rgba(255,170,90,0.08)_0%,_transparent_55%)]" />

        {/* Subtle grain overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay bg-[linear-gradient(0deg,transparent,rgba(255,255,255,0.35),transparent)]" />

        {/* Content */}
        <div className="relative h-full w-full px-14 pt-14 pb-10 text-[#f2d7b8]">
          {/* Top header */}
          <div className="relative">
            {/* Left small year */}
            <div
              ref={yearRef}
              className="absolute left-0 top-3 text-sm tracking-[0.25em] opacity-80">
              1447
            </div>

            {/* Right small label */}
            <div
              ref={newYearRef}
              className="absolute right-0 top-3 text-sm tracking-[0.18em] opacity-80">
              new <br />
              year
            </div>

            {/* Arabic title */}
            <div className="text-center">
              <div
                ref={arabicTitleRef}
                className="text-4xl font-makeen md:text-5xl font-semibold tracking-wide text-[#f2c28a] drop-shadow"
                dir="rtl">
                عامٌ هجريٌّ جديد
              </div>

              {/* English title */}
              <div
                ref={englishTitleRef}
                className="mt-3 text-4xl md:text-5xl font-bold tracking-[0.22em] text-[#f2c28a]">
                NEW HIJRI YEAR
              </div>
            </div>
          </div>

          {/* Arch window with image */}
          <div className="relative mt-12 flex items-center justify-center">
            <div
              ref={archRef}
              className="relative w-[56%] min-w-[280px] max-w-[520px] aspect-[3/4]">
              <div className="absolute inset-0 rounded-t-full rounded-b-2xl bg-[#2a130c] shadow-[0_40px_90px_rgba(0,0,0,0.55)]" />

              <div className="absolute inset-[18px] rounded-t-full rounded-b-2xl overflow-hidden bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_35%,_rgba(255,190,120,0.18)_0%,_rgba(0,0,0,0.92)_65%,_rgba(0,0,0,1)_100%)]" />

                <img
                  ref={imgRef}
                  src={camelSrc}
                  alt="ramadan"
                  className="relative z-10 h-full w-full object-cover object-[55%_55%] brightness-[0.95] contrast-[1.05] will-change-transform"
                />

                <div className="absolute inset-0 z-20 shadow-[inset_0_0_70px_rgba(0,0,0,0.85)]" />
              </div>

              <div className="absolute inset-0 rounded-t-full rounded-b-2xl shadow-[inset_0_0_0_1px_rgba(255,210,160,0.12)]" />
              <div className="absolute inset-0 rounded-t-full rounded-b-2xl shadow-[inset_0_0_30px_rgba(255,180,110,0.08)]" />
            </div>
          </div>

          {/* Bottom messages */}
          <div className="absolute left-14 right-14 bottom-0">
            <div className="flex items-end justify-between gap-10">
              <div ref={leftMsgRef} className="max-w-[42%]">
                <div className="flex items-center gap-3 text-[#f2c28a] opacity-80">
                  <span className="h-[10px] w-[2px] bg-[#f2c28a] rounded" />
                  <span className="text-xs tracking-[0.25em] uppercase"> </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-[#f0d2b1] opacity-90">
                  I wish you a new Hijri year <br />
                  filled with goodness <br />
                  and blessings
                </p>
              </div>

              <div ref={rightMsgRef} className="max-w-[46%] text-right" dir="rtl">
                <div className="flex items-center justify-end gap-3 text-[#f2c28a] opacity-80">
                  <span className="text-xs tracking-[0.25em] uppercase"> </span>
                  <span className="h-[10px] w-[2px] bg-[#f2c28a] rounded" />
                </div>

                <p className="mt-3 text-sm leading-7 text-[#f0d2b1] opacity-90">
                  أتمنى لكم عامًا هجريًا <br />
                  جديدًا مملوءًا بالخير <br />
                  والبركات
                </p>
              </div>
            </div>

            <div
              ref={footerRef}
              className="mt-8 flex flex-col items-center justify-center gap-3 text-[#f0d2b1] opacity-80">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f2c28a]/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#f2c28a]/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#f2c28a]/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#f2c28a]/70" />
              </div>

              <div className="text-xs tracking-[0.2em]">INSTA&nbsp;&nbsp;@WEBSCHEMA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// src/StoreInfoParallax.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  Globe,
  Clock,
  BadgeCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Store Info (minimal, no products, no cart)
 * - Parallax background + floating info chips
 * - GSAP intro + scroll-triggered animations
 * - Mouse parallax (subtle) for desktop
 * - Tailwind only
 */

export default function StoreInfoParallax() {
  const rootRef = useRef(null);
  const bgRef = useRef(null);
  const glowRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const chipsRef = useRef(null);
  const cardsRef = useRef(null);

  const [country, setCountry] = useState("Kuwait");
  const [lang, setLang] = useState("English");

  const chips = useMemo(
    () => [
      { icon: Truck, text: "24–48h delivery", pos: "left-[6%] top-[22%]" },
      { icon: ShieldCheck, text: "Secure payments", pos: "right-[9%] top-[18%]" },
      { icon: RotateCcw, text: "Easy returns", pos: "left-[10%] top-[72%]" },
      { icon: Ruler, text: "Size help", pos: "right-[12%] top-[70%]" },
      { icon: Clock, text: "Support 10am–10pm", pos: "left-[44%] top-[12%]" },
    ],
    [],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([bgRef.current, glowRef.current], { autoAlpha: 0, scale: 1.02 });
      gsap.set([titleRef.current, subRef.current], {
        autoAlpha: 0,
        y: 18,
        filter: "blur(10px)",
      });
      gsap.set(".si-chip", { autoAlpha: 0, y: 14, scale: 0.98, filter: "blur(10px)" });
      gsap.set(".si-card", { autoAlpha: 0, y: 16, filter: "blur(10px)" });

      // Intro timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to([bgRef.current, glowRef.current], { autoAlpha: 1, scale: 1, duration: 0.9 }, 0)
        .to(titleRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, 0.15)
        .to(subRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.7 }, 0.3)
        .to(
          ".si-chip",
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.08,
            duration: 0.65,
          },
          0.35,
        )
        .to(
          ".si-card",
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.08,
            duration: 0.7,
          },
          0.45,
        );

      // Floating chips
      gsap.utils.toArray(".si-chip").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 ? -10 : -14,
          duration: 3.2 + i * 0.25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Scroll parallax (depth)
      gsap.to(bgRef.current, {
        y: 55,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(chipsRef.current, {
        y: -22,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(cardsRef.current, {
        y: -16,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    // Mouse parallax (subtle)
    let raf = 0;
    const onMove = (e) => {
      const r = root.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;

      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          gsap.to(glowRef.current, { x: x * 18, y: y * 14, duration: 0.6, ease: "power3.out" });
          gsap.to(chipsRef.current, { x: x * 22, y: y * 16, duration: 0.6, ease: "power3.out" });
        });
      }
    };

    root.addEventListener("mousemove", onMove);

    return () => {
      root.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="relative overflow-hidden rounded-[32px] bg-white/[0.03] ring-1 ring-white/10 shadow-[0_30px_110px_-80px_rgba(0,0,0,0.95)]">
          {/* Backdrop */}
          <div ref={bgRef} className="absolute inset-0">
            {/* soft grid */}
            <div className="absolute inset-0 opacity-[0.22]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(190,255,120,0.12),transparent_45%),radial-gradient(circle_at_60%_85%,rgba(255,90,70,0.10),transparent_50%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:72px_72px]" />
            </div>
            {/* vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent_0%,rgba(0,0,0,0.72)_62%,rgba(0,0,0,0.9)_100%)]" />
          </div>

          {/* Glow blobs */}
          <div ref={glowRef} className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-[340px] w-[340px] rounded-full bg-lime-300/15 blur-3xl" />
            <div className="absolute -right-28 top-[22%] h-[320px] w-[320px] rounded-full bg-white/10 blur-3xl" />
            <div className="absolute left-[35%] -bottom-28 h-[360px] w-[360px] rounded-full bg-[#ff4b3a]/15 blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative px-6 py-12 sm:px-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              {/* Left copy */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/10">
                  <BadgeCheck size={14} className="text-lime-300" />
                  Store information
                </div>

                <h2
                  ref={titleRef}
                  className="mt-5 text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl">
                  Minimal. Modern.
                  <br />
                  Built for <span className="text-lime-300">everyday wear</span>.
                </h2>

                <p ref={subRef} className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
                  We focus on clean silhouettes, premium fabrics, and consistent sizing. Shipping is
                  fast, returns are simple, and your checkout is always protected.
                </p>

                {/* Quick selectors (still “store info”, not products) */}
                <div className="mt-7 flex flex-wrap gap-3">
                  <MiniSelect
                    label="Country"
                    value={country}
                    options={["Kuwait", "UAE", "Saudi Arabia", "Qatar"]}
                    onChange={setCountry}
                  />
                  <MiniSelect
                    label="Language"
                    value={lang}
                    options={["English", "Arabic"]}
                    onChange={setLang}
                  />
                  <div className="inline-flex h-11 items-center gap-2 rounded-2xl bg-white/10 px-4 text-sm font-semibold text-white ring-1 ring-white/10">
                    <Globe size={16} className="text-white/80" />
                    {country} • {lang}
                  </div>
                </div>
              </div>

              {/* Right cards */}
              <div ref={cardsRef} className="grid gap-3 lg:col-span-5">
                <InfoCard
                  icon={Truck}
                  title="Delivery"
                  lines={["24–48 hours in main areas", "Tracked & insured shipping"]}
                />
                <InfoCard
                  icon={RotateCcw}
                  title="Returns"
                  lines={["14-day easy returns", "Instant store credit option"]}
                />
                <InfoCard
                  icon={ShieldCheck}
                  title="Payments"
                  lines={["Encrypted checkout", "Apple Pay / Cards supported"]}
                />
                <InfoCard
                  icon={Ruler}
                  title="Sizing"
                  lines={["Consistent fit across collections", "Need help? We guide sizing fast"]}
                  accent
                />
              </div>
            </div>

            {/* Floating chips overlay */}
            <div ref={chipsRef} className="pointer-events-none absolute inset-0">
              {chips.map((c, i) => (
                <div
                  key={i}
                  className={[
                    "si-chip absolute hidden md:block",
                    c.pos,
                    "rounded-full bg-black/55 px-4 py-2",
                    "ring-1 ring-white/10 backdrop-blur-md",
                    "shadow-[0_22px_70px_-55px_rgba(0,0,0,0.85)]",
                  ].join(" ")}>
                  <div className="flex items-center gap-2 text-xs font-semibold text-white/85">
                    <c.icon size={14} className="text-lime-300" />
                    {c.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Minimal footer line */}
            <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex items-center gap-2 text-xs text-white/55">
                <Sparkles size={14} className="text-white/45" />
                Updated policies for faster support — 2026
              </div>

              <div className="text-xs text-white/45">
                Support: <span className="font-semibold text-white/70">10:00 – 22:00</span> • Email
                replies under <span className="font-semibold text-white/70">2 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- UI bits ----------------- */

function MiniSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="inline-flex h-11 items-center gap-2 rounded-2xl bg-white/10 px-4 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/15">
        <span className="text-white/55">{label}:</span>
        <span className="text-white">{value}</span>
        <Chevron size={14} open={open} />
      </button>

      {open && (
        <>
          <button
            aria-label="close"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-12 z-50 w-[220px] overflow-hidden rounded-2xl bg-[#0f0f0f] ring-1 ring-white/10 shadow-[0_30px_90px_-70px_rgba(0,0,0,0.95)]">
            {options.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-white/85 hover:bg-white/5">
                {o}
                {o === value ? <Check size={16} className="text-lime-300" /> : null}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Chevron({ open }) {
  return (
    <span
      className={["inline-block transition-transform", open ? "rotate-180" : "rotate-0"].join(" ")}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/70"
        />
      </svg>
    </span>
  );
}

function InfoCard({ icon: Icon, title, lines, accent = false }) {
  return (
    <div
      className={[
        "si-card rounded-[22px] p-5 ring-1 backdrop-blur-md",
        accent ? "bg-lime-300/10 ring-lime-300/25" : "bg-white/[0.04] ring-white/10",
        "shadow-[0_24px_80px_-65px_rgba(0,0,0,0.9)]",
      ].join(" ")}>
      <div className="flex items-start gap-3">
        <div
          className={[
            "grid h-11 w-11 place-items-center rounded-2xl",
            accent ? "bg-lime-300/20" : "bg-white/10",
          ].join(" ")}>
          <Icon size={18} className={accent ? "text-lime-300" : "text-white/80"} />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-extrabold text-white">{title}</div>
          <div className="mt-2 space-y-1">
            {lines.map((t) => (
              <div key={t} className="text-sm text-white/60">
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

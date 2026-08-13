import React from "react";

export default function CaaSCafePoster({ bgSrc = "/r.jpg" }) {
  return (
    <div className="relative h-screen w-full overflow-hidden overflow-x-hidden bg-black">
      {/* Background Image FULLSCREEN */}
      <img
        src={bgSrc}
        alt="CAAS cafe background"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Cinematic Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Warm color grade */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,18,12,0.35)_0%,rgba(20,10,8,0.55)_100%)]" />

      {/* Strong Vignette Shadow */}
      <div className="absolute inset-0 shadow-[inset_0_0_300px_rgba(0,0,0,0.9)]" />

      {/* Diagonal soft shadow */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.55)_0%,transparent_45%)]" />

      {/* Subtle Grain Texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay bg-[linear-gradient(0deg,transparent,rgba(255,255,255,0.4),transparent)]" />

      {/* Content */}
      <div className="relative h-full w-full text-[#f7f2ea] flex items-center justify-center px-6">
        {/* Center Lockup */}
        <div className="relative text-center max-w-[92vw]">
          {/* Side Mini Labels (NO negative positioning) */}
          <div className="absolute left-0 top-[40px] -translate-x-[120%] text-[11px] tracking-[0.35em] opacity-80 hidden sm:block">
            ES <br /> TD
          </div>

          <div className="absolute right-0 top-[40px] translate-x-[120%] text-[11px] tracking-[0.35em] opacity-80 hidden sm:block">
            20 <br /> 25
          </div>

          {/* On mobile: put mini labels above (safe) */}
          <div className="sm:hidden flex justify-between text-[11px] tracking-[0.35em] opacity-80 mb-6 px-2">
            <div>
              ES <br /> TD
            </div>
            <div>
              20 <br /> 25
            </div>
          </div>

          {/* Arabic Title */}
          <div
            dir="rtl"
            className="text-[84px] test sm:text-[110px] leading-[1.5] font-semibold tracking-wide"
            style={{ textShadow: "0 20px 60px rgba(0,0,0,0.7)" }}>
            هــيّام
          </div>

          {/* English Title */}
          <div
            className="mt-10 text-[44px] sm:text-[60px] font-serif tracking-[0.25em]"
            style={{ textShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
            HAYAM
          </div>

          {/* cafe */}

          {/* Decorative Line */}
          <div className="mt-6 flex items-center justify-center max-w-[92vw]">
            <div className="h-px w-36 sm:w-48 bg-[#f7f2ea]/60" />
            <div className="mx-4 text-[12px] opacity-70" dir="rtl">
              ــ
            </div>
            <div className="h-px w-36 sm:w-48 bg-[#f7f2ea]/60" />
          </div>

          {/* Small Arabic */}
        </div>

        {/* Bottom Credits */}
        <div className="absolute bottom-6 left-0 right-0 px-6 sm:px-10 flex justify-between text-[12px] opacity-80">
          <div>© WebSchema</div>
          <div>©2025</div>
        </div>
      </div>
    </div>
  );
}

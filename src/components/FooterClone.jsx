// src/FooterClone.jsx
import { Twitter, Linkedin, Instagram } from "lucide-react";

export default function FooterClone() {
  return (
    <footer className="bg-black px-4  py-10">
      <div className="mx-auto max-w-6xl">
        {/* ✅ Use md:grid-cols-2 so both sides are equal height, then make the right side a 2-row grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* LEFT */}
          <div className="grid gap-4">
            {/* Newsletter */}
            <Card className="p-7">
              <h3 className="text-lg font-semibold tracking-tight text-white">
                Join our newsletter
              </h3>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex h-11 w-full items-center rounded-xl bg-white/5 px-4 ring-1 ring-white/10 focus-within:ring-white/20">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
                  />
                </div>

                <button className="h-11 shrink-0 rounded-xl bg-white px-5 text-sm font-semibold text-black hover:bg-zinc-100">
                  Subscribe
                </button>
              </div>
            </Card>

            {/* Links */}
            <Card className="p-7">
              <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white">
                Check out these links
                <br />
                before you go
              </h3>

              <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-3">
                <FooterCol title="Company">
                  <FooterLink>Our story</FooterLink>
                  <FooterLink>Support</FooterLink>
                  <FooterLink>Press</FooterLink>
                </FooterCol>

                <FooterCol title="Legal">
                  <FooterLink>Privacy policy</FooterLink>
                  <FooterLink>Refund policy</FooterLink>
                  <FooterLink>Community rules</FooterLink>
                </FooterCol>

                <FooterCol title="Job board">
                  <FooterLink>Join the collective</FooterLink>
                  <FooterLink>Hire a 10x Designer</FooterLink>
                </FooterCol>
              </div>
            </Card>
          </div>

          {/* RIGHT */}
          {/* ✅ Make right side a grid with 2 rows: creators card + social row */}
          {/* ✅ items-stretch ensures equal widths/heights, h-full avoids awkward gaps */}
          <div className="grid gap-4 md:grid-rows-[1fr_auto]">
            {/* For creators */}
            <Card className="p-7 h-full">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold tracking-tight text-white">For creators</h3>
                <span className="rounded-md bg-rose-500 px-2.5 py-1 text-[10px] font-semibold text-white ring-1 ring-white/15">
                  NEW
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Do you have a big social media presence, popular newsletter or podcast? Becoming a
                10x Affiliate can be a great way to earn passive income!
              </p>

              <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white">
                Become an affiliate
                <span className="text-white/40">→</span>
              </button>
            </Card>

            {/* Social buttons row */}
            {/* ✅ Match height visually, remove extra space, align baseline with left */}
            <div className="grid grid-cols-3 gap-4">
              <SocialButton ariaLabel="Twitter">
                <Twitter size={18} />
              </SocialButton>
              <SocialButton ariaLabel="LinkedIn">
                <Linkedin size={18} />
              </SocialButton>
              <SocialButton ariaLabel="Instagram">
                <Instagram size={18} />
              </SocialButton>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-10 text-center text-xs text-white/35">WEBSCHEMA * 2026</div>
      </div>
    </footer>
  );
}

function Card({ className = "", children }) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/[0.04]",
        "shadow-[0_18px_55px_-35px_rgba(0,0,0,0.8)] backdrop-blur-md",
        className,
      ].join(" ")}>
      {children}
    </div>
  );
}

function FooterCol({ title, children }) {
  return (
    <div>
      <div className="text-sm font-semibold text-white/75">{title}</div>
      <div className="mt-4 space-y-2">{children}</div>
    </div>
  );
}

function FooterLink({ children }) {
  return (
    <a href="#" className="block text-sm text-white/45 transition hover:text-white/80">
      {children}
    </a>
  );
}

function SocialButton({ children, ariaLabel }) {
  return (
    <button
      aria-label={ariaLabel}
      className={[
        "flex h-[82px] items-center justify-center rounded-2xl",
        "border border-white/10 bg-white/[0.04] backdrop-blur-md",
        "shadow-[0_18px_55px_-35px_rgba(0,0,0,0.8)]",
        "transition hover:bg-white/[0.07] hover:border-white/15",
      ].join(" ")}>
      <span className="text-white/75">{children}</span>
    </button>
  );
}

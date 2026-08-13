import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { BookCover } from "../components/BookCover";
import Button from "../components/ui/Button";
import { Field } from "../components/ui/Bits";
import { useShop } from "../context/ShopProvider";
import { STORE } from "../data/site";
import { formatPrice, hash } from "../lib/utils";
import { EASE } from "../lib/motion";
import { cn } from "../lib/utils";

const STEPS = [
  { id: 1, label: "Details" },
  { id: 2, label: "Delivery" },
  { id: 3, label: "Payment" },
];

const DELIVERY = [
  { id: "standard", label: "Standard", note: "3–5 working days", price: 4.5 },
  { id: "express", label: "Express", note: "Next working day", price: 9.0 },
  { id: "collect", label: "Collect in store", note: `Ready in two hours at ${STORE.address[0]}`, price: 0 },
];

export default function Checkout() {
  const { bag, subtotal, clearBag } = useShop();
  const [step, setStep] = useState(1);
  const [delivery, setDelivery] = useState("standard");
  const [gift, setGift] = useState(false);
  const [placed, setPlaced] = useState(null);
  const [form, setForm] = useState({ email: "", first: "", last: "", address: "", city: "", postcode: "" });

  const chosen = DELIVERY.find((d) => d.id === delivery);
  const shipping = subtotal >= STORE.freeShippingThreshold ? 0 : chosen.price;
  const total = subtotal + shipping;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const placeOrder = (e) => {
    e.preventDefault();
    const ref = `VRS-${String(hash(form.email + Date.now())).slice(0, 6)}`;
    setPlaced({ ref, items: bag, total });
    clearBag();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ----------------------------- confirmation ---------------------------- */
  if (placed) {
    return (
      <section className="u-gutter pb-32 pt-[calc(var(--nav-h)+4rem)]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE.editorial }}>
          <span className="u-label flex items-center gap-2 text-[var(--accent)]">
            <Check size={13} /> Order placed
          </span>
          <h1 className="t-h1 mt-6 max-w-[16ch] text-balance">Your books are being wrapped.</h1>
          <p className="mt-6 max-w-[48ch] text-[15px] leading-relaxed text-[var(--ink-muted)]">
            Order <span className="text-[var(--ink)]">{placed.ref}</span> — a confirmation is on its way. If you asked
            for marbled paper, it will be the green and rust one this month.
          </p>

          <div className="mt-14 grid gap-10 border-t border-[var(--line)] pt-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="u-label mb-6 text-[var(--ink-muted)]">In the parcel</p>
              <ul className="space-y-6">
                {placed.items.map((l) => (
                  <li key={`${l.slug}-${l.format}`} className="flex items-center gap-5">
                    <span className="w-14 shrink-0">
                      <BookCover book={l.book} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="u-serif block text-lg leading-tight">{l.book.title}</span>
                      <span className="u-meta">
                        {l.format} × {l.qty}
                      </span>
                    </span>
                    <span className="text-[14px] tabular-nums">{formatPrice(l.total)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="border border-[var(--line)] p-6">
                <p className="u-label text-[var(--ink-muted)]">Total paid</p>
                <p className="u-serif mt-2 text-4xl tabular-nums">{formatPrice(placed.total)}</p>
                <p className="u-meta mt-6 leading-relaxed">
                  Questions about an order go to{" "}
                  <a href={`mailto:${STORE.email}`} className="link-draw text-[var(--ink)]">
                    {STORE.email}
                  </a>
                  , answered by a person.
                </p>
              </div>
              <Button to="/books" variant="outline" className="mt-6 w-full">
                Keep browsing
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  /* ------------------------------ empty bag ------------------------------ */
  if (bag.length === 0) {
    return (
      <section className="u-gutter flex min-h-[70vh] flex-col justify-center pb-24 pt-[calc(var(--nav-h)+3rem)]">
        <h1 className="t-h2 max-w-[18ch]">There is nothing to check out.</h1>
        <Button to="/books" className="mt-8 self-start">
          Explore books
        </Button>
      </section>
    );
  }

  /* ------------------------------- checkout ------------------------------ */
  return (
    <>
      <PageHeader
        kicker="Checkout"
        index={`Step ${step} of 3`}
        lines={["Almost", "yours."]}
        breadcrumb={[{ label: "Bag", to: "/cart" }, { label: "Checkout" }]}
      />

      <div className="u-gutter mt-12 grid grid-cols-1 gap-14 pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {/* step rail */}
          <ol className="mb-12 flex items-center gap-6 border-y border-[var(--line)] py-4">
            {STEPS.map((s) => (
              <li key={s.id} className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => s.id < step && setStep(s.id)}
                  className={cn(
                    "u-label flex items-center gap-2 transition-colors",
                    s.id === step ? "text-[var(--ink)]" : "text-[var(--ink-muted)]",
                    s.id < step && "hover:text-[var(--accent)]",
                  )}>
                  <span className={cn("tabular-nums", s.id < step && "text-[var(--accent)]")}>
                    {s.id < step ? "✓" : `0${s.id}`}
                  </span>
                  {s.label}
                </button>
                {s.id !== 3 && <span className="h-px w-8 bg-[var(--line-strong)]" />}
              </li>
            ))}
          </ol>

          <form onSubmit={placeOrder}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.fieldset
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: EASE.editorial }}>
                  <legend className="t-h3 mb-8">Your details</legend>
                  <div className="grid gap-8 sm:grid-cols-2">
                    <Field
                      label="Email"
                      id="co-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@email.com"
                      className="sm:col-span-2"
                    />
                    <Field label="First name" id="co-first" required value={form.first} onChange={set("first")} />
                    <Field label="Last name" id="co-last" required value={form.last} onChange={set("last")} />
                  </div>
                  <Button as="button" type="button" onClick={() => setStep(2)} size="lg" className="mt-10">
                    Continue to delivery
                  </Button>
                </motion.fieldset>
              )}

              {step === 2 && (
                <motion.fieldset
                  key="delivery"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: EASE.editorial }}>
                  <legend className="t-h3 mb-8">Delivery</legend>
                  <div className="grid gap-8 sm:grid-cols-2">
                    <Field label="Address" id="co-address" required value={form.address} onChange={set("address")} className="sm:col-span-2" />
                    <Field label="City" id="co-city" required value={form.city} onChange={set("city")} />
                    <Field label="Postcode" id="co-postcode" required value={form.postcode} onChange={set("postcode")} />
                  </div>

                  <div className="mt-10 space-y-3">
                    {DELIVERY.map((d) => (
                      <label
                        key={d.id}
                        className={cn(
                          "flex cursor-pointer items-center justify-between border p-5 transition-colors",
                          delivery === d.id ? "border-[var(--ink)]" : "border-[var(--line)] hover:border-[var(--line-strong)]",
                        )}>
                        <span className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="delivery"
                            value={d.id}
                            checked={delivery === d.id}
                            onChange={() => setDelivery(d.id)}
                            className="h-3.5 w-3.5 accent-[var(--accent)]"
                          />
                          <span>
                            <span className="u-label block">{d.label}</span>
                            <span className="u-meta mt-1 block normal-case tracking-normal">{d.note}</span>
                          </span>
                        </span>
                        <span className="text-[14px] tabular-nums">{d.price ? formatPrice(d.price) : "Free"}</span>
                      </label>
                    ))}
                  </div>

                  <label className="mt-8 flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={gift}
                      onChange={(e) => setGift(e.target.checked)}
                      className="h-3.5 w-3.5 accent-[var(--accent)]"
                    />
                    <span className="text-[14px] text-[var(--ink-soft)]">Wrap in marbled paper — no charge</span>
                  </label>

                  <div className="mt-10 flex gap-3">
                    <Button as="button" type="button" onClick={() => setStep(3)} size="lg">
                      Continue to payment
                    </Button>
                    <Button as="button" type="button" variant="ghost" onClick={() => setStep(1)} size="lg">
                      Back
                    </Button>
                  </div>
                </motion.fieldset>
              )}

              {step === 3 && (
                <motion.fieldset
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: EASE.editorial }}>
                  <legend className="t-h3 mb-8">Payment</legend>
                  <div className="grid gap-8 sm:grid-cols-2">
                    <Field label="Card number" id="co-card" required placeholder="4242 4242 4242 4242" className="sm:col-span-2" />
                    <Field label="Expiry" id="co-exp" required placeholder="04 / 29" />
                    <Field label="Security code" id="co-cvc" required placeholder="123" />
                    <Field label="Name on card" id="co-name" required className="sm:col-span-2" />
                  </div>

                  <p className="u-meta mt-8 leading-relaxed">
                    This is a demonstration storefront — no card is charged and nothing is stored.
                  </p>

                  <div className="mt-10 flex gap-3">
                    <Button type="submit" size="lg" variant="accent">
                      Place order — {formatPrice(total)}
                    </Button>
                    <Button as="button" type="button" variant="ghost" onClick={() => setStep(2)} size="lg">
                      Back
                    </Button>
                  </div>
                </motion.fieldset>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* order summary */}
        <aside className="lg:col-span-4 lg:col-start-9" aria-label="Order summary">
          <div className="sticky top-28 border border-[var(--line)] p-6">
            <p className="u-label text-[var(--ink-muted)]">Your bag</p>
            <ul className="mt-6 space-y-5">
              {bag.map((l) => (
                <li key={`${l.slug}-${l.format}`} className="flex items-start gap-4">
                  <span className="w-11 shrink-0">
                    <BookCover book={l.book} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="u-serif block truncate text-[15px] leading-tight">{l.book.title}</span>
                    <span className="u-meta">
                      {l.format} × {l.qty}
                    </span>
                  </span>
                  <span className="text-[13px] tabular-nums">{formatPrice(l.total)}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-7 space-y-2 border-t border-[var(--line)] pt-5">
              <div className="flex justify-between">
                <dt className="u-meta">Subtotal</dt>
                <dd className="text-[14px] tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="u-meta">{chosen.label}</dt>
                <dd className="text-[14px] tabular-nums">{shipping ? formatPrice(shipping) : "Free"}</dd>
              </div>
              {gift && (
                <div className="flex justify-between">
                  <dt className="u-meta">Gift wrap</dt>
                  <dd className="text-[14px]">Free</dd>
                </div>
              )}
              <div className="flex items-baseline justify-between border-t border-[var(--line)] pt-4">
                <dt className="u-label">Total</dt>
                <dd className="u-serif text-2xl tabular-nums">{formatPrice(total)}</dd>
              </div>
            </dl>

            <Link to="/cart" className="link-draw u-label mt-6 inline-block text-[var(--ink-muted)]">
              Edit bag
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

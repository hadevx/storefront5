import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapFadeIn(options) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, {
      opacity: 0,
      y: options?.y ?? 60,
      x: options?.x ?? 0,
    });

    const anim = gsap.to(el, {
      opacity: 1,
      y: 0,
      x: 0,
      duration: options?.duration ?? 1,
      delay: options?.delay ?? 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: options?.start ?? "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [options?.y, options?.x, options?.duration, options?.delay, options?.start]);

  return ref;
}

export function useGsapStagger(childSelector, options) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll(childSelector);
    if (!children.length) return;

    gsap.set(children, {
      opacity: 0,
      y: options?.y ?? 50,
    });

    const anim = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.8,
      stagger: options?.stagger ?? 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: options?.start ?? "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [childSelector, options?.y, options?.duration, options?.stagger, options?.start]);

  return ref;
}

export function useGsapParallax(speed = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const anim = gsap.to(el, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [speed]);

  return ref;
}

export function useGsapReveal(options) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });

    const anim = gsap.to(el, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: options?.duration ?? 1.2,
      delay: options?.delay ?? 0,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: el,
        start: options?.start ?? "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [options?.duration, options?.delay, options?.start]);

  return ref;
}

export function useGsapScaleIn(options) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, {
      opacity: 0,
      scale: options?.scale ?? 0.9,
    });

    const anim = gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration: options?.duration ?? 1,
      delay: options?.delay ?? 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: options?.start ?? "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [options?.scale, options?.duration, options?.delay, options?.start]);

  return ref;
}

// Hero-specific timeline animation (no scroll trigger, plays on mount)
export function useGsapTimeline() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll("[data-animate]");
    if (!children.length) return;

    gsap.set(children, { opacity: 0, y: 40 });

    const tl = gsap.timeline({ delay: 0.3 });

    children.forEach((child, i) => {
      tl.to(
        child,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        i * 0.18,
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  return ref;
}

// Image zoom on scroll
export function useGsapImageZoom(scale = 1.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const anim = gsap.fromTo(
      el,
      { scale: scale },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [scale]);

  return ref;
}

export { gsap, ScrollTrigger };

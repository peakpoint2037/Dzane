"use client";

import { useLayoutEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDownIcon } from "./icons";
import WaveField from "./WaveField";
import heroShopPhoto from "../../public/images/hero-shop.webp";
import heroShopMobilePhoto from "../../public/images/hero-shop-mobile.webp";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Mobile browsers fire `resize` mid-swipe as the URL bar collapses. Left
  // alone, ScrollTrigger re-measures the pin right under the visitor's
  // finger, which snaps the zoom backwards and shifts the page height.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

// ---------------------------------------------------------------------------
// Tunable hero configuration
// ---------------------------------------------------------------------------

type HeroImageConfig = {
  src: typeof heroShopPhoto;
  width: number;
  height: number;
  alt: string;
  // Normalized (0-1) position of the logo lockup's center within the photo.
  focal: { x: number; y: number };
  // Normalized (0-1) size of the logo lockup within the photo, used to size
  // the opening close-up so it fills a sensible portion of the screen.
  logoSize: { width: number; height: number };
};

// The photos. Imported (rather than referenced by URL string) so Next knows
// their exact native pixel dimensions and never upscales past them. A
// dedicated portrait crop is used below MOBILE_BREAKPOINT_PX so phones get a
// top-to-bottom view of the room instead of a heavily letterboxed landscape.
const HERO_IMAGES: { desktop: HeroImageConfig; mobile: HeroImageConfig } = {
  desktop: {
    src: heroShopPhoto,
    width: heroShopPhoto.width,
    height: heroShopPhoto.height,
    alt: "The DZANE tailoring studio: a blush-pink fitting room with the DZANE logo lit up on the feature wall, two sewing stations, a curtained fitting mirror, and shelves of folded fabrics.",
    focal: { x: 0.475, y: 0.42 },
    logoSize: { width: 0.19, height: 0.22 },
  },
  mobile: {
    src: heroShopMobilePhoto,
    width: heroShopMobilePhoto.width,
    height: heroShopMobilePhoto.height,
    alt: "The DZANE tailoring studio, shown top to bottom: a ceiling fan and track lighting, the DZANE logo on the feature wall, a sewing station, and shelves of folded fabrics along a marble-floored aisle.",
    focal: { x: 0.499, y: 0.457 },
    logoSize: { width: 0.372, height: 0.13 },
  },
};

// Below this viewport width, the portrait mobile photo is used instead of
// the landscape one. Matches Tailwind's `md` breakpoint used elsewhere.
const MOBILE_BREAKPOINT_PX = 768;

// Fraction of the viewport the logo lockup should fill once fully zoomed in
// on load. Whichever axis (width or height) needs more zoom to hit its
// target wins, so the crop stays tight on both landscape and portrait screens.
const OPEN_TARGET_VIEWPORT_FRACTION = { width: 0.6, height: 0.5 };

// Hard ceiling on how much of the viewport the logo lockup may occupy on
// either axis. Caps the zoom so that when the lockup's own aspect ratio
// doesn't match OPEN_TARGET_VIEWPORT_FRACTION's (e.g. a wide tagline on a
// narrow phone), satisfying the more demanding axis's target can never push
// the other axis past the screen edge and crop the logo off.
const LOGO_MAX_VIEWPORT_FRACTION = 0.92;

// Absolute sane bounds on the opening zoom, regardless of the above.
const OPEN_ZOOM_BOUNDS = { min: 1.4, max: 4 };

// How far beyond the photo's native pixel density we'll ever stretch it.
// 1 = never softer than native; ~1.5-1.8 is a mild, generally imperceptible
// upscale. Keeps the "close-up" from visibly blurring on small screens where
// the base render is already small (see computeOpenTransform).
const MAX_NATIVE_UPSCALE = 2.2;

// Extra scroll distance the hero stays pinned for while it zooms out, in
// viewport heights. 2.2 sits in the requested ~200-250vh range.
const SCROLL_DISTANCE_VH = 220;

// Where the final "Explore collection" button sends visitors. A route
// navigates; a same-page hash (e.g. "/#collection") scrolls to that section
// instead — see handleCtaClick.
const CTA_HREF = "/shop/new-arrivals";

// A small safety margin added to the image's rendered size so the subtle
// mouse-tilt effect never reveals an edge of the photo.
const TILT_OVERSCAN = 1.06;
const TILT_MAX_DEG = 1.6;
const TILT_MAX_PX = 10;

// On load, the hero plays its own zoom-out: the page auto-scrolls slowly
// through the pin until the reveal is complete and the "Explore Collection"
// button has faded in. Expressed as a fraction of the pin's scroll distance,
// so 1 = the full reveal. Cancelled the instant the visitor takes over.
const INTRO_AUTO_PROGRESS = 1;
const INTRO_AUTO_DURATION = 6;
const INTRO_AUTO_DELAY = 0.5;

// ---------------------------------------------------------------------------

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

type ImageKey = keyof typeof HERO_IMAGES;

// Below MOBILE_BREAKPOINT_PX, use the dedicated portrait photo.
function pickImageKey(viewportW: number): ImageKey {
  return viewportW < MOBILE_BREAKPOINT_PX ? "mobile" : "desktop";
}

// Always covers the viewport (crops rather than letterboxes) so the hero
// never shows blank background around the photo; the focal point above
// keeps the logo lockup in frame even on unusually narrow or tall windows.
function computeOpenTransform(viewportW: number, viewportH: number, image: HeroImageConfig) {
  const imgAspect = image.width / image.height;
  const useWidth = viewportW / viewportH > imgAspect;

  const renderW = useWidth ? viewportW : viewportH * imgAspect;
  const renderH = useWidth ? viewportW / imgAspect : viewportH;

  const offsetX = (viewportW - renderW) / 2;
  const offsetY = (viewportH - renderH) / 2;

  const focalScreenX = offsetX + image.focal.x * renderW;
  const focalScreenY = offsetY + image.focal.y * renderH;

  const centerX = viewportW / 2;
  const centerY = viewportH / 2;

  // Required zoom to hit each axis's target; the larger one wins so the crop
  // stays tight on both axes regardless of viewport aspect ratio.
  const zoomForWidth = (OPEN_TARGET_VIEWPORT_FRACTION.width * viewportW) / (image.logoSize.width * renderW);
  const zoomForHeight = (OPEN_TARGET_VIEWPORT_FRACTION.height * viewportH) / (image.logoSize.height * renderH);
  const targetZoom = clamp(Math.max(zoomForWidth, zoomForHeight), OPEN_ZOOM_BOUNDS.min, OPEN_ZOOM_BOUNDS.max);

  // Never render the photo at more than MAX_NATIVE_UPSCALE times its native
  // pixel density, however tight the target above wants to crop.
  const baseNativeScale = renderW / image.width;
  const maxSharpZoom = MAX_NATIVE_UPSCALE / baseNativeScale;

  // Never let the logo lockup itself grow past LOGO_MAX_VIEWPORT_FRACTION of
  // the viewport on either axis, however tight the other axis's target is.
  const maxSafeZoomWidth = (LOGO_MAX_VIEWPORT_FRACTION * viewportW) / (image.logoSize.width * renderW);
  const maxSafeZoomHeight = (LOGO_MAX_VIEWPORT_FRACTION * viewportH) / (image.logoSize.height * renderH);

  const zoom = Math.min(targetZoom, maxSharpZoom, maxSafeZoomWidth, maxSafeZoomHeight);

  return {
    zoom,
    x: zoom * (centerX - focalScreenX),
    y: zoom * (centerY - focalScreenY),
  };
}

// When CTA_HREF points at a section on this page, scroll to it by hand rather
// than letting the browser follow the hash: once the URL already carries that
// hash, a second click changes nothing, so the browser does nothing and the
// button looks broken after its first use. For a plain route (the current
// setting) this falls through to normal navigation, as do modifier-clicks so
// that "open in new tab" keeps working.
function handleCtaClick(event: ReactMouseEvent<HTMLAnchorElement>) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const targetId = CTA_HREF.split("#")[1];
  const target = targetId ? document.getElementById(targetId) : null;
  if (!target) return; // no such section — let normal navigation handle it

  event.preventDefault();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // scrollIntoView honours the target's `scroll-mt-*`, so it lands below the
  // fixed header rather than underneath it.
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const [imageKey, setImageKey] = useState<ImageKey>("desktop");

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const tilt = tiltRef.current;
    const image = imageRef.current;
    const scrollCue = scrollCueRef.current;
    const cta = ctaRef.current;
    if (!section || !tilt || !image || !scrollCue || !cta) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const key = pickImageKey(window.innerWidth);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- depends on window, only knowable client-side
      setImageKey(key);
      return;
    }

    const ctx = gsap.context(() => {
      const initialImageKey = pickImageKey(window.innerWidth);
      setImageKey(initialImageKey);
      let activeImage = HERO_IMAGES[initialImageKey];

      let open = computeOpenTransform(window.innerWidth, window.innerHeight, activeImage);
      // Captured rather than read live from `innerHeight`, which on mobile
      // changes as the URL bar collapses — that would move the pin's end
      // point mid-swipe and jump the zoom. Recomputed on a real resize below.
      let pinDistance = window.innerHeight * (SCROLL_DISTANCE_VH / 100);

      // force3D keeps the photo on its own GPU layer between updates, so
      // each scroll step composites instead of re-rasterising a 2-4x
      // upscaled image — the difference is very visible on phones.
      gsap.set(image, { scale: open.zoom, x: open.x, y: open.y, transformOrigin: "50% 50%", force3D: true });
      gsap.set(scrollCue, { autoAlpha: 1 });
      gsap.set(cta, { autoAlpha: 0, pointerEvents: "none" });

      const applyProgress = (progress: number) => {
        gsap.set(image, {
          scale: gsap.utils.interpolate(open.zoom, 1, progress),
          x: gsap.utils.interpolate(open.x, 0, progress),
          y: gsap.utils.interpolate(open.y, 0, progress),
          force3D: true,
        });
        gsap.set(scrollCue, { autoAlpha: 1 - clamp(progress / 0.12, 0, 1) });
        // pointerEvents is driven alongside the fade: at the bottom of the
        // fade the button is still technically visible (opacity ~0.001), and
        // without this it sits there as an invisible tap target in the middle
        // of the hero, swallowing taps meant for the photo.
        const ctaAlpha = clamp((progress - 0.7) / 0.3, 0, 1);
        gsap.set(cta, { autoAlpha: ctaAlpha, pointerEvents: ctaAlpha > 0.4 ? "auto" : "none" });
      };

      // A smoothed scrub (a fixed lag behind the scroll position) feels nice
      // with a mouse wheel, but reads as laggy/unsmooth under a finger on
      // touch devices, which expect the animation to track 1:1 with the
      // gesture. `scrub: true` removes that lag on mobile.
      const scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${pinDistance}`,
        pin: true,
        scrub: initialImageKey === "mobile" ? true : 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => applyProgress(self.progress),
      });

      // Play the reveal automatically on load by scrolling the page itself,
      // rather than tweening the image separately — to ScrollTrigger it's
      // just ordinary scrolling, so handing off to the visitor mid-animation
      // needs no state reconciliation. Skipped if the page didn't load at the
      // top (e.g. a restored scroll position), and cancelled the instant the
      // visitor scrolls, clicks, taps or presses a key.
      let introTween: gsap.core.Tween | undefined;
      let cancelIntro: (() => void) | undefined;
      let startIntro: (() => void) | undefined;
      if (window.scrollY < 10) {
        // The document carries `scroll-behavior: smooth` for anchor links.
        // Left on, each per-frame scrollTo below starts its own easing
        // animation that the next frame immediately interrupts, so the page
        // barely moves and then lurches — it has to be off while we drive the
        // scroll ourselves. It gets re-asserted every frame rather than set
        // once, because ScrollTrigger saves and restores this property around
        // its own refreshes and would otherwise hand `smooth` back mid-run.
        const root = document.documentElement;
        const inheritedScrollBehavior = root.style.scrollBehavior;
        const restoreScrollBehavior = () => {
          root.style.scrollBehavior = inheritedScrollBehavior;
        };

        let cancelled = false;

        startIntro = () => {
          if (cancelled || window.scrollY > 10) return;
          // Measurements have to be settled first: until ScrollTrigger has
          // built its pin spacer the document isn't tall enough to scroll
          // into, so the tween would stall against the page bottom and then
          // lurch through the whole reveal once the spacer appeared.
          ScrollTrigger.refresh();

          const introState = { progress: 0 };
          introTween = gsap.to(introState, {
            progress: INTRO_AUTO_PROGRESS,
            duration: INTRO_AUTO_DURATION,
            delay: INTRO_AUTO_DELAY,
            ease: "power1.inOut",
            onUpdate: () => {
              root.style.scrollBehavior = "auto";
              const target = introState.progress * pinDistance;
              const maxScroll = root.scrollHeight - window.innerHeight;
              window.scrollTo(0, Math.min(target, maxScroll));
            },
            onComplete: restoreScrollBehavior,
          });
        };

        // pointerdown covers mouse, touch and pen — including a click on the
        // CTA as it fades in, which would otherwise fight the running tween.
        cancelIntro = () => {
          cancelled = true;
          introTween?.kill();
          restoreScrollBehavior();
        };
        window.addEventListener("wheel", cancelIntro, { passive: true });
        window.addEventListener("pointerdown", cancelIntro, { passive: true });
        window.addEventListener("keydown", cancelIntro);

        // Images still decoding can resize the document (and trigger a
        // ScrollTrigger refresh) mid-animation, so wait for a settled page.
        if (document.readyState === "complete") startIntro();
        else window.addEventListener("load", startIntro, { once: true });
      }

      let lastWidth = window.innerWidth;
      const handleResize = () => {
        lastWidth = window.innerWidth;
        const nextImageKey = pickImageKey(window.innerWidth);
        setImageKey(nextImageKey);
        activeImage = HERO_IMAGES[nextImageKey];

        open = computeOpenTransform(window.innerWidth, window.innerHeight, activeImage);
        pinDistance = window.innerHeight * (SCROLL_DISTANCE_VH / 100);
        ScrollTrigger.refresh();
        applyProgress(scrollTrigger?.progress ?? 0);
      };

      let resizeTimer: ReturnType<typeof setTimeout>;
      const scheduleResize = (delay: number) => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, delay);
      };
      // Height-only resizes on a touch device are the URL bar collapsing or
      // expanding during a swipe, not a real layout change. Re-measuring then
      // is what makes the gesture stutter, so those are ignored; a rotation
      // (which changes the width) still refreshes normally.
      const onResize = () => {
        if (window.innerWidth === lastWidth) return;
        scheduleResize(150);
      };
      const onOrientationChange = () => scheduleResize(250);
      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", onOrientationChange);

      const canTilt = window.matchMedia("(pointer: fine)").matches;
      let onPointerMove: ((event: PointerEvent) => void) | undefined;
      if (canTilt) {
        gsap.set(tilt, { transformPerspective: 1400, scale: TILT_OVERSCAN });
        const quickRotateX = gsap.quickTo(tilt, "rotateX", { duration: 0.6, ease: "power3.out" });
        const quickRotateY = gsap.quickTo(tilt, "rotateY", { duration: 0.6, ease: "power3.out" });
        const quickX = gsap.quickTo(tilt, "x", { duration: 0.6, ease: "power3.out" });
        const quickY = gsap.quickTo(tilt, "y", { duration: 0.6, ease: "power3.out" });

        onPointerMove = (event: PointerEvent) => {
          const nx = event.clientX / window.innerWidth - 0.5;
          const ny = event.clientY / window.innerHeight - 0.5;
          quickRotateY(nx * TILT_MAX_DEG * 2);
          quickRotateX(-ny * TILT_MAX_DEG * 2);
          quickX(-nx * TILT_MAX_PX);
          quickY(-ny * TILT_MAX_PX);
        };
        window.addEventListener("pointermove", onPointerMove);
      }

      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onOrientationChange);
        if (onPointerMove) window.removeEventListener("pointermove", onPointerMove);
        clearTimeout(resizeTimer);
        if (cancelIntro) {
          cancelIntro(); // kills the tween and restores `scroll-behavior`
          window.removeEventListener("wheel", cancelIntro);
          window.removeEventListener("pointerdown", cancelIntro);
          window.removeEventListener("keydown", cancelIntro);
        }
        if (startIntro) window.removeEventListener("load", startIntro);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      /* 100lvh, not 100dvh: the pin captures this height once, and a dvh
         measured while the mobile URL bar is showing would leave a strip of
         background exposed the moment the bar collapses. lvh always covers. */
      className="relative isolate z-10 h-[100lvh] w-full overflow-hidden bg-cream-dark"
    >
      <div ref={tiltRef} className="absolute inset-0 will-change-transform">
        <Image
          ref={imageRef}
          src={HERO_IMAGES[imageKey].src}
          alt={HERO_IMAGES[imageKey].alt}
          fill
          priority
          quality={90}
          sizes="(max-width: 767px) 300vw, 200vw"
          className="object-cover object-center will-change-transform"
        />
      </div>

      <WaveField className="pointer-events-none absolute inset-0 mix-blend-screen" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/35 via-ink/0 to-transparent"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/35 via-ink/0 to-transparent"
      />

      <div
        ref={scrollCueRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-1 text-cream opacity-0 max-md:bottom-auto max-md:top-[calc(100svh-68px)]"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
          Scroll to explore
        </span>
        <ChevronDownIcon className="h-4 w-4 animate-bounce" />
      </div>

      {/* Anchored to 100svh (the viewport with the mobile URL bar showing)
          rather than the section's bottom, so it stays on screen whether the
          bar is up or down — the section itself is a taller 100lvh. */}
      {/* The wrapper spans the full width, so it must not take pointer events
          itself — only the button inside it should be tappable. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center px-6 max-md:bottom-auto max-md:top-[calc(100svh-80px)]">
        <Link
          ref={ctaRef}
          href={CTA_HREF}
          onClick={handleCtaClick}
          className="pointer-events-auto rounded-sm bg-olive px-8 py-3 text-xs font-semibold uppercase tracking-widest text-cream shadow-lg transition-colors hover:bg-olive-light max-md:py-4"
        >
          Explore Collection
        </Link>
      </div>
    </section>
  );
}

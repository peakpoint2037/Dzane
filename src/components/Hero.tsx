"use client";

import { useLayoutEffect, useRef, useState } from "react";
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

// Where the final "Explore collection" button sends visitors.
const CTA_HREF = "/#collection";

// A small safety margin added to the image's rendered size so the subtle
// mouse-tilt effect never reveals an edge of the photo.
const TILT_OVERSCAN = 1.06;
const TILT_MAX_DEG = 1.6;
const TILT_MAX_PX = 10;

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

      gsap.set(image, { scale: open.zoom, x: open.x, y: open.y, transformOrigin: "50% 50%" });
      gsap.set(scrollCue, { autoAlpha: 1 });
      gsap.set(cta, { autoAlpha: 0 });

      const applyProgress = (progress: number) => {
        gsap.set(image, {
          scale: gsap.utils.interpolate(open.zoom, 1, progress),
          x: gsap.utils.interpolate(open.x, 0, progress),
          y: gsap.utils.interpolate(open.y, 0, progress),
        });
        gsap.set(scrollCue, { autoAlpha: 1 - clamp(progress / 0.12, 0, 1) });
        gsap.set(cta, { autoAlpha: clamp((progress - 0.7) / 0.3, 0, 1) });
      };

      // A smoothed scrub (a fixed lag behind the scroll position) feels nice
      // with a mouse wheel, but reads as laggy/unsmooth under a finger on
      // touch devices, which expect the animation to track 1:1 with the
      // gesture. `scrub: true` removes that lag on mobile.
      const scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * (SCROLL_DISTANCE_VH / 100)}`,
        pin: true,
        scrub: initialImageKey === "mobile" ? true : 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => applyProgress(self.progress),
      });

      const handleResize = () => {
        const nextImageKey = pickImageKey(window.innerWidth);
        setImageKey(nextImageKey);
        activeImage = HERO_IMAGES[nextImageKey];

        open = computeOpenTransform(window.innerWidth, window.innerHeight, activeImage);
        ScrollTrigger.refresh();
        applyProgress(scrollTrigger?.progress ?? 0);
      };

      let resizeTimer: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 150);
      };
      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", onResize);

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
        window.removeEventListener("orientationchange", onResize);
        if (onPointerMove) window.removeEventListener("pointermove", onPointerMove);
        clearTimeout(resizeTimer);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate z-10 h-dvh w-full overflow-hidden bg-cream-dark"
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
        className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-1 text-cream opacity-0"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
          Scroll to explore
        </span>
        <ChevronDownIcon className="h-4 w-4 animate-bounce" />
      </div>

      <div className="absolute inset-x-0 bottom-10 flex justify-center px-6">
        <Link
          ref={ctaRef}
          href={CTA_HREF}
          className="rounded-sm bg-olive px-8 py-3 text-xs font-semibold uppercase tracking-widest text-cream shadow-lg transition-colors hover:bg-olive-light"
        >
          Explore Collection
        </Link>
      </div>
    </section>
  );
}

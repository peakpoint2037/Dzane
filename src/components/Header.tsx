"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SiteSearch from "./SiteSearch";
import { navLinks } from "@/data/nav";
import {
  LeafIcon,
  ScissorsIcon,
  HeartIcon,
  TruckIcon,
  MenuIcon,
  CloseIcon,
} from "./icons";

// On the homepage, the header floats transparently over the hero photo until
// the section right after it ("How We Work") scrolls up to this fraction of
// the viewport height, then turns solid.
const SOLID_TRIGGER_VIEWPORT_FRACTION = 0.2;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [solid, setSolid] = useState(!isHome);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // The menu and the search sheet both fill the screen below the header, so
  // only one may be open at a time — otherwise you get two panels stacked
  // and two close buttons in the header with no clue which does what.
  const openMenu = (next: boolean) => {
    setMenuOpen(next);
    if (next) setSearchOpen(false);
  };
  const openSearch = (next: boolean) => {
    setSearchOpen(next);
    if (next) {
      setMenuOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      const target = document.getElementById("how-we-work-section");
      const top = target?.getBoundingClientRect().top ?? Infinity;
      setSolid(top <= window.innerHeight * SOLID_TRIGGER_VIEWPORT_FRACTION);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  // Measure the header's own height so the full-screen mobile menu can start
  // right below it instead of a hardcoded pixel value (the header's height
  // changes with the announcement bar and transparent/solid states).
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const measure = () => setHeaderHeight(header.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  // Prevent the page behind the full-screen mobile menu or search sheet from
  // scrolling underneath them.
  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [menuOpen, searchOpen]);

  const panelOpen = menuOpen || searchOpen;
  const transparent = isHome && !solid && !panelOpen;
  const textColor = transparent ? "text-cream" : "text-ink";

  return (
    <header
      ref={headerRef}
      className={`${isHome ? "fixed" : "sticky"} inset-x-0 top-0 z-50 transition-colors duration-300 ${
        // While a full-screen panel is open the header has to match it,
        // otherwise a white bar sits on top of the blush sheet. The menu is
        // mobile-only; search is only a sheet below `sm` (a dropdown above),
        // so above that the header keeps its normal colour.
        menuOpen
          ? "bg-lavender"
          : searchOpen
            ? "bg-lavender sm:bg-cream"
            : transparent
              ? "bg-transparent"
              : "bg-cream"
      }`}
    >
      {/* Announcement bar */}
      {!transparent && (
        <div className="hidden bg-olive text-cream/90 md:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-[11px] tracking-wide">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <LeafIcon className="h-3.5 w-3.5" />
                PREMIUM QUALITY FABRICS
              </span>
              <span className="flex items-center gap-1.5">
                <ScissorsIcon className="h-3.5 w-3.5" />
                CUSTOM TAILORING
              </span>
              <span className="flex items-center gap-1.5">
                <HeartIcon className="h-3.5 w-3.5" />
                MADE WITH LOVE
              </span>
            </div>
            <span className="flex items-center gap-1.5 text-cream">
              Free Shipping on Orders Above ₹999
              <TruckIcon className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      )}

      {/* Nav (mobile menu toggle + category links + cart) */}
      <nav className={transparent ? "" : "border-t border-ink/10"}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="-ml-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => openMenu(!menuOpen)}
              className={`flex h-9 w-9 items-center justify-center lg:hidden ${textColor}`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>

          <ul
            className={`hidden flex-1 items-center justify-center gap-8 text-xs font-medium tracking-wide lg:flex ${textColor}`}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="uppercase transition-colors hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={`-mr-2 ${textColor}`}>
            <SiteSearch
              open={searchOpen}
              onOpenChange={openSearch}
              query={searchQuery}
              onQueryChange={setSearchQuery}
              headerHeight={headerHeight}
            />
          </div>
        </div>
      </nav>

      {/* Mobile nav */}
      {menuOpen && (
        <nav
          className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto border-t border-ink/10 bg-lavender lg:hidden"
          style={{ top: headerHeight }}
        >
          <ul className="flex flex-col gap-1 px-6 py-4 text-sm font-medium text-ink">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => openMenu(false)}
                  className="block py-3 uppercase tracking-wide transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

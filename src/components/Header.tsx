"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import SiteSearch from "./SiteSearch";
import { navLinks } from "@/data/nav";
import {
  LeafIcon,
  ScissorsIcon,
  HeartIcon,
  TruckIcon,
  UserIcon,
  BagIcon,
  MenuIcon,
  CloseIcon,
} from "./icons";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = 0;

  return (
    <header className="sticky top-0 z-50 bg-cream">
      {/* Announcement bar */}
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
          <span className="flex items-center gap-1.5 text-gold-light">
            Free Shipping on Orders Above ₹999
            <TruckIcon className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center text-ink lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
          <Logo compact />
          <span className="text-shimmer self-start pt-1 text-[7px] font-semibold uppercase leading-tight tracking-[0.04em] sm:text-[11px] sm:tracking-[0.15em]">
            Stitching Studio
            <br />
            and Premium Ladies Wear
          </span>
        </div>

        <div className="flex items-center gap-5 text-ink">
          <SiteSearch />
          <Link href="/account" aria-label="Account" className="hover:text-gold">
            <UserIcon className="h-5 w-5" />
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative hover:text-gold">
            <BagIcon className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-olive text-[10px] text-cream">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>

      {/* Nav links */}
      <nav className="hidden border-t border-ink/10 lg:block">
        <ul className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 py-3 text-xs font-medium tracking-wide text-ink">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="uppercase transition-colors hover:text-gold">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="border-t border-ink/10 lg:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4 text-sm font-medium text-ink">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 uppercase tracking-wide transition-colors hover:text-gold"
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

"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { searchIndex } from "@/data/searchIndex";
import { SearchIcon, CloseIcon } from "./icons";

// Shown before anything is typed, so the panel opens with somewhere to go
// rather than a blank box.
const QUICK_LINKS = [
  "Churidar Fabrics",
  "Nighties & Loungewear",
  "Sarees",
  "Custom Stitching",
];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  query: string;
  onQueryChange: (query: string) => void;
  /** Height of the header, so the mobile sheet starts just below it. */
  headerHeight: number;
};

export default function SiteSearch({
  open,
  onOpenChange,
  query,
  onQueryChange,
  headerHeight,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    inputRef.current?.focus();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onOpenChange]);

  const trimmed = query.trim().toLowerCase();
  const results = useMemo(() => {
    const words = trimmed.split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return searchIndex.filter((entry) => {
      const haystack = [entry.title, entry.description, ...entry.keywords].join(" ").toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [trimmed]);

  const quickLinks = useMemo(
    () => QUICK_LINKS.map((title) => searchIndex.find((e) => e.title === title)).filter(Boolean),
    [],
  );

  const close = () => onOpenChange(false);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={open ? "Close search" : "Search"}
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
        className="flex h-9 w-9 items-center justify-center hover:text-gold"
      >
        {open ? <CloseIcon className="h-5 w-5" /> : <SearchIcon className="h-5 w-5" />}
      </button>

      {open && (
        <div
          // Full-width sheet below the header on phones; a dropdown panel
          // anchored to the icon from `sm` up.
          className="fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-hidden border-t border-ink/10 bg-lavender sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:bottom-auto sm:mt-2 sm:max-h-[70vh] sm:w-96 sm:rounded-md sm:border sm:bg-white sm:shadow-xl"
          style={{ top: headerHeight }}
        >
          <div className="p-3 sm:p-3">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
              <input
                ref={inputRef}
                type="search"
                inputMode="search"
                enterKeyHint="search"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search churidars, sarees, offers…"
                aria-label="Search the site"
                // The native WebKit clear button is suppressed — we render our
                // own, and both together read as a stray double ✕.
                className="w-full rounded-md border border-ink/15 bg-white py-3 pl-9 pr-9 text-base text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none sm:py-2 sm:text-sm [&::-webkit-search-cancel-button]:appearance-none"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    onQueryChange("");
                    inputRef.current?.focus();
                  }}
                  className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink/40 hover:bg-ink/5 hover:text-ink"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4 sm:max-h-80">
            {!trimmed ? (
              <>
                <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-ink/40">
                  Popular
                </p>
                <ul className="flex flex-col gap-1">
                  {quickLinks.map((entry) => (
                    <li key={entry!.title}>
                      <Link
                        href={entry!.href}
                        onClick={close}
                        className="block rounded-md px-3 py-3 text-sm font-medium text-ink transition-colors hover:bg-white/70 sm:py-2 sm:hover:bg-lavender/50"
                      >
                        {entry!.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : results.length > 0 ? (
              <>
                <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-ink/40">
                  {results.length} result{results.length === 1 ? "" : "s"}
                </p>
                <ul className="flex flex-col gap-1">
                  {results.map((entry) => (
                    <li key={entry.title}>
                      <Link
                        href={entry.href}
                        onClick={close}
                        className="block rounded-md px-3 py-3 transition-colors hover:bg-white/70 sm:py-2 sm:hover:bg-lavender/50"
                      >
                        <p className="text-sm font-medium text-ink">{entry.title}</p>
                        <p className="mt-0.5 text-xs text-ink/50">{entry.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="px-3 py-10 text-center">
                <p className="text-sm text-ink/60">
                  No results for &ldquo;{query}&rdquo;
                </p>
                <p className="mt-1 text-xs text-ink/40">
                  Try &ldquo;churidar&rdquo;, &ldquo;saree&rdquo; or &ldquo;nighty&rdquo;.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

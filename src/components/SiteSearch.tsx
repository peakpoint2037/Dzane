"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { searchIndex } from "@/data/searchIndex";
import { SearchIcon, CloseIcon } from "./icons";

export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    inputRef.current?.focus();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const trimmed = query.trim().toLowerCase();
  const words = trimmed.split(/\s+/).filter(Boolean);
  const results = words.length
    ? searchIndex.filter((entry) => {
        const haystack = [entry.title, entry.description, ...entry.keywords]
          .join(" ")
          .toLowerCase();
        return words.every((word) => haystack.includes(word));
      })
    : [];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label="Search"
        onClick={() => {
          setOpen((v) => !v);
          setQuery("");
        }}
        className="hover:text-gold"
      >
        {open ? (
          <CloseIcon className="h-5 w-5" />
        ) : (
          <SearchIcon className="h-5 w-5" />
        )}
      </button>

      {open && (
        <div className="fixed inset-x-4 top-20 z-50 mx-auto max-w-md rounded-md border border-ink/10 bg-white p-3 shadow-xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-96">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search churidars, sarees, offers…"
            className="w-full rounded-md border border-ink/15 px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none"
          />

          {trimmed && (
            <div className="mt-2 max-h-80 overflow-y-auto">
              {results.length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {results.map((entry) => (
                    <li key={entry.title}>
                      <Link
                        href={entry.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-md px-3 py-2 transition-colors hover:bg-lavender/50"
                      >
                        <p className="text-sm font-medium text-ink">
                          {entry.title}
                        </p>
                        <p className="mt-0.5 text-xs text-ink/50">
                          {entry.description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-3 py-6 text-center text-sm text-ink/50">
                  No results for &ldquo;{query}&rdquo;
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

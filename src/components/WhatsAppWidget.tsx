"use client";

import { useState } from "react";
import { whatsappContacts } from "@/data/contacts";
import { WhatsAppIcon, CloseIcon } from "./icons";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div className="w-72 overflow-hidden rounded-md border border-ink/10 bg-white shadow-xl">
          <div className="flex items-center justify-between bg-[#25D366] px-4 py-3 text-white">
            <p className="text-sm font-semibold">Chat with DZANE</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat options"
              className="text-white/90 hover:text-white"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
          <ul className="divide-y divide-ink/10">
            {whatsappContacts.map((contact) => (
              <li key={contact.phone}>
                <a
                  href={`https://wa.me/${contact.phone}?text=${encodeURIComponent(contact.message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-lavender/40"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                    <WhatsAppIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink">
                      {contact.role}
                    </span>
                    <span className="block text-xs text-ink/50">
                      {contact.description}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat with us on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        {open ? (
          <CloseIcon className="h-6 w-6" />
        ) : (
          <WhatsAppIcon className="h-7 w-7" />
        )}
      </button>
    </div>
  );
}

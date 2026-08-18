type IconProps = {
  className?: string;
};

export function UpiIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="6" y="2.5" width="12" height="19" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 5.5h12M6 18.5h12" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 15c0-1 .8-1.5 1.5-2s1.5-1 1.5-2a1.7 1.7 0 0 0-3-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="16.7" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function GiftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="9" width="16" height="11" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 9h19v3.5h-19z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M12 9v11" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 9C12 9 9 9 8 6.5S9 2.5 10.5 3.5 12 9 12 9ZM12 9c0 0 3 0 4-2.5S15 2.5 13.5 3.5 12 9 12 9Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M20.5 12.5 12.5 20.5a1.5 1.5 0 0 1-2.12 0L3.5 13.62a1.5 1.5 0 0 1 0-2.12L11.5 3.5H18a2.5 2.5 0 0 1 2.5 2.5v6.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="15.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.41-1.42a9.87 9.87 0 0 0 4.63 1.18h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.22 0 4.31.87 5.88 2.44a8.26 8.26 0 0 1 2.43 5.8c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.21.84.86-3.13-.2-.32a8.19 8.19 0 0 1-1.26-4.38c0-4.55 3.7-8.16 8.24-8.16Zm-3.6 4.6c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.13.17 1.72 2.75 4.28 3.75 2.12.83 2.55.66 3.01.62.46-.04 1.5-.61 1.71-1.2.21-.59.21-1.09.15-1.2-.07-.11-.24-.17-.5-.3-.26-.13-1.5-.74-1.74-.83-.23-.08-.4-.13-.57.13-.17.25-.65.83-.8 1-.15.17-.29.19-.55.06-.26-.13-1.08-.4-2.05-1.27-.76-.68-1.27-1.51-1.42-1.77-.15-.25-.02-.39.11-.52.11-.11.26-.29.38-.44.13-.15.17-.25.26-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.4-.79-1.91-.2-.5-.42-.43-.57-.44Z" />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="m12 2.5 2.9 6.28 6.85.72-5.13 4.66 1.47 6.79L12 17.27l-6.09 3.68 1.47-6.79-5.13-4.66 6.85-.72L12 2.5Z" />
    </svg>
  );
}

export function LeafIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 19c8-1 13-6 14-14-8 1-13 6-14 14Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M6 18c3-4 6-7 12-11" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function ScissorsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="6" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M7.8 7.6 20 18M20 6 7.8 16.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 20s-7.2-4.4-9.6-9C.8 7 2.6 3.6 6 3.2c2-.2 3.7.8 6 3 2.3-2.2 4-3.2 6-3 3.4.4 5.2 3.8 3.6 7.8-2.4 4.6-9.6 9-9.6 9Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3 5 5.5V11c0 4.6 2.9 7.9 7 9 4.1-1.1 7-4.4 7-9V5.5L12 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2.2 2.2L15.5 10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M2 6h11v10H2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M13 10h4l4 3.2V16h-8z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="18" r="1.7" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17" cy="18" r="1.7" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function RefreshIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 12a8 8 0 0 1 13.7-5.7L20 8M4 12a8 8 0 0 0 13.7 5.7L20 16M4 8v4h4M20 16v-4h-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeadsetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 13v-1a8 8 0 0 1 16 0v1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <rect x="3" y="13" width="4" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="17" y="13" width="4" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M20 19a4 4 0 0 1-4 3h-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function DiamondIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 9h16l-8 11L4 9Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M8 4h8l3 5H5l3-5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 9l3 11 3-11M4 9l4 0M16 9l4 0" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m20 20-4.3-4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.5 20c1.4-3.6 4.3-5.5 7.5-5.5s6.1 1.9 7.5 5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 8h12l-1 12.5H7L6 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="m5 5 14 14M19 5 5 19"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function NeedleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 20 15 9M15 9a2.5 2.5 0 1 0 3.5-3.5A2.5 2.5 0 0 0 15 9Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 18v-3l3 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

import Link from "next/link";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="flex flex-col items-center leading-none select-none"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- local SVG, next/image disallows unoptimized local SVGs by default */}
      <img
        src="/images/logo-black.svg"
        alt="DZANE"
        width={1000}
        height={1000}
        className={compact ? "h-16 w-auto sm:h-20 lg:h-28" : "h-48 w-auto sm:h-56"}
      />
      {!compact && (
        <span className="mt-1 text-[10px] tracking-[0.35em] text-ink/60">
          STITCHING STUDIO
        </span>
      )}
    </Link>
  );
}

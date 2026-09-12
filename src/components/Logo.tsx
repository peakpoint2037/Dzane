import Link from "next/link";

const SIZE_CLASSES = {
  xs: "h-6 w-auto sm:h-7",
  sm: "h-8 w-auto sm:h-9",
  compact: "h-16 w-auto sm:h-20 lg:h-28",
  full: "h-48 w-auto sm:h-56",
};

export default function Logo({
  size = "full",
  variant = "dark",
}: {
  size?: keyof typeof SIZE_CLASSES;
  variant?: "dark" | "gold";
}) {
  return (
    <Link
      href="/"
      className="flex flex-col items-center leading-none select-none"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- local SVG/PNG, next/image disallows unoptimized local SVGs by default */}
      <img
        src={variant === "gold" ? "/images/logo.png" : "/images/logo-black.svg"}
        alt="DZANE"
        width={1000}
        height={1000}
        className={SIZE_CLASSES[size]}
      />
      {size === "full" && (
        <span
          className={`mt-1 text-[10px] tracking-[0.35em] ${
            variant === "gold" ? "text-cream/80" : "text-ink/60"
          }`}
        >
          STITCHING STUDIO
        </span>
      )}
    </Link>
  );
}

import Link from "next/link";

export default function FeaturedVideoSection() {
  return (
    <section className="border-t border-ink/10 bg-cream py-12" aria-labelledby="featured-video">
      <div className="w-full">
        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-widest text-gold">Discover DZANE</p>
          <h2 id="featured-video" className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
            Plum Floral, in Motion
          </h2>
        </div>
        <video
          autoPlay
          muted
          loop
          controlsList="nodownload"
          disablePictureInPicture
          playsInline
          preload="metadata"
          poster="/images/dzane-plum-floral-poster.webp"
          width={1280}
          height={720}
          aria-label="DZANE Plum Floral promotional video"
          className="block aspect-video w-full bg-ink object-contain"
        >
          <source src="/videos/dzane-plum-floral.mp4" type="video/mp4" />
          Your browser does not support video playback.
        </video>
        <div className="mt-6 text-center">
          <Link href="/shop/readymade-wear" className="inline-block rounded-sm bg-olive px-8 py-3 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-olive-light">
            Shop Readymade Wear
          </Link>
        </div>
      </div>
    </section>
  );
}

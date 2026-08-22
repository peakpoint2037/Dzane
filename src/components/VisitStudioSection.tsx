import Image from "next/image";
import { studioPhotos } from "@/data/studio";

export default function VisitStudioSection() {
  return (
    <section
      className="border-t border-ink/10 bg-cream py-12"
      aria-labelledby="visit-studio"
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 id="visit-studio" className="font-serif text-xl text-ink">
            Visit Our Studio
          </h2>
          <p className="text-xs text-ink/50">
            Cheriyapallithazham, Kothamangalam
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {studioPhotos.map((photo) => (
            <div
              key={photo.caption}
              className="overflow-hidden rounded-md border border-ink/10 bg-white/40"
            >
              <div
                className={
                  photo.image
                    ? "relative aspect-[3/4] bg-cream"
                    : `relative flex aspect-[3/4] items-center justify-center bg-gradient-to-br ${photo.gradient}`
                }
              >
                {photo.image ? (
                  <Image
                    src={photo.image}
                    alt={photo.caption}
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 15vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <span className="px-3 text-center text-[11px] text-ink/30">
                    Photo coming soon
                  </span>
                )}
              </div>
              <p className="p-2 text-center text-[11px] leading-snug text-ink/60 sm:p-3 sm:text-xs">
                {photo.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

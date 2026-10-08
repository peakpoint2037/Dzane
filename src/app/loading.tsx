import Header from "@/components/Header";

export default function Loading() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-14" aria-busy="true">
        <p role="status" className="mb-8 text-center text-sm text-ink/60">
          Loading your collection…
        </p>
        <div aria-hidden="true" className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="aspect-[3/4] rounded-md bg-lavender motion-safe:animate-pulse" />
          ))}
        </div>
      </main>
    </>
  );
}

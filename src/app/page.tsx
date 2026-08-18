import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import OffersSection from "@/components/OffersSection";
import CategorySection from "@/components/CategorySection";
import FamilyWearSection from "@/components/FamilyWearSection";
import TrustBar from "@/components/TrustBar";
import ReviewsSection from "@/components/ReviewsSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <HowWeWorkSection />
        <CategorySection />
        <FamilyWearSection />
        <TrustBar />
        <OffersSection />
        <ReviewsSection />
      </main>
    </>
  );
}

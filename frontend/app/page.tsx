import Hero from "@/components/Hero";
import FeaturedCharacters from "@/components/FeaturedCharacters";
import Timeline from "@/components/Timeline";
import Stats from "@/components/Stats";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Hero />
      <FeaturedCharacters />
      <Timeline />
      <Stats />
      <Newsletter />
      <Footer />
    </main>
  );
}
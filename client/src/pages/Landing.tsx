import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CharacterGallery from "@/components/CharacterGallery";
import Footer from "@/components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CharacterGallery />
      <Footer />
    </div>
  );
}
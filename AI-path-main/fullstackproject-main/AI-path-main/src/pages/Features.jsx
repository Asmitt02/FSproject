import Navbar from "../components/Navbar";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";

export default function Features() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24">
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}

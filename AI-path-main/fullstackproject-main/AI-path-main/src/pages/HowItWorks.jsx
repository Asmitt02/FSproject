import Navbar from "../components/Navbar";
import HowItWorksSection from "../components/HowItWorksSection";
import Footer from "../components/Footer";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24">
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
}

import { Lightbulb, Target, ArrowRight } from "lucide-react";

const AboutSection = () => (
  <section id="about" className="section-padding relative">
    {/* Decorative background gradients */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

    <div className="section-container">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight animate-fade-up">
          About <span className="text-gradient">Campus Path AI</span>
        </h2>
        <p className="mt-6 text-muted-foreground leading-relaxed text-lg sm:text-xl animate-fade-up-delay-1">
          We harness the power of artificial intelligence to analyze your unique
          goals, skills, and interests. Our platform creates a beautifully
          tailored career roadmap, bridging the gap between where you are today
          and where you want to be tomorrow.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="glass rounded-2xl p-8 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group border border-border/50 relative overflow-hidden animate-fade-up-delay-2">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
          <div className="w-14 h-14 rounded-xl bg-hero-gradient flex items-center justify-center text-primary-foreground mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
            <Lightbulb size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
          <p className="text-muted-foreground leading-relaxed text-base">
            To democratize career development by making personalized, AI-powered
            guidance accessible to everyone, regardless of background, location,
            or resources.
          </p>
          <div className="mt-6 flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all cursor-pointer">
            Read full story <ArrowRight size={16} />
          </div>
        </div>

        <div className="glass rounded-2xl p-8 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 group border border-border/50 relative overflow-hidden animate-fade-up-delay-3">
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-all duration-500" />
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-primary-foreground mb-6 shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform duration-300">
            <Target size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
          <p className="text-muted-foreground leading-relaxed text-base">
            A world where every professional has a clear, actionable path to
            their dream career, continually optimized by cutting-edge artificial
            intelligence.
          </p>
          <div className="mt-6 flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all cursor-pointer">
            Learn more <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;

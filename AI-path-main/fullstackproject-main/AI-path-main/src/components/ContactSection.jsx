import { useState } from "react";
import { Send, Users, Sparkles, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast({
        title: "Message sent!",
        description: "We'll get back to you shortly.",
      });
      e.target.reset();
      setTimeout(() => setSuccess(false), 3000);
    }, 1200);
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-hero-gradient opacity-5 rounded-full blur-[100px] -z-10" />

      <div className="section-container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-hero-gradient-subtle border border-primary/20 mb-6 animate-fade-up">
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm font-semibold text-primary">
                Let's Connect
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight animate-fade-up-delay-1">
              Get in <span className="text-gradient">Touch</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground animate-fade-up-delay-2">
              Have questions or want to collaborate? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-10 lg:gap-16">
            {/* Form Side */}
            <div className="md:col-span-3 animate-fade-up-delay-2">
              <div className="glass rounded-2xl p-8 shadow-xl border border-border/50">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">
                        First Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="John"
                        className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all backdrop-blur-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">
                        Last Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Doe"
                        className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="How can we help you?"
                      className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none backdrop-blur-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || success}
                    className={`w-full font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 
                      ${success ? "bg-green-500 text-white hover:bg-green-600" : "bg-hero-gradient text-white hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"}
                      disabled:opacity-80 disabled:cursor-not-allowed`}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : success ? (
                      <>
                        <CheckCircle2 size={18} />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Info Side */}
            <div className="md:col-span-2 space-y-8 animate-fade-up-delay-3">
              <div className="filter drop-shadow-sm">
                <div className="glass rounded-2xl p-8 border border-border/50">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <Users size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Team Members
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Asmit Sajwan",
                      "Sahil khan",
                      "Deepansh khare",
                      "Ramesh kumar",
                    ].map((name) => (
                      <li
                        key={name}
                        className="flex items-center gap-3 text-muted-foreground group"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all" />
                        <span className="font-medium group-hover:text-foreground transition-colors">
                          {name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Optional secondary info card can go here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

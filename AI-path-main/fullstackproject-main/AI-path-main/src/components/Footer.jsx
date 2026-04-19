import { Github, Linkedin, Twitter, Sparkles } from "lucide-react";

const Footer = () => (
  <footer className="bg-secondary/40 border-t border-border/60 pt-16 pb-8">
    <div className="section-container pb-12 grid grid-cols-1 md:grid-cols-4 gap-10">
      <div className="md:col-span-2">
        <a href="#home" className="flex items-center gap-2 group w-fit mb-4">
          <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center shadow-md">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-xl font-bold text-gradient tracking-tight">
            Campus Path AI
          </span>
        </a>
        <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
          Empowering professionals and students worldwide to navigate their
          careers with precision and confidence using AI.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:shadow-md transition-all"
          >
            <Twitter size={18} />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:shadow-md transition-all"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground hover:shadow-md transition-all"
          >
            <Github size={18} />
          </a>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-foreground mb-4">Navigation</h4>
        <ul className="space-y-3">
          <li>
            <a
              href="#home"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#how-it-works"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              How It Works
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-foreground mb-4">Legal</h4>
        <ul className="space-y-3">
          <li>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Cookie Policy
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="section-container border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Campus Path AI. All rights reserved.
      </p>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        Made with <span className="text-red-500 animate-pulse">❤</span> by the
        Team
      </div>
    </div>
  </footer>
);

export default Footer;

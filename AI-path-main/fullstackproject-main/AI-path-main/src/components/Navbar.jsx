import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-xl ${
        scrolled
          ? "bg-[#0A0A0F]/80 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between h-20 py-4">
        <Link to="/" className="flex items-center gap-3 group relative">
          <div className="absolute inset-0 bg-primary opacity-20 blur-xl rounded-full group-hover:opacity-40 transition-opacity duration-500" />
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-[0_4px_15px_rgba(138,43,226,0.3)] group-hover:shadow-[0_4px_25px_rgba(0,255,255,0.4)] transition-all duration-500 z-10">
            <Sparkles size={20} className="text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary z-10">
            Campus Path AI
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-2 bg-white/70 shadow-sm rounded-2xl border border-foreground/5 p-1.5 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="relative text-sm font-bold text-muted-foreground hover:text-foreground transition-all duration-300 px-5 py-2.5 rounded-xl hover:bg-black/5 group"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/student-signup"
            className="ml-3 font-bold bg-primary/10 text-primary hover:bg-primary hover:text-white px-6 py-2.5 rounded-xl transition-all duration-300 border border-primary/20 shadow-[0_4px_15px_rgba(138,43,226,0.15)] hover:shadow-[0_4px_25px_rgba(138,43,226,0.3)]"
          >
            Access Portal
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground p-2 rounded-xl bg-white/50 border border-foreground/10 hover:bg-white/80 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-foreground/5 px-4 pb-6 pt-4 space-y-3 shadow-[0_20px_40px_rgba(0,0,0,0.1)] animate-fade-up">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-base font-bold text-muted-foreground hover:text-primary transition-all duration-300 border-b border-foreground/5 hover:border-primary/30 hover:pl-4"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/student-signup"
            onClick={() => setOpen(false)}
            className="block text-center mt-6 w-full font-bold bg-primary/10 text-primary hover:bg-primary hover:text-white px-6 py-3.5 rounded-xl transition-all duration-300 border border-primary/20 shadow-[0_4px_15px_rgba(138,43,226,0.15)]"
          >
            Access Portal
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

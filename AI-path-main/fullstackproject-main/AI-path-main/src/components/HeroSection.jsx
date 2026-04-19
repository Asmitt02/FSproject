import { ArrowRight, Sparkles, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => (
  <section
    id="home"
    className="relative min-h-screen flex items-center overflow-hidden bg-background"
  >
    {/* High-tech animated backgrounds */}
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -left-20 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
      />

      <motion.div
        animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 -right-20 w-[700px] h-[700px] bg-secondary/15 rounded-full blur-[150px]"
      />

      <motion.div
        animate={{ y: [0, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px]"
      />

      {/* Cyber Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          perspective: "1000px",
        }}
      />

      {/* Horizon glow */}
      <div className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-primary/10 to-transparent" />
    </div>

    <div className="section-container relative z-10 pt-32 pb-20">
      <div className="max-w-5xl mx-auto text-center relative">
        {/* Floating Icons */}
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="hidden md:flex absolute top-10 -left-10 w-12 h-12 rounded-full glass items-center justify-center border border-primary/30 text-primary shadow-[0_0_15px_rgba(138,43,226,0.5)]"
        >
          <Zap size={20} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="hidden md:flex absolute top-32 -right-12 w-16 h-16 rounded-full glass items-center justify-center border border-secondary/30 text-secondary shadow-[0_0_20px_rgba(0,255,255,0.4)]"
        >
          <Globe size={28} />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 border border-primary/20 mb-8 shadow-[0_0_20px_rgba(138,43,226,0.15)] backdrop-blur-md"
        >
          <Sparkles size={16} className="text-primary animate-pulse" />
          <span className="text-sm font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase">
            v2.0 NEXT-GEN AI GUIDANCE
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl sm:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tighter text-foreground"
        >
          Design Your <br className="hidden sm:block" />
          <span className="relative inline-block mt-2">
            <span className="absolute -inset-2 blur-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-30 mix-blend-multiply rounded-full"></span>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              Future Path
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 text-xl sm:text-2xl text-foreground/80 leading-relaxed max-w-3xl mx-auto font-medium"
        >
          Transcend traditional learning. Experience a hyper-personalized,
          AI-driven roadmap that adapts in real-time to build your ultimate
          career.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            to="/student-signup"
            className="w-full sm:w-auto relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
            <div className="relative flex items-center justify-center gap-2 bg-white/90 backdrop-blur-md border border-primary/20 text-foreground font-bold px-8 py-4 rounded-xl hover:bg-white transition-all duration-300 text-lg shadow-xl shadow-primary/10">
              Initialize Sequence
              <ArrowRight
                size={20}
                className="group-hover:translate-x-2 group-hover:text-primary transition-all duration-300"
              />
            </div>
          </Link>

          <Link
            to="/features"
            className="w-full sm:w-auto glass bg-white/50 hover:bg-white/80 border border-foreground/10 font-bold px-8 py-4 rounded-xl transition-all duration-300 text-lg flex items-center justify-center gap-2 group shadow-lg shadow-black/5"
          >
            <Globe
              className="text-muted-foreground group-hover:text-secondary transition-colors"
              size={20}
            />
            <span className="text-foreground">Explore Network</span>
          </Link>
        </motion.div>

        {/* Cyber-styled Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            {
              value: "100K+",
              label: "Neural Connections",
              suffix: "active paths",
            },
            { value: "99.9%", label: "Precision Rate", suffix: "AI accuracy" },
            { value: "T+1", label: "Sync Speed", suffix: "real-time updates" },
          ].map((stat, idx) => (
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              key={stat.label}
              className="glass bg-white/60 p-6 rounded-2xl border-t border-l border-white/50 relative overflow-hidden group shadow-xl shadow-black/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50">
                {stat.value}
              </p>
              <p className="text-secondary font-bold text-sm mt-2 tracking-widest uppercase">
                {stat.label}
              </p>
              <p className="text-xs text-muted-foreground/70 font-mono mt-1">
                {stat.suffix}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-foreground/20 flex justify-center p-2 bg-white/50 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 15, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-secondary rounded-full"
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;

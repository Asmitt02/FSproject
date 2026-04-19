import { Fingerprint, Cpu, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Fingerprint,
    step: "01",
    title: "Biometric Data Input",
    description:
      "Securely synchronize your core skills, historical experience, and ultimate operational goals.",
    color: "from-primary to-blue-500",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Quantum Processing",
    description:
      "Our intelligence engine cross-references your profile against billions of real-time market data points.",
    color: "from-secondary to-teal-400",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Execute Protocol",
    description:
      "Deploy a hyper-personalized, adaptive skill-acquisition roadmap plotted to your precise success vector.",
    color: "from-accent to-pink-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const HowItWorksSection = () => (
  <section
    id="how-it-works"
    className="section-padding bg-slate-50 relative border-y border-foreground/5 overflow-hidden"
  >
    {/* Subtle grid background */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />

    <div className="section-container relative z-10">
      <div className="text-center max-w-4xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass bg-white border border-foreground/5 shadow-sm mb-6"
        >
          <span className="text-xs font-bold tracking-widest text-accent uppercase">
            Initialization Sequence
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black tracking-tighter text-foreground"
        >
          Protocol{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
            Activation
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto font-medium"
        >
          Three seamless phases to deploy your optimized career framework.
        </motion.p>
      </div>

      <div className="relative mt-24">
        {/* Connecting Data Stream */}
        <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-[2px] bg-foreground/5">
          <motion.div
            animate={{ x: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-secondary to-transparent blur-[2px]"
          />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-16 relative z-10"
        >
          {steps.map((s, i) => (
            <motion.div
              variants={item}
              key={s.step}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-10">
                {/* Hexagon glowing backdrop */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl rotate-45 group-hover:rotate-90 transition-transform duration-700 blur-xl opacity-50 group-hover:opacity-100" />

                <div
                  className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] relative z-10 transition-all duration-500 group-hover:-translate-y-4 group-hover:scale-110 before:absolute before:inset-[2px] before:bg-white before:rounded-[14px]`}
                >
                  <s.icon
                    size={44}
                    className="relative z-10 text-primary drop-shadow-sm group-hover:text-secondary transition-colors duration-500"
                  />
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.color} opacity-10 relative z-0`}
                  />
                </div>

                {/* Step Node */}
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white border border-foreground/10 flex items-center justify-center text-sm font-bold shadow-md z-20 text-foreground font-mono group-hover:border-secondary group-hover:text-secondary group-hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-colors duration-500">
                  {s.step}
                </div>
              </div>

              <h3 className="text-3xl font-black mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                {s.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-sm font-medium text-lg mx-auto">
                {s.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;

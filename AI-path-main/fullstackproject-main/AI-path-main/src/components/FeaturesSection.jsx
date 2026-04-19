import {
  Brain,
  BarChart3,
  Map,
  Activity,
  ShieldAlert,
  Cpu,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "Neural Pathing",
    description:
      "Adaptive learning algorithms mapping your optimal skill acquisition trajectory.",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description:
      "Real-time market data computing your highest-probability career success vectors.",
  },
  {
    icon: Map,
    title: "Dynamic Topography",
    description:
      "Your curriculum shifts instantaneously as you acquire new cognitive milestones.",
  },
  {
    icon: Activity,
    title: "Telemetry Sync",
    description:
      "Continuous monitoring of your bio-progress with granular performance metrics.",
  },
  {
    icon: ShieldAlert,
    title: "Vulnerability Scan",
    description:
      "Immediate detection of skill gaps with auto-generated mitigation protocols.",
  },
  {
    icon: Cpu,
    title: "Core Processing",
    description:
      "Deep-learning models processing millions of career outcomes to guide your choices.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const FeaturesSection = () => (
  <section
    id="features"
    className="section-padding bg-background relative overflow-hidden"
  >
    {/* Cybernetic Grid & Glows */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-secondary/5"></div>
    <motion.div
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 5, repeat: Infinity }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"
    />

    <div className="section-container text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-foreground/5 shadow-sm mb-6"
      >
        <Cpu size={14} className="text-secondary" />
        <span className="text-xs font-bold tracking-widest text-secondary uppercase">
          System Architecture
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-black tracking-tighter text-foreground"
      >
        Next-Gen{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
          Capabilities
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto font-medium"
      >
        Constructed with advanced neural networks, our system processes infinite
        variables to optimize your learning velocity.
      </motion.p>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((f, i) => (
          <motion.div
            variants={item}
            whileHover={{ y: -8, scale: 1.02 }}
            key={f.title}
            className="group relative glass bg-white/70 rounded-3xl p-8 text-left border border-foreground/5 overflow-hidden shadow-lg shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
          >
            {/* Hover Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Glowing Border Line */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="relative z-10 w-14 h-14 rounded-2xl bg-white border border-foreground/5 flex items-center justify-center text-primary mb-6 shadow-md shadow-primary/10 group-hover:shadow-[0_0_25px_rgba(138,43,226,0.3)] group-hover:text-secondary transition-all duration-500">
              <f.icon size={26} />
            </div>

            <h3 className="font-extrabold text-2xl text-foreground relative z-10 group-hover:text-primary transition-colors">
              {f.title}
            </h3>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed font-medium relative z-10 group-hover:text-foreground transition-colors duration-300">
              {f.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default FeaturesSection;

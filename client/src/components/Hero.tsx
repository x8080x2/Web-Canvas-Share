import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";

interface HeroProps {
  onApplyClick: () => void;
}

export function Hero({ onApplyClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-secondary/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-accent/20 blur-[100px] rounded-full mix-blend-screen" />
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-primary/30"
        >
          <Zap className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-sm md:text-base font-medium uppercase tracking-wider text-primary-foreground">
            Bang Energy Campaign
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black max-w-5xl leading-[1.1] mb-6"
        >
          Turn Your Vehicle Into A{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary text-glow">
            Paid Advertisement
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12"
        >
          Drivers, bikers and riders can earn monthly income by placing a branded sticker on their vehicle and helping promote our energy drink around the city.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          onClick={onApplyClick}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white bg-primary rounded-2xl overflow-hidden transition-all shadow-[0_0_40px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.6)]"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          <span>Apply Now</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* Decorative Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

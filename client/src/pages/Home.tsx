import { useRef } from "react";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Requirements } from "@/components/Requirements";
import { ApplicationForm } from "@/components/ApplicationForm";
import { motion } from "framer-motion";

export default function Home() {
  const formRef = useRef<HTMLElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
              B
            </div>
            <span>BANG<span className="text-primary">.</span></span>
          </div>
          <button 
            onClick={scrollToForm}
            className="hidden sm:inline-flex px-6 py-2.5 rounded-full font-bold bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all text-sm"
          >
            Apply Now
          </button>
        </div>
      </nav>

      <main>
        <Hero onApplyClick={scrollToForm} />
        
        {/* Scrolling Banner Strip */}
        <div className="w-full bg-primary/10 border-y border-primary/20 py-4 overflow-hidden flex whitespace-nowrap">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }} 
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex gap-16 items-center text-primary font-bold uppercase tracking-widest text-sm"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="flex items-center gap-16">
                <span>Drive & Earn</span>
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span>Get Paid Monthly</span>
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span>Brand Ambassador</span>
                <span className="w-2 h-2 rounded-full bg-primary"></span>
              </span>
            ))}
          </motion.div>
        </div>

        <HowItWorks />
        <Requirements />
        
        {/* Form Section */}
        <section ref={formRef} className="py-32 relative overflow-hidden scroll-mt-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ApplicationForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12 text-center bg-card">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Bang Energy Drive & Earn Campaign. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

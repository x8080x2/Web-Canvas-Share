import { useRef } from "react";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Requirements } from "@/components/Requirements";
import { ApplicationForm } from "@/components/ApplicationForm";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    question: "How much can I earn monthly?",
    answer: "Earnings vary based on your vehicle type and the mileage driven. On average, drivers earn between $200 to $500 per month."
  },
  {
    question: "Does the sticker damage my vehicle's paint?",
    answer: "No, we use high-quality vinyl wraps that are specifically designed for vehicles. They are safe for all factory paints and can be easily removed by our team."
  },
  {
    question: "How often do I get paid?",
    answer: "Payments are processed monthly via direct deposit or PayPal after verifying your campaign participation."
  },
  {
    question: "What happens if I get into an accident?",
    answer: "Please report any accidents to our team immediately. We will help you remove the damaged sticker and provide a replacement once your vehicle is repaired."
  }
];

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
          <Button 
            variant="ghost"
            onClick={scrollToForm}
            className="hidden sm:inline-flex px-6 py-2.5 rounded-full font-bold bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all text-sm"
          >
            Apply Now
          </Button>
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
        
        {/* FAQ Section */}
        <section className="py-24 bg-card/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-primary/50 text-primary">FAQ</Badge>
              <h2 className="text-4xl md:text-5xl font-black mb-4">Common Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about the program.</p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                  <AccordionTrigger className="text-left font-bold text-lg hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

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

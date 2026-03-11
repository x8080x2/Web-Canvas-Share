import { motion } from "framer-motion";
import { FileText, CheckCircle2, Package, Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    icon: FileText,
    title: "Apply Online",
    description: "Fill out the application form and submit your vehicle details.",
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: CheckCircle2,
    title: "Get Approved",
    description: "Our team reviews your application and verifies your documents.",
    color: "from-green-500 to-emerald-400"
  },
  {
    icon: Package,
    title: "Receive Kit",
    description: "You receive product samples and advertising stickers shipped to you.",
    color: "from-purple-500 to-accent"
  },
  {
    icon: Car,
    title: "Drive & Earn",
    description: "Place the sticker on your vehicle and earn monthly pay while driving.",
    color: "from-primary to-pink-400"
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">Process</Badge>
          <h2 className="text-4xl md:text-5xl font-black mb-4">How It Works</h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full shadow-[0_0_10px_hsl(var(--primary))]"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative group"
            >
              {/* Connector Line for Desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent z-0" />
              )}
              
              <Card className="glass-panel p-8 rounded-3xl h-full flex flex-col items-center text-center relative z-10 hover:border-primary/50 transition-colors duration-300 hover:box-glow bg-transparent">
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} blur-xl opacity-40 group-hover:opacity-60 transition-opacity`} />
                  <div className={`w-20 h-20 rounded-2xl bg-card border border-white/10 flex items-center justify-center relative z-10 overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-10`} />
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-foreground text-background font-bold flex items-center justify-center z-20 shadow-lg">
                    {index + 1}
                  </div>
                </div>
                
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="text-xl font-bold text-foreground">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

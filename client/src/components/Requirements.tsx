import { motion } from "framer-motion";
import { UserPlus, Bike, ShieldCheck, SmilePlus } from "lucide-react";

const requirements = [
  {
    icon: UserPlus,
    title: "18+ Age",
    description: "Applicants must be at least 18 years old to participate in the program."
  },
  {
    icon: Bike,
    title: "Vehicle",
    description: "You must own or lease a Car, Motorcycle, Truck, or Bicycle."
  },
  {
    icon: ShieldCheck,
    title: "Valid License",
    description: "A valid driver's license is required for all motor vehicles."
  },
  {
    icon: SmilePlus,
    title: "Positive Attitude",
    description: "Represent the brand professionally while out on the road."
  }
];

export function Requirements() {
  return (
    <section className="py-24 bg-card/30 relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">Campaign<br/>Requirements</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're looking for enthusiastic brand ambassadors. Make sure you meet these basic criteria before applying.
            </p>
            {/* abstract neon car tail light glowing driving past in dark cyberpunk city */}
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative h-64 w-full">
              <img 
                src="https://pixabay.com/get/gcb7ae5612c6d40b22e19042bcb7ab0e00657adbb5e886aa7c71db095d17cf0376f5aa6e431d031d92ec0471ab0682c251d6e94446d6567aa0b2ceee9a16be32c_1280.jpg" 
                alt="Neon styled car" 
                className="w-full h-full object-cover mix-blend-luminosity opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </div>
          </motion.div>

          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background/50 border border-white/5 p-6 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <req.icon className="w-6 h-6 text-secondary text-glow-cyan" />
                </div>
                <h3 className="text-xl font-bold mb-2">{req.title}</h3>
                <p className="text-muted-foreground">{req.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateApplication } from "@/hooks/use-applications";
import { Check, Loader2, AlertCircle } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  vehicleType: z.enum(["Car", "Motorcycle", "Bicycle", "Truck"], {
    required_error: "Please select a vehicle type",
  }),
  ageConfirmed: z.literal(true, {
    errorMap: () => ({ message: "You must confirm you are 18 or older" }),
  }),
});

type FormData = z.infer<typeof formSchema>;

export function ApplicationForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: submitApplication, isPending, error } = useCreateApplication();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    submitApplication(data, {
      onSuccess: () => {
        setIsSuccess(true);
        reset();
      },
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      {/* Decorative glows behind form */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-[2rem] blur opacity-20" />
      
      <div className="relative glass-panel rounded-3xl p-8 sm:p-12 shadow-2xl">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center text-center py-12"
            >
              <div className="w-24 h-24 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center mb-6">
                <Check className="w-12 h-12 text-green-400" />
              </div>
              <h3 className="text-3xl font-black mb-4">Application Received!</h3>
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for applying to the Bang Energy Drive & Earn Campaign. Our team will review your details and contact you shortly.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="px-8 py-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
              >
                Submit Another Application
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="text-center mb-10">
                <h3 className="text-3xl font-black mb-2">Driver Application</h3>
                <p className="text-muted-foreground">Join the squad and start earning today.</p>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{error.message}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80 ml-1">First Name</label>
                  <input
                    {...register("firstName")}
                    className={`w-full px-5 py-4 rounded-xl bg-input border ${errors.firstName ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-primary focus:ring-primary/20'} text-white placeholder:text-white/30 focus:outline-none focus:ring-4 transition-all`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-400 text-xs ml-1">{errors.firstName.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80 ml-1">Last Name</label>
                  <input
                    {...register("lastName")}
                    className={`w-full px-5 py-4 rounded-xl bg-input border ${errors.lastName ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-primary focus:ring-primary/20'} text-white placeholder:text-white/30 focus:outline-none focus:ring-4 transition-all`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-400 text-xs ml-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80 ml-1">Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    className={`w-full px-5 py-4 rounded-xl bg-input border ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-primary focus:ring-primary/20'} text-white placeholder:text-white/30 focus:outline-none focus:ring-4 transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs ml-1">{errors.email.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80 ml-1">Phone Number</label>
                  <input
                    {...register("phone")}
                    type="tel"
                    className={`w-full px-5 py-4 rounded-xl bg-input border ${errors.phone ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-primary focus:ring-primary/20'} text-white placeholder:text-white/30 focus:outline-none focus:ring-4 transition-all`}
                    placeholder="(555) 000-0000"
                  />
                  {errors.phone && <p className="text-red-400 text-xs ml-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-white/80 ml-1">Vehicle Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["Car", "Motorcycle", "Bicycle", "Truck"].map((type) => (
                    <label key={type} className="cursor-pointer relative">
                      <input
                        type="radio"
                        value={type}
                        {...register("vehicleType")}
                        className="peer sr-only"
                      />
                      <div className="px-4 py-4 rounded-xl border border-white/10 bg-input text-center font-medium text-white/70 peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:text-primary transition-all hover:bg-white/5">
                        {type}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.vehicleType && <p className="text-red-400 text-xs ml-1">{errors.vehicleType.message}</p>}
              </div>

              <div className="pt-4 pb-2">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-1">
                    <input
                      type="checkbox"
                      {...register("ageConfirmed")}
                      className="peer appearance-none w-6 h-6 border-2 border-white/20 rounded-md checked:bg-primary checked:border-primary transition-all cursor-pointer"
                    />
                    <Check className="w-4 h-4 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                  </div>
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors leading-relaxed">
                    I confirm I am 18 years or older and agree to place the advertisement sticker on my vehicle.
                  </span>
                </label>
                {errors.ageConfirmed && <p className="text-red-400 text-xs ml-10 mt-1">{errors.ageConfirmed.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-5 rounded-xl font-black text-lg text-white bg-gradient-to-r from-primary to-accent shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3 hover:-translate-y-1 active:translate-y-0"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

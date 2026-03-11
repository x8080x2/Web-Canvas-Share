import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateApplication } from "@/hooks/use-applications";
import { Check, Loader2, AlertCircle, Upload, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@shared/routes";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  idFront: z.string().min(1, "ID Front is required"),
  idBack: z.string().min(1, "ID Back is required"),
});

type FormData = z.infer<typeof formSchema>;

export function ApplicationForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploading, setUploading] = useState<{ idFront: boolean; idBack: boolean }>({
    idFront: false,
    idBack: false,
  });
  const { mutate: submitApplication, isPending, error } = useCreateApplication();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      ageConfirmed: false as any,
      idFront: "",
      idBack: "",
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "idFront" | "idBack") => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert("File size should be less than 15MB");
        return;
      }
      try {
        setUploading((prev) => ({ ...prev, [field]: true }));
        const body = new FormData();
        body.append("file", file);
        const res = await fetch(api.uploads.create.path, {
          method: api.uploads.create.method,
          body,
        });
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || "Failed to upload file");
        }
        const responseData = await res.json();
        const parsed = api.uploads.create.responses[201].parse(responseData);
        form.setValue(field, parsed.url);
      } catch (err) {
        alert(err instanceof Error ? err.message : "Failed to upload file");
      } finally {
        setUploading((prev) => ({ ...prev, [field]: false }));
      }
    }
  };

  const onSubmit = (data: FormData) => {
    submitApplication(data, {
      onSuccess: () => {
        setIsSuccess(true);
        form.reset();
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
              <Button
                variant="outline"
                onClick={() => setIsSuccess(false)}
                className="px-8 py-6 rounded-xl font-semibold bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
              >
                Submit Another Application
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center mb-10">
                <h3 className="text-3xl font-black mb-2">Driver Application</h3>
                <p className="text-muted-foreground">Join the squad and start earning today.</p>
              </div>

              {error && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/50 text-red-400 mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {error.message}
                  </AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} className="bg-white/5 border-white/10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} className="bg-white/5 border-white/10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} className="bg-white/5 border-white/10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="idFront"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID Front Side</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="idFrontInput"
                                onChange={(e) => handleFileUpload(e, "idFront")}
                              />
                              <label
                                htmlFor="idFrontInput"
                                className={cn(
                                  "flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed transition-all cursor-pointer bg-white/5",
                                  field.value ? "border-green-500/50 bg-green-500/5" : "border-white/10 hover:border-primary/50"
                                )}
                              >
                                {field.value ? (
                                  <>
                                    <FileCheck className="w-8 h-8 text-green-400 mb-2" />
                                    <span className="text-xs text-green-400 font-medium">Front Side Uploaded</span>
                                  </>
                                ) : uploading.idFront ? (
                                  <>
                                    <Loader2 className="w-8 h-8 text-muted-foreground mb-2 animate-spin" />
                                    <span className="text-xs text-muted-foreground font-medium text-center px-2">Uploading...</span>
                                  </>
                                ) : (
                                  <>
                                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                                    <span className="text-xs text-muted-foreground font-medium text-center px-2">Click to upload ID Front</span>
                                  </>
                                )}
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="idBack"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID Back Side</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="idBackInput"
                                onChange={(e) => handleFileUpload(e, "idBack")}
                              />
                              <label
                                htmlFor="idBackInput"
                                className={cn(
                                  "flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed transition-all cursor-pointer bg-white/5",
                                  field.value ? "border-green-500/50 bg-green-500/5" : "border-white/10 hover:border-primary/50"
                                )}
                              >
                                {field.value ? (
                                  <>
                                    <FileCheck className="w-8 h-8 text-green-400 mb-2" />
                                    <span className="text-xs text-green-400 font-medium">Back Side Uploaded</span>
                                  </>
                                ) : uploading.idBack ? (
                                  <>
                                    <Loader2 className="w-8 h-8 text-muted-foreground mb-2 animate-spin" />
                                    <span className="text-xs text-muted-foreground font-medium text-center px-2">Uploading...</span>
                                  </>
                                ) : (
                                  <>
                                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                                    <span className="text-xs text-muted-foreground font-medium text-center px-2">Click to upload ID Back</span>
                                  </>
                                )}
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 000-0000" {...field} className="bg-white/5 border-white/10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vehicleType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-white/10">
                              <SelectValue placeholder="Select vehicle type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-white/10">
                            <SelectItem value="Car">Car</SelectItem>
                            <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                            <SelectItem value="Bicycle">Bicycle</SelectItem>
                            <SelectItem value="Truck">Truck</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ageConfirmed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-white/5 p-4 bg-white/5">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            I confirm that I am at least 18 years old
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isPending || uploading.idFront || uploading.idBack}
                    className="w-full py-6 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

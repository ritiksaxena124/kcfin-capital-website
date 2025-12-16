"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, PhoneIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { BusinessTypeDropdown } from "./business-type-dropdown";
import { WhatHappenNext } from "./what-happen-next";

/* ---------------------------------- */
/* Options                             */
/* ---------------------------------- */

const businessTypes = [
  { value: "manufacturing", label: "Manufacturing" },
  { value: "trading", label: "Trading" },
  { value: "services", label: "Services" },
  { value: "retail", label: "Retail" },
  { value: "agriculture", label: "Agriculture" },
  { value: "construction", label: "Construction" },
  { value: "other", label: "Other" },
];

const preferredCalltime = [
  { value: "morning", label: "Morning (9 AM – 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 PM – 4 PM)" },
  { value: "evening", label: "Evening (4 PM – 7 PM)" },
  { value: "anytime", label: "Anytime" },
];

const annualTurnoverRange = [
  { value: "1-10L", label: "₹1L – ₹10L" },
  { value: "10L-50L", label: "₹10L – ₹50L" },
  { value: "50L-1Cr", label: "₹50L – ₹1Cr" },
  { value: "1Cr-5Cr", label: "₹1Cr – ₹5Cr" },
  { value: "5Cr+", label: "₹5Cr+" },
];

/* ---------------------------------- */
/* Schema                              */
/* ---------------------------------- */

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phoneNumber: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Invalid email"),
  businessType: z.string().min(1),
  turnoverRange: z.string().min(1),
  loanAmount: z.string().min(1),
  preferredCallTime: z.string().min(1),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

/* ---------------------------------- */
/* Component                           */
/* ---------------------------------- */

export const ExpertConsultation = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      businessType: "manufacturing",
      turnoverRange: "1-10L",
      loanAmount: "",
      preferredCallTime: "morning",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSubmitted(true);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------------------------- */
  /* Thank You State                    */
  /* ---------------------------------- */

  if (submitted) {
    return (
      <section className="bg-gradient-to-br from-[#16B364] to-[#22C55E] rounded-2xl p-8 text-white text-center">
        <div className="py-12 space-y-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
            <Phone className="w-8 h-8" />
          </div>

          <h2 className="text-3xl font-bold">Thank You!</h2>
          <p className="text-lg opacity-90">
            Your request has been submitted successfully.
          </p>
          <p className="opacity-80">
            Our financial expert will call you within 24 hours.
          </p>

          <Button
            variant="secondary"
            onClick={() => setSubmitted(false)}
            className="mt-6"
          >
            Submit Another Request
          </Button>
        </div>
      </section>
    );
  }

  /* ---------------------------------- */
  /* Form                               */
  /* ---------------------------------- */

  return (
    <section className="py-10 md:py-14 space-y-8" id="expert-consultation">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-light tracking-tighter">
          Request Expert Consultation
        </h2>
        <p className="text-zinc-600">
          Get personalized advice and the best loan offers for your business
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Full Name">
                <Input {...form.register("fullName")} />
              </Field>

              <Field label="Phone Number">
                <Input {...form.register("phoneNumber")} />
              </Field>

              <Field label="Email Address">
                <Input {...form.register("email")} />
              </Field>

              <Field label="Business Type">
                <Controller
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <BusinessTypeDropdown
                      options={businessTypes}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Field>

              <Field label="Annual Turnover Range">
                <Controller
                  control={form.control}
                  name="turnoverRange"
                  render={({ field }) => (
                    <BusinessTypeDropdown
                      options={annualTurnoverRange}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Field>

              <Field label="Required Loan Amount (₹)">
                <Input {...form.register("loanAmount")} />
              </Field>

              <Field label="Preferred Call Time">
                <Controller
                  control={form.control}
                  name="preferredCallTime"
                  render={({ field }) => (
                    <BusinessTypeDropdown
                      options={preferredCalltime}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Field>

              <div className="md:col-span-2">
                <Label>Additional Message (Optional)</Label>
                <Textarea {...form.register("message")} />
              </div>
            </div>

            <WhatHappenNext />

            <Button className="h-12 w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <PhoneIcon /> Request Expert Callback
                </>
              )}
            </Button>

            <p className="text-xs text-zinc-600 text-center">
              By submitting this form, you agree to our terms of service and
              privacy policy.
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

/* ---------------------------------- */
/* Helper                              */
/* ---------------------------------- */

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    {children}
  </div>
);

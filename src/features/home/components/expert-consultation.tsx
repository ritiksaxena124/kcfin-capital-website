"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { BusinessTypeDropdown } from "./business-type-dropdown";
import { WhatHappenNext } from "./what-happen-next";

const businessTypes = [
  {
    value: "manufacturing",
    label: "Manufacturing",
  },
  {
    value: "trading",
    label: "Trading",
  },
  {
    value: "services",
    label: "Services",
  },
  {
    value: "retail",
    label: "Retail",
  },
  {
    value: "other",
    label: "Other",
  },
];

const preferredCalltime = [
  {
    value: "morning",
    label: "Morning (9AM - 12 PM)",
  },
  {
    value: "afternoon",
    label: "Afternoon (12 PM - 3 PM)",
  },
  {
    value: "evening",
    label: "Evening (4 PM - 7 PM)",
  },
  {
    value: "anytime",
    label: "Anytime",
  },
];

const annualTurnoverRante = [
  {
    value: "1LTo10L",
    label: "1 L - 10 L",
  },
  {
    value: "10LTo50L",
    label: "10 L - 50 L",
  },
  {
    value: "50LTo1Cr",
    label: "50 L - 1 Cr",
  },
  {
    value: "1CrTo5Cr",
    label: "1 Cr - 5 Cr",
  },
  {
    value: "5CrPlus",
    label: "5 Cr+",
  },
];

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.email({ message: "Invalid email address" }),
  turnoverRange: z.string().min(1, { message: "Please select turnover range" }),
  preferredCallTime: z.string().min(1, {
    message: "Please select preferred call time",
  }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  businessType: z.string().min(1, { message: "Please select business type" }),
  loanAmount: z.string().min(1, { message: "Please enter loan amount" }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const ExpertConsultation = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      turnoverRange: "",
      preferredCallTime: "",
      phoneNumber: "",
      businessType: "",
      loanAmount: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted:", data);
  };

  return (
    <section className="py-10 md:py-14 space-y-8" id="expert-consultation">
      <div className="space-y-2">
        <h2 className="text-3xl text-center font-light tracking-tighter">
          Request Expert Consultation
        </h2>
        <p className="text-center text-zinc-600">
          Get personalized advice and the best loan offers for your business
        </p>
      </div>
      <Card>
        <CardContent className="">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input {...form.register("fullName")} />
                  {form.formState.errors.fullName && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.fullName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input {...form.register("email")} />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Annual Turnover Range</Label>
                  <Controller
                    control={form.control}
                    name="turnoverRange"
                    render={({ field }) => (
                      <BusinessTypeDropdown
                        options={annualTurnoverRante}
                        placeholder="Select Annual Turnover Range"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {form.formState.errors.turnoverRange && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.turnoverRange.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Preferred Call Time (₹)</Label>
                  <Controller
                    control={form.control}
                    name="preferredCallTime"
                    render={({ field }) => (
                      <BusinessTypeDropdown
                        options={preferredCalltime}
                        placeholder="Select Preferred Call Time"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {form.formState.errors.preferredCallTime && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.preferredCallTime.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input {...form.register("phoneNumber")} />
                  {form.formState.errors.phoneNumber && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.phoneNumber.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Business Type</Label>
                  <Controller
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <BusinessTypeDropdown
                        options={businessTypes}
                        placeholder="Select Business Type"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {form.formState.errors.businessType && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.businessType.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Required Loan Amount (₹)</Label>
                  <Input {...form.register("loanAmount")} />
                  {form.formState.errors.loanAmount && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.loanAmount.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Additional Message (Optional)</Label>
                  <Textarea {...form.register("message")} />
                </div>
              </div>
              <WhatHappenNext />
              <Button className="h-12 w-full" type="submit">
                <PhoneIcon />
                Request Expert Callback
              </Button>
              <p className="text-xs text-zinc-600 text-center">
                By submitting this form, you agree to our terms of service and
                privacy policy. We will not share your information with third
                parties.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

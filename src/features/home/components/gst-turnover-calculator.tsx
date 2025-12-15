"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalculatorIcon } from "lucide-react";
import { BusinessTypeDropdown } from "./business-type-dropdown";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

const formSchema = z.object({
  businessName: z
    .string()
    .min(2, { message: "Business Name must be at least 2 characters" }),
  gstNumber: z.string().optional(),
  businessType: z.string().min(1, { message: "Please select business type" }),
  monthlyTurnover: z
    .string()
    .min(1, { message: "Please enter monthly turnover" }),
  annualTurnover: z
    .string()
    .min(1, { message: "Please enter annual turnover" }),
});

type FormValues = z.infer<typeof formSchema>;

export const GSTTurnoverCalculator = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      gstNumber: "",
      businessType: "",
      monthlyTurnover: "",
      annualTurnover: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Eligibility Form Submitted:", data);
  };

  return (
    <section className="py-10 md:py-14 space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl text-center font-light tracking-tighter">
          GST Turnover Calculator
        </h2>
        <p className="text-center text-zinc-600">
          Calculate your GST liability and check loan eligibility
        </p>
      </div>
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input {...form.register("businessName")} />
                  {form.formState.errors.businessName && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.businessName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>GST Number (Optional)</Label>
                  <Input {...form.register("gstNumber")} />
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Monthly Turnover (₹)</Label>
                    <Input {...form.register("monthlyTurnover")} />
                    {form.formState.errors.monthlyTurnover && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.monthlyTurnover.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Annual Turnover (₹)</Label>
                    <Input {...form.register("annualTurnover")} />
                    {form.formState.errors.annualTurnover && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.annualTurnover.message}
                      </p>
                    )}
                  </div>
                </div>
                <Button className="h-12 w-full" type="submit">
                  Calculate GST & Eligibility
                </Button>
              </div>
            </form>
          </div>
          <div className="w-full h-full border-2 border-dashed rounded-md flex items-center">
            <Empty>
              <EmptyHeader>
                <CalculatorIcon width={40} height={40} />
                <EmptyTitle>Calculate Your GST Turnover</EmptyTitle>
                <EmptyDescription>
                  Enter your business details to calculate your GST turnover and
                  check loan eligibility.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

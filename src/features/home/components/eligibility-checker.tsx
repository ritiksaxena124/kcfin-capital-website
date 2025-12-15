"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { BusinessTypeDropdown } from "./business-type-dropdown";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const loanPurposeOptions = [
  {
    value: "workingCapital",
    label: "Working Capital",
  },
  {
    value: "equipment-purchase",
    label: "Equipment Purchase",
  },
  {
    value: "business-expansion",
    label: "Business Expansion",
  },
  {
    value: "inventory-financing",
    label: "Inventory Financing",
  },
  {
    value: "other",
    label: "Other",
  },
];

const formSchema = z.object({
  businessAge: z.string().min(1, { message: "Please enter business age" }),
  creditScore: z.string().min(1, { message: "Please enter credit score" }),
  monthlyRevenue: z
    .string()
    .min(1, { message: "Please enter monthly revenue" }),
  loanAmount: z.string().min(1, { message: "Please enter loan amount" }),
  loanPurpose: z.string().min(1, { message: "Please select loan purpose" }),
});

type FormValues = z.infer<typeof formSchema>;

export const EligibilityChecker = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessAge: "",
      creditScore: "",
      monthlyRevenue: "",
      loanAmount: "",
      loanPurpose: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Eligibility Check Submitted:", data);
  };

  return (
    <section className="py-10 md:py-14 space-y-8" id="eligibility-checker">
      <div className="space-y-2">
        <h2 className="text-3xl text-center font-light tracking-tighter">
          Check Your Loan Eligibility
        </h2>
        <p className="text-center text-zinc-600">
          Quick assessment to check your loan eligibility
        </p>
      </div>
      <Card>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium">
                    Business Age (in years)
                  </Label>
                  <Input
                    placeholder="e.g., 2"
                    {...form.register("businessAge")}
                  />
                  {form.formState.errors.businessAge && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.businessAge.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium">Credit Score</Label>
                  <Input
                    placeholder="e.g., 750"
                    {...form.register("creditScore")}
                  />
                  {form.formState.errors.creditScore && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.creditScore.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium">
                    Monthly Revenue (₹)
                  </Label>
                  <Input
                    placeholder="e.g., 10000"
                    {...form.register("monthlyRevenue")}
                  />
                  {form.formState.errors.monthlyRevenue && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.monthlyRevenue.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium ">
                    Required Loan Amount (₹)
                  </Label>
                  <Input
                    placeholder="e.g., 10000"
                    {...form.register("loanAmount")}
                  />
                  {form.formState.errors.loanAmount && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.loanAmount.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium">Loan Purpose</Label>
                  <Controller
                    control={form.control}
                    name="loanPurpose"
                    render={({ field }) => (
                      <BusinessTypeDropdown
                        options={loanPurposeOptions}
                        placeholder="Select Loan Purpose"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {form.formState.errors.loanPurpose && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.loanPurpose.message}
                    </p>
                  )}
                </div>
              </div>
              <Button className="h-12 w-full" type="submit">
                Check Eligibility
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

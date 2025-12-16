"use client";

import { useState } from "react";
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
import { AlertCircle, CalculatorIcon, TrendingUp } from "lucide-react";
import { BusinessTypeDropdown } from "./business-type-dropdown";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/* ---------------------------------- */
/* Constants                           */
/* ---------------------------------- */

const businessTypes = [
  { value: "manufacturing", label: "Manufacturing" },
  { value: "trading", label: "Trading" },
  { value: "services", label: "Services" },
  { value: "retail", label: "Retail" },
  { value: "other", label: "Other" },
];

/* ---------------------------------- */
/* Validation Schema                   */
/* ---------------------------------- */

const formSchema = z
  .object({
    businessName: z
      .string()
      .min(2, { message: "Business Name must be at least 2 characters" }),
    gstNumber: z.string().optional(),
    businessType: z.string().min(1, "Please select business type"),
    monthlyTurnover: z.string().optional(),
    annualTurnover: z.string().optional(),
  })
  .refine((data) => data.monthlyTurnover || data.annualTurnover, {
    message: "Enter either monthly or annual turnover",
    path: ["monthlyTurnover"],
  });

type FormValues = z.infer<typeof formSchema>;

type Results = {
  annualTurnover: number;
  gstLiability: number;
  eligibilityScore: "High" | "Medium" | "Low";
  recommendations: {
    loanAmount: string;
    interestRate: string;
    processingTime: string;
    features: string[];
  };
};

/* ---------------------------------- */
/* Component                           */
/* ---------------------------------- */

export const GSTTurnoverCalculator = () => {
  const [results, setResults] = useState<Results | null>(null);
  const [loading, setLoading] = useState(false);

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

  /* ---------------------------------- */
  /* Helpers                            */
  /* ---------------------------------- */

  const getRecommendations = (turnover: number) => {
    if (turnover >= 5_000_000) {
      return {
        loanAmount: "₹50L - ₹5Cr",
        interestRate: "9.5% - 11.5%",
        processingTime: "3–5 business days",
        features: [
          "No collateral required",
          "Flexible repayment",
          "Quick disbursement",
        ],
      };
    }

    if (turnover >= 2_000_000) {
      return {
        loanAmount: "₹20L - ₹2Cr",
        interestRate: "11% - 13%",
        processingTime: "5–7 business days",
        features: [
          "Minimal documentation",
          "Competitive rates",
          "Expert guidance",
        ],
      };
    }

    return {
      loanAmount: "₹5L - ₹50L",
      interestRate: "12% - 15%",
      processingTime: "7–10 business days",
      features: ["Easy approval", "Small business friendly", "Growth support"],
    };
  };

  /* ---------------------------------- */
  /* Submit Handler                     */
  /* ---------------------------------- */

  const onSubmit = (data: FormValues) => {
    setLoading(true);

    setTimeout(() => {
      const monthly = Number(data.monthlyTurnover || 0);
      const annual = Number(data.annualTurnover) || monthly * 12;

      const gstLiability = annual * 0.18;

      const eligibilityScore =
        annual >= 2_000_000 ? "High" : annual >= 500_000 ? "Medium" : "Low";

      setResults({
        annualTurnover: annual,
        gstLiability,
        eligibilityScore,
        recommendations: getRecommendations(annual),
      });

      setLoading(false);
    }, 1500);
  };

  /* ---------------------------------- */
  /* UI                                 */
  /* ---------------------------------- */

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
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FORM */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label>Business Name</Label>
              <Input {...form.register("businessName")} />
              <p className="text-sm text-red-500">
                {form.formState.errors.businessName?.message}
              </p>
            </div>

            <div className="space-y-2">
              <Label>GST Number (Optional)</Label>
              <Input {...form.register("gstNumber")} />
            </div>

            <div className="space-y-2">
              <Label>Business Type</Label>
              <Controller
                name="businessType"
                control={form.control}
                render={({ field }) => (
                  <BusinessTypeDropdown
                    options={businessTypes}
                    placeholder="Select Business Type"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <p className="text-sm text-red-500">
                {form.formState.errors.businessType?.message}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Monthly Turnover (₹)</Label>
                <Input {...form.register("monthlyTurnover")} />
              </div>

              <div className="space-y-2">
                <Label>Annual Turnover (₹)</Label>
                <Input {...form.register("annualTurnover")} />
              </div>
            </div>

            <Button className="h-12 w-full" disabled={loading}>
              {loading ? "Calculating..." : "Calculate GST & Eligibility"}
              <TrendingUp className="ml-2 h-4 w-4" />
            </Button>
          </form>

          {/* RESULTS */}
          {!results ? (
            <div className="border-2 border-dashed rounded-md flex items-center justify-center">
              <Empty>
                <EmptyHeader>
                  <CalculatorIcon width={40} height={40} />
                  <EmptyTitle>Calculate Your GST</EmptyTitle>
                  <EmptyDescription>
                    Enter details to see GST liability and loan eligibility
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Your Results</h3>

              <Card>
                <CardContent className="space-y-2 pt-6">
                  <p>
                    <strong>Annual Turnover:</strong> ₹
                    {results.annualTurnover.toLocaleString()}
                  </p>
                  <p>
                    <strong>GST Liability:</strong> ₹
                    {results.gstLiability.toLocaleString()}
                  </p>
                </CardContent>
              </Card>

              <div
                className={`flex items-center gap-2 rounded-md p-3 text-sm ${
                  results.eligibilityScore === "High"
                    ? "bg-green-100 text-green-700"
                    : results.eligibilityScore === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <AlertCircle className="h-4 w-4" />
                Eligibility Score: {results.eligibilityScore}
              </div>

              <Card>
                <CardContent className="space-y-2 pt-6">
                  <p>
                    <strong>Loan Amount:</strong>{" "}
                    {results.recommendations.loanAmount}
                  </p>
                  <p>
                    <strong>Interest Rate:</strong>{" "}
                    {results.recommendations.interestRate}
                  </p>
                  <p>
                    <strong>Processing Time:</strong>{" "}
                    {results.recommendations.processingTime}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

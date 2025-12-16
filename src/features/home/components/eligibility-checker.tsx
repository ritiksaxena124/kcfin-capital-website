"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { BusinessTypeDropdown } from "./business-type-dropdown";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/* ---------------------------------- */
/* Constants                           */
/* ---------------------------------- */

const loanPurposeOptions = [
  { value: "workingCapital", label: "Working Capital" },
  { value: "equipment-purchase", label: "Equipment Purchase" },
  { value: "business-expansion", label: "Business Expansion" },
  { value: "inventory-financing", label: "Inventory Financing" },
  { value: "other", label: "Other" },
];

/* ---------------------------------- */
/* Validation Schema                   */
/* ---------------------------------- */

const formSchema = z.object({
  businessAge: z.string().min(1, "Please enter business age"),
  creditScore: z.string().min(1, "Please enter credit score"),
  monthlyRevenue: z.string().min(1, "Please enter monthly revenue"),
  loanAmount: z.string().min(1, "Please enter loan amount"),
  loanPurpose: z.string().min(1, "Please select loan purpose"),
});

type FormValues = z.infer<typeof formSchema>;

type EligibilityResult = {
  score: number;
  status: "Excellent" | "Good" | "Fair" | "Poor";
  recommendations: {
    message: string;
    benefits: string[];
    nextSteps: string[];
  };
};

/* ---------------------------------- */
/* Component                           */
/* ---------------------------------- */

export const EligibilityChecker = () => {
  const [result, setResult] = useState<EligibilityResult | null>(null);

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

  /* ---------------------------------- */
  /* Eligibility Logic                  */
  /* ---------------------------------- */

  const calculateScore = (data: FormValues) => {
    let score = 0;

    const businessAge = Number(data.businessAge);
    const creditScore = Number(data.creditScore);
    const revenue = Number(data.monthlyRevenue);
    const loanAmount = Number(data.loanAmount);

    // Business age
    if (businessAge >= 3) score += 25;
    else if (businessAge >= 1) score += 15;
    else score += 5;

    // Credit score
    if (creditScore >= 750) score += 30;
    else if (creditScore >= 700) score += 25;
    else if (creditScore >= 650) score += 15;
    else score += 5;

    // Revenue
    if (revenue >= 1_000_000) score += 25;
    else if (revenue >= 500_000) score += 20;
    else if (revenue >= 100_000) score += 15;
    else score += 5;

    // Loan to revenue ratio
    const ratio = loanAmount / revenue;
    if (ratio <= 6) score += 20;
    else if (ratio <= 12) score += 15;
    else score += 5;

    return Math.min(score, 100);
  };

  const getRecommendations = (score: number) => {
    if (score >= 75) {
      return {
        message:
          "Excellent! You qualify for our best rates and highest loan amounts.",
        benefits: [
          "Premium interest rates",
          "High loan amounts",
          "Quick approval",
          "No collateral required",
        ],
        nextSteps: [
          "Submit detailed application",
          "Upload required documents",
          "Approval in 24–48 hours",
        ],
      };
    }

    if (score >= 50) {
      return {
        message: "Good eligibility! You qualify for competitive loan options.",
        benefits: [
          "Competitive rates",
          "Moderate loan amounts",
          "Flexible repayment",
          "Standard processing",
        ],
        nextSteps: [
          "Submit application",
          "Provide business documents",
          "Approval in 3–5 days",
        ],
      };
    }

    return {
      message:
        "Limited eligibility. Improve your profile for better loan terms.",
      benefits: [
        "Basic loan options",
        "Higher interest rates",
        "Collateral may be required",
        "Extended processing time",
      ],
      nextSteps: [
        "Improve credit score",
        "Increase monthly revenue",
        "Consider secured loans",
      ],
    };
  };

  /* ---------------------------------- */
  /* Submit                             */
  /* ---------------------------------- */

  const onSubmit = (data: FormValues) => {
    const score = calculateScore(data);

    setResult({
      score,
      status:
        score >= 75
          ? "Excellent"
          : score >= 50
          ? "Good"
          : score >= 25
          ? "Fair"
          : "Poor",
      recommendations: getRecommendations(score),
    });
  };

  /* ---------------------------------- */
  /* UI                                 */
  /* ---------------------------------- */

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
        <CardContent className="pt-6 space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="businessAge"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Business Age (years)</Label>
                      <FormControl>
                        <Input placeholder="e.g., 2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="creditScore"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Credit Score</Label>
                      <FormControl>
                        <Input placeholder="e.g., 750" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="monthlyRevenue"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Monthly Revenue (₹)</Label>
                      <FormControl>
                        <Input placeholder="e.g., 500000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="loanAmount"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Required Loan Amount (₹)</Label>
                      <FormControl>
                        <Input placeholder="e.g., 2000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="loanPurpose"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Loan Purpose</Label>
                      <FormControl>
                        <BusinessTypeDropdown
                          options={loanPurposeOptions}
                          placeholder="Select Loan Purpose"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button className="h-12 w-full" type="submit">
                Check Eligibility
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* RESULTS */}
      {result && (
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="text-center space-y-2">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
                  result.score >= 75
                    ? "bg-green-100 text-green-700"
                    : result.score >= 50
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <span className="text-2xl font-bold">{result.score}%</span>
              </div>

              <h3 className="text-xl font-semibold">
                {result.status} Eligibility
              </h3>

              <p className="text-zinc-600">{result.recommendations.message}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Your Benefits</h4>
                <ul className="space-y-2">
                  {result.recommendations.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Next Steps</h4>
                <ul className="space-y-2">
                  {result.recommendations.nextSteps.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-blue-600" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

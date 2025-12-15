import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, PhoneIcon } from "lucide-react";
import { NavigationBtn } from "./navigation-btn";
import { PerformanceMetrics } from "./performance-metrics";

export const HeroSection = () => {
  return (
    <div className="py-10 md:py-0 md:h-dvh w-full flex flex-col items-center justify-center md:gap-12 gap-8">
      <div className="w-full space-y-6 md:space-y-8">
        <h1 className="text-4xl md:text-6xl text-center font-light text-zinc-800 tracking-tighter">
          Get the{" "}
          <span className="font-medium text-[#024577]">
            Best Financial Solutions
          </span>{" "}
          for Your Business
        </h1>
        <p className="text-center text-base md:text-xl text-zinc-600">
          Check your GST turnover, get instant eligibility results, and connect
          with our experts to secure the best financial offers for your business
          growth.
        </p>
        <div className="w-full flex flex-col md:flex-row gap-4 justify-center">
          <NavigationBtn
            variant="default"
            label="Check Your Eligibility"
            icon={<ArrowRight />}
            link="#eligibility-checker"
          />
          <NavigationBtn
            variant="outline"
            label="Request Callback"
            icon={<PhoneIcon />}
            link="#expert-consultation"
          />
        </div>
      </div>
      <Separator />
      <PerformanceMetrics />
      <Separator />
    </div>
  );
};

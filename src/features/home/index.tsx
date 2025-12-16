import { EligibilityChecker } from "./components/eligibility-checker";
import { ExpertConsultation } from "./components/expert-consultation";
import { Footer } from "./components/footer";
import { GSTTurnoverCalculator } from "./components/gst-turnover-calculator";
import { HeroSection } from "./components/hero-section";
import TrustIndicators from "./components/trust-indicators";
import { WhyChooseUs } from "./components/why-choose-us";

export const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Noise Texture (Darker Dots) Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className=" min-h-screen font-sans dark:bg-black relative">
        <main className="max-w-5xl w-full px-4 mx-auto bg-white border-2 border-dashed">
          <HeroSection />
          <WhyChooseUs />
          <EligibilityChecker />
          <TrustIndicators />
          <GSTTurnoverCalculator />
          <ExpertConsultation />
        </main>
      </div>
    </div>
  );
};

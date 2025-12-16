import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, ShieldCheck, TrendingUp } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    description:
      "We believe financial decisions should be clear, honest, and free from hidden surprises.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Every recommendation we make is aligned with your business needs — not commissions.",
  },
  {
    icon: TrendingUp,
    title: "Growth Focused",
    description:
      "We help MSMEs grow sustainably with the right financial support at the right time.",
  },
];

export default function AboutPage() {
  return (
    <section className="py-14 md:py-20 space-y-16">
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center space-y-4 px-4">
        <h1 className="text-4xl md:text-6xl font-light tracking-tighter text-zinc-800">
          Empowering Businesses with{" "}
          <span className="font-medium text-[#024577]">Smarter Financing</span>
        </h1>
        <p className="text-zinc-600 text-base md:text-xl">
          We help Indian businesses find the right loan solutions — faster,
          simpler, and completely transparent.
        </p>
      </div>

      {/* Who We Are */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-4">
        <div className="space-y-4">
          <h2 className="text-3xl font-light tracking-tighter text-zinc-800">
            Who We Are
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            We are a financial advisory platform designed to simplify access to
            business loans for MSMEs, startups, and growing enterprises across
            India.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            Instead of navigating complex bank processes and endless paperwork,
            we act as your trusted financing partner — helping you connect with
            verified lenders and suitable loan products.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-medium text-zinc-800">What We Do</h3>
            <ul className="space-y-3 text-sm text-zinc-700">
              {[
                "Assess your business loan eligibility",
                "Match you with suitable lenders & loan products",
                "Help compare interest rates and repayment terms",
                "Guide you through documentation & approvals",
                "Ensure fast and hassle-free processing",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Mission */}
      <div className="bg-zinc-50 py-14">
        <div className="max-w-5xl mx-auto text-center space-y-4 px-4">
          <h2 className="text-3xl font-light tracking-tighter text-zinc-800">
            Our Mission
          </h2>
          <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
            To make business financing accessible, transparent, and stress-free
            for every entrepreneur — from first-time founders to established
            enterprises.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-light tracking-tighter text-zinc-800">
            Our Core Values
          </h2>
          <p className="text-zinc-600">
            Principles that guide every interaction and recommendation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardContent className="p-6 space-y-3">
                <Icon className="h-8 w-8 text-[#024577]" />
                <h3 className="text-lg font-medium text-zinc-800">{title}</h3>
                <p className="text-sm text-zinc-600">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-5xl mx-auto text-center space-y-5 px-4">
        <h2 className="text-3xl font-light tracking-tighter text-zinc-800">
          Why Businesses Choose Us
        </h2>
        <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
          We don’t just help you get a loan — we help you choose the right one.
        </p>
        <p className="text-zinc-600">
          With expert guidance, multiple lender options, and a simplified
          process, we ensure you save time, effort, and money.
        </p>
      </div>
    </section>
  );
}

import { Shield, Award, Users, Clock } from "lucide-react";

export default function TrustIndicators() {
  const certifications = [
    {
      name: "RBI Registered",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Reserve_Bank_of_India_Logo.svg",
    },
    { name: "ISO 27001", logo: "https://www.create.xyz/images/logoipsum/371" },
    {
      name: "NBFC License",
      logo: "https://www.create.xyz/images/logoipsum/371",
    },
    {
      name: "SSL Secured",
      logo: "https://www.create.xyz/images/logoipsum/371",
    },
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Customers" },
    { icon: Award, value: "₹500Cr+", label: "Loans Disbursed" },
    { icon: Clock, value: "24 Hours", label: "Average Processing" },
    { icon: Shield, value: "99.9%", label: "Security Rating" },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      business: "Manufacturing Company",
      rating: 5,
      text: "KCfin Capital helped us get a loan in just 3 days. The process was smooth and rates were competitive.",
    },
    {
      name: "Priya Sharma",
      business: "Trading Business",
      rating: 5,
      text: "Excellent service! Their team guided us through every step and we got the best deal in the market.",
    },
    {
      name: "Amit Patel",
      business: "Service Industry",
      rating: 5,
      text: "Professional and trustworthy. They delivered exactly what they promised. Highly recommended!",
    },
  ];

  return (
    <>
      {/* Trust Statistics */}
      <section className="py-10 md:py-14 space-y-8">
        <h2 className="text-2xl md:text-3xl font-light text-center text-zinc-800 tracking-tighter mb-10">
          Trusted by Thousands of Businesses
        </h2>
        <div className="bg-white rounded-xl border p-8 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                {/* Using the original prominent blue gradient for visual effect */}
                <div className="w-16 h-16 bg-gradient-to-br from-[#4B6AFF] to-[#6B7FE8] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>

                {/* Stat Value: prominent text-zinc-800 and font-medium (similar to HeroSection's highlight) */}
                <div className="text-2xl font-medium text-zinc-800">
                  {stat.value}
                </div>

                {/* Stat Label: subtle text-zinc-600 (similar to HeroSection's paragraph) */}
                <div className="text-sm text-zinc-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 space-y-8">
        {/* Certifications */}
        <h2 className="text-2xl md:text-3xl font-light text-center text-zinc-800 tracking-tighter mb-10">
          Security & Certifications
        </h2>
        <div className="bg-white rounded-xl border p-8 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                {/* Light background for the logo box */}
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 border">
                  <img
                    src={cert.logo}
                    alt={cert.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>

                {/* Certification Name: text-zinc-800, slightly emphasized */}
                <div className="text-sm font-medium text-zinc-800">
                  {cert.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 md:py-14 space-y-8">
        <h2 className="text-2xl md:text-3xl font-light text-center text-zinc-800 tracking-tighter mb-10">
          What Our Customers Say
        </h2>
        <div className="bg-white rounded-xl border p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-zinc-50 rounded-lg p-6 border" // Using bg-zinc-50 for a subtle background, with a border
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500" // Slightly adjusted yellow for better contrast
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial text: text-zinc-600, not italic */}
                <p className="text-base text-zinc-600 mb-4">
                  “{testimonial.text}”
                </p>

                <div>
                  {/* Name: text-zinc-800, font-medium */}
                  <div className="font-medium text-zinc-800">
                    {testimonial.name}
                  </div>
                  {/* Business: text-zinc-500, small size */}
                  <div className="text-xs text-zinc-500">
                    {testimonial.business}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

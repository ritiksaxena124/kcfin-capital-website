import { CheckMarkIcon } from "@/assets/svg/checkmark";

export const WhyChooseUs = () => {
  return (
    <section className="py-10 md:pt-0 md:pb-14 space-y-8">
      <h2 className="text-3xl text-center font-light tracking-tighter">
        Why Choose Us?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <CheckMarkIcon />
          <p>Quick GST turnover analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <CheckMarkIcon />
          <p>Instant eligibility assessment</p>
        </div>
        <div className="flex items-center gap-2">
          <CheckMarkIcon />
          <p>Personalized financial solutions</p>
        </div>
        <div className="flex items-center gap-2">
          <CheckMarkIcon />
          <p>Expert consultation included</p>
        </div>
        <div className="flex items-center gap-2">
          <CheckMarkIcon />
          <p>Competitive interest rates</p>
        </div>
        <div className="flex items-center gap-2">
          <CheckMarkIcon />
          <p>24/7 customer support</p>
        </div>
      </div>
    </section>
  );
};

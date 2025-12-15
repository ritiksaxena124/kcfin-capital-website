import { ClockIcon } from "lucide-react";

export const WhatHappenNext = () => {
  return (
    <div className="space-y-2 p-4 rounded-md border border-zinc-200">
      <div className="flex items-center gap-2">
        <ClockIcon width={20} height={20} />
        <h4 className="font-medium">What happens next?</h4>
      </div>
      <ul className="list-disc text-sm space-y-1 pl-12 text-zinc-600">
        <li>Our expert will call you within 24 hours</li>
        <li>We'll analyze your business profile and requirements</li>
        <li>You'll receive personalized loan recommendations</li>
        <li>We'll guide you through the application process</li>
      </ul>
    </div>
  );
};

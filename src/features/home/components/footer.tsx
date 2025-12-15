import { Separator } from "@/components/ui/separator";
import { CalculatorIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-[#024577] text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 py-8">
        <div className="space-y-2">
          <div className="flex gap-2">
            <CalculatorIcon />
            <Separator className="h-full" orientation="vertical" />
            <p className="uppercase text-sm text-zinc-200">
              Smart Loans. Strong Future.
            </p>
          </div>
          <p className="text-sm text-zinc-200">
            Your trusted partner for business growth. We provide quick,
            reliable, and competitive financial solutions to help your business
            thrive.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full space-y-2">
            <p className="font-medium">Quick Links</p>
            <ul className="text-sm text-zinc-200 space-y-2">
              <li className="hover:text-zinc-100 hover:underline">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-zinc-100 hover:underline">
                <Link href="#">GST Calculator</Link>
              </li>
              <li className="hover:text-zinc-100 hover:underline">
                <Link href="#">Eligibility Checker</Link>
              </li>
              <li className="hover:text-zinc-100 hover:underline">
                <Link href="#">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="w-full space-y-2">
            <p className="font-medium">Contact Info</p>
            <ul className="text-sm text-zinc-200 space-y-2 w-full">
              <li>📞 +91 98290 05969</li>
              <li>📞 +91 97611 79240</li>
              <li>📧 info@kcfincapital.com</li>
              <li>📍 Noorpur Bastaur Road, Chandausi Road</li>
              <li>📍 Gagan Tiraha, Moradabad</li>
              <li>📍 Uttar Pradesh - 244001</li>
              <li>🕐 Mon-Sat: 9 AM - 7 PM</li>
            </ul>
          </div>
        </div>
      </div>
      <Separator className="bg-zinc-200/40" />
      <p className="text-center py-4 text-sm text-white">
        © {currentYear} KCFin Capital. All rights reserved.
      </p>
    </footer>
  );
};

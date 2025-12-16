"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  //   { label: "About", href: "/about" },
  { label: "Eligibility", href: "#eligibility-checker" },
  { label: "Contact", href: "#expert-consultation" },
];

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-16 h-16 overflow-hidden">
            <Image
              src={"/logo.webp"}
              width={100}
              height={100}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          className="md:hidden inline-flex items-center justify-center rounded-md border p-2"
          onClick={() => setOpen(!open)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden border-t bg-white transition-all",
          open ? "block" : "hidden"
        )}
      >
        <div className="px-4 py-4 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-zinc-700 hover:text-zinc-900"
            >
              {item.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <Button variant="outline">Check Eligibility</Button>
            <Button>
              <PhoneCall className="mr-2 h-4 w-4" />
              Request Callback
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

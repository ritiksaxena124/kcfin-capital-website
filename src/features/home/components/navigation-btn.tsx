"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
type Props = {
  variant?: "outline" | "default";
  label?: string;
  icon?: React.ReactNode;
  link: string;
};
export const NavigationBtn = ({ variant, label, icon, link }: Props) => {
  const router = useRouter();
  return (
    <Button
      variant={variant || "default"}
      className="h-12"
      onClick={() => {
        router.push(link);
      }}
    >
      {label} {icon}
    </Button>
  );
};

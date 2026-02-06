import { cn } from "@/lib/utils";

export default function NavbarResolver({ className }: { className?: string }) {
  return <div className={cn("pt-50", className)} />;
}

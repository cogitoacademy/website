import { cn } from "@/lib/utils";

export default function NavbarResolver({ className }: { className?: string }) {
  return <div className={cn("py-10", className)} />;
}

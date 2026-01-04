"use client";

import { MotionProvider } from "./motion-provider";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MotionProvider>
        {children}
        <Toaster richColors />
      </MotionProvider>
    </ThemeProvider>
  );
}

'use client';

import { LocaleAlternateProvider } from './locale-alternate';
import { MotionProvider } from './motion-provider';
import { ThemeProvider } from './theme-provider';
import { Toaster } from './ui/sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <MotionProvider>
        <LocaleAlternateProvider>{children}</LocaleAlternateProvider>
        <Toaster richColors />
      </MotionProvider>
    </ThemeProvider>
  );
}

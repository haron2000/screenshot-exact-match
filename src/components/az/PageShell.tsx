import type { ReactNode } from "react";
import { AppHeader } from "./AppHeader";

export function PageShell({ children, narrow }: { children: ReactNode; narrow?: boolean }) {
  return (
    <div className="min-h-screen bg-hero">
      <AppHeader />
      <main className={`mx-auto px-4 py-8 sm:px-6 sm:py-12 ${narrow ? "max-w-3xl" : "max-w-6xl"}`}>
        {children}
      </main>
      <footer className="mx-auto max-w-6xl px-6 pb-8 text-center text-xs text-muted-foreground">
        Unofficial AZ-900 learning companion. Not affiliated with Microsoft.
      </footer>
    </div>
  );
}

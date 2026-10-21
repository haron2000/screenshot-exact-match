import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/az/Logo";
import { Card } from "@/components/az/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AZ-Ready — Adaptive AZ-900 learning companion" },
      { name: "description", content: "Know what you know. Fix what you don't. An adaptive AZ-900 study companion that finds your weak areas and helps you fix them." },
      { property: "og:title", content: "AZ-Ready — Adaptive AZ-900 learning companion" },
      { property: "og:description", content: "Assess your knowledge, understand mistakes and practice your weakest AZ-900 topics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: "🎯", title: "Assess", text: "Measure your understanding across the AZ-900 learning areas." },
  { icon: "🧠", title: "Understand", text: "Get clear explanations when you make a mistake." },
  { icon: "📊", title: "Improve", text: "Focus your study time where you need it most." },
];

const loop = ["Assessment", "Feedback", "Weakness Detection", "Targeted Practice", "Readiness"];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-hero">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid" />
      <header className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
          Go to dashboard →
        </Link>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
        <section className="mx-auto max-w-3xl text-center">
          <p className="mb-6 inline-block rounded-full border border-border bg-card/60 px-4 py-1.5 font-display text-xs font-semibold tracking-[0.3em] text-cyan">
            AZ-READY
          </p>
          <h1 className="text-4xl font-bold leading-[1.05] sm:text-6xl">
            Know what you know.
            <br />
            <span className="text-brand">Fix what you don't.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            An adaptive AZ-900 learning companion that helps you understand your weak areas, learn from mistakes and prepare with purpose.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="hero" size="lg">
              <Link to="/diagnostic">
                Start Diagnostic <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link to="/topics">Explore Topics</Link>
            </Button>
          </div>
        </section>

        <ol aria-label="How AZ-Ready works" className="mx-auto mt-16 flex max-w-4xl flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
          {loop.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-muted-foreground">{step}</span>
              {i < loop.length - 1 && <span aria-hidden className="text-primary">→</span>}
            </li>
          ))}
        </ol>

        <section className="mt-16 grid gap-4 md:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="transition-transform hover:-translate-y-1">
              <span className="text-3xl" aria-hidden>{f.icon}</span>
              <h2 className="mt-4 text-xl font-semibold">{f.title}</h2>
              <p className="mt-2 text-muted-foreground">{f.text}</p>
            </Card>
          ))}
        </section>

        <p className="mt-16 text-center text-xs text-muted-foreground">
          Unofficial AZ-900 learning companion. Not affiliated with Microsoft.
        </p>
      </main>
    </div>
  );
}

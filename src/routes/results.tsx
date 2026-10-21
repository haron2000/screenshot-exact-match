import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Trophy, AlertTriangle } from "lucide-react";
import { PageShell } from "@/components/az/PageShell";
import {
  Card,
  PriorityBadge,
  ProgressBar,
  ReadinessRing,
  toneText,
} from "@/components/az/primitives";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/use-progress";
import {
  getPriority,
  overallReadiness,
  scoreByCategory,
  strongest,
  weakest,
} from "@/lib/readiness";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Your Readiness — AZ-Ready" },
      {
        name: "description",
        content: "See your AZ-900 readiness, strongest area and focus area after the diagnostic.",
      },
      { property: "og:title", content: "Your Readiness — AZ-Ready" },
      {
        property: "og:description",
        content: "Your AZ-900 readiness broken down by learning area.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Results,
});

function Results() {
  const { attempts, ready } = useProgress();
  if (!ready)
    return (
      <PageShell narrow>
        <div className="h-72 animate-pulse rounded-2xl bg-card" />
      </PageShell>
    );

  if (attempts.length === 0) {
    return (
      <PageShell narrow>
        <Card className="text-center">
          <h1 className="text-2xl font-bold">No results yet</h1>
          <p className="mt-2 text-muted-foreground">
            Take the diagnostic to get your readiness breakdown.
          </p>
          <Button asChild variant="hero" className="mt-6">
            <Link to="/diagnostic">Start Diagnostic</Link>
          </Button>
        </Card>
      </PageShell>
    );
  }

  const scores = scoreByCategory(attempts);
  const overall = overallReadiness(scores);
  const best = strongest(scores);
  const focus = weakest(scores);

  return (
    <PageShell narrow>
      <Card className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Your AZ-900 Readiness</h1>
        <ReadinessRing value={overall} size={190} />
      </Card>

      <Card className="mt-4 space-y-5">
        <h2 className="text-lg font-semibold">Topic performance</h2>
        {scores.map((s) => (
          <div key={s.id} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium">{s.name}</span>
              <span className="flex items-center gap-3">
                <PriorityBadge score={s.score} />
                <span
                  className={cn(
                    "w-12 text-right font-display font-bold",
                    toneText[getPriority(s.score)],
                  )}
                >
                  {s.score}%
                </span>
              </span>
            </div>
            <ProgressBar value={s.score} tone={getPriority(s.score)} label={`${s.name} score`} />
          </div>
        ))}
      </Card>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Card className="border-success/40">
          <p className="flex items-center gap-2 text-sm font-semibold text-success">
            <Trophy className="size-4" /> Your strongest area
          </p>
          <p className="mt-2 text-xl font-bold">{best.name}</p>
        </Card>
        <Card className="border-warning/40">
          <p className="flex items-center gap-2 text-sm font-semibold text-warning">
            <AlertTriangle className="size-4" /> Your focus area
          </p>
          <p className="mt-2 text-xl font-bold">{focus.name}</p>
        </Card>
      </div>

      <p className="mt-8 text-center text-muted-foreground">
        Your score is only part of the picture. AZ-Ready identifies the areas where additional
        practice can have the greatest impact.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild variant="hero" size="lg">
          <Link to="/practice">
            Practice My Weak Areas <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="glass" size="lg">
          <Link to="/dashboard">View Dashboard</Link>
        </Button>
      </div>
    </PageShell>
  );
}

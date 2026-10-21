import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, CheckCircle2, Flame, Target, XCircle, Activity } from "lucide-react";
import { PageShell } from "@/components/az/PageShell";
import { Card, ReadinessRing } from "@/components/az/primitives";
import { TopicScoreCard } from "@/components/az/TopicScoreCard";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/use-progress";
import { getQuestion } from "@/data/questions";
import { overallReadiness, scoreByCategory, streakDays, weakest, type CategoryScore } from "@/lib/readiness";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — AZ-Ready" },
      { name: "description", content: "Your AZ-900 readiness, topic scores and focus area at a glance." },
      { property: "og:title", content: "Dashboard — AZ-Ready" },
      { property: "og:description", content: "Track AZ-900 readiness and see which topic needs the most attention." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Dashboard,
});

const sampleScores: CategoryScore[] = [
  { id: "cloud", name: "Cloud Concepts", score: 84, answered: 12 },
  { id: "architecture", name: "Azure Architecture & Services", score: 72, answered: 14 },
  { id: "governance", name: "Azure Management & Governance", score: 58, answered: 10 },
];

function Dashboard() {
  const { attempts, ready, reset } = useProgress();
  const isSample = ready && attempts.length === 0;
  const scores = isSample ? sampleScores : scoreByCategory(attempts);
  const readiness = isSample ? 71 : overallReadiness(scores);
  const focus = weakest(scores);
  const correct = attempts.filter((a) => a.isCorrect).length;
  const accuracy = attempts.length ? Math.round((correct / attempts.length) * 100) : 0;
  const recent = [...attempts].reverse().slice(0, 5);

  if (!ready) {
    return (
      <PageShell>
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-card" />
          ))}
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">Welcome back 👋</h1>
          <p className="mt-1 text-muted-foreground">Here's where your AZ-900 preparation stands.</p>
        </div>
        {isSample ? (
          <p className="rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-xs text-warning">
            Showing sample data — take the diagnostic to see your own.
          </p>
        ) : (
          <Button variant="ghost" size="sm" onClick={reset}>Reset my progress</Button>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="flex flex-col items-center justify-center gap-4 text-center lg:row-span-2">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Exam Readiness</p>
          <ReadinessRing value={readiness} />
          <p className="max-w-xs text-sm text-muted-foreground">Average across the three AZ-900 learning areas.</p>
          <Button asChild variant="glass" className="w-full">
            <Link to="/diagnostic">{isSample ? "Start Diagnostic" : "Retake Diagnostic"}</Link>
          </Button>
        </Card>

        <Card className="relative overflow-hidden border-warning/40 lg:col-span-2">
          <div aria-hidden className="absolute -right-16 -top-16 size-48 rounded-full bg-warning/10 blur-2xl" />
          <p className="flex items-center gap-2 text-sm font-semibold text-warning">
            <AlertTriangle className="size-4" /> Your Focus Area
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{focus.name.replace("Azure ", "")}</h2>
          <p className="mt-2 max-w-lg text-muted-foreground">
            Your recent performance suggests this is the area that needs the most attention.
          </p>
          <Button asChild variant="hero" className="mt-5">
            <Link to="/practice">
              Practice Weak Area <ArrowRight />
            </Link>
          </Button>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
          <Stat icon={<Target className="size-4 text-primary" />} label="Questions answered" value={isSample ? "36" : String(attempts.length)} />
          <Stat icon={<Activity className="size-4 text-cyan" />} label="Accuracy" value={isSample ? "71%" : `${accuracy}%`} />
          <Stat icon={<Flame className="size-4 text-warning" />} label="Current streak" value={`${isSample ? 4 : streakDays(attempts)} days`} />
        </div>
      </div>

      <h2 className="mb-4 mt-10 text-xl font-semibold">Topic performance</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {scores.map((s) => (
          <TopicScoreCard key={s.id} {...s} />
        ))}
      </div>

      <h2 className="mb-4 mt-10 text-xl font-semibold">Recent activity</h2>
      <Card className="p-0 sm:p-0">
        {recent.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No activity yet. Your answered questions will appear here.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((a, i) => {
              const q = getQuestion(a.questionId);
              return (
                <li key={i} className="flex items-center gap-3 px-5 py-4">
                  {a.isCorrect ? <CheckCircle2 className="size-5 shrink-0 text-success" /> : <XCircle className="size-5 shrink-0 text-destructive" />}
                  <p className="line-clamp-1 flex-1 text-sm">{q?.question}</p>
                  <span className="hidden text-xs capitalize text-muted-foreground sm:block">{a.mode}</span>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </PageShell>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card>
      <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">{icon}{label}</p>
      <p className="mt-2 font-display text-2xl font-bold">{value}</p>
    </Card>
  );
}

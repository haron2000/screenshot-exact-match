import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Crosshair, PartyPopper } from "lucide-react";
import { PageShell } from "@/components/az/PageShell";
import { QuizRunner } from "@/components/az/QuizRunner";
import { Card } from "@/components/az/primitives";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/use-progress";
import type { Question } from "@/data/questions";
import { getCategory, type CategoryId } from "@/data/topics";
import { scoreByCategory, selectFocusedQuestions, weakest } from "@/lib/readiness";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Focused Practice — AZ-Ready" },
      { name: "description", content: "Targeted AZ-900 practice questions chosen from your weakest learning area." },
      { property: "og:title", content: "Focused Practice — AZ-Ready" },
      { property: "og:description", content: "Practice selected from your previous performance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Practice,
});

function Practice() {
  const { attempts, ready, record } = useProgress();
  const [session, setSession] = useState<{ category: CategoryId; questions: Question[]; missed: number } | null>(null);
  const [done, setDone] = useState(false);

  if (!ready) return <PageShell narrow><div className="h-72 animate-pulse rounded-2xl bg-card" /></PageShell>;

  if (attempts.length === 0) {
    return (
      <PageShell narrow>
        <Card className="text-center">
          <h1 className="text-2xl font-bold">Let's find your weak areas first</h1>
          <p className="mt-2 text-muted-foreground">Focused practice is chosen from your past answers. Take the diagnostic to get started.</p>
          <Button asChild variant="hero" className="mt-6"><Link to="/diagnostic">Start Diagnostic</Link></Button>
        </Card>
      </PageShell>
    );
  }

  // Freeze the selection for the session so answering doesn't reshuffle questions.
  const active =
    session ??
    (() => {
      const focus = weakest(scoreByCategory(attempts)).id;
      const qs = selectFocusedQuestions(focus, attempts);
      const missedIds = new Set(attempts.filter((a) => !a.isCorrect).map((a) => a.questionId));
      const s = { category: focus, questions: qs, missed: qs.filter((q) => missedIds.has(q.id)).length };
      queueMicrotask(() => setSession(s));
      return s;
    })();

  const cat = getCategory(active.category);

  if (done) {
    return (
      <PageShell narrow>
        <Card className="text-center">
          <PartyPopper className="mx-auto size-10 text-cyan" />
          <h1 className="mt-4 text-2xl font-bold">Session complete</h1>
          <p className="mt-2 text-muted-foreground">Your scores have been updated with this practice.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="hero" onClick={() => { setSession(null); setDone(false); }}>Practice again</Button>
            <Button asChild variant="glass"><Link to="/dashboard">View Dashboard</Link></Button>
          </div>
        </Card>
      </PageShell>
    );
  }

  return (
    <PageShell narrow>
      <h1 className="text-2xl font-bold sm:text-3xl">Let's strengthen your weak areas.</h1>
      <Card className="mb-6 mt-5 flex gap-4 border-warning/40 bg-warning/5">
        <Crosshair className="mt-1 size-5 shrink-0 text-warning" />
        <div className="space-y-1 text-sm">
          <p><span className="text-muted-foreground">Focus topic:</span> <span className="font-semibold">{cat.shortName}</span></p>
          <p><span className="text-muted-foreground">Reason:</span> You've recently struggled with questions in this area.</p>
          {active.missed > 0 && (
            <p className="text-muted-foreground">{active.missed} question{active.missed === 1 ? "" : "s"} you missed earlier are queued first.</p>
          )}
        </div>
      </Card>
      <QuizRunner
        key={active.category}
        questions={active.questions}
        label="Focused question"
        onAnswer={(q, sel, ok) => record({ questionId: q.id, selectedAnswer: sel, isCorrect: ok, mode: "practice" })}
        onComplete={() => setDone(true)}
      />
    </PageShell>
  );
}

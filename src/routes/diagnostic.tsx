import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageShell } from "@/components/az/PageShell";
import { QuizRunner } from "@/components/az/QuizRunner";
import { useProgress } from "@/hooks/use-progress";
import { diagnosticQuestions } from "@/lib/readiness";

export const Route = createFileRoute("/diagnostic")({
  head: () => ({
    meta: [
      { title: "Diagnostic Quiz — AZ-Ready" },
      {
        name: "description",
        content:
          "A 15-question diagnostic across all three AZ-900 learning areas, with explanations after every answer.",
      },
      { property: "og:title", content: "Diagnostic Quiz — AZ-Ready" },
      {
        property: "og:description",
        content: "Find out where you stand across the AZ-900 learning areas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Diagnostic,
});

function Diagnostic() {
  const qs = useMemo(diagnosticQuestions, []);
  const { record } = useProgress();
  const navigate = useNavigate();
  return (
    <PageShell narrow>
      <div className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Diagnostic</h1>
        <p className="mt-1 text-muted-foreground">
          Answer honestly — guessing hides the gaps we're trying to find.
        </p>
      </div>
      <QuizRunner
        questions={qs}
        label="Question"
        onAnswer={(q, sel, ok) =>
          record({ questionId: q.id, selectedAnswer: sel, isCorrect: ok, mode: "diagnostic" })
        }
        onComplete={() => navigate({ to: "/results" })}
      />
    </PageShell>
  );
}

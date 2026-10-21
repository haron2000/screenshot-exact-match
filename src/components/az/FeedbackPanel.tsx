import { CheckCircle2, XCircle, Lightbulb, Shuffle, BookOpen } from "lucide-react";
import type { Question } from "@/data/questions";
import { cn } from "@/lib/utils";

export function FeedbackPanel({ question, isCorrect }: { question: Question; isCorrect: boolean }) {
  return (
    <section aria-live="polite" className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4">
      <div className={cn("flex items-center gap-3 rounded-xl border p-4", isCorrect ? "border-success/40 bg-success/10" : "border-destructive/40 bg-destructive/10")}>
        {isCorrect ? <CheckCircle2 className="size-6 text-success" /> : <XCircle className="size-6 text-destructive" />}
        <div>
          <p className={cn("font-display text-lg font-semibold", isCorrect ? "text-success" : "text-destructive")}>
            {isCorrect ? "Correct" : "Not quite"}
          </p>
          <p className="text-sm text-muted-foreground">
            Correct answer: <span className="font-medium text-foreground">{question.options[question.correctAnswer]}</span>
          </p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Block icon={<BookOpen className="size-4 text-primary" />} title="Why?" className="sm:col-span-3">
          {question.explanation}
        </Block>
        <Block icon={<Lightbulb className="size-4 text-cyan" />} title="Remember this" className="sm:col-span-1">
          {question.keyConcept}
        </Block>
        <Block icon={<Shuffle className="size-4 text-warning" />} title="Common confusion" className="sm:col-span-2">
          {question.commonMisconception}
        </Block>
      </div>
    </section>
  );
}

function Block({ icon, title, children, className }: { icon: React.ReactNode; title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-surface p-4", className)}>
      <p className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {icon}
        {title}
      </p>
      <p className="text-sm leading-relaxed">{children}</p>
    </div>
  );
}

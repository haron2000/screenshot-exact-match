import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { AnswerKey, Question } from "@/data/questions";
import { getCategory, getTopic } from "@/data/topics";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, Pill, ProgressBar } from "./primitives";
import { FeedbackPanel } from "./FeedbackPanel";

interface Props {
  questions: Question[];
  label: string; // e.g. "Question" or "focused question"
  onAnswer: (q: Question, selected: AnswerKey, correct: boolean) => void;
  onComplete: () => void;
}

const keys: AnswerKey[] = ["a", "b", "c", "d"];
const diffTone = {
  Easy: "text-success",
  Medium: "text-warning",
  Hard: "text-destructive",
} as const;

export function QuizRunner({ questions, label, onAnswer, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<AnswerKey | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const q = questions[index];
  if (!q) return null;
  const topic = getTopic(q.topicId)!;
  const category = getCategory(topic.category);
  const isLast = index === questions.length - 1;
  const isCorrect = selected === q.correctAnswer;

  const submit = () => {
    if (!selected) return;
    setSubmitted(true);
    onAnswer(q, selected, selected === q.correctAnswer);
  };
  const next = () => {
    if (isLast) return onComplete();
    setIndex((i) => i + 1);
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">
            {label} {index + 1} of {questions.length}
          </span>
          <span className="text-muted-foreground">
            {Math.round(((index + (submitted ? 1 : 0)) / questions.length) * 100)}%
          </span>
        </div>
        <ProgressBar
          value={((index + (submitted ? 1 : 0)) / questions.length) * 100}
          label="Quiz progress"
        />
      </div>

      <Card className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <Pill>{category.shortName}</Pill>
          <Pill>{topic.name}</Pill>
          <Pill className={diffTone[q.difficulty]}>{q.difficulty}</Pill>
        </div>
        <h2 className="text-xl font-semibold leading-snug sm:text-2xl">{q.question}</h2>

        <div role="radiogroup" aria-label="Answer choices" className="grid gap-3">
          {keys.map((k) => {
            const isSel = selected === k;
            const showCorrect = submitted && k === q.correctAnswer;
            const showWrong = submitted && isSel && !isCorrect;
            return (
              <button
                key={k}
                role="radio"
                aria-checked={isSel}
                disabled={submitted}
                onClick={() => setSelected(k)}
                className={cn(
                  "group flex items-center gap-4 rounded-xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  !submitted && "hover:border-primary/60 hover:bg-accent/40",
                  isSel && !submitted && "border-primary bg-primary/10 shadow-glow",
                  showCorrect && "border-success bg-success/10",
                  showWrong && "border-destructive bg-destructive/10",
                  submitted && !showCorrect && !showWrong && "opacity-60",
                  !isSel && !showCorrect && "border-border bg-surface",
                )}
              >
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-lg border text-sm font-semibold uppercase",
                    isSel && !submitted
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground",
                    showCorrect && "border-success bg-success text-success-foreground",
                    showWrong && "border-destructive bg-destructive text-destructive-foreground",
                  )}
                >
                  {k}
                </span>
                <span className="text-sm sm:text-base">{q.options[k]}</span>
              </button>
            );
          })}
        </div>

        {submitted && <FeedbackPanel question={q} isCorrect={isCorrect} />}

        <div className="flex justify-end">
          {!submitted ? (
            <Button variant="hero" size="lg" onClick={submit} disabled={!selected}>
              Submit Answer
            </Button>
          ) : (
            <Button variant="hero" size="lg" onClick={next} autoFocus>
              {isLast ? "See Results" : "Next Question"} <ArrowRight />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

import { getPriority } from "@/lib/readiness";
import { Card, PriorityBadge, ProgressBar, toneText } from "./primitives";
import { cn } from "@/lib/utils";

export function TopicScoreCard({
  name,
  score,
  answered,
}: {
  name: string;
  score: number;
  answered: number;
}) {
  const p = getPriority(score);
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug">{name}</h3>
        <PriorityBadge score={score} />
      </div>
      <p className={cn("font-display text-3xl font-bold", toneText[p])}>{score}%</p>
      <ProgressBar value={score} tone={p} label={`${name} score`} />
      <p className="text-xs text-muted-foreground">
        {answered} question{answered === 1 ? "" : "s"} answered
      </p>
    </Card>
  );
}

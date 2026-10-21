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
  const hasData = answered > 0;
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug">{name}</h3>
        {hasData ? (
          <PriorityBadge score={score} />
        ) : (
          <span className="text-xs text-muted-foreground">Not started</span>
        )}
      </div>
      <p
        className={cn(
          "font-display text-3xl font-bold",
          hasData ? toneText[p] : "text-muted-foreground",
        )}
      >
        {hasData ? `${score}%` : "—"}
      </p>
      <ProgressBar value={hasData ? score : 0} tone={p} label={`${name} score`} />
      <p className="text-xs text-muted-foreground">
        {hasData
          ? `${answered} question${answered === 1 ? "" : "s"} answered`
          : "No questions answered yet"}
      </p>
    </Card>
  );
}

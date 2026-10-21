import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { getPriority, type Priority } from "@/lib/readiness";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6", className)}>{children}</div>
  );
}

const toneBar: Record<Priority, string> = {
  Strong: "bg-success",
  "Needs Practice": "bg-warning",
  "Focus Area": "bg-destructive",
};
const toneBadge: Record<Priority, string> = {
  Strong: "bg-success/15 text-success border-success/30",
  "Needs Practice": "bg-warning/15 text-warning border-warning/30",
  "Focus Area": "bg-destructive/15 text-destructive border-destructive/30",
};
export const toneText: Record<Priority, string> = {
  Strong: "text-success",
  "Needs Practice": "text-warning",
  "Focus Area": "text-destructive",
};

export function ProgressBar({ value, tone, label }: { value: number; tone?: Priority | "brand"; label: string }) {
  const fill = !tone || tone === "brand" ? "bg-brand" : toneBar[tone];
  return (
    <div role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div className={cn("h-full rounded-full transition-[width] duration-700 ease-out", fill)} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function PriorityBadge({ score }: { score: number }) {
  const p = getPriority(score);
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", toneBadge[p])}>{p}</span>
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground", className)}>
      {children}
    </span>
  );
}

export function ReadinessRing({ value, size = 168 }: { value: number; size?: number }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 160 160" className="-rotate-90" width={size} height={size} aria-hidden>
        <defs>
          <linearGradient id="ring" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--cyan)" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r={r} fill="none" stroke="var(--muted)" strokeWidth="12" />
        <circle cx="80" cy="80" r={r} fill="none" stroke="url(#ring)" strokeWidth="12" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (c * value) / 100} className="transition-all duration-1000" />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-4xl font-bold">{value}%</span>
      </div>
    </div>
  );
}

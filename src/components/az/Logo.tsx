import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="AZ-Ready home">
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-lg bg-brand font-display text-sm font-bold text-primary-foreground shadow-glow"
      >
        AZ
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        AZ<span className="text-cyan">-Ready</span>
      </span>
    </Link>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { PageShell } from "@/components/az/PageShell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getBuddyReply } from "@/lib/study-buddy";

export const Route = createFileRoute("/study-buddy")({
  head: () => ({
    meta: [
      { title: "Study Buddy — AZ-Ready" },
      { name: "description", content: "Ask questions, simplify concepts and learn AZ-900 topics by understanding." },
      { property: "og:title", content: "Study Buddy — AZ-Ready" },
      { property: "og:description", content: "An AZ-900 study companion for plain-language explanations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: StudyBuddy,
});

const prompts = [
  "Explain Azure Policy simply",
  "What's the difference between IaaS and PaaS?",
  "Give me a real-world example",
  "Quiz me on Azure storage",
];

interface Msg { role: "user" | "buddy"; text: string }

function StudyBuddy() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "buddy", text: "Hi! I'm your Study Buddy. Pick a suggested prompt below, or ask me anything about AZ-900." },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), [messages, thinking]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || thinking) return;
    setMessages((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setThinking(true);
    // Placeholder: swap getBuddyReply for an AI call when the backend is connected.
    setTimeout(() => {
      setMessages((m) => [...m, { role: "buddy", text: getBuddyReply(t) }]);
      setThinking(false);
    }, 600);
  };

  return (
    <PageShell narrow>
      <div className="mb-6 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-brand shadow-glow">
          <Sparkles className="size-6 text-primary-foreground" />
        </span>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">AZ-Ready Study Buddy</h1>
        <p className="mt-1 text-muted-foreground">Ask questions. Simplify concepts. Learn by understanding.</p>
        <p className="mt-2 text-xs text-cyan">Preview — answers come from a built-in set while the AI tutor is in development.</p>
      </div>

      <div className="flex h-[60vh] min-h-[420px] flex-col overflow-hidden rounded-2xl border border-cyan/30 bg-card shadow-card">
        <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6" aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <p className={cn("max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed",
                m.role === "user" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm border border-border bg-surface")}>
                {m.text}
              </p>
            </div>
          ))}
          {thinking && (
            <div className="flex gap-1 px-2" aria-label="Study Buddy is typing">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-2 animate-bounce rounded-full bg-cyan" style={{ animationDelay: `${i * 120}ms` }} />
              ))}
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-border p-3 sm:p-4">
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
            {prompts.map((p) => (
              <button key={p} onClick={() => send(p)} disabled={thinking}
                className="shrink-0 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-cyan/50 hover:text-foreground disabled:opacity-50">
                {p}
              </button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
            <label htmlFor="buddy-input" className="sr-only">Ask Study Buddy</label>
            <input id="buddy-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about an AZ-900 concept…"
              className="h-11 flex-1 rounded-xl border border-input bg-surface px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <Button type="submit" variant="hero" size="icon" className="size-11 rounded-xl" disabled={!input.trim() || thinking} aria-label="Send">
              <Send />
            </Button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}

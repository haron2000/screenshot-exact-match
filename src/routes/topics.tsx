import { createFileRoute, Link } from "@tanstack/react-router";
import { Cloud, Network, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/az/PageShell";
import { Card } from "@/components/az/primitives";
import { categories, topics, type CategoryId } from "@/data/topics";
import { questions } from "@/data/questions";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/topics")({
  head: () => ({
    meta: [
      { title: "Topics — AZ-Ready" },
      {
        name: "description",
        content:
          "Explore AZ-900 learning topics: cloud concepts, Azure architecture and services, and management and governance.",
      },
      { property: "og:title", content: "Topics — AZ-Ready" },
      {
        property: "og:description",
        content: "Browse the AZ-900 learning areas and their subtopics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Topics,
});

const icons: Record<CategoryId, React.ReactNode> = {
  cloud: <Cloud className="size-5" />,
  architecture: <Network className="size-5" />,
  governance: <ShieldCheck className="size-5" />,
};

function Topics() {
  return (
    <PageShell>
      <h1 className="text-3xl font-bold sm:text-4xl">Topic explorer</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Learning topics based on the public AZ-900 skills outline. These are study areas, not claims
        about exact exam questions.
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {categories.map((c) => {
          const subs = topics.filter((t) => t.category === c.id);
          const count = questions.filter((q) => subs.some((s) => s.id === q.topicId)).length;
          return (
            <Card key={c.id} className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary">
                  {icons[c.id]}
                </span>
                <div>
                  <h2 className="font-semibold leading-tight">{c.name}</h2>
                  <p className="text-xs text-muted-foreground">{count} practice questions</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{c.description}</p>
              <ul className="mt-5 flex-1 space-y-2">
                {subs.map((t) => (
                  <li key={t.id} className="rounded-xl border border-border bg-surface p-3">
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{t.description}</p>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
      <div className="mt-8 text-center">
        <Button asChild variant="hero" size="lg">
          <Link to="/diagnostic">Test yourself on all topics</Link>
        </Button>
      </div>
    </PageShell>
  );
}

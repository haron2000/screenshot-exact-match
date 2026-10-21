<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Content (topics, questions) lives in `src/data/*` with shapes mirroring `supabase/schema.sql`, so it can be swapped for DB queries without UI changes.
- Scoring/priority/selection logic lives in `src/lib/readiness.ts` (pure, tested); UI components never compute scores inline.
- Learner attempts persist via `src/hooks/use-progress.ts` (localStorage for now) — the single place to swap in a backend.

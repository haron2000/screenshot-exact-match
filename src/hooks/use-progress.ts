import { useCallback, useEffect, useState } from "react";
import type { Attempt } from "@/lib/readiness";

// Local persistence for attempts. Replace load/save with queries against the
// `attempts` table (supabase/schema.sql) when a backend is connected.
const KEY = "az-ready:attempts";
const EVENT = "az-ready:attempts-changed";

function load(): Attempt[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function useProgress() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setAttempts(load());
    sync();
    setReady(true);
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const record = useCallback((a: Omit<Attempt, "createdAt">) => {
    const next = [...load(), { ...a, createdAt: new Date().toISOString() }];
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { attempts, ready, record, reset };
}

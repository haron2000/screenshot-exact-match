import { describe, expect, it } from "vitest";
import { getPriority, scoreByCategory, selectFocusedQuestions } from "./readiness";

describe("priority thresholds", () => {
  it("75% and above is Strong", () => {
    expect(getPriority(75)).toBe("Strong");
  });
  it("60–74% is Needs Practice", () => {
    expect(getPriority(60)).toBe("Needs Practice");
    expect(getPriority(74)).toBe("Needs Practice");
  });
  it("below 60% is Focus Area", () => {
    expect(getPriority(59)).toBe("Focus Area");
  });
});

describe("scoring", () => {
  it("uses the latest attempt per question", () => {
    const t = new Date().toISOString();
    const s = scoreByCategory([
      { questionId: "q-mg-1", selectedAnswer: "a", isCorrect: false, createdAt: t, mode: "diagnostic" },
      { questionId: "q-mg-1", selectedAnswer: "b", isCorrect: true, createdAt: t, mode: "practice" },
    ]);
    expect(s.find((c) => c.id === "governance")?.score).toBe(100);
  });
  it("focused practice puts missed questions first", () => {
    const t = new Date().toISOString();
    const list = selectFocusedQuestions("governance", [
      { questionId: "q-mg-4", selectedAnswer: "b", isCorrect: false, createdAt: t, mode: "diagnostic" },
    ]);
    expect(list[0]?.id).toBe("q-mg-4");
  });
});

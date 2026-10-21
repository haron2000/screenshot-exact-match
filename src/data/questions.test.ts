import { describe, expect, it } from "vitest";
import { questions } from "./questions";
import { getTopic } from "./topics";
import { diagnosticQuestions } from "@/lib/readiness";

describe("question bank integrity", () => {
  it("has 21 questions with unique ids", () => {
    expect(questions).toHaveLength(21);
    expect(new Set(questions.map((q) => q.id)).size).toBe(21);
  });
  it.each(questions.map((q) => [q.id, q] as const))("%s is complete and valid", (_id, q) => {
    expect(Object.keys(q.options).sort()).toEqual(["a", "b", "c", "d"]);
    Object.values(q.options).forEach((o) => expect(o.trim().length).toBeGreaterThan(0));
    expect(["a", "b", "c", "d"]).toContain(q.correctAnswer);
    expect(new Set(Object.values(q.options)).size).toBe(4);
    expect(getTopic(q.topicId)).toBeDefined();
    expect(q.explanation.trim()).not.toBe("");
    expect(q.keyConcept.trim()).not.toBe("");
    expect(q.commonMisconception.trim()).not.toBe("");
  });
  it("diagnostic has 15 questions, 5 per area", () => {
    expect(diagnosticQuestions()).toHaveLength(15);
  });
});

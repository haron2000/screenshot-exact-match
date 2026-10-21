import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useProgress } from "./use-progress";

describe("useProgress", () => {
  it("records attempts and reset clears all local progress", () => {
    localStorage.clear();
    const { result } = renderHook(() => useProgress());
    act(() =>
      result.current.record({ questionId: "q-cc-1", selectedAnswer: "b", isCorrect: true, mode: "diagnostic" }),
    );
    expect(result.current.attempts).toHaveLength(1);
    act(() => result.current.reset());
    expect(result.current.attempts).toHaveLength(0);
    expect(localStorage.getItem("az-ready:attempts")).toBeNull();
  });
});

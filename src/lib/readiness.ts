import { questions, type Question } from "@/data/questions";
import { categories, topics, getTopic, type CategoryId } from "@/data/topics";
export type Priority = "Strong" | "Needs Practice" | "Focus Area";

export interface Attempt {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  createdAt: string;
  mode: "diagnostic" | "practice";
}

/** 75%+ Strong, 60–74% Needs Practice, below 60% Focus Area. */
export function getPriority(score: number): Priority {
  if (score >= 75) return "Strong";
  if (score >= 60) return "Needs Practice";
  return "Focus Area";
}

export const categoryOf = (q: Question): CategoryId => getTopic(q.topicId)!.category;

export interface CategoryScore {
  id: CategoryId;
  name: string;
  score: number;
  answered: number;
  /** Questions whose latest attempt was wrong. */
  missed: number;
}

/** Uses the latest attempt per question so improvement is reflected. */
export function scoreByCategory(attempts: Attempt[]): CategoryScore[] {
  const latest = new Map<string, Attempt>();
  for (const a of attempts) latest.set(a.questionId, a);
  return categories.map((c) => {
    const list = [...latest.values()].filter((a) => {
      const q = questions.find((x) => x.id === a.questionId);
      return q && categoryOf(q) === c.id;
    });
    const correct = list.filter((a) => a.isCorrect).length;
    return {
      id: c.id,
      name: c.name,
      answered: list.length,
      missed: list.length - correct,
      score: list.length ? Math.round((correct / list.length) * 100) : 0,
    };
  });
}

export interface TopicScore {
  id: string;
  name: string;
  category: CategoryId;
  score: number;
  answered: number;
  missed: number;
}

/**
 * Scores individual topics using the latest attempt per question.
 * Unanswered topics have a score of zero but should not be treated
 * as demonstrated weaknesses.
 */
export function scoreByTopic(attempts: Attempt[]): TopicScore[] {
  const latest = new Map<string, Attempt>();

  for (const attempt of attempts) {
    latest.set(attempt.questionId, attempt);
  }

  return topics.map((topic) => {
    const topicAttempts = [...latest.values()].filter((attempt) => {
      const question = questions.find((item) => item.id === attempt.questionId);

      return question?.topicId === topic.id;
    });

    const correct = topicAttempts.filter((attempt) => attempt.isCorrect).length;

    return {
      id: topic.id,
      name: topic.name,
      category: topic.category,
      answered: topicAttempts.length,
      missed: topicAttempts.length - correct,
      score: topicAttempts.length ? Math.round((correct / topicAttempts.length) * 100) : 0,
    };
  });
}
export function overallReadiness(scores: CategoryScore[]): number {
  const withData = scores.filter((s) => s.answered > 0);
  if (!withData.length) return 0;
  return Math.round(withData.reduce((sum, s) => sum + s.score, 0) / withData.length);
}

export function weakest(scores: CategoryScore[]): CategoryScore {
  return [...scores].sort((a, b) => a.score - b.score)[0]!;
}
export function strongest(scores: CategoryScore[]): CategoryScore {
  return [...scores].sort((a, b) => b.score - a.score)[0]!;
}

/** Questions for the focus category, previously-missed ones first. */
export function selectFocusedQuestions(category: CategoryId, attempts: Attempt[]): Question[] {
  const missed = new Set(attempts.filter((a) => !a.isCorrect).map((a) => a.questionId));
  return questions
    .filter((q) => categoryOf(q) === category)
    .sort((a, b) => Number(missed.has(b.id)) - Number(missed.has(a.id)));
}

/** Diagnostic: five questions per category, interleaved. */
export function diagnosticQuestions(): Question[] {
  const per = categories.map((c) => questions.filter((q) => categoryOf(q) === c.id).slice(0, 5));
  const out: Question[] = [];
  for (let i = 0; i < 5; i++)
    per.forEach((list) => {
      const q = list[i];
      if (q) out.push(q);
    });
  return out;
}

/** Select questions for one topic, prioritising previously missed questions. */
export function selectTopicQuestions(topicId: string, attempts: Attempt[]): Question[] {
  const missed = new Set(
    attempts.filter((attempt) => !attempt.isCorrect).map((attempt) => attempt.questionId),
  );

  return questions
    .filter((question) => question.topicId === topicId)
    .sort((a, b) => Number(missed.has(b.id)) - Number(missed.has(a.id)));
}

export function streakDays(attempts: Attempt[], today = new Date()): number {
  const days = new Set(attempts.map((a) => a.createdAt.slice(0, 10)));
  let streak = 0;
  const d = new Date(today);
  while (days.has(d.toISOString().slice(0, 10))) {
    streak++;
    d.setUTCDate(d.getUTCDate() - 1);
  }
  return streak;
}

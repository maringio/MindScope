import { traits } from "../data/tests.js";

export function calculateScores(test, answers) {
  const grouped = Object.keys(traits).reduce((acc, trait) => {
    acc[trait] = [];
    return acc;
  }, {});

  test.questions.forEach((question) => {
    const answer = answers[question.id];
    if (!answer) return;

    const adjusted = question.reverse ? 6 - answer : answer;
    grouped[question.trait].push(adjusted);
  });

  return Object.entries(grouped).reduce((scores, [trait, values]) => {
    if (!values.length) {
      scores[trait] = 0;
      return scores;
    }

    const average = values.reduce((sum, value) => sum + value, 0) / values.length;
    scores[trait] = Math.round(((average - 1) / 4) * 100);
    return scores;
  }, {});
}

export function getCompletion(test, answers) {
  const answered = test.questions.filter((question) => answers[question.id]).length;
  return {
    answered,
    total: test.questions.length,
    percentage: Math.round((answered / test.questions.length) * 100)
  };
}

export function rankTraits(scores) {
  return Object.entries(scores)
    .map(([trait, score]) => ({ trait, score, ...traits[trait] }))
    .sort((a, b) => b.score - a.score);
}

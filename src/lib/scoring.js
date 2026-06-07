export function calculateScores(test, answers) {
  const grouped = Object.keys(test.dimensions).reduce((acc, dimension) => {
    acc[dimension] = [];
    return acc;
  }, {});

  const values = test.scale.map((option) => option.value);
  const min = Math.min(...values);
  const max = Math.max(...values);

  test.questions.forEach((question) => {
    const answer = answers[question.id];
    if (answer === undefined) return;

    const adjusted = question.reverse ? min + max - answer : answer;
    grouped[question.dimension].push(adjusted);
  });

  return Object.entries(grouped).reduce((scores, [dimension, dimensionValues]) => {
    if (!dimensionValues.length) {
      scores[dimension] = 0;
      return scores;
    }

    const average = dimensionValues.reduce((sum, value) => sum + value, 0) / dimensionValues.length;
    scores[dimension] = Math.round(((average - min) / (max - min)) * 100);
    return scores;
  }, {});
}

export function getCompletion(test, answers) {
  const answered = test.questions.filter((question) => answers[question.id] !== undefined).length;
  return {
    answered,
    total: test.questions.length,
    percentage: Math.round((answered / test.questions.length) * 100)
  };
}

export function rankDimensions(test, scores) {
  return Object.entries(scores)
    .map(([dimension, score]) => ({ dimension, score, ...test.dimensions[dimension] }))
    .sort((a, b) => b.score - a.score);
}

export function summaryScore(scores) {
  const values = Object.values(scores);
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

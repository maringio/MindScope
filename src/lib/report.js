import { traits } from "../data/tests.js";
import { rankTraits } from "./scoring.js";

const guidance = {
  openness: {
    high: "Du verbindest Neugier mit Vorstellungskraft und findest oft neue Wege, um vertraute Fragen zu betrachten.",
    mid: "Du kannst offen für Neues sein, bevorzugst aber einen erkennbaren Nutzen oder eine klare Verbindung zum Alltag.",
    low: "Du setzt gern auf Bewährtes und bringst Stabilität in Situationen, in denen andere zu schnell wechseln.",
    recommendations: [
      "Beruf: Nutze Rollen mit Konzeptarbeit, Produktentwicklung oder strategischer Verbesserung.",
      "Lernen: Kombiniere neue Inhalte mit eigenen Beispielen, Skizzen oder kleinen Experimenten.",
      "Beziehungen: Erkläre deine Ideen konkret, damit andere leichter mitgehen können.",
      "Entwicklung: Wähle bewusst Experimente mit kleinem Risiko, statt alles auf einmal zu verändern."
    ]
  },
  conscientiousness: {
    high: "Du arbeitest verbindlich, zielorientiert und schaffst durch Struktur Vertrauen.",
    mid: "Du kannst gut planen, profitierst aber von Routinen, die Prioritäten im Blick halten.",
    low: "Du reagierst flexibel auf neue Anforderungen und kannst dich gut auf den Moment einstellen.",
    recommendations: [
      "Beruf: Kläre Erfolgskriterien früh und arbeite mit sichtbaren Zwischenzielen.",
      "Lernen: Plane kurze, wiederholbare Fokusblöcke statt grosser Lernmarathons.",
      "Beziehungen: Sage realistisch zu, damit Verlässlichkeit nicht in Überlastung kippt.",
      "Entwicklung: Nutze Checklisten nur für die Entscheidungen, die wirklich wiederkehren."
    ]
  },
  extraversion: {
    high: "Du bringst Energie in Gespräche, machst Themen sichtbar und kannst andere aktivieren.",
    mid: "Du bewegst dich gut zwischen Austausch und Rückzug und kannst deine Energie situativ steuern.",
    low: "Du denkst oft gründlich nach, bevor du sprichst, und bringst ruhige Tiefe in Zusammenarbeit.",
    recommendations: [
      "Beruf: Suche Formate, in denen Austausch und konzentrierte Arbeit klar getrennt sind.",
      "Lernen: Erkläre Inhalte laut oder diskutiere sie, wenn du dadurch Energie gewinnst.",
      "Beziehungen: Kommuniziere dein Kontaktbedürfnis offen, ohne es rechtfertigen zu müssen.",
      "Entwicklung: Beobachte, welche Begegnungen dich stärken und welche dich eher leeren."
    ]
  },
  agreeableness: {
    high: "Du erkennst Bedürfnisse anderer schnell und stärkst Vertrauen durch Respekt und Fairness.",
    mid: "Du kannst kooperativ sein und gleichzeitig eigene Interessen vertreten, wenn die Situation es verlangt.",
    low: "Du bringst Klarheit, Direktheit und Entscheidungsfähigkeit in Situationen mit viel Abstimmungsbedarf.",
    recommendations: [
      "Beruf: Achte darauf, dass Hilfsbereitschaft nicht unsichtbare Zusatzarbeit erzeugt.",
      "Lernen: Nutze Lerngruppen, wenn Gegenseitigkeit und klare Rollen vorhanden sind.",
      "Beziehungen: Verbinde Wärme mit Grenzen, besonders bei wiederkehrenden Konflikten.",
      "Entwicklung: Übe kurze Sätze für Nein, Pause und Klärung."
    ]
  },
  neuroticism: {
    high: "Du nimmst innere Signale fein wahr und erkennst früh, wann etwas Aufmerksamkeit braucht.",
    mid: "Du reagierst sensibel auf Belastung, kannst dich aber mit passenden Routinen meist gut regulieren.",
    low: "Du wirkst in vielen Situationen ruhig und lässt dich von Druck nicht schnell aus der Bahn bringen.",
    recommendations: [
      "Beruf: Arbeite mit klaren Erwartungen, Pufferzeiten und kurzen Reflexionspunkten.",
      "Lernen: Beginne mit kleinen Einstiegen, wenn Anspannung den Start erschwert.",
      "Beziehungen: Teile früh, was dich beschäftigt, bevor es sich innerlich verdichtet.",
      "Entwicklung: Baue feste Erholungsrituale ein, nicht erst nach sehr intensiven Phasen."
    ]
  }
};

function band(score) {
  if (score >= 67) return "high";
  if (score <= 39) return "low";
  return "mid";
}

export function createReport(scores) {
  const ranked = rankTraits(scores);
  const strengths = ranked.slice(0, 2);
  const growth = ranked.slice(-2).reverse();

  const overview = `Dein Profil zeigt besonders ${strengths
    .map((item) => traits[item.trait].label)
    .join(" und ")}. Entwicklungsfelder liegen aktuell eher bei ${growth
    .map((item) => traits[item.trait].label)
    .join(" und ")}. Das ist keine Bewertung, sondern ein Hinweis darauf, welche Umgebungen, Routinen und Kommunikationsformen vermutlich gut zu dir passen.`;

  const sections = ranked.map((item) => ({
    trait: item.trait,
    label: traits[item.trait].label,
    score: item.score,
    text: guidance[item.trait][band(item.score)],
    recommendations: guidance[item.trait].recommendations
  }));

  return { overview, strengths, growth, sections };
}

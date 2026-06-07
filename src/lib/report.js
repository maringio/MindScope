import { rankDimensions } from "./scoring.js";

const reportCopy = {
  bigFive: {
    high: {
      default: "Dieser Bereich ist in deinem Profil deutlich ausgeprägt und kann eine Ressource sein, wenn du ihn bewusst einsetzt.",
      recommendations: [
        "Achte darauf, passende Umgebungen zu wählen, in denen diese Stärke sichtbar werden darf.",
        "Nutze die Ausprägung als Ressource, ohne daraus eine starre Erwartung an dich zu machen.",
        "Bitte Menschen in deinem Umfeld um konkrete Rückmeldung, wann diese Qualität hilfreich ist."
      ]
    },
    mid: {
      default: "Dieser Bereich wirkt flexibel. Du kannst ihn vermutlich je nach Kontext stärker oder zurückhaltender einsetzen.",
      recommendations: [
        "Beobachte, welche Situationen diese Qualität fördern oder bremsen.",
        "Formuliere konkrete Alltagssituationen, in denen du diese Seite bewusster nutzen möchtest.",
        "Nutze kleine Experimente statt grosser Veränderungsvorhaben."
      ]
    },
    low: {
      default: "Dieser Bereich ist weniger dominant. Das kann Stabilität geben, kann aber in manchen Situationen bewusste Ergänzung brauchen.",
      recommendations: [
        "Prüfe, ob dieser Bereich wirklich ein Entwicklungsziel ist oder einfach nicht zentral zu deinem Stil gehört.",
        "Suche nach Strategien, die zu deinem Temperament passen statt gegen dich zu arbeiten.",
        "Arbeite mit konkreten Routinen, wenn du diesen Bereich stärken möchtest."
      ]
    }
  },
  rses: {
    high: {
      default: "Deine Antworten sprechen für eine stabile und wohlwollende Grundhaltung dir selbst gegenüber.",
      recommendations: [
        "Nutze diese innere Stabilität, um anspruchsvolle Ziele ohne unnötigen Selbstabwertungsdruck zu verfolgen.",
        "Achte darauf, Selbstvertrauen mit Offenheit für Feedback zu verbinden.",
        "Halte fest, welche Beziehungen und Tätigkeiten dein Selbstwertgefühl verlässlich nähren."
      ]
    },
    mid: {
      default: "Deine Selbstwertschätzung wirkt grundsätzlich vorhanden, kann aber je nach Situation schwanken.",
      recommendations: [
        "Unterscheide zwischen Fehlern, Leistung und persönlichem Wert.",
        "Arbeite mit einer kurzen Liste eigener Kompetenzen, die du regelmässig aktualisierst.",
        "Achte auf Kontexte, in denen du dich übermässig vergleichst."
      ]
    },
    low: {
      default: "Deine Antworten deuten auf eine eher verletzliche Selbstwertschätzung hin.",
      recommendations: [
        "Beginne mit kleinen, realistischen Selbstwirksamkeitserfahrungen statt mit grossen Vorsätzen.",
        "Sprich mit vertrauten Menschen oder Fachpersonen, wenn Selbstabwertung häufig oder belastend ist.",
        "Übe, Selbstkritik in konkrete Bedürfnisse und nächste Schritte zu übersetzen."
      ]
    }
  },
  who5: {
    high: {
      default: "Deine Antworten sprechen für gutes aktuelles Wohlbefinden und Zugang zu positiven Alltagsressourcen.",
      recommendations: [
        "Halte fest, welche Routinen dein Wohlbefinden gerade tragen.",
        "Schütze Schlaf, Bewegung, soziale Verbindung und Erholung als Grundlagen.",
        "Nutze gute Phasen, um realistische Puffer für anspruchsvollere Zeiten aufzubauen."
      ]
    },
    mid: {
      default: "Dein Wohlbefinden wirkt gemischt. Es gibt vermutlich Ressourcen, aber auch Bereiche, die Aufmerksamkeit brauchen.",
      recommendations: [
        "Plane bewusst kleine angenehme Aktivitäten, nicht erst wenn die Energie komplett fehlt.",
        "Prüfe, ob Erholung, Bewegung oder soziale Kontakte in letzter Zeit zu kurz kamen.",
        "Beobachte über zwei Wochen, welche Situationen dein Wohlbefinden heben oder senken."
      ]
    },
    low: {
      default: "Deine Antworten zeigen aktuell eher niedriges Wohlbefinden.",
      recommendations: [
        "Nimm den Wert als Signal, genauer hinzuschauen und Unterstützung nicht zu lange aufzuschieben.",
        "Reduziere Ansprüche kurzfristig auf kleine, machbare Schritte.",
        "Wenn das Tief anhält oder stark belastet, ist fachliche Unterstützung sinnvoll."
      ]
    }
  },
  dass21: {
    high: {
      default: "Dieser Belastungsbereich ist deutlich erhöht und sollte ernst genommen werden.",
      recommendations: [
        "Reduziere kurzfristig zusätzliche Anforderungen, wo es möglich ist.",
        "Achte auf Schlaf, Ernährung, Pausen und soziale Unterstützung als Basisschutz.",
        "Bei starker oder anhaltender Belastung ist eine fachliche Abklärung sinnvoll."
      ]
    },
    mid: {
      default: "Dieser Bereich ist spürbar vorhanden, aber nicht maximal ausgeprägt.",
      recommendations: [
        "Identifiziere wiederkehrende Auslöser und typische Körpersignale.",
        "Plane konkrete Entlastungsfenster im Alltag ein.",
        "Nutze kurze Regulationsübungen, bevor die Belastung weiter steigt."
      ]
    },
    low: {
      default: "Dieser Belastungsbereich ist in deinen Antworten eher niedrig ausgeprägt.",
      recommendations: [
        "Bewahre die Routinen, die aktuell stabilisierend wirken.",
        "Nutze den niedrigen Wert nicht als Pflicht, immer funktionieren zu müssen.",
        "Beobachte Veränderungen frühzeitig, besonders in intensiven Lebensphasen."
      ]
    }
  }
};

function band(score, polarity) {
  if (polarity === "higherIsRisk") {
    if (score >= 67) return "high";
    if (score <= 39) return "low";
    return "mid";
  }

  if (score >= 67) return "high";
  if (score <= 39) return "low";
  return "mid";
}

function signalLabels(test, ranked) {
  const hasRisk = ranked.some((item) => item.polarity === "higherIsRisk");
  if (hasRisk) {
    return {
      strengthsTitle: "Ressourcen",
      growthTitle: "Aufmerksamkeitsfelder",
      strengths: ranked.filter((item) => item.polarity !== "higherIsRisk" || item.score <= 39).slice(0, 2),
      growth: ranked.filter((item) => item.polarity === "higherIsRisk").slice(0, 2)
    };
  }

  return {
    strengthsTitle: "Stärken",
    growthTitle: "Entwicklungsfelder",
    strengths: ranked.slice(0, 2),
    growth: ranked.slice(-2).reverse()
  };
}

export function createReport(test, scores) {
  const ranked = rankDimensions(test, scores);
  const labels = signalLabels(test, ranked);

  const topText = labels.strengths.map((item) => item.label).join(" und ");
  const focusText = labels.growth.map((item) => item.label).join(" und ");
  const overview = `${test.shortTitle}: Besonders sichtbar ist aktuell ${topText || "ein ausgeglichenes Profil"}. Aufmerksamkeit verdient ${focusText || "vor allem der Verlauf über Zeit"}. Die Ergebnisse sind als Reflexionshilfe gedacht und sollten immer im Kontext der aktuellen Lebenssituation gelesen werden.`;

  const sections = ranked.map((item) => {
    const itemBand = band(item.score, item.polarity);
    const copy = reportCopy[test.id]?.[itemBand] || reportCopy.bigFive[itemBand];
    return {
      dimension: item.dimension,
      label: item.label,
      score: item.score,
      text: copy.default,
      recommendations: copy.recommendations
    };
  });

  return {
    overview,
    strengthsTitle: labels.strengthsTitle,
    growthTitle: labels.growthTitle,
    strengths: labels.strengths.length ? labels.strengths : ranked.slice(0, 1),
    growth: labels.growth.length ? labels.growth : ranked.slice(-1),
    sections
  };
}

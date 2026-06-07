export const traits = {
  openness: {
    label: "Offenheit",
    short: "Offenheit",
    description: "Interesse an neuen Ideen, Perspektiven, Kreativität und geistiger Vielfalt.",
    color: "#0f9f8f"
  },
  conscientiousness: {
    label: "Gewissenhaftigkeit",
    short: "Fokus",
    description: "Planung, Verlässlichkeit, Ausdauer und ein strukturierter Umgang mit Zielen.",
    color: "#3454d1"
  },
  extraversion: {
    label: "Extraversion",
    short: "Energie",
    description: "Soziale Aktivität, Ausdrucksstärke und die Tendenz, Energie aus Kontakt zu ziehen.",
    color: "#e26d5c"
  },
  agreeableness: {
    label: "Verträglichkeit",
    short: "Kooperation",
    description: "Empathie, Hilfsbereitschaft, Rücksichtnahme und kooperative Konfliktlösung.",
    color: "#d99b28"
  },
  neuroticism: {
    label: "Neurotizismus",
    short: "Sensitivität",
    description: "Emotionale Reaktivität, Stresswahrnehmung und Bedürfnis nach innerer Sicherheit.",
    color: "#7b61ff"
  }
};

export const bigFiveTest = {
  id: "big-five",
  title: "Big-Five-Persönlichkeitstest",
  subtitle: "40 Aussagen, fünf Dimensionen, ein verständlicher Entwicklungsbericht.",
  scale: [
    "Trifft gar nicht zu",
    "Trifft eher nicht zu",
    "Teils/teils",
    "Trifft eher zu",
    "Trifft voll zu"
  ],
  questions: [
    { id: "o1", trait: "openness", text: "Ich suche gern nach neuen Blickwinkeln auf vertraute Themen." },
    { id: "o2", trait: "openness", text: "Kunst, Musik oder Design regen mich oft zum Nachdenken an." },
    { id: "o3", trait: "openness", text: "Ich mag Aufgaben, bei denen es keine eindeutig vorgegebene Lösung gibt." },
    { id: "o4", trait: "openness", text: "Ich probiere gern neue Lernmethoden, Tools oder Arbeitsweisen aus." },
    { id: "o5", trait: "openness", text: "Abstrakte Ideen interessieren mich auch dann, wenn sie keinen sofortigen Nutzen haben." },
    { id: "o6", trait: "openness", text: "Ich bleibe meist lieber bei vertrauten Routinen als bei Experimenten.", reverse: true },
    { id: "o7", trait: "openness", text: "Ich kann mich leicht in alternative Lebensentwürfe hineinversetzen." },
    { id: "o8", trait: "openness", text: "Ungewohnte Situationen sehe ich häufig als Gelegenheit, etwas zu entdecken." },

    { id: "c1", trait: "conscientiousness", text: "Ich erledige wichtige Aufgaben zuverlässig bis zum Ende." },
    { id: "c2", trait: "conscientiousness", text: "Ich plane meine Woche so, dass Prioritäten sichtbar bleiben." },
    { id: "c3", trait: "conscientiousness", text: "Ich achte auf Details, wenn die Qualität des Ergebnisses davon abhängt." },
    { id: "c4", trait: "conscientiousness", text: "Ich schiebe unangenehme Aufgaben häufig auf.", reverse: true },
    { id: "c5", trait: "conscientiousness", text: "Ich halte Absprachen auch dann ein, wenn es unbequem wird." },
    { id: "c6", trait: "conscientiousness", text: "Ordnung in Dokumenten, Aufgaben oder Terminen hilft mir, ruhig zu bleiben." },
    { id: "c7", trait: "conscientiousness", text: "Ich verliere Ziele aus dem Blick, sobald der Alltag hektisch wird.", reverse: true },
    { id: "c8", trait: "conscientiousness", text: "Ich arbeite gern mit klaren Standards für gute Ergebnisse." },

    { id: "e1", trait: "extraversion", text: "Gespräche mit anderen geben mir häufig neue Energie." },
    { id: "e2", trait: "extraversion", text: "Ich bringe meine Meinung in Gruppen meist sichtbar ein." },
    { id: "e3", trait: "extraversion", text: "Ich lerne neue Menschen relativ leicht kennen." },
    { id: "e4", trait: "extraversion", text: "Nach viel sozialem Kontakt brauche ich oft längere Rückzugszeit.", reverse: true },
    { id: "e5", trait: "extraversion", text: "Ich übernehme in Gruppen gern eine aktive Rolle." },
    { id: "e6", trait: "extraversion", text: "Ich wirke auf andere häufig lebendig und präsent." },
    { id: "e7", trait: "extraversion", text: "Ich bevorzuge meistens stille Einzelarbeit gegenüber Austausch.", reverse: true },
    { id: "e8", trait: "extraversion", text: "Ich kann positive Stimmung leicht nach aussen tragen." },

    { id: "a1", trait: "agreeableness", text: "Ich nehme die Bedürfnisse anderer in Entscheidungen ernst." },
    { id: "a2", trait: "agreeableness", text: "Ich versuche Konflikte fair und respektvoll zu lösen." },
    { id: "a3", trait: "agreeableness", text: "Ich helfe gern, wenn jemand Unterstützung braucht." },
    { id: "a4", trait: "agreeableness", text: "Ich sage sehr direkt, was ich denke, auch wenn es andere verletzt.", reverse: true },
    { id: "a5", trait: "agreeableness", text: "Ich kann gut zuhören, ohne sofort zu bewerten." },
    { id: "a6", trait: "agreeableness", text: "Kooperation ist mir wichtiger als Recht zu behalten." },
    { id: "a7", trait: "agreeableness", text: "Ich reagiere schnell misstrauisch, wenn andere etwas von mir wollen.", reverse: true },
    { id: "a8", trait: "agreeableness", text: "Ich finde meistens einen Ton, der Klarheit und Wertschätzung verbindet." },

    { id: "n1", trait: "neuroticism", text: "Ich mache mir schnell Sorgen, wenn vieles unklar ist." },
    { id: "n2", trait: "neuroticism", text: "Kritik beschäftigt mich oft länger, als mir lieb ist." },
    { id: "n3", trait: "neuroticism", text: "In stressigen Phasen spüre ich Anspannung deutlich." },
    { id: "n4", trait: "neuroticism", text: "Ich bleibe auch unter Druck meist innerlich gelassen.", reverse: true },
    { id: "n5", trait: "neuroticism", text: "Ich bemerke Stimmungen und Spannungen in mir sehr schnell." },
    { id: "n6", trait: "neuroticism", text: "Ich zweifle manchmal an mir, obwohl objektiv vieles gut läuft." },
    { id: "n7", trait: "neuroticism", text: "Unerwartete Änderungen bringen mich selten aus der Ruhe.", reverse: true },
    { id: "n8", trait: "neuroticism", text: "Ich brauche nach belastenden Situationen bewusst Zeit zum Sortieren." }
  ]
};

export const plannedTests = [
  "Selbstwert",
  "Stress",
  "Bindungsstil",
  "Lebenszufriedenheit",
  "Werte-Test"
];

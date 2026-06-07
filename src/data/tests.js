export const tests = {
  bigFive: {
    id: "bigFive",
    title: "Big-Five-Persönlichkeitstest",
    shortTitle: "Big Five",
    category: "Persönlichkeit",
    subtitle: "40 Aussagen, fünf Dimensionen, ein verständlicher Entwicklungsbericht.",
    intro: "Bewerte jede Aussage spontan danach, wie typisch sie für dich im Alltag ist.",
    source: "Aktuelle MVP-Version mit Big-Five-orientierten Items. Als nächster fachlicher Schritt kann diese Skala durch IPIP-Items ersetzt werden.",
    license: "Eigene MVP-Items, nicht als normiertes Verfahren ausweisen.",
    caution: "Diese Auswertung dient der Selbstreflexion und ersetzt keine psychologische Diagnostik.",
    chart: "radar",
    scoreLabel: "Profilwert",
    scale: [
      { value: 1, label: "Trifft gar nicht zu" },
      { value: 2, label: "Trifft eher nicht zu" },
      { value: 3, label: "Teils/teils" },
      { value: 4, label: "Trifft eher zu" },
      { value: 5, label: "Trifft voll zu" }
    ],
    dimensions: {
      openness: {
        label: "Offenheit",
        short: "Offenheit",
        description: "Interesse an neuen Ideen, Perspektiven, Kreativität und geistiger Vielfalt.",
        color: "#0f9f8f",
        polarity: "higherIsMore"
      },
      conscientiousness: {
        label: "Gewissenhaftigkeit",
        short: "Fokus",
        description: "Planung, Verlässlichkeit, Ausdauer und ein strukturierter Umgang mit Zielen.",
        color: "#3454d1",
        polarity: "higherIsMore"
      },
      extraversion: {
        label: "Extraversion",
        short: "Energie",
        description: "Soziale Aktivität, Ausdrucksstärke und die Tendenz, Energie aus Kontakt zu ziehen.",
        color: "#e26d5c",
        polarity: "higherIsMore"
      },
      agreeableness: {
        label: "Verträglichkeit",
        short: "Kooperation",
        description: "Empathie, Hilfsbereitschaft, Rücksichtnahme und kooperative Konfliktlösung.",
        color: "#d99b28",
        polarity: "higherIsMore"
      },
      neuroticism: {
        label: "Neurotizismus",
        short: "Sensitivität",
        description: "Emotionale Reaktivität, Stresswahrnehmung und Bedürfnis nach innerer Sicherheit.",
        color: "#7b61ff",
        polarity: "higherIsMore"
      }
    },
    questions: [
      { id: "o1", dimension: "openness", text: "Ich suche gern nach neuen Blickwinkeln auf vertraute Themen." },
      { id: "o2", dimension: "openness", text: "Kunst, Musik oder Design regen mich oft zum Nachdenken an." },
      { id: "o3", dimension: "openness", text: "Ich mag Aufgaben, bei denen es keine eindeutig vorgegebene Lösung gibt." },
      { id: "o4", dimension: "openness", text: "Ich probiere gern neue Lernmethoden, Tools oder Arbeitsweisen aus." },
      { id: "o5", dimension: "openness", text: "Abstrakte Ideen interessieren mich auch dann, wenn sie keinen sofortigen Nutzen haben." },
      { id: "o6", dimension: "openness", text: "Ich bleibe meist lieber bei vertrauten Routinen als bei Experimenten.", reverse: true },
      { id: "o7", dimension: "openness", text: "Ich kann mich leicht in alternative Lebensentwürfe hineinversetzen." },
      { id: "o8", dimension: "openness", text: "Ungewohnte Situationen sehe ich häufig als Gelegenheit, etwas zu entdecken." },
      { id: "c1", dimension: "conscientiousness", text: "Ich erledige wichtige Aufgaben zuverlässig bis zum Ende." },
      { id: "c2", dimension: "conscientiousness", text: "Ich plane meine Woche so, dass Prioritäten sichtbar bleiben." },
      { id: "c3", dimension: "conscientiousness", text: "Ich achte auf Details, wenn die Qualität des Ergebnisses davon abhängt." },
      { id: "c4", dimension: "conscientiousness", text: "Ich schiebe unangenehme Aufgaben häufig auf.", reverse: true },
      { id: "c5", dimension: "conscientiousness", text: "Ich halte Absprachen auch dann ein, wenn es unbequem wird." },
      { id: "c6", dimension: "conscientiousness", text: "Ordnung in Dokumenten, Aufgaben oder Terminen hilft mir, ruhig zu bleiben." },
      { id: "c7", dimension: "conscientiousness", text: "Ich verliere Ziele aus dem Blick, sobald der Alltag hektisch wird.", reverse: true },
      { id: "c8", dimension: "conscientiousness", text: "Ich arbeite gern mit klaren Standards für gute Ergebnisse." },
      { id: "e1", dimension: "extraversion", text: "Gespräche mit anderen geben mir häufig neue Energie." },
      { id: "e2", dimension: "extraversion", text: "Ich bringe meine Meinung in Gruppen meist sichtbar ein." },
      { id: "e3", dimension: "extraversion", text: "Ich lerne neue Menschen relativ leicht kennen." },
      { id: "e4", dimension: "extraversion", text: "Nach viel sozialem Kontakt brauche ich oft längere Rückzugszeit.", reverse: true },
      { id: "e5", dimension: "extraversion", text: "Ich übernehme in Gruppen gern eine aktive Rolle." },
      { id: "e6", dimension: "extraversion", text: "Ich wirke auf andere häufig lebendig und präsent." },
      { id: "e7", dimension: "extraversion", text: "Ich bevorzuge meistens stille Einzelarbeit gegenüber Austausch.", reverse: true },
      { id: "e8", dimension: "extraversion", text: "Ich kann positive Stimmung leicht nach aussen tragen." },
      { id: "a1", dimension: "agreeableness", text: "Ich nehme die Bedürfnisse anderer in Entscheidungen ernst." },
      { id: "a2", dimension: "agreeableness", text: "Ich versuche Konflikte fair und respektvoll zu lösen." },
      { id: "a3", dimension: "agreeableness", text: "Ich helfe gern, wenn jemand Unterstützung braucht." },
      { id: "a4", dimension: "agreeableness", text: "Ich sage sehr direkt, was ich denke, auch wenn es andere verletzt.", reverse: true },
      { id: "a5", dimension: "agreeableness", text: "Ich kann gut zuhören, ohne sofort zu bewerten." },
      { id: "a6", dimension: "agreeableness", text: "Kooperation ist mir wichtiger als Recht zu behalten." },
      { id: "a7", dimension: "agreeableness", text: "Ich reagiere schnell misstrauisch, wenn andere etwas von mir wollen.", reverse: true },
      { id: "a8", dimension: "agreeableness", text: "Ich finde meistens einen Ton, der Klarheit und Wertschätzung verbindet." },
      { id: "n1", dimension: "neuroticism", text: "Ich mache mir schnell Sorgen, wenn vieles unklar ist." },
      { id: "n2", dimension: "neuroticism", text: "Kritik beschäftigt mich oft länger, als mir lieb ist." },
      { id: "n3", dimension: "neuroticism", text: "In stressigen Phasen spüre ich Anspannung deutlich." },
      { id: "n4", dimension: "neuroticism", text: "Ich bleibe auch unter Druck meist innerlich gelassen.", reverse: true },
      { id: "n5", dimension: "neuroticism", text: "Ich bemerke Stimmungen und Spannungen in mir sehr schnell." },
      { id: "n6", dimension: "neuroticism", text: "Ich zweifle manchmal an mir, obwohl objektiv vieles gut läuft." },
      { id: "n7", dimension: "neuroticism", text: "Unerwartete Änderungen bringen mich selten aus der Ruhe.", reverse: true },
      { id: "n8", dimension: "neuroticism", text: "Ich brauche nach belastenden Situationen bewusst Zeit zum Sortieren." }
    ]
  },
  rses: {
    id: "rses",
    title: "Rosenberg Self-Esteem Scale",
    shortTitle: "Selbstwert",
    category: "Selbstbild",
    subtitle: "10 Items zur globalen Selbstwertschätzung nach Rosenberg.",
    intro: "Bitte bewerte, wie sehr die Aussagen im Allgemeinen auf dich zutreffen.",
    source: "Rosenberg, M. (1965). Society and the Adolescent Self-Image. Die Skala ist laut University of Maryland Public Domain.",
    license: "Public Domain, mit Quellenangabe nutzbar.",
    caution: "Die Skala zeigt Hinweise auf globale Selbstwertschätzung, ist aber keine Diagnose.",
    chart: "bar",
    scoreLabel: "Selbstwert",
    scale: [
      { value: 0, label: "Stimme gar nicht zu" },
      { value: 1, label: "Stimme eher nicht zu" },
      { value: 2, label: "Stimme eher zu" },
      { value: 3, label: "Stimme voll zu" }
    ],
    dimensions: {
      selfEsteem: {
        label: "Globaler Selbstwert",
        short: "Selbstwert",
        description: "Grundlegende wertschätzende Haltung gegenüber der eigenen Person.",
        color: "#0f9f8f",
        polarity: "higherIsBetter"
      }
    },
    questions: [
      { id: "rses1", dimension: "selfEsteem", text: "Ich habe das Gefühl, als Person wertvoll zu sein." },
      { id: "rses2", dimension: "selfEsteem", text: "Ich habe eine Reihe guter Eigenschaften." },
      { id: "rses3", dimension: "selfEsteem", text: "Alles in allem neige ich dazu, mich als Versagerin oder Versager zu sehen.", reverse: true },
      { id: "rses4", dimension: "selfEsteem", text: "Ich kann Dinge ungefähr so gut wie die meisten anderen Menschen." },
      { id: "rses5", dimension: "selfEsteem", text: "Ich habe das Gefühl, nicht viel zu haben, worauf ich stolz sein kann.", reverse: true },
      { id: "rses6", dimension: "selfEsteem", text: "Ich habe eine positive Einstellung zu mir selbst." },
      { id: "rses7", dimension: "selfEsteem", text: "Im Grossen und Ganzen bin ich mit mir zufrieden." },
      { id: "rses8", dimension: "selfEsteem", text: "Ich wünschte, ich könnte mehr Respekt vor mir selbst haben.", reverse: true },
      { id: "rses9", dimension: "selfEsteem", text: "Manchmal fühle ich mich nutzlos.", reverse: true },
      { id: "rses10", dimension: "selfEsteem", text: "Manchmal denke ich, dass ich zu nichts tauge.", reverse: true }
    ]
  },
  who5: {
    id: "who5",
    title: "WHO-5 Well-Being Index",
    shortTitle: "Wohlbefinden",
    category: "Wohlbefinden",
    subtitle: "5 Items zum subjektiven Wohlbefinden in den letzten zwei Wochen.",
    intro: "Bitte bewerte, wie häufig du dich in den letzten zwei Wochen so erlebt hast.",
    source: "World Health Organization. WHO-5 Well-Being Index. Selbstberichtsinstrument mit internationaler Verbreitung.",
    license: "WHO-Materialien sind frei verfügbar; konkrete Wiederverwendung sollte mit den WHO-Hinweisen abgeglichen werden.",
    caution: "Ein niedriger Wert kann Anlass sein, genauer hinzuschauen. Er ist keine Diagnose.",
    chart: "bar",
    scoreLabel: "Wohlbefinden",
    scale: [
      { value: 0, label: "Zu keinem Zeitpunkt" },
      { value: 1, label: "Selten" },
      { value: 2, label: "Manchmal" },
      { value: 3, label: "Mehr als die Hälfte der Zeit" },
      { value: 4, label: "Meistens" },
      { value: 5, label: "Die ganze Zeit" }
    ],
    dimensions: {
      wellbeing: {
        label: "Wohlbefinden",
        short: "Wohlbefinden",
        description: "Positive Stimmung, Vitalität, Ruhe und Interesse am Alltag.",
        color: "#3454d1",
        polarity: "higherIsBetter"
      }
    },
    questions: [
      { id: "who1", dimension: "wellbeing", text: "Ich fühlte mich fröhlich und gut gelaunt." },
      { id: "who2", dimension: "wellbeing", text: "Ich fühlte mich ruhig und entspannt." },
      { id: "who3", dimension: "wellbeing", text: "Ich fühlte mich aktiv und voller Energie." },
      { id: "who4", dimension: "wellbeing", text: "Ich wachte erholt und ausgeruht auf." },
      { id: "who5", dimension: "wellbeing", text: "Mein Alltag war voller Dinge, die mich interessieren." }
    ]
  },
  dass21: {
    id: "dass21",
    title: "DASS-21",
    shortTitle: "Stress & Belastung",
    category: "Belastung",
    subtitle: "21 Items zu Stress, Angst und depressiver Belastung in der letzten Woche.",
    intro: "Bitte bewerte, wie sehr jede Aussage in der vergangenen Woche auf dich zutraf.",
    source: "Lovibond, S. H. & Lovibond, P. F. (1995). Depression Anxiety Stress Scales. Die DASS-Fragebögen sind laut offizieller DASS-Seite Public Domain.",
    license: "Public Domain, bitte DASS-Quelle nennen.",
    caution: "Die Ergebnisse sind Screening-Hinweise. Bei hoher Belastung sollte eine fachliche Abklärung erfolgen.",
    chart: "radar",
    scoreLabel: "Belastung",
    scale: [
      { value: 0, label: "Traf gar nicht zu" },
      { value: 1, label: "Traf etwas zu" },
      { value: 2, label: "Traf deutlich zu" },
      { value: 3, label: "Traf sehr stark zu" }
    ],
    dimensions: {
      stress: {
        label: "Stress",
        short: "Stress",
        description: "Anspannung, Reizbarkeit und Schwierigkeit, innerlich herunterzufahren.",
        color: "#d99b28",
        polarity: "higherIsRisk"
      },
      anxiety: {
        label: "Angst",
        short: "Angst",
        description: "Körperliche Erregung, akute Besorgnis und Angstreaktionen.",
        color: "#7b61ff",
        polarity: "higherIsRisk"
      },
      depression: {
        label: "Depressive Belastung",
        short: "Belastung",
        description: "Niedergeschlagenheit, Interessenverlust und reduzierte positive Erwartung.",
        color: "#e26d5c",
        polarity: "higherIsRisk"
      }
    },
    questions: [
      { id: "d1", dimension: "stress", text: "Es fiel mir schwer, innerlich zur Ruhe zu kommen." },
      { id: "d2", dimension: "anxiety", text: "Ich bemerkte Mundtrockenheit." },
      { id: "d3", dimension: "depression", text: "Ich konnte kaum positive Gefühle erleben." },
      { id: "d4", dimension: "anxiety", text: "Ich hatte Atembeschwerden, ohne körperlich stark belastet zu sein." },
      { id: "d5", dimension: "depression", text: "Es fiel mir schwer, die Initiative zu ergreifen." },
      { id: "d6", dimension: "stress", text: "Ich reagierte in Situationen eher über." },
      { id: "d7", dimension: "anxiety", text: "Ich spürte Zittern, zum Beispiel in den Händen." },
      { id: "d8", dimension: "stress", text: "Ich hatte das Gefühl, viel nervöse Energie zu verbrauchen." },
      { id: "d9", dimension: "anxiety", text: "Ich sorgte mich, in Panik zu geraten oder mich zu blamieren." },
      { id: "d10", dimension: "depression", text: "Ich hatte das Gefühl, nichts zu haben, worauf ich mich freuen konnte." },
      { id: "d11", dimension: "stress", text: "Ich bemerkte, dass ich unruhig oder aufgewühlt war." },
      { id: "d12", dimension: "stress", text: "Es fiel mir schwer, mich zu entspannen." },
      { id: "d13", dimension: "depression", text: "Ich fühlte mich niedergeschlagen und traurig." },
      { id: "d14", dimension: "stress", text: "Ich wurde ungeduldig, wenn ich aufgehalten wurde." },
      { id: "d15", dimension: "anxiety", text: "Ich hatte ein Gefühl von Schwäche oder Benommenheit." },
      { id: "d16", dimension: "depression", text: "Ich konnte mich für fast nichts begeistern." },
      { id: "d17", dimension: "depression", text: "Ich hatte das Gefühl, als Person wenig wert zu sein." },
      { id: "d18", dimension: "stress", text: "Ich war leicht reizbar." },
      { id: "d19", dimension: "anxiety", text: "Ich spürte mein Herz deutlich, ohne körperliche Anstrengung." },
      { id: "d20", dimension: "anxiety", text: "Ich fühlte mich ohne klaren Grund ängstlich." },
      { id: "d21", dimension: "depression", text: "Ich hatte das Gefühl, das Leben sei sinnlos." }
    ]
  }
};

export const plannedTests = ["Bindungsstil", "Werte-Test", "IPIP Big Five Upgrade"];

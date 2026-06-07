# MindScope Big-Five MVP

Eine moderne, responsive Web-App für psychologische Selbstanalyse. Nutzerinnen und Nutzer wählen zwischen mehreren Selbstberichtsinstrumenten und erhalten danach ein persönliches Dashboard mit Diagramm, Stärken, Aufmerksamkeitsfeldern und verständlichem Bericht.

## Funktionen

- Testauswahl mit Big Five, Rosenberg Self-Esteem Scale, WHO-5 und DASS-21
- Reverse-Scoring für ausgewählte Items
- Dynamische Auswertung je nach Testdimensionen
- Werte von 0 bis 100 pro Dimension
- Canvas-basierte Radar- und Balken-Charts ohne externe Abhängigkeiten
- Automatisch generierter Persönlichkeitsbericht ohne klinische Sprache
- Empfehlungen für Beruf, Lernen, Beziehungen und persönliche Entwicklung
- Beispieldaten für eine schnelle Demo
- Erweiterbare Teststruktur für spätere Module

## Eingebundene Instrumente

- Big Five: aktuelle MVP-Items, perspektivisch durch IPIP-basierte Items ersetzbar.
- Rosenberg Self-Esteem Scale (RSES): 10 Items zur globalen Selbstwertschätzung, Public Domain laut University of Maryland.
- WHO-5 Well-Being Index: 5 Items zum Wohlbefinden in den letzten zwei Wochen, WHO-Selbstberichtsinstrument.
- DASS-21: 21 Items zu Stress, Angst und depressiver Belastung, Public Domain laut offizieller DASS-Seite.

Die App formuliert Ergebnisse als Selbstreflexion und Screening-Hinweise. Sie ersetzt keine Diagnostik, Beratung oder Behandlung.

## Lokal starten

Voraussetzung: Node.js.

```bash
npm run dev
```

Falls `npm` nicht verfügbar ist, funktioniert auch direkt:

```bash
node server.js
```

Danach im Browser öffnen:

```text
http://localhost:4173
```

## Öffentlich veröffentlichen

Die App kann direkt über GitHub Pages veröffentlicht werden, weil sie ohne Backend als statische Website funktioniert.

Empfohlene Einstellungen im GitHub-Repository:

- Settings > Pages
- Source: Deploy from a branch
- Branch: main
- Folder: /root

Die öffentliche URL hat danach üblicherweise dieses Format:

```text
https://DEIN-USERNAME.github.io/REPOSITORY-NAME/
```

## Projektstruktur

```text
.
├── index.html
├── package.json
├── server.js
└── src
    ├── data
    │   ├── sampleProfiles.js
    │   └── tests.js
    ├── lib
    │   ├── report.js
    │   └── scoring.js
    ├── main.js
    └── styles.css
```

## Erweiterbarkeit

Weitere Tests können als eigene Testdefinitionen ergänzt werden. Ein Test sollte mindestens `id`, `title`, `scale` und `questions` enthalten. Die Scoring-Logik kann pro Testtyp erweitert oder ausgetauscht werden, ohne dass Dashboard und Bericht komplett neu gebaut werden müssen.

Weitere geplante Module:

- Bindungsstil
- Werte-Test
- IPIP Big Five Upgrade

## Monetarisierungsmodelle

- Freemium: kostenloser Basistest, bezahlter Tiefenbericht mit Handlungsempfehlungen.
- Abo: monatlicher Zugang zu mehreren Tests, Verlauf, Journaling und Reflexionsübungen.
- B2B: Team- und Coaching-Dashboards für Unternehmen, Coaches oder Weiterbildungsanbieter.
- One-time Purchase: einzelner Premiumbericht als PDF oder interaktives Dossier.
- Partnerangebote: kuratierte Kurse, Coaching-Sessions oder Lernprogramme passend zum Profil.

## Hinweis

Die App dient der Selbstreflexion und persönlichen Entwicklung. Sie ersetzt keine psychologische Diagnostik, Beratung oder medizinische Behandlung. Für produktive fachliche Nutzung sollten Itemformulierungen, Quellenangaben, Normbezüge und Interpretationsgrenzen vor Veröffentlichung psychologisch und rechtlich geprüft werden.

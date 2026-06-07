# MindScope Big-Five MVP

Eine moderne, responsive Web-App für psychologische Selbstanalyse. Nutzerinnen und Nutzer beantworten einen Big-Five-Test mit 40 Aussagen auf einer Likert-Skala von 1 bis 5 und erhalten danach ein persönliches Dashboard mit Radar-Chart, Stärken, Entwicklungsfeldern und verständlichem Bericht.

## Funktionen

- Big-Five-Test mit 40 wissenschaftlich orientierten Aussagen
- Reverse-Scoring für ausgewählte Items
- Auswertung der Dimensionen Offenheit, Gewissenhaftigkeit, Extraversion, Verträglichkeit und Neurotizismus
- Werte von 0 bis 100 pro Dimension
- Canvas-basiertes Radar-Chart ohne externe Abhängigkeiten
- Automatisch generierter Persönlichkeitsbericht ohne klinische Sprache
- Empfehlungen für Beruf, Lernen, Beziehungen und persönliche Entwicklung
- Beispieldaten für eine schnelle Demo
- Erweiterbare Teststruktur für spätere Module

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

Geplante Module:

- Selbstwert
- Stress
- Bindungsstil
- Lebenszufriedenheit
- Werte-Test

## Monetarisierungsmodelle

- Freemium: kostenloser Basistest, bezahlter Tiefenbericht mit Handlungsempfehlungen.
- Abo: monatlicher Zugang zu mehreren Tests, Verlauf, Journaling und Reflexionsübungen.
- B2B: Team- und Coaching-Dashboards für Unternehmen, Coaches oder Weiterbildungsanbieter.
- One-time Purchase: einzelner Premiumbericht als PDF oder interaktives Dossier.
- Partnerangebote: kuratierte Kurse, Coaching-Sessions oder Lernprogramme passend zum Profil.

## Hinweis

Die App dient der Selbstreflexion und persönlichen Entwicklung. Sie ersetzt keine psychologische Diagnostik, Beratung oder medizinische Behandlung.

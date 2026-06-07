import { plannedTests, tests } from "./data/tests.js";
import { sampleAnswers } from "./data/sampleProfiles.js";
import { calculateScores, getCompletion, rankDimensions, summaryScore } from "./lib/scoring.js";
import { createReport } from "./lib/report.js";

const testIds = Object.keys(tests);
const state = {
  activeTestId: "bigFive",
  answersByTest: testIds.reduce((acc, id) => ({ ...acc, [id]: {} }), {}),
  view: "test",
  usingSample: false
};

const app = document.querySelector("#app");

function activeTest() {
  return tests[state.activeTestId];
}

function activeAnswers() {
  return state.answersByTest[state.activeTestId] || {};
}

function setAnswer(questionId, value) {
  state.answersByTest[state.activeTestId] = { ...activeAnswers(), [questionId]: value };
  state.usingSample = false;
  render();
}

function selectTest(testId) {
  state.activeTestId = testId;
  state.view = "test";
  state.usingSample = false;
  render();
}

function useSampleProfile() {
  state.answersByTest[state.activeTestId] = { ...sampleAnswers[state.activeTestId] };
  state.usingSample = true;
  state.view = "dashboard";
  render();
}

function resetTest() {
  state.answersByTest[state.activeTestId] = {};
  state.usingSample = false;
  state.view = "test";
  render();
}

function showDashboard() {
  const completion = getCompletion(activeTest(), activeAnswers());
  if (completion.percentage === 100) {
    state.view = "dashboard";
    render();
  }
}

function scoreModel() {
  const test = activeTest();
  const scores = calculateScores(test, activeAnswers());
  const ranked = rankDimensions(test, scores);
  return { test, scores, ranked, report: createReport(test, scores) };
}

function render() {
  const completion = getCompletion(activeTest(), activeAnswers());
  const canShowDashboard = completion.percentage === 100;

  app.innerHTML = `
    <header class="shell app-header">
      <a class="brand" href="#" data-action="home" aria-label="MindScope Start">
        <span class="brand-mark">M</span>
        <span>
          <strong>MindScope</strong>
          <small>Psychologische Selbstanalyse</small>
        </span>
      </a>
      <nav class="top-nav" aria-label="Hauptnavigation">
        <button class="${state.view === "test" ? "active" : ""}" data-view="test">Test</button>
        <button class="${state.view === "dashboard" ? "active" : ""}" data-view="dashboard" ${canShowDashboard ? "" : "disabled"}>Dashboard</button>
      </nav>
    </header>

    <main>
      ${state.view === "dashboard" && canShowDashboard ? dashboardTemplate() : testTemplate(completion)}
    </main>
  `;

  bindEvents();
  if (state.view === "dashboard" && canShowDashboard) {
    requestAnimationFrame(() => drawChart(scoreModel()));
  }
}

function testTemplate(completion) {
  const test = activeTest();
  const dimensionCount = Object.keys(test.dimensions).length;

  return `
    <section class="hero-band">
      <div class="shell hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Validierte Selbstberichtsinstrumente</p>
          <h1>${test.title}</h1>
          <p>${test.subtitle} ${test.caution}</p>
          <div class="hero-actions">
            <button class="primary" data-action="scroll-test">Test starten</button>
            <button class="secondary" data-action="sample">Beispieldaten laden</button>
          </div>
        </div>
        <aside class="insight-panel" aria-label="Testüberblick">
          <div>
            <span class="metric">${test.questions.length}</span>
            <span class="metric-label">Fragen</span>
          </div>
          <div>
            <span class="metric">${dimensionCount}</span>
            <span class="metric-label">${dimensionCount === 1 ? "Wert" : "Dimensionen"}</span>
          </div>
          <div>
            <span class="metric">${completion.percentage}%</span>
            <span class="metric-label">Fortschritt</span>
          </div>
        </aside>
      </div>
    </section>

    <section class="shell test-switcher" aria-label="Testauswahl">
      ${testIds.map((id) => testPillTemplate(tests[id])).join("")}
    </section>

    <section class="shell test-layout" id="test">
      <div class="progress-panel">
        <div class="progress-head">
          <span>${completion.answered} von ${completion.total} beantwortet</span>
          <strong>${completion.percentage}%</strong>
        </div>
        <div class="progress-track"><span style="width:${completion.percentage}%"></span></div>
        <p>${test.intro}</p>
        <div class="source-box">
          <strong>Quelle & Nutzung</strong>
          <span>${test.source}</span>
          <small>${test.license}</small>
        </div>
      </div>

      <form class="question-list" aria-label="${test.title}">
        ${test.questions.map((question, index) => questionTemplate(test, question, index)).join("")}
      </form>

      <div class="sticky-actions">
        <button class="secondary" data-action="reset" type="button">Zurücksetzen</button>
        <button class="primary" data-action="dashboard" type="button" ${completion.percentage === 100 ? "" : "disabled"}>
          Auswertung anzeigen
        </button>
      </div>
    </section>
  `;
}

function testPillTemplate(test) {
  const completion = getCompletion(test, state.answersByTest[test.id] || {});
  return `
    <button class="test-pill ${state.activeTestId === test.id ? "active" : ""}" data-test-id="${test.id}">
      <span>${test.shortTitle}</span>
      <small>${test.category} · ${completion.percentage}%</small>
    </button>
  `;
}

function questionTemplate(test, question, index) {
  const value = activeAnswers()[question.id];
  return `
    <fieldset class="question-card">
      <div class="question-title">
        <span aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
        <p>${question.text}</p>
      </div>
      <div class="likert scale-${test.scale.length}" role="radiogroup" aria-label="${question.text}">
        ${test.scale
          .map((option) => `
            <label class="${value === option.value ? "selected" : ""}">
              <input type="radio" name="${question.id}" value="${option.value}" ${value === option.value ? "checked" : ""} />
              <span>${option.value}</span>
              <small>${option.label}</small>
            </label>
          `)
          .join("")}
      </div>
    </fieldset>
  `;
}

function dashboardTemplate() {
  const { test, scores, ranked, report } = scoreModel();
  const average = summaryScore(scores);
  const top = ranked[0];
  const focus = ranked.find((item) => item.polarity === "higherIsRisk") || ranked[ranked.length - 1];

  return `
    <section class="dashboard-hero">
      <div class="shell dashboard-head">
        <div>
          <p class="eyebrow">${state.usingSample ? "Beispielprofil" : "Persönliche Auswertung"}</p>
          <h1>${test.shortTitle}-Dashboard</h1>
          <p>${report.overview}</p>
        </div>
        <div class="score-summary" aria-label="Profilzusammenfassung">
          <div><span>${average}</span><small>${test.scoreLabel}</small></div>
          <div><span>${top.score}</span><small>${top.label}</small></div>
          <div><span>${focus.score}</span><small>${focus.label}</small></div>
        </div>
      </div>
    </section>

    <section class="shell dashboard-grid">
      <div class="chart-panel">
        <div class="section-title">
          <span>${test.chart === "radar" ? "Radar-Chart" : "Score-Chart"}</span>
          <strong>0 bis 100</strong>
        </div>
        <canvas id="resultChart" width="760" height="560" aria-label="Diagramm der Testergebnisse"></canvas>
      </div>

      <div class="trait-stack">
        ${ranked.map((item) => scoreCardTemplate(item)).join("")}
      </div>
    </section>

    <section class="shell split-section">
      <div>
        <div class="section-title"><span>${report.strengthsTitle}</span></div>
        <div class="mini-grid">
          ${report.strengths.map((item) => signalCard(item, "Ressource")).join("")}
        </div>
      </div>
      <div>
        <div class="section-title"><span>${report.growthTitle}</span></div>
        <div class="mini-grid">
          ${report.growth.map((item) => signalCard(item, "Fokus")).join("")}
        </div>
      </div>
    </section>

    <section class="shell report-section">
      <div class="section-title">
        <span>Bericht & Empfehlungen</span>
        <button class="secondary" data-action="reset">Test neu starten</button>
      </div>
      <div class="report-list">
        ${report.sections.map(reportSectionTemplate).join("")}
      </div>
    </section>

    <section class="shell roadmap-section">
      <div class="section-title"><span>Weitere geplante Module</span></div>
      <div class="roadmap">
        ${plannedTests.map((plannedTest) => `<span>${plannedTest}</span>`).join("")}
      </div>
    </section>
  `;
}

function scoreCardTemplate(item) {
  return `
    <article class="score-card" style="--trait:${item.color}">
      <div>
        <strong>${item.label}</strong>
        <p>${item.description}</p>
      </div>
      <span class="score-number">${item.score}</span>
      <div class="bar"><span style="width:${item.score}%"></span></div>
    </article>
  `;
}

function signalCard(item, label) {
  return `
    <article class="signal-card" style="--trait:${item.color}">
      <small>${label}</small>
      <strong>${item.label}</strong>
      <span>${item.score}/100</span>
    </article>
  `;
}

function reportSectionTemplate(section) {
  return `
    <article class="report-card">
      <header>
        <span>${section.score}</span>
        <div>
          <h3>${section.label}</h3>
          <p>${section.text}</p>
        </div>
      </header>
      <ul>
        ${section.recommendations.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </article>
  `;
}

function drawChart(model) {
  if (model.test.chart === "radar" && Object.keys(model.test.dimensions).length > 2) {
    drawRadarChart(model);
    return;
  }
  drawBarChart(model);
}

// The charts are implemented locally so the MVP has no install step and stays easy to extend.
function prepareCanvas() {
  const canvas = document.querySelector("#resultChart");
  if (!canvas) return null;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, rect.width, rect.height);
  return { canvas, ctx, width: rect.width, height: rect.height };
}

function drawRadarChart({ test, scores }) {
  const prepared = prepareCanvas();
  if (!prepared) return;

  const { ctx, width, height } = prepared;
  const center = { x: width / 2, y: height / 2 + 10 };
  const radius = Math.min(width, height) * 0.34;
  const keys = Object.keys(test.dimensions);
  const step = (Math.PI * 2) / keys.length;

  ctx.lineWidth = 1;
  ctx.font = "13px Inter, system-ui, sans-serif";

  for (let ring = 1; ring <= 5; ring += 1) {
    const ringRadius = (radius / 5) * ring;
    ctx.beginPath();
    keys.forEach((_, index) => {
      const angle = -Math.PI / 2 + step * index;
      const point = {
        x: center.x + Math.cos(angle) * ringRadius,
        y: center.y + Math.sin(angle) * ringRadius
      };
      index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();
    ctx.strokeStyle = ring === 5 ? "rgba(27, 39, 51, 0.22)" : "rgba(27, 39, 51, 0.11)";
    ctx.stroke();
  }

  keys.forEach((key, index) => {
    const angle = -Math.PI / 2 + step * index;
    const outer = {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius
    };
    const labelPoint = {
      x: center.x + Math.cos(angle) * (radius + 58),
      y: center.y + Math.sin(angle) * (radius + 44)
    };

    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(outer.x, outer.y);
    ctx.strokeStyle = "rgba(27, 39, 51, 0.12)";
    ctx.stroke();

    ctx.fillStyle = test.dimensions[key].color;
    ctx.textAlign = labelPoint.x < center.x - 10 ? "right" : labelPoint.x > center.x + 10 ? "left" : "center";
    ctx.fillText(`${test.dimensions[key].short} ${scores[key]}`, labelPoint.x, labelPoint.y);
  });

  ctx.beginPath();
  keys.forEach((key, index) => {
    const angle = -Math.PI / 2 + step * index;
    const valueRadius = radius * (scores[key] / 100);
    const point = {
      x: center.x + Math.cos(angle) * valueRadius,
      y: center.y + Math.sin(angle) * valueRadius
    };
    index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(15, 159, 143, 0.16)";
  ctx.strokeStyle = "#0f9f8f";
  ctx.lineWidth = 3;
  ctx.fill();
  ctx.stroke();

  keys.forEach((key, index) => {
    const angle = -Math.PI / 2 + step * index;
    const valueRadius = radius * (scores[key] / 100);
    const point = {
      x: center.x + Math.cos(angle) * valueRadius,
      y: center.y + Math.sin(angle) * valueRadius
    };
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = test.dimensions[key].color;
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

function drawBarChart({ test, ranked }) {
  const prepared = prepareCanvas();
  if (!prepared) return;

  const { ctx, width, height } = prepared;
  const padding = 44;
  const barHeight = 34;
  const gap = 26;
  const startY = height / 2 - ((barHeight + gap) * ranked.length) / 2;
  const maxWidth = width - padding * 2;

  ctx.font = "14px Inter, system-ui, sans-serif";
  ranked.forEach((item, index) => {
    const y = startY + index * (barHeight + gap);
    ctx.fillStyle = "#64707d";
    ctx.fillText(item.label, padding, y - 10);

    ctx.fillStyle = "#e7ece8";
    roundRect(ctx, padding, y, maxWidth, barHeight, 8);
    ctx.fill();

    ctx.fillStyle = item.color;
    roundRect(ctx, padding, y, maxWidth * (item.score / 100), barHeight, 8);
    ctx.fill();

    ctx.fillStyle = "#17212b";
    ctx.font = "800 20px Inter, system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(`${item.score}`, width - padding, y - 10);
    ctx.textAlign = "left";
    ctx.font = "14px Inter, system-ui, sans-serif";
  });

  ctx.fillStyle = "#64707d";
  ctx.fillText(`${test.scoreLabel}: Werte von 0 bis 100`, padding, height - 32);
}

function roundRect(ctx, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.arcTo(x + width, y, x + width, y + height, safeRadius);
  ctx.arcTo(x + width, y + height, x, y + height, safeRadius);
  ctx.arcTo(x, y + height, x, y, safeRadius);
  ctx.arcTo(x, y, x + width, y, safeRadius);
  ctx.closePath();
}

function bindEvents() {
  app.querySelectorAll("input[type='radio']").forEach((input) => {
    input.addEventListener("change", (event) => {
      setAnswer(event.target.name, Number(event.target.value));
    });
  });

  app.querySelectorAll("[data-test-id]").forEach((button) => {
    button.addEventListener("click", () => selectTest(button.dataset.testId));
  });

  app.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      render();
    });
  });

  app.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const action = button.dataset.action;
      if (action === "home" || action === "scroll-test") document.querySelector("#test")?.scrollIntoView({ behavior: "smooth" });
      if (action === "sample") useSampleProfile();
      if (action === "reset") resetTest();
      if (action === "dashboard") showDashboard();
    });
  });
}

window.addEventListener("resize", () => {
  if (state.view === "dashboard" && getCompletion(activeTest(), activeAnswers()).percentage === 100) {
    drawChart(scoreModel());
  }
});

render();

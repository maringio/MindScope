import { bigFiveTest, plannedTests, traits } from "./data/tests.js";
import { sampleAnswers } from "./data/sampleProfiles.js";
import { calculateScores, getCompletion, rankTraits } from "./lib/scoring.js";
import { createReport } from "./lib/report.js";

const state = {
  answers: {},
  view: "test",
  usingSample: false
};

const app = document.querySelector("#app");

function setAnswer(questionId, value) {
  state.answers = { ...state.answers, [questionId]: value };
  state.usingSample = false;
  render();
}

function useSampleProfile() {
  state.answers = { ...sampleAnswers };
  state.usingSample = true;
  state.view = "dashboard";
  render();
}

function resetTest() {
  state.answers = {};
  state.usingSample = false;
  state.view = "test";
  render();
}

function showDashboard() {
  const completion = getCompletion(bigFiveTest, state.answers);
  if (completion.percentage === 100) {
    state.view = "dashboard";
    render();
  }
}

function scoreModel() {
  const scores = calculateScores(bigFiveTest, state.answers);
  const ranked = rankTraits(scores);
  return { scores, ranked, report: createReport(scores) };
}

function render() {
  const completion = getCompletion(bigFiveTest, state.answers);
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
    requestAnimationFrame(() => drawRadarChart(scoreModel().scores));
  }
}

function testTemplate(completion) {
  return `
    <section class="hero-band">
      <div class="shell hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">MVP für digitale Selbstentwicklung</p>
          <h1>${bigFiveTest.title}</h1>
          <p>${bigFiveTest.subtitle} Die Auswertung ist alltagsnah formuliert und ersetzt keine Beratung oder Diagnostik.</p>
          <div class="hero-actions">
            <button class="primary" data-action="scroll-test">Test starten</button>
            <button class="secondary" data-action="sample">Beispieldaten laden</button>
          </div>
        </div>
        <aside class="insight-panel" aria-label="Testüberblick">
          <div>
            <span class="metric">${bigFiveTest.questions.length}</span>
            <span class="metric-label">Fragen</span>
          </div>
          <div>
            <span class="metric">5</span>
            <span class="metric-label">Dimensionen</span>
          </div>
          <div>
            <span class="metric">${completion.percentage}%</span>
            <span class="metric-label">Fortschritt</span>
          </div>
        </aside>
      </div>
    </section>

    <section class="shell test-layout" id="test">
      <div class="progress-panel">
        <div class="progress-head">
          <span>${completion.answered} von ${completion.total} beantwortet</span>
          <strong>${completion.percentage}%</strong>
        </div>
        <div class="progress-track"><span style="width:${completion.percentage}%"></span></div>
        <p>Bewerte jede Aussage spontan danach, wie typisch sie für dich im Alltag ist.</p>
      </div>

      <form class="question-list" aria-label="Big-Five-Fragen">
        ${bigFiveTest.questions.map(questionTemplate).join("")}
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

function questionTemplate(question, index) {
  const value = state.answers[question.id];
  return `
    <fieldset class="question-card">
      <legend>
        <span>${String(index + 1).padStart(2, "0")}</span>
        ${question.text}
      </legend>
      <div class="likert" role="radiogroup" aria-label="${question.text}">
        ${bigFiveTest.scale
          .map((label, scaleIndex) => {
            const score = scaleIndex + 1;
            return `
              <label class="${value === score ? "selected" : ""}">
                <input type="radio" name="${question.id}" value="${score}" ${value === score ? "checked" : ""} />
                <span>${score}</span>
                <small>${label}</small>
              </label>
            `;
          })
          .join("")}
      </div>
    </fieldset>
  `;
}

function dashboardTemplate() {
  const { scores, ranked, report } = scoreModel();
  const average = Math.round(Object.values(scores).reduce((sum, value) => sum + value, 0) / 5);
  const top = ranked[0];
  const growth = ranked[ranked.length - 1];

  return `
    <section class="dashboard-hero">
      <div class="shell dashboard-head">
        <div>
          <p class="eyebrow">${state.usingSample ? "Beispielprofil" : "Persönliche Auswertung"}</p>
          <h1>Dein Big-Five-Dashboard</h1>
          <p>${report.overview}</p>
        </div>
        <div class="score-summary" aria-label="Profilzusammenfassung">
          <div><span>${average}</span><small>Profilindex</small></div>
          <div><span>${top.score}</span><small>${top.label}</small></div>
          <div><span>${growth.score}</span><small>${growth.label}</small></div>
        </div>
      </div>
    </section>

    <section class="shell dashboard-grid">
      <div class="chart-panel">
        <div class="section-title">
          <span>Radar-Chart</span>
          <strong>0 bis 100</strong>
        </div>
        <canvas id="radarChart" width="760" height="560" aria-label="Radar-Chart der Big-Five-Ergebnisse"></canvas>
      </div>

      <div class="trait-stack">
        ${ranked.map((item) => scoreCardTemplate(item)).join("")}
      </div>
    </section>

    <section class="shell split-section">
      <div>
        <div class="section-title"><span>Stärken</span></div>
        <div class="mini-grid">
          ${report.strengths.map((item) => signalCard(item, "Stärke")).join("")}
        </div>
      </div>
      <div>
        <div class="section-title"><span>Entwicklungsfelder</span></div>
        <div class="mini-grid">
          ${report.growth.map((item) => signalCard(item, "Fokus")).join("")}
        </div>
      </div>
    </section>

    <section class="shell report-section">
      <div class="section-title">
        <span>Persönlichkeitsbericht</span>
        <button class="secondary" data-action="reset">Test neu starten</button>
      </div>
      <div class="report-list">
        ${report.sections.map(reportSectionTemplate).join("")}
      </div>
    </section>

    <section class="shell roadmap-section">
      <div class="section-title"><span>Erweiterbare Testarchitektur</span></div>
      <div class="roadmap">
        ${plannedTests.map((test) => `<span>${test}</span>`).join("")}
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

// The chart is implemented locally so the MVP has no install step and stays easy to extend.
function drawRadarChart(scores) {
  const canvas = document.querySelector("#radarChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  const center = { x: width / 2, y: height / 2 + 10 };
  const radius = Math.min(width, height) * 0.34;
  const keys = Object.keys(traits);
  const step = (Math.PI * 2) / keys.length;

  ctx.clearRect(0, 0, width, height);
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
      x: center.x + Math.cos(angle) * (radius + 54),
      y: center.y + Math.sin(angle) * (radius + 42)
    };

    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(outer.x, outer.y);
    ctx.strokeStyle = "rgba(27, 39, 51, 0.12)";
    ctx.stroke();

    ctx.fillStyle = traits[key].color;
    ctx.textAlign = labelPoint.x < center.x - 10 ? "right" : labelPoint.x > center.x + 10 ? "left" : "center";
    ctx.fillText(`${traits[key].short} ${scores[key]}`, labelPoint.x, labelPoint.y);
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
  ctx.fillStyle = "rgba(15, 159, 143, 0.18)";
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
    ctx.fillStyle = traits[key].color;
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

function bindEvents() {
  app.querySelectorAll("input[type='radio']").forEach((input) => {
    input.addEventListener("change", (event) => {
      setAnswer(event.target.name, Number(event.target.value));
    });
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
  if (state.view === "dashboard" && getCompletion(bigFiveTest, state.answers).percentage === 100) {
    drawRadarChart(scoreModel().scores);
  }
});

render();

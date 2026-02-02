import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const APP_NAME = "Dashboard MCP";
const APP_VERSION = "0.2.0";
const RESOURCE_URI = "ui://dashboard_mcp/hello";
const TOOL_NAME = "dashboard_mcp_hello";

const helloAppHtml = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Laborteam Dashboard</title>
    <style>
      :root {
        color-scheme: light;
        font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #f5f7fb;
        color: #0f172a;
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 0;
      }
      .app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .topbar {
        height: 64px;
        background: #ffffff;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;
        box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
      }
      .view-tabs {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 24px;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
      }
      .tab-button {
        border: 1px solid transparent;
        background: #ffffff;
        color: #0f172a;
        font-weight: 600;
        padding: 8px 14px;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .tab-button.active {
        border-color: #0f766e;
        color: #0f766e;
        background: #ecfeff;
        box-shadow: 0 6px 16px rgba(15, 118, 110, 0.12);
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .brand-icon {
        width: 36px;
        height: 36px;
        border-radius: 12px;
        background: #0f766e;
        color: #ffffff;
        display: grid;
        place-items: center;
        font-weight: 700;
      }
      .brand h1 {
        font-size: 18px;
        margin: 0;
      }
      .top-actions {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .status-pill {
        background: #ecfeff;
        color: #0f766e;
        padding: 6px 12px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 600;
      }
      .layout {
        flex: 1;
        display: grid;
        grid-template-columns: 320px 1fr;
        gap: 24px;
        padding: 24px;
      }
      .sidebar {
        background: #ffffff;
        border-radius: 20px;
        padding: 20px;
        border: 1px solid #e2e8f0;
        display: flex;
        flex-direction: column;
        min-height: 0;
      }
      .sidebar h2 {
        font-size: 12px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #64748b;
        margin: 0 0 12px 0;
      }
      .experiment-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow-y: auto;
        padding-right: 6px;
      }
      .experiment-card {
        border: 1px solid #e2e8f0;
        background: #f8fafc;
        border-radius: 16px;
        padding: 12px;
        cursor: pointer;
        transition: border 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        text-align: left;
      }
      .experiment-card:hover {
        border-color: #94a3b8;
        box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);
        transform: translateY(-1px);
      }
      .experiment-card.active {
        background: #ffffff;
        border-color: #0f766e;
        box-shadow: 0 10px 24px rgba(15, 118, 110, 0.16);
      }
      .experiment-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 11px;
        color: #64748b;
        margin-bottom: 6px;
      }
      .experiment-title {
        font-size: 14px;
        font-weight: 600;
        margin: 0 0 4px 0;
        color: #0f172a;
      }
      .experiment-project {
        font-size: 12px;
        color: #475569;
      }
      .status-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        padding: 4px 8px;
        border-radius: 999px;
        border: 1px solid transparent;
        font-weight: 600;
      }
      .status--completed {
        background: #dcfce7;
        border-color: #86efac;
        color: #166534;
      }
      .status--in-progress {
        background: #e0f2fe;
        border-color: #7dd3fc;
        color: #0c4a6e;
      }
      .status--review {
        background: #fef3c7;
        border-color: #fcd34d;
        color: #92400e;
      }
      .status--planned {
        background: #e2e8f0;
        border-color: #cbd5f5;
        color: #475569;
      }
      .content {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .content-view {
        display: none;
        flex-direction: column;
        gap: 20px;
      }
      .content-view.is-active {
        display: flex;
      }
      .overview-card {
        background: #ffffff;
        border-radius: 24px;
        padding: 24px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
      }
      .overview-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 16px;
      }
      .overview-header h2 {
        margin: 0;
        font-size: 22px;
      }
      .overview-meta {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 12px;
        margin-top: 16px;
      }
      .meta-item {
        background: #f8fafc;
        border-radius: 14px;
        padding: 12px;
        border: 1px solid #e2e8f0;
      }
      .meta-item span {
        display: block;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #64748b;
        margin-bottom: 6px;
      }
      .meta-item strong {
        font-size: 14px;
        color: #0f172a;
      }
      .detail-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
      }
      .detail-card {
        background: #ffffff;
        border-radius: 16px;
        padding: 16px;
        border: 1px solid #e2e8f0;
      }
      .detail-card h3 {
        margin: 0 0 12px 0;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #94a3b8;
      }
      .followup-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 12px;
      }
      .followup-card {
        border: 1px solid #e2e8f0;
        background: #f8fafc;
        border-radius: 16px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .followup-card p {
        margin: 0;
        font-size: 13px;
        color: #0f172a;
      }
      .followup-actions {
        display: flex;
        gap: 8px;
      }
      .action-button {
        flex: 1;
        border-radius: 10px;
        padding: 6px 10px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        border: 1px solid transparent;
      }
      .action-primary {
        background: #0f766e;
        color: #ffffff;
      }
      .action-secondary {
        background: #e2e8f0;
        color: #1e293b;
      }
      .action-muted {
        background: #dcfce7;
        color: #166534;
        cursor: default;
      }
      .metrics {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
      }
      .metric {
        background: #f1f5f9;
        border-radius: 12px;
        padding: 10px;
        text-align: center;
      }
      .metric span {
        display: block;
        font-size: 11px;
        color: #64748b;
      }
      .metric strong {
        font-size: 16px;
        color: #0f172a;
      }
      .notes {
        margin: 0;
        padding-left: 18px;
        color: #475569;
        font-size: 13px;
        line-height: 1.6;
      }
      .notes-text {
        margin: 0;
        color: #475569;
        font-size: 13px;
        line-height: 1.6;
      }
      .report-link {
        display: inline-flex;
        margin-top: 6px;
        padding: 8px 12px;
        border-radius: 10px;
        background: #e0f2fe;
        color: #0c4a6e;
        font-weight: 600;
        font-size: 13px;
        text-decoration: none;
        pointer-events: none;
      }
      .planning-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
        gap: 20px;
      }
      .planning-card {
        background: #ffffff;
        border-radius: 20px;
        padding: 20px;
        border: 1px solid #e2e8f0;
      }
      .planning-card h3 {
        margin: 0 0 12px 0;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #94a3b8;
      }
      .planning-form {
        display: grid;
        gap: 12px;
      }
      .form-row {
        display: grid;
        gap: 8px;
      }
      .form-row label {
        font-size: 12px;
        font-weight: 600;
        color: #475569;
      }
      .input,
      .select,
      .textarea {
        width: 100%;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 10px 12px;
        font-size: 13px;
        font-family: inherit;
        background: #f8fafc;
        color: #0f172a;
      }
      .textarea {
        min-height: 90px;
        resize: vertical;
      }
      .plan-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .plan-card {
        border: 1px solid #e2e8f0;
        background: #f8fafc;
        border-radius: 16px;
        padding: 14px;
        display: grid;
        gap: 10px;
      }
      .plan-card header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
      }
      .plan-card h4 {
        margin: 0;
        font-size: 14px;
      }
      .plan-badge {
        font-size: 11px;
        padding: 4px 8px;
        border-radius: 999px;
        background: #e0f2fe;
        color: #0c4a6e;
        font-weight: 600;
      }
      .plan-actions {
        display: flex;
        gap: 8px;
      }
      .ghost-button,
      .primary-button,
      .secondary-button {
        border-radius: 10px;
        padding: 8px 12px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        border: 1px solid transparent;
      }
      .primary-button {
        background: #0f766e;
        color: #ffffff;
      }
      .secondary-button {
        background: #e2e8f0;
        color: #1e293b;
      }
      .ghost-button {
        background: #ffffff;
        border-color: #e2e8f0;
        color: #64748b;
      }
      .planning-feed {
        display: grid;
        gap: 10px;
      }
      .planning-feed-item {
        border: 1px solid #e2e8f0;
        border-radius: 14px;
        padding: 12px;
        background: #ffffff;
      }
      .planning-feed-item strong {
        display: block;
        font-size: 13px;
        margin-bottom: 4px;
      }
      .planning-feed-item span {
        font-size: 12px;
        color: #64748b;
      }
      .confirmation {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        background: #ecfeff;
        border: 1px solid #99f6e4;
        padding: 14px;
        border-radius: 16px;
      }
      .confirmation p {
        margin: 0;
        font-size: 13px;
        color: #0f172a;
      }
      .notice {
        margin-top: 8px;
        font-size: 12px;
        color: #0f766e;
        font-weight: 600;
      }
      @media (max-width: 960px) {
        .layout {
          grid-template-columns: 1fr;
        }
        .sidebar {
          order: 2;
        }
        .planning-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <div class="app">
      <header class="topbar">
        <div class="brand">
          <div class="brand-icon">LAB</div>
          <div>
            <h1>Laborteam Dashboard</h1>
            <div class="status-pill">Prozesschemie · Q1/2026</div>
          </div>
        </div>
        <div class="top-actions">
          <span class="status-pill">5 aktive Experimente</span>
          <div class="status-pill">Leitung: M. Weber</div>
        </div>
      </header>
      <div class="view-tabs">
        <button class="tab-button active" type="button" data-view="overview">Experimentübersicht</button>
        <button class="tab-button" type="button" data-view="planning">Experimentplanung</button>
      </div>

      <main class="layout">
        <aside class="sidebar">
          <h2>Letzte 5 Experimente</h2>
          <div id="experiment-list" class="experiment-list"></div>
        </aside>

        <section class="content">
          <section id="overview-view" class="content-view is-active">
            <div class="overview-card">
              <div class="overview-header">
                <div>
                  <div class="experiment-meta" id="detail-meta"></div>
                  <h2 id="detail-title"></h2>
                  <p id="detail-summary" class="experiment-project"></p>
                </div>
                <div id="detail-status" class="status-chip"></div>
              </div>
              <div class="overview-meta">
                <div class="meta-item">
                  <span>Projekt</span>
                  <strong id="detail-project"></strong>
                </div>
                <div class="meta-item">
                  <span>Laborant/in</span>
                  <strong id="detail-lead"></strong>
                </div>
                <div class="meta-item">
                  <span>Datum</span>
                  <strong id="detail-date"></strong>
                </div>
              </div>
            </div>

            <div class="detail-grid">
              <div class="detail-card">
                <h3>Kurzfassung</h3>
                <p class="notes-text" id="detail-summary-card"></p>
              </div>
              <div class="detail-card">
                <h3>Main Findings</h3>
                <ul class="notes" id="detail-findings"></ul>
              </div>
              <div class="detail-card">
                <h3>Kommentar Labor-Teamleitung</h3>
                <p class="notes-text" id="detail-comment"></p>
              </div>
            </div>

            <div class="detail-card">
              <h3>Vorschläge für Folgeversuche</h3>
              <div class="followup-grid" id="detail-followups"></div>
            </div>

            <div class="detail-card">
              <h3>Vollständiger Bericht</h3>
              <p class="notes-text" id="detail-report"></p>
              <a class="report-link" href="#" aria-disabled="true">Bericht öffnen</a>
              <p class="notes-text" style="margin-top: 8px;">
                Hinweis: Ein Klick würde den vollständigen PDF-Bericht im Dokumentenarchiv öffnen.
              </p>
            </div>
          </section>

          <section id="planning-view" class="content-view">
            <div class="overview-card">
              <div class="overview-header">
                <div>
                  <div class="experiment-meta">Experimentplanung · Q1/2026</div>
                  <h2>Neue Versuchsreihen auf Basis vorhandener Daten planen</h2>
                  <p class="experiment-project">
                    Wähle ein Basisexperiment aus, passe die Parameter an und plane mehrere Folgeversuche. Die Planungstexte
                    werden automatisch aus der Kurzfassung abgeleitet.
                  </p>
                </div>
                <div class="status-chip status--planned">Planungsmodus</div>
              </div>
            </div>

            <div class="planning-grid">
              <div class="planning-card">
                <h3>Basisexperiment & Planungsrahmen</h3>
                <div class="planning-form">
                  <div class="form-row">
                    <label for="planning-base">Basisexperiment auswählen</label>
                    <select id="planning-base" class="select"></select>
                  </div>
                  <div class="form-row">
                    <label>Planungszusammenfassung (kurz)</label>
                    <textarea id="planning-summary" class="textarea" readonly></textarea>
                  </div>
                  <div class="plan-actions">
                    <button class="primary-button" id="add-plan" type="button">Neuen Versuch hinzufügen</button>
                    <button class="ghost-button" id="add-plan-set" type="button">Set mit 3 Versuchen planen</button>
                  </div>
                </div>
                <div style="margin-top: 16px;">
                  <h3>Geplante Versuche</h3>
                  <div id="plan-list" class="plan-list"></div>
                </div>
              </div>

              <div class="planning-card">
                <h3>Planung & letzte Experimente</h3>
                <div class="planning-feed" id="planning-feed"></div>
                <div class="confirmation" style="margin-top: 16px;">
                  <p>Wenn die Planung abgeschlossen ist, bestätige sie für den Labor-Workflow.</p>
                  <button class="primary-button" id="confirm-plan" type="button">Planung bestätigen</button>
                </div>
                <div id="planning-confirmation" class="notice" aria-live="polite"></div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>

    <script>
      const EXPERIMENTS_DATA = [
        {
          id: "EXP-26-011",
          name: "Katalysator-Screening Phase 2",
          project: "Projekt Alpha-7",
          date: "08.01.2026",
          status: "completed",
          lead: "M. Weber",
          teaser: "Screening abgeschlossen, Fokus liegt jetzt auf dem Temperaturfenster.",
          summary:
            "Im Januar wurden acht Ligandenvarianten verglichen. L3 und L7 liefern die beste Selektivität, benötigen aber feinere Temperaturführung.",
          findings: [
            "L7 zeigt +12% Umsatz gegenüber Referenz",
            "Nebenproduktbildung sinkt ab 35°C deutlich",
            "Katalysatorstabilität bleibt über 6h konstant",
          ],
          leadComment: "ToDo: Stabilitätsdaten in das gemeinsame LIMS einpflegen.",
          followUps: [
            "Temperatur-Rampenlauf für L7 (30–45°C)",
            "Ligandenkombination L3/L7 in 1:1 testen",
            "Langzeitlauf mit reduzierter Rührgeschwindigkeit",
          ],
          reportNote: "Berichtsversion 1.3 liegt im Projektordner Alpha-7.",
        },
        {
          id: "EXP-26-012",
          name: "Optimierung Lösungsmittel",
          project: "Projekt Alpha-7",
          date: "12.01.2026",
          status: "in-progress",
          lead: "K. Müller",
          teaser: "DMSO-Lauf zeigt Nebenprodukte, der DMF-Vergleich läuft.",
          summary:
            "Die Reihe mit polaren aprotischen Lösungsmitteln ist zu 70% abgeschlossen. Erste Tendenz: DMF senkt die Nebenproduktbildung, braucht aber längere Reaktionszeit.",
          findings: [
            "DMSO: Nebenprodukt 6% höher als Zielwert",
            "DMF: 8h Reaktionszeit notwendig",
            "Gemisch DMSO/MeCN zeigt stabile Emulsion",
          ],
          leadComment: "Allgemeiner Kommentar: Bitte NMR-Proben heute noch archivieren.",
          followUps: [
            "DMF-Lauf mit Katalysator-L7 wiederholen",
            "Alternatives Lösungsmittel MeCN/EtOAc testen",
            "Rührprofil anpassen, um Emulsion zu vermeiden",
          ],
          reportNote: "Zwischenbericht wird nach Abschluss der DMF-Reihe erstellt.",
        },
        {
          id: "EXP-26-013",
          name: "Skalierung Batch 5kg",
          project: "Produktion Scale-Up",
          date: "17.01.2026",
          status: "review",
          lead: "S. Schmidt",
          teaser: "Kühlleistung angepasst, QS prüft aktuell die Batch-Probe.",
          summary:
            "Die Exothermie in Schritt 2 lag 4°C über Planwert. Nach Korrektur der Kühlkurve ist der Batch stabil. QS-Daten werden erwartet.",
          findings: [
            "Temperaturspitze nach 18 Minuten erreicht",
            "Reaktionsmischung bleibt homogen",
            "Filtration dauerte 12% länger",
          ],
          leadComment: "",
          followUps: [
            "Kühlkurve im Batch-Protokoll aktualisieren",
            "EHS-Review vor nächstem 10kg-Lauf",
            "QS-Ergebnis in Scale-up-Meeting vorstellen",
          ],
          reportNote: "Der finale QS-Report wird direkt im Produktionsbericht verlinkt.",
        },
        {
          id: "EXP-26-014",
          name: "Stabilitätsprüfung A4",
          project: "Langzeitstudie Q1",
          date: "22.01.2026",
          status: "planned",
          lead: "L. Fischer",
          teaser: "Probenplan freigegeben, Startmessung wird vorbereitet.",
          summary:
            "Der 4-Wochen-Stress-Test bei 40°C/75% rF ist für Ende Januar geplant. Alle Referenzstandards sind verfügbar, die Kammer ist bestätigt.",
          findings: [
            "Referenzstandards vollständig eingelagert",
            "Kammerlog zeigt stabile Temperatur",
            "Messplan wurde von QS freigegeben",
          ],
          leadComment: "ToDo: Probenetiketten heute drucken und prüfen.",
          followUps: [
            "Startmessung am 28.01 dokumentieren",
            "Monitoring-Slots für Woche 2 reservieren",
            "Kontrollprobe mitführen",
          ],
          reportNote: "Ein erster Zwischenstand wird nach Woche 2 im Bericht ergänzt.",
        },
        {
          id: "EXP-26-015",
          name: "Synthese Vorstufe B",
          project: "Projekt Beta-2",
          date: "30.01.2026",
          status: "completed",
          lead: "M. Weber",
          teaser: "Ausbeute stabil, Kristallisation wurde beschleunigt.",
          summary:
            "Die Synthese der Vorstufe B wurde mit optimiertem Kühlprofil wiederholt. Die Kristallisation verlief 40 Minuten schneller bei stabiler Reinheit.",
          findings: [
            "Ausbeute +6% gegenüber Dezember-Lauf",
            "Kristallisationszeit von 3h auf 2h20 reduziert",
            "Feuchtigkeitsgehalt innerhalb der Spezifikation",
          ],
          leadComment: "Allgemeiner Kommentar: Sehr guter Lauf, bitte SOP aktualisieren.",
          followUps: [
            "Kühlprofil in SOP übernehmen",
            "Q2-Langzeitlagerung vorbereiten",
            "Vorstufe B für Pilotlauf freigeben",
          ],
          reportNote: "Finaler Synthesebericht liegt im Projektordner Beta-2.",
        },
      ];

      const STATUS_LABELS = {
        completed: "Abgeschlossen",
        "in-progress": "In Arbeit",
        review: "Review offen",
        planned: "Geplant",
      };

      const listEl = document.getElementById("experiment-list");
      const detailTitle = document.getElementById("detail-title");
      const detailSummary = document.getElementById("detail-summary");
      const detailProject = document.getElementById("detail-project");
      const detailLead = document.getElementById("detail-lead");
      const detailDate = document.getElementById("detail-date");
      const detailStatus = document.getElementById("detail-status");
      const detailMeta = document.getElementById("detail-meta");
      const detailSummaryCard = document.getElementById("detail-summary-card");
      const detailFindings = document.getElementById("detail-findings");
      const detailComment = document.getElementById("detail-comment");
      const detailFollowups = document.getElementById("detail-followups");
      const detailReport = document.getElementById("detail-report");
      const viewButtons = document.querySelectorAll(".tab-button");
      const overviewView = document.getElementById("overview-view");
      const planningView = document.getElementById("planning-view");
      const planningBase = document.getElementById("planning-base");
      const planningSummary = document.getElementById("planning-summary");
      const planList = document.getElementById("plan-list");
      const planningFeed = document.getElementById("planning-feed");
      const addPlanButton = document.getElementById("add-plan");
      const addPlanSetButton = document.getElementById("add-plan-set");
      const confirmPlanButton = document.getElementById("confirm-plan");
      const planningConfirmation = document.getElementById("planning-confirmation");

      let activeId = EXPERIMENTS_DATA[0].id;
      const followUpState = new Map(
        EXPERIMENTS_DATA.map((experiment) => [experiment.id, [...experiment.followUps]]),
      );
      let plannedExperiments = [
        {
          id: "PLAN-26-016",
          baseId: "EXP-26-011",
          title: "Temperaturfenster 38°C",
          temperature: "38°C",
          duration: "8h",
          notes: "Fokus auf Selektivität, Rührgeschwindigkeit konstant.",
        },
        {
          id: "PLAN-26-017",
          baseId: "EXP-26-012",
          title: "DMF-Optimierung Laufzeit",
          temperature: "32°C",
          duration: "10h",
          notes: "Längere Laufzeit, DMF pur, mit L7-Katalysator.",
        },
      ];

      function statusClass(status) {
        return "status-chip status--" + status;
      }

      function renderList() {
        listEl.innerHTML = "";
        EXPERIMENTS_DATA.forEach((experiment) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "experiment-card" + (experiment.id === activeId ? " active" : "");
          button.dataset.id = experiment.id;

          const meta = document.createElement("div");
          meta.className = "experiment-meta";
          meta.textContent = experiment.id + " · " + experiment.date;

          const title = document.createElement("div");
          title.className = "experiment-title";
          title.textContent = experiment.name;

          const project = document.createElement("div");
          project.className = "experiment-project";
          project.textContent = experiment.project;

          const chip = document.createElement("span");
          chip.className = statusClass(experiment.status);
          chip.textContent = STATUS_LABELS[experiment.status] || experiment.status;

          button.append(meta, title, project, chip);
          button.addEventListener("click", () => setActive(experiment.id));
          listEl.appendChild(button);
        });
      }

      function renderDetails(experiment) {
        detailMeta.textContent = experiment.id;
        detailTitle.textContent = experiment.name;
        detailSummary.textContent = experiment.teaser || experiment.summary;
        detailProject.textContent = experiment.project;
        detailLead.textContent = experiment.lead;
        detailDate.textContent = experiment.date;
        detailStatus.className = statusClass(experiment.status);
        detailStatus.textContent = STATUS_LABELS[experiment.status] || experiment.status;

        detailSummaryCard.textContent = experiment.summary;

        detailFindings.innerHTML = "";
        experiment.findings.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          detailFindings.appendChild(li);
        });

        detailComment.textContent = experiment.leadComment
          ? experiment.leadComment
          : "Kein Kommentar hinterlegt.";

        detailFollowups.innerHTML = "";
        const followUps = followUpState.get(experiment.id) || [];
        followUps.forEach((item) => {
          const card = document.createElement("div");
          card.className = "followup-card";

          const text = document.createElement("p");
          text.textContent = item;

          const actions = document.createElement("div");
          actions.className = "followup-actions";

          const acceptButton = document.createElement("button");
          acceptButton.type = "button";
          acceptButton.className = "action-button action-primary";
          acceptButton.textContent = "Übernehmen";

          const discardButton = document.createElement("button");
          discardButton.type = "button";
          discardButton.className = "action-button action-secondary";
          discardButton.textContent = "Verwerfen";

          acceptButton.addEventListener("click", () => {
            acceptButton.textContent = "Übernommen";
            acceptButton.classList.remove("action-primary");
            acceptButton.classList.add("action-muted");
            acceptButton.disabled = true;
          });

          discardButton.addEventListener("click", () => {
            const current = followUpState.get(experiment.id) || [];
            followUpState.set(
              experiment.id,
              current.filter((entry) => entry !== item),
            );
            card.remove();
          });

          actions.append(acceptButton, discardButton);
          card.append(text, actions);
          detailFollowups.appendChild(card);
        });

        detailReport.textContent = experiment.reportNote;
      }

      function setView(view) {
        const isOverview = view === "overview";
        overviewView.classList.toggle("is-active", isOverview);
        planningView.classList.toggle("is-active", !isOverview);
        viewButtons.forEach((button) => {
          button.classList.toggle("active", button.dataset.view === view);
        });
      }

      function getExperimentById(id) {
        return EXPERIMENTS_DATA.find((item) => item.id === id);
      }

      function updatePlanningSummary() {
        const baseExperiment = getExperimentById(planningBase.value);
        if (!baseExperiment) return;
        planningSummary.value =
          "Basis: " +
          baseExperiment.name +
          " — " +
          baseExperiment.summary +
          " Anpassungen erfolgen bei Temperatur, Laufzeit und Rührprofil.";
      }

      function renderPlanningOptions() {
        planningBase.innerHTML = "";
        EXPERIMENTS_DATA.forEach((experiment) => {
          const option = document.createElement("option");
          option.value = experiment.id;
          option.textContent = experiment.id + " · " + experiment.name;
          planningBase.appendChild(option);
        });
        planningBase.value = activeId;
        updatePlanningSummary();
      }

      function renderPlannedExperiments() {
        planList.innerHTML = "";
        plannedExperiments.forEach((plan, index) => {
          const card = document.createElement("div");
          card.className = "plan-card";

          const header = document.createElement("header");
          const title = document.createElement("h4");
          title.textContent = plan.title;
          const badge = document.createElement("span");
          badge.className = "plan-badge";
          badge.textContent = "Geplant";
          header.append(title, badge);

          const info = document.createElement("p");
          info.className = "notes-text";
          info.textContent = "Planungstext: " + plan.notes;

          const fields = document.createElement("div");
          fields.className = "overview-meta";

          const temp = document.createElement("div");
          temp.className = "meta-item";
          temp.innerHTML = "<span>Temperatur</span><strong>" + plan.temperature + "</strong>";

          const duration = document.createElement("div");
          duration.className = "meta-item";
          duration.innerHTML = "<span>Laufzeit</span><strong>" + plan.duration + "</strong>";

          const base = document.createElement("div");
          base.className = "meta-item";
          const baseExperiment = getExperimentById(plan.baseId);
          base.innerHTML =
            "<span>Basis</span><strong>" +
            (baseExperiment ? baseExperiment.id : plan.baseId) +
            "</strong>";

          fields.append(temp, duration, base);

          const actions = document.createElement("div");
          actions.className = "plan-actions";

          const editButton = document.createElement("button");
          editButton.type = "button";
          editButton.className = "secondary-button";
          editButton.textContent = "Parameter anpassen";

          const removeButton = document.createElement("button");
          removeButton.type = "button";
          removeButton.className = "ghost-button";
          removeButton.textContent = "Entfernen";

          removeButton.addEventListener("click", () => {
            plannedExperiments = plannedExperiments.filter((_, idx) => idx !== index);
            renderPlannedExperiments();
            renderPlanningFeed();
          });

          actions.append(editButton, removeButton);
          card.append(header, info, fields, actions);
          planList.appendChild(card);
        });
      }

      function renderPlanningFeed() {
        planningFeed.innerHTML = "";

        plannedExperiments.forEach((plan) => {
          const item = document.createElement("div");
          item.className = "planning-feed-item";
          item.innerHTML =
            "<strong>" +
            plan.id +
            " · " +
            plan.title +
            "</strong><span>Geplant · Temperatur " +
            plan.temperature +
            ", Laufzeit " +
            plan.duration +
            "</span>";
          planningFeed.appendChild(item);
        });

        EXPERIMENTS_DATA.forEach((experiment) => {
          const item = document.createElement("div");
          item.className = "planning-feed-item";
          item.innerHTML =
            "<strong>" +
            experiment.id +
            " · " +
            experiment.name +
            "</strong><span>" +
            experiment.date +
            " · " +
            STATUS_LABELS[experiment.status] +
            "</span>";
          planningFeed.appendChild(item);
        });
      }

      function addPlannedExperiment(count) {
        const baseExperiment = getExperimentById(planningBase.value);
        if (!baseExperiment) return;
        const baseIndex = plannedExperiments.length + 16;
        for (let i = 0; i < count; i += 1) {
          plannedExperiments.push({
            id: "PLAN-26-" + String(baseIndex + i).padStart(3, "0"),
            baseId: baseExperiment.id,
            title: baseExperiment.name + " · Anpassung " + (i + 1),
            temperature: 34 + i * 2 + "°C",
            duration: 6 + i * 2 + "h",
            notes:
              "Aus der Kurzfassung abgeleitet: " +
              baseExperiment.summary.slice(0, 80) +
              "...",
          });
        }
        renderPlannedExperiments();
        renderPlanningFeed();
      }

      function setActive(id) {
        activeId = id;
        const experiment = EXPERIMENTS_DATA.find((item) => item.id === id);
        if (experiment) {
          renderList();
          renderDetails(experiment);
        }
      }

      renderList();
      setActive(activeId);
      renderPlanningOptions();
      renderPlannedExperiments();
      renderPlanningFeed();

      viewButtons.forEach((button) => {
        button.addEventListener("click", () => setView(button.dataset.view));
      });

      planningBase.addEventListener("change", () => {
        updatePlanningSummary();
      });

      addPlanButton.addEventListener("click", () => addPlannedExperiment(1));
      addPlanSetButton.addEventListener("click", () => addPlannedExperiment(3));

      confirmPlanButton.addEventListener("click", () => {
        const baseExperiment = getExperimentById(planningBase.value);
        const leadName = baseExperiment ? baseExperiment.lead : "Laborant/in";
        planningConfirmation.textContent =
          "Planung bestätigt. Hinweis: " + leadName + " wird informiert.";
      });
    </script>
  </body>
</html>`;

function createMcpServer() {
  const server = new McpServer({
    name: APP_NAME,
    version: APP_VERSION,
  });

  server.resource(
    "dashboard_mcp_hello_ui",
    RESOURCE_URI,
    { mimeType: "text/html", description: "Dashboard MCP Lab-UI" },
    async () => ({
      contents: [
        {
          uri: RESOURCE_URI,
          mimeType: "text/html",
          text: helloAppHtml,
        },
      ],
    }),
  );

  server.tool(
    TOOL_NAME,
    {
      description: "Gibt eine kurze Begrüßungsnachricht für die MCP-App zurück.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      _meta: {
        ui: {
          resourceUri: RESOURCE_URI,
        },
      },
    },
    async () => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              message: "Status OK: Dashboard-Daten geladen. Keine offenen Alarme.",
            }),
          },
        ],
      };
    },
  );

  return server;
}

export { createMcpServer, RESOURCE_URI, TOOL_NAME };

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
      .mode-switch {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0 24px 18px;
      }
      .mode-tab {
        border: 1px solid #e2e8f0;
        background: #ffffff;
        color: #0f172a;
        padding: 8px 16px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .mode-tab.active {
        background: #0f766e;
        border-color: #0f766e;
        color: #ffffff;
        box-shadow: 0 6px 16px rgba(15, 118, 110, 0.24);
      }
      .view {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .view.is-hidden {
        display: none;
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
      .followup-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 12px;
      }
      .followup-card {
        border: 1px solid #e2e8f0;
        border-radius: 14px;
        padding: 12px;
        background: #f8fafc;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .followup-card p {
        margin: 0;
        color: #0f172a;
        font-size: 13px;
      }
      .followup-actions {
        display: flex;
        gap: 8px;
      }
      .btn {
        border: 1px solid transparent;
        border-radius: 10px;
        padding: 6px 10px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
      }
      .btn-accept {
        background: #dcfce7;
        color: #166534;
        border-color: #86efac;
      }
      .btn-dismiss {
        background: #fee2e2;
        color: #991b1b;
        border-color: #fecaca;
      }
      .planning-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 16px;
      }
      .planning-field {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .planning-field label {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #64748b;
      }
      .planning-field input,
      .planning-field select,
      .planning-field textarea {
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 8px 10px;
        font-size: 13px;
        font-family: inherit;
      }
      .planning-field textarea {
        resize: vertical;
        min-height: 72px;
      }
      .planning-actions {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-top: 10px;
      }
      .btn-primary {
        background: #0f766e;
        color: #ffffff;
      }
      .btn-secondary {
        background: #e2e8f0;
        color: #0f172a;
      }
      .planning-card {
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 14px;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .planning-card h4 {
        margin: 0;
        font-size: 14px;
      }
      .planning-card p {
        margin: 0;
        color: #475569;
        font-size: 13px;
      }
      .planning-tag {
        align-self: flex-start;
        background: #e0f2fe;
        color: #0c4a6e;
        border-radius: 999px;
        padding: 4px 10px;
        font-size: 11px;
        font-weight: 600;
      }
      .planning-notice {
        display: none;
        margin-top: 12px;
        padding: 12px;
        border-radius: 12px;
        background: #ecfeff;
        color: #0f766e;
        font-size: 13px;
        border: 1px solid #99f6e4;
      }
      .planning-notice.visible {
        display: block;
      }
      @media (max-width: 960px) {
        .layout {
          grid-template-columns: 1fr;
        }
        .sidebar {
          order: 2;
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
      <nav class="mode-switch" role="tablist">
        <button class="mode-tab active" type="button" data-view="overview">Experimentübersicht</button>
        <button class="mode-tab" type="button" data-view="planning">Experimentplanung</button>
      </nav>

      <main class="layout">
        <aside class="sidebar">
          <h2>Geplante + letzte 5 Experimente</h2>
          <div id="experiment-list" class="experiment-list"></div>
        </aside>

        <section class="content view" id="overview-view">
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

        <section class="content view is-hidden" id="planning-view">
          <div class="overview-card">
            <div class="overview-header">
              <div>
                <div class="experiment-meta">Planungsmodus</div>
                <h2>Experimentplanung</h2>
                <p class="experiment-project">
                  Wähle ein Experiment als Basis, passe die Bedingungen an und plane mehrere Folgeversuche.
                </p>
              </div>
              <div class="status-chip status--planned">Planung aktiv</div>
            </div>
            <div class="overview-meta">
              <div class="meta-item">
                <span>Basis-Experiment</span>
                <strong id="planning-base-name"></strong>
              </div>
              <div class="meta-item">
                <span>Planungsnotiz</span>
                <strong id="planning-base-brief"></strong>
              </div>
              <div class="meta-item">
                <span>Neue Versuche</span>
                <strong id="planning-count">0</strong>
              </div>
            </div>
          </div>

          <div class="planning-grid">
            <div class="detail-card">
              <h3>Basis auswählen</h3>
              <div class="planning-field">
                <label for="planning-base-select">Experiment</label>
                <select id="planning-base-select"></select>
              </div>
              <p class="notes-text" id="planning-base-summary" style="margin-top: 12px;"></p>
            </div>

            <div class="detail-card">
              <h3>Neuen Versuch planen</h3>
              <div class="planning-field">
                <label for="planning-variation">Änderungsschwerpunkt</label>
                <input id="planning-variation" type="text" placeholder="z. B. Temperaturfenster 35–45°C" />
              </div>
              <div class="planning-field" style="margin-top: 10px;">
                <label for="planning-duration">Laufzeit</label>
                <input id="planning-duration" type="text" placeholder="z. B. 8h, 12h" />
              </div>
              <div class="planning-field" style="margin-top: 10px;">
                <label for="planning-notes">Zusätzliche Hinweise</label>
                <textarea id="planning-notes" placeholder="z. B. Rührprofil anpassen, Probe nach 2h entnehmen"></textarea>
              </div>
              <div class="planning-field" style="margin-top: 10px;">
                <label for="planning-repeat">Anzahl neuer Versuche</label>
                <input id="planning-repeat" type="number" min="1" max="5" value="1" />
              </div>
              <div class="planning-actions">
                <button class="btn btn-primary" id="planning-add" type="button">Versuch hinzufügen</button>
                <button class="btn btn-secondary" id="planning-reset" type="button">Felder leeren</button>
              </div>
            </div>

            <div class="detail-card">
              <h3>Geplante Experimente</h3>
              <div id="planning-list" class="experiment-list" style="gap: 10px;"></div>
            </div>
          </div>

          <div class="detail-card">
            <h3>Freigabe</h3>
            <p class="notes-text">
              Sobald die Planung abgeschlossen ist, bestätige die Freigabe. Der zuständige Laborant wird informiert.
            </p>
            <div class="planning-actions">
              <button class="btn btn-primary" id="planning-confirm" type="button">Planung abschließen</button>
            </div>
            <div class="planning-notice" id="planning-notice">
              Bestätigt. Laborant M. Weber wird informiert und erhält die Planung im LIMS.
            </div>
          </div>
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
          planningBrief:
            "Selektivität bei L7 ist hoch, aber die optimale Temperaturführung fehlt. Eine feinere Rampe sollte die Nebenprodukte senken.",
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
          planningBrief:
            "DMF wirkt vielversprechend, aber längere Laufzeit nötig. Eine Serie mit variierter Rührgeschwindigkeit könnte Emulsionen reduzieren.",
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
          planningBrief:
            "Exothermie war über Planwert. Nächste Schritte: Kühlprofil stabilisieren und QS-Ergebnis einplanen.",
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
          planningBrief:
            "Der 4-Wochen-Stress-Test startet Ende Januar. Fokus liegt auf Monitoring-Slots und Referenzproben.",
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
          planningBrief:
            "Das optimierte Kühlprofil verbessert die Kristallisationszeit. Nächster Schritt: Lagerstabilität und Pilotlauf vorbereiten.",
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

      const PLANNED_EXPERIMENTS = [
        {
          id: "PLAN-26-101",
          name: "Temperatur-Rampe L7 · 35–45°C",
          project: "Projekt Alpha-7",
          date: "05.02.2026",
          status: "planned",
          lead: "M. Weber",
          teaser: "Geplant ausgehend von EXP-26-011, Fokus auf Nebenprodukte.",
          planningBrief: "Temperaturführung wird enger, um Nebenprodukte zu senken.",
          summary:
            "Basierend auf EXP-26-011 wird die Temperaturführung in 2°C-Schritten angepasst, um Selektivität zu stabilisieren.",
          findings: ["Planungsstand: Parameter abgestimmt, Material verfügbar."],
          leadComment: "Bitte Sensorik vorab kalibrieren.",
          followUps: ["Sensorik prüfen", "Rührprofil dokumentieren"],
          reportNote: "Geplante Versuchsnotiz im LIMS hinterlegt.",
        },
        {
          id: "PLAN-26-102",
          name: "DMF-Lauf 10h · Rührprofil B",
          project: "Projekt Alpha-7",
          date: "07.02.2026",
          status: "planned",
          lead: "K. Müller",
          teaser: "Folgeversuch mit längerer Laufzeit.",
          planningBrief: "Laufzeit wird verlängert, Rührprofil angepasst.",
          summary:
            "Ausgehend von EXP-26-012 wird ein 10h-Lauf mit angepasstem Rührprofil geplant, um Emulsionen zu vermeiden.",
          findings: ["Planung bestätigt, Rohstoffe reserviert."],
          leadComment: "",
          followUps: ["Emulsionsmonitoring", "Probe nach 4h entnehmen"],
          reportNote: "Noch kein Bericht, Planung offen.",
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
      const overviewView = document.getElementById("overview-view");
      const planningView = document.getElementById("planning-view");
      const modeTabs = Array.from(document.querySelectorAll(".mode-tab"));
      const planningBaseSelect = document.getElementById("planning-base-select");
      const planningBaseName = document.getElementById("planning-base-name");
      const planningBaseBrief = document.getElementById("planning-base-brief");
      const planningBaseSummary = document.getElementById("planning-base-summary");
      const planningCount = document.getElementById("planning-count");
      const planningVariation = document.getElementById("planning-variation");
      const planningDuration = document.getElementById("planning-duration");
      const planningNotes = document.getElementById("planning-notes");
      const planningRepeat = document.getElementById("planning-repeat");
      const planningAdd = document.getElementById("planning-add");
      const planningReset = document.getElementById("planning-reset");
      const planningList = document.getElementById("planning-list");
      const planningConfirm = document.getElementById("planning-confirm");
      const planningNotice = document.getElementById("planning-notice");

      let activeId = EXPERIMENTS_DATA[0].id;
      let plannedCounter = 103;

      function statusClass(status) {
        return "status-chip status--" + status;
      }

      function getAllExperiments() {
        return [...PLANNED_EXPERIMENTS, ...EXPERIMENTS_DATA];
      }

      function renderList() {
        listEl.innerHTML = "";
        getAllExperiments().forEach((experiment) => {
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

        renderFollowups(experiment);

        detailReport.textContent = experiment.reportNote;
      }

      function renderFollowups(experiment) {
        detailFollowups.innerHTML = "";
        if (!experiment.followUps || experiment.followUps.length === 0) {
          const empty = document.createElement("p");
          empty.className = "notes-text";
          empty.textContent = "Keine weiteren Vorschläge hinterlegt.";
          detailFollowups.appendChild(empty);
          return;
        }
        experiment.followUps.forEach((item) => {
          const card = document.createElement("div");
          card.className = "followup-card";

          const text = document.createElement("p");
          text.textContent = item;

          const actions = document.createElement("div");
          actions.className = "followup-actions";

          const acceptButton = document.createElement("button");
          acceptButton.type = "button";
          acceptButton.className = "btn btn-accept";
          acceptButton.textContent = "Übernehmen";

          const dismissButton = document.createElement("button");
          dismissButton.type = "button";
          dismissButton.className = "btn btn-dismiss";
          dismissButton.textContent = "Verwerfen";
          dismissButton.addEventListener("click", () => {
            experiment.followUps = experiment.followUps.filter((entry) => entry !== item);
            renderFollowups(experiment);
          });

          actions.append(acceptButton, dismissButton);
          card.append(text, actions);
          detailFollowups.appendChild(card);
        });
      }

      function setActive(id) {
        activeId = id;
        const experiment = getAllExperiments().find((item) => item.id === id);
        if (experiment) {
          renderList();
          renderDetails(experiment);
        }
      }

      renderList();
      setActive(activeId);

      function renderPlanningBaseOptions() {
        planningBaseSelect.innerHTML = "";
        EXPERIMENTS_DATA.forEach((experiment) => {
          const option = document.createElement("option");
          option.value = experiment.id;
          option.textContent = experiment.id + " · " + experiment.name;
          planningBaseSelect.appendChild(option);
        });
      }

      function updatePlanningBase() {
        const baseExperiment = EXPERIMENTS_DATA.find((item) => item.id === planningBaseSelect.value);
        if (!baseExperiment) return;
        planningBaseName.textContent = baseExperiment.name;
        planningBaseBrief.textContent = baseExperiment.planningBrief || baseExperiment.summary;
        planningBaseSummary.textContent = baseExperiment.summary;
      }

      function renderPlannedExperiments() {
        planningList.innerHTML = "";
        PLANNED_EXPERIMENTS.forEach((experiment) => {
          const card = document.createElement("div");
          card.className = "planning-card";

          const tag = document.createElement("span");
          tag.className = "planning-tag";
          tag.textContent = experiment.id;

          const title = document.createElement("h4");
          title.textContent = experiment.name;

          const note = document.createElement("p");
          note.textContent = experiment.summary;

          const meta = document.createElement("p");
          meta.textContent = "Basis: " + experiment.project + " · " + experiment.date;

          card.append(tag, title, note, meta);
          planningList.appendChild(card);
        });
        planningCount.textContent = String(PLANNED_EXPERIMENTS.length);
      }

      function resetPlanningFields() {
        planningVariation.value = "";
        planningDuration.value = "";
        planningNotes.value = "";
        planningRepeat.value = 1;
      }

      function addPlannedExperiment() {
        const baseExperiment = EXPERIMENTS_DATA.find((item) => item.id === planningBaseSelect.value);
        if (!baseExperiment) return;

        const variation = planningVariation.value.trim() || "Optimierung der Parameter";
        const duration = planningDuration.value.trim() || "Standardlaufzeit";
        const notes = planningNotes.value.trim();
        const repeatCount = Math.max(1, Number(planningRepeat.value) || 1);

        for (let i = 0; i < repeatCount; i += 1) {
          const plannedId = "PLAN-26-" + plannedCounter;
          plannedCounter += 1;
          PLANNED_EXPERIMENTS.unshift({
            id: plannedId,
            name: variation,
            project: baseExperiment.project,
            date: "geplant",
            status: "planned",
            lead: baseExperiment.lead,
            teaser: "Geplant ausgehend von " + baseExperiment.id + ".",
            planningBrief: baseExperiment.planningBrief || baseExperiment.summary,
            summary:
              "Basierend auf " +
              baseExperiment.id +
              " · " +
              variation +
              " · Laufzeit: " +
              duration +
              (notes ? " · Hinweise: " + notes : ""),
            findings: ["Neu geplant, Startfenster in Abstimmung."],
            leadComment: "",
            followUps: [],
            reportNote: "Planungsversion gespeichert.",
          });
        }

        renderList();
        renderPlannedExperiments();
        resetPlanningFields();
      }

      function setView(view) {
        const isPlanning = view === "planning";
        overviewView.classList.toggle("is-hidden", isPlanning);
        planningView.classList.toggle("is-hidden", !isPlanning);
        modeTabs.forEach((tab) => {
          tab.classList.toggle("active", tab.dataset.view === view);
        });
      }

      modeTabs.forEach((tab) => {
        tab.addEventListener("click", () => setView(tab.dataset.view));
      });

      planningBaseSelect.addEventListener("change", updatePlanningBase);
      planningAdd.addEventListener("click", addPlannedExperiment);
      planningReset.addEventListener("click", resetPlanningFields);
      planningConfirm.addEventListener("click", () => {
        const confirmed = window.confirm("Planung abschließen und Laborant informieren?");
        if (confirmed) {
          planningNotice.classList.add("visible");
        }
      });

      renderPlanningBaseOptions();
      updatePlanningBase();
      renderPlannedExperiments();
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

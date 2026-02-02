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
      .server-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        background: #0f172a;
        color: #f8fafc;
        padding: 16px 20px;
        border-radius: 16px;
      }
      .server-card button {
        border: none;
        background: #38bdf8;
        color: #0f172a;
        font-weight: 700;
        padding: 8px 12px;
        border-radius: 10px;
        cursor: pointer;
      }
      .server-card button:disabled {
        opacity: 0.6;
        cursor: wait;
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

      <main class="layout">
        <aside class="sidebar">
          <h2>Letzte 5 Experimente</h2>
          <div id="experiment-list" class="experiment-list"></div>
        </aside>

        <section class="content">
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
            <ul class="notes" id="detail-followups"></ul>
          </div>

          <div class="detail-card">
            <h3>Vollständiger Bericht</h3>
            <p class="notes-text" id="detail-report"></p>
            <a class="report-link" href="#" aria-disabled="true">Bericht öffnen</a>
            <p class="notes-text" style="margin-top: 8px;">
              Hinweis: Ein Klick würde den vollständigen PDF-Bericht im Dokumentenarchiv öffnen.
            </p>
          </div>

          <div class="server-card">
            <div>
              <strong>Serverstatus</strong>
              <p id="server-message" style="margin: 6px 0 0; font-size: 13px; color: #e2e8f0;">Verbunden. Klicken Sie auf „Status aktualisieren“, um die MCP-Nachricht zu laden.</p>
            </div>
            <button id="refresh">Status aktualisieren</button>
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
      const serverMessage = document.getElementById("server-message");
      const refreshButton = document.getElementById("refresh");

      let activeId = EXPERIMENTS_DATA[0].id;

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
        experiment.followUps.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          detailFollowups.appendChild(li);
        });

        detailReport.textContent = experiment.reportNote;
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

      const pending = new Map();
      let lastRequestId = 0;
      const toolTimeoutMs = 12000;
      const debugEnabled = new URLSearchParams(window.location.search).has("mcpDebug");

      function setPending(isPending) {
        refreshButton.disabled = isPending;
      }

      function parseToolResult(result) {
        if (!result) return null;
        const content = result.content || result.result?.content;
        if (!Array.isArray(content)) return null;
        const textContent = content.find((item) => item.type === "text" && item.text);
        if (!textContent) return null;
        try {
          const parsed = JSON.parse(textContent.text);
          return parsed.message || textContent.text;
        } catch (error) {
          return textContent.text;
        }
      }

      function logDebug(...args) {
        if (debugEnabled) {
          console.debug("[mcp-ui]", ...args);
        }
      }

      function handleMessage(event) {
        const rawData = typeof event.data === "string" ? safeJsonParse(event.data) : event.data;
        if (!rawData) return;
        logDebug("message", rawData);

        const data = rawData.jsonrpc === "2.0" ? rawData : rawData.raw;
        if (!data || data.jsonrpc !== "2.0") return;

        if (data.method === "tools/notify") {
          return;
        }

        if (data.result || data.error || data.toolResult || rawData.text) {
          const resultData = data.toolResult || data.result;
          const text = rawData.text || parseToolResult(resultData);
          if (text) {
            serverMessage.textContent = text;
          }
          const id = data.id ?? rawData.id;
          const pendingEntry = pending.get(String(id));
          if (pendingEntry) {
            clearTimeout(pendingEntry.timeoutId);
            pendingEntry.resolve();
            pending.delete(String(id));
          }
          setPending(false);
        }
      }

      function safeJsonParse(value) {
        try {
          return JSON.parse(value);
        } catch (error) {
          return null;
        }
      }

      function callTool() {
        lastRequestId += 1;
        const id = lastRequestId;
        const payload = {
          jsonrpc: "2.0",
          id,
          method: "tools/call",
          params: {
            name: "${TOOL_NAME}",
            arguments: {},
          },
        };
        setPending(true);
        return new Promise((resolve) => {
          const timeoutId = setTimeout(() => {
            if (!pending.has(String(id))) return;
            pending.delete(String(id));
            serverMessage.textContent =
              "Keine Antwort vom Host/MCP-Server erhalten. Bitte erneut versuchen.";
            setPending(false);
            resolve();
          }, toolTimeoutMs);
          pending.set(String(id), { resolve, timeoutId });
          window.parent.postMessage(payload, "*");
          logDebug("callTool sent", payload);
        });
      }

      window.addEventListener("message", handleMessage);

      refreshButton.addEventListener("click", () => {
        serverMessage.textContent = "Status wird aktualisiert...";
        callTool();
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

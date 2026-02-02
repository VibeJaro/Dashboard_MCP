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
            <div class="status-pill">Prozesschemie · Q1/2024</div>
          </div>
        </div>
        <div class="top-actions">
          <span class="status-pill">5 aktive Experimente</span>
          <div class="status-pill">Leitung: Dr. M. Weber</div>
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
                <span>Versuchsleiter</span>
                <strong id="detail-lead"></strong>
              </div>
              <div class="meta-item">
                <span>Datum</span>
                <strong id="detail-date"></strong>
              </div>
              <div class="meta-item">
                <span>Standort</span>
                <strong id="detail-site"></strong>
              </div>
            </div>
          </div>

          <div class="detail-grid">
            <div class="detail-card">
              <h3>Messwerte (aktuell)</h3>
              <div class="metrics" id="detail-metrics"></div>
            </div>
            <div class="detail-card">
              <h3>Schwerpunkte</h3>
              <ul class="notes" id="detail-focus"></ul>
            </div>
            <div class="detail-card">
              <h3>Nächste Schritte</h3>
              <ul class="notes" id="detail-steps"></ul>
            </div>
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
          id: "EXP-24-089",
          name: "Katalysator-Screening Phase 1",
          project: "Projekt Alpha-7",
          date: "31.01.2024",
          status: "completed",
          lead: "Dr. M. Weber",
          site: "Lab A3",
          summary:
            "Liganden L1–L5 gescreent. Höchste Selektivität bei L3, Umsatz bei 25°C jedoch unter Erwartung.",
          metrics: [
            { label: "Ausbeute", value: "87%" },
            { label: "Reinheit", value: "99,2%" },
            { label: "Temp Ø", value: "25°C" },
          ],
          focus: [
            "Selektivität und Aktivität vergleichen",
            "Turnover bei niedriger Temperatur",
            "Skalierbarkeit prüfen",
          ],
          steps: [
            "L3-Lauf bei 40°C planen",
            "Katalysator-Stabilität testen",
            "Review der HPLC-Rohdaten",
          ],
        },
        {
          id: "EXP-24-090",
          name: "Optimierung Lösungsmittel",
          project: "Projekt Alpha-7",
          date: "01.02.2024",
          status: "in-progress",
          lead: "K. Müller",
          site: "Lab B1",
          summary:
            "Testreihe mit polaren aprotischen Lösungsmitteln. Aktuell läuft der DMSO-Ansatz mit Nebenproduktbildung.",
          metrics: [
            { label: "Ausbeute", value: "—" },
            { label: "Reinheit", value: "—" },
            { label: "Temp Ø", value: "60°C" },
          ],
          focus: [
            "Nebenproduktprofil reduzieren",
            "DMSO vs. DMF vergleichen",
            "Reaktionszeit evaluieren",
          ],
          steps: [
            "Zwischenprobe nach 4h",
            "NMR-Abgleich mit Referenz",
            "Lösungsmittel-Mix testen",
          ],
        },
        {
          id: "EXP-24-091",
          name: "Skalierung Batch 5kg",
          project: "Produktion Scale-Up",
          date: "02.02.2024",
          status: "review",
          lead: "Dr. S. Schmidt",
          site: "Pilotanlage",
          summary:
            "Exothermie im zweiten Schritt höher als erwartet. Kühlleistung musste angepasst werden. Probe liegt in QS.",
          metrics: [
            { label: "Ausbeute", value: "92%" },
            { label: "Reinheit", value: "TBD" },
            { label: "Temp Ø", value: "45°C" },
          ],
          focus: [
            "Wärmeabfuhr dokumentieren",
            "QS-Ergebnis abwarten",
            "Scale-up Sicherheit prüfen",
          ],
          steps: [
            "QS-Report einpflegen",
            "Safety-Review mit EHS",
            "Batch-Review Meeting",
          ],
        },
        {
          id: "EXP-24-092",
          name: "Stabilitätsprüfung A4",
          project: "Langzeitstudie Q1",
          date: "03.02.2024",
          status: "planned",
          lead: "L. Fischer",
          site: "Stabilitätskammer",
          summary:
            "Vorbereitung der Proben für den 4-Wochen-Stress-Test bei 40°C/75% rF. Kammer reserviert.",
          metrics: [
            { label: "Ausbeute", value: "—" },
            { label: "Reinheit", value: "—" },
            { label: "Temp Ø", value: "40°C" },
          ],
          focus: [
            "Kammer-Log prüfen",
            "Probenplan finalisieren",
            "Referenzstandards bereitstellen",
          ],
          steps: [
            "Proben etikettieren",
            "Startmessung dokumentieren",
            "Monitoring-Slots reservieren",
          ],
        },
        {
          id: "EXP-24-093",
          name: "Synthese Vorstufe B",
          project: "Projekt Beta-2",
          date: "04.02.2024",
          status: "completed",
          lead: "Dr. M. Weber",
          site: "Lab C2",
          summary:
            "Standardprotokoll angewendet. Ausbeute leicht unter Erwartung, Reinheit exzellent. Kristallisation langsam.",
          metrics: [
            { label: "Ausbeute", value: "65%" },
            { label: "Reinheit", value: "99,8%" },
            { label: "Temp Ø", value: "0°C" },
          ],
          focus: [
            "Kristallisationsdauer optimieren",
            "Alternative Kühlprofile testen",
            "Vorstufe B in QS geben",
          ],
          steps: [
            "Laborbuch final signieren",
            "Rückstellmuster archivieren",
            "Materialfreigabe anstoßen",
          ],
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
      const detailSite = document.getElementById("detail-site");
      const detailStatus = document.getElementById("detail-status");
      const detailMeta = document.getElementById("detail-meta");
      const detailMetrics = document.getElementById("detail-metrics");
      const detailFocus = document.getElementById("detail-focus");
      const detailSteps = document.getElementById("detail-steps");
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
        detailSummary.textContent = experiment.summary;
        detailProject.textContent = experiment.project;
        detailLead.textContent = experiment.lead;
        detailDate.textContent = experiment.date;
        detailSite.textContent = experiment.site;
        detailStatus.className = statusClass(experiment.status);
        detailStatus.textContent = STATUS_LABELS[experiment.status] || experiment.status;

        detailMetrics.innerHTML = "";
        experiment.metrics.forEach((metric) => {
          const div = document.createElement("div");
          div.className = "metric";
          div.innerHTML = "<span>" + metric.label + "</span><strong>" + metric.value + "</strong>";
          detailMetrics.appendChild(div);
        });

        detailFocus.innerHTML = "";
        experiment.focus.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          detailFocus.appendChild(li);
        });

        detailSteps.innerHTML = "";
        experiment.steps.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          detailSteps.appendChild(li);
        });
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

      function handleMessage(event) {
        const data = typeof event.data === "string" ? safeJsonParse(event.data) : event.data;
        if (!data || data.jsonrpc !== "2.0") return;

        if (data.method === "tools/notify") {
          return;
        }

        if (data.result || data.error || data.toolResult) {
          const resultData = data.toolResult || data.result;
          const text = parseToolResult(resultData);
          if (text) {
            serverMessage.textContent = text;
          }
          const pendingEntry = pending.get(data.id);
          if (pendingEntry) {
            clearTimeout(pendingEntry.timeoutId);
            pendingEntry.resolve();
            pending.delete(data.id);
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
            if (!pending.has(id)) return;
            pending.delete(id);
            serverMessage.textContent =
              "Keine Antwort vom Host/MCP-Server erhalten. Bitte erneut versuchen.";
            setPending(false);
            resolve();
          }, toolTimeoutMs);
          pending.set(id, { resolve, timeoutId });
          window.parent.postMessage(payload, "*");
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

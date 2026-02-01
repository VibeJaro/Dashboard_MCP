import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const APP_NAME = "Dashboard MCP";
const APP_VERSION = "0.1.0";
const RESOURCE_URI = "ui://dashboard_mcp/hello";
const TOOL_NAME = "dashboard_mcp_hello";

const helloAppHtml = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Dashboard MCP - Hallo</title>
    <style>
      :root {
        color-scheme: light dark;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      body {
        margin: 0;
        padding: 16px;
        background: #f6f6f8;
        color: #1f1f1f;
      }
      .card {
        background: white;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        max-width: 420px;
      }
      h1 {
        font-size: 18px;
        margin: 0 0 8px 0;
      }
      p {
        margin: 8px 0;
      }
      button {
        margin-top: 12px;
        padding: 8px 12px;
        border: none;
        border-radius: 8px;
        background: #4c6ef5;
        color: white;
        font-weight: 600;
        cursor: pointer;
      }
      button:disabled {
        opacity: 0.6;
        cursor: wait;
      }
      .status {
        padding: 8px 12px;
        background: #f1f3f5;
        border-radius: 8px;
        font-family: "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size: 13px;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Hallo vom MCP-Server</h1>
      <p>Hier erscheint die Nachricht vom Tool.</p>
      <div class="status" id="message">Warte auf Antwort…</div>
      <button id="refresh">Nachricht laden</button>
    </div>

    <script>
      const messageEl = document.getElementById("message");
      const refreshButton = document.getElementById("refresh");

      const pending = new Map();
      let lastRequestId = 0;

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
            messageEl.textContent = text;
          }
          const pendingResolver = pending.get(data.id);
          if (pendingResolver) {
            pendingResolver();
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
          pending.set(id, resolve);
          window.parent.postMessage(payload, "*");
        });
      }

      window.addEventListener("message", handleMessage);

      refreshButton.addEventListener("click", () => {
        messageEl.textContent = "Lade Nachricht…";
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
    { mimeType: "text/html", description: "Dashboard MCP Begrüßungs-UI" },
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
              message: "Hallo! Der MCP-Server läuft und liefert diese Nachricht.",
            }),
          },
        ],
      };
    },
  );

  return server;
}

export { createMcpServer, RESOURCE_URI, TOOL_NAME };

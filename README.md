# Dashboard_MCP

Dieses Repo enthält den ersten lauffähigen MCP-Server inkl. MCP-App-UI. Wenn der Host (z. B. Claude oder ein eigener MCP-Host) den Server aufruft, erscheint eine kurze Textnachricht und eine kleine UI.

## Schnellstart lokal

```bash
npm install
npm start
```

Der Server läuft dann unter:

- MCP Endpoint: `http://localhost:3001/mcp`
- Health Check: `http://localhost:3001/health`

## Deployment auf Vercel

1. Neues Vercel-Projekt erstellen und dieses Repo verbinden.
2. Build Command leer lassen.
3. Install Command: `npm install`
4. Output Directory leer lassen.
5. Nach dem Deploy ist die Startseite unter `https://<dein-projekt>.vercel.app` erreichbar.
6. Die Endpoints sind:
   - MCP Endpoint: `https://<dein-projekt>.vercel.app/api/mcp`
   - Health Check: `https://<dein-projekt>.vercel.app/api/health`

## Aktuelle Live-URLs

- Dashboard (Landing-Page): https://dashboard-mcp.vercel.app
- MCP Endpoint: https://dashboard-mcp.vercel.app/api/mcp
- Health Check: https://dashboard-mcp.vercel.app/api/health
- MCP-Host: https://mcp-host-snowy.vercel.app/

## Host konfigurieren (wichtig)

Damit der Host die Daten und die UI bekommen kann, muss er auf den MCP Endpoint zeigen.

### Beispiel Claude (Custom Connector)

1. In Claude: **Settings → Connectors → Add custom connector**.
2. Als Server-URL eintragen:
   - Lokal: `http://localhost:3001/mcp`
   - Vercel: `https://<dein-projekt>.vercel.app/api/mcp`
3. Speichern.
4. In einer Unterhaltung das Tool `dashboard_mcp_hello` verwenden (oder Claude bitten, das Tool aufzurufen).
5. Der Host lädt automatisch die UI `ui://dashboard_mcp/hello` und zeigt die Nachricht + Button an.

## Was der Server liefert

- Tool: `dashboard_mcp_hello`
- UI Resource: `ui://dashboard_mcp/hello`
- Ergebnis: Eine Laborteam-Dashboard-UI mit 5 Experimenten in der linken Navigation und einer detaillierten Experimentübersicht inklusive Status- und Messwerten.

## Troubleshooting

- **SyntaxError in Vercel (Unexpected identifier)**: Die UI steckt als Template-String in `mcpServer.js`. Innerhalb des HTML/JS dürfen keine Backticks verwendet werden, sonst bricht das Parsing der Datei. Stattdessen normale Anführungszeichen oder String-Konkatenation nutzen.
- **401 Authentication Required / HTML-Login-Seite**: Vercel-Preview-Deployments sind oft durch Deployment Protection geschützt. MCP-Hosts erwarten JSON und brechen bei einer HTML-Login-Seite mit 401/500 ab. Lösung: Deployment Protection für das Preview deaktivieren oder ein Bypass-Token verwenden. Alternativ den MCP-Host auf die Production-URL ohne Schutz zeigen lassen.

## Struktur

- `server.js`: Lokaler Express-Server (Port 3001)
- `api/mcp.js`: Vercel Function für den MCP Endpoint
- `api/health.js`: Vercel Health Check
- `index.html`: Statische Landing-Page für das Vercel-Deployment
- `mcpServer.js`: MCP-Tool + UI-Resource Definition
- `updates.md`: Menschliches Änderungslog

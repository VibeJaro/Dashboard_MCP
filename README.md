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
5. Nach dem Deploy sind die Endpoints:
   - MCP Endpoint: `https://<dein-projekt>.vercel.app/api/mcp`
   - Health Check: `https://<dein-projekt>.vercel.app/api/health`

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
- Ergebnis: Eine kurze Begrüßungsnachricht, die in der UI sichtbar ist.

## Struktur

- `server.js`: Lokaler Express-Server (Port 3001)
- `api/mcp.js`: Vercel Function für den MCP Endpoint
- `api/health.js`: Vercel Health Check
- `mcpServer.js`: MCP-Tool + UI-Resource Definition
- `updates.md`: Menschliches Änderungslog

# Tests (manuell, ohne Entwicklerkenntnisse)

Diese Schritte funktionieren komplett über den Browser und die Vercel-Deployments.

## 1) Landing-Page prüfen

1. Öffne die Dashboard-URL: https://dashboard-mcp.vercel.app
2. Prüfe, ob eine Landing-Page angezeigt wird (kein Fehler/404).
3. Stelle sicher, dass die genannten MCP- und Health-Endpunkte dort sichtbar sind.

**Erwartung:** Die Seite lädt ohne Fehler und verweist auf die Endpunkte.

## 2) Health-Check prüfen

1. Öffne im Browser: https://dashboard-mcp.vercel.app/api/health
2. Es sollte eine kleine JSON-Antwort erscheinen.

**Erwartung:** Die Antwort enthält `{"status":"ok"}`.

## 3) MCP-Host prüfen (Tool-Aufruf & UI)

1. Öffne den MCP-Host: https://mcp-host-snowy.vercel.app/
2. Stelle sicher, dass der MCP-Server auf `https://dashboard-mcp.vercel.app/api/mcp` zeigt (ggf. im Host die Server-URL setzen).
3. Rufe das Tool `dashboard_mcp_hello` auf (über die Host-UI).
4. Warte, bis die UI geladen wird.

**Erwartung:**
- Der Tool-Aufruf liefert eine Textnachricht wie „Status OK: Dashboard-Daten geladen. Keine offenen Alarme.“
- Die UI zeigt das Laborteam-Dashboard mit 5 Experimenten links und Detaildaten rechts.

## 4) Fehlerbilder erkennen

- **500-Fehler im Host:** Öffne die Browser-Entwicklerkonsole (meist F12) und prüfe, ob ein Parser-Fehler angezeigt wird.
- **Leere UI:** Prüfe, ob der Host auf die richtige MCP-URL zeigt und ob Schritt 2 (Health-Check) funktioniert.

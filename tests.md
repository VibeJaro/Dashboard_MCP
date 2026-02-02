# Manuelle Tests (ohne Entwicklerwissen)

Diese Tests helfen dir, typische Fehler im Vercel-Deployment zu erkennen. Du brauchst dafür nur einen Browser.

## 1) Dashboard lädt und zeigt Inhalte

1. Öffne https://dashboard-mcp.vercel.app in deinem Browser.
2. Prüfe, ob oben „Laborteam Dashboard“ angezeigt wird.
3. Klicke links auf verschiedene Experimente (z. B. „Katalysator-Screening Phase 1“).
4. Rechts sollte sich die Detailansicht entsprechend ändern.

**Fehleranzeichen:** Seite lädt nicht, bleibt leer oder Navigation reagiert nicht.

## 2) Health-Check liefert „ok“

1. Öffne https://dashboard-mcp.vercel.app/api/health in deinem Browser.
2. Erwartete Antwort: `{ "status": "ok" }`.

**Fehleranzeichen:** Kein JSON, Fehlerseite, oder eine Fehlermeldung (z. B. 500).

## 3) MCP-Host kann den MCP-Server erreichen

1. Öffne https://mcp-host-snowy.vercel.app/.
2. Starte dort den MCP-Call/Tool-Aufruf für `dashboard_mcp_hello` (falls ein Button oder ein Eingabefeld vorhanden ist).
3. Erwartet wird eine Statusmeldung wie „Status OK: Dashboard-Daten geladen. Keine offenen Alarme.“

**Fehleranzeichen:** Der Host zeigt einen 500-Fehler oder keine Antwort.

## 4) Vercel-Logs prüfen (nur falls etwas fehlschlägt)

1. Öffne das Vercel-Projekt im Browser.
2. Gehe zu **Deployments → Logs**.
3. Achte auf JavaScript-Syntaxfehler oder 500-Fehler.

**Fehleranzeichen:** Meldungen wie „SyntaxError“ oder „Server error“.

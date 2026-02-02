# Updates

## Schritt 1 – Grundgerüst für den MCP-Server

Ich habe einen ersten, lauffähigen MCP-Server gebaut. Er liefert eine einfache Begrüßungsnachricht und eine kleine UI, wenn der Host den Server aufruft. Zusätzlich gibt es einen Gesundheitscheck und eine Variante für den Betrieb auf Vercel. In der README steht jetzt, wie man den Host einstellen muss, damit die Daten ankommen.

## Schritt 2 – Landing-Page für Vercel ergänzt

Ich habe eine statische Startseite ergänzt, damit das Vercel-Deployment unter der Root-URL nicht mehr mit 404 antwortet. Dort steht jetzt, wo die MCP- und Health-Endpunkte erreichbar sind, und die README wurde entsprechend aktualisiert.

## Schritt 3 – Laborteam-Dashboard UI ergänzt

Die MCP-App zeigt jetzt ein Laborteam-Dashboard mit fünf Experimenteinträgen in der linken Navigation. Beim Anklicken lädt eine Experimentübersicht mit Status, Messwerten, Schwerpunkten und nächsten Schritten. Die README wurde angepasst und ein kleiner UI-Test ergänzt.

## Schritt 4 – SyntaxError im MCP-Server behoben

In `mcpServer.js` war im eingebetteten UI-Skript ein Backtick-Template-String enthalten. Dadurch wurde der äußere HTML-Template-String vorzeitig beendet und Vercel konnte das Modul nicht mehr parsen (Fehler: „Unexpected identifier 'status'“). Die betroffenen Stellen wurden auf normale String-Konkatenation umgestellt und die README um einen Troubleshooting-Hinweis ergänzt.

## Schritt 5 – Hinweis auf Vercel Deployment Protection ergänzt

Preview-Deployments können durch Vercel-Auth geschützt sein. MCP-Hosts bekommen dann eine HTML-Login-Seite mit 401 statt JSON und melden 500. Die README wurde um den Hinweis ergänzt, dass Deployment Protection deaktiviert oder ein Bypass-Token genutzt werden muss (oder Production-URL verwenden).

## Schritt 6 – Experiment-Detailansicht aktualisiert (Jan 2026)

Die UI zeigt jetzt Experimente mit Januar-2026-Daten. In der Detailansicht wurden Versuchsleiter in „Laborant/in“ umbenannt, der Standort entfernt und die alten Messwerte-/Schwerpunkte-/Schritte-Kacheln durch neue Karten ersetzt: Kurzfassung, Main Findings, Kommentar der Labor-Teamleitung, Folgeversuche sowie ein Hinweis auf den vollständigen Bericht. Die README wurde entsprechend aktualisiert.

## Schritt 7 – Experimentplanung und Follow-up-Kacheln ergänzt

Die UI enthält jetzt eine obere Umschaltleiste zwischen Experimentübersicht und Experimentplanung. Folgeversuche werden als eigene Kacheln mit „Übernehmen“ und „Verwerfen“ dargestellt; verworfene Kacheln verschwinden aus der Ansicht. In der Planung kann ein Basis-Experiment gewählt, mehrere neue Versuche angelegt und abschließend bestätigt werden (inklusive Hinweis auf die Information des Laboranten). Geplante Experimente erscheinen zusammen mit den letzten fünf Einträgen in der linken Liste. README und UI wurden entsprechend aktualisiert.

## Schritt 8 – Planungsmodus neu strukturiert und Liste getrennt

Die linke Navigationsleiste ist jetzt zweigeteilt: oben stehen die letzten fünf Experimente, darunter (abgetrennt) nur freigegebene geplante Versuche. Der Planungsmodus wurde komplett überarbeitet: Es gibt einen Klartext-Modus für neue Experimente und einen Folgeversuchs-Modus mit Basis-Experiment, Änderungs- und Hinweistext sowie Anzahl. Entwürfe erscheinen erst nach Freigabe in der linken Liste und werden aus der Planungsübersicht entfernt. Übernommene Folgeversuch-Vorschläge legen direkt einen Entwurf im Planungsreiter an. README und UI wurden entsprechend aktualisiert.

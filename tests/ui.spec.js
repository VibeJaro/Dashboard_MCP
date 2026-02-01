import fs from "node:fs";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const serverFile = path.join(repoRoot, "mcpServer.js");

const source = fs.readFileSync(serverFile, "utf8");

assert.match(source, /id="experiment-list"/, "Experimentenliste fehlt");
assert.match(source, /Laborteam Dashboard/, "Titel fehlt");

const requiredIds = [
  "EXP-24-089",
  "EXP-24-090",
  "EXP-24-091",
  "EXP-24-092",
  "EXP-24-093",
];

for (const id of requiredIds) {
  assert.match(source, new RegExp(id), `Experiment ${id} fehlt`);
}

console.log("UI-Snapshot-Prüfung erfolgreich.");

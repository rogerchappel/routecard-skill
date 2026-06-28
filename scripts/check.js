#!/usr/bin/env node
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const required = [
  "README.md",
  "SKILL.md",
  "docs/PRD.md",
  "docs/TASKS.md",
  "docs/ORCHESTRATION.md",
  "docs/RELEASE_CANDIDATE.md",
  "fixtures/action-request.json",
  "fixtures/catalog.json",
  "src/index.js",
  "bin/routecard-skill.js",
  "test/index.test.js"
];

for (const file of required) {
  if (!fs.existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

execFileSync(process.execPath, ["--check", "src/index.js"], { stdio: "inherit" });
console.log("routecard-skill check passed");

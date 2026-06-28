#!/usr/bin/env node
import { makeRouteCard, readJson, renderMarkdown } from "../src/index.js";

const args = process.argv.slice(2);
const [requestPath, catalogPath] = args.filter((arg) => !arg.startsWith("--"));
const format = readFlag(args, "--format") ?? "json";

if (!requestPath || !catalogPath || args.includes("--help")) {
  console.log("Usage: routecard-skill <action-request.json> <catalog.json> [--format json|markdown]");
  process.exit(requestPath && catalogPath ? 0 : 1);
}

const card = makeRouteCard(readJson(requestPath), readJson(catalogPath));

if (format === "markdown") {
  console.log(renderMarkdown(card));
} else if (format === "json") {
  console.log(JSON.stringify(card, null, 2));
} else {
  console.error(`Unsupported format: ${format}`);
  process.exit(1);
}

function readFlag(values, name) {
  const index = values.indexOf(name);
  return index >= 0 ? values[index + 1] : undefined;
}

import fs from "node:fs";

const RISK_WEIGHT = { low: 1, medium: 3, high: 6 };

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function makeRouteCard(request, catalog) {
  const connectors = Array.isArray(catalog.connectors) ? catalog.connectors : [];
  const scored = connectors.map((connector) => scoreConnector(request, connector));
  const sorted = scored.sort((a, b) => b.score - a.score);
  const selected = sorted.find((route) => route.status !== "unsupported") ?? null;
  const finalStatus = selected && selected.missing.length === 0 && selected.approvals.length === 0 ? "ready" : "blocked";

  return {
    action: request.action,
    intent: request.intent,
    status: finalStatus,
    selectedRoute: selected,
    alternatives: sorted.filter((route) => route.connector !== selected?.connector),
    approvalGates: collectApprovals(selected),
    missingEvidence: collectMissing(selected, request),
    safety: [
      "Dry-run only: do not call connectors from this skill.",
      "Default to blocked when identity, approval, or write scope is unclear.",
      "Ask for explicit approval before external writes."
    ]
  };
}

export function renderMarkdown(card) {
  const selected = card.selectedRoute;
  return [
    `# Route Card: ${card.action}`,
    "",
    `Intent: ${card.intent}`,
    `Status: ${card.status}`,
    "",
    "## Selected Route",
    selected ? routeLine(selected) : "- No supported connector found.",
    "",
    "## Approval Gates",
    ...listOrNone(card.approvalGates),
    "",
    "## Missing Evidence",
    ...listOrNone(card.missingEvidence),
    "",
    "## Alternatives",
    ...(card.alternatives.length > 0 ? card.alternatives.map(routeLine) : ["- None"]),
    "",
    "## Safety",
    ...card.safety.map((item) => `- ${item}`),
    ""
  ].join("\n");
}

export function scoreConnector(request, connector) {
  const requiredCapability = request.capability;
  const hasCapability = connector.capabilities?.includes(requiredCapability);
  const missing = [];
  const approvals = [];

  for (const input of connector.requiredInputs ?? []) {
    if (!request.inputs || request.inputs[input] === undefined || request.inputs[input] === "") {
      missing.push(input);
    }
  }

  if (connector.requiresApproval || request.externalWrite === true) {
    approvals.push(connector.approval ?? "operator approval");
  }

  if (request.identityRequired && !request.identity) {
    missing.push("identity");
  }

  const risk = RISK_WEIGHT[connector.risk ?? "medium"] ?? RISK_WEIGHT.medium;
  const score = (hasCapability ? 20 : -20) - risk - missing.length * 5 - approvals.length * 3;

  return {
    connector: connector.name,
    status: hasCapability ? "candidate" : "unsupported",
    score,
    capability: requiredCapability,
    risk: connector.risk ?? "medium",
    missing,
    approvals,
    rationale: hasCapability
      ? `${connector.name} supports ${requiredCapability} with ${connector.risk ?? "medium"} risk.`
      : `${connector.name} does not support ${requiredCapability}.`
  };
}

function collectApprovals(selected) {
  return selected?.approvals?.length ? selected.approvals : [];
}

function collectMissing(selected, request) {
  const missing = new Set(selected?.missing ?? []);
  for (const evidence of request.requiredEvidence ?? []) {
    if (!request.evidence || request.evidence[evidence] === undefined || request.evidence[evidence] === "") {
      missing.add(evidence);
    }
  }
  return [...missing];
}

function routeLine(route) {
  return `- ${route.connector}: ${route.status}, score ${route.score}, risk ${route.risk}. ${route.rationale}`;
}

function listOrNone(values) {
  return values.length > 0 ? values.map((item) => `- ${item}`) : ["- None"];
}

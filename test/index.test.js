import test from "node:test";
import assert from "node:assert/strict";
import { makeRouteCard, renderMarkdown, scoreConnector } from "../src/index.js";

test("selects a supported route and blocks when approvals are missing", () => {
  const card = makeRouteCard({
    action: "create task",
    intent: "follow up",
    capability: "crm.task.create",
    externalWrite: true,
    inputs: { title: "Follow up", contactId: "c_1" },
    requiredEvidence: ["approval"],
    evidence: {}
  }, {
    connectors: [{
      name: "crm-primary",
      capabilities: ["crm.task.create"],
      requiredInputs: ["title", "contactId"],
      requiresApproval: true,
      approval: "CRM write approval",
      risk: "high"
    }]
  });

  assert.equal(card.selectedRoute.connector, "crm-primary");
  assert.equal(card.status, "blocked");
  assert.equal(card.approvalGates.includes("CRM write approval"), true);
  assert.equal(card.missingEvidence.includes("approval"), true);
});

test("penalizes unsupported connectors", () => {
  const route = scoreConnector({ capability: "crm.task.create", inputs: {} }, {
    name: "mail",
    capabilities: ["email.send"],
    requiredInputs: [],
    risk: "low"
  });

  assert.equal(route.status, "unsupported");
  assert.equal(route.score < 0, true);
});

test("renders markdown route card", () => {
  const card = makeRouteCard({
    action: "draft task",
    intent: "local prep",
    capability: "crm.task.create",
    externalWrite: false,
    inputs: { title: "Follow up" }
  }, {
    connectors: [{
      name: "local-draft",
      capabilities: ["crm.task.create"],
      requiredInputs: ["title"],
      risk: "low"
    }]
  });

  const markdown = renderMarkdown(card);
  assert.equal(markdown.includes("## Selected Route"), true);
  assert.equal(markdown.includes("local-draft"), true);
});

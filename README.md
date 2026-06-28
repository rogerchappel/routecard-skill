# routecard-skill

`routecard-skill` is a local-first agent skill for planning connector use before any external action. It turns an action request and connector catalog into a dry-run route card with a selected route, rejected alternatives, approval gates, missing evidence, and safety notes.

## Quickstart

```sh
npm install
npm run smoke
node bin/routecard-skill.js fixtures/action-request.json fixtures/catalog.json --format json
node bin/routecard-skill.js fixtures/action-request.json fixtures/catalog.json --format markdown
```

## Inputs

Action request JSON:

- `action`: short action name.
- `intent`: why the agent wants the route.
- `capability`: required connector capability.
- `externalWrite`: whether the action writes outside the workspace.
- `identityRequired`: whether an authenticated identity is required.
- `inputs`: available action inputs.
- `requiredEvidence`: evidence names needed before action.
- `evidence`: supplied evidence values.

Catalog JSON:

- `connectors`: connector definitions with names, capabilities, required inputs, approval gates, and risk.

## Safety Notes

This package never calls connectors. It defaults to `blocked` when required approvals, identities, or evidence are missing. Treat the card as a planning artifact and ask for approval before any live external action.

## Limitations

- Route scoring is deterministic and intentionally small.
- It does not read real connector manifests or credentials.
- It does not replace organization-specific policy engines.

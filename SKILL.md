# routecard-skill

Use this skill when an agent needs to explain which connector or tool route it would use before taking a live action.

## Required Inputs

- Action request JSON.
- Connector catalog JSON.
- Approval policy encoded in connector definitions.
- Evidence map for required approvals or supporting notes.

## Tools

- Local filesystem read access for JSON inputs.
- Node.js 18 or newer.

## Side-effect Boundaries

The skill is dry-run only. It must not call connectors, write to external systems, mutate CRM/project-management data, send messages, or use credentials. External writes require a separate explicit approval step outside this package.

## Workflow

1. Describe the intended action and required capability.
2. List available inputs, identity, and evidence.
3. Provide a connector catalog with capabilities and approval gates.
4. Run `routecard-skill <request> <catalog> --format markdown`.
5. Review blocked status, missing evidence, and approvals before any action.

## Example

```sh
node bin/routecard-skill.js fixtures/action-request.json fixtures/catalog.json --format markdown
```

## Validation

Run:

```sh
npm test
npm run check
npm run build
npm run smoke
```

Do not proceed to a live connector call when the route card status is `blocked`.

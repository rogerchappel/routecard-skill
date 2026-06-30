# routecard-skill

`routecard-skill` is a local-first agent skill for planning connector use before any external action. It turns an action request and connector catalog into a dry-run route card with a selected route, rejected alternatives, approval gates, missing evidence, and safety notes.

## Quickstart

```sh
npm install
npm run smoke
node bin/routecard-skill.js fixtures/action-request.json fixtures/catalog.json --format json
node bin/routecard-skill.js fixtures/action-request.json fixtures/catalog.json --format markdown
```

## Verify

Run the full local release gate before changing a route rule:

```sh
npm run release:check
```

The gate checks syntax, fixture-backed tests, the markdown smoke run, and the
assertion-backed dry-run npm package contents.

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

## Package Contents

`npm run package:smoke` verifies that the CLI, library, fixtures, skill
instructions, release notes, license, security policy, and contributing guide
are present in the dry-run tarball.

## Security

See [SECURITY.md](SECURITY.md) for supported versions and vulnerability
reporting guidance. Keep real connector credentials, customer data, and
production approval records out of public issues and fixtures.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for local checks and fixture expectations
before opening a pull request.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

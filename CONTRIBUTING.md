# Contributing

Thanks for improving `routecard-skill`.

## Local Checks

```sh
npm install
npm run release:check
```

## Guidelines

- Keep route selection deterministic and fixture-backed.
- Add a test fixture when approval, identity, evidence, or capability behavior
  changes.
- Preserve the dry-run boundary: this package should not call connectors,
  publish data, or perform external writes.
- Update `README.md` and `docs/RELEASE_CANDIDATE.md` when verification or
  package contents change.

## Pull Requests

Include the `npm run release:check` result in the PR body and call out any new
limitations or approval assumptions.

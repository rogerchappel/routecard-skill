# Release Candidate

## Classification

ship

## Verification

- `npm test`
- `npm run check`
- `npm run build`
- `npm run smoke`
- `npm run package:smoke`
- `npm run release:check`

## Notes

Initial public build includes deterministic route scoring, blocked-by-default safety behavior, fixtures, tests, CLI, docs, and skill instructions.
Package smoke verifies the CLI, library, fixtures, skill instructions, changelog,
license, security policy, and contributing guide are included in the dry-run
tarball.

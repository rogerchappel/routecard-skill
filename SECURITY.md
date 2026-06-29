# Security Policy

## Supported Versions

`routecard-skill` is pre-1.0. Security fixes are applied to the latest
published package and the `main` branch.

## Reporting a Vulnerability

Please report vulnerabilities through GitHub security advisories or another
private maintainer contact path before sharing details publicly.

Helpful reports include:

- the affected version or commit
- the action request or connector catalog shape that triggers the issue
- whether approvals, identity requirements, or evidence checks can be bypassed
- a minimal reproduction that uses synthetic connector data

Do not include real connector credentials, customer records, production
approval data, or private account identifiers in public issues or fixtures.

## Scope

This tool reads local JSON files and writes route cards to stdout. Security
reports are most useful when they involve unintended file access, approval gate
bypasses, unsafe package contents, or output that could be mistaken for
permission to perform a live connector action.

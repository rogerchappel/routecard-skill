# routecard-skill PRD

## Problem

Agents often need to explain intended connector use before taking action. Full connector policy rehearsal can be too heavy when the operator only needs a compact route card for one action.

## Goal

Provide a local-first skill and CLI that turns an action request and connector catalog into a deterministic dry-run route card.

## MVP

- JSON action request and connector catalog inputs.
- Route scoring by capability, risk, required inputs, identity, evidence, and approval gates.
- Markdown and JSON output.
- Fixture-backed tests and smoke command.
- Clear side-effect boundaries.

## Success

An agent can show the selected route, alternatives, missing evidence, and approval gates before any connector is called.

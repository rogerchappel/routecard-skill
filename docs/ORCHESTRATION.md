# Orchestration

## Agent Use

1. Convert the user request into a structured action request.
2. Load or write a connector catalog.
3. Run the CLI locally.
4. Present the route card to the operator.
5. Ask for approval before any external connector call.

## Approval Requirements

- No approval is needed for local dry-run planning.
- Approval is required for any live connector call, external write, message send, or credential use.

## Failure Modes

- Unsupported route: choose a different connector or revise the request.
- Missing identity: ask the operator which account is in scope.
- Missing approval: stop until approval evidence is supplied.
- Missing required input: collect the input locally before retrying.

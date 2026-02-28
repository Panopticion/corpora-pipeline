---
description: Keep runtime gate behavior diagnostic-only
applyTo: "apps/**/src/**/*.ts,apps/**/src/**/*.tsx,src/**/*.ts,src/**/*.tsx"
---

- Runtime gate behavior is advisory diagnostics only.
- Do not rewrite or hard-block responses from gate outcomes in web request flows.
- Preserve verification and gate telemetry fields.

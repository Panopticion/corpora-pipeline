# Corpus Web Copilot Instructions

Follow [CLAUDE.md](../CLAUDE.md) as the canonical source of truth.

## Runtime non-negotiables

- Runtime gate behavior is `diagnostic` / `advisory` only.
- Do not hard-block, rewrite, or replace model output in request-time web flows.
- Preserve verification and gate outputs as telemetry/QA signals unless policy explicitly changes.

## Deploy quick reference

- Supabase migrations: `supabase db push --project-ref exjuzuhgsmrdbwaoxbio`
- Vercel preferred path: `git push origin main`
- Vercel optional CLI: `vercel deploy`, `vercel deploy --prod`
- EC2/SSM deploy path: from `../goober`, run `./devops/deploy-release-ssm.sh`

## Safety

- Never push or deploy unless explicitly requested in the active thread.

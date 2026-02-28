# AGENTS

Project-level AI instructions for agents in this repository.

## Source of truth

- Treat [CLAUDE.md](./CLAUDE.md) as canonical project guidance.

## Runtime policy

- Runtime governance is `diagnostic` / `advisory` only.
- Do not hard-block, rewrite, or replace model output in request-time web flows.
- Keep verification and gate outputs as telemetry/QA signals unless policy explicitly changes.

## Deployment quick reference

- Supabase: `supabase db push --project-ref exjuzuhgsmrdbwaoxbio`
- Vercel (preferred): `git push origin main`
- Vercel (optional CLI): `vercel deploy`, `vercel deploy --prod`
- EC2/SSM (from `../goober`): `./devops/deploy-release-ssm.sh`
- Never push/deploy unless explicitly requested in the active thread.

import json
import os
import re
import subprocess
import sys
from pathlib import Path


def parse_env_file(path: Path) -> dict[str, str]:
    env: dict[str, str] = {}
    if not path.exists():
        return env
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip("\"").strip("'")
        env[key] = value
    return env


def main() -> int:
    repo = Path(__file__).resolve().parents[1]
    env = os.environ.copy()
    env.update(parse_env_file(repo / ".env.local"))

    url = env.get("VITE_SUPABASE_URL", "")
    m = re.match(r"https://([^.]+)\.supabase\.co", url)
    if not m:
        print("[harness-runner] Missing/invalid VITE_SUPABASE_URL in .env.local")
        return 1
    project_ref = m.group(1)

    raw = subprocess.check_output(
        ["supabase", "projects", "api-keys", "--project-ref", project_ref, "-o", "json"],
        text=True,
    )
    keys = json.loads(raw)
    service_key = next((item.get("api_key") for item in keys if item.get("name") == "service_role"), None)
    if not service_key:
        print("[harness-runner] Could not fetch service_role key from Supabase CLI")
        return 1

    env["SUPABASE_SERVICE_ROLE_KEY"] = service_key

    cmd = ["pnpm", "harness:parse-watermark"]
    proc = subprocess.run(cmd, cwd=repo, env=env)
    return proc.returncode


if __name__ == "__main__":
    raise SystemExit(main())

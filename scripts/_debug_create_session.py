import json
import os
import re
import subprocess
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
        env[key.strip()] = value.strip().strip('"').strip("'")
    return env


def main() -> int:
    repo = Path(__file__).resolve().parents[1]
    env = os.environ.copy()
    env.update(parse_env_file(repo / ".env.local"))

    m = re.match(r"https://([^.]+)\.supabase\.co", env.get("VITE_SUPABASE_URL", ""))
    if not m:
        print("Missing VITE_SUPABASE_URL")
        return 1

    project_ref = m.group(1)
    raw = subprocess.check_output(
        ["supabase", "projects", "api-keys", "--project-ref", project_ref, "-o", "json"],
        text=True,
    )
    keys = json.loads(raw)
    service = next((x.get("api_key") for x in keys if x.get("name") == "service_role"), "")
    if not service:
        print("Missing service_role key")
        return 1

    env["SUPABASE_SERVICE_ROLE_KEY"] = service

    script = (
        'import { createClient } from "@supabase/supabase-js";'
        'const c=createClient(process.env.VITE_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});'
        'const marker=`debug-harness-session-${Date.now()}`;'
        'const q=await c.from("corpus_parse_sessions").insert({name:marker}).select("*");'
        'console.log("insert", JSON.stringify({data:q.data,error:q.error},null,2));'
        'const lookup=await c.from("corpus_parse_sessions").select("id,name,created_at,status").eq("name",marker).order("created_at",{ascending:false}).limit(1);'
        'console.log("lookup", JSON.stringify({data:lookup.data,error:lookup.error},null,2));'
        'const id=(lookup.data && lookup.data[0] && lookup.data[0].id) || (Array.isArray(q.data)&&q.data[0]?.id);'
        'if(id){await c.from("corpus_parse_sessions").delete().eq("id",id);}'
    )

    proc = subprocess.run(["node", "--input-type=module", "-e", script], cwd=repo, env=env)
    return proc.returncode


if __name__ == "__main__":
    raise SystemExit(main())

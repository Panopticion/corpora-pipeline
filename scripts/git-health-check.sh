#!/usr/bin/env bash
set -euo pipefail

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not inside a Git repository"
  exit 1
fi

echo "==> Running git fsck --full"
git fsck --full

echo "==> Running git gc --prune=now"
git gc --prune=now

echo "==> Running git fetch --all --prune"
git fetch --all --prune

echo "==> Current status"
git status -sb

echo "Git health check completed"

#!/bin/bash

INPUT=$(cat)
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0

SESSION_ID=$(printf '%s' "$INPUT" | grep -o '"session_id"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed -E 's/.*:[[:space:]]*"(.*)"$/\1/')
SESSION_ID="${SESSION_ID:-unknown}"
COUNTER_FILE="/tmp/claude-stop-verify-count-${SESSION_ID}"
COUNT=$(cat "$COUNTER_FILE" 2>/dev/null || echo 0)

if [ "$COUNT" -ge 2 ] 2>/dev/null; then
	exit 0
fi

CHANGED=$(git diff --name-only HEAD -- src astro.config.ts 2>/dev/null)
if [ -z "$CHANGED" ]; then
	exit 0
fi

LOG="/tmp/claude-stop-verify.log"
: > "$LOG"

if ! npm run check >>"$LOG" 2>&1; then
	echo "$((COUNT + 1))" > "$COUNTER_FILE"
	REASON="astro check failed - see $LOG for details. Fix it before finishing. (checked at most twice per session)"
	python3 -c "import json,sys; print(json.dumps({'decision': 'block', 'reason': sys.argv[1]}))" "$REASON"
	exit 0
fi

exit 0

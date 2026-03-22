#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/agent-listener/.env"
PIDS_FILE="$SCRIPT_DIR/.agent-pids"

start() {
  AGENT_SECRET=$(grep '^AGENT_SECRET=' "$ENV_FILE" | head -1 | sed 's/^AGENT_SECRET=//')

  ngrok http 3001 &
  NGROK_PID=$!

  sleep 3

  AGENT_SECRET="$AGENT_SECRET" node "$SCRIPT_DIR/agent-listener/server.js" &
  NODE_PID=$!

  echo -e "$NGROK_PID\n$NODE_PID" > "$PIDS_FILE"
  echo "Agent pipeline started."
}

stop() {
  if [ -f "$PIDS_FILE" ]; then
    while IFS= read -r pid; do
      kill "$pid" 2>/dev/null || true
    done < "$PIDS_FILE"
    rm "$PIDS_FILE"
  fi

  # Fallback: kill by name in case processes outlived their terminal
  pkill -x ngrok 2>/dev/null || true

  echo "Agent pipeline stopped."
}

case "${1:-}" in
  start) start ;;
  stop)  stop  ;;
  *)     echo "Usage: $0 {start|stop}"; exit 1 ;;
esac

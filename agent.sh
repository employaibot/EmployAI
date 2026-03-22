#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/agent-listener/.env"
WIN_IDS_FILE="$SCRIPT_DIR/.agent-windows"

start() {
  if [ ! -f "$ENV_FILE" ]; then
    echo "Error: $ENV_FILE not found."
    exit 1
  fi

  if ! command -v ngrok &>/dev/null; then
    echo "Error: ngrok not found in PATH"
    exit 1
  fi

  echo "Starting ngrok..."
  osascript -e "tell app \"Terminal\" to do script \"ngrok http 3001\""
  NGROK_WIN=$(osascript -e 'tell application "Terminal" to return id of front window')

  sleep 2

  echo "Starting agent listener..."
  osascript -e "tell app \"Terminal\" to do script \"cd '$SCRIPT_DIR/agent-listener' && set -a && source .env && set +a && echo \$\$ > /tmp/agent-node.pid && exec node server.js\""
  NODE_WIN=$(osascript -e 'tell application "Terminal" to return id of front window')

  echo -e "$NGROK_WIN\n$NODE_WIN" > "$WIN_IDS_FILE"
  echo "Agent pipeline started in two Terminal windows."
}

stop() {
  pkill -9 -x ngrok 2>/dev/null || true

  if [ -f /tmp/agent-node.pid ]; then
    kill -9 "$(cat /tmp/agent-node.pid)" 2>/dev/null || true
    rm /tmp/agent-node.pid
  fi

  if [ -f "$WIN_IDS_FILE" ]; then
    while IFS= read -r win_id; do
      osascript <<EOF
tell application "Terminal"
  do script "exit" in (first window whose id is $win_id)
  delay 0.5
  close (first window whose id is $win_id)
end tell
EOF
    done < "$WIN_IDS_FILE"
    rm "$WIN_IDS_FILE"
  fi

  echo "Agent pipeline stopped."
}

case "${1:-}" in
  start) start ;;
  stop)  stop  ;;
  *)     echo "Usage: $0 {start|stop}"; exit 1 ;;
esac

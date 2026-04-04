#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"

# ---------------------------------------------------------------------------
# OS-specific implementations
# ---------------------------------------------------------------------------

case "$(uname -s)" in

  Darwin)
    open_terminal() {
      local title="$1" script_body="$2"
      local tmp; tmp="$(mktemp /tmp/agent-XXXXXX.sh)"
      printf '#!/usr/bin/env bash\n%s\n' "$script_body" > "$tmp"
      chmod +x "$tmp"
      osascript -e "tell app \"Terminal\" to do script \"bash '$tmp'\""
    }
    kill_process() {
      local name="$1" image="$2" port="$3"
      pkill -x "${image%.exe}" 2>/dev/null && echo "$name stopped." || echo "$name was not running."
    }
    ;;

  MINGW*|MSYS*|CYGWIN*)
    open_terminal() {
      local title="$1" script_body="$2"
      local bash_path sh_tmp ps_tmp win_ps
      bash_path="$(cygpath -w "$(which bash)")"
      sh_tmp="$(mktemp /tmp/agent-XXXXXX.sh)"
      printf '#!/usr/bin/env bash\n%s\n' "$script_body" > "$sh_tmp"
      ps_tmp="$(mktemp /tmp/agent-XXXXXX.ps1)"
      printf "Start-Process -FilePath '%s' -ArgumentList '--login', '%s' -WindowStyle Normal\n" \
        "$bash_path" "$sh_tmp" > "$ps_tmp"
      win_ps="$(cygpath -w "$ps_tmp")"
      powershell.exe -ExecutionPolicy Bypass -File "$win_ps"
    }
    kill_process() {
      local name="$1" image="$2" port="$3"
      if [ -n "$image" ]; then
        taskkill //F //IM "$image" &>/dev/null && echo "$name stopped." || echo "$name was not running."
      elif [ -n "$port" ]; then
        local pid
        pid="$(netstat -ano 2>/dev/null | awk "/[: ]${port}[[:space:]].*LISTENING/{print \$NF}" | head -1)"
        if [ -n "$pid" ]; then
          taskkill //F //PID "$pid" &>/dev/null && echo "$name stopped." || echo "$name was not running."
        else
          echo "$name was not running."
        fi
      fi
    }
    ;;

  Linux)
    open_terminal() {
      local title="$1" script_body="$2"
      local tmp; tmp="$(mktemp /tmp/agent-XXXXXX.sh)"
      printf '#!/usr/bin/env bash\n%s\n' "$script_body" > "$tmp"
      chmod +x "$tmp"
      if   command -v gnome-terminal  &>/dev/null; then gnome-terminal --title="$title" -- bash "$tmp"
      elif command -v xfce4-terminal  &>/dev/null; then xfce4-terminal --title="$title" -e "bash \"$tmp\""
      elif command -v xterm           &>/dev/null; then xterm -title "$title" -e "bash \"$tmp\"" &
      else echo "Error: no supported terminal emulator found."; exit 1
      fi
    }
    kill_process() {
      local name="$1" image="$2" port="$3"
      pkill -x "${image%.exe}" 2>/dev/null && echo "$name stopped." || echo "$name was not running."
    }
    ;;

  *)
    echo "Error: unsupported OS: $(uname -s)"; exit 1 ;;

esac

# ---------------------------------------------------------------------------
# Commands
# ---------------------------------------------------------------------------

start() {
  [ ! -f "$ENV_FILE" ]          && echo "Error: $ENV_FILE not found." && exit 1
  command -v ngrok &>/dev/null  || { echo "Error: ngrok not found in PATH"; exit 1; }

  echo "Starting ngrok..."
  open_terminal "ngrok" "ngrok http 3001"

  sleep 2

  echo "Starting agent listener..."
  open_terminal "agent-listener" \
    "cd '$SCRIPT_DIR/agent-listener' && set -a && source '$SCRIPT_DIR/.env' && set +a && node server.js"

  echo "Agent pipeline started in two terminal windows."
}

stop() {
  kill_process "ngrok"           "ngrok.exe" ""
  kill_process "agent listener"  ""          "3001"
}

case "${1:-}" in
  start) start ;;
  stop)  stop  ;;
  *)     echo "Usage: $0 {start|stop}"; exit 1 ;;
esac

#!/bin/sh
# Local preview. The site is plain static files, so any static server works.
PORT="${1:-8080}"
echo "Mewad → http://localhost:$PORT"
python3 -m http.server "$PORT"

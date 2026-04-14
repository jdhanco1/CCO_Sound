#!/bin/sh
set -e

# Railway injects $PORT; substitute it into the nginx config.
# Default to 80 for local Docker usage.
export PORT="${PORT:-80}"

envsubst '${PORT}' \
  < /etc/nginx/conf.d/default.conf.template \
  > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'


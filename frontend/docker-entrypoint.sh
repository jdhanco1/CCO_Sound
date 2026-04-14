#!/bin/sh
set -e

# CMS_URL can be set explicitly, or fall back to VITE_CMS_URL (same value).
# In Railway, set VITE_CMS_URL in the service variables — that's all you need.
CMS_URL="${CMS_URL:-${VITE_CMS_URL}}"
export CMS_URL

# Inject the CMS URL into the nginx config at container start.
# Only ${CMS_URL} is substituted — nginx's own $variables are left alone.
envsubst '${CMS_URL}' \
  < /etc/nginx/conf.d/default.conf.template \
  > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'

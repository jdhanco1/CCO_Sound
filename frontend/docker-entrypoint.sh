#!/bin/sh
set -e

# Inject the CMS URL into the nginx config at container start.
# Only ${CMS_URL} is substituted — nginx's own $variables are left alone.
envsubst '${CMS_URL}' \
  < /etc/nginx/conf.d/default.conf.template \
  > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'

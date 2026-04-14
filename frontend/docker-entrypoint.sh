#!/bin/sh
set -e

# In production (Railway), VITE_CMS_URL is baked into the JS bundle at build
# time so the browser calls the CMS directly — no nginx proxy needed.
# Just start nginx as-is.
exec nginx -g 'daemon off;'


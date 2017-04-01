#!/usr/bin/env bash
set -e
set -x

export NODE_ENV="${NODE_ENV:-development}"

if [ $NODE_ENV != "production" ]; then
  npm run dev
else
  mkdir -p $ROOT/logs/nginx
  nginx -g 'daemon off;' -c $ROOT/src/nginx.conf
  nginx -c $ROOT/src/nginx.conf
fi

#!/usr/bin/env bash

set -e
if [[ -d "/var/www/learning-locker-latest" ]]; then
  cd /var/www/learning-locker-latest
  cp .env ~/.env
  rm -Rf /var/www/learning-locker-latest
  mv ~.env .env
fi

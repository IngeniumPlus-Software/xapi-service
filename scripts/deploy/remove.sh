#!/usr/bin/env bash

set -e
if [[ -d "/var/www/learning-locker-latest" ]]; then
  cd /var/www/learning-locker-latest
  if [[ -f '/var/www/learning-locker-latest/.env' ]]; then
    cp .env ~/.env
  fi
  rm -Rf /var/www/learning-locker-latest
  if [[ -f '~/.env' ]]; then
    mv ~.env .env
  fi
fi

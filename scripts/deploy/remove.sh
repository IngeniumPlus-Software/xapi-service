#!/usr/bin/env bash

set -e
if [[ -d "/var/www/learning-locker-latest" ]]; then
  cd /var/www/learning-locker-latest
  if [[ -f '/var/www/learning-locker-latest/.env' ]]; then
    cp /var/www/learning-locker-latest/.env /var/www/.env
  fi
  rm -Rf /var/www/learning-locker-latest
  if [[ -f '~/.env' ]]; then
    mv /var/www/.env /var/www/learning-locker-latest/.env
  fi
fi

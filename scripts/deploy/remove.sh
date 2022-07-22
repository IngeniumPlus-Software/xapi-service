#!/usr/bin/env bash

set -e
if [[ -d "/var/www/learning-locker-latest" ]]; then
  cd /var/www/learning-locker-latest
  shopt -s extglob
  rm -fr !(".env")
  shopt -u extglob
fi

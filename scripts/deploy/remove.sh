#!/usr/bin/env bash

set -e
cd /var/www/learning-locker-latest
shopt -s extglob
rm -fr !(".env")
shopt -u extglob

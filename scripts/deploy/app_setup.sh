#!/usr/bin/env bash

set -e

cd /var/www/learning-locker-latest
unzip output.zip -d /var/www/learning-locker-latest/
chown nodejs -R /var/www/learning-locker-latest/
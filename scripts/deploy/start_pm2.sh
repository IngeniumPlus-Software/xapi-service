#!/usr/bin/env bash

set -e

# start up nvm so we can use pm2 (npm, yarn...)
~/.nvm/nvm.sh use 10
cd /var/www/learning-locker-latest
pm2 start pm2/xapi.json
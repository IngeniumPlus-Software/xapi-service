#!/usr/bin/env bash

cd ~
# start up nvm so we can use pm2 (npm, yarn...)
nvm use 10
cd /var/www/learning-locker-latest
pm2 stop pm2/xapi.json
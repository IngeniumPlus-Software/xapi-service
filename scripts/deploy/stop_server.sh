#!/usr/bin/env bash

service nginx stop
#run this as nodejs
sudo su nodejs
cd ~
# start up nvm so we can use pm2 (npm, yarn...)
nvm use 10
pm2 stop pm2/xapi.json
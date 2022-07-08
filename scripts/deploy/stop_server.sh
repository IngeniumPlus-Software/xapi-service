#!/usr/bin/env bash

service nginx stop

sudo su nodejs
cd /var/www/learning-locker-latest
pm2 stop pm2/xapi.json
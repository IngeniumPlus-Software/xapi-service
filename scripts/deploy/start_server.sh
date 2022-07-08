#!/usr/bin/env bash

set -e

service nginx start

sudo su nodejs
cd /var/www/learning-locker-latest
pm2 start pm2/xapi.json
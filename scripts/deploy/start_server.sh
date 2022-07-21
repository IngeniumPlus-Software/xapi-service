#!/usr/bin/env bash

set -e
# Update Nginx conf for environment variables
# Performing this here instead of postcopy script because the conf file is not present when the postcopy runs.
sed "s/XAPI_PORT/$EXPRESS_PORT/" /etc/nginx/conf.d/learning-locker.conf > learning-locker.conf & mv -f learning-locker.conf /etc/nginx/conf.d/learning-locker.conf
service nginx start
#run this as nodejs
sudo su nodejs
cd ~
# start up nvm so we can use pm2 (npm, yarn...)
nvm use 10

cd /var/www/learning-locker-latest
pm2 start pm2/xapi.json
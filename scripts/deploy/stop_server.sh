#!/usr/bin/env bash

service nginx stop
#run this as nodejs
#sudo su nodejs
cd /home/nodejs
# start up nvm so we can use pm2 (npm, yarn...)
sudo -u nodejs nvm use 10
cd /var/www/learning-locker-latest
sudo -u nodejs stop pm2/xapi.json
#!/usr/bin/env bash

set -e

service nginx start

#run this as nodejs
sudo su nodejs
cd ~
. ~/.nvm/nvm.sh
#double pump the install because it keeps saying not there.
nvm install 10
npm install -g yarn
npm install -g pm2
cd /var/www/learning-locker-latest
pm2 start pm2/xapi.json
#!/usr/bin/env bash

set -e

cd /var/www/learning-locker-latest

unzip output.zip -d /var/www/learning-locker-latest/
chown nodejs -R /var/www/learning-locker-latest/
#run this as nodejs
sudo su nodejs
cd ~
. ~/.nvm/nvm.sh
#double pump the install because it keeps saying not there.
nvm install 10
npm install -g yarn
npm install -g pm2

#may need to add pids folder to project root.
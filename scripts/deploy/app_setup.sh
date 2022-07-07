#!/usr/bin/env bash

set -e

cd /var/www/learning-locker-latest

unzip output.zip -d /var/www/learning-locker-latest/

#run this as nodejs
su nodejs
cd ~
. ~/.nvm/nvm.sh

#may need to add pids folder to project root.
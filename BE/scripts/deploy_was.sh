#!/bin/bash

CURRENT_PORT=$(cat /home/ec2-user/config/service_url.inc | grep -Po '[0-9]+' | tail -1)

TARGET_PID=$(lsof -Fp -i TCP:${CURRENT_PORT} | grep -Po '[0-9]+')

if [ ! -z ${TARGET_PID} ]; then
  echo "> Kill WAS running at ${SWITCH_PORT} for running new WAS"
  sudo kill -15 ${TARGET_PID}
fi

source /home/ec2-user/.bash_profile
cd ~

nohup java -jar -Dspring.profiles.active=prod -Dserver.port=${CURRENT_PORT} /home/ec2-user/issueTracker-deploy/build/libs/* > /home/ec2-user/nohup.out 2>&1 &
echo "> Now new WAS runs at ${CURRENT_PORT}."
exit 0

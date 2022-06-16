#!/bin/bash

CURRENT_PORT=$(cat /home/ec2-user/config/service_url.inc | grep -Po '[0-9]+' | tail -1)
SWITCH_PORT=0

if [ ${CURRENT_PORT} -eq 8081 ]; then
  SWITCH_PORT=8082
else
  SWITCH_PORT=8081
fi

TARGET_PID=$(lsof -Fp -i TCP:${SWITCH_PORT} | grep -Po '[0-9]+')

if [ ! -z ${TARGET_PID} ]; then
  echo "> Kill WAS running at ${SWITCH_PORT} for running new WAS"
  sudo kill -15 ${TARGET_PID}
fi

nohup java -jar -Dserver.port=${SWITCH_PORT} /home/ec2-user/issueTracker-deploy/build/libs/* > /home/ec2-user/nohup.out 2>&1 &
echo "> Now new WAS runs at ${SWITCH_PORT}."
exit 0

#!/bin/bash

CURRENT_PORT=$(cat /home/ec2-user/config/service_url.inc | grep -Po '[0-9]+' | tail -1)
SWITCH_PORT=0

if [ ${CURRENT_PORT} -eq 8081 ]; then
  SWITCH_PORT=8082
else
  SWITCH_PORT=8081
fi

echo "> Start health check of WAS at 'http://127.0.0.1:${SWITCH_PORT}' ..."

for RETRY_COUNT in 1 2 3 4 5 6 7 8 9 10
do
    echo "> #${RETRY_COUNT} trying..."
    RESPONSE_CODE=$(curl -s -o /dev/null -w "%{http_code}"  http://127.0.0.1:${SWITCH_PORT}/api/oauth/github)
    if [ ${RESPONSE_CODE} -eq 200 ]; then
        echo "> New WAS successfully running"
        switch_proxy
        exit 0
    elif [ ${RETRY_COUNT} -eq 10 ]; then
        echo "> Health check failed. Kill WAS running at ${SWITCH_PORT}"
        TARGET_PID=$(lsof -Fp -i TCP:${SWITCH_PORT} | grep -Po '[0-9]+')
        sudo kill -2 ${TARGET_PID}
        exit 1
    fi
    sleep 10
done

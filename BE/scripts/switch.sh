#!/bin/bash

CURRENT_PORT=$(cat /home/ec2-user/config/service_url.inc | grep -Po '[0-9]+' | tail -1)
SWITCH_PORT=0

if [ ${CURRENT_PORT} -eq 8081 ]; then
  SWITCH_PORT=8082
else
  SWITCH_PORT=8081
fi

function switch_proxy() {
  # Change proxying port into target port
  echo "set \$service_url http://127.0.0.1:${SWITCH_PORT};" | tee /home/ec2-user/config/service_url.inc
  echo "> Now Nginx proxies to ${SWITCH_PORT}."

  # Reload nginx
  sudo service nginx reload
  echo "> Nginx reloaded."
}


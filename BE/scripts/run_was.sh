#!/bin/bash

source /home/ec2-user/.bash_profile
cd ~

echo -e "upstream myserver {\n server 127.0.0.1:8082;\n}" | sudo tee /etc/nginx/conf.d/loadbalance.conf

sudo service nginx reload
echo "> Nginx proxying only 8082."

TARGET_PID=$(lsof -Fp -i TCP:8081 | grep -Po '[0-9]+')

if [ ! -z ${TARGET_PID} ]; then
  echo "> Kill WAS running at 8081 for running new WAS"
  sudo kill -15 ${TARGET_PID}
fi

nohup java -jar -Dspring.profiles.active=prod -Dserver.port=8081 /home/ec2-user/issueTracker-deploy/build/libs/* > /home/ec2-user/nohup_8081.out 2>&1 &
echo "> first new WAS runs at 8081."
echo "> Start health check of WAS at 'http://127.0.0.1:8081' ..."

sleep 10

for RETRY_COUNT in 1 2 3 4 5 6 7 8 9 10
do
    echo "> #${RETRY_COUNT} trying..."
    RESPONSE_CODE=$(curl -s -o /dev/null -w "%{http_code}"  http://127.0.0.1:8081/api/oauth/github)
    if [ ${RESPONSE_CODE} -eq 200 ]; then
        echo "> New WAS successfully running"
        break
    elif [ ${RETRY_COUNT} -eq 10 ]; then
        echo "> Health check failed. Kill WAS running at 8081"
        TARGET_PID=$(lsof -Fp -i TCP:8081 | grep -Po '[0-9]+')
        sudo kill -15 ${TARGET_PID}
        break
    fi
    sleep 10
done

echo -e "upstream myserver {\n server 127.0.0.1:8081;\n}" | sudo tee /etc/nginx/conf.d/loadbalance.conf

sudo service nginx reload
echo "> Nginx proxying only 8081."

TARGET_PID=$(lsof -Fp -i TCP:8082 | grep -Po '[0-9]+')

if [ ! -z ${TARGET_PID} ]; then
  echo "> Kill WAS running at 8082 for running new WAS"
  sudo kill -15 ${TARGET_PID}
fi

nohup java -jar -Dspring.profiles.active=prod -Dserver.port=8082 /home/ec2-user/issueTracker-deploy/build/libs/* > /home/ec2-user/nohup_8082.out 2>&1 &
echo "> second new WAS runs at 8082."
echo "> Start health check of WAS at 'http://127.0.0.1:8082' ..."

sleep 10

for RETRY_COUNT in 1 2 3 4 5 6 7 8 9 10
do
    echo "> #${RETRY_COUNT} trying..."
    RESPONSE_CODE=$(curl -s -o /dev/null -w "%{http_code}"  http://127.0.0.1:8082/api/oauth/github)
    if [ ${RESPONSE_CODE} -eq 200 ]; then
        echo "> New WAS successfully running"
        break
    elif [ ${RETRY_COUNT} -eq 10 ]; then
        echo "> Health check failed. Kill WAS running at 8081"
        TARGET_PID=$(lsof -Fp -i TCP:8082 | grep -Po '[0-9]+')
        sudo kill -15 ${TARGET_PID}
        break
    fi
    sleep 10
done

echo -e "upstream myserver {\n server 127.0.0.1:8081; server 127.0.0.1:8082;\n}" | sudo tee /etc/nginx/conf.d/loadbalance.conf

sudo service nginx reload
echo "> Nginx proxying to 8081 & 8082"

exit 0

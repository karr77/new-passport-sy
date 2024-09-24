@echo off
set version=%1
set registry_ip=192.168.1.168:80

REM 登录到 Docker 仓库
docker login %registry_ip%

REM 标记 Docker 镜像
docker tag zcjb-front/passport-webui:%version% %registry_ip%/zcjb-front/passport-webui:%version%

REM 推送 Docker 镜像
docker push %registry_ip%/zcjb-front/passport-webui:%version%

docker push 192.168.1.168:80/zcjb-front/passport-webui:v1.0.0
@echo off
set version=%1

REM 构建 Docker 镜像
docker build -t zcjb-front/passport-webui:%version% .

REM 运行 Docker 容器
docker run --name front-zcjb-passport -d -p 8080:80 zcjb-front/passport-webui:%version%

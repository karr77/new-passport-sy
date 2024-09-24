#!/bin/bash
version=$1
registry_ip=192.168.1.168:80

# 从 Docker 仓库拉取镜像
docker pull $registry_ip/zcjb-front/passport-webui:$version

# 运行 Docker 容器
docker run --name front-zcjb-passport_prd -d -p 8080:80 $registry_ip/zcjb-front/passport-webui:$version


docker run --name front-zcjb-passport_prd -d -p 8080:80 192.168.1.168:80/zcjb-front/passport-webui:v1.0.0
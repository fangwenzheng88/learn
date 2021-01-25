FROM alpine:3.13
LABEL AUTHOR="none" \
        VERSION=0.1.3

ENV REPO_URL=https://github.com/fangwenzheng88/learn.git

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
        && set -ex \
        && apk update && apk upgrade \
        && apk add --no-cache git nodejs nginx npm \
        && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
        && echo "Asia/Shanghai" > /etc/timezone

RUN git clone ${REPO_URL} /scripts \
        && cd /scripts \
        && git checkout hexo \
        && cd /scripts \
        && npm config set registry https://registry.npm.taobao.org \
        && npm install \
        && npm i hexo-cli -g \
        && hexo g

RUN cp /scripts/docker/nginx.conf /etc/nginx/nginx.conf

COPY *.key *.crt /scripts/

WORKDIR /scripts

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]

FROM node:20-alpine

RUN apk add --no-cache libc6-compat \
 && npm install -g --no-audit --no-fund jazz-tools@2.0.0-alpha.46

WORKDIR /data

EXPOSE 1625
ENTRYPOINT ["jazz-tools", "server"]

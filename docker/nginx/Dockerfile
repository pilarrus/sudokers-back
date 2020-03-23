FROM nginx:1.17.9-alpine

ARG APP_ENV=prod

RUN apk update && \
    apk add iputils

RUN rm /etc/nginx/conf.d/default.conf
COPY sudokers-${APP_ENV}.conf /etc/nginx/conf.d/sudokers.conf
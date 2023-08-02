FROM alpine:latest as builder
RUN apk add --no-cache git
RUN mkdir /custom-authen
COPY . /custom-authen

FROM kong:latest
USER root
RUN mkdir /usr/local/share/lua/5.1/kong/plugins/custom-authen
COPY --from=builder  /custom-authen/kong/plugins/custom-authen /usr/local/share/lua/5.1/kong/plugins/custom-authen

USER kong

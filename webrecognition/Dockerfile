#ARG BUILD_ARCH
#FROM andriiradchenko/web_recognition:${BUILD_ARCH}
ARG BUILD_FROM
FROM $BUILD_FROM

LABEL \
  io.hass.version="VERSION" \
  io.hass.type="addon" \
  io.hass.arch="aarch64|armv7|amd64"

ARG BUILD_ARCH
FROM andriiradchenko/web_recognition:${BUILD_ARCH}

# Copy root filesystem
COPY rootfs /

LABEL \
  io.hass.version="VERSION" \
  io.hass.type="addon" \
  io.hass.arch="armv7|amd64"

ARG BUILD_ARCH
FROM andriiradchenko/web_recognition:${BUILD_ARCH}

# Copy root filesystem
COPY rootfs /
RUN chmod a+x /testweb.py
CMD python3 /testweb.py

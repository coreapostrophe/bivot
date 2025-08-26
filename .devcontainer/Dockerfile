FROM mcr.microsoft.com/devcontainers/python:3.11

RUN apt-get update && apt-get install -y \
    libuv1 \
    libuv1-dev \
    && rm -rf /var/lib/apt/lists/*

ENV LD_LIBRARY_PATH="/usr/lib/x86_64-linux-gnu:$LD_LIBRARY_PATH"

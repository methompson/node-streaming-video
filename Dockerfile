FROM ubuntu:18.04

# Gets the distro specific version of Node.js
#RUN apt update && apt upgrade -y && apt install nano nodejs npm -y

RUN apt update && apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && apt update && apt install -y nodejs

RUN mkdir -p /srv/app

WORKDIR /srv/app

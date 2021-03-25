FROM ubuntu:20.04
RUN apt update
RUN apt install -y wget
RUN wget https://github.com/macg-gh/ejs/archive/refs/heads/main.zip
RUN apt install -y zip
RUN unzip main.zip
RUN apt install -y nodejs
RUN apt install -y npm
WORKDIR ejs-main
RUN pwd
RUN npm init --yes
RUN npm install express
RUN node app.js

FROM node:13.2
RUN npm install -g pm2
ADD . /usr/app
WORKDIR /usr/app
RUN npm install
EXPOSE 4000

FROM node:14-slim
WORKDIR /usr/src/server
COPY package*.json ./

RUN npm install –only=production

COPY . ./

CMD [ "node", "index.js" ]
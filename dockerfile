FROM node:24.3-alpine3.21

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY src src

EXPOSE 3000

CMD ["npm", "start"]
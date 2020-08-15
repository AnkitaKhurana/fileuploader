FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install --registry=https://www.npmjs.com/package/ --production

EXPOSE 3000

CMD npm start
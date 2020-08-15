FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install --registry=https://registry.npmjs.org/ --production

EXPOSE 3000

CMD npm start
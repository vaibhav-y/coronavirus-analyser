FROM node:alpine

RUN mkdir /app
WORKDIR /app
COPY package.json /app

RUN npm i react-scripts
COPY . /app
EXPOSE 3000

CMD ["npm", "start"]
FROM node:10 as build

WORKDIR /urs/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5002
CMD ["npm", "start"]
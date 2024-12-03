FROM node:14.16.0-alpine3.13

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
RUN mkdir data
COPY package*.json .
RUN npm install
COPY . .

ENV key=docker.com.jahed
EXPOSE 3000

CMD [ "npm", "start" ]


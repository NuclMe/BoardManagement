FROM node:22.4.1

WORKDIR /server 

COPY ./package.json ./
COPY ./package-lock.json ./ 

RUN npm install

COPY . .

EXPOSE 5000

CMD ["server.js"]

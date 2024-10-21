FROM node:22.4.1

WORKDIR /client/  

COPY ./package.json ./
COPY ./package-lock.json ./  

RUN npm install

COPY . .  

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]  

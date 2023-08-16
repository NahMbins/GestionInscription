FROM node:alpine
WORKDIR /app
COPY package*.json /app/
RUN npm install 
COPY . .
EXPOSE 3001
CMD npm start
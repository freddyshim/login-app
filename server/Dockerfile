FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
COPY ./loginjs ./
RUN npm install -g ts-node
RUN npm install

COPY ./ ./

EXPOSE 5000

CMD ["npm", "run", "dev"]

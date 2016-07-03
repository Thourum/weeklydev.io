FROM node:4

WORKDIR /app

COPY package.json ./
RUN npm install

COPY ./ ./

EXPOSE 1337
CMD ["bash", "bin/start"]

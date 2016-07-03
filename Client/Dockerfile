FROM node:4

RUN npm install -g bower

WORKDIR /app

COPY package.json ./
RUN npm install

COPY .bowerrc bower.json ./
RUN bower install --allow-root

COPY ./ ./

EXPOSE 3000
CMD ["bin/start"]

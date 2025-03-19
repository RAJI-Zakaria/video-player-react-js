FROM node:lts-alpine


RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


COPY package.json package.json
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3030

# Run app
CMD [ "npm", "run", "dev" ]



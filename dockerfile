# pull official base image
FROM node:16.15.1

# set working directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# install nodeJs dependencies
COPY ./package.json ./
RUN npm install
COPY . .
# RUN npm run build

EXPOSE 3000

CMD ['npm', 'run', 'dev']
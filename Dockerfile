# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.0

# Set the base image
FROM node:${NODE_VERSION}-alpine AS base

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /src

# copy 'package.json' to install dependencies
COPY package*.json ./

# install dependencies
RUN npm install

# copy files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build
EXPOSE 8080
CMD [ "http-server", "dist" ]
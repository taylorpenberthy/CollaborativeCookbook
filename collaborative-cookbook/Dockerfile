# Use an official Node runtime as base image

FROM node:14-alpine AS build

# Set working directory
WORKDIR /app

# Install app dependencies

COPY package.json package-lock.json ./
RUN npm install

# Bundle app source
COPY . .

# Start app
CMD ["npm", "start"]
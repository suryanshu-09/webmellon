# syntax=docker/dockerfile:1
FROM node:23.9.0-alpine AS base

# -- Stage 1: deps --
FROM base AS deps

# Install build dependencies required for Prisma native bindings
# RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Install dependencies
COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "run", "dev"]

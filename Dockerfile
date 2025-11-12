#FROM node:20-alpine AS base
#LABEL authors="yanabkv"
#WORKDIR /app
#
#COPY package*.json ./
#RUN npm ci --ignore-scripts
#
#COPY . .
#
#FROM base as build
#RUN
# Stage 1: Build Stage
FROM node:20 as build-stage
WORKDIR /app
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

# Stage 2: Production Stage
FROM nginx:1.21-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


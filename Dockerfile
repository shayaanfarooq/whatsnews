FROM node:20.18-alpine AS build

# These args are to avoid undefined env vars with vite
# ref: https://stackoverflow.com/questions/77486735/docker-with-vite-env-variables-are-undefined-inside-the-docker-container

# Define build arguments for environment variables
ARG VITE_NEWS_API_KEY
ARG VITE_GUARDIAN_API_KEY

# Set environment variables during the build process
ENV VITE_NEWS_API_KEY=$VITE_NEWS_API_KEY
ENV VITE_GUARDIAN_API_KEY=$VITE_GUARDIAN_API_KEY

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# Use NGINX to serve the built app
FROM nginx:alpine

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the container
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
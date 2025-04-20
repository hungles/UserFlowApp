# Stage 1: Build
FROM node:22.14 AS build

# Set working directory
WORKDIR /usr/src/app

# Copy the necessary files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy the static files generated in the build stage to Nginx's directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration file (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port where Nginx serves the app
EXPOSE 80

# Default command to start Nginx
CMD ["nginx", "-g", "daemon off;"]

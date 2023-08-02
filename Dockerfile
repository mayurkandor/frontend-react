# Use an official Node.js runtime as a base image for building
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Build the React.js application
RUN npm run build

# Use a smaller Nginx image to serve the application in production
FROM nginx:alpine

# Copy the built files from the previous stage into the Nginx image
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (the default port for Nginx)
EXPOSE 80

# Start Nginx to serve the application
CMD ["nginx", "-g", "daemon off;"]

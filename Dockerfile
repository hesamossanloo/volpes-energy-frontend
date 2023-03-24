# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . /app

# Build the app
RUN npm run build

# Set the environment variable
ENV NODE_ENV production

# Expose the port that the app will run on
EXPOSE 4000

# Start the app
CMD ["npm", "start"]
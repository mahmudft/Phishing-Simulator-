# Use Node.js official image as base
FROM node:20 AS build

# Set the working directory in the container
# WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build


# Start the application
CMD ["npm", "run", "start:prod"]

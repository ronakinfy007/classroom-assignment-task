# Use the official Node.js image as a base
FROM node:22

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Command to start the app
CMD ["node", "src/server.js"]

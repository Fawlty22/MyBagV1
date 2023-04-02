# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Set environment variables
ENV PORT=3000

# Expose port
EXPOSE ${PORT}

# Start the app
CMD ["npm", "start"]

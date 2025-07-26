# Simple Node.js Dockerfile - Run with ts-node directly
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev dependencies)
RUN npm install

# Copy all source code
COPY . .

# Create logs directory
RUN mkdir -p logs

# Expose port
EXPOSE 4001

# Start with ts-node directly (no build step)
CMD ["npx", "ts-node", "src/server.ts"]
# Use Node.js runtime
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy project files
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["pnpm", "dev"]
# Use a lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install libc compatibility for some Node packages
RUN apk add --no-cache libc6-compat

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package manager files first to leverage Docker layer caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN pnpm build

# Expose the default Next.js port
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]
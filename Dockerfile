# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
FROM node:lts-alpine

# Install PNPM globally as the project uses it
RUN npm install -g pnpm@9.14.2

WORKDIR /app

# Copy package files and lock file
COPY package.json pnpm-lock.yaml ./

# Install dependencies without running scripts initially
RUN pnpm install --frozen-lockfile

# Copy the rest of the project
COPY . .

# Build the project
RUN pnpm run build

# Set environment variables if needed for local testing, they can be overridden
ENV SEMANTIC_LAYER_API_KEY=your_api_key
ENV SEMANTIC_LAYER_URL=http://localhost
ENV SEMANTIC_LAYER_ENVIRONMENT_ID=default

# Start the server
CMD [ "node", "dist/index.js" ]

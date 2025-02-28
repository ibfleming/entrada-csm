FROM node:22.13.1-alpine3.21 AS build

WORKDIR /app

RUN npm install -g pnpm@latest

# Set environment variables needed for build
ARG DATABASE_URL=postgresql://username:password@localhost:5432/mydatabase
ENV DATABASE_URL=${DATABASE_URL}

# Copy only package files first to leverage Docker cache
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the application
COPY . .

ENV PROJ_ENV=production

# Build the application
RUN pnpm run build
RUN pnpm prune --prod

# Create a smaller production image
FROM node:22.13.1-alpine3.21 AS production

WORKDIR /app

# Copy only the built application from the build stage
COPY --from=build /app/build /app/build
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/

# Set environment variables for runtime
ARG DATABASE_URL=postgresql://username:password@localhost:5432/mydatabase
ENV DATABASE_URL=${DATABASE_URL}

ARG PORT=8080
ENV PORT=${PORT}

ARG ORIGIN=http://localhost:${PORT}
ENV ORIGIN=${ORIGIN}

# Expose the port
EXPOSE ${PORT}

# Run the application
CMD ["node", "build"]
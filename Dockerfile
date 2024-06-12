################################################################################
# Use node image for base image for all stages.
FROM oven/bun:1 as base

# Set working directory for all build stages.
WORKDIR /usr/src/app


################################################################################
# Create a stage for installing production dependecies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.bun \
    bun install

# Copy the rest of the source files into the image.
COPY . .
# Run the build script.
RUN bun run build

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD bun run start

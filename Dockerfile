# Build stage
FROM node:latest AS builder
WORKDIR /app

# Copy the package.json, package-lock.json (or yarn.lock), and prisma schema file
COPY package.json package-lock.json prisma/schema.prisma ./

# Install dependencies
RUN npm install --ignore-scripts
RUN npm install -g prisma
RUN npm install --save-dev @types/mapbox-gl

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of your application's code
COPY . .

# Build your Next.js application
RUN npm run build

# Runner stage
FROM node:latest AS runner
WORKDIR /app

# Copy the build output and necessary files from the builder stage
COPY --from=builder /app ./

# You may selectively copy files or directories if the above is too broad
# For instance, if you definitely need next.config.js, ensure it's correctly located in your project:
# COPY --from=builder /app/next.config.js ./



# Command to run the application
CMD ["npm", "start"]

# Expose the port your app runs on
EXPOSE 3000
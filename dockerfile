# Step 1: Use a lightweight Node image for building the site
FROM node:18-alpine AS builder
WORKDIR /opt/docusaurus

# Install dependencies and build the site
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Step 2: Use Nginx to serve the static files
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy built static files from the builder stage
COPY --from=builder /opt/docusaurus/build /usr/share/nginx/html/documentation

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
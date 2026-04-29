# Stage 1: Build the React application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build  # This creates the /dist folder

# Stage 2: Serve the files using Nginx
FROM nginx:stable-alpine
# Copy the built files from the builder stage to Nginx's folder
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
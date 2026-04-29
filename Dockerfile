FROM node:18-alpine
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Express usually runs on 3000 or 8080
EXPOSE 3000
CMD ["node", "index.js"]
# Use an official Node runtime as a parent image
FROM node:20-slim

# Install Python and other dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy package files and install Node dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy requirements and install Python dependencies
COPY requirements.txt ./
RUN pip3 install --no-cache-dir --break-system-packages -r requirements.txt

# Copy ML models explicitly
COPY models/ ./models/

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Healthcheck so Render knows the service is ready
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Command to run the application
CMD ["npm", "start"]

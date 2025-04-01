# Use the official Node.js image as the base image
FROM node:23-alpine3.20

# Install Python, make, and other necessary tools
RUN apk add --no-cache python3 py3-pip make g++ gcc

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build


# Expose the port that Strapi will run on
EXPOSE 1337

# Start the Strapi application
CMD ["npm", "run", "start"]

# docker build -t adilmm/backend-multi-society:latest .
# docker rm -f backend-multi-society-container
# docker run -d -p 1337:1337 --name backend-multi-society-container -v strapi-tmp:/usr/src/app/.tmp  adilmm/backend-multi-society:latest
# docker push adilmm/backend-multi-society:latest
# docker pull adilmm/backend-multi-society:latest
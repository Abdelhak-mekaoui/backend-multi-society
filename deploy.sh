#!/bin/bash

# Build the Docker image
echo "Building Docker image..."
docker build -t adilmm/backend-multi-society:latest .

# Push to Docker Hub
echo "Pushing to Docker Hub..."
docker push adilmm/backend-multi-society:latest

# Deploy to server
echo "Deploying to server..."
ssh root@167.99.199.169 << 'EOF'
  echo "Pulling latest image..."
  docker pull adilmm/backend-multi-society:latest
  
  echo "Removing old container..."
  docker rm -f backend-multi-society-container || true
  
  echo "Starting new container..."
  docker run -d -p 1337:1337 \
    --name backend-multi-society-container \
    -v strapi-tmp:/usr/src/app/.tmp \
    adilmm/backend-multi-society:latest
  
  echo "Deployment complete!"
EOF
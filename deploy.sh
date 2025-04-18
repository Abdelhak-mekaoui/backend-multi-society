#!/bin/bash

# Ensure we're on the main branch
echo "Checking out main branch..."
git checkout main

# Push changes to main branch
echo "Pushing to main branch..."
git add .
git commit -m "Deployment commit"
git push origin main

# Build the Docker image
echo "Building Docker image..."
docker build -t adilmm/backend-multi-society:latest .

# Push to Docker Hub
echo "Pushing to Docker Hub..."
docker push adilmm/backend-multi-society:latest

# Deploy to server
echo "Deploying to server..."
ssh ubuntu@193.108.53.146 << 'EOF'
  echo "Pulling latest image..."
  sudo docker pull adilmm/backend-multi-society:latest
  
  echo "Removing old container..."
  sudo docker rm -f backend-multi-society-container || true
  
  echo "Starting new container..."
  sudo docker run -d -p 1337:1337 \
    --name backend-multi-society-container \
    -v strapi-tmp:/usr/src/app/.tmp \
    adilmm/backend-multi-society:latest
  
  echo "Deployment complete!"
EOF
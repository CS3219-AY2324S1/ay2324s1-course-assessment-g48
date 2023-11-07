#!/bin/bash

# Define the name of your Docker image
IMAGE_NAMES=("peerprep-frontend" "peerprep-user" "peerprep-question" "peerprep-queue" "peerprep-session" "peerprep-history")
# Define the Docker registry URL (e.g., Docker Hub or a private registry)
DOCKER_REGISTRY="deployment87/dply87"
# Define the tag for your Docker image
IMAGE_TAG="v1.0.4"
# Define the path to your Docker Compose file for production
DOCKER_COMPOSE_FILE="Docker-compose.prod.yml"

# Define the colors for the output 
GREEN='\033[0;32m'
RED='\033[0;31m'
RESET='\033[0m'

# Step 1: Start the Docker containers in the background
docker-compose -f "$DOCKER_COMPOSE_FILE" up -d

# Check if the Docker Compose command was successful
if [ $? -ne 0 ]; then
  echo "Docker Compose command failed. Deployment aborted."
  exit 1
fi

echo -e "${GREEN}Images built successful!${RESET}"

# Step 2 and Step 3: Tag and push each image
for ((i=0; i<${#IMAGE_NAMES[@]}; i++)); do
  IMAGE_NAME="${IMAGE_NAMES[i]}"

  # Tag the Docker image
  docker tag "$IMAGE_NAME" "$DOCKER_REGISTRY:$IMAGE_NAME-$IMAGE_TAG"

  # Push the tagged image to the Docker registry
  docker push "$DOCKER_REGISTRY:$IMAGE_NAME-$IMAGE_TAG"

  # Check if the image tagging and pushing were successful
  if [ $? -ne 0 ]; then
    echo -e "${RED}Image tagging and pushing for $IMAGE_NAME failed. Deployment aborted.${RESET}"
    exit 1
  fi
done

echo -e "${GREEN}Images successful pushed to registry!${RESET}"

gcloud container clusters get-credentials leetpal --region asia-southeast1 --project focal-elf-403008

cd ./k8s

kubectl apply -f .

echo -e "${GREEN}Deployment successful!${RESET}"
echo "
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣠⣤⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣀⣤⠖⠛⠉⠉⠛⠀⠀⠀⠸⠉⠛⠢⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣠⠔⠋⡀⠀⠀⠐⠟⠂⠀⠀⠚⠃⠀⠀⢦⠀⠈⢧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢠⠞⠃⠀⠚⠃⢀⣠⣤⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣰⠏⢀⡄⠀⡠⠊⠁⣀⣀⣤⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠉⠀⠈⢁⠔⠋⠁⢀⣀⣤⠤⠴⠶⠀⠀⠀⠀⠀⠀⠀⣸⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡏⣠⡀⠀⠰⠃⢀⣴⣚⣉⡴⠋⠙⠓⢦⡀⠀⠀⠀⠀⠀⢠⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣠⣤⣤⣤⡤⠤⢦
⣇⠉⠀⠀⠀⡴⡿⠋⠉⠹⡇⠀⠀⠀⠀⣿⣤⠀⠀⠀⣰⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⠖⠋⠁⠀⠀⠀⠀⠀⠀⠀⡼
⠹⡄⠀⠀⠘⢱⡇⠀⠀⣀⣿⡷⢺⣯⠉⠉⢹⡀⠐⣾⣅⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⠞⠁⠀⠀⠀⠀⠀⢀⣀⡀⣠⠞⠁
⠀⠙⢦⣀⠀⠀⣷⠿⣾⡅⠀⢧⠈⢿⣧⡀⠈⡇⠐⠊⣉⣁⣈⣙⣦⠀⠀⠀⠀⠀⢀⣀⡠⠴⠚⢩⠀⠀⠀⠀⠀⢀⣤⣤⣿⠿⠛⠁⠀⠀
⠀⠀⠀⠈⠉⠙⠻⡄⠹⣿⣄⡼⠱⢄⣙⣁⣜⣡⠔⠋⠉⠀⠀⠈⠉⠙⠓⠲⢶⠚⠉⠁⠀⢀⣀⡬⠴⠒⠋⠙⠛⠋⠉⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠛⣦⣌⣻⡇⠀⠀⣹⠾⠻⣀⣤⣀⡀⠀⣤⣄⡀⢀⣀⣠⡾⠶⠒⠛⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢠⠞⠀⠀⣸⣀⡤⠊⠁⠀⡴⣟⢿⡟⠛⠶⠿⠿⠖⣿⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣿⠀⠔⣩⠜⠁⠀⠀⡠⠊⠀⠘⣎⣧⠀⣀⣀⡤⠖⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠘⢲⠞⠁⠀⠀⡠⠊⠀⠀⠀⠀⡿⠉⠈⠻⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢰⢃⠀⠀⢀⠜⠓⠤⣄⣀⣤⠞⠁⠀⠀⠀⢹⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠘⠷⣶⣾⣥⠤⠶⠚⠉⠀⢿⠀⠀⠀⠀⠀⠀⢷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠃⠀⠀⠀⠀⠀⠀⠈⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠋⣀⣠⣤⣤⣀⣀⠀⢀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠉⠁⠀⠀⠀⠀⠉⠙⠾⠇⠀⠀⠀⠀⠀⠀⠀
"⠀⠀⠀
#!/bin/bash

# Define the name of your Docker image
IMAGE_NAMES=("peerprep-frontend" "peerprep-user" "peerprep-question" "peerprep-queue" "peerprep-session" "peerprep-history" "peerprep-chat" "peerprep-codeexec")
# Define the Docker registry URL (e.g., Docker Hub or a private registry)
DOCKER_REGISTRY="deployment87/dply87"
# Define the tag for your Docker image
IMAGE_TAG="v1.3.2"
# Define the path to your Docker Compose file for production
DOCKER_COMPOSE_FILE="Docker-compose.prod.yml"

# Define the colors for the output 
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
LIGHT_GRAY='\033[0;37m'
DARK_GRAY='\033[1;30m'
LIGHT_RED='\033[1;31m'
LIGHT_GREEN='\033[1;32m'
YELLOW='\033[1;33m'
LIGHT_BLUE='\033[1;34m'
LIGHT_PURPLE='\033[1;35m'
LIGHT_CYAN='\033[1;36m'
WHITE='\033[1;37m'
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
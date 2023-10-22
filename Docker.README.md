### Docker Compose For Both Frontend & Backend Services
```
# Compose
docker-compose up

# Tear down
docker-compose down
```

### Frontend Only
To build the docker image from given dockerfile
```
# In frontend directory
docker build --file=./Dockerfile.frontend -t peerprep-frontend .
```

To run the frontend container
```
docker run -p 3000:3000 peerprep-frontend
```

### Backend Only
To build the docker image for specific microservices from given dockerfile
```
# In microservice directory
# Template
docker build --file=./Dockerfile.<microservice> -t peerprep-<microservice> .

#Alternative
docker build -t ay2324s1-course-assessment-g48-peerprep-frontend:v1.0.0 -f Dockerfile.frontend .

# Example
docker build --file=./Dockerfile.frontend -t peerprep-frontend .
docker build --file=./Dockerfile.question -t peerprep-question .
docker build --file=./Dockerfile.user -t peerprep-user .
```

To run the microservice container
```
# Template
docker run -p 8000:8000 peerprep-<microservice>

# Example 
docker run -p 3000:3000 peerprep-frontend
docker run -p 8000:8000 peerprep-question
docker run -p 8001:8001 peerprep-user

```

PSQL
```
# Pull the PostgreSQL Docker Image
docker pull postgres

# Create a Docker Container
docker run --name peerprep-postgres -e POSTGRES_PASSWORD=qShhYgujF3MbMP -d postgres

# Accessing PostgreSQL
docker exec -it peerprep-postgres psql -U postgres


```

### Common commands
```
# Check running containers
docker ps

# Stop a container
docker stop <CONTAINER ID>

# Remove a container 
docker rm <CONTAINER ID>

# Check running images
docker images

# Remove an image
docker rmi <IMAGE ID>

# Goes into the container and exec bash
docker exec -it peerprep-frontend bash

docker logs peerprep-frontend -f

docker rm --force peerprep-frontend

docker cp peerprep-frontend:/app/build .

# Push to registry
docker push deployment87/dply87:peerprep-user

# Tagging 
docker tag peerprep-frontend deployment87/dply87:peerprep-frontend
docker tag peerprep-user deployment87/dply87:peerprep-user
docker tag peerprep-question deployment87/dply87:peerprep-question
docker tag peerprep-queue deployment87/dply87:peerprep-queue
docker tag peerprep-session deployment87/dply87:peerprep-session

```

### Cool Tricks
```
Find the IP address of your container
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' your-container-name

Test connection between containers
docker exec -it your_frontend_container_name ping your_backend_container_name
```

### Useful References
[Dockerise FE BE](https://patrickdesjardins.com/blog/docker-nodejs-frontend-backend)
[Dockerise FE BE](https://milanwittpohl.com/projects/tutorials/Full-Stack-Web-App/dockerizing-our-front-and-backend)
[PSQL Docker](https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/)

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
To build the docker image from given dockerfile
```
# In backend directory
docker build --file=./Dockerfile.backend -t peerprep-backend .
```

To run the backend container
```
docker run -p 8000:8000 peerprep-backend
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
```
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

PSQL
```
# Pull the PostgreSQL Docker Image
docker pull postgres

# Create a Docker Container
docker run --name peerprep-postgres -e POSTGRES_PASSWORD=AxFteAdXM2a4Aa -d postgres

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
```

### Useful References
[Dockerise FE BE](https://patrickdesjardins.com/blog/docker-nodejs-frontend-backend)
[Dockerise FE BE](https://milanwittpohl.com/projects/tutorials/Full-Stack-Web-App/dockerizing-our-front-and-backend)
[PSQL Docker](https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/)

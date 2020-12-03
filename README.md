# HTML Academy Vue JS Course Trello Clone

## Prerequisites
- Docker
- Docker-compose
- NodeJS 10+
- Pre commit (optional)

## Docker installation
https://docs.docker.com/get-docker/

## Docker-compose installation
https://docs.docker.com/compose/install/

## Node js installation
https://nodejs.org/en/download/

## Pre-commit installation

- Install pre-commit package to local machine following the next instructions https://pre-commit.com/#installation
- Execute `pre-commit install`
- Now, once you commit your changes to git it will watch for lint rules

## Frontend Build Setup

- Change directory to frontend source

`cd src/frontend`

- Install dependencies

`$ npm install`

## Backend Build Setup

- Change directory to backend source

`cd src/backend`

- Install dependencies

`$ npm install`

## Docker Setup

- Build the project

`$ docker-compose build .`

- Start the project

`$ make start_project`

- It will start your backend on localhost:3000 and frontend on localhost:8080

## Dev backend commands

- Rebuild backend

`$ make rebuild_backend`

## Login to system

There are a few predefined users in the database.
List of user could be found in the next file
```
src/backend/src/factory/dummy-users.json
```

## API documentation
Start the project and follow next link

```
http://localhost:8080/docs/explorer/
```

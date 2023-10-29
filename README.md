# web-app

## Introduction

This project is an demo for the image blackboard. `web-client` is project for the front-end codebase; and the `web-server` as name, is the back-end for the project.

## Prerequirements

1. Install `Docker`
2. Install `Node.js`

## Get Start

### Backend

For Back-end developement, run the bash as:

```shell
cd web-server
docker-compose up -d
npm i
npx prisma init
npx prisma migrate dev --name init
```

and then visit `http://localhost:8000/api` to test api.

### Frontend

For Front-end development, run the bash as:

```shell
cd web-client
npm i
npm start
```

and then open `http://localhost:3000/` in the browser.

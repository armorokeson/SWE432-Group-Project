# SWE432-Group-Project

## Required Packages
npm install express express-session body-parser ejs mongoose

## Docker
docker pull mongo
docker run --name mongodb -e MONGO_INITDB_ROOT_USERNAME=myuser -e MONGO_INITDB_ROOT_PASSWORD=mypassword -p 27017:27017 -d mongo

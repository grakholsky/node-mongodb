## Features
- **Framework**: Koa
- **Database**: MongoDB (Mongoose)
- **Code**: ESLint, Prettier, Husky
- **Deploy**: PM2, Docker

## Structure
```
.
├── .dump                        # MongoDB dump database
├── apiservice
│    ├── config                  # Service configuration
│    ├── controllers             # Request managers
│    ├── db                      # Data access
│    │   └── models              # MongoDB models
│    ├── middlewares             # Request middlewares
│    ├── routes                  # Define routes and middlewares here
│    ├── services                # Services implementation   
│    └── app.js                  # App starting point
├── webapp
│    ├── apiservice              # APIs list and request methods
│    ├── config                  # Configuration
│    ├── routes                  # Define routes and middlewares here
│    ├── views                   # Pug templates and static   
│    └── app.js                  # App starting point
├── .env.example                 # Environment sample
├── Dockerfile                   # Dockerfile
├── ecosystem.config.json        # pm2 config
├── package.json
└── README.md         
```

## Environment variables

Name | Value
------------ | -------------
API_MONGO_URL|mongodb://localhost:27017/monochrome
API_USER_SALT|
API_PORT|3000
API_URL|http://localhost:3000
API_ACCESS_TOKEN|
WEBAPP_SESSION_SECRET|
WEBAPP_PORT|4000
WEBAPP_URL|http://localhost:4000
WEBAPP_REQUEST_TIMEOUT|1000

## Getting Started
```shell
# Create environment variables from example
mv .env.example .env

# Install all dependencies
npm install

# Restore mongo dump on local machine
mongorestore .dump

# Run API Service on port 3000
npm run start:api

# Run Webapp Service on port 4000
npm run start:webapp
```

## Credentials
- **Login**:    superlogin
- **Password**: password

## Start with PM2 (cluster mode)
```shell
pm2 start ecosystem.config.js
```

## Docker
```shell
# Build image
docker build -t monochrome_task .

# Create .env.docker, specify hosts and run compose
docker-compose up 
```

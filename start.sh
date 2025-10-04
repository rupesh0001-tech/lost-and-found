#!/bin/bash

mkdir -p data/db

echo "Starting MongoDB..."
mongod --dbpath=data/db --bind_ip 127.0.0.1 --logpath data/mongodb.log --fork

sleep 2

echo "Starting Node.js application..."
node app.js

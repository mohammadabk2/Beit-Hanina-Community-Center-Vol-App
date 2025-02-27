#!/bin/bash

cd client # move to client

npm install # install needed libs

npm run build # build the app in client side

cd .. # move back to root

npm install # install needed libs

npm run build # build the app in server side

npm start # run app

#!/bin/bash

cd client # move to client

# npm install --legacy-peer-deps # install needed libs

npm run build # build the app in client side

cd .. # move back to root

# npm install --legacy-peer-deps # install needed libs

npm run build # build the app in server side

npm start # run app

# to setup up the database install postgresql on the server
# setup an admin user
# run the schema.sql file in the db to create the db and tables
# to make Admin users for the app add them manually (only we can make Admins)

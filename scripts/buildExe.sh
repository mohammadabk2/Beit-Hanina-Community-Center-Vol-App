#!/bin/bash

# creats /dist 
npx ncc build src/server.js -o dist --external pg-cloudflare --external cloudflare:sockets


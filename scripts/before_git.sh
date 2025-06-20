#!/bin/bash

#? run eslin
npx eslint .

eslint .

#? update file struct
source scripts/generate_file_struct.sh 
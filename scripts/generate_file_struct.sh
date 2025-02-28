#!/bin/bash

# Define the output file
output_file="docs/structure.md"

# Write the opening backticks and language specifier to the output file
echo '# Structure of files' > "$output_file"
echo -e '```' >> "$output_file"

# Run the tree command and append its output to the file
tree --prune -I 'node_modules|build' >> "$output_file"
echo -e '```' >> "$output_file"

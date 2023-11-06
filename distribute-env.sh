#!/bin/bash

ROOT_DIR="apps"  # The root directory where the individual .env files will be placed
INPUT_ENV=".env" # The combined .env file

# Ensure the input .env file exists
if [[ ! -f $INPUT_ENV ]]; then
    echo "The input .env file does not exist."
    exit 1
fi

# Read the combined .env file line by line
current_section=""
while IFS= read -r line || [[ -n "$line" ]]; do
    # Check for a section header
    if [[ $line == *".env variables:"* ]]; then
        # Extract the directory name from the section header
        current_section=$(echo $line | sed 's/ .env variables://')
        # Create or clear the .env file in the directory
        mkdir -p "$ROOT_DIR/$current_section" # Create the directory if it doesn't exist
        > "$ROOT_DIR/$current_section/.env"    # Clear the .env file if it already exists
    elif [[ $current_section != "" && $line != "-----------------------------------" && $line != "" ]]; then
        # If we are within a section and it's not a divider or an empty line, append the line to the current section's .env file
        echo "$line" >> "$ROOT_DIR/$current_section/.env"
    fi
done < "$INPUT_ENV"

echo "The .env files have been successfully created."
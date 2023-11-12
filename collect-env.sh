#!/bin/bash

# Define the output .env file at the root
OUTPUT_ENV=".env"
ROOT_DIR="apps"  # Define your root directory here

# Remove the existing .env file if it exists
rm -f $OUTPUT_ENV

# Function to append env files into one
append_env_file() {
    local ENV_PATH=$1
    local DIR_NAME=$(dirname "${ENV_PATH}")
    local BASE_NAME=$(basename "${DIR_NAME}")

    # Append the name of the folder
    echo "${BASE_NAME} $(basename "${ENV_PATH}") variables: " >> $OUTPUT_ENV
    echo "-----------------------------------" >> $OUTPUT_ENV
    # Append the .env file contents to the root .env file
    cat "$ENV_PATH" >> $OUTPUT_ENV
    # Add a newline for separation
    echo -e "\n" >> $OUTPUT_ENV
}

# Find all .env files in the directory tree and iterate over them
find $ROOT_DIR \( -name '.env' -o -name '.env.dev' -o -name '.env.development.local' -o -name '.env.local' \) | while read ENV_FILE; do
    append_env_file "$ENV_FILE"
done

# Notify user
echo "All .env files have been collected into the root .env file."
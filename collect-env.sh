#!/bin/bash

# Define the output .env file at the root
OUTPUT_ENV=".env"

# Remove the existing .env file if it exists
rm -f $OUTPUT_ENV

# Function to append env files into one
append_env_file() {
    local FOLDER=$1
    # Append the name of the folder
    echo "${FOLDER} .env variables: " >> $OUTPUT_ENV
    echo "-----------------------------------" >> $OUTPUT_ENV
    # Check if the .env file exists and append it to the root .env file
    if [[ -f "$FOLDER/.env" ]]; then
        cat "$FOLDER/.env" >> $OUTPUT_ENV
    else
        echo "No .env file found in $FOLDER"
    fi
    # Add a newline for separation
    echo -e "\n" >> $OUTPUT_ENV
}

# List of directories
DIRS=(
    "apps/frontend"
    "apps/backend/queue"
    "apps/backend/chat"
    "apps/backend/question"
    "apps/backend/session"
    "apps/backend/user"
    "apps/backend/history"
)

# Iterate over directories and append env files
for DIR in "${DIRS[@]}"; do
    append_env_file $DIR
done

# Notify user
echo "All .env files have been collected into the root .env file."
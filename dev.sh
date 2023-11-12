#!/bin/bash

# Define the directories
directories=(
    "./apps/frontend"
    "./apps/backend/question"
    "./apps/backend/queue"
    "./apps/backend/history"
    "./apps/backend/session"
)

# Define the colors for the output 
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
LIGHT_GRAY='\033[0;37m'
DARK_GRAY='\033[1;30m'
LIGHT_RED='\033[1;31m'
LIGHT_GREEN='\033[1;32m'
YELLOW='\033[1;33m'
LIGHT_BLUE='\033[1;34m'
LIGHT_PURPLE='\033[1;35m'
LIGHT_CYAN='\033[1;36m'
WHITE='\033[1;37m'
RESET='\033[0m'

# Detect the OS and get the IP address
os=$(uname)
if [[ "$os" == "Linux" ]]; then
    interface=$(ip route | grep default | sed -e "s/^.*dev.//" -e "s/.proto.*//")
    ip_address=$(ip -4 addr show $interface | grep -oP '(?<=inet\s)\d+(\.\d+){3}')
elif [[ "$os" == "Darwin" ]]; then
    ip_address=$(ipconfig getifaddr en0)
else
    ip_address=$(ipconfig.exe | grep -im1 'IPv4 Address' | cut -d ':' -f2 | sed -e 's/^[ \t]*//')
fi


echo "IP address: $ip_address"

count=0

# Loop over the directories
for dir in "${directories[@]}"; do
    if [[ "$dir" == *"apps/frontend"* ]]; then
        echo "Updating the IP address for the frontend"

        # Define the .env file
        env_file="$dir/.env.local"

        # Check if the .env file exists
        if [[ -f "$env_file" ]]; then

            if [[ "$os" == "MINGW"* ]] | [[ "$os" == "MSYS"* ]] | [[ "$os" == "CYGWIN"* ]]; then
                powershell -Command "(Get-Content $env_file) -replace 'NEXT_PUBLIC_QUESTION_SERVICE=.*', 'NEXT_PUBLIC_QUESTION_SERVICE=http://$ip_address:8000' | Set-Content $env_file"
                powershell -Command "(Get-Content $env_file) -replace 'NEXT_PUBLIC_USER_SERVICE=.*', 'NEXT_PUBLIC_USER_SERVICE=http://$ip_address:8001' | Set-Content $env_file"
                powershell -Command "(Get-Content $env_file) -replace 'NEXT_PUBLIC_HISTORY_SERVICE=.*', 'NEXT_PUBLIC_HISTORY_SERVICE=http://$ip_address:8003' | Set-Content $env_file"
                powershell -Command "(Get-Content $env_file) -replace 'NEXT_PUBLIC_CS_SERVICE=.*', 'NEXT_PUBLIC_CS_SERVICE=http://$ip_address:8420' | Set-Content $env_file"
                powershell -Command "(Get-Content $env_file) -replace 'NEXT_PUBLIC_SESSION_URL=.*', 'NEXT_PUBLIC_SESSION_URL=http://$ip_address:8251' | Set-Content $env_file"
                powershell -Command "(Get-Content $env_file) -replace 'NEXT_PUBLIC_CHAT_URL=.*', 'NEXT_PUBLIC_CHAT_URL=http://$ip_address:8082' | Set-Content $env_file"
                powershell -Command "(Get-Content $env_file) -replace 'NEXT_PUBLIC_WS_URL=.*', 'NEXT_PUBLIC_WS_URL=ws://$ip_address:8080' | Set-Content $env_file"
                powershell -Command "(Get-Content $env_file) -replace 'NEXT_PUBLIC_WS_SESSION_URL=.*', 'NEXT_PUBLIC_WS_SESSION_URL=ws://$ip_address:8250/ws' | Set-Content $env_file"
            elif [[ "$os" == "Darwin" ]]; then
                sed -i '' "s|NEXT_PUBLIC_QUESTION_SERVICE=.*|NEXT_PUBLIC_QUESTION_SERVICE=http://$ip_address:8000|g" $env_file
                sed -i '' "s|NEXT_PUBLIC_USER_SERVICE=.*|NEXT_PUBLIC_USER_SERVICE=http://$ip_address:8001|g" $env_file
                sed -i '' "s|NEXT_PUBLIC_HISTORY_SERVICE=.*|NEXT_PUBLIC_HISTORY_SERVICE=http://$ip_address:8003|g" $env_file
                sed -i '' "s|NEXT_PUBLIC_CS_SERVICE=.*|NEXT_PUBLIC_CS_SERVICE=http://$ip_address:8420|g" $env_file
                sed -i '' "s|NEXT_PUBLIC_SESSION_URL=.*|NEXT_PUBLIC_SESSION_URL=http://$ip_address:8251|g" $env_file
                sed -i '' "s|NEXT_PUBLIC_CHAT_URL=.*|NEXT_PUBLIC_CHAT_URL=http://$ip_address:8082|g" $env_file
                sed -i '' "s|NEXT_PUBLIC_WS_URL=.*|NEXT_PUBLIC_WS_URL=ws://$ip_address:8080|g" $env_file
                sed -i '' "s|NEXT_PUBLIC_WS_SESSION_URL=.*|NEXT_PUBLIC_WS_SESSION_URL=ws://$ip_address:8250/ws|g" $env_file
            else 
                sed -i "s|NEXT_PUBLIC_QUESTION_SERVICE=.*|NEXT_PUBLIC_QUESTION_SERVICE=http://$ip_address:8000|g" $env_file
                sed -i "s|NEXT_PUBLIC_USER_SERVICE=.*|NEXT_PUBLIC_USER_SERVICE=http://$ip_address:8001|g" $env_file
                sed -i "s|NEXT_PUBLIC_HISTORY_SERVICE=.*|NEXT_PUBLIC_HISTORY_SERVICE=http://$ip_address:8003|g" $env_file
                sed -i "s|NEXT_PUBLIC_CS_SERVICE=.*|NEXT_PUBLIC_CS_SERVICE=http://$ip_address:8420|g" $env_file
                sed -i "s|NEXT_PUBLIC_SESSION_URL=.*|NEXT_PUBLIC_SESSION_URL=http://$ip_address:8251|g" $env_file
                sed -i "s|NEXT_PUBLIC_CHAT_URL=.*|NEXT_PUBLIC_CHAT_URL=http://$ip_address:8082|g" $env_file
                sed -i "s|NEXT_PUBLIC_WS_URL=.*|NEXT_PUBLIC_WS_URL=ws://$ip_address:8080|g" $env_file
                sed -i "s|NEXT_PUBLIC_WS_SESSION_URL=.*|NEXT_PUBLIC_WS_SESSION_URL=ws://$ip_address:8250/ws|g" $env_file
            fi
            count=$((count+8))
        else
            echo "No .env.local file found in $dir"
        fi
    else
        svc=$(basename "$dir")
        echo "Updating the IP address for the $svc service"

        # Define the .env file
        env_file="$dir/.env.dev"

        # Check if the .env file exists
        if [[ -f "$env_file" ]]; then
            # Session service
            if [[ "$dir" == *"apps/backend/session"* ]]; then

                if [[ "$os" == "MINGW"* ]] | [[ "$os" == "MSYS"* ]] | [[ "$os" == "CYGWIN"* ]]; then
                    powershell -Command "(Get-Content $env_file) -replace 'HOST=.*', 'HOST=ws://$ip_address' | Set-Content $env_file"
                    powershell -Command "(Get-Content $env_file) -replace 'CHAT_URL=.*', 'CHAT_URL=http://$ip_address:8082/create-chatroom' | Set-Content $env_file"
                elif [[ "$os" == "Darwin" ]]; then
                    sed -i '' "s|HOST=.*|HOST=ws://$ip_address|g" $env_file
                    sed -i '' "s|CHAT_URL=.*|CHAT_URL=http://$ip_address:8082/create-chatroom|g" $env_file
                else
                    sed -i "s|HOST=.*|HOST=ws://$ip_address|g" $env_file
                    sed -i "s|CHAT_URL=.*|CHAT_URL=http://$ip_address:8082/create-chatroom|g" $env_file
                fi
                count=$((count+2))

            # Queue service
            elif [[ "$dir" == *"apps/backend/queue"* ]]; then

                if [[ "$os" == "MINGW"* ]] | [[ "$os" == "MSYS"* ]] | [[ "$os" == "CYGWIN"* ]]; then
                    powershell -Command "(Get-Content $env_file) -replace 'SESSION_URL=.*', 'SESSION_URL=http://$ip_address:8251/session/create-session' | Set-Content $env_file"
                    powershell -Command "(Get-Content $env_file) -replace 'RABBITMQ_URL=.*', 'RABBITMQ_URL=amqp://$ip_address:5672' | Set-Content $env_file"
                elif [[ "$os" == "Darwin" ]]; then
                    sed -i '' "s|SESSION_URL=.*|SESSION_URL=http://$ip_address:8251/session/create-session|g" $env_file
                    sed -i '' "s|RABBITMQ_URL=.*|RABBITMQ_URL=amqp://$ip_address:5672|g" $env_file
                else 
                    sed -i "s|SESSION_URL=.*|SESSION_URL=http://$ip_address:8251/session/create-session|g" $env_file
                    sed -i "s|RABBITMQ_URL=.*|RABBITMQ_URL=amqp://$ip_address:5672|g" $env_file
                fi
                count=$((count+2))

            # Question service
            elif [[ "$dir" == *"apps/backend/question"* ]]; then

                if [[ "$os" == "MINGW"* ]] | [[ "$os" == "MSYS"* ]] | [[ "$os" == "CYGWIN"* ]]; then
                    powershell -Command "(Get-Content $env_file) -replace 'USER_SERVICE_URL=.*', 'USER_SERVICE_URL=http://$ip_address:8001' | Set-Content $env_file"
                elif [[ "$os" == "Darwin" ]]; then
                    sed -i '' "s|USER_SERVICE_URL=.*|USER_SERVICE_URL=http://$ip_address:8001|g" $env_file
                else
                    sed -i "s|USER_SERVICE_URL=.*|USER_SERVICE_URL=http://$ip_address:8001|g" $env_file
                fi
                count=$((count+1))

            # History service
            elif [[ "$dir" == *"apps/backend/history"* ]]; then

                if [[ "$os" == "MINGW"* ]] | [[ "$os" == "MSYS"* ]] | [[ "$os" == "CYGWIN"* ]]; then
                    powershell -Command "(Get-Content $env_file) -replace 'USER_SERVICE_URL=.*', 'USER_SERVICE_URL=http://$ip_address:8001' | Set-Content $env_file"
                elif [[ "$os" == "Darwin" ]]; then
                    sed -i '' "s|USER_SERVICE_URL=.*|USER_SERVICE_URL=http://$ip_address:8001|g" $env_file
                else
                    sed -i "s|USER_SERVICE_URL=.*|USER_SERVICE_URL=http://$ip_address:8001|g" $env_file
                fi
                count=$((count+1))

            else
                echo -e "${RED}Update error for $svc!${RESET}"
            fi
        else
            echo -e "${RED}No .env file found in $dir!${RESET}"
        fi
    fi
done

echo -e "${GREEN}Updated $count files.${RESET}"

echo "Starting docker compose..."

docker-compose -f Docker-compose.dev.yml up -d

echo ""
echo -e "${YELLOW}╭(￣^￣ )ゞ Set up complete!${RESET}"
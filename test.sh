#!/bin/bash

# Function to get the IPv4 address
get_ipv4_address() {
  hostname -I | cut -d ' ' -f 1
}

update_env_files() {
  local ipv4_address="$1"
  local env_files=("$@")
  
  echo ipv4_address
  echo env_files
}

update_env_files()
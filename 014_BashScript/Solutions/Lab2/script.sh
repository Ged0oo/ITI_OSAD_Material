#!/usr/bin/env bash

read -p "Enter logname: " user

homedir=$(eval echo "~$user")

if [ ! -d "$homedir" ]; then
    echo "User $user not found"
    exit 1
fi

echo "Home directory of $user: $homedir"

ls -l "$homedir"

echo "Copying files/directories to /tmp..."
cp -r "$homedir"/* /tmp/ 2>/dev/null

echo "Current processes of $user:"
ps -u "$user"
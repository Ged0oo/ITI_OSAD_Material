#!/bin/bash

dir=$1
if [[ ! -d "$dir" ]]; then
    echo "Wrong directory"
    exit 1
fi

backup_dir="$dir/mybackup"
mkdir -p "$backup_dir"

for item in "$dir"/*
do
    if [[ -f "$item" ]]; then
        cp "$item" "$backup_dir"
    fi
done

echo "Backup completed."
#!/bin/bash

# options
set -e

shopt -s extglob dotglob

# commands
npm run build

git switch build

rm -rf !(.git|.svelte-kit|build|node_modules|.gitignore)

mv build/* .

git add --all

git commit -m "$(date)"

git push

git switch main

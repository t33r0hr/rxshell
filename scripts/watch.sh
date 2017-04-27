#!/usr/bin/env bash

SCRIPT_PATH="$(dirname "${0}")"
SCRIPT_FILE="$(basename "${0}")"
PROJECT_ROOT="$(cd "$(dirname "${0}")/.."; pwd)"

NODEMON_BIN="${PROJECT_ROOT}/node_modules/.bin/nodemon"

NPM_COMMAND=${1:-build}

function main() {
  cd "${PROJECT_ROOT}"
  $NODEMON_BIN -w ./src -e ts --exec "npm run ${NPM_COMMAND}"
}

main
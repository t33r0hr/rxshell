#!/usr/bin/env bash

SCRIPT_PATH="$(dirname "${0}")"
SCRIPT_FILE="$(basename "${0}")"
PROJECT_ROOT="$(cd "$(dirname "${0}")/.."; pwd)"

NODEMON_BIN="${PROJECT_ROOT}/node_modules/.bin/nodemon"

NPM_COMMAND=${@}

function main() {
  cd "${PROJECT_ROOT}"
  "$NODEMON_BIN" -w ./src -e ts --exec "${SCRIPT_PATH}/npm_exec.sh ${NPM_COMMAND}"
}

main
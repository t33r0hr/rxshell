#!/usr/bin/env bash

SCRIPT_PATH="$(dirname "${0}")"
SCRIPT_FILE="$(basename "${0}")"
_ROOT="$(cd "$(dirname "${0}")/.."; pwd)"



echo "Hello Test"
printf 'Please wait...'

sleep 1


ls -Al


echo "Bye"
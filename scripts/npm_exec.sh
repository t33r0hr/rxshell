#!/usr/bin/env bash


for cmd in ${@}; do
  npm run ${cmd} || true
done
#!/bin/sh -x

# npm i pkg -D -S
yarn build

cd bin
mv ../index parking_lot
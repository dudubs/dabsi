#!/usr/bin/bash

echo Loads DABSI bash-rc

export DABSI_DIR=$(dirname $BASH_SOURCE)

export PATH=$DABSI_DIR/bin:$PATH
export PATH=$DABSI_DIR/../node_modules/.bin:$PATH

cd $DABSI_DIR/..



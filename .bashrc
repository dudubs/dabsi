#!/usr/bin/bash

echo Loads DABSI bash-rc

export DABSI_PATH=$(dirname $BASH_SOURCE)

export PATH=$DABSI_PATH/bin:$PATH
export PATH=$DABSI_PATH/../node_modules/.bin:$PATH

cd $DABSI_PATH/..



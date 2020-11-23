#!/usr/bin/bash

echo Loads DABSI bash-rc

export DABSI_PATH=$(dirname $BASH_SOURCE)

export PATH=DABSI_PATH/../node_modules/.bin:$PATH

alias dabsi="$DABSI_PATH/cli.sh"

alias ts="dabsi typestack"


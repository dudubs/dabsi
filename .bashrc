#!/usr/bin/bash

echo Loads DABSI bash-rc

THIS_PATH=$(dirname $BASH_SOURCE)

alias ds='dabsi system'
alias dabsi="$THIS_PATH/cli.sh"
alias ts="dabsi typestack"

export PATH=$THIS_PATH/../node_modules/.bin:$PATH

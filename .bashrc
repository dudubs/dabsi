#!/usr/bin/bash

echo load dabs

alias ds='dabsi system'
alias dabsi="$(dirname $BASH_SOURCE)/cli.sh"

function at() {
    pushd $1
    ${@:2} &
    P=$!
    popd

    wait $P
}

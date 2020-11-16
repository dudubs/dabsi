#alias dabsi-node='TS_NODE_TRANSPILE_ONLY=true node -r ts-node/register'


if [ -f "./dabsi.sh" ]; then
  source ./dabsi.sh
fi

export DABSI_PATH=$(dirname $BASH_SOURCE)

function dabsi-system() {
  dabsi-node $DABSI_PATH/src/system/server/cli/index.ts $*
}

function platformDirs() {
    find src -type d -name $1 | while read p; do
        echo "-i $p"
     done
}

function dabsi-node() {

  _node="echo NO_NODE"

  if [ "$mon" ]; then
    O=""
    O="$O -w src"
    O="$O -e ts,tsx"
    O="$O -i node_modules"
    O="$O -i packages"
    O="$O $(platformDirs browser)"
    _node="nodemon $DABSI_MON $O"
  else
    _node="node"
  fi

  O=""
  O="$O --preserve-symlinks"
  O="$O -r source-map-support/register"
  O="$O -r ts-node/register"
  O="$O -r $DABSI_PATH/src/common/register.ts"
  export NODE_OPTIONS=$O

  if [ "$DABSI_NODE_DEBUG" ]; then
    O="$O --inspect "
  fi

  export TS_NODE_TRANSPILE_ONLY=true

#echo \
  $_node $*


}

function dabsi-mon() {
  mon=1 dabsi $*
}

function dabsi-test() {
    dabsi node \
   node_modules/jasmine/bin/jasmine.js \
   --helper=$DABSI_PATH/src/jasmine/register.ts \
    $(find $1 -type f -name '*Tests.ts*' \
      ! -path '*/node_modules/*' | grep -v 'Old') \
    --stop-on-failure=true $JASMINE_OPTIONS
}

function dabsi-debug() {
  DABSI_NODE_DEBUG=1 dabsi $*
}
function dabsi-() {
  echo "no dabsi command"
}

function dabsi-x() {
  ./node_modules/.bin/$1 ${@:2}
}


function dabsi() {

  if [ -f "$DABSI_PATH/scripts/$1.ts" ]; then
    dabsi node "$DABSI_PATH/scripts/$1.ts" ${@:2}
  else
    if [ -f "$DABSI_PATH/scripts/$1.sh" ]; then
      $DABSI_PATH/scripts/$1.sh ${@:2}
    else
      dabsi-$1 ${@:2}
    fi
  fi

}


if [ "${@: -1}" == "--mon" ]; then
  dabsi mon ${@:1:$#-1}
else
  dabsi $*
fi;



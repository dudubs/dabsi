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


  O=""
  O="$O -r source-map-support/register"
  O="$O -r ts-node/register"
  O="$O -r tsconfig-paths/register"
  O="$O -r @dabsi/common/register.ts"
  REGISTER_O=$O

  if [ "$mon" ]; then
    O=""
    O="$O -w src"
    O="$O -w $DABSI_PATH"
    O="$O $REGISTER_O"
    O="$O -e ts,tsx"
    O="$O -i node_modules"
    O="$O -i packages"
    O="$O $(platformDirs browser)"
    _node="nodemon $DABSI_MON $O -x node"
  else
    _node="node $REGISTER_O"
  fi

  O=""
  O="$O --preserve-symlinks"
  export NODE_OPTIONS=$O

  if [ "$DABSI_NODE_DEBUG" ]; then
    O="$O --inspect "
  fi

  export TS_NODE_TRANSPILE_ONLY=true
  export TS_NODE_PROJECT="./tsconfig.json"

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

function dabsi-typestack() {

  dabsi node -r @dabsi/typestack/register.ts src/index.ts $*
}


function dabsi() {
   dabsi-$1 ${@:2}
}


if [ "${@: -1}" == "--mon" ]; then
  dabsi mon ${@:1:$#-1}
else
  dabsi $*
fi;




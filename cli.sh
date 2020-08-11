alias dabsi-node='TS_NODE_TRANSPILE_ONLY=true node -r ts-node/register'

DABSI_MON="-i node_modules -i packages"

if [ -f "./dabsi.sh" ]; then
  source ./dabsi.sh
fi

export DABSI_PATH=$(dirname $BASH_SOURCE)

function dabsi-node() {

  if [ "$mon" ]; then
    _node="nodemon $DABSI_MON -e ts,tsx"
  else
    _node="node"
  fi

  C=""

  if [ "$DABSI_NODE_DEBUG" ]; then
    C="$C --inspect "
  fi

  TS_NODE_TRANSPILE_ONLY=true \
  NODE_OPTIONS=$(echo "$C --preserve-symlinks" \
  " -r source-map-support/register" \
  " -r ts-node/register" \
  " -r $DABSI_PATH/src/jasmine/register.ts" \
  " -r $DABSI_PATH/src/common/register.ts" \
  ) \
     $_node $C $*


}

function dabsi-mon() {
  mon=1 dabsi $*
}

function dabsi-test() {
   dabsi node \
   node_modules/jasmine/bin/jasmine.js \
    $(find $1 -type f -path '*/tests/*' -name '*.ts*' \
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

dabsi $*

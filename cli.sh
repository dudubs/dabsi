alias dabsi-node='TS_NODE_TRANSPILE_ONLY=true node -r ts-node/register'

export DABSI_PATH=$(dirname $BASH_SOURCE)

function dabsi-node() {
    if [ "$mon" ]; then
         _node="nodemon -i node_modules -i packages -e ts,tsx"
    else
         _node="node"
    fi
     TS_NODE_TRANSPILE_ONLY=true \
     $_node -r ts-node/register \
      -r source-map-support/register \
      -r ./common/register.ts $*
}


function dabsi-mon() {
  mon=1 dabsi $*
}


function dabsi-test() {
   dabsi node -r ts-node/register node_modules/jasmine/bin/jasmine.js \
              $(find -type f -path '*/tests/*.ts*' ! -path '*/node_modules/*') \
                --stop-on-failure=true
}

function dabsi-() {
    echo "no dabsi command"
}
function dabsi() {

  if [ -f "$DABSI_PATH/scripts/$1.ts" ]; then
    dabsi node "$DABSI_PATH/scripts/$1.ts" ${@:2}
  else
    dabsi-$1 ${@:2}
  fi;
}

dabsi $*

alias dabsi-node='TS_NODE_TRANSPILE_ONLY=true node -r ts-node/register'

export DABSI_PATH=$(dirname $BASH_SOURCE)

function dabsi-node() {

    if [ "$mon" ]; then
         _node="nodemon -i node_modules -i packages -e ts,tsx"
    else
         _node="node"
    fi

    C="";

#    if [ -d "./node_modules/tsconfig-paths" ]; then
#        C="$C -r tsconfig-paths/register"
#    fi

    if [ "$DABSI_NODE_DEBUG" ]; then
      C="$C --inspect"
    fi

     TS_NODE_TRANSPILE_ONLY=true \
     $_node -r ts-node/register \
      -r source-map-support/register \
      $C \
      -r $DABSI_PATH/src/common/register.ts \
      $*

}


function dabsi-mon() {
  mon=1 dabsi $*
}


function dabsi-test() {
    dabsi node -r ts-node/register node_modules/jasmine/bin/jasmine.js \
              $(find $1 -type f -path '*/tests/*.ts*' ! -path '*/node_modules/*') \
                --stop-on-failure=true
}

function dabsi-debug() {
    DABSI_NODE_DEBUG=1 dabsi $*
}
function dabsi-() {
    echo "no dabsi command"
}

function dabsi() {

 if [ -f "$DABSI_PATH/scripts/$1.ts" ]; then
    dabsi node "$DABSI_PATH/scripts/$1.ts" ${@:2}
  else
      if [ -f "$DABSI_PATH/scripts/$1.sh" ]; then
       $DABSI_PATH/scripts/$1.sh ${@:2}
    else
      dabsi-$1 ${@:2}
    fi;
  fi;

}

dabsi $*

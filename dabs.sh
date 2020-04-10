alias dabs-node='TS_NODE_TRANSPILE_ONLY=true node -r ts-node/register'

function dabs-node() {
    if [ "$mon" ]; then
         _node="nodemon -i node_modules -e ts,tsx"
    else
         _node="node"
    fi
     TS_NODE_TRANSPILE_ONLY=true \
     $_node -r ts-node/register -r ./common/register.ts $*
}


function dabs-mon() {
  mon=1 dabs $*
}

function dabs() {
  dabs-$1 ${@:2}
}
function dabs-test() {
  dabs node -r ts-node/register node_modules/jasmine/bin/jasmine.js \
              $(find -type f -name *.test.ts) \
                --stop-on-failure=true
}


function dabs-pk-build() {

}

dabs $*

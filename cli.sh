
O=""
O="$O --preserve-symlinks"
O="$O -r source-map-support/register"
O="$O -r ts-node/register"

export DABSI_NODE_OPTIONS=$O

O="$O -r $DABSI_PATH/src/register.ts"

export TS_NODE_PROJECT="$DABSI_PATH/tsconfig.json"
export TS_NODE_TRANSPILE_ONLY=true


node $O $DABSI_PATH/src/cli/index.ts $*



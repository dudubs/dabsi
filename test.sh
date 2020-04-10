
TS_NODE_TRANSPILE_ONLY=true \
node -r ts-node/register \
  node_modules/jasmine/bin/jasmine.js \
  $(find -type f -name *.test.ts) \
  --stop-on-failure=true

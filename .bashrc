#!/usr/bin/bash

echo Loads DABSI bash-rc

export DABSI_DIR=$(dirname $BASH_SOURCE)

export PATH=$DABSI_DIR/bin:$PATH
export PATH=$DABSI_DIR/../node_modules/.bin:$PATH

cd $DABSI_DIR/..




alias mount-dabsi-vscode='sudo mount --bind $DABSI_DIR/packages/vscode ~/.vscode-server/extensions/dabsi.vscode'


export APP_GOOGLE_PASSPORT_CLIENT_ID="462471847157-eteq0f0asun2a5mggmrn09eo11o9qadg.apps.googleusercontent.com"
export APP_GOOGLE_PASSPORT_CLIENT_SECRET="U6zBAQOdKAnuvkTqzlqkivBp"

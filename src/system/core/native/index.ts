import { NativeAppComponentRef } from "@dabsi/native";
import { SYSTEM_RPC_PATH } from "@dabsi/system/core/common/rpc";
import RnpSystemRoot from "@dabsi/system/core/native/RnpSystemRoot";
import SystemViewCommand from "@dabsi/system/core/view/SystemViewCommand";
import axios from "axios";
import React from "react";

NativeAppComponentRef.current = () => React.createElement(RnpSystemRoot);

SystemViewCommand.handle(payloads =>
  axios
    .post(`http://10.0.2.2:5000` + SYSTEM_RPC_PATH, {
      payloads,
    })
    .then(result => result.data.responses)
);

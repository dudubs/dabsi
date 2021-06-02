import { NativeAppComponentRef } from "@dabsi/native";
import { SystemCommand } from "@dabsi/system/core/common/command";
import SystemRpc, { SYSTEM_RPC_PATH } from "@dabsi/system/core/common/rpc";
import NtSystemRoot from "@dabsi/system/core/native/NtSystemRoot";
import axios from "axios";
import React from "react";

NativeAppComponentRef.current = () => React.createElement(NtSystemRoot);

SystemCommand.handle(payloads =>
  axios
    .post(`http://10.0.2.2:5000` + SYSTEM_RPC_PATH, {
      payloads,
    })
    .then(result => result.data.responses)
);

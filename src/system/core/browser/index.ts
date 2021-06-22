import { MuiSystemRoot } from "@dabsi/system/core/browser/MuiSystemRoot";
import { SYSTEM_RPC_PATH } from "@dabsi/system/core/common/rpc";
import axios from "axios";
//
import React from "react";
import ReactDOM from "react-dom";
import SystemViewCommand from "../view/SystemViewCommand";

SystemViewCommand.handle(payloads =>
  axios
    .post(SYSTEM_RPC_PATH, {
      payloads,
    })
    .then(result => result.data.responses)
);

window.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  document.body.append(container);
  ReactDOM.render(React.createElement(MuiSystemRoot), container);
});

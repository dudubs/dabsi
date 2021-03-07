import { SystemRpcPath } from "@dabsi/system/core/common/rpc";
import { SystemCommand } from "@dabsi/system/core/common/command";
import React from "react";
import ReactDOM from "react-dom";
import { MuiSystemView } from "./MuiSystemView";

SystemCommand.handle((path, payload) => {
  return fetch(SystemRpcPath, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, payload }),
  })
    .then(res => res.json())
    .then(res => res.result);
});

window.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  document.body.append(container);
  ReactDOM.render(React.createElement(MuiSystemView), container);
});

import { SYSTEM_RPC_PATH } from "@dabsi/system/core/common/rpc";
import { SystemCommand } from "@dabsi/system/core/common/command";
import React from "react";
import ReactDOM from "react-dom";
import { MuiSystemView } from "./view";

SystemCommand.handle(requests => {
  return fetch(SYSTEM_RPC_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      requests.map(({ path, payload }) => ({
        path,
        payload,
      }))
    ),
  })
    .then(res => res.json())
    .then(res =>
      (res.responses as any[]).map((result, index) => {
        requests[index].resolve(result);
      })
    );
});

window.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  document.body.append(container);
  ReactDOM.render(React.createElement(MuiSystemView), container);
});

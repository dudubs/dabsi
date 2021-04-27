import { SYSTEM_RPC_PATH } from "@dabsi/system/core/common/rpc";
import { SystemCommand } from "@dabsi/system/core/common/command";
//

import React from "react";
import ReactDOM from "react-dom";
import { MuiSystemRoot } from "./MuiSystemRoot";

SystemCommand.handle(async requests => {
  const responses: any[] = await (
    await fetch(SYSTEM_RPC_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requests.map(({ payload }) => payload)),
    })
  ).json();

  for (const [index, response] of responses.entries()) {
    requests[index].resolve(response);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  document.body.append(container);
  ReactDOM.render(React.createElement("div", null, "hello"), container);
});

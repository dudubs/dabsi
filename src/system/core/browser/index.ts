import { MuiSystemRoot } from "@dabsi/system/core/browser/MuiSystemRoot";
import { SystemCommand } from "@dabsi/system/core/common/command";
import { SYSTEM_RPC_PATH } from "@dabsi/system/core/common/rpc";
//
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

SystemCommand.handle(async payloads => {
  return await (
    await fetch(SYSTEM_RPC_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payloads }),
    })
  ).json();
});

window.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  document.body.append(container);
  ReactDOM.render(React.createElement(MuiSystemRoot), container);
});

console.log("??");

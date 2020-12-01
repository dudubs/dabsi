import React from "react";
import ReactDOM from "react-dom";
import {
  commandSystemRpc,
  SystemRpc,
  SystemRpcPath,
} from "../common/SystemRpc";
import { SystemView } from "./SystemView";

commandSystemRpc((path, payload) => {
  return fetch(SystemRpcPath, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, payload }),
  }).then(res => res.json());
});

window.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  document.body.append(container);
  ReactDOM.render(React.createElement(SystemView), container);
});

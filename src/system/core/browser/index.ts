import React from "react";
import ReactDOM from "react-dom";
import { SystemRpc } from "../common/SystemRpc";
import { SystemView } from "./SystemView";

SystemRpc.connect((payload) =>
  fetch(SystemRpc.path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((res) => res.json())
);

window.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  document.body.append(container);
  ReactDOM.render(React.createElement(SystemView), container);
});

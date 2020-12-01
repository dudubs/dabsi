import { createElement } from "react";
import ReactDOM from "react-dom";

import { SystemApp } from "../common/SystemApp";
import { MuiSystemRootView } from "./MuiSystemRootView";

SystemApp.commandRpcService(payload => {
  return fetch("/service", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(res => res.json());
});

export const SystemLoginInfo = SystemApp.service.getLoginInfo();

window.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    createElement(MuiSystemRootView), //
    document.getElementById("system")
  );
});

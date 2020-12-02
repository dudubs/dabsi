import { createElement } from "react";
import ReactDOM from "react-dom";

import { SystemApp } from "../common/SystemApp";
import { MuiSystemView } from "./MuiSystemView";

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
    createElement(MuiSystemView), //
    document.getElementById("system")
  );
});

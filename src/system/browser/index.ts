import { createElement } from "react";
import ReactDOM from "react-dom";
import { handleRpcService } from "../../typerpc/Rpc";
import { SystemApp } from "../common/SystemApp";
import { MuiSystemView } from "./MuiSystemView";

handleRpcService(SystemApp, payload => {
  return fetch("/service", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(res => res.json());
});

SystemApp.service.getLoginInfo().then(loginInfo => {
  console.log({ loginInfo });
});

window.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    createElement(MuiSystemView), //
    document.getElementById("system")
  );
});

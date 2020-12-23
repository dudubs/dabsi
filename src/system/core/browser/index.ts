import { MuiSystemView } from "@dabsi/system/core/browser/MuiSystemView";
import {
  catchSystemCommand,
  commandSystemRpc,
  SystemRpcPath,
} from "@dabsi/system/core/SystemRpc";
import React from "react";
import ReactDOM from "react-dom";

commandSystemRpc((path, payload) => {
  return fetch(SystemRpcPath, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, payload }),
  })
    .then(res => res.json())
    .then(res => res.result);
});

export async function commandSystemRpcOnBrowser<T>(
  { formData }: { formData?: FormData },
  callback: () => Promise<T>
) {
  if (!formData) formData = new FormData();
  if (formData.has("command")) {
    throw new Error();
  }

  const { path, payload, resolve } = catchSystemCommand(callback);
  formData.set("command", JSON.stringify({ path, payload }));

  resolve(
    await fetch(SystemRpcPath, {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(res => res.result)
  );
}

window.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  document.body.append(container);
  ReactDOM.render(React.createElement(MuiSystemView), container);
});

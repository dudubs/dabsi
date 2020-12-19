import React from "react";
import ReactDOM from "react-dom";
import { MuiDataInputMapView } from "@dabsi/browser/mui/rpc/inputs/MuiDataInputMapView";
import { MuiDataInputView } from "@dabsi/browser/mui/rpc/inputs/MuiDataInputView";
import { MuiTextInputView } from "@dabsi/browser/mui/rpc/inputs/MuiTextInputView";
import { MuiDataTableView } from "@dabsi/browser/mui/rpc/MuiDataTableView";
import { MuiFormView } from "@dabsi/browser/mui/rpc/MuiFormView";
import { DataInputMap } from "@dabsi/typerpc/input/data-input-map/DataInputMap";
import { DataInput } from "@dabsi/typerpc/input/data-input/DataInput";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import { DataTable } from "@dabsi/typerpc/widget/data-table/DataTable";
import { Form } from "@dabsi/typerpc/widget/form/Form";
import { SystemView } from "@dabsi/system/view/SystemView";
import { commandSystemRpc, SystemRpcPath } from "@dabsi/system/core/SystemRpc";
import { MuiSystemView } from "@dabsi/system/core/browser/MuiSystemView";

commandSystemRpc((path, payload) => {
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

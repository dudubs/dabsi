import { WidgetNamespaceView } from "./../../../typerpc/widget/widget-namespace/WidgetNamespaceView";
import React from "react";
import ReactDOM from "react-dom";
import { MuiDataInputMapView } from "../../../browser/mui/rpc/inputs/MuiDataInputMapView";
import { MuiDataInputView } from "../../../browser/mui/rpc/inputs/MuiDataInputView";
import { MuiTextInputView } from "../../../browser/mui/rpc/inputs/MuiTextInputView";
import { MuiDataTableView } from "../../../browser/mui/rpc/MuiDataTableView";
import { MuiFormView } from "../../../browser/mui/rpc/MuiFormView";
import { DataInputMap } from "../../../typerpc/input/data-input-map/DataInputMap";
import { DataInput } from "../../../typerpc/input/data-input/DataInput";
import { InputMap } from "../../../typerpc/input/input-map/InputMap";
import { InputMapView } from "../../../typerpc/input/input-map/InputMapView";
import { TextInput } from "../../../typerpc/input/text-input/TextInput";
import { DataTable } from "../../../typerpc/widget/data-table/DataTable";
import { Form } from "../../../typerpc/widget/form/Form";
import { WidgetMap } from "../../../typerpc/widget/widget-map/WidgetMap";
import { SystemMapView } from "../../view/SystemMapView";
import { SystemView } from "../../view/SystemView";
import { commandSystemRpc, SystemRpcPath } from "../common/SystemRpc";
import { WidgetMapView } from "./../../../typerpc/widget/widget-map/WidgetMapView";
import { MuiGridMapView } from "./MuiGridMapView";
import { MuiSystemView } from "./MuiSystemView";
import { WidgetNamespace } from "../../../typerpc/widget/widget-namespace/WidgetNamspace";

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

SystemView
  //
  .register(TextInput, MuiTextInputView)
  .register(Form, MuiFormView)
  .register(DataInputMap, MuiDataInputMapView)
  .register(DataInput, MuiDataInputView)
  .register(DataTable, MuiDataTableView);

SystemMapView.register(WidgetMap, WidgetMapView, MuiGridMapView);
SystemMapView.register(WidgetNamespace, WidgetNamespaceView, MuiGridMapView);
SystemMapView.register(InputMap, InputMapView, MuiGridMapView);

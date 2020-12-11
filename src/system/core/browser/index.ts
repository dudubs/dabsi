import { WidgetMapView } from "./../../../typerpc/widget/widget-map/WidgetMapView";
import React, { createElement } from "react";
import ReactDOM from "react-dom";
import { MuiDataInputMapView } from "../../../browser/mui/rpc/inputs/MuiDataInputMapView";
import { MuiDataInputView } from "../../../browser/mui/rpc/inputs/MuiDataInputView";
import { MuiTextInputView } from "../../../browser/mui/rpc/inputs/MuiTextInputView";
import { MuiDataTableView } from "../../../browser/mui/rpc/MuiDataTableView";
import { MuiFormView } from "../../../browser/mui/rpc/MuiFormView";
import { DataInputMap } from "../../../typerpc/input/data-input-map/DataInputMap";
import { DataInput } from "../../../typerpc/input/data-input/DataInput";
import { InputMap } from "../../../typerpc/input/input-map/InputMap";
import { TextInput } from "../../../typerpc/input/text-input/TextInput";
import { DataTable } from "../../../typerpc/widget/data-table/DataTable";
import { Form } from "../../../typerpc/widget/form/Form";
import { SystemMapView } from "../../view/SystemMapView";
import { WidgetMap } from "../../../typerpc/widget/widget-map/WidgetMap";
import { commandSystemRpc, SystemRpcPath } from "../common/SystemRpc";
import { SystemView } from "../../view/SystemView";
import { MuiInputMapView } from "./MuiInputMapView";
import { MuiSystemView } from "./MuiSystemView";
import { MuiWidgetMapView } from "./MuiWidgetMapView";
import { MuiGridMapView } from "./MuiGridMapView";
import { InputMapView } from "../../../typerpc/input/input-map/InputMapView";

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
// .register(DataInput, Mu)

SystemMapView.register(WidgetMap, WidgetMapView, MuiGridMapView);

SystemMapView.register(InputMap, InputMapView, MuiGridMapView);

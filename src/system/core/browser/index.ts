import { WidgetMap } from "../../../typerpc/widget/widget-map/WidgetMap";
import React from "react";
import ReactDOM from "react-dom";
import { MuiTextInputView } from "../../../browser/mui/rpc/inputs/MuiTextInputView";
import { MuiFormView } from "../../../browser/mui/rpc/MuiFormView";
import { partialProps } from "../../../react/utils/partialProps";
import { InputMap } from "../../../typerpc/input/input-map/InputMap";
import { InputMapView } from "../../../typerpc/input/input-map/InputMapView";
import { TextInput } from "../../../typerpc/input/text-input/TextInput";
import { Form } from "../../../typerpc/widget/form/Form";
import { commandSystemRpc, SystemRpcPath } from "../common/SystemRpc";
import { SystemView } from "../common/SystemView";
import { MuiInputMapView } from "./MuiInputMapView";
import { MuiSystemView } from "./MuiSystemView";
import { MuiWidgetMapView } from "./MuiWidgetMapView";
import { DataInput } from "../../../typerpc/input/data-input/DataInput";
import { DataInputMap } from "../../../typerpc/input/data-input-map/DataInputMap";
import { MuiDataInputMapView } from "../../../browser/mui/rpc/inputs/MuiDataInputMapView";
import { MuiDataInputView } from "../../../browser/mui/rpc/inputs/MuiDataInputView";

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
  .register(InputMap, MuiInputMapView)
  .register(Form, MuiFormView)
  .register(WidgetMap, MuiWidgetMapView)
  .register(DataInputMap, MuiDataInputMapView)
  .register(DataInput, MuiDataInputView);
// .register(DataInput, Mu)

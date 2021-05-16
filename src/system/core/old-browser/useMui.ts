import MuiCheckboxInputView from "@dabsi/browser/mui/input/CheckboxInput";
import { MuiDataInputMapView } from "@dabsi/browser/mui/input/DataInputMap";
import { MuiTextInputView } from "@dabsi/browser/mui/views/MuiTextInput";
import { MuiDataTableView } from "@dabsi/browser/mui/widget/OldDataTable";
import { MuiFormView } from "@dabsi/browser/mui/form/view";
import { MuiGridMapView } from "@dabsi/system/core/old-browser/MuiGridMapView";
import { SystemBrowserComponents } from "@dabsi/system/core/browser/components";
import { SystemView } from "@dabsi/system/core/old-view/SystemView";
import { SystemViewDefiner } from "@dabsi/system/core/old-view/use";
import { BoolInput } from "@dabsi/old-typerpc/input/bool-input/BoolInput";
import { DataInputMap } from "@dabsi/old-typerpc/input/data-input-map/DataInputMap";
import { InputMap } from "@dabsi/old-typerpc/input/input-map/InputMap";
import { TextInput } from "@dabsi/old-typerpc/input/text-input/TextInput";
import { DataTable } from "@dabsi/old-typerpc/data-table/rpc";
import { Form } from "@dabsi/old-typerpc/widget/form/rpc";
import { WidgetMap } from "@dabsi/old-typerpc/widget/widget-map/rpc";
import { createElement } from "react";

export function useSystemBrowserMui(
  callback?: (definer: SystemViewDefiner) => void
) {
  SystemView.use(define => {
    define(TextInput, MuiTextInputView);
    define(Form, MuiFormView);
    define(DataInputMap, MuiDataInputMapView);
    define(BoolInput, MuiCheckboxInputView);
    // define(DataInput, MuiDataInputView);
    define(DataTable, MuiDataTableView);

    define(InputMap, props => createElement(MuiGridMapView, { for: props }));
    define(WidgetMap, props => createElement(MuiGridMapView, { for: props }));

    callback?.(define);

    for (const callback of SystemBrowserComponents) {
      callback(define);
    }
  });
}

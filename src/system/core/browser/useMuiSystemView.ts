import MuiCheckboxInputView from "@dabsi/browser/mui/widget/input/MuiCheckboxInputView";
import { MuiDataInputMapView } from "@dabsi/browser/mui/widget/input/MuiDataInputMapView";
import { MuiTextInputView } from "@dabsi/browser/mui/widget/input/MuiTextInputView";
import { MuiDataTableView } from "@dabsi/browser/mui/widget/MuiDataTableView";
import { MuiFormView } from "@dabsi/browser/mui/widget/MuiFormView";
import { MuiGridMapView } from "@dabsi/system/core/browser/MuiGridMapView";
import MuiSystemViewComponents from "@dabsi/system/core/browser/MuiSystemViewComponents";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { SystemViewDefiner } from "@dabsi/system/core/view/use";
import { BoolInput } from "@dabsi/typerpc/input/bool-input/BoolInput";
import { DataInputMap } from "@dabsi/typerpc/input/data-input-map/DataInputMap";
import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import { DataTable } from "@dabsi/typerpc/widget/data-table/rpc";
import { Form } from "@dabsi/typerpc/widget/form/rpc";
import { WidgetMap } from "@dabsi/typerpc/widget/widget-map/rpc";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";
import { createElement } from "react";

export function useMuiSystemView(
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
    define(WidgetNamespace, props =>
      createElement(MuiGridMapView, { for: props }));
    callback?.(define);

    for (const callback of MuiSystemViewComponents) {
      callback(define);
    }
  });
}

import { BoolInput } from "@dabsi/typerpc/input/bool-input/BoolInput";
import { MuiDataInputMapView } from "@dabsi/browser/mui/rpc/inputs/MuiDataInputMapView";
import { MuiDataInputView } from "@dabsi/browser/mui/rpc/inputs/MuiDataInputView";
import { MuiTextInputView } from "@dabsi/browser/mui/rpc/inputs/MuiTextInputView";
import { MuiDataTableView } from "@dabsi/browser/mui/rpc/MuiDataTableView";
import { MuiFormView } from "@dabsi/browser/mui/rpc/MuiFormView";
import { MuiGridMapView } from "@dabsi/system/rpc/browser/MuiGridMapView";
import { DataInputMap } from "@dabsi/typerpc/input/data-input-map/DataInputMap";
import { DataInput } from "@dabsi/typerpc/input/data-input/DataInput";
import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import { DataTable } from "@dabsi/typerpc/widget/data-table/DataTable";
import { Form } from "@dabsi/typerpc/widget/form/Form";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";
import { createElement } from "react";
import { WidgetMap } from "@dabsi/typerpc/widget/widget-map/WidgetMap";
import {
  useSystemViewTheme,
  UseSystemViewThemeCallback,
} from "@dabsi/system/rpc/view/useSystemViewTheme";
import MuiCheckboxInputView from "@dabsi/browser/mui/rpc/inputs/MuiCheckboxInputView";

export function useMuiSystemViewTheme(callback?: UseSystemViewThemeCallback) {
  useSystemViewTheme(use => {
    use(TextInput, MuiTextInputView);
    use(Form, MuiFormView);
    use(DataInputMap, MuiDataInputMapView);
    use(BoolInput, MuiCheckboxInputView);
    // use(DataInput, MuiDataInputView);
    use(DataTable, MuiDataTableView);

    use(InputMap, props => createElement(MuiGridMapView, { for: props }));
    use(WidgetMap, props => createElement(MuiGridMapView, { for: props }));
    use(WidgetNamespace, props =>
      createElement(MuiGridMapView, { for: props })
    );
    callback?.(use);
  });
}

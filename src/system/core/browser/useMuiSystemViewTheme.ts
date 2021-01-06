import MuiCheckboxInputView from "@dabsi/browser/mui/rpc/inputs/MuiCheckboxInputView";
import { MuiDataInputMapView } from "@dabsi/browser/mui/rpc/inputs/MuiDataInputMapView";
import { MuiTextInputView } from "@dabsi/browser/mui/rpc/inputs/MuiTextInputView";
import { MuiDataTableView } from "@dabsi/browser/mui/rpc/MuiDataTableView";
import { MuiFormView } from "@dabsi/browser/mui/rpc/MuiFormView";
import { MuiGridMapView } from "@dabsi/system/core/browser/MuiGridMapView";
import {
  useSystemViewTheme,
  UseSystemViewThemeCallback,
} from "@dabsi/system/core/view/useSystemViewTheme";
import { BoolInput } from "@dabsi/typerpc/input/bool-input/BoolInput";
import { DataInputMap } from "@dabsi/typerpc/input/data-input-map/DataInputMap";
import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import { DataTable } from "@dabsi/typerpc/widget/data-table/DataTable";
import { Form } from "@dabsi/typerpc/widget/form/Form";
import { WidgetMap } from "@dabsi/typerpc/widget/widget-map/WidgetMap";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";
import { createElement } from "react";

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

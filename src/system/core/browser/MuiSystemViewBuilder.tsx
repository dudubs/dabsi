import { MuiFormView } from "@dabsi/browser/mui/views/MuiFormView";
import { MuiObjectInputView } from "@dabsi/browser/mui/views/MuiObjectInputView";
import { MuiTextInputView } from "@dabsi/browser/mui/views/MuiTextInput";
import {
  SystemView,
  SystemViewBuilder,
} from "@dabsi/system/core/view/SystemView";
import { AnyForm } from "@dabsi/typerpc2/form/rpc";
import { AnyObjectInput } from "@dabsi/typerpc2/object-input/rpc";
import { TextInput } from "@dabsi/typerpc2/text-input/rpc";
import React from "react";

export const MuiSystemViewBuilder: SystemViewBuilder = $ => {
  $(TextInput, props => <MuiTextInputView {...props} />);

  $(AnyForm, props => (
    <MuiFormView {...props}>{props => <SystemView {...props} />}</MuiFormView>
  ));

  $(AnyObjectInput, props => <MuiObjectInputView {...props} />);
};

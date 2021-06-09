import { MuiFormView } from "@dabsi/browser/mui/views/MuiFormView";
import { MuiObjectInputView } from "@dabsi/browser/mui/views/MuiObjectInputView";
import { MuiTextInputView } from "@dabsi/browser/mui/views/MuiTextInputView";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import SystemViewBuilder from "@dabsi/system/core/view/SystemViewBuilder";
import { AnyForm } from "@dabsi/typerpc2/form/rpc";
import { AnyObjectInput } from "@dabsi/typerpc2/object-input/rpc";
import { TextInput } from "@dabsi/typerpc2/text-input/rpc";
import React from "react";

export default ($: SystemViewBuilder<unknown>) =>
  $
    //
    .for(TextInput, $ => $.render(props => <MuiTextInputView {...props} />))
    .for(AnyObjectInput, $ =>
      $.render(props => <MuiObjectInputView {...props} />)
    )
    .for(AnyForm, $ =>
      $.render(props => (
        <MuiFormView {...props}>
          {props => <SystemView {...props} />}
        </MuiFormView>
      ))
    );

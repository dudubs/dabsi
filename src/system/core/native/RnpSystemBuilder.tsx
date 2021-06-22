import RnpFormView from "@dabsi/native/rnp/views/RnpFormView";
import RnpObjectInputView from "@dabsi/native/rnp/views/RnpObjectInputView";
import RnpTextInputView from "@dabsi/native/rnp/views/RnpTextInputView";
import SystemViewBuilder from "@dabsi/system/core/view/SystemViewBuilder";
import { AnyForm } from "@dabsi/typerpc2/form/rpc";
import { AnyObjectInput } from "@dabsi/typerpc2/object-input/rpc";
import { TextInput } from "@dabsi/typerpc2/text-input/rpc";
import React from "react";

export default ($: SystemViewBuilder<unknown>) =>
  $
    //
    .for(TextInput, $ => $.render(props => <RnpTextInputView {...props} />))
    .for(AnyObjectInput, $ =>
      $.render(props => <RnpObjectInputView {...props} />)
    )
    .for(AnyForm, $ => $.render(props => <RnpFormView {...props} />));

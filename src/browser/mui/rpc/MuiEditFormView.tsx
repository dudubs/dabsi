import {
  MuiFormView,
  MuiFormViewProps,
} from "@dabsi/browser/mui/rpc/MuiFormView";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { AnyForm } from "@dabsi/typerpc/widget/form/Form";
import React from "react";

export function MuiEditFormView<C extends RpcConnection<AnyForm>>(
  props: MuiFormViewProps<C>
) {
  return (
    <MuiFormView
      disableResetButton
      submitTitle={lang`SAVE_CHANGES`}
      {...props}
    />
  );
}

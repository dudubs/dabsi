import React from "react";
import {
  MuiFormView,
  MuiFormViewProps,
} from "../../../browser/mui/rpc/MuiFormView";
import { Lang } from "../../../lang/Lang";
import { RpcConnection } from "../../../typerpc/Rpc";
import { AnyForm } from "../../../typerpc/widget/form/Form";

export function MuiEditFormView<C extends RpcConnection<AnyForm>>(
  props: MuiFormViewProps<C>
) {
  return (
    <MuiFormView
      disableResetButton
      submitTitle={Lang`SAVE_CHANGES`}
      {...props}
    />
  );
}

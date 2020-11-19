import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import FormControlLabel, {
  FormControlLabelProps,
} from "@material-ui/core/FormControlLabel";
import * as React from "react";
import { ReactNode } from "react";
import { OmitKeys } from "../../../../common/typings2/OmitKeys";
import { mergeProps } from "../../../../react/utils/mergeProps";
import { BoolInput } from "../../../../typerpc/input/bool-input/BoolInput";
import {
  BoolInputView,
  BoolInputViewProps,
} from "../../../../typerpc/input/bool-input/BoolInputView";

import { RpcConnection } from "../../../../typerpc/Rpc";

export type MuiCheckBoxInputViewProps<
  C extends RpcConnection<BoolInput>
> = OmitKeys<BoolInputViewProps<C>, "children"> & {
  title?: ReactNode;
  FormControlLabelProps?: Partial<FormControlLabelProps>;
  CheckboxProps?: Partial<CheckboxProps>;
};

export function MuiCheckboxInputView<C extends RpcConnection<BoolInput>>({
  title,
  CheckboxProps,
  FormControlLabelProps,
  ...props
}: MuiCheckBoxInputViewProps<C>) {
  return (
    <BoolInputView {...props}>
      {view => {
        const checkbox = (
          <Checkbox
            {...mergeProps(CheckboxProps, {
              onChange: () => view.setValue(!view.value),
            })}
            checked={view.value}
          />
        );

        return title ? (
          <FormControlLabel
            {...FormControlLabelProps}
            label={title}
            control={checkbox}
          />
        ) : (
          checkbox
        );
      }}
    </BoolInputView>
  );
}

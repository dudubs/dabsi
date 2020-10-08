import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import FormControlLabel, {
  FormControlLabelProps,
} from "@material-ui/core/FormControlLabel";
import * as React from "react";
import { ReactNode } from "react";
import { mergeProps } from "../../../../react/utils/mergeProps";
import { BoolInput } from "../../../../typerpc/input/BoolInput";
import {
  BoolInputView,
  BoolInputViewProps,
} from "../../../../typerpc/input/BoolInputView";
import { RpcConnection } from "../../../../typerpc/Rpc";

export type MuiCheckBoxInputViewProps<
  C extends RpcConnection<BoolInput>
> = Omit<BoolInputViewProps<C>, "children"> & {
  title?: ReactNode;
  FormControlLabelProps?: Partial<FormControlLabelProps>;
  CheckboxProps?: Partial<CheckboxProps>;
};

export function MuiCheckBoxInputView<C extends RpcConnection<BoolInput>>({
  title,
  CheckboxProps,
  FormControlLabelProps,
  ...props
}: MuiCheckBoxInputViewProps<C>) {
  return (
    <BoolInputView {...props}>
      {(view) => {
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

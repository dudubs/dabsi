import { OmitKeys } from "@dabsi/common/typings2/OmitKeys";
import { BoolInput } from "@dabsi/typerpc/input/bool-input/BoolInput";
import BoolInputView, {
  BoolInputViewProps,
} from "@dabsi/typerpc/input/bool-input/BoolInputView";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { mergeProps } from "@dabsi/view/react/merging/mergeProps";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import React, { ReactNode } from "react";

export type MuiCheckBoxInputViewProps<
  C extends RpcConnection<BoolInput>
> = OmitKeys<BoolInputViewProps<C>, "children"> & {
  title?: ReactNode;
  CheckboxProps?: Partial<CheckboxProps>;
};
export const kaka = 11;

export default function MuiCheckboxInputView<
  C extends RpcConnection<BoolInput>
>({ title, CheckboxProps, ...props }: MuiCheckBoxInputViewProps<C>) {
  return (
    <BoolInputView {...props}>
      {view => {
        return (
          <Checkbox
            {...mergeProps(CheckboxProps, {
              onChange: () => view.setValue(!view.value),
            })}
            checked={view.value}
          />
        );
      }}
    </BoolInputView>
  );
}

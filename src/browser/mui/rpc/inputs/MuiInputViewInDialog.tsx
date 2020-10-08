import React, { MutableRefObject, useRef, useState } from "react";
import { Renderer } from "../../../../react/renderer";
import { mergeProps } from "../../../../react/utils/mergeProps";
import {
  AnyInputConnection,
  InputValue,
} from "../../../../typerpc/input/Input";
import { InputView, InputViewProps } from "../../../../typerpc/input/InputView";
import { MuiDialog, MuiDialogProps } from "../../components/MuiDialog";

export function MuiInputViewInDialog<C extends AnyInputConnection>({
  children,
  MuiDialogProps,
  target,
  show,
  ...props
}: InputViewProps<C> & {
  show?: boolean;
  MuiDialogProps?: Partial<MuiDialogProps>;

  target: Renderer<InputViewProps<C>>;
  children: Renderer<{
    edit(): void;
    value: InputValue<C>;
  }>;
}) {
  const [showDialog, setShowDialog] = useState(show ?? false);
  const input: MutableRefObject<InputView<C> | null> = useRef(null);

  return (
    <>
      {children({
        value: props.value,
        edit() {
          setShowDialog(true);
        },
      })}
      {showDialog && (
        <MuiDialog
          open
          {...mergeProps(MuiDialogProps, {
            async onSubmit() {
              await input.current!.validate(); //
              if (input.current!.error == null) {
                props.onChange?.(input.current!);
                setShowDialog(false);
              }
            },
            async onCancel() {
              setShowDialog(false);
            },
          })}>
          {target({
            ...props,
            inputRef(current) {
              input.current = current;
            },
            onChange() {},
            onError() {},
          })}
        </MuiDialog>
      )}
    </>
  );
}

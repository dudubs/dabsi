import React, { ReactNode, useState } from "react";
import { HookRef, useUpdateRef } from "@dabsi/view/react/HookRef";
import { mergeProps } from "@dabsi/view/react/merging/mergeProps";
import {
  AnyArrayInputConnection,
  ArrayInputView,
  ArrayInputViewProps,
} from "@dabsi/old-typerpc/input/array-input/ArrayInputView";
import { InputViewProps } from "@dabsi/old-typerpc/input/InputView";
import { MuiAddButton } from "@dabsi/browser/mui/components/MuiButton";
import {
  MuiDialog,
  MuiDialogProps,
} from "@dabsi/browser/mui/components/MuiDialog";

export function MuiArrayInputView<C extends AnyArrayInputConnection>({
  hookRef,
  MuiDialogProps,
  debug,
  ...props
}: InputViewProps<C> &
  Pick<ArrayInputViewProps<C>, "renderNewItem" | "renderItem"> & {
    renderActions?: (view: ArrayInputView<C>, itemIndex: number) => ReactNode;
    debug?: boolean;
    MuiDialogProps?: Partial<MuiDialogProps>;
    addTitle?: ReactNode;
  } & HookRef<{
    add(): void;
  }>) {
  const [open, setOpen] = useState(debug || false);

  useUpdateRef(hookRef, () => ({
    add() {
      setOpen(true);
    },
  }));

  return (
    <ArrayInputView
      {...props}
      children={view => (
        <>
          {view.renderItems()}
          {open && (
            <MuiDialog
              {...mergeProps(MuiDialogProps, {
                MuiSubmitButtonsProps: {
                  buttonType: { $default: MuiAddButton },
                },
                async onSubmit() {
                  if (await view.add()) setOpen(false);
                },
                onCancel() {
                  setOpen(false);
                },
              })}
              open
            >
              {view.renderNewItem()}
            </MuiDialog>
          )}
        </>
      )}
    />
  );
}

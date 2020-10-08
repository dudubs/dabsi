import React, { ReactNode, useState } from "react";
import { mergeProps } from "../../../../react/utils/mergeProps";
import {
  AnyArrayInputConnection,
  ArrayInputView,
  ArrayInputViewProps,
} from "../../../../typerpc/input/ArrayInputView";
import { WidgetViewProps } from "../../../../typerpc/widget/WidgetView";
import { MuiDialog, MuiDialogProps } from "../../components/MuiDialog";
import { HookRef, useUpdateRef } from "../../../../react/HookRef";
import { MuiAddButton } from "../../components/MuiButton";

export function MuiArrayInputView<C extends AnyArrayInputConnection>({
  hookRef,
  MuiDialogProps,
  debug,
  ...props
}: WidgetViewProps<C> &
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
      children={(view) => (
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
              open>
              {view.renderNewItem()}
            </MuiDialog>
          )}
        </>
      )}
    />
  );
}

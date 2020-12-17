import React, { ReactNode } from "react";
import { Override } from "@dabsi/common/typings2/Override";
import { MuiDangerButton, MuiDangerButtonProps } from "@dabsi/browser/mui/components/MuiDangerButton";
import { Lang, LangNode } from "@dabsi/lang/Lang";
import { mergeProps } from "@dabsi/react/utils/mergeProps";

export function MuiDeleteButton({
  objectTitle,
  ...props
}: Override<
  MuiDangerButtonProps,
  {
    objectTitle?: LangNode;
  }
>) {
  return (
    <MuiDangerButton
      icon={require("@material-ui/icons/Delete")}
      title={Lang`DELETE`}
      {...mergeProps(props, {
        MuiDangerDialogProps: {
          objectTitle,
          actionTitle: Lang`DELETE`,
        },
      })}
    />
  );
}

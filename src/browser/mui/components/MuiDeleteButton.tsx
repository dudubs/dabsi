import {
  MuiDangerButton,
  MuiDangerButtonProps,
} from "@dabsi/browser/mui/components/MuiDangerButton";
import { Override } from "@dabsi/common/typings2/Override";
import { mergeProps } from "@dabsi/react/utils/mergeProps";
import React, { ReactNode } from "react";

export function MuiDeleteButton({
  objectTitle,
  ...props
}: Override<
  MuiDangerButtonProps,
  {
    objectTitle?: ReactNode;
  }
>) {
  return (
    <MuiDangerButton
      icon={require("@material-ui/icons/Delete")}
      title={lang`DELETE`}
      {...mergeProps(props, {
        MuiDangerDialogProps: {
          objectTitle,
          actionTitle: lang`DELETE`,
        },
      })}
    />
  );
}

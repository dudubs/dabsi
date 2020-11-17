import React, { ReactNode } from "react";
import { Override } from "../../../common/typings2/Override";
import { MuiDangerButton, MuiDangerButtonProps } from "./MuiDangerButton";
import { Lang, LangNode } from "../../../lang/Lang";
import { mergeProps } from "../../../react/utils/mergeProps";

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

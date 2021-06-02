import {
  MuiEditorButton,
  MuiEditorButtonProps,
} from "@dabsi/system/rich-text/browser/editor/mui/button";
import { RichTextStore } from "@dabsi/system/rich-text/browser/editor/store";
import FormatTextdirectionLToRIcon from "@material-ui/icons/FormatTextdirectionLToR";
import FormatTextdirectionRToLIcon from "@material-ui/icons/FormatTextdirectionRToL";
import React from "react";

const iconMap = {
  LTR: <FormatTextdirectionLToRIcon />,
  RTL: <FormatTextdirectionRToLIcon />,
};

export const MuiDirectionButton = ({
  store,
  direction,
  ...props
}: Omit<MuiEditorButtonProps, "icon"> & {
  direction: "LTR" | "RTL";

  store: RichTextStore;
}) => {
  return (
    <MuiEditorButton
      selected={store.currentDirection === direction}
      icon={iconMap[direction]}
      {...props}
      onClick={() => {
        store.applyDirection(direction);
      }}
    />
  );
};

import {
  MuiToolbarButton,
  MuiToolbarButtonProps,
} from "@dabsi/system/rich-text/browser/toolbar/button";
import { RichTextStore } from "@dabsi/system/rich-text/view/store";
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
}: MuiToolbarButtonProps & {
  direction: "LTR" | "RTL";

  store: RichTextStore;
}) => {
  return (
    <MuiToolbarButton
      selected={store.currentDirection === direction}
      icon={iconMap[direction]}
      {...props}
      onClick={() => {
        store.applyDirection(direction);
      }}
    />
  );
};

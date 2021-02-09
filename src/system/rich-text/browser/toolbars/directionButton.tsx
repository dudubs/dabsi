import { MuiToolbarButtonProps } from "@dabsi/system/rich-text/browser/toolbars/button";
import { RichTextStore } from "@dabsi/system/rich-text/view/store";
import FormatTextdirectionLToRIcon from "@material-ui/icons/FormatTextdirectionLToR";
import FormatTextdirectionRToLIcon from "@material-ui/icons/FormatTextdirectionRToL";
import React from "react";
import "../muiStyles";
import { MuiToolbarButton } from "./button";

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
      selected={store.currentBlock.getData().get("direction") === direction}
      icon={iconMap[direction]}
      {...props}
      onClick={() => {
        store.applyDirection(direction);
      }}
    />
  );
};

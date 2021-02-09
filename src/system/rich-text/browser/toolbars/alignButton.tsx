import { RichTextStore } from "@dabsi/system/rich-text/view/store";
import React from "react";
import { MuiToolbarButton, MuiToolbarButtonProps } from "./button";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";

const iconMap = {
  LEFT: <FormatAlignLeftIcon />,
  CENTER: <FormatAlignCenterIcon />,
  RIGHT: <FormatAlignRightIcon />,
  JUSTIFY: <FormatAlignJustifyIcon />,
};

export function MuiAlignButton({
  align,
  store,
  ...props
}: MuiToolbarButtonProps & {
  align: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFY";
  store: RichTextStore;
}) {
  return (
    <MuiToolbarButton
      icon={iconMap[align]}
      {...props}
      selected={store.currentBlock.getData().get("align") === align}
      onClick={() => store.applyAlignment(align)}
    />
  );
}

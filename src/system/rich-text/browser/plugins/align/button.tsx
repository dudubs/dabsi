import { RichTextStore } from "@dabsi/system/rich-text/view/store";
import React from "react";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import {
  MuiToolbarButton,
  MuiToolbarButtonProps,
} from "@dabsi/system/rich-text/browser/toolbar/button";

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
      selected={store.currentAlign === align}
      onClick={() => store.applyAlignment(align)}
    />
  );
}

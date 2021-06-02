import { MuiEditorButton } from "@dabsi/system/rich-text/browser/editor/mui/button";
import { MuiEditorButtonGroup } from "@dabsi/system/rich-text/browser/editor/mui/buttonGroup";
import { RichTextStore } from "@dabsi/system/rich-text/browser/editor/store";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import React from "react";

export const MuiAlignButton = ({
  store,
}: {
  store: RichTextStore;
}): React.ReactElement => {
  return (
    <MuiEditorButtonGroup
      value={store.getCurrentStyle("align")}
      onChange={value => {
        store.applyAlignment(value as any);
      }}
    >
      <MuiEditorButton value={"LEFT"} icon={<FormatAlignLeftIcon />} />
      <MuiEditorButton value={"CENTER"} icon={<FormatAlignCenterIcon />} />
      <MuiEditorButton value={"RIGHT"} icon={<FormatAlignRightIcon />} />
      <MuiEditorButton value={"JUSTIFY"} icon={<FormatAlignJustifyIcon />} />
    </MuiEditorButtonGroup>
  );
};

import { MuiEditorButtonGroup } from "@dabsi/system/rich-text/browser/editor/mui/buttonGroup";
import { RichTextStore } from "@dabsi/system/rich-text/browser/editor/store";
import { ViewContext } from "@dabsi/view/react/context";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import React from "react";
import { MuiEditorButton } from "../../button";

export const MuiListButton = ({ store }: { store: RichTextStore }) => {
  const listData = store.getCurrentBlockData("list");
  return (
    <MuiEditorButtonGroup
      value={listData?.type}
      onChange={value => {
        store.applyList(value as any);
      }}
    >
      <MuiEditorButton value={"UNORDERED"} icon={<FormatListBulletedIcon />} />
      <MuiEditorButton value={"ORDERED"} icon={<FormatListNumberedIcon />} />
    </MuiEditorButtonGroup>
  );
};

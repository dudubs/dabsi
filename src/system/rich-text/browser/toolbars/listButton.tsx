import { RichTextStore } from "@dabsi/system/rich-text/view/store";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import React from "react";
import { MuiToolbarButton } from "./button";

export function MuiListButtonSet({ store }: { store: RichTextStore }) {
  const { currentListType } = store;
  return (
    <>
      <MuiToolbarButton
        selected={currentListType === "UNORDERED"}
        onClick={() => store.applyList("UNORDERED")}
      >
        <FormatListBulletedIcon />
      </MuiToolbarButton>
      <MuiToolbarButton
        selected={currentListType === "ORDERED"}
        onClick={() => store.applyList("ORDERED")}
      >
        <FormatListNumberedIcon />
      </MuiToolbarButton>
    </>
  );
}

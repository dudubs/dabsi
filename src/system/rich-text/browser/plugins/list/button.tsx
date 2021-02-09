import { RichTextStore } from "@dabsi/system/rich-text/view/store";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import React from "react";
import { MuiToolbarButton } from "../../toolbar/button";
const iconMap = {
  UNORDERED: <FormatListBulletedIcon />,
  ORDERED: <FormatListNumberedIcon />,
};
export function MuiListButton({
  store,
  listType,
}: {
  store: RichTextStore;
  listType: "ORDERED" | "UNORDERED";
}) {
  const { currentListType } = store;
  return (
    <MuiToolbarButton
      selected={currentListType === listType}
      onClick={() => store.applyList(listType)}
    >
      {iconMap[listType]}
    </MuiToolbarButton>
  );
}

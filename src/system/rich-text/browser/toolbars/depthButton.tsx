import { RichTextStore } from "@dabsi/system/rich-text/view/store";
import FormatIndentDecreaseIcon from "@material-ui/icons/FormatIndentDecrease";
import FormatIndentIncreaseIcon from "@material-ui/icons/FormatIndentIncrease";
import React from "react";
import "../muiStyles";
import { maxDepth } from "../muiStyles";
import { MuiToolbarButton } from "./button";

export const MuiDepthButton = ({
  store,
  depth,
}: {
  depth: number;
  store: RichTextStore;
}) => {
  return (
    <>
      <MuiToolbarButton onClick={() => store.adjustDepth(depth, maxDepth)}>
        {depth > 0 ? (
          <FormatIndentIncreaseIcon />
        ) : (
          <FormatIndentDecreaseIcon />
        )}
      </MuiToolbarButton>
    </>
  );
};

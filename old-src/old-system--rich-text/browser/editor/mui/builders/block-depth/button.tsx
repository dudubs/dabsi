import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import { RichTextStore } from "@dabsi/system/rich-text/browser/editor/store";
import FormatIndentDecreaseIcon from "@material-ui/icons/FormatIndentDecrease";
import FormatIndentIncreaseIcon from "@material-ui/icons/FormatIndentIncrease";
import React from "react";
import { MuiEditorButton } from "../../button";

export const MuiDepthButton = ({
  depth,
  store,
}: {
  depth: number;
  store: RichTextStore;
}) => {
  return (
    <>
      <MuiEditorButton
        selected={0 > depth && store.currentBlock.getDepth() > 0}
        onPress={() =>
          store.adjustDepth(depth, RichTextEditorGlobals.blockMaxDepth)
        }
        icon={
          depth > 0 ? (
            <FormatIndentIncreaseIcon />
          ) : (
            <FormatIndentDecreaseIcon />
          )
        }
      />
    </>
  );
};

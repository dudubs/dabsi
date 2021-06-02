import { MuiRichTextImageButton } from "@dabsi/system/rich-text-plugins/image/browser/button";
import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({ root: { display: "block" } });

RichTextEditorGlobals.mui.builders.push(
  ({ editor: { muiToolbarMap, editor } }) => {
    editor.defineBlock("image", {
      render: ({ blockData }) => (
        <img src={blockData.url} className={useStyles().root} />
      ),
    });

    muiToolbarMap.adding.push(() => {
      return <MuiRichTextImageButton editor={editor} />;
    });
  }
);

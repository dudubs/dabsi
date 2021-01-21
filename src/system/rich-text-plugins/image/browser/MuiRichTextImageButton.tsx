import {
  canvasToBlob,
  fitImageToCanvas,
  loadImageFromFile,
} from "@dabsi/browser/ImageUtils";
import processRpcWithFormData from "@dabsi/system/core/browser/processRpcWithFormData";
import RichTextImageRpc from "@dabsi/system/rich-text-plugins/image/common/RichTextImageRpc";
import { insertImage } from "@dabsi/system/rich-text-plugins/image/view/insertImage";
import { RichTextEditor } from "@dabsi/system/rich-text/view/RichTextEditor";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import ImageIcon from "@material-ui/icons/Image";
import React, { ReactElement, useMemo, useRef } from "react";
const useStyles = makeStyles({
  hiddenFile: {
    display: "none",
  },
});

export default function ({ editor }: { editor: RichTextEditor }): ReactElement {
  const classes = useStyles();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const connection = useMemo(
    () => editor.props.connection.getChild(RichTextImageRpc),
    []
  );

  return (
    <>
      <IconButton
        size="small"
        onClick={() => {
          fileInputRef.current!.click();
        }}
      >
        <ImageIcon />
      </IconButton>
      <input
        className={classes.hiddenFile}
        ref={fileInputRef}
        type="file"
        onChange={async ({ target }) => {
          const file = fileInputRef.current!.files?.[0];
          if (!file) return;

          const img = await loadImageFromFile(file);

          const canvas = fitImageToCanvas(img, {
            maxWidth: 500,
            maxHeight: 500,
          });

          const blob = await canvasToBlob(canvas);

          const { url, key } = await processRpcWithFormData(
            df => {
              df.append("image", blob);
            },
            () => connection.upload({ field: "image" })
          );

          insertImage(editor, url, key);
        }}
      />
    </>
  );
}

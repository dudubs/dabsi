import {
  canvasToBlob,
  fitImageToCanvas,
  loadImageFromFile,
} from "@dabsi/browser/ImageUtils";
import withStyles from "@dabsi/browser/mui/withStyles";
import processRpcWithFormData from "@dabsi/system/core/browser/processRpcWithFormData";
import { uploadImage } from "@dabsi/system/rich-text-plugins/image/browser/upload";
import { RichTextImageRpc } from "@dabsi/system/rich-text-plugins/image/common/rpc";
import insertImage from "@dabsi/system/rich-text-plugins/image/view/insertImage";
import { RichTextEditor } from "@dabsi/system/rich-text/view/editor";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import ImageIcon from "@material-ui/icons/Image";
import React, { ReactElement, useMemo, useRef } from "react";

const useStyles = makeStyles({
  hiddenFile: {
    display: "none",
  },
});

const HiddenFileInput = withStyles({
  root: { display: "none" },
})<React.ComponentProps<"input"> & { inputRef; onFile(file: File) }>(
  ({ inputRef, onFile, ...props }) => (
    <input
      {...props}
      type="file"
      ref={inputRef}
      onChange={({ target }) => {
        if (target?.files?.[0]) {
          onFile(target.files[0]);
        }
      }}
    />
  )
);

export function MuiRichTextImageButton({
  editor,
}: {
  editor: RichTextEditor;
}): ReactElement {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const connection = editor.useConnection(RichTextImageRpc);

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
      <HiddenFileInput
        inputRef={fileInputRef}
        type="file"
        onFile={file => {
          return uploadImage(editor, connection, file);
        }}
      />
    </>
  );
}

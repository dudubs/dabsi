import {
  canvasToBlob,
  fitImageToCanvas,
  loadImageFromFile,
} from "@dabsi/browser/ImageUtils";
import processRpcWithFormData from "@dabsi/system/core/browser/processRpcWithFormData";
import { RichTextImageRpc } from "@dabsi/system/rich-text-plugins/image/common/rpc";
import { RichTextEditor } from "@dabsi/system/rich-text/browser/editor/editor";
import { RichTextStore } from "@dabsi/system/rich-text/browser/editor/store";
import { RpcConnection } from "@dabsi/typerpc/Rpc";

// getRichTextPluginConfig('image')

export async function uploadImage(
  editor: RichTextEditor,
  connection: RpcConnection<typeof RichTextImageRpc>,
  file: File
) {
  const image = await loadImageFromFile(file);
  const canvas = fitImageToCanvas(image, {
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

  editor.store.insertBlocks([
    {
      type: "image",
      data: {
        imageKey: key,
        url,
      },
    },
  ]);
}

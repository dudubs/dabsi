// list (numberic, dot)
// header
import { RichTextEditorPlugins } from "@dabsi/system/rich-text/view/editorPlugins";
import { Modifier, SelectionState } from "draft-js";

RichTextEditorPlugins.push(editor => {
  editor.handleKeyCommand("split-block", ({ store, currentBlock, content }) => {
    content = Modifier.splitBlock(content, store.selection);
    content = Modifier.setBlockData(
      content,
      SelectionState.createEmpty(content.getKeyAfter(currentBlock.getKey())),
      currentBlock.getData()
    );
    store.update("push", content, "split-block");
    store.update("forceSelection", store.selection);
  });
});

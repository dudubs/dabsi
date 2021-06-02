// list (numberic, dot)
// header
import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import { Modifier, SelectionState } from "draft-js";

RichTextEditorGlobals.builders.push(editor => {
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

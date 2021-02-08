// list (numberic, dot)
// header
import { RichTextEditorPlugins } from "@dabsi/system/rich-text/view/editorPlugins";
import { Modifier, SelectionState } from "draft-js";

RichTextEditorPlugins.push(editor => {
  const { store } = editor;
  editor.handleKeyCommandMap["split-block"] = () => {
    const { startBlock } = store;
    let content = store.modifierCall("splitBlock", store.selection);
    content = Modifier.setBlockData(
      content,
      SelectionState.createEmpty(content.getKeyAfter(startBlock.getKey())),
      startBlock.getData()
    );
    store.update("push", content, "split-block");
    store.update("forceSelection", store.selection);

    return "handled";
  };
});

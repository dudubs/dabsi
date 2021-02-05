// list (numberic, dot)
// header
import RichTextEditorPlugins from "@dabsi/system/rich-text/view/RichTextEditorPlugins";
import { makeStyles } from "@material-ui/core/styles";
import { Modifier, SelectionState } from "draft-js";

const maxDepth = 10;

RichTextEditorPlugins.push(editor => {
  const {
    store,
    editorProps: { blockStyleFn, handleKeyCommand },
  } = editor;
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

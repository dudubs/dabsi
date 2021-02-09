import { maxDepth } from "@dabsi/system/rich-text/browser/plugins/depth/globals";
import { RichTextEditorPlugins } from "@dabsi/system/rich-text/view/editorPlugins";

RichTextEditorPlugins.push(editor => {
  const { store } = editor;

  editor.bindKey("Tab", event => {
    event.preventDefault();
    return event.shiftKey ? "less-depth" : "more-depth";
  });

  editor.handleKeyCommandMap["more-depth"] = () => {
    store.adjustDepth(1, maxDepth);
    return "handled";
  };

  editor.handleKeyCommandMap["less-depth"] = () => {
    store.adjustDepth(-1, maxDepth);
    return "handled";
  };

  editor.bindKey("Backspace", event => {
    const { selection } = store;
    if (selection.getAnchorKey() !== selection.getFocusKey()) return;
    if (selection.getAnchorOffset() || selection.getFocusOffset()) return;
    if (!store.currentBlock.getDepth()) return;
    return "less-depth";
  });
});

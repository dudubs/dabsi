import { maxDepth } from "@dabsi/system/rich-text/browser/plugins/depth/globals";
import { RichTextEditorPlugins } from "@dabsi/system/rich-text/view/editorPlugins";

declare global {
  namespace IRichText {
    interface EditorKeyCommands {
      "more-depth";
      "less-depth";
    }
  }
}
RichTextEditorPlugins.push(editor => {
  const { store } = editor;

  editor.bindKey("Tab", event => {
    event.preventDefault();
    return event.shiftKey ? "less-depth" : "more-depth";
  });

  editor
    .handleKeyCommand("less-depth", store => {
      store.adjustDepth(-1, maxDepth);
    })
    .handleKeyCommand("more-depth", store => {
      store.adjustDepth(1, maxDepth);
    });

  editor.bindKey("Backspace", event => {
    const { selection } = store;
    if (selection.getAnchorKey() !== selection.getFocusKey()) return;
    if (selection.getAnchorOffset() || selection.getFocusOffset()) return;
    if (!store.currentBlock.getDepth()) return;
    return "less-depth";
  });
});

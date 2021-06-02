import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";

declare global {
  namespace IRichText {
    interface EditorKeyCommands {
      "more-depth";
      "less-depth";
    }
  }
}
RichTextEditorGlobals.builders.push(editor => {
  const { store } = editor;

  editor.bindKey("Tab", event => {
    event.preventDefault();
    return event.shiftKey ? "less-depth" : "more-depth";
  });

  editor
    .handleKeyCommand("less-depth", store => {
      store.adjustDepth(-1, RichTextEditorGlobals.blockMaxDepth);
    })
    .handleKeyCommand("more-depth", store => {
      store.adjustDepth(1, RichTextEditorGlobals.blockMaxDepth);
    });

  editor.bindKey("Backspace", event => {
    const { selection } = store;
    if (selection.getAnchorKey() !== selection.getFocusKey()) return;
    if (selection.getAnchorOffset() || selection.getFocusOffset()) return;
    if (!store.currentBlock.getDepth()) return;
    return "less-depth";
  });
});

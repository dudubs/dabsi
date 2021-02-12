import { RichTextEditorPlugins } from "@dabsi/system/rich-text/view/editorPlugins";

declare global {
  namespace IRichText {
    interface EditorKeyCommands {
      "delete-current-block";
      "select-block-before";
    }
  }
}

RichTextEditorPlugins.push(editor => {
  editor
    .handleKeyCommand("delete-current-block", store => {
      store.deleteCurrentBlock();
    })
    .handleKeyCommand("select-block-before", ({ store, blockBefore }) => {
      blockBefore &&
        store.select({
          anchorKey: blockBefore.getKey(),
          endOfAnchor: true,
        });
    });
  editor.bindKey(
    "Backspace",
    (event, { blockBefore, selection, currentBlock }) => {
      if (currentBlock.getType() === "atomic") {
        return "delete-current-block";
      }
      if (
        blockBefore &&
        selection.anchorOffset === 0 &&
        selection.isSomeBlockAndOffset &&
        blockBefore.getType() === "atomic"
      ) {
        if (!currentBlock.getLength()) {
          return "delete-current-block";
        }
        return "select-block-before";
      }
    }
  );
});

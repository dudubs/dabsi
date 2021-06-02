import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";

declare global {
  namespace IRichText {
    interface EditorKeyCommands {
      "block.delete-current";
      "block.select-before";
    }
  }
}

RichTextEditorGlobals.builders.push(editor => {
  editor
    .handleKeyCommand("block.delete-current", store => {
      store.deleteCurrentBlock();
    })
    .handleKeyCommand("block.select-before", ({ store, blockBefore }) => {
      blockBefore &&
        store.select({
          anchorKey: blockBefore.getKey(),
          endOfAnchor: true,
        });
    });

  editor.bindKey(
    "Backspace",
    (event, { blockBefore, selection, currentBlock }) => {
      if (!selection.isSomeBlock) return;

      if (!editor.isEditableBlock(currentBlock.type)) {
        return "block.delete-current";
      }
      if (
        blockBefore &&
        selection.anchorOffset === 0 &&
        selection.isSomeBlockAndOffset &&
        !editor.isEditableBlock(blockBefore.type)
      ) {
        if (!currentBlock.getLength()) {
          return "block.delete-current";
        }
        return "block.select-before";
      }
    }
  );
});

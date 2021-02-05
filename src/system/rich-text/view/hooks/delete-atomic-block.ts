import { createSelectionState } from "@dabsi/system/rich-text/common/draftUtils";
import RichTextEditorPlugins from "@dabsi/system/rich-text/view/RichTextEditorPlugins";

RichTextEditorPlugins.push(editor => {
  editor.bindKey("Backspace", event => {
    const {
      store: { selection, content },
      store,
    } = editor;
    if (
      event.type !== "keydown" ||
      selection.getAnchorKey() !== selection.getFocusKey() ||
      selection.getAnchorOffset() !== 0 ||
      selection.getFocusOffset() !== 0
    ) {
      return;
    }

    event.preventDefault();

    const atomicBlock = content.getBlockBefore(selection.getAnchorKey());
    if (atomicBlock?.getType() !== "atomic") return;

    const blockBeforeAtomicBlock = content.getBlockBefore(atomicBlock.getKey());
    const startOffset = blockBeforeAtomicBlock.getText().length;

    store.update(
      "push",
      store.modifierCall(
        "removeRange",
        createSelectionState(blockBeforeAtomicBlock.getKey(), {
          startOffset,
          endKey: selection.getAnchorKey(),
          endOffset: 0,
        }),
        "backward"
      ),
      "remove-range"
    );

    store.update(
      "forceSelection",
      createSelectionState(blockBeforeAtomicBlock.getKey(), {
        startOffset,
      })
    );
    return null;
  });
});

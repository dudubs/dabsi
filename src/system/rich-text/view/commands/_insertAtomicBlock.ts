import { RichTextEditor } from "@dabsi/system/rich-text/view/RichTextEditor";
import RichTextEditorCommands from "@dabsi/system/rich-text/view/RichTextEditorCommands";
import { AtomicBlockUtils } from "draft-js";

const commandName = "insertAtomicBlock";

declare global {
  namespace IRichText {
    interface EditorCommands {
      [commandName]: typeof command;
    }
  }
}

RichTextEditorCommands[commandName] = command;

function command(
  editor: RichTextEditor,
  type: string,
  mutability: Draft.DraftEntityMutability,
  data
) {
  const contentState = editor.content.createEntity(type, mutability, data);
  const entityKey = contentState.getLastCreatedEntityKey();

  editor.editorState = AtomicBlockUtils.insertAtomicBlock(
    editor.editorState,
    entityKey,
    " "
  );

  editor.store.update("forceSelection", editor.content.getSelectionAfter());
}

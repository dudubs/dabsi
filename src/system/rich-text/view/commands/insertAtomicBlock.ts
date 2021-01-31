import { RichTextCommands } from "@dabsi/system/rich-text/common/commands";
import { RichTextStore } from "@dabsi/system/rich-text/common/store";
import { RichTextEditor } from "@dabsi/system/rich-text/view/editor";
import { AtomicBlockUtils } from "draft-js";

const commandName = "insertAtomicBlock";

declare global {
  namespace IRichText {
    interface Commands {
      [commandName]: typeof command;
    }
  }
}

RichTextCommands[commandName] = command;

function command(
  store: RichTextStore,
  type: string,
  mutability: Draft.DraftEntityMutability,
  data
) {
  const contentState = store.content.createEntity(type, mutability, data);
  const entityKey = contentState.getLastCreatedEntityKey();

  store.state = AtomicBlockUtils.insertAtomicBlock(store.state, entityKey, " ");

  store.update("forceSelection", store.content.getSelectionAfter());
}

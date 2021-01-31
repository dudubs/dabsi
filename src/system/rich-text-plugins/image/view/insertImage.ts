import { RichTextCommands } from "@dabsi/system/rich-text/common/commands";
import { RichTextStore } from "@dabsi/system/rich-text/common/store";

declare global {
  namespace IRichText {
    interface Commands {
      insertImage: typeof command;
    }
  }
}

RichTextCommands.insertImage = command;

function command(store: RichTextStore, url: string, key: string) {
  store.command("insertAtomicBlock", "", "IMMUTABLE", {
    url,
    key,
  });
}

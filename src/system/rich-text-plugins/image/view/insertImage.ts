import { RichTextStore } from "@dabsi/system/rich-text/view/store";

export default function (store: RichTextStore, url: string, key: string) {
  store.insertAtomicBlock("image", "IMMUTABLE", {
    url,
    key,
  });
}

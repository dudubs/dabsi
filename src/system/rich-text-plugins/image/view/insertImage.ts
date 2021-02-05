import { RichTextStore } from "@dabsi/system/rich-text/common/store";

export default function (store: RichTextStore, url: string, key: string) {
  store.insertAtomicBlock("image", "IMMUTABLE", {
    url,
    key,
  });
}

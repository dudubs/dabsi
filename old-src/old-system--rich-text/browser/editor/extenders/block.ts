import definePrototype from "@dabsi/common/class/definePrototype";
import { RichTextBlock } from "@dabsi/system/rich-text/common/block";
import { ContentBlock } from "draft-js";

declare module "draft-js" {
  interface ContentBlock {
    type: RichTextBlock.Type;
    key: string;
    getStyle<T extends RichTextBlock.StyleType>(
      type: T
    ): RichTextBlock.UnpackedStyle<T> | undefined;
  }
}

definePrototype(ContentBlock, {
  get key(): string {
    return this.getKey();
  },
  get type(): RichTextBlock.Type {
    return <any>this.getType();
  },
  getStyle<T extends RichTextBlock.StyleType>(
    type: T
  ): RichTextBlock.UnpackedStyle<T> | undefined {
    return this.getData().get("style-" + type);
  },
});

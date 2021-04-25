import { Awaitable } from "@dabsi/common/typings2/Async";
import { RichTextContent } from "@dabsi/system/rich-text/common/content";
import { RichTextInput } from "@dabsi/system/rich-text/common/input";
import { RichTextDocument } from "@dabsi/system/rich-text/entities/Document";
import { DataSource } from "@dabsi/typedata/source";
import { RpcResolvedConfig } from "@dabsi/old-typerpc/Rpc";

export class RichTextInputValue {
  constructor(
    public config: RpcResolvedConfig<RichTextInput>,
    public getContent: () => Awaitable<RichTextContent.Unpacked | null>
  ) {}

  async save(
    docKeyOrSource?: string | DataSource<RichTextDocument>
  ): Promise<string | null> {
    const content = await this.getContent();
    if (!content) return null;
    return this.config.context.pack(this.config, content, docKeyOrSource);
  }
}

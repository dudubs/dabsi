import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { ContentAdminRpc } from "@dabsi/system/content/admin/common/rpc";
import { RichTextContext } from "@dabsi/system/rich-text/context";

export default RpcConfigResolver(
  ContentAdminRpc,
  {
    richTextContext: RichTextContext,
  },
  c => $ =>
    $({
      createPage: {
        inputConfig: {
          content: {
            context: c.richTextContext,
          },
        },
        submit({ title, content }) {
          console.log({ content });
        },
      },
    })
);

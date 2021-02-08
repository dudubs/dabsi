import { DataContext } from "@dabsi/modules/data/context";
import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import { User } from "@dabsi/system/acl/entities/User";
import { RichTextMentionRpc } from "@dabsi/system/rich-text-plugins/mention/common/rpc";
import { RichTextConfigResolver } from "@dabsi/system/rich-text/configResolver";

export default RpcConfigResolver(
  RichTextMentionRpc,
  {
    config: RichTextConfigResolver,
    data: DataContext,
  },
  c => $ =>
    $({
      async getSuggestions(text: string) {
        text = String(text);

        if (!c.config.allowAll || !c.config.mention)
          throw new Error("not allowed.");

        const config =
          typeof c.config.mention === "object" ? c.config.mention : {};

        if (config.minChars) {
          if (config.minChars > text.length) return [];
        }
        const rows = await (config.source || c.data.getSource(User))
          .pick({
            mentionName: config.field || "loginName",
          })
          .filter({
            $search: {
              in: "mentionName",
              text: String(text),
            },
          })
          .take(20)
          .getRows();

        return rows.map(row => [row.$key, row.mentionName]);
      },
    })
);

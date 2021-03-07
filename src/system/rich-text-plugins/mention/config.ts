import { DataContext } from "@dabsi/modules/data/context";
import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { User } from "@dabsi/system/acl/entities/User";
import { RichTextMentionRpc } from "@dabsi/system/rich-text-plugins/mention/common/rpc";
import { RichTextConfigContext } from "@dabsi/system/rich-text/configContext";

export default RpcConfigResolver(
  RichTextMentionRpc,
  {
    config: RichTextConfigContext,
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

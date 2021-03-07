import { DataContext } from "@dabsi/modules/data/context";
import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { ContentAdminRpc } from "@dabsi/system/content/admin/common/rpc";
import { ContentPage } from "@dabsi/system/content/entities/Page";
import { RichTextConfigResolver } from "@dabsi/system/rich-text/configResolver";

export default RpcConfigResolver(
  ContentAdminRpc.at("pages"),
  {
    contentConfig: RichTextConfigResolver({
      allowAll: true,
    }),
    data: DataContext,
  },
  c => $ => {
    const source = c.data.getSource(ContentPage);
    return $({
      edit: async ($, key) => {
        return $({
          inputConfig: {
            content: c.contentConfig,
          },
          valueConfig: async $ => {
            const page = await c.data
              .getSource(ContentPage)
              .pick(["title"])
              .getOrFail(key);

            page.at("content").insert({
              content: "Asd",
            });

            return $({
              title: page.title,
              content: page.at("content"),
            });
          },
          async submit({ title, content }) {
            await content.save(source.at("content", key));
            await source.update([key], {
              title,
            });
          },
        });
      },
      table: $ =>
        $({
          source,
        }),

      create: {
        inputConfig: {
          content: c.contentConfig,
        },
        async submit({ title, content }) {
          const pageKey = await c.data.getSource(ContentPage).insertKey({
            title,
            content: await content.save(),
          });
          return { pageKey };
        },
      },
    });
  }
);

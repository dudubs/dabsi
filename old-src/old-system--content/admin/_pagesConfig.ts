import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { DataSourceFactory2 } from "@dabsi/modules/DbModule";
import { ContentAdminRpc } from "@dabsi/system/content/admin/common/rpc";
import { ContentPage } from "@dabsi/system/content/entities/Page";
import { RichTextConfigResolver } from "@dabsi/system/rich-text/configResolver";
import defined from "@dabsi/common/object/defined";

export default RpcResolver(
  ContentAdminRpc.at("pages"),
  {
    contentConfig: RichTextConfigResolver({
      allowAll: true,
    }),
    getDataSource: DataSourceFactory2,
  },
  c => $ => {
    const source = c.getDataSource(ContentPage);
    return $({
      edit: async ($, key) => {
        return $({
          inputConfig: {
            content: c.contentConfig,
          },
          valueConfig: async $ => {
            const page = notNull(
              await c.getDataSource(ContentPage).pick(["title"]).fetch()
            );

            page.at("content").insertAndFetch({
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
          const pageKey = await c.getDataSource(ContentPage).insert({
            title,
            content: await content.save(),
          });
          return { pageKey };
        },
      },
    });
  }
);

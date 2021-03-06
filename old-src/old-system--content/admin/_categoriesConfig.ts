import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { DataSourceFactory2 } from "@dabsi/modules/DbModule";
import { ContentAdminRpc } from "@dabsi/system/content/admin/common/rpc";
import { ContentCategory } from "@dabsi/system/content/entities/Category";
import { RichTextConfigResolver } from "@dabsi/system/rich-text/configResolver";

export default RpcResolver(
  ContentAdminRpc.at("categories"),
  {
    contentConfig: RichTextConfigResolver({
      allowAll: true,
    }),
    getDataSource: DataSourceFactory2,
  },
  c => $ => {
    const source = c.getDataSource(ContentCategory);

    return $({
      table: $ =>
        $({
          source: source.filter({ $notHas: "parent" }).addFields({
            countChildren: { $count: "children" },
          }),
        }),

      item: async ($, key) => {
        const childrenSource = source.at("children", key);

        return $({
          async delete(moveTo) {
            await childrenSource.update({ parent: moveTo });
            await source.filter({ $is: key }).delete();
          },
          table: $ =>
            $({
              source: childrenSource.addFields({
                countChildren: { $count: "children" },
              }),
            }),
          async get() {
            const [tree] = await source
              .filter({ $is: key })
              .pick(["title"])
              .fetchTreeAt("parent");

            return {
              path: tree.reverse().map(({ $key, title }) => ({ $key, title })),
            };
          },

          add: $ =>
            $({
              async submit({ title }) {
                return { $key: await childrenSource.insert({ title }) };
              },
            }),

          edit: {
            valueConfig: async $ => {
              const { title } = await source.pick(["title"]).get(key);

              return $({
                title,
              });
            },
            async submit({ title }) {
              await source.update([key], {
                title,
              });
            },
          },
        });
      },

      add: {
        // inputConfig: {},
        async submit({ title }) {
          return {
            $key: await source.insert({
              title,
            }),
          };
        },
      },
    });
  }
);

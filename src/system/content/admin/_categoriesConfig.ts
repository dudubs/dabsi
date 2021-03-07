import { DataContext } from "@dabsi/modules/data/context";
import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { ContentAdminRpc } from "@dabsi/system/content/admin/common/rpc";
import { ContentCategory } from "@dabsi/system/content/entities/Category";
import { RichTextConfigResolver } from "@dabsi/system/rich-text/configResolver";

export default RpcConfigResolver(
  ContentAdminRpc.at("categories"),
  {
    contentConfig: RichTextConfigResolver({
      allowAll: true,
    }),
    data: DataContext,
  },
  c => $ => {
    const source = c.data.getSource(ContentCategory);

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
              .getTreeAt("parent");
            console.log({ tree });

            return { path: tree.map(({ $key, title }) => ({ $key, title })) };
          },

          addForm: $ =>
            $({
              async submit({ title }) {
                return { $key: await childrenSource.insertKey({ title }) };
              },
            }),

          editForm: {
            valueConfig: async $ => {
              const { title } = await source.pick(["title"]).getOrFail(key);

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

      addForm: {
        // inputConfig: {},
        async submit({ title }) {
          return {
            $key: await source.insertKey({
              title,
            }),
          };
        },
      },
    });
  }
);

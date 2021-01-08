import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import RichTextModule from "@dabsi/system/rich-text";
import TestRichTextForm from "@dabsi/system/rich-text-testing/common/TestRichTextForm";

export default RpcConfigResolver(
  TestRichTextForm,
  {
    module: RichTextModule,
  },
  c => $ =>
    $({
      inputConfig: {
        module: c.module,
        image: {
          preview: { width: 500 },
        },

        // tagFriends: ... user
        allowTables: true,
      },
      submit() {},
    })
);

import { AdminRpc } from "@dabsi/system/admin/common";
import { RichTextInput } from "@dabsi/system/rich-text/common/input";
import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import { Form } from "@dabsi/typerpc/widget/form/Form";

export const [ContentAdminRpc, ContentAdminConnection] = AdminRpc.register(
  "content",
  RpcMap({
    createPage: Form({
      input: InputMap({
        title: TextInput(),
        content: RichTextInput(),
      }),
    }),
  })
);

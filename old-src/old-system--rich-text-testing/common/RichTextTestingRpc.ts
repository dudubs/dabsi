import { Typing } from "@dabsi/common/typings2/Typing";
import { SystemRpc } from "@dabsi/system/core/common/rpc";
import { RichTextInput } from "@dabsi/system/rich-text/common/input";
import { InputMap } from "@dabsi/old-typerpc/input/input-map/InputMap";
import { TextInput } from "@dabsi/old-typerpc/input/text-input/TextInput";
import { RpcFn } from "@dabsi/old-typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/old-typerpc/rpc-map/RpcMap";
import { Form } from "@dabsi/old-typerpc/widget/form/rpc";

export const [
  RichTextTestingRpc,
  RichTextTestingConnection,
] = SystemRpc.register(
  "rich-text-testing",
  RpcMap({
    form: Form({
      value: Typing<{
        textKey: string;
      }>(),
      input: InputMap({
        textKey: TextInput(),
        text: RichTextInput(),
      }),
    }),
    get: RpcFn<(textKey: string) => Draft.RawDraftContentState>(),
  })
);

export default RichTextTestingRpc;

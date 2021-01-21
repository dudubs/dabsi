import { Typing } from "@dabsi/common/typings2/Typing";
import { SystemRpc } from "@dabsi/system/core/common/SystemRpc";
import { RichTextInput } from "@dabsi/system/rich-text/common/RichTextInput";
import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import { Form } from "@dabsi/typerpc/widget/form/Form";

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

import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import RichTextTestingRpc from "@dabsi/system/rich-text-testing/common/RichTextTestingRpc";
import { RichTextContext } from "@dabsi/system/rich-text/RichTextContext";
import { ContentState, convertToRaw } from "draft-js";

export default RpcConfigResolver(
  RichTextTestingRpc,
  {
    context: RichTextContext,
  },
  c => $ =>
    $({
      form: {
        inputConfig: {
          text: { allowAll: true, context: c.context },
        },
        async submit({ text, textKey }) {
          return { textKey };
        },
      },
      get(textKey) {
        return convertToRaw(ContentState.createFromText("hello " + textKey));
      },
    })
);

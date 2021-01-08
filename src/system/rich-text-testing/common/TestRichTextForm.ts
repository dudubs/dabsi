import { SystemRpc } from "@dabsi/system/core/common/SystemRpc";
import { RichTextInput } from "@dabsi/system/rich-text/common/RichTextInput";
import { Form } from "@dabsi/typerpc/widget/form/Form";

export const [
  TestRichTextForm,
  TestRichTextFormConnection,
] = SystemRpc.register(
  "rich-text-testing",
  Form({
    input: RichTextInput(),
  })
);

export default TestRichTextForm;

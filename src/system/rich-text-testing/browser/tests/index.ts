import { RichTextTestingConnection } from "@dabsi/system/rich-text-testing/common/RichTextTestingRpc";
import { ContentState, convertToRaw } from "draft-js";

it("", async () => {
  console.log("hello");
  await RichTextTestingConnection.form.submit({
    textKey: "",
    text: convertToRaw(ContentState.createFromText("hello")),
  });
  console.log(await RichTextTestingConnection.get("world"));
});

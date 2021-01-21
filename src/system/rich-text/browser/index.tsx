import MuiSystemViewComponents from "@dabsi/system/core/browser/MuiSystemViewComponents";
import { RichTextInput } from "@dabsi/system/rich-text/common/RichTextInput";
import { RichTextEditor } from "@dabsi/system/rich-text/view/RichTextEditor";
import React from "react";

MuiSystemViewComponents.push(use => {
  use(RichTextInput, props => (
    <RichTextEditor connection={props.connection.plugins} />
  ));
});

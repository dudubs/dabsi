import MuiSystemViewComponents from "@dabsi/system/core/browser/MuiSystemViewComponents";
import { RichTextInput } from "@dabsi/system/rich-text/common/input";
import { RichTextEditor } from "@dabsi/system/rich-text/view/editor";
import React from "react";

MuiSystemViewComponents.push(use => {
  use(RichTextInput, props => (
    <RichTextEditor connection={props.connection.plugins} />
  ));
});

import MuiSystemViewComponents from "@dabsi/system/core/browser/MuiSystemViewComponents";
import { RichTextInput } from "@dabsi/system/rich-text/common/input";
import React from "react";
import { MuiRichTextEditor } from "./MuiRichTextEditor";
import "./_devPlugin";
import "./text-toolbar";
MuiSystemViewComponents.push(use => {
  use(RichTextInput, props => (
    <MuiRichTextEditor connection={props.connection.plugins} />
  ));
});

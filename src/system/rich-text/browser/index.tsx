import MuiSystemViewComponents from "@dabsi/system/core/browser/MuiSystemViewComponents";
import { RichTextInput } from "@dabsi/system/rich-text/common/input";
import React from "react";
import { MuiRichTextEditor } from "./editor";
import "./plugins/depth";
import "./plugins/header";
import "./plugins/direction";
import "./plugins/align";
import "./plugins/list";
import "./styles";
import "./toolbar";

MuiSystemViewComponents.push(use => {
  use(RichTextInput, props => (
    <MuiRichTextEditor connection={props.connection.plugins} />
  ));
});

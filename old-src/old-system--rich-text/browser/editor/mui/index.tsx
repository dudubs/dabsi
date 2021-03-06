import { SystemBrowserComponents } from "@dabsi/system/core/browser/components";
import { RichTextEditor } from "@dabsi/system/rich-text/browser/editor/editor";
import { RichTextInput } from "@dabsi/system/rich-text/common/input";
import React from "react";
import "./globals";
import "./toolbar";
import "./builders";
import "./plugin";
import "./style-toolbar";
import "./styles";
import { RichTextInputView } from "@dabsi/system/rich-text/view/inputView";

//
SystemBrowserComponents.push(use => {
  use(RichTextInput, props => (
    <RichTextInputView {...props} editorProps={{ mui: true }} />
  ));
});

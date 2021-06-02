import {
  RichTextEditor,
  RichTextEditorProps,
} from "@dabsi/system/rich-text/browser/editor/editor";
import { RichTextInput } from "@dabsi/system/rich-text/common/input";
import {
  AbstractInputView,
  InputViewProps,
} from "@dabsi/old-typerpc/input/InputView";
import { RpcConnection } from "@dabsi/old-typerpc/Rpc";
import React from "react";

export class RichTextInputView<
  C extends RpcConnection<RichTextInput>
> extends AbstractInputView<
  C,
  InputViewProps<C> & {
    editorProps?: Omit<
      RichTextEditorProps,
      "content" | "connection" | "content"
    >;
  }
> {
  //

  editor: RichTextEditor | null = null;

  async inputWillValidate() {
    await super.inputWillValidate?.();
    await this.setValue(this.editor!.getContent());
  }

  renderView() {
    return (
      <RichTextEditor
        {...this.props.editorProps}
        ref={editor => {
          this.editor = editor;
        }}
        connection={this.connection.plugins}
        content={this.value}
      />
    );
  }
}

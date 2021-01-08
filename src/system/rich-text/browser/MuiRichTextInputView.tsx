import { Debounce } from "@dabsi/common/async/Debounce";
import { ViewState } from "@dabsi/react/view/ViewState";
import { RichTextInput } from "@dabsi/system/rich-text/common/RichTextInput";
import { AbstractInputView } from "@dabsi/typerpc/input/AbstractInputView";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import Grid from "@material-ui/core/Grid";
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
} from "draft-js";
import React from "react";

export class MuiRichTextInputView extends AbstractInputView<
  RpcConnection<RichTextInput>
> {
  @ViewState() editorState = EditorState.createWithContent(
    this._loadStateFromHistory()
  );

  protected _loadStateFromHistory() {
    if (history.state?.DEV_RICH_TEXT_STATE) {
      return convertFromRaw(history.state?.DEV_RICH_TEXT_STATE);
    }
    return ContentState.createFromText("hello world");
  }

  debounce = Debounce(500);

  renderView() {
    console.log(this.element);

    return (
      <Grid container direction="column" spacing={1}>
        <Grid item>toolbar</Grid>
        <Grid item>
          <Editor
            editorState={this.editorState}
            onChange={async editorState => {
              this.editorState = editorState;
              if (await this.debounce()) {
                history.replaceState(
                  {
                    ...(typeof history.state === "object"
                      ? history.state
                      : null),
                    DEV_RICH_TEXT_STATE: convertToRaw(
                      this.editorState.getCurrentContent()
                    ),
                  },
                  ""
                );
              }
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

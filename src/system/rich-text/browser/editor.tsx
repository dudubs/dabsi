import { WeakId } from "@dabsi/common/WeakId";
import { MuiRichTextEditorPlugins } from "@dabsi/system/rich-text/browser/globals";
import { MuiFocusableBox } from "@dabsi/system/rich-text/browser/MuiFocusableBox";
import { RichTextEditor } from "@dabsi/system/rich-text/view/editor";
import Grid from "@material-ui/core/Grid";
import React, { ComponentType } from "react";

export class MuiRichTextEditor extends RichTextEditor {
  toolbars: ComponentType<{}>[] = [];

  constructor(props) {
    super(props);
    if (this.constructor === MuiRichTextEditor) {
      this.init();
    }
  }

  initPlugins() {
    super.initPlugins();
    for (const plugin of MuiRichTextEditorPlugins) {
      plugin(this);
    }
  }

  renderEditor() {
    return (
      <MuiFocusableBox
        onFocus={() => {
          this.instance?.focus();
        }}
      >
        <Grid container direction="column" spacing={1}>
          <Grid item>{this.renderToolbar()}</Grid>
          <Grid item>{super.renderEditor()}</Grid>
        </Grid>
      </MuiFocusableBox>
    );
  }

  renderToolbar() {
    return this.toolbars.map((Toolbar, index) => (
      <Toolbar key={WeakId(Toolbar)} />
    ));
  }
}

import { WeakId } from "@dabsi/common/WeakId";
import { MuiFocusableBox } from "@dabsi/system/rich-text/browser/MuiFocusableBox";
import { MuiRichTextEditorPlugins } from "@dabsi/system/rich-text/browser/muiPlugins";
import { RichTextEditor } from "@dabsi/system/rich-text/view/editor";
import Grid from "@material-ui/core/Grid";
import React, { ComponentType } from "react";
import styled from "styled-components";

const Container = styled.div<{ over }>`
  border: 1px solid ${x => x.theme.palette.grey[400]};
  border-radius: ${x => x.theme.shape.borderRadius}px;
  padding: ${x => x.theme.spacing(1)}px;
`;

export class MuiRichTextEditor extends RichTextEditor {
  toolbars: ComponentType<{}>[] = [];

  protected initPlugins() {
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

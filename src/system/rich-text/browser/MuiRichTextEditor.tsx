import { MuiFocusableBox } from "@dabsi/system/rich-text/browser/MuiFocusableBox";
import { RichTextEditor } from "@dabsi/system/rich-text/view/editor";
import Grid from "@material-ui/core/Grid";
import React from "react";
import styled from "styled-components";

const Container = styled.div<{ over }>`
  border: 1px solid ${x => x.theme.palette.grey[400]};
  border-radius: ${x => x.theme.shape.borderRadius}px;
  padding: ${x => x.theme.spacing(1)}px;
`;

export class MuiRichTextEditor extends RichTextEditor {
  renderEditor() {
    return <Grid item>{super.renderEditor()}</Grid>;
  }

  renderToolbar() {
    return <Grid item>{super.renderToolbar()}</Grid>;
  }

  renderContainer(content) {
    return (
      <MuiFocusableBox
        onFocus={() => {
          this.instance?.focus();
        }}
      >
        <Grid container direction="column" spacing={1}>
          {content}
        </Grid>
      </MuiFocusableBox>
    );
  }
}

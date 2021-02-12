import { WeakId } from "@dabsi/common/WeakId";
import { MuiAtomicBlockWrapper } from "@dabsi/system/rich-text/browser/atomicBlockWrapper";
import {
  MuiRichTextEditorPlugins,
  MuiRichTextStylePlugins,
} from "@dabsi/system/rich-text/browser/globals";
import { MuiFocusableBox } from "@dabsi/system/rich-text/browser/MuiFocusableBox";
import { RichTextEditor } from "@dabsi/system/rich-text/view/editor";
import Grid from "@material-ui/core/Grid";
import React, { ComponentType } from "react";

MuiRichTextStylePlugins.push((root, theme) => {
  root["& .rt-insert-atomic-after-regular"] = {
    ...theme.typography.body1,
    cursor: "text",
    background: "pink",
  };
  root["& .rt-insert-atomic-after-regular"] = {
    ...theme.typography.body1,
    cursor: "text",
    background: "pink",
    height: 1,
  };
  root["& .rt-insert-atomic-after-regular:hover"] = {
    height: 20,
  };
  root["& .rt-selected-atomic-block"] = {
    border: "1px solid black",
  };
});

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

  wrapAtomicBlock(
    element: React.ReactElement,
    // { block, contentState }
    props
  ): React.ReactElement {
    // const atomicBlockKey = block.getKey();
    // const blockTypeAfter = contentState
    // .getBlockAfter(atomicBlockKey)
    // ?.getType();

    return (
      <MuiAtomicBlockWrapper
        wrapperProps={props}
        store={this.store}
        editor={this}
      >
        {element}
      </MuiAtomicBlockWrapper>
    );
  }

  renderEditor() {
    return (
      <MuiFocusableBox
        customClass={state => `rt-${state}`}
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

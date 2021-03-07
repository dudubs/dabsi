import { MuiEditorButton } from "@dabsi/system/rich-text/browser/editor/mui/button";
import { MuiEditorButtonGroup } from "@dabsi/system/rich-text/browser/editor/mui/buttonGroup";
import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import FormatLayoutBlockIcon from "@dabsi/system/rich-text/browser/editor/mui/icons/FormatLayoutBlockIcon";
import FormatLayoutFloatIcon from "@dabsi/system/rich-text/browser/editor/mui/icons/FormatLayoutFloatIcon";
import FormatLayoutInlineIcon from "@dabsi/system/rich-text/browser/editor/mui/icons/FormatLayoutInlineIcon";
import React from "react";

RichTextEditorGlobals.mui.builders.push(({ editor: { muiToolbarMap } }) => {
  muiToolbarMap.readOnly.push(({ store }) => {
    return (
      <>
        <MuiEditorButtonGroup
          value={store.getCurrentStyle("layout")}
          onChange={layout => {
            console.log({ layout });
            store.applyLayout(layout);
          }}
        >
          <MuiEditorButton value="BLOCK" icon={<FormatLayoutBlockIcon />} />
          <MuiEditorButton value="FLOAT" icon={<FormatLayoutFloatIcon />} />
          <MuiEditorButton value="INLINE" icon={<FormatLayoutInlineIcon />} />
        </MuiEditorButtonGroup>
      </>
    );
  });
});

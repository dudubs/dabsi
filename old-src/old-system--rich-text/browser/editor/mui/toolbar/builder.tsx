import definePrototype from "@dabsi/common/class/definePrototype";
import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { WeakId } from "@dabsi/common/WeakId";
import { RichTextEditor } from "@dabsi/system/rich-text/browser/editor/editor";
import {
  MuiDisabledFocusable,
  MuiFocusable,
} from "@dabsi/system/rich-text/browser/editor/mui/focusable";
import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import { RichTextStore } from "@dabsi/system/rich-text/browser/editor/store";
import useEditorStore from "@dabsi/system/rich-text/browser/editor/useEditorStore";
import Grid from "@material-ui/core/Grid";
import React from "react";

declare global {
  namespace IRichText {
    interface Editor {
      muiToolbarMap: ToolbarMap;
    }
  }
}

type ToolbarMap = ReturnType<typeof getToolbarMap>;

type ToolbarComponent = React.ComponentType<{
  store: RichTextStore;
}>;

const getToolbarMap = WeakMapFactory((editor: RichTextEditor) => {
  return {
    main: [] as ToolbarComponent[],
    adding: [] as ToolbarComponent[],
    selection: [] as ToolbarComponent[],
    readOnly: [] as ToolbarComponent[],
    editable: [] as ToolbarComponent[],
  };
});

definePrototype(RichTextEditor, {
  get muiToolbarMap(): ToolbarMap {
    return getToolbarMap(this);
  },
});

RichTextEditorGlobals.mui.builders.push(
  ({ editor: { muiToolbarMap, wrappers, editor } }) => {
    wrappers.push(element => {
      const store = useEditorStore();

      const isEditableBlock = editor.isEditableBlock(store.currentBlock.type);

      return (
        <MuiFocusable>
          <Grid container direction="column">
            <Grid item id="editor-toolbar">
              <MuiDisabledFocusable>
                {renderToolbar(muiToolbarMap.main)}
                {isEditableBlock
                  ? renderToolbar(muiToolbarMap.editable)
                  : renderToolbar(muiToolbarMap.readOnly)}
                {store.selection.isSomeBlockAndOffset
                  ? renderToolbar(muiToolbarMap.adding)
                  : renderToolbar(muiToolbarMap.selection)}
              </MuiDisabledFocusable>
            </Grid>
            <Grid item id="editor-content">
              {element}
            </Grid>
          </Grid>
        </MuiFocusable>
      );
      function renderToolbar(
        components: React.ComponentType<{ store: RichTextStore }>[]
      ) {
        const elements: React.ReactElement[] = [];

        for (const component of components) {
          elements.push(
            React.createElement(component, { store, key: WeakId(component) })
          );
        }
        return <>{elements}</>;
      }
    });
  }
);

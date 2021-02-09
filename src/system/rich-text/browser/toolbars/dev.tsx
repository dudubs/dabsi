import { Debounce } from "@dabsi/common/async/Debounce";
import { MuiRichTextEditorPlugins } from "@dabsi/system/rich-text/browser/muiPlugins";
import { MuiToolbarButton } from "@dabsi/system/rich-text/browser/toolbars/button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import InfoIcon from "@material-ui/icons/Info";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import React, { useState } from "react";
import { useHistoryStateKey } from "../useHistoryStateKey";

MuiRichTextEditorPlugins.push(editor => {
  const { store } = editor;
  const debounce = Debounce(500);

  const TestComponent = () => <span>hello</span>;

  editor.atomicBlockRendererMap.test = () => ({
    component: TestComponent,
    editable: false,
  });

  const h = editor.useHook(() => {
    const [state, setState] = useHistoryStateKey("DEV_RICH_TEXT_STATE");
    return { state, setState };
  });

  editor.onInit(() => {
    if (h.state) {
      editor.editorState = EditorState.createWithContent(
        convertFromRaw(h.state),
        editor.compositeDecorator
      );
    }
  });

  editor.onChange(async () => {
    if (await debounce()) {
      h.setState(convertToRaw(editor.editorState.getCurrentContent()));
    }
  });

  editor.toolbars.push(() => {
    const [anchorEl, setAnchorEl] = useState<any>();
    return (
      <>
        <MuiToolbarButton onClick={event => setAnchorEl(event.target)}>
          <InfoIcon />
        </MuiToolbarButton>
        <Menu
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorEl={() => anchorEl}
          onClick={() => setAnchorEl(null)}
        >
          <MenuItem
            onClick={() => {
              console.log(JSON.stringify(convertToRaw(store.content), null, 2));
            }}
          >
            Log state
          </MenuItem>
        </Menu>
      </>
    );
  });
});

import { Debounce, Debounce } from "@dabsi/common/async/Debounce";
import { MuiEditorButton } from "@dabsi/system/rich-text/browser/editor/mui/button";
import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import { useHistoryStateKey } from "@dabsi/system/rich-text/browser/editor/mui/useHistoryStateKey";
import { RichTextEditorRaw } from "@dabsi/system/rich-text/browser/editor/raw";
import { RichTextContent } from "@dabsi/system/rich-text/common/content";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import InfoIcon from "@material-ui/icons/Info";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import React, { useState } from "react";

declare global {
  namespace IRichText {
    interface EntityDataTypes {
      test: DataType;
    }
  }
}

RichTextEditorGlobals.mui.builders.push(
  ({ editor, editor: { muiToolbarMap } }) => {
    if (editor.props.parent) return;
    const { store } = editor;
    const debounce = new Debounce(500);

    editor.defineAtomicBlock("test", {
      render: ({ block }) => (
        <span style={{ padding: "50px", display: "inline-block" }}>
          hello {block.getKey()}
        </span>
      ),
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
      if (await debounce.wait()) {
        h.setState(editor.store.rawContent);
      }
    });

    window["devEditor"] = editor;

    muiToolbarMap.main.push(() => {
      const [anchorEl, setAnchorEl] = useState<any>();
      return (
        <>
          <MuiEditorButton
            onClick={event => setAnchorEl(event.target)}
            icon={<InfoIcon />}
          />
          <Menu
            open={!!anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorEl={() => anchorEl}
            onClick={() => setAnchorEl(null)}
          >
            <MenuItem
              onClick={() => {
                console.log(
                  JSON.stringify(convertToRaw(store.content), null, 2)
                );
              }}
            >
              Log content state
            </MenuItem>
            <MenuItem
              onClick={() => {
                store.state = EditorState.createWithContent(
                  RichTextEditorRaw.toContentState(
                    RichTextContent.createEmpty("test")
                  )
                );
              }}
            >
              reset
            </MenuItem>
            <MenuItem
              onClick={() => {
                console.log(
                  JSON.stringify(convertToRaw(store.selection.toJS()), null, 2)
                );
              }}
            >
              Log selection state
            </MenuItem>
            <MenuItem
              onClick={() => {
                store.insertAtomicBlock("test", "MUTABLE", {});
                store.insertAtomicBlock("test", "MUTABLE", {});
                store.insertAtomicBlock("test", "MUTABLE", {});
              }}
            >
              insert test atomic block
            </MenuItem>
          </Menu>
        </>
      );
    });
  }
);

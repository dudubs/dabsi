import { Debounce } from "@dabsi/common/async/Debounce";
import RichTextEditorPlugins from "@dabsi/system/rich-text/view/RichTextEditorPlugins";
import Button from "@material-ui/core/Button";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import React from "react";
import { useHistoryStateKey } from "../browser/useHistoryStateKey";

declare global {}

RichTextEditorPlugins.push(editor => {
  const debounce = Debounce(500);

  let state, setState: (state) => void;

  const TestComponent = () => <span>hello</span>;

  editor.atomicBlockRendererFnMap.test = () => ({
    component: TestComponent,
    editable: false,
  });

  editor.toolbar.push(() => (
    <>
      <Button
        onClick={() => {
          console.log(
            JSON.stringify(convertToRaw(editor.store.content), null, 2)
          );
        }}
      >
        log state
      </Button>
      <Button
        onClick={() => {
          editor.store.command("insertAtomicBlock", "test", "MUTABLE", {});
        }}
      >
        add test atomic block
      </Button>
    </>
  ));

  editor.hooks.push(() => {
    [state, setState] = useHistoryStateKey("DEV_RICH_TEXT_STATE");
  });

  editor.onInit(() => {
    if (state) {
      editor.editorState = EditorState.createWithContent(
        convertFromRaw(state),
        editor.compositeDecorator
      );
    }
  });

  editor.onChange(async () => {
    if (await debounce()) {
      setState(convertToRaw(editor.editorState.getCurrentContent()));
    }
  });
});

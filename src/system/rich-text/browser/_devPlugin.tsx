import { Debounce } from "@dabsi/common/async/Debounce";
import RichTextEditorPlugins from "@dabsi/system/rich-text/view/RichTextEditorPlugins";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import React from "react";
import { useHistoryStateKey } from "../browser/useHistoryStateKey";

declare global {}

RichTextEditorPlugins.push(editor => {
  const debounce = Debounce(500);

  let state, setState: (state) => void;

  const TestComponent = () => <span>hello</span>;

  editor.atomicBlockRendererMap.test = () => ({
    component: TestComponent,
    editable: false,
  });

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

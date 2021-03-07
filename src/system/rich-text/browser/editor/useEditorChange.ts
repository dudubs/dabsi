import { RichTextEditor } from "@dabsi/system/rich-text/browser/editor/editor";
import { ViewContext } from "@dabsi/view/react/context";
import React from "react";
import { useEffect } from "react";

export default function <T>(callback: (editor: RichTextEditor) => T): T {
  const editor = ViewContext.require(RichTextEditor).root;
  const [state, setState] = React.useState(() => {
    return callback(editor);
  });
  useEffect(
    () =>
      editor.listen(() => {
        setState(callback(editor));
      }),
    [editor]
  );
  return state;
}

import { MuiTheme } from "@dabsi/browser/mui/MuiSystem";
import { RichTextEditor } from "@dabsi/system/rich-text/browser/editor/editor";
import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";

declare global {
  namespace IRichText {
    interface EditorGlobals {
      mui: typeof muiGlobals;
    }
  }
}

const muiGlobals = {
  styles: [] as ((styles: Record<string, any>, theme: MuiTheme) => void)[],

  builders: [] as ((editor: RichTextEditor) => void)[],

  depthStyles: [] as ((
    depth: number,
    style: Record<string, any>,
    theme: MuiTheme
  ) => void)[],
};

RichTextEditorGlobals.mui = muiGlobals;

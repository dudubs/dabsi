import { MuiTheme } from "@dabsi/browser/mui/MuiSystem";
import { MuiRichTextEditor } from "@dabsi/system/rich-text/browser/editor";

export const MuiRichTextEditorPlugins = [] as ((
  editor: MuiRichTextEditor
) => void)[];

export const MuiRichTextStylePlugins = [] as ((
  styles: Record<string, any>,
  theme: MuiTheme
) => void)[];

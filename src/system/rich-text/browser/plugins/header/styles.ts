// list (numberic, dot)
// header
import {
  MuiRichTextEditorPlugins,
  MuiRichTextStylePlugins,
} from "@dabsi/system/rich-text/browser/globals";

MuiRichTextEditorPlugins.push(editor => {
  editor.blockStyleFnMap.header = data => {
    return `rt-header-${data.level}`;
  };
});
MuiRichTextStylePlugins.push((root, theme) => {
  for (let level = 1; 6 >= level; level++) {
    root["& .rt-block-header.rt-header-" + level] =
      theme.typography[("h" + level) as any];
  }
});

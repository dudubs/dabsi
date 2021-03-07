// list (numberic, dot)
// header
import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";

RichTextEditorGlobals.mui.builders.push(({ editor }) => {
  editor.defineBlockStyleFn("header", x => `rt-header-${x.blockData.level}`);
});

RichTextEditorGlobals.mui.styles.push((root, theme) => {
  for (let level = 1; 6 >= level; level++) {
    root["& .rt-block-header.rt-header-" + level] =
      theme.typography[("h" + level) as any];
  }
});
